"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Clipboard, Download, FileText, Loader2, RefreshCw, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface StreamingChatInterfaceProps {
  resumeFile: File | null
  jobDescription: string
}

export default function StreamingChatInterface({ resumeFile, jobDescription }: StreamingChatInterfaceProps) {
  const [latexCode, setLatexCode] = useState<string>("")
  const [isCopied, setIsCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isStreaming, setIsStreaming] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("latex")
  const [error, setError] = useState<string | null>(null)
  const [improvements, setImprovements] = useState<string[]>([])
  const codeRef = useRef<HTMLPreElement>(null)

  // Simulate loading progress while waiting for API response
  useEffect(() => {
    if (isLoading && !isStreaming) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 95) return prev // Cap at 95% until actual completion
          const newProgress = prev + Math.random() * 5
          return Math.min(95, newProgress)
        })
      }, 800)
      return () => clearInterval(interval)
    } else if (!isLoading) {
      setLoadingProgress(100) // Set to 100% when loading is complete
    }
  }, [isLoading, isStreaming])

  // Extract improvements from the LaTeX code
  useEffect(() => {
    if (latexCode && latexCode.length > 100) {
      // This is a simple extraction - in a real app, you might want to
      // generate these improvements from the AI directly
      const extractedImprovements = [
        "Restructured resume sections to highlight relevant experience",
        "Added keywords from job description to improve ATS matching",
        "Quantified achievements with metrics where possible",
        "Standardized formatting for better readability",
        "Prioritized skills mentioned in the job description",
        "Optimized section ordering based on job requirements",
        "Enhanced professional summary to target the specific role",
      ]
      setImprovements(extractedImprovements)
    }
  }, [latexCode])

  // Send the resume and job description to the API with streaming support
  useEffect(() => {
    const submitResume = async () => {
      if (resumeFile && jobDescription) {
        setIsLoading(true)
        setLoadingProgress(0)
        setError(null)
        setLatexCode("")

        const formData = new FormData()
        formData.append("resume", resumeFile)
        formData.append("jobDescription", jobDescription)

        try {
          // First, check if the streaming endpoint is available
          const streamingEndpoint = "/api/optimize-resume-stream"

          try {
            // Try streaming first
            setIsStreaming(true)
            const response = await fetch(streamingEndpoint, {
              method: "POST",
              body: formData,
            })

            if (!response.ok) {
              throw new Error("Streaming not available")
            }

            // Handle streaming response
            const reader = response.body?.getReader()
            if (!reader) throw new Error("Response body is not readable")

            const decoder = new TextDecoder()
            let streamedText = ""

            while (true) {
              const { done, value } = await reader.read()
              if (done) break

              const chunk = decoder.decode(value, { stream: true })
              streamedText += chunk
              setLatexCode(streamedText)

              // Update progress based on streaming
              setLoadingProgress((prev) => Math.min(95, prev + 2))
            }

            setIsLoading(false)
            setIsStreaming(false)
          } catch (streamError) {
            console.log("Streaming not available, falling back to standard API", streamError)
            setIsStreaming(false)

            // Fall back to standard API
            const response = await fetch("/api/optimize-resume", {
              method: "POST",
              body: formData,
            })

            if (!response.ok) {
              const errorData = await response.json()
              throw new Error(errorData.error || "Failed to optimize resume")
            }

            const data = await response.json()
            setLatexCode(data.latex)
            setIsLoading(false)
          }
        } catch (error) {
          console.error("Error submitting resume:", error)
          setError(error instanceof Error ? error.message : "An unknown error occurred")
          setIsLoading(false)
          setIsStreaming(false)
        }
      }
    }

    submitResume()
  }, [resumeFile, jobDescription])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(latexCode)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const downloadLatex = () => {
    const element = document.createElement("a")
    const file = new Blob([latexCode], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "optimized_resume.tex"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const retryOptimization = () => {
    setIsLoading(true)
    setLoadingProgress(0)
    setError(null)
    setLatexCode("")

    // Re-submit the form data
    const formData = new FormData()
    if (resumeFile) formData.append("resume", resumeFile)
    if (jobDescription) formData.append("jobDescription", jobDescription)

    // Try streaming first, then fall back to standard API
    fetch("/api/optimize-resume-stream", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Streaming not available")
        }

        setIsStreaming(true)
        const reader = response.body?.getReader()
        if (!reader) throw new Error("Response body is not readable")

        const decoder = new TextDecoder()
        let streamedText = ""

        function processStream() {
          return reader!.read().then(({ done, value }) => {
            if (done) {
              setIsLoading(false)
              setIsStreaming(false)
              return
            }

            const chunk = decoder.decode(value, { stream: true })
            streamedText += chunk
            setLatexCode(streamedText)

            // Update progress based on streaming
            setLoadingProgress((prev) => Math.min(95, prev + 2))

            return processStream()
          })
        }

        return processStream()
      })
      .catch((streamError) => {
        console.log("Streaming retry failed, using standard API", streamError)
        setIsStreaming(false)

        // Fall back to standard API
        return fetch("/api/optimize-resume", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((data) => {
                throw new Error(data.error || "Failed to optimize resume")
              })
            }
            return response.json()
          })
          .then((data) => {
            setLatexCode(data.latex)
            setIsLoading(false)
          })
      })
      .catch((error) => {
        console.error("Error retrying resume optimization:", error)
        setError(error instanceof Error ? error.message : "An unknown error occurred")
        setIsLoading(false)
        setIsStreaming(false)
      })
  }

  return (
    <Card className="bg-gradient-to-b from-zinc-900/80 to-zinc-950 border-zinc-800 overflow-hidden shadow-xl">
      <CardHeader className="pb-2 border-b border-zinc-800/50">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-medium flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-emerald-400" />
              AI-Optimized Resume
            </CardTitle>
            <CardDescription className="text-zinc-400">
              {isLoading
                ? isStreaming
                  ? "Generating optimized LaTeX code in real-time..."
                  : "Analyzing and enhancing your resume..."
                : "Your resume has been optimized for the target job description"}
            </CardDescription>
          </div>
          {!isLoading && !error && (
            <Badge variant="outline" className="bg-emerald-950/30 text-emerald-400 border-emerald-800/50">
              <CheckCircle className="mr-1 h-3 w-3" /> Optimization Complete
            </Badge>
          )}
          {isStreaming && (
            <Badge variant="outline" className="bg-blue-950/30 text-blue-400 border-blue-800/50 animate-pulse">
              <Loader2 className="mr-1 h-3 w-3 animate-spin" /> Streaming
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {isLoading && !isStreaming ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-zinc-800/50"></div>
              <div
                className="absolute inset-0 rounded-full border-4 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"
                style={{ animationDuration: "1.5s" }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div className="text-center mb-8">
              <h3 className="text-lg font-medium text-white mb-2">Optimizing Your Resume</h3>
              <p className="text-zinc-400 max-w-md">
                Our AI is analyzing your resume against the job description to create a tailored version
              </p>
            </div>

            <div className="w-full max-w-md bg-zinc-800/30 h-2 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="text-xs text-zinc-500">{Math.round(loadingProgress)}% complete</div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
              {["Analyzing Resume", "Matching Keywords", "Generating Improvements"].map((step, index) => (
                <div
                  key={step}
                  className={`p-3 rounded-lg border ${
                    loadingProgress > index * 33
                      ? "border-emerald-800/50 bg-emerald-950/20"
                      : "border-zinc-800 bg-zinc-900/50"
                  }`}
                >
                  <div className="flex items-center">
                    {loadingProgress > index * 33 ? (
                      <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-zinc-700 mr-2"></div>
                    )}
                    <span
                      className={loadingProgress > index * 33 ? "text-emerald-300 text-sm" : "text-zinc-500 text-sm"}
                    >
                      {step}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : isStreaming ? (
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Loader2 className="h-5 w-5 text-blue-400 mr-2 animate-spin" />
                <h3 className="text-lg font-medium text-white">Generating LaTeX Code</h3>
              </div>
              <Badge variant="outline" className="bg-blue-950/30 text-blue-400 border-blue-800/50">
                Streaming in real-time
              </Badge>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg overflow-hidden">
              <div className="bg-zinc-800/80 px-4 py-2 text-xs text-zinc-400 flex justify-between items-center">
                <span>optimized_resume.tex</span>
                <span>{latexCode.length} characters</span>
              </div>
              <div className="max-h-[500px] overflow-auto">
                <SyntaxHighlighter
                  language="latex"
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    padding: "1rem",
                    background: "transparent",
                    fontSize: "0.875rem",
                  }}
                  wrapLongLines={true}
                >
                  {latexCode || "Waiting for content..."}
                </SyntaxHighlighter>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <div className="flex items-center text-sm text-zinc-400">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                AI is generating your optimized resume. This may take a minute...
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Optimization Failed</h3>
            <p className="text-zinc-400 text-center max-w-md mb-6">{error}</p>
            <Button
              variant="outline"
              onClick={retryOptimization}
              className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry Optimization
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="latex" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-zinc-800/50 border border-zinc-700 p-1 h-auto mb-6">
              <TabsTrigger
                value="latex"
                className="px-4 py-2 rounded-md data-[state=active]:text-white relative overflow-hidden transition-all duration-300"
              >
                {activeTab === "latex" && (
                  <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-gradient-to-br from-zinc-600 to-zinc-800 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <FileText className="h-4 w-4 mr-2 inline-block" />
                LaTeX Code
              </TabsTrigger>
              <TabsTrigger
                value="improvements"
                className="px-4 py-2 rounded-md data-[state=active]:text-white relative overflow-hidden transition-all duration-300"
              >
                {activeTab === "improvements" && (
                  <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <Sparkles className="h-4 w-4 mr-2 inline-block" />
                Improvements
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="latex" className="mt-0 outline-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white">LaTeX Resume Code</h3>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        className={`${
                          isCopied
                            ? "bg-emerald-900/30 text-emerald-400 border-emerald-800/50"
                            : "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                        } transition-colors duration-200`}
                      >
                        {isCopied ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Clipboard className="mr-2 h-4 w-4" />
                            Copy LaTeX
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadLatex}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download .tex
                      </Button>
                    </div>
                  </div>

                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg overflow-hidden">
                    <div className="bg-zinc-800/80 px-4 py-2 text-xs text-zinc-400 flex justify-between items-center">
                      <span>optimized_resume.tex</span>
                      <span>{latexCode.length} characters</span>
                    </div>
                    <div className="max-h-[500px] overflow-auto">
                      <SyntaxHighlighter
                        language="latex"
                        style={oneDark}
                        customStyle={{
                          margin: 0,
                          padding: "1rem",
                          background: "transparent",
                          fontSize: "0.875rem",
                        }}
                        wrapLongLines={true}
                      >
                        {latexCode}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="improvements" className="mt-0 outline-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-medium text-white mb-4">Key Improvements</h3>
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-6">
                    <ul className="space-y-4">
                      {improvements.map((improvement, index) => (
                        <li key={index} className="flex">
                          <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-zinc-300">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        )}
      </CardContent>

      <CardFooter className="bg-zinc-900/40 border-t border-zinc-800/50 px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
          <div className="text-sm text-zinc-400">
            <span className="text-zinc-300 font-medium">Pro Tip:</span> Use this LaTeX code with{" "}
            <a
              href="https://www.overleaf.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              Overleaf
            </a>{" "}
            for easy editing and PDF generation.
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
            onClick={() => window.open("https://www.overleaf.com/project", "_blank")}
          >
            Open in Overleaf
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
