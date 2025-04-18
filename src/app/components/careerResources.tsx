"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  BookOpen,
  BriefcaseIcon,
  ChevronRight,
  FileText,
  GraduationCap,
  LightbulbIcon,
  LineChart,
  MessagesSquare,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react"

const resources = [
  {
    id: "resume",
    title: "Resume Builder",
    description: "Create a professional resume tailored to your target roles",
    icon: FileText,
    category: "tools",
    popularity: 98,
    badge: "Most Popular",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-800/50",
  },
  {
    id: "interview",
    title: "Interview Prep",
    description: "Practice with AI-powered mock interviews for tech roles",
    icon: MessagesSquare,
    category: "tools",
    popularity: 92,
    badge: "Trending",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-800/50",
  },
  {
    id: "skills",
    title: "Skills Assessment",
    description: "Evaluate your technical skills and identify gaps",
    icon: Trophy,
    category: "tools",
    popularity: 85,
  },
  {
    id: "network",
    title: "Networking Events",
    description: "Connect with industry professionals at virtual events",
    icon: Users,
    category: "events",
    popularity: 88,
    badge: "Upcoming",
    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-800/50",
  },
  {
    id: "webinars",
    title: "Tech Webinars",
    description: "Learn from experts about emerging technologies",
    icon: LightbulbIcon,
    category: "events",
    popularity: 82,
  },
  {
    id: "career-fair",
    title: "Virtual Career Fair",
    description: "Meet recruiters from top tech companies",
    icon: BriefcaseIcon,
    category: "events",
    popularity: 90,
  },
  {
    id: "salary",
    title: "Salary Insights",
    description: "Compare compensation across companies and roles",
    icon: LineChart,
    category: "insights",
    popularity: 95,
    badge: "New",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-800/50",
  },
  {
    id: "trends",
    title: "Industry Trends",
    description: "Stay updated with the latest tech industry developments",
    icon: Sparkles,
    category: "insights",
    popularity: 87,
  },
  {
    id: "courses",
    title: "Learning Paths",
    description: "Curated courses to build in-demand skills",
    icon: GraduationCap,
    category: "insights",
    popularity: 89,
  },
]

export default function CareerResources() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredResources =
    activeTab === "all" ? resources : resources.filter((resource) => resource.category === activeTab)

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-emerald-400" />
          Career Resources
        </h2>
        <p className="text-zinc-400 text-sm mt-1">Tools and insights to accelerate your professional growth</p>
      </div>

      <Card className="bg-zinc-900/60 border-zinc-800 overflow-hidden">
        <CardContent className="p-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
              <TabsList className="bg-zinc-800/50 border border-zinc-700 p-1 h-auto">
                <TabsTrigger
                  value="all"
                  className="px-4 py-2 rounded-md data-[state=active]:text-white relative overflow-hidden transition-all duration-300"
                >
                  {activeTab === "all" && (
                    <motion.div
                      layoutId="activeResourceTabBackground"
                      className="absolute inset-0 bg-gradient-to-br from-zinc-600 to-zinc-800 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  All Resources
                </TabsTrigger>
                <TabsTrigger
                  value="tools"
                  className="px-4 py-2 rounded-md data-[state=active]:text-white relative overflow-hidden transition-all duration-300"
                >
                  {activeTab === "tools" && (
                    <motion.div
                      layoutId="activeResourceTabBackground"
                      className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  Career Tools
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="px-4 py-2 rounded-md data-[state=active]:text-white relative overflow-hidden transition-all duration-300"
                >
                  {activeTab === "events" && (
                    <motion.div
                      layoutId="activeResourceTabBackground"
                      className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  Events
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="px-4 py-2 rounded-md data-[state=active]:text-white relative overflow-hidden transition-all duration-300"
                >
                  {activeTab === "insights" && (
                    <motion.div
                      layoutId="activeResourceTabBackground"
                      className="absolute inset-0 bg-gradient-to-br from-violet-600 to-violet-800 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  Insights
                </TabsTrigger>
              </TabsList>

              <div className="hidden md:block">
                <Badge variant="outline" className="bg-zinc-800/80 text-zinc-300 border-zinc-700">
                  {filteredResources.length} resources available
                </Badge>
              </div>
            </div>

            <TabsContent value={activeTab} className="mt-0 outline-none">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
                  {filteredResources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="h-auto"
                      style={{ alignSelf: "start" }}
                    >
                      <Card className="bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 transition-all duration-300 overflow-hidden h-full">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="p-2 rounded-md bg-gradient-to-br from-zinc-700 to-zinc-900">
                              <resource.icon className="h-5 w-5 text-zinc-300" />
                            </div>
                            {resource.badge && (
                              <Badge variant="outline" className={`${resource.badgeColor}`}>
                                {resource.badge}
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg font-medium mt-3 text-white">{resource.title}</CardTitle>
                          <CardDescription className="text-zinc-400 mt-1">{resource.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-0 pb-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="text-xs text-zinc-500">Popularity</div>
                            <div className="ml-2 h-1.5 w-16 bg-zinc-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                                style={{ width: `${resource.popularity}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-xs text-zinc-400">{resource.popularity}%</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-zinc-300 hover:text-white hover:bg-zinc-700 h-8 px-3"
                          >
                            Explore
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
