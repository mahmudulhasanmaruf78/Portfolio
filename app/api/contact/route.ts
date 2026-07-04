import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { contactSchema } from '@/lib/contact'

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

export async function POST(req: Request) {
  try {
    let body: unknown

    try {
      body = await req.json()
    } catch {
      return jsonResponse(400, 'validation_error', 'Invalid JSON request body')
    }

    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return jsonResponse(400, 'validation_error', parsed.error.issues[0]?.message ?? 'Invalid contact form submission')
    }

    const { name, email, message, company } = parsed.data

    if (company) {
      return jsonResponse(200, 'success', 'Message sent successfully')
    }

    const recipient = process.env.CONTACT_TO_EMAIL

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !recipient) {
      console.error('Contact form: SMTP environment variables are not set.')
      return jsonResponse(503, 'not_configured', 'Email service is not configured. Please try again later.')
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message)

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: email,
      subject: `New Portfolio Contact from ${name.replace(/[\r\n]+/g, ' ')}`,
      text: `You have a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; color: #555;">${safeMessage}</p>
        </div>
      `,
    })

    return jsonResponse(200, 'success', 'Message sent successfully')
  } catch (error) {
    console.error('Contact form error:', error)
    return jsonResponse(500, 'send_failed', 'Failed to send message. Please try again later.')
  }
}
