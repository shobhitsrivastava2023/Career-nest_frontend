"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, User, Settings, LogOut, ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function DashboardHamburgerMenu() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  // Load user data from localStorage
  useEffect(() => {
    const loadUserData = () => {
      try {
        const userData = localStorage.getItem("user")
        if (userData) {
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.error("Error loading user data:", error)
      }
    }

    // Load initial data
    loadUserData()

    // Listen for storage events (when user logs in/out in another tab)
    const handleStorageChange = () => {
      loadUserData()
    }

    window.addEventListener("storage", handleStorageChange)

    // Custom event listener for our own storage updates
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("user")
    // Trigger storage event for other components
    window.dispatchEvent(new Event("storage"))
    router.push("/")
  }

  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Get profession display name
  const getProfessionDisplay = (professionCode: string) => {
    const professionMap: Record<string, string> = {
      sde: "Software Developer",
      sre: "Site Reliability Engineer",
      system_engineer: "System Engineer",
      designer: "Designer",
      content_writer: "Content Writer",
      researcher: "Researcher",
      professor: "Professor",
      student: "Student",
      postdoc: "Post-doctoral Fellow",
    }

    return professionMap[professionCode] || professionCode
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Menu className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800 text-white">
        {user ? (
          <>
            <div className="flex items-center p-2">
              <Avatar className="h-10 w-10 mr-2 bg-primary">
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium truncate">{user.name}</span>
                <span className="text-xs text-zinc-400 truncate">{user.email}</span>
              </div>
            </div>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuLabel className="text-zinc-400">{getProfessionDisplay(user.profession)}</DropdownMenuLabel>

            {/* Profile Links */}
            {user.links && Object.keys(user.links).length > 0 && (
              <>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuLabel className="text-zinc-400">Profile Links</DropdownMenuLabel>
                {Object.entries(user.links).map(([platform, url]) => (
                  <DropdownMenuItem key={platform} asChild>
                    <a
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center cursor-pointer"
                    >
                      <span className="capitalize mr-2">
                        {platform === "googlescholar" ? "Google Scholar" : platform}
                      </span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </a>
                  </DropdownMenuItem>
                ))}
              </>
            )}

            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="cursor-pointer text-red-400" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>Not signed in</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/")}>
              <User className="mr-2 h-4 w-4" />
              <span>Sign in</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
