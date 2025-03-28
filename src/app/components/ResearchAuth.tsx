"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { useRouter } from "next/navigation"

const ResearchSignIn = () => {

  const router = useRouter() 
  const headerRef = useRef(null)
  const subheaderRef = useRef(null)
  const formRef = useRef(null)

  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    scopusId: '',
    orcId: '',
    googleScholarId: ''
  })

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 second delay

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const tl = gsap.timeline()

    tl.from(headerRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    })
      .from(
        subheaderRef.current,
        {
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4",
      )
      .from(
        formRef.current,
        {
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4",
      )
  }, [])


  const handleSubmitButton = () => { 
    console.log("heading to research dashBoard")
    router.push('/ResearchDashboard')
    
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  if (isLoading) {
    return (
      <div className="bg-black h-screen flex items-center justify-center">
        <div className="flex flex-col items-center text-white gap-4 w-full max-w-md">
          <Skeleton className="h-12 w-3/4 bg-zinc-800" />
          <Skeleton className="h-8 w-full bg-zinc-800" />
          <div className="w-full p-7 bg-zinc-900 rounded-xl space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="space-y-2">
                <Skeleton className="h-6 w-24 bg-zinc-800" />
                <Skeleton className="h-10 w-full bg-zinc-800" />
              </div>
            ))}
            <Skeleton className="h-10 w-full bg-zinc-800 mt-4" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <div className="flex flex-col items-center text-white gap-4 w-full max-w-md">
        <h1 ref={headerRef} className="text-2xl font-extrabold tracking-tight lg:text-5xl text-center">
          Sign in to Research Page
        </h1>

        <p ref={subheaderRef} className="text-center">
          Research basis Dashboard will be created specially for you after you fill the following fields
        </p>

        <form 
          ref={formRef} 
          onSubmit={handleSubmit} 
          className="w-full p-7 bg-zinc-900 rounded-xl"
        >
          <div className="mb-4">
            <label htmlFor="username" className="font-semibold tracking-tight text-lg mb-2 block">
              Username
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              className="bg-zinc-950 border-0 px-2 py-2 focus-visible:ring-offset-0 focus-visible:ring-0 w-full"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="scopusId" className="font-semibold tracking-tight text-lg mb-2 block">
              Scopus ID
            </label>
            <Input
              id="scopusId"
              name="scopusId"
              type="text"
              value={formData.scopusId}
              onChange={handleInputChange}
              className="bg-zinc-950 border-0 px-2 py-2 focus-visible:ring-offset-0 focus-visible:ring-0 w-full"
              placeholder="Enter your Scopus ID"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="orcId" className="font-semibold tracking-tight text-lg mb-2 block">
              ORC ID
            </label>
            <Input
              id="orcId"
              name="orcId"
              type="text"
              value={formData.orcId}
              onChange={handleInputChange}
              className="bg-zinc-950 border-0 px-2 py-2 focus-visible:ring-offset-0 focus-visible:ring-0 w-full"
              placeholder="Enter your ORC ID"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="googleScholarId" className="font-semibold tracking-tight text-lg mb-2 block">
              Google Scholar
            </label>
            <Input
              id="googleScholarId"
              name="googleScholarId"
              type="text"
              value={formData.googleScholarId}
              onChange={handleInputChange}
              className="bg-zinc-950 border-0 px-2 py-2 focus-visible:ring-offset-0 focus-visible:ring-0 w-full"
              placeholder="Enter your Google Scholar ID"
              required
            />
          </div>
          <div className="flex justify-center">
            <Button 
              type="submit" 
              className="hover:bg-blue-500 w-full"
              onClick={handleSubmitButton}
            > 
              Submit 
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResearchSignIn