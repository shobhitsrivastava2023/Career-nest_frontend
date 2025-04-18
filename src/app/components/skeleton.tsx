import type React from "react"
import { cn } from "../lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("animate-pulse rounded-md bg-gradient-to-r from-zinc-800 to-zinc-900", className)} {...props} />
  )
}

export { Skeleton }
