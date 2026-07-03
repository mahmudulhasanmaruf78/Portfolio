import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
}

type ButtonProps = ButtonBaseProps &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  )

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-accent text-white font-medium',
    'shadow-[0_1px_2px_hsl(0_0%_0%/0.5),inset_0_1px_0_hsl(255_100%_100%/0.15)]',
    'hover:bg-accent-hover hover:shadow-[0_2px_8px_hsl(220_96%_62%/0.4),inset_0_1px_0_hsl(255_100%_100%/0.15)]',
    'active:scale-[0.97] active:shadow-none',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100',
  ].join(' '),

  secondary: [
    'bg-surface text-foreground font-medium',
    'border border-surface-border',
    'shadow-[0_1px_2px_hsl(0_0%_0%/0.3),inset_0_1px_0_hsl(255_100%_100%/0.04)]',
    'hover:bg-surface-hover hover:border-white/[0.12] hover:shadow-[0_2px_8px_hsl(0_0%_0%/0.4)]',
    'active:scale-[0.97]',
  ].join(' '),

  outline: [
    'bg-transparent text-foreground font-medium',
    'border border-surface-border',
    'hover:bg-surface hover:border-white/[0.1]',
    'active:scale-[0.97]',
  ].join(' '),

  ghost: [
    'bg-transparent text-muted-foreground font-medium',
    'hover:bg-surface hover:text-foreground',
    'active:scale-[0.97]',
  ].join(' '),

  danger: [
    'bg-red-500/10 text-red-400 font-medium',
    'border border-red-500/20',
    'hover:bg-red-500/15 hover:border-red-500/30',
    'active:scale-[0.97]',
  ].join(' '),
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'h-7 px-2.5 text-xs gap-1.5 rounded-md',
  sm: 'h-8 px-3 text-sm gap-1.5 rounded-lg',
  md: 'h-9 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-11 px-5 text-base gap-2 rounded-xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  loading,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    variantStyles[variant],
    sizeStyles[size],
    (disabled || loading) && 'pointer-events-none',
    className,
  )

  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      )}
      {children}
    </>
  )

  if ('href' in props && props.href) {
    const { href, ...rest } = props
    return (
      <Link href={href} className={classes} {...(rest as object)}>
        {content}
      </Link>
    )
  }

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
}
