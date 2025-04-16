"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clipboard, Download } from "lucide-react"

interface ChatInterfaceProps {
  resumeFile: File | null
  jobDescription: string
}

export default function ChatInterface({ resumeFile, jobDescription }: ChatInterfaceProps) {
  const [latexCode, setLatexCode] = useState<string>("")
  const [isCopied, setIsCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Send the resume and job description once the component mounts
  useEffect(() => {
    const submitResume = async () => {
      if (resumeFile && jobDescription) {
        setIsLoading(true)
        setError(null)

        const formData = new FormData()
        formData.append("resume", resumeFile)
        formData.append("jobDescription", jobDescription)

        try {
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
        } catch (error) {
          console.error("Error submitting resume:", error)
          setError(error instanceof Error ? error.message : "An unknown error occurred")
        } finally {
          setIsLoading(false)
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

  return (
    <Card className="p-6 bg-zinc-950 border-zinc-800">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-zinc-100 mb-2">Optimized Resume (LaTeX)</h2>
        <div className="flex space-x-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            disabled={isLoading || !latexCode}
            className="bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            <Clipboard className="mr-2 h-4 w-4" />
            {isCopied ? "Copied!" : "Copy LaTeX"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadLatex}
            disabled={isLoading || !latexCode}
            className="bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Download .tex
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-zinc-400">Optimizing your resume...</div>
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-800 p-4 rounded-md text-red-300">{error}</div>
      ) : !latexCode ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-zinc-400">No resume data available</div>
        </div>
      ) : (
        <div className="bg-zinc-900 p-4 rounded-md overflow-auto max-h-[600px]">
          <pre className="text-zinc-100 whitespace-pre-wrap font-mono text-sm">{latexCode}</pre>
        </div>
      )}
    </Card>
  )
}
