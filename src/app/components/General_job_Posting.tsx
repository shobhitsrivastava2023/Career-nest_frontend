"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ArrowLeft, ArrowRight, Briefcase, ExternalLink, MapPin, Calendar } from "lucide-react"
import { Skeleton } from "./skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface Job {
  job_id: string
  company: string
  company_id: string
  title: string
  location: string
  url: string
  salary_range_min: number | null
  salary_range_max: number | null
  company_url_clean: string
  business_description_short: string
  description_tags: string[]
  updated_at: string
}

interface ApiResponse {
  jobs: Job[]
}

const General_job_Posting: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleCards, setVisibleCards] = useState<number>(4)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Determine visible cards based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2)
      } else if (window.innerWidth < 1280) {
        setVisibleCards(3)
      } else {
        setVisibleCards(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:8000/api/general_jobs_fixed.json")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: ApiResponse = await response.json()
        setJobs(data.jobs)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch job listings:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch job listings")
        setLoading(false)

        // For demo purposes, create mock data if fetch fails
        const mockJobs: Job[] = Array(8)
          .fill(null)
          .map((_, i) => ({
            job_id: `job-${i}`,
            company: ["Meta", "Google", "Amazon", "Microsoft", "Apple", "Netflix", "Tesla", "Adobe"][i % 8],
            company_id: `company-${i}`,
            title: [
              "Senior Frontend Developer",
              "Machine Learning Engineer",
              "Product Manager",
              "UX Designer",
              "DevOps Engineer",
              "Data Scientist",
              "Full Stack Developer",
              "Software Engineer",
            ][i % 8],
            location: ["San Francisco, CA", "New York, NY", "Seattle, WA", "Austin, TX", "Remote"][i % 5],
            url: "#",
            salary_range_min: 100000 + i * 10000,
            salary_range_max: 150000 + i * 15000,
            company_url_clean: "#",
            business_description_short: "Technology company",
            description_tags: [
              ["React", "TypeScript", "Next.js"],
              ["Python", "TensorFlow", "PyTorch"],
              ["Product", "Strategy", "Agile"],
              ["Figma", "UI/UX", "Design Systems"],
              ["AWS", "Docker", "Kubernetes"],
              ["Python", "SQL", "Machine Learning"],
              ["JavaScript", "Node.js", "MongoDB"],
              ["Java", "Spring", "Microservices"],
            ][i % 8],
            updated_at: new Date(Date.now() - i * 86400000).toISOString(),
          }))
        setJobs(mockJobs)
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // For demo purposes, simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + visibleCards >= jobs.length ? 0 : prevIndex + visibleCards))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, jobs.length - visibleCards) : prevIndex - visibleCards,
    )
  }

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

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-10 w-64 bg-zinc-800/50 rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 bg-zinc-800/50 rounded-full" />
            <Skeleton className="h-10 w-10 bg-zinc-800/50 rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-64 bg-zinc-800/50 rounded-xl" />
            ))}
        </div>
      </div>
    )
  }

  if (error && jobs.length === 0) {
    return (
      <Card className="w-full max-w-7xl mx-auto bg-zinc-900/60 border-zinc-800 text-white">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-red-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Failed to load job listings</h3>
          <p className="text-zinc-400 text-center max-w-md mb-4">{error}</p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="border-zinc-700 hover:bg-zinc-800 text-white"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (jobs.length === 0) {
    return (
      <Card className="w-full max-w-7xl mx-auto bg-zinc-900/60 border-zinc-800 text-white">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-zinc-500 mb-4">
            <Briefcase size={48} />
          </div>
          <h3 className="text-xl font-medium mb-2">No job listings available</h3>
          <p className="text-zinc-400 text-center">Check back later for new opportunities</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4" ref={carouselRef}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Featured Job Opportunities</h2>
          <p className="text-zinc-400 text-sm mt-1">Discover your next career move</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={prevSlide}
            variant="outline"
            size="icon"
            className="rounded-full border-zinc-700 hover:bg-zinc-800 text-white"
            aria-label="Previous jobs"
          >
            <ArrowLeft size={18} />
          </Button>
          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="rounded-full border-zinc-700 hover:bg-zinc-800 text-white"
            aria-label="Next jobs"
          >
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0.5, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.5, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {jobs.slice(currentIndex, currentIndex + visibleCards).map((job) => (
              <Card
                key={job.job_id}
                className="bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden group h-full"
              >
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

                      {(job.salary_range_min || job.salary_range_max) && (
                        <div className="mb-3">
                          <Badge variant="outline" className="bg-zinc-800/80 border-zinc-700 text-emerald-400">
                            {job.salary_range_min && job.salary_range_max
                              ? `$${(job.salary_range_min / 1000).toFixed(0)}k - $${(job.salary_range_max / 1000).toFixed(0)}k`
                              : job.salary_range_min
                                ? `From $${(job.salary_range_min / 1000).toFixed(0)}k`
                                : job.salary_range_max
                                  ? `Up to $${(job.salary_range_max / 1000).toFixed(0)}k`
                                  : 'Salary not specified'}
                          </Badge>
                        </div>
                      )}

                      {job.description_tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {job.description_tags.slice(0, 3).map((tag, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-0"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {job.description_tags.length > 3 && (
                            <Badge variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-0">
                              +{job.description_tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-auto flex justify-between items-center pt-2 border-t border-zinc-800">
                      <div className="flex items-center text-zinc-500 text-xs">
                        <Calendar size={12} className="mr-1" />
                        <span>{new Date(job.updated_at).toLocaleDateString()}</span>
                      </div>

                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-zinc-300 hover:text-white hover:bg-zinc-800"
                      >
                        <a href={job.url} target="_blank" rel="noopener noreferrer">
                          View
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination indicator */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(jobs.length / visibleCards) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * visibleCards)}
            className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / visibleCards) === index ? "w-6 bg-emerald-500" : "bg-zinc-700 hover:bg-zinc-600"
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default General_job_Posting
