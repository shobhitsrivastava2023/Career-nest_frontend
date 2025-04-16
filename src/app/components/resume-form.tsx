"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import ChatInterface from "./chat-interface"
import { Upload } from "lucide-react"

export default function ResumeForm() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (resumeFile && jobDescription.trim()) {
      setIsSubmitted(true)
    }
  }

  return (
    <div className="space-y-8">
      {!isSubmitted ? (
        <Card className="p-6 bg-zinc-950 border-zinc-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="resume" className="text-zinc-300">
                Upload Resume (PDF)
              </Label>
              <div className="border-2 border-dashed border-zinc-800 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  id="resume"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload PDF
                </Button>
                {resumeFile && <p className="mt-2 text-sm text-zinc-400">{resumeFile.name}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription" className="text-zinc-300">
                Job Description
              </Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[200px] bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white"
              disabled={!resumeFile || !jobDescription.trim()}
            >
              Optimize Resume
            </Button>
          </form>
        </Card>
      ) : (
        <ChatInterface resumeFile={resumeFile} jobDescription={jobDescription} />
      )}
    </div>
  )
}
