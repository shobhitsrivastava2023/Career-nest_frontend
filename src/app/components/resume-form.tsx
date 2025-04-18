"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import ChatInterface from "./chat-interface"
import { AlertCircle, ArrowRight, CheckCircle2, FileText, Upload } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ResumeForm() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [formProgress, setFormProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Update progress based on form completion
  useEffect(() => {
    let progress = 0
    if (resumeFile) progress += 50
    if (jobDescription.trim().length > 0) progress += 50
    setFormProgress(progress)
  }, [resumeFile, jobDescription])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (resumeFile && jobDescription.trim()) {
      setIsSubmitted(true)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-3">
                Resume Optimization
              </h1>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Upload your resume and paste the job description to get AI-powered recommendations on how to optimize
                your resume for better job matching.
              </p>
            </div>

            <Card className="bg-gradient-to-b from-zinc-900/80 to-zinc-950 border-zinc-800 overflow-hidden shadow-xl">
              <CardHeader className="pb-2 border-b border-zinc-800/50">
                <CardTitle className="text-xl font-medium flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-emerald-400" />
                  Resume Enhancer
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Our AI will analyze your resume against the job description
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-zinc-400">Completion</span>
                    <Badge
                      variant="outline"
                      className={
                        formProgress === 100
                          ? "bg-emerald-950/30 text-emerald-400 border-emerald-800/50"
                          : "bg-zinc-800/80 text-zinc-400 border-zinc-700"
                      }
                    >
                      {formProgress}%
                    </Badge>
                  </div>
                  <Progress
                    value={formProgress}
                    className="h-2 bg-zinc-800"
                    indicatorClassName={
                      formProgress === 100
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600"
                        : "bg-gradient-to-r from-zinc-600 to-zinc-700"
                    }
                  />
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <Label htmlFor="resume" className="text-zinc-300 flex items-center">
                      <Upload className="mr-2 h-4 w-4 text-emerald-400" />
                      Upload Resume (PDF)
                    </Label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 ${
                        dragActive
                          ? "border-emerald-500 bg-emerald-500/10"
                          : resumeFile
                          ? "border-emerald-800/50 bg-emerald-950/20"
                          : "border-zinc-800 bg-zinc-900/50"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        id="resume"
                      />

                      <div className="flex flex-col items-center justify-center py-4">
                        {resumeFile ? (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center"
                          >
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                            </div>
                            <p className="text-lg font-medium text-white mb-1">{resumeFile.name}</p>
                            <p className="text-sm text-zinc-400 mb-4">
                              {formatFileSize(resumeFile.size)} • PDF Document
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setResumeFile(null)}
                              className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                            >
                              Replace File
                            </Button>
                          </motion.div>
                        ) : (
                          <>
                            <div className="w-16 h-16 bg-zinc-800/80 rounded-full flex items-center justify-center mb-4">
                              <Upload className="h-8 w-8 text-zinc-400" />
                            </div>
                            <p className="text-lg font-medium text-white mb-2">Drag & Drop your resume here</p>
                            <p className="text-sm text-zinc-400 mb-4">or click to browse files (PDF only)</p>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Select PDF File
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobDescription" className="text-zinc-300 flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-emerald-400" />
                      Job Description
                    </Label>
                    <Textarea
                      id="jobDescription"
                      placeholder="Paste the job description here to help our AI match your resume to the requirements..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="min-h-[200px] bg-zinc-900/80 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-emerald-500"
                    />
                    <p className="text-xs text-zinc-500 mt-1">
                      {jobDescription.length > 0
                        ? `${jobDescription.length} characters • ${jobDescription.split(/\s+/).length} words`
                        : "Include key requirements and qualifications for better results"}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className={`w-full group ${
                      formProgress === 100
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
                        : "bg-zinc-800 hover:bg-zinc-700"
                    } text-white`}
                    disabled={!resumeFile || !jobDescription.trim()}
                  >
                    Optimize Resume
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-6 p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-zinc-400">
                  <p className="font-medium text-zinc-300 mb-1">Privacy Notice</p>
                  <p>
                    Your resume and job description are processed securely. We don't store your personal data beyond the
                    optimization process. See our{" "}
                    <a href="/privacy" className="text-emerald-400 hover:underline">
                      privacy policy
                    </a>{" "}
                    for more details.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-1">
                  Resume Optimization Results
                </h1>
                <p className="text-zinc-400">AI-enhanced resume tailored to your target job</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsSubmitted(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
              >
                Start Over
              </Button>
            </div>
            <ChatInterface resumeFile={resumeFile} jobDescription={jobDescription} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
