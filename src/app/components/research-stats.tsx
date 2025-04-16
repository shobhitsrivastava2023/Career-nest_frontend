import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, FileText, TrendingUp } from "lucide-react"

export function ResearchStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        icon={<BookOpen className="h-5 w-5 text-blue-400" />}
        title="Publications"
        value="120M+"
        description="Academic papers indexed"
        color="blue"
      />
      <StatCard
        icon={<Users className="h-5 w-5 text-indigo-400" />}
        title="Researchers"
        value="15M+"
        description="Academic profiles"
        color="indigo"
      />
      <StatCard
        icon={<FileText className="h-5 w-5 text-purple-400" />}
        title="Citations"
        value="1.2B+"
        description="Citation connections"
        color="purple"
      />
      <StatCard
        icon={<TrendingUp className="h-5 w-5 text-cyan-400" />}
        title="Impact Metrics"
        value="H-index, i10"
        description="Research impact tracking"
        color="cyan"
      />
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: string
  description: string
  color: "blue" | "indigo" | "purple" | "cyan"
}

function StatCard({ icon, title, value, description, color }: StatCardProps) {
  const gradientMap = {
    blue: "from-blue-500/20 to-blue-500/5",
    indigo: "from-indigo-500/20 to-indigo-500/5",
    purple: "from-purple-500/20 to-purple-500/5",
    cyan: "from-cyan-500/20 to-cyan-500/5",
  }

  const borderMap = {
    blue: "border-blue-500/20",
    indigo: "border-indigo-500/20",
    purple: "border-purple-500/20",
    cyan: "border-cyan-500/20",
  }

  return (
    <Card
      className={`bg-gradient-to-br ${gradientMap[color]} border-t-2 ${borderMap[color]} border-x-0 border-b-0 rounded-lg overflow-hidden`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-400">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-xs text-zinc-500 mt-1">{description}</p>
          </div>
          <div className="bg-zinc-800/50 p-3 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}
