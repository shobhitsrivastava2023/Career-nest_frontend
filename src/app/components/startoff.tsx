"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuthModal } from "./auth-modal"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Homepage() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authType, setAuthType] = useState<"professional" | "academia">("professional")

  // Refs for animations
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const featureCardsRef = useRef(null)

  const openAuthModal = (type: "professional" | "academia") => {
    setAuthType(type)
    setAuthModalOpen(true)
  }

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.from(heroRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      // Features section animation
      gsap.from(featuresRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
        },
      })

      // Feature cards staggered animation
      gsap.from(".feature-card", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featureCardsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="flex flex-col min-h-[100dvh] bg-black text-white">
      <header className="px-6 lg:px-8 h-16 flex items-center border-b border-zinc-800">
        <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
          <NestIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Career Nest</span>
        </Link>
        <nav className="ml-auto flex gap-6">
          <Link
            href="/about"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            prefetch={false}
          >
            Contact
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            prefetch={false}
          >
            Dashboard
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="w-full py-20 md:py-28 lg:py-36 flex items-center justify-center border-b border-zinc-800"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <div className="inline-block rounded-full bg-zinc-800 px-3 py-1 text-sm mb-6">Build Your Career</div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                Your Professional Profile, Simplified
              </h1>
              <p className="mt-6 text-lg text-zinc-400 max-w-2xl md:text-xl">
                Career Nest helps you create, manage, and share your professional profile. Build your portfolio in
                minutes and apply for jobs with ease.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <Button
                  onClick={() => openAuthModal("professional")}
                  className="bg-primary hover:bg-primary/90 px-8 py-6 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
                  size="lg"
                >
                  Professional
                </Button>
                <Button
                  onClick={() => openAuthModal("academia")}
                  variant="outline"
                  className="border-zinc-700 bg-transparent hover:bg-zinc-800 hover:text-white px-8 py-6 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl"
                  size="lg"
                >
                  Academia
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="w-full py-20 md:py-28 lg:py-32 bg-zinc-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-zinc-800 px-3 py-1 text-sm">Why Career Nest?</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mt-4">
                  Build. Share. Apply.
                </h2>
                <p className="mt-4 max-w-[800px] text-zinc-400 md:text-xl/relaxed">
                  Career Nest streamlines your job search by creating professional summaries that highlight your skills
                  and experience. One profile, countless opportunities.
                </p>
              </div>
            </div>

            <div
              ref={featureCardsRef}
              className="mx-auto grid items-stretch gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-16"
            >
              <div className="feature-card grid gap-1 p-6 bg-zinc-900 rounded-lg border border-zinc-800 shadow-lg transition-all hover:shadow-xl hover:border-zinc-700 h-full">
                <h3 className="text-xl font-bold">Smart Profile Builder</h3>
                <p className="text-zinc-400 mt-2">
                  Create tailored professional profiles with our intuitive builder. Add your skills, experience, and
                  links to your portfolio.
                </p>
              </div>
              <div className="feature-card grid gap-1 p-6 bg-zinc-900 rounded-lg border border-zinc-800 shadow-lg transition-all hover:shadow-xl hover:border-zinc-700 h-full">
                <h3 className="text-xl font-bold">One-Click Applications</h3>
                <p className="text-zinc-400 mt-2">
                  Apply to multiple job postings with a single click. Your profile is automatically formatted for each
                  application.
                </p>
              </div>
              <div className="feature-card grid gap-1 p-6 bg-zinc-900 rounded-lg border border-zinc-800 shadow-lg transition-all hover:shadow-xl hover:border-zinc-700 h-full">
                <h3 className="text-xl font-bold">Profile Analytics</h3>
                <p className="text-zinc-400 mt-2">
                  Track who's viewing your profile and which skills are getting the most attention from recruiters.
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-16">
              <Button
                onClick={() => openAuthModal("professional")}
                className="bg-zinc-800 hover:bg-zinc-700 px-8 py-2 text-sm font-medium text-white shadow transition-colors"
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-24 border-t border-zinc-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-zinc-800 px-3 py-1 text-sm">Join Today</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Start building your professional future
                </h2>
                <Button
                  onClick={() => openAuthModal("professional")}
                  className="bg-primary hover:bg-primary/90 px-8 py-2 text-sm font-medium text-white shadow transition-colors"
                >
                  Get Started
                </Button>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-zinc-800 px-3 py-1 text-sm">Premium Features</div>
                <p className="text-zinc-400 md:text-xl/relaxed">
                  Unlock advanced features with our premium plan. Get personalized job recommendations, priority
                  application status, and detailed analytics on your profile performance.
                </p>
                <Button
                  variant="outline"
                  className="border-zinc-700 bg-transparent hover:bg-zinc-800 px-8 py-2 text-sm font-medium text-white shadow-sm transition-colors"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-6 md:px-8 border-t border-zinc-800">
        <p className="text-xs text-zinc-500">&copy; {new Date().getFullYear()} Career Nest. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-6">
          <Link href="/terms" className="text-xs text-zinc-500 hover:text-white transition-colors" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs text-zinc-500 hover:text-white transition-colors" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} type={authType} />
    </div>
  )
}

function NestIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
      <path d="m8 8 8 8" />
      <path d="m16 8-8 8" />
    </svg>
  )
}
