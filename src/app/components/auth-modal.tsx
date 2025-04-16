"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type AuthModalProps = {
  isOpen: boolean
  onClose: () => void
  type: "professional" | "academia"
}

type ProfessionLinks = {
  [key: string]: string[]
}

export function AuthModal({ isOpen, onClose, type }: AuthModalProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")

  // Sign up state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [profession, setProfession] = useState("")
  const [links, setLinks] = useState<Record<string, string>>({})

  // Sign in state
  const [signInEmail, setSignInEmail] = useState("")
  const [signInPassword, setSignInPassword] = useState("")
  const [signInError, setSignInError] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const professionOptions = [
    { value: "sde", label: "Software Developer" },
    { value: "sre", label: "Site Reliability Engineer" },
    { value: "system_engineer", label: "System Engineer" },
    { value: "designer", label: "Designer" },
    { value: "content_writer", label: "Content Writer" },
  ]

  const academicOptions = [
    { value: "researcher", label: "Researcher" },
    { value: "professor", label: "Professor" },
    { value: "student", label: "Student" },
    { value: "postdoc", label: "Post-doctoral Fellow" },
  ]

  const professionLinks: ProfessionLinks = {
    sde: ["linkedin", "github", "leetcode"],
    sre: ["linkedin", "github", "stackoverflow"],
    system_engineer: ["linkedin", "github"],
    designer: ["linkedin", "behance", "dribbble", "portfolio"],
    content_writer: ["linkedin", "medium", "portfolio"],
    researcher: ["linkedin", "googlescholar", "researchgate", "orcid"],
    professor: ["linkedin", "googlescholar", "university"],
    student: ["linkedin", "github", "googlescholar"],
    postdoc: ["linkedin", "googlescholar", "researchgate"],
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you would typically make an API call to register the user
      // For now, we'll just simulate a delay and store in localStorage
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store user data in localStorage
      const userData = {
        name,
        email,
        profession,
        links,
        type,
      }

      localStorage.setItem("user", JSON.stringify(userData))

      // Trigger storage event for other components to detect the change
      window.dispatchEvent(new Event("storage"))

      // Redirect based on type
      console.log("User type:", type)
      if (type === "professional") {
        console.log("Redirecting to /Dashboard")
        router.push("/Dashboard")
      } else {
        console.log("Redirecting to /ResearchDashboard")
        router.push("/ResearchDashboard")
      }
    } catch (error) {
      console.error("Authentication error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSignInError("")

    try {
      // In a real app, you would validate against your backend
      // For demo purposes, we'll check localStorage
      const userData = localStorage.getItem("user")

      if (!userData) {
        setSignInError("No account found. Please sign up first.")
        setIsLoading(false)
        return
      }

      const user = JSON.parse(userData)

      // Simple email/password check
      if (user.email !== signInEmail) {
        setSignInError("Email not found.")
        setIsLoading(false)
        return
      }

      // In a real app, you would hash and properly compare passwords
      // This is just for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Trigger storage event for other components to detect the change
      window.dispatchEvent(new Event("storage"))

      // Redirect based on user type
      console.log("User type from localStorage:", user.type)
      if (user.type === "professional") {
        console.log("Redirecting to /Dashboard")
        router.push("/Dashboard")
      } else {
        console.log("Redirecting to /ResearchDashboard")
        router.push("/ResearchDashboard")
      }
    } catch (error) {
      console.error("Sign in error:", error)
      setSignInError("An error occurred during sign in.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfessionChange = (value: string) => {
    setProfession(value)
    // Reset links when profession changes
    setLinks({})
  }

  const handleLinkChange = (linkType: string, value: string) => {
    setLinks((prev) => ({
      ...prev,
      [linkType]: value,
    }))
  }

  const options = type === "professional" ? professionOptions : academicOptions
  const title = type === "professional" ? "Professional Profile" : "Academic Profile"
  const description =
    type === "professional"
      ? "Create or access your professional profile to showcase your skills and experience."
      : "Create or access your academic profile to showcase your research and publications."

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="signin"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "signin" | "signup")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4 py-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {signInError && <div className="text-red-500 text-sm">{signInError}</div>}

              <div className="pt-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </div>

              <div className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <button type="button" className="text-primary hover:underline" onClick={() => setActiveTab("signup")}>
                  Sign Up
                </button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 py-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profession">{type === "professional" ? "Profession" : "Academic Role"}</Label>
                <Select onValueChange={handleProfessionChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {profession && professionLinks[profession] && (
                <div className="space-y-4 pt-2">
                  <div className="text-sm font-medium">Profile Links</div>
                  {professionLinks[profession].map((link) => (
                    <div key={link} className="space-y-2">
                      <Label htmlFor={link} className="capitalize">
                        {link === "googlescholar" ? "Google Scholar" : link}
                      </Label>
                      <Input
                        id={link}
                        value={links[link] || ""}
                        onChange={(e) => handleLinkChange(link, e.target.value)}
                        placeholder={`https://${link}.com/yourusername`}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Profile..." : "Create Profile"}
                </Button>
              </div>

              <div className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button type="button" className="text-primary hover:underline" onClick={() => setActiveTab("signin")}>
                  Sign In
                </button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
