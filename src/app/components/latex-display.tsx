"use client"

import { Card } from "@/components/ui/card"

interface LatexDisplayProps {
  code: string
}

export default function LatexDisplay({ code }: LatexDisplayProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 p-4 rounded-md">
      <pre className="text-zinc-300 overflow-x-auto whitespace-pre-wrap text-sm font-mono">{code}</pre>
    </Card>
  )
}

