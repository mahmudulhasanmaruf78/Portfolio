import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center px-5 text-center pt-14">
      <p className="text-8xl font-bold text-surface-border">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-foreground">Page not found</h1>
      <p className="mt-3 text-base text-muted-foreground max-w-sm">
        That page doesn&apos;t exist. It might have moved, or you may have typed the URL incorrectly.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg border border-surface-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
      >
        <ArrowLeft size={14} /> Back to home
      </Link>
    </div>
  )
}
