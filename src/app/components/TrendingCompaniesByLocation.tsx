"use client"

import { useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Building2, ExternalLink, Globe, MapPin, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Company {
  company_id: string
  company: string
  trajectory_score: number
  url_clean: string
}

interface Location {
  id: string
  name: string
  company_grid_top5: Company[]
}

function TrendingCompaniesByLocation() {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedLocation, setExpandedLocation] = useState<string | null>(null)
  const apiUrl = "http://localhost:8000/api/locations.json"

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const jsonData = await response.json()
        setLocations(jsonData.pageProps?.data || [])

        // Auto-expand the first location
        if (jsonData.pageProps?.data?.length > 0) {
          setExpandedLocation(jsonData.pageProps.data[0].id)
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError(error instanceof Error ? error.message : "Failed to load location data")
        setLoading(false)

        // Create mock data for demonstration
        const mockLocations = generateMockLocations()
        setLocations(mockLocations)

        // Auto-expand the first mock location
        if (mockLocations.length > 0) {
          setExpandedLocation(mockLocations[0].id)
        }
      }
    }

    fetchData()
  }, [])

  // Generate mock locations data for demonstration
  const generateMockLocations = (): Location[] => {
    const cities = [
      { id: "sf", name: "San Francisco" },
      { id: "nyc", name: "New York" },
      { id: "sea", name: "Seattle" },
      { id: "aus", name: "Austin" },
      { id: "bos", name: "Boston" },
      { id: "la", name: "Los Angeles" },
      { id: "chi", name: "Chicago" },
      { id: "den", name: "Denver" },
      { id: "atl", name: "Atlanta" },
    ]

    const companyNames = [
      "TechNova",
      "DataSphere",
      "CloudPeak",
      "QuantumWave",
      "NexusAI",
      "ByteForge",
      "InnovateCorp",
      "FusionTech",
      "PulseDigital",
      "OmegaSoft",
      "AlphaCode",
      "VisionaryTech",
      "EpicSystems",
      "StellarTech",
      "PrimeLogic",
    ]

    return cities.map((city) => ({
      id: city.id,
      name: city.name,
      company_grid_top5: Array(5)
        .fill(null)
        .map((_, index) => {
          const companyName = companyNames[Math.floor(Math.random() * companyNames.length)]
          return {
            company_id: `${city.id}-company-${index}`,
            company: `${companyName} ${index + 1}`,
            trajectory_score: Math.floor(Math.random() * 50) + 50, // Score between 50-100
            url_clean: `${companyName.toLowerCase().replace(/\s/g, "")}.com`,
          }
        }),
    }))
  }

  // Get score badge color based on trajectory score
  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500/10 text-emerald-400 border-emerald-800/50"
    if (score >= 60) return "bg-amber-500/10 text-amber-400 border-amber-800/50"
    return "bg-rose-500/10 text-rose-400 border-rose-800/50"
  }

  // Handle accordion state change
  const handleAccordionChange = (value: string) => {
    setExpandedLocation(value === expandedLocation ? null : value)
  }

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <Skeleton className="h-10 w-64 bg-zinc-800/50 rounded-lg mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(9)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="h-64 bg-zinc-800/50 rounded-xl" />
            ))}
        </div>
      </div>
    )
  }

  if (error && locations.length === 0) {
    return (
      <Card className="w-full max-w-7xl mx-auto bg-zinc-900/60 border-zinc-800 text-white">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">Failed to load location data</h3>
          <p className="text-zinc-400 text-center max-w-md mb-6">{error}</p>
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

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Globe className="mr-2 h-5 w-5 text-emerald-400" />
          Trending Companies By Location
        </h2>
        <p className="text-zinc-400 text-sm mt-1">Discover top companies in major tech hubs</p>
      </div>

      {/* Use CSS grid with auto-rows-auto to prevent row height matching */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
        {locations.map((location, locationIndex) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: locationIndex * 0.05 }}
            className="h-auto" // Ensure height is determined by content
            style={{ alignSelf: "start" }} // Prevent stretching to match other items
          >
            <Card className="bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-zinc-400" />
                  {location.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <Accordion
                  type="single"
                  collapsible
                  value={expandedLocation === location.id ? location.id : ""}
                  onValueChange={handleAccordionChange}
                  className="w-full"
                >
                  <AccordionItem value={location.id} className="border-b-0">
                    <AccordionTrigger className="py-3 text-zinc-300 hover:text-white hover:no-underline">
                      <span className="flex items-center">
                        <TrendingUp className="mr-2 h-4 w-4 text-emerald-400" />
                        <span>Top Companies</span>
                      </span>
                    </AccordionTrigger>
                    <AnimatePresence>
                      {expandedLocation === location.id && (
                        <AccordionContent forceMount className="pt-2 overflow-hidden">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ul className="space-y-3">
                              {location.company_grid_top5.map((company, index) => (
                                <li
                                  key={company.company_id}
                                  className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-800 transition-colors duration-200"
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center">
                                      <div className="w-8 h-8 rounded-md bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white font-bold mr-3">
                                        {index + 1}
                                      </div>
                                      <div>
                                        <div className="font-medium text-white">{company.company}</div>
                                        <div className="text-xs text-zinc-400 flex items-center mt-0.5">
                                          <Building2 className="h-3 w-3 mr-1" />
                                          {company.url_clean}
                                        </div>
                                      </div>
                                    </div>
                                    <Badge
                                      variant="outline"
                                      className={`${getScoreBadgeColor(company.trajectory_score)} border`}
                                    >
                                      {company.trajectory_score}
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between items-center mt-3">
                                    <div className="flex items-center">
                                      <div className="text-xs text-zinc-400">Trajectory Score</div>
                                      <div className="ml-2 h-1.5 w-16 bg-zinc-700 rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                                          style={{ width: `${company.trajectory_score}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                    <Button
                                      asChild
                                      variant="ghost"
                                      size="sm"
                                      className="text-zinc-300 hover:text-white hover:bg-zinc-800 h-7 px-2"
                                    >
                                      <a
                                        href={`https://${company.url_clean}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <ExternalLink size={14} />
                                      </a>
                                    </Button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        </AccordionContent>
                      )}
                    </AnimatePresence>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TrendingCompaniesByLocation
