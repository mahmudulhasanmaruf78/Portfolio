import { cn } from '@/lib/utils'

type BadgeVariant =
  | 'default'
  | 'accent'
  | 'muted'
  | 'learning'
  | 'familiar'
  | 'confident'
  | 'success'
  | 'warning'
  | 'info'
  | 'purple'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: BadgeVariant
  dot?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-surface-elevated text-muted-foreground border-surface-border',
  accent:
    'bg-accent/8 text-accent border-accent/20',
  muted:
    'bg-surface text-muted-foreground border-surface-border/60',
  learning:
    'bg-warning-subtle text-warning border-warning-border',
  familiar:
    'bg-info-subtle text-info border-info-border',
  confident:
    'bg-success-subtle text-success border-success-border',
  success:
    'bg-success-subtle text-success border-success-border',
  warning:
    'bg-warning-subtle text-warning border-warning-border',
  info:
    'bg-info-subtle text-info border-info-border',
  purple:
    'bg-purple-500/8 text-purple-400 border-purple-500/20',
}

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-muted-foreground',
  accent: 'bg-accent',
  muted: 'bg-muted-foreground',
  learning: 'bg-warning',
  familiar: 'bg-info',
  confident: 'bg-success',
  success: 'bg-success',
  warning: 'bg-warning',
  info: 'bg-info',
  purple: 'bg-purple-400',
}

export function Badge({ children, className, variant = 'default', dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-medium leading-4 tracking-wide',
        variantStyles[variant],
        className,
      )}
    >
      {dot && (
        <span
          className={cn('h-1.5 w-1.5 flex-shrink-0 rounded-full', dotColors[variant])}
          aria-hidden
        />
      )}
      {children}
    </span>
  )
}
