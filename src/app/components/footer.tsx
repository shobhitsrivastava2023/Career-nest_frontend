"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  BookOpen,
  Facebook,
  Github,
  Globe,
  Hexagon,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  HomeIcon as NestIcon,
  Phone,
  Twitter,
} from "lucide-react"
import { motion } from "framer-motion"

export function Demo() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      // In a real app, you would send this to your API
      setTimeout(() => {
        setSubscribed(false)
      }, 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-zinc-900/80 border-t border-zinc-800 pt-16 pb-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="mr-3 relative">
                <Hexagon className="h-8 w-8 text-emerald-500" />
                <NestIcon className="h-4 w-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                CareerNest
              </span>
            </div>
            <p className="text-zinc-400 text-sm">
              Your trusted platform for navigating the job market, discovering opportunities, and advancing your career
              with confidence.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Twitter className="h-4 w-4" />} href="https://twitter.com" label="Twitter" />
              <SocialIcon icon={<Linkedin className="h-4 w-4" />} href="https://linkedin.com" label="LinkedIn" />
              <SocialIcon icon={<Github className="h-4 w-4" />} href="https://github.com" label="GitHub" />
              <SocialIcon icon={<Instagram className="h-4 w-4" />} href="https://instagram.com" label="Instagram" />
              <SocialIcon icon={<Facebook className="h-4 w-4" />} href="https://facebook.com" label="Facebook" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Globe className="h-4 w-4 mr-2 text-emerald-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Job Search", href: "/jobs" },
                { label: "Companies", href: "/companies" },
                { label: "Salary Insights", href: "/salary" },
                { label: "Career Resources", href: "/resources" },
                { label: "About Us", href: "/about" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors duration-200 text-sm flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 text-emerald-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <BookOpen className="h-4 w-4 mr-2 text-emerald-400" />
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Resume Builder", href: "/resume-builder" },
                { label: "Interview Prep", href: "/interview-prep" },
                { label: "Career Guides", href: "/guides" },
                { label: "Skill Assessments", href: "/skills" },
                { label: "Industry Reports", href: "/reports" },
                { label: "Blog", href: "/blog" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors duration-200 text-sm flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 text-emerald-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Mail className="h-4 w-4 mr-2 text-emerald-400" />
              Stay Updated
            </h3>
            <p className="text-zinc-400 text-sm mb-4">
              Subscribe to our newsletter for the latest job market trends and career advice.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-zinc-800 border-zinc-700 text-white rounded-r-none focus-visible:ring-emerald-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 rounded-l-none"
                  disabled={subscribed}
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </Button>
              </div>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 text-xs"
                >
                  Thank you for subscribing!
                </motion.p>
              )}
            </form>

            <div className="mt-8">
              <h4 className="text-sm font-medium mb-3 flex items-center">
                <Phone className="h-4 w-4 mr-2 text-emerald-400" />
                Contact Us
              </h4>
              <div className="space-y-2">
                <p className="text-zinc-400 text-sm flex items-start">
                  <Mail className="h-4 w-4 mr-2 mt-0.5 text-zinc-500" />
                  <span>support@careernest.com</span>
                </p>
                <p className="text-zinc-400 text-sm flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-zinc-500" />
                  <span>Manipal Jaipur University, Jaipur, JP 94107</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-zinc-500 text-sm mb-4 md:mb-0">© {currentYear} CareerNest. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
              { label: "Accessibility", href: "/accessibility" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-zinc-500 hover:text-zinc-300 transition-colors duration-200 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full transition-colors duration-200"
    >
      {icon}
    </a>
  )
}
