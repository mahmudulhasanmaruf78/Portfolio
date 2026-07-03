import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  as?: 'section' | 'div' | 'article'
}

export function Section({ children, className, id, as: Tag = 'section' }: SectionProps) {
  return (
    <Tag id={id} className={cn('section-padding', className)}>
      <div className="container-custom">{children}</div>
    </Tag>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: React.ReactNode | string
  className?: string
  align?: 'left' | 'center'
  titleSize?: 'sm' | 'md' | 'lg'
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = 'left',
  titleSize = 'md',
}: SectionHeaderProps) {
  const titleSizes = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl',
  }

  return (
    <div
      className={cn(
        'mb-14',
        align === 'center' && 'text-center',
        className,
      )}
    >
      {eyebrow && (
        <div className={cn('mb-3', align === 'center' && 'flex justify-center')}>
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <h2
        className={cn(
          'font-semibold text-foreground',
          titleSizes[titleSize],
          align === 'center' && 'mx-auto',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-base text-muted-foreground leading-relaxed',
            align === 'center' ? 'mx-auto max-w-xl' : 'max-w-xl',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
