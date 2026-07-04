'use client'

import { useTheme } from '@/contexts/ThemeContext'

/**
 * AuroraBackground
 *
 * Renders 3 large, blurred gradient blobs that slowly drift using CSS keyframe
 * animations. Only visible in dark mode — hidden entirely in light mode.
 *
 * Sits at z-0 behind all page content (sections should be z-10+).
 * pointer-events: none so it never blocks clicks.
 */
export function AuroraBackground() {
  const { isDark } = useTheme()

  if (!isDark) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Blob 1 — teal/green, top-left drift */}
      <div
        className="aurora-blob"
        style={{
          width: '60vw',
          height: '60vw',
          maxWidth: '900px',
          maxHeight: '900px',
          top: '-15%',
          left: '-10%',
          background:
            'radial-gradient(ellipse at center, hsl(160 80% 40% / 0.22) 0%, hsl(180 70% 35% / 0.10) 45%, transparent 70%)',
          animationName: 'auroraFloat1',
          animationDuration: '22s',
        }}
      />

      {/* Blob 2 — purple/violet, center-right drift */}
      <div
        className="aurora-blob"
        style={{
          width: '55vw',
          height: '55vw',
          maxWidth: '820px',
          maxHeight: '820px',
          top: '20%',
          right: '-15%',
          background:
            'radial-gradient(ellipse at center, hsl(270 70% 55% / 0.20) 0%, hsl(250 60% 50% / 0.09) 45%, transparent 70%)',
          animationName: 'auroraFloat2',
          animationDuration: '28s',
        }}
      />

      {/* Blob 3 — indigo/blue, bottom-center drift */}
      <div
        className="aurora-blob"
        style={{
          width: '50vw',
          height: '50vw',
          maxWidth: '750px',
          maxHeight: '750px',
          bottom: '-10%',
          left: '25%',
          background:
            'radial-gradient(ellipse at center, hsl(220 90% 58% / 0.18) 0%, hsl(200 80% 50% / 0.08) 45%, transparent 70%)',
          animationName: 'auroraFloat3',
          animationDuration: '34s',
        }}
      />
    </div>
  )
}
