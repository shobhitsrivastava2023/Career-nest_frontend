"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import JobCard from "./JobCard"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Code, Database, FileCode2, Server } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Job {
  job_id: string
  title: string
  company: string
  location: string
  updated_at: string
  description_tags?: string[]
  business_description_short?: string
}

interface JobsState {
  python: Job[]
  java: Job[]
  "c++": Job[]
}

interface FormattedJob {
  id: string
  title: string
  company: string
  location: string
  postedDate: string
  tags: string[]
  description: string
}

const TaggedJobs: React.FC = () => {
  const [activeTag, setActiveTag] = useState<"python" | "java" | "c++">("python")
  const [jobs, setJobs] = useState<JobsState>({
    python: [],
    java: [],
    "c++": [],
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Language metadata for better UI presentation
  const languageInfo = {
    python: {
      name: "Python",
      icon: FileCode2,
      color: "from-blue-600 to-blue-800",
      accentColor: "bg-blue-600",
      lightColor: "bg-blue-500/10",
      textColor: "text-blue-400",
      borderColor: "border-blue-800/50",
    },
    java: {
      name: "Java",
      icon: Server,
      color: "from-orange-600 to-orange-800",
      accentColor: "bg-orange-600",
      lightColor: "bg-orange-500/10",
      textColor: "text-orange-400",
      borderColor: "border-orange-800/50",
    },
    "c++": {
      name: "C++",
      icon: Code,
      color: "from-purple-600 to-purple-800",
      accentColor: "bg-purple-600",
      lightColor: "bg-purple-500/10",
      textColor: "text-purple-400",
      borderColor: "border-purple-800/50",
    },
  }

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      try {
        const endpoints = {
          python: "http://localhost:8000/api/python_jobs_fixed.json",
          java: "http://localhost:8000/api/java_jobs_fixed.json",
          "c++": "http://localhost:8000/api/cpp_jobs_fixed.json",
        }

        // Fetch all job data when component mounts
        const responses = await Promise.all(
          Object.entries(endpoints).map(([key, url]) =>
            fetch(url)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`)
                }
                return response.json()
              })
              .then((data) => ({ key, data }))
              .catch((error) => {
                console.error(`Error fetching ${key} jobs:`, error)
                // Return empty results instead of failing completely
                return { key, data: { results: { hits: [] } } }
              }),
          ),
        )

        // Extract the hits from each response
        const jobsData = responses.reduce(
          (acc, { key, data }) => {
            acc[key as keyof JobsState] = data.results?.hits || []
            return acc
          },
          { python: [], java: [], "c++": [] } as JobsState,
        )

        setJobs(jobsData)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching jobs:", err)
        setError(err instanceof Error ? err.message : "Failed to load job listings. Please try again later.")

        // Create mock data for demonstration purposes
        const mockJobs: JobsState = {
          python: Array(8)
            .fill(null)
            .map((_, i) => createMockJob(i, "Python")),
          java: Array(8)
            .fill(null)
            .map((_, i) => createMockJob(i, "Java")),
          "c++": Array(8)
            .fill(null)
            .map((_, i) => createMockJob(i, "C++")),
        }
        setJobs(mockJobs)
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // Helper function to create mock job data
  const createMockJob = (index: number, language: string): Job => {
    const companies = [
      "TechCorp",
      "DataSystems",
      "CodeNation",
      "AlgoWorks",
      "ByteForge",
      "QuantumSoft",
      "NexusAI",
      "CloudScale",
    ]
    const locations = ["San Francisco, CA", "New York, NY", "Seattle, WA", "Austin, TX", "Remote"]
    const titles = [
      `Senior ${language} Developer`,
      `${language} Backend Engineer`,
      `${language} Data Scientist`,
      `${language} Software Architect`,
      `${language} Full Stack Developer`,
      `${language} ML Engineer`,
      `${language} DevOps Specialist`,
      `${language} Systems Engineer`,
    ]
    const tags = [
      language,
      "Backend",
      "API",
      "AWS",
      "Docker",
      "Kubernetes",
      "REST",
      "GraphQL",
      "SQL",
      "NoSQL",
      "Git",
      "CI/CD",
      "Microservices",
      "Cloud",
    ]

    // Select 2-4 random tags including the language
    const selectedTags = [language]
    const shuffledTags = tags.filter((tag) => tag !== language).sort(() => 0.5 - Math.random())
    const additionalTagCount = Math.floor(Math.random() * 3) + 1 // 1-3 additional tags
    selectedTags.push(...shuffledTags.slice(0, additionalTagCount))

    return {
      job_id: `${language.toLowerCase()}-job-${index}`,
      title: titles[index % titles.length],
      company: companies[index % companies.length],
      location: locations[index % locations.length],
      updated_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 30 days
      description_tags: selectedTags,
      business_description_short: `We are looking for an experienced ${language} developer to join our team and help build scalable, high-performance applications.`,
    }
  }

  const formatJob = (job: Job): FormattedJob => ({
    id: job.job_id,
    title: job.title,
    company: job.company,
    location: job.location,
    postedDate: new Date(job.updated_at).toLocaleDateString(),
    tags: job.description_tags || [],
    description: job.business_description_short || "",
  })

  // Get job count for each language
  const getJobCount = (language: keyof JobsState) => jobs[language]?.length || 0

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTag(value as "python" | "java" | "c++")
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Job Listings Based On Skills</h2>
        <p className="text-zinc-400 text-sm mt-1">Find opportunities matching your programming expertise</p>
      </div>

      <Card className="bg-zinc-900/60 border-zinc-800 overflow-hidden">
        <CardContent className="p-6">
          <Tabs defaultValue="python" value={activeTag} onValueChange={handleTabChange} className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <TabsList className="bg-zinc-800/50 border border-zinc-700 p-1 h-auto">
                {Object.entries(languageInfo).map(([key, info]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className={`
                      px-4 py-2 rounded-md data-[state=active]:text-white relative overflow-hidden
                      transition-all duration-300 flex items-center gap-2
                      data-[state=active]:shadow-md
                    `}
                    style={{
                      backgroundColor: activeTag === key ? `var(--${key}-color, transparent)` : "transparent",
                    }}
                  >
                    {activeTag === key && (
                      <motion.div
                        layoutId="activeTabBackground"
                        className={`absolute inset-0 bg-gradient-to-br ${info.color} -z-10`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <info.icon className="w-4 h-4" />
                    <span>{info.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="flex gap-4">
                {Object.entries(languageInfo).map(([key, info]) => (
                  <div
                    key={key}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${info.lightColor} ${info.textColor} ${info.borderColor} border`}
                  >
                    <info.icon className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{getJobCount(key as keyof JobsState)} jobs</span>
                  </div>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
                {Array(8)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton key={index} className="h-64 bg-zinc-800/50 rounded-xl" />
                  ))}
              </div>
            ) : error && Object.values(jobs).every((jobList) => jobList.length === 0) ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                <h3 className="text-xl font-medium mb-2">Failed to load job listings</h3>
                <p className="text-zinc-400 max-w-md mb-6">{error}</p>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="border-zinc-700 hover:bg-zinc-800 text-white"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                <TabsContent value="python" className="mt-0 outline-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  >
                    {jobs.python.length > 0 ? (
                      jobs.python.map((job) => <JobCard key={job.job_id} job={formatJob(job)} language="python" />)
                    ) : (
                      <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                        <Database className="w-12 h-12 text-zinc-600 mb-4" />
                        <h3 className="text-xl font-medium mb-2">No Python jobs found</h3>
                        <p className="text-zinc-400">Check back later for new opportunities</p>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>

                <TabsContent value="java" className="mt-0 outline-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  >
                    {jobs.java.length > 0 ? (
                      jobs.java.map((job) => <JobCard key={job.job_id} job={formatJob(job)} language="java" />)
                    ) : (
                      <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                        <Database className="w-12 h-12 text-zinc-600 mb-4" />
                        <h3 className="text-xl font-medium mb-2">No Java jobs found</h3>
                        <p className="text-zinc-400">Check back later for new opportunities</p>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>

                <TabsContent value="c++" className="mt-0 outline-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  >
                    {jobs["c++"].length > 0 ? (
                      jobs["c++"].map((job) => <JobCard key={job.job_id} job={formatJob(job)} language="c++" />)
                    ) : (
                      <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                        <Database className="w-12 h-12 text-zinc-600 mb-4" />
                        <h3 className="text-xl font-medium mb-2">No C++ jobs found</h3>
                        <p className="text-zinc-400">Check back later for new opportunities</p>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>
              </>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default TaggedJobs

