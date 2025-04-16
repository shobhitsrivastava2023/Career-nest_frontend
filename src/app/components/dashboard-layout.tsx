import { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  description?: string
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  return (
    <div className="bg-gradient-to-b from-zinc-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            {title}
          </h1>
          {description && <p className="mt-2 text-zinc-400 max-w-3xl">{description}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}
