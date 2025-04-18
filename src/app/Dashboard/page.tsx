"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect, useRef } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts"
import General_job_Posting from "../components/general_job_Posting"
import TaggedJobs from "../components/TaggedJobs"
import TrendingCompaniesByLocation from "../components/TrendingCompaniesByLocation"
import Tech_unicorn_valuation from "../components/Tech_unicorn_valuation"
import CareerResources from "../components/CareerResources"
import DashboardHamburgerMenu from "../components/DashboardHamburger"
import { Skeleton } from "@/components/ui/skeleton"
import { Demo } from "../components/footer"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart3, Briefcase, TrendingUp, Users } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const Page = () => {
  const router = useRouter()

  // Company data with improved structure
  const companies = [
    { name: "Meta", jobs: 287, logo: "M", color: "#4267B2", change: "+12%" },
    { name: "Apple", jobs: 342, logo: "A", color: "#A2AAAD", change: "+8%" },
    { name: "Amazon", jobs: 516, logo: "A", color: "#FF9900", change: "+15%" },
    { name: "Netflix", jobs: 124, logo: "N", color: "#E50914", change: "-3%" },
    { name: "Google", jobs: 478, logo: "G", color: "#4285F4", change: "+10%" },
    { name: "Microsoft", jobs: 389, logo: "M", color: "#00A4EF", change: "+5%" },
    { name: "Tesla", jobs: 213, logo: "T", color: "#CC0000", change: "+7%" },
    { name: "Adobe", jobs: 167, logo: "A", color: "#FF0000", change: "+2%" },
  ]

  // Stats for the summary cards
  const stats = [
    { title: "Total Job Postings", value: "2,516", icon: Briefcase, change: "+12% from last month" },
    { title: "Active Companies", value: "843", icon: Users, change: "+5% from last month" },
    { title: "Avg. Salary", value: "$105K", icon: TrendingUp, change: "+3% from last month" },
    { title: "Tech Openings", value: "1,248", icon: BarChart3, change: "+9% from last month" },
  ]

  const generateJobData = (companyName) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const data = []
    for (let year = 2023; year <= 2024; year++) {
      months.forEach((month, index) => {
        let baseValue
        switch (companyName) {
          case "Meta":
            baseValue = 230
            break
          case "Apple":
            baseValue = 280
            break
          case "Amazon":
            baseValue = 450
            break
          case "Netflix":
            baseValue = 100
            break
          case "Google":
            baseValue = 400
            break
          case "Microsoft":
            baseValue = 320
            break
          case "Tesla":
            baseValue = 180
            break
          case "Adobe":
            baseValue = 140
            break
          default:
            baseValue = 200
        }
        const trend = Math.sin((index + (year - 2023) * 12) / 4) * 50
        const random = Math.random() * 50 - 25
        const value = Math.max(20, Math.round(baseValue + trend + random))
        data.push({
          date: `${month} ${year}`,
          jobs: value,
          applications: Math.round(value * (1.5 + Math.random())), // Added applications data
        })
      })
    }
    return data
  }

  const [selectedCompany, setSelectedCompany] = useState(companies[0])
  const [jobData, setJobData] = useState(generateJobData(companies[0].name))
  const [loading, setLoading] = useState(true)
  const [, setForceUpdate] = useState(0)

  const mainContainerRef = useRef(null)
  const statsRef = useRef(null)
  const enhanceCardRef = useRef(null)
  const generalJobsRef = useRef(null)
  const taggedJobsRef = useRef(null)
  const trendingLocationRef = useRef(null)
  const unicornRef = useRef(null)
  const careerResourcesRef = useRef(null)
  const footerRef = useRef(null)

  const handleCompanySelect = (company) => {
    setSelectedCompany(company)
    setJobData(generateJobData(company.name))
  }

  const handleResumeRedirection = () => {
    router.push("/ResumeEnhance")
  }

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "professionalProfile") {
        setForceUpdate((prev) => prev + 1)
      }
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // GSAP Animation Effect
  useEffect(() => {
    if (loading || !mainContainerRef.current) return

    const ctx = gsap.context(() => {
      const elementsToAnimate = [
        statsRef.current,
        enhanceCardRef.current,
        generalJobsRef.current,
        taggedJobsRef.current,
        trendingLocationRef.current,
        unicornRef.current,
        careerResourcesRef.current,
        footerRef.current,
      ].filter(Boolean)

      elementsToAnimate.forEach((el, index) => {
        // Staggered animation for better visual flow
        let animationDuration = 0.8
        if (el === trendingLocationRef.current || el === unicornRef.current || el === careerResourcesRef.current) {
          animationDuration = 1.2
        }

        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: animationDuration,
          delay: index * 0.1, // Staggered delay
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        })
      })
    }, mainContainerRef)

    return () => ctx.revert()
  }, [loading])

  // Loading State
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-zinc-950 to-black text-white min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <Skeleton className="h-12 w-48 bg-zinc-800/50 rounded-lg" />
            <Skeleton className="h-10 w-10 bg-zinc-800/50 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 bg-zinc-800/50 rounded-xl" />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Skeleton className="col-span-1 h-96 bg-zinc-800/50 rounded-xl" />
            <Skeleton className="col-span-2 h-96 bg-zinc-800/50 rounded-xl" />
          </div>

          <Skeleton className="h-48 w-full bg-zinc-800/50 rounded-xl mb-6" />
          <Skeleton className="h-[600px] w-full bg-zinc-800/50 rounded-xl mb-6" />
          <Skeleton className="h-[400px] w-full bg-zinc-800/50 rounded-xl mb-6" />
          <Skeleton className="h-[500px] w-full bg-zinc-800/50 rounded-xl mb-6" />
          <Skeleton className="h-[400px] w-full bg-zinc-800/50 rounded-xl mb-6" />
          <Skeleton className="h-[400px] w-full bg-zinc-800/50 rounded-xl mb-6" />
          <Skeleton className="h-24 w-full bg-zinc-800/50 rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-gradient-to-br from-zinc-950 to-black text-white min-h-screen overflow-x-hidden"
      ref={mainContainerRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="py-8 mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Job Market Dashboard
            </h1>
            <p className="text-zinc-400 mt-1">Track hiring trends and opportunities</p>
          </div>
          <DashboardHamburgerMenu />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" ref={statsRef}>
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden group"
            >
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <stat.icon size={96} />
                </div>
                <div className="flex flex-col">
                  <p className="text-zinc-400 text-sm mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-xs text-emerald-400">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Trending Card */}
          <Card className="col-span-1 bg-zinc-900/60 border-zinc-800 text-white overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-emerald-400" />
                Trending Hiring Companies
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="h-[340px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                <table className="w-full">
                  <thead className="sticky top-0 bg-zinc-900/95 z-10">
                    <tr className="border-b border-zinc-800">
                      <th className="text-left py-3 px-2 text-zinc-400 text-xs uppercase tracking-wider">Company</th>
                      <th className="text-center py-3 px-2 text-zinc-400 text-xs uppercase tracking-wider">Jobs</th>
                      <th className="text-right py-3 px-2 text-zinc-400 text-xs uppercase tracking-wider">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((company, index) => (
                      <tr
                        key={index}
                        className={`border-b border-zinc-800/50 cursor-pointer transition-colors duration-200 hover:bg-zinc-800/50 ${selectedCompany.name === company.name ? "bg-zinc-800/80" : ""}`}
                        onClick={() => handleCompanySelect(company)}
                      >
                        <td className="py-4 px-2">
                          <div className="flex items-center">
                            <div
                              className="h-9 w-9 rounded-full flex items-center justify-center text-white font-bold mr-3"
                              style={{ backgroundColor: company.color }}
                            >
                              {company.logo}
                            </div>
                            <span className="font-medium">{company.name}</span>
                          </div>
                        </td>
                        <td className="text-center py-4 px-2 font-mono">{company.jobs}</td>
                        <td className="text-right py-4 px-2">
                          <Badge
                            variant={company.change.startsWith("+") ? "outline" : "destructive"}
                            className={
                              company.change.startsWith("+")
                                ? "bg-emerald-950/30 text-emerald-400 border-emerald-800/50"
                                : ""
                            }
                          >
                            {company.change}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Chart Card */}
          <Card className="col-span-2 bg-zinc-900/60 border-zinc-800 text-white">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-medium">{selectedCompany.name} Job Postings</CardTitle>
                <Badge variant="outline" className="bg-zinc-800/80 border-zinc-700">
                  2023-2024
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={jobData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={selectedCompany.color || "#8884d8"} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={selectedCompany.color || "#8884d8"} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="#666"
                    tick={{ fill: "#999", fontSize: 12 }}
                    tickFormatter={(value) => value.split(" ")[0]}
                    interval="preserveStartEnd"
                  />
                  <YAxis stroke="#666" tick={{ fill: "#999", fontSize: 12 }} width={40} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(23, 23, 23, 0.9)",
                      borderColor: "#555",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                    }}
                    itemStyle={{ color: "#eee" }}
                    labelStyle={{ color: "#fff", fontWeight: "bold", marginBottom: "5px" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="jobs"
                    name="Job Postings"
                    stroke={selectedCompany.color || "#8884d8"}
                    fillOpacity={1}
                    fill="url(#colorJobs)"
                    strokeWidth={2}
                    activeDot={{ r: 6, strokeWidth: 1 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    name="Applications"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorApps)"
                    strokeWidth={2}
                    activeDot={{ r: 6, strokeWidth: 1 }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "10px" }} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Enhance Resume Score Card */}
        <div className="mb-6" ref={enhanceCardRef}>
          <Card className="bg-gradient-to-r from-zinc-900/80 to-zinc-900/40 border-zinc-800 text-white overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row items-center">
                <div className="p-8 flex-1">
                  <h2 className="text-2xl font-bold mb-3">Enhance Your Resume Score</h2>
                  <p className="text-zinc-400 mb-6 max-w-xl">
                    Our AI-powered resume analyzer can help you improve your resume to match job requirements and
                    increase your chances of getting interviews.
                  </p>
                  <Button
                    onClick={handleResumeRedirection}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-0 group"
                  >
                    Improve Your Resume
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
                <div className="hidden md:block w-1/3 h-48 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-9xl font-bold text-emerald-500/20">CV</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Other Components */}
        <div ref={generalJobsRef} className="mb-6">
          <General_job_Posting />
        </div>

        <div ref={taggedJobsRef} className="mb-6">
          <TaggedJobs />
        </div>

        <div ref={trendingLocationRef} className="mb-6">
          <TrendingCompaniesByLocation />
        </div>

        <div className="mb-6" ref={unicornRef}>
          <Tech_unicorn_valuation />
        </div>

        {/* Career Resources Component */}
        <div className="mb-6" ref={careerResourcesRef}>
          <CareerResources />
        </div>

        {/* Footer */}
        <div ref={footerRef}>
          <Demo />
        </div>
      </div>
    </div>
  )
}

export default Page
