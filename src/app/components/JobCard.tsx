import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, MapPin } from "lucide-react"

interface JobCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    postedDate: string
    tags: string[]
    description: string
  }
  language?: string
}

const JobCard: React.FC<JobCardProps> = ({ job, language = "python" }) => {
  // Language-specific styling
  const languageStyles = {
    python: {
      accentColor: "text-blue-400",
      tagBg: "bg-blue-500/10",
      tagText: "text-blue-400",
      tagBorder: "border-blue-800/50",
    },
    java: {
      accentColor: "text-orange-400",
      tagBg: "bg-orange-500/10",
      tagText: "text-orange-400",
      tagBorder: "border-orange-800/50",
    },
    "c++": {
      accentColor: "text-purple-400",
      tagBg: "bg-purple-500/10",
      tagText: "text-purple-400",
      tagBorder: "border-purple-800/50",
    },
  }

  const styles = languageStyles[language as keyof typeof languageStyles] || languageStyles.python

  // Generate a consistent color for each company
  const getCompanyColor = (company: string) => {
    const colors = [
      "from-blue-600 to-blue-800",
      "from-emerald-600 to-emerald-800",
      "from-amber-600 to-amber-800",
      "from-rose-600 to-rose-800",
      "from-violet-600 to-violet-800",
      "from-cyan-600 to-cyan-800",
      "from-fuchsia-600 to-fuchsia-800",
      "from-lime-600 to-lime-800",
    ]

    // Simple hash function to get consistent color for same company
    const hash = company.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  return (
    <Card className="bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden group h-full">
      <CardContent className="p-5">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <div className="flex items-center mb-3">
              <div
                className={`w-10 h-10 rounded-md bg-gradient-to-br ${getCompanyColor(job.company)} flex items-center justify-center text-white font-bold mr-3`}
              >
                {job.company.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-400">{job.company}</p>
                <h3 className="font-bold text-white line-clamp-1">{job.title}</h3>
              </div>
            </div>

            <div className="flex items-center text-zinc-400 text-sm mb-3">
              <MapPin size={14} className="mr-1 flex-shrink-0" />
              <span className="truncate">{job.location}</span>
            </div>

            {job.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {job.tags.slice(0, 3).map((tag, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className={`${styles.tagBg} ${styles.tagText} ${styles.tagBorder} border`}
                  >
                    {tag}
                  </Badge>
                ))}
                {job.tags.length > 3 && (
                  <Badge variant="outline" className="bg-zinc-800/80 text-zinc-400 border-zinc-700">
                    +{job.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            <p className="text-zinc-400 text-sm line-clamp-2 mb-4">{job.description}</p>
          </div>

          <div className="mt-auto flex justify-between items-center pt-2 border-t border-zinc-800">
            <div className="flex items-center text-zinc-500 text-xs">
              <Calendar size={12} className="mr-1" />
              <span>{job.postedDate}</span>
            </div>

            <Button asChild variant="ghost" size="sm" className="text-zinc-300 hover:text-white hover:bg-zinc-800">
              <a href={`#job-${job.id}`} target="_blank" rel="noopener noreferrer">
                View
                <ExternalLink size={14} className="ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobCard
