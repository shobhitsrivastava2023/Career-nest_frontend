"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, User, LogOut, Settings, ExternalLink } from 'lucide-react'

export function ResearchHeader() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

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

    loadUserData()
    window.addEventListener("storage", loadUserData)
    return () => window.removeEventListener("storage", loadUserData)
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("user")
    window.dispatchEvent(new Event("storage"))
    router.push("/")
  }

  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-white"
            >
              <path d="M12 6V2H8" />
              <path d="m8 2 4 4" />
              <path d="M12 18v4h4" />
              <path d="m16 22-4-4" />
              <path d="M6 12H2v4" />
              <path d="m2 16 4-4" />
              <path d="M18 12h4v-4" />
              <path d="m22 8-4 4" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight">CareerNest</h1>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              {user ? (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-600 text-white">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800 text-white">
            {user ? (
              <>
                <div className="flex items-center p-2">
                  <Avatar className="h-10 w-10 mr-2 bg-blue-600">
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium truncate">{user.name}</span>
                    <span className="text-xs text-zinc-400 truncate">{user.email}</span>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-zinc-800" />

                {/* Profile Links */}
                {user.links && Object.keys(user.links).length > 0 && (
                  <>
                    <DropdownMenuLabel className="text-zinc-400">Academic Profiles</DropdownMenuLabel>
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
                    <DropdownMenuSeparator className="bg-zinc-800" />
                  </>
                )}

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
      </div>
    </header>
  )
}
