import { cn } from '@/lib/utils'
import { type HTMLAttributes, type ElementType } from 'react'

// ─── Variant definitions ────────────────────────────────────────────────────

type GlassVariant =
  | 'default'   // standard content card
  | 'subtle'    // lower opacity — section containers, wrappers
  | 'elevated'  // modal / overlay level — higher opacity + stronger blur
  | 'navbar'    // ultra-thin — navbar strip
  | 'inset'     // depressed inner panel — used inside a card

type GlassSize = 'none' | 'sm' | 'md' | 'lg' | 'xl'

// ─── Props ──────────────────────────────────────────────────────────────────

interface GlassCardProps extends HTMLAttributes<HTMLElement> {
  /** Visual variant controlling opacity/blur/shadow intensity */
  variant?: GlassVariant
  /** Built-in padding preset (pass 'none' and add your own via className) */
  padding?: GlassSize
  /** Rounded corner preset */
  radius?: GlassSize
  /** Adds hover lift + border glow — for interactive cards */
  interactive?: boolean
  /** Render as any HTML element or component */
  as?: ElementType
  className?: string
  children?: React.ReactNode
}

// ─── Style maps ─────────────────────────────────────────────────────────────

const variantBase: Record<GlassVariant, string> = {
  default: [
    // Dark mode (aurora) — semi-transparent with blur
    'bg-white/[0.04] backdrop-blur-md',
    'border border-white/[0.08]',
    'shadow-[0_1px_1px_hsl(0_0%_0%/0.4),inset_0_1px_0_hsl(255_100%_100%/0.05)]',
    // Light mode overrides
    'dark:bg-white/[0.04] light:bg-black/[0.03]',
    'dark:border-white/[0.08] light:border-black/[0.07]',
    'dark:shadow-[0_1px_1px_hsl(0_0%_0%/0.4),inset_0_1px_0_hsl(255_100%_100%/0.05)]',
    'light:shadow-[0_1px_3px_hsl(0_0%_0%/0.08),inset_0_1px_0_hsl(255_100%_100%/0.9)]',
  ].join(' '),

  subtle: [
    'bg-white/[0.02] backdrop-blur-sm',
    'border border-white/[0.05]',
    'shadow-none',
    'light:bg-black/[0.015] light:border-black/[0.05]',
  ].join(' '),

  elevated: [
    'bg-white/[0.08] backdrop-blur-xl',
    'border border-white/[0.14]',
    'shadow-[0_24px_48px_hsl(0_0%_0%/0.6),inset_0_1px_0_hsl(255_100%_100%/0.1)]',
    'light:bg-white/80 light:border-black/[0.10]',
    'light:shadow-[0_8px_32px_hsl(0_0%_0%/0.12),inset_0_1px_0_hsl(255_100%_100%/0.9)]',
  ].join(' '),

  navbar: [
    'bg-white/[0.03] backdrop-blur-lg',
    'border-b border-white/[0.06]',
    'shadow-[0_1px_0_hsl(0_0%_0%/0.3)]',
    'light:bg-white/70 light:border-black/[0.06]',
    'light:shadow-[0_1px_0_hsl(0_0%_0%/0.06)]',
  ].join(' '),

  inset: [
    'bg-black/[0.15] backdrop-blur-sm',
    'border border-white/[0.04]',
    'shadow-[inset_0_1px_3px_hsl(0_0%_0%/0.4)]',
    'light:bg-black/[0.04] light:border-black/[0.06]',
    'light:shadow-[inset_0_1px_3px_hsl(0_0%_0%/0.08)]',
  ].join(' '),
}

const paddingMap: Record<GlassSize, string> = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
  xl:   'p-10 md:p-12',
}

const radiusMap: Record<GlassSize, string> = {
  none: '',
  sm:   'rounded-lg',
  md:   'rounded-xl',
  lg:   'rounded-2xl',
  xl:   'rounded-3xl',
}

// Interactive hover state — border brightens, background lifts slightly, card rises
const interactiveStyles = [
  'transition-all duration-300 ease-out',
  'cursor-pointer',
  // Dark hover
  'hover:bg-white/[0.07]',
  'hover:border-white/[0.18]',
  'hover:shadow-[0_8px_32px_hsl(0_0%_0%/0.5),0_0_0_1px_hsl(220_96%_62%/0.15),inset_0_1px_0_hsl(255_100%_100%/0.08)]',
  'hover:-translate-y-1',
  // Light hover
  'light:hover:bg-black/[0.06]',
  'light:hover:border-black/[0.14]',
  'light:hover:shadow-[0_8px_24px_hsl(0_0%_0%/0.10),0_0_0_1px_hsl(220_90%_52%/0.15)]',
  'active:translate-y-0 active:transition-none',
].join(' ')

// ─── Component ──────────────────────────────────────────────────────────────

export function GlassCard({
  variant = 'default',
  padding = 'md',
  radius = 'lg',
  interactive = false,
  as: Tag = 'div',
  className,
  children,
  ...rest
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        variantBase[variant],
        paddingMap[padding],
        radiusMap[radius],
        interactive && interactiveStyles,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// ─── Named convenience exports ───────────────────────────────────────────────
// These are semantic aliases — use instead of <GlassCard> when intent is clear.

/** Standard project / content card */
export function GlassProjectCard(props: Omit<GlassCardProps, 'variant'>) {
  return <GlassCard variant="default" interactive radius="xl" {...props} />
}

/** Section wrapper panel */
export function GlassSectionPanel(props: Omit<GlassCardProps, 'variant'>) {
  return <GlassCard variant="subtle" radius="xl" {...props} />
}

/** Modal / dialog container */
export function GlassModal(props: Omit<GlassCardProps, 'variant'>) {
  return <GlassCard variant="elevated" radius="xl" {...props} />
}

/** Inner nested panel (inside a card) */
export function GlassInset(props: Omit<GlassCardProps, 'variant'>) {
  return <GlassCard variant="inset" radius="md" {...props} />
}
