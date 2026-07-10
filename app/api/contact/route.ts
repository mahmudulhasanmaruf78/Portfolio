import { NextResponse } from 'next/server'
import { OAuth2Client } from 'google-auth-library'
import { contactSchema } from '@/lib/contact'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function jsonResponse(
  status: number,
  code: 'validation_error' | 'not_configured' | 'send_failed' | 'success',
  message: string
) {
  return NextResponse.json({ success: status < 400, code, message }, { status })
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Build an RFC 2822 multipart email and encode it as base64url.
 * This is the raw format expected by Gmail API's messages.send endpoint.
 */
function buildRawMessage({
  from,
  to,
  replyTo,
  subject,
  text,
  html,
}: {
  from: string
  to: string
  replyTo: string
  subject: string
  text: string
  html: string
}): string {
  const boundary = `boundary_${Date.now()}`
  const lines = [
    `From: ${from}`,
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    ``,
    text,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset="UTF-8"`,
    ``,
    html,
    ``,
    `--${boundary}--`,
  ]
  return Buffer.from(lines.join('\r\n'))
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

// ─── POST Handler ─────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    // 1. Parse request body
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return jsonResponse(400, 'validation_error', 'Invalid JSON request body')
    }

    // 2. Validate with zod schema
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return jsonResponse(
        400,
        'validation_error',
        parsed.error.issues[0]?.message ?? 'Invalid contact form submission'
      )
    }

    const { name, email, message, company } = parsed.data

    // 3. Honeypot — silently succeed for bots
    if (company) {
      return jsonResponse(200, 'success', 'Message sent successfully')
    }

    // 4. Check required Gmail API env vars
    const {
      GMAIL_CLIENT_ID,
      GMAIL_CLIENT_SECRET,
      GMAIL_REFRESH_TOKEN,
      GMAIL_SENDER_EMAIL,
      CONTACT_TO_EMAIL,
    } = process.env

    if (
      !GMAIL_CLIENT_ID ||
      !GMAIL_CLIENT_SECRET ||
      !GMAIL_REFRESH_TOKEN ||
      !GMAIL_SENDER_EMAIL ||
      !CONTACT_TO_EMAIL
    ) {
      console.error('Contact form: Gmail API environment variables are not configured.')
      return jsonResponse(
        503,
        'not_configured',
        'Email service is not configured. Please try again later.'
      )
    }

    // 5. Get a fresh access token via OAuth2
    const oauth2Client = new OAuth2Client(
      GMAIL_CLIENT_ID,
      GMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    )
    oauth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN })

    const { token: accessToken } = await oauth2Client.getAccessToken()
    if (!accessToken) {
      console.error('Contact form: Failed to obtain Gmail access token.')
      return jsonResponse(500, 'send_failed', 'Failed to authenticate with email service.')
    }

    // 6. Build email content
    const safeName    = escapeHtml(name)
    const safeEmail   = escapeHtml(email)
    const safeMessage = escapeHtml(message)

    const subject = `New Portfolio Contact from ${name.replace(/[\r\n]+/g, ' ')}`

    const textBody = [
      `You have a new message from your portfolio contact form.`,
      ``,
      `Name:    ${name}`,
      `Email:   ${email}`,
      ``,
      `Message:`,
      message,
    ].join('\n')

    const htmlBody = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#0a0a0f;color:#e5e7eb;padding:32px;border-radius:16px;border:1px solid #1f2937;">
        <div style="margin-bottom:24px;">
          <h2 style="margin:0 0 4px;font-size:20px;color:#f9fafb;">📬 New Portfolio Contact</h2>
          <p style="margin:0;font-size:13px;color:#6b7280;">Submitted via portfolio contact form</p>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tr>
            <td style="padding:10px 0;font-size:13px;color:#9ca3af;width:80px;vertical-align:top;">Name</td>
            <td style="padding:10px 0;font-size:14px;color:#f9fafb;font-weight:600;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;font-size:13px;color:#9ca3af;vertical-align:top;">Email</td>
            <td style="padding:10px 0;font-size:14px;">
              <a href="mailto:${safeEmail}" style="color:#60a5fa;text-decoration:none;">${safeEmail}</a>
            </td>
          </tr>
        </table>

        <div style="border-top:1px solid #1f2937;padding-top:20px;">
          <p style="margin:0 0 10px;font-size:13px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
          <p style="margin:0;font-size:15px;color:#d1d5db;line-height:1.7;white-space:pre-wrap;">${safeMessage}</p>
        </div>

        <div style="margin-top:32px;padding-top:20px;border-top:1px solid #1f2937;">
          <a href="mailto:${safeEmail}"
            style="display:inline-block;background:#3b82f6;color:#fff;font-size:14px;font-weight:600;padding:10px 20px;border-radius:8px;text-decoration:none;">
            Reply to ${safeName}
          </a>
        </div>
      </div>
    `

    // 7. Encode the MIME message
    const raw = buildRawMessage({
      from: `"Portfolio Contact" <${GMAIL_SENDER_EMAIL}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject,
      text: textBody,
      html: htmlBody,
    })

    // 8. Send via Gmail REST API (no googleapis bundle needed)
    const gmailRes = await fetch(
      'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ raw }),
      }
    )

    if (!gmailRes.ok) {
      const errBody = await gmailRes.text().catch(() => 'unknown')
      console.error('Gmail API error:', gmailRes.status, errBody)
      return jsonResponse(500, 'send_failed', 'Failed to send message. Please try again later.')
    }

    return jsonResponse(200, 'success', 'Message sent successfully')
  } catch (error) {
    console.error('Contact form – unexpected error:', error)
    return jsonResponse(500, 'send_failed', 'Failed to send message. Please try again later.')
  }
}
