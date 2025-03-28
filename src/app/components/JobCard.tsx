import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, BuildingIcon, MapPinIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
}

export default function JobCard({ job }: JobCardProps) {
  // Helper function to determine badge color based on tag
  const getBadgeClass = (tag: string) => {
    const tagLower = tag.toLowerCase();
    if (tagLower === "python") return "bg-blue-600 hover:bg-blue-700";
    if (tagLower === "java") return "bg-orange-600 hover:bg-orange-700";
    if (tagLower === "c++" || tagLower === "c") return "bg-purple-600 hover:bg-purple-700";
    if (tagLower === "javascript" || tagLower === "typescript") return "bg-yellow-600 hover:bg-yellow-700";
    if (tagLower === "react" || tagLower === "angular" || tagLower === "vue") return "bg-cyan-600 hover:bg-cyan-700";
    if (tagLower === "aws" || tagLower === "azure" || tagLower === "gcp") return "bg-green-600 hover:bg-green-700";
    if (tagLower === "sql" || tagLower === "nosql" || tagLower === "mongodb") return "bg-red-600 hover:bg-red-700";
    return "bg-gray-600 hover:bg-gray-700";
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">{job.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <BuildingIcon className="h-4 w-4 text-zinc-400" />
          <span className="text-zinc-300">{job.company}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <MapPinIcon className="h-4 w-4 text-zinc-400" />
          <span className="text-zinc-300">{job.location}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <CalendarIcon className="h-4 w-4 text-zinc-400" />
          <span className="text-zinc-300">{job.postedDate}</span>
        </div>
        <p className="text-zinc-300 text-sm line-clamp-3">{job.description}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {job.tags.slice(0, 5).map((tag) => (
          <Badge
            key={tag}
            className={cn(
              "text-xs",
              getBadgeClass(tag)
            )}
          >
            {tag}
          </Badge>
        ))}
        {job.tags.length > 5 && (
          <Badge className="text-xs bg-zinc-600 hover:bg-zinc-700">
            +{job.tags.length - 5} more
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
}