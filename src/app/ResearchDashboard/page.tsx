"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ScopusSearch from "../components/ScopusSearch"
import GoogleScholarSearch from "../components/GoogleScholarSearch"
import { Database, GraduationCap } from "lucide-react"
import { ResearchHeader } from "../components/research-header"
import { DashboardLayout } from "../components/dashboard-layout"
import { ResearchStats } from "../components/research-stats"
import { Skeleton } from "@/components/ui/skeleton"

export default function ResearchDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isAuthChecking, setIsAuthChecking] = useState(true)

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem("user")
        console.log("ResearchDashboard - User data:", userData)

        if (!userData) {
          console.log("ResearchDashboard - No user data, redirecting to /")
          router.push("/")
          return
        }

        try {
          const parsedUser = JSON.parse(userData)
          console.log("ResearchDashboard - User type:", parsedUser.type)

          if (parsedUser.type !== "academia") {
            console.log("ResearchDashboard - Not academia, redirecting to /")
            router.push("/")
            return
          }

          setUser(parsedUser)
        } catch (error) {
          console.error("Error parsing user data:", error)
          router.push("/")
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        router.push("/")
      } finally {
        setIsAuthChecking(false)
      }
    }

    checkAuth()

    // Listen for storage events (sign out from another tab)
    const handleStorageChange = () => {
      checkAuth()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [router])

  if (isAuthChecking) {
    return (
      <div className="bg-black text-white min-h-screen">
        <div className="border-b border-zinc-800 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Skeleton className="h-8 w-32 bg-zinc-800" />
            <Skeleton className="h-8 w-8 rounded-full bg-zinc-800" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Skeleton className="h-10 w-64 bg-zinc-800 mb-4" />
          <Skeleton className="h-6 w-96 bg-zinc-800 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 bg-zinc-800 rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-8 w-64 mx-auto bg-zinc-800 mb-8 rounded-full" />
          <Skeleton className="h-[600px] w-full bg-zinc-800 rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <ResearchHeader />
      <DashboardLayout
        title="Research Dashboard"
        description="Access and search academic publications, researchers, and citations across multiple scholarly databases."
      >
        <ResearchStats />

        <Tabs defaultValue="scopus" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-zinc-800/50 backdrop-blur-sm">
            <TabsTrigger
              value="scopus"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700"
            >
              <Database className="mr-2 h-4 w-4" />
              Scopus
            </TabsTrigger>
            <TabsTrigger
              value="scholar"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700"
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              Google Scholar
            </TabsTrigger>
          </TabsList>

          <div className="bg-zinc-900/30 backdrop-blur-sm p-6 rounded-xl border border-zinc-800/50">
            <TabsContent value="scopus">
              <ScopusSearch />
            </TabsContent>

            <TabsContent value="scholar">
              <GoogleScholarSearch />
            </TabsContent>
          </div>
        </Tabs>
      </DashboardLayout>
    </div>
  )
}
