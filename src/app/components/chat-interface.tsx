"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Send, Copy, Check } from "lucide-react"
import LatexDisplay from "./latex-display"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatInterfaceProps {
  resumeFile: File | null
  jobDescription: string
}

export default function ChatInterface({ resumeFile, jobDescription }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [latexCode, setLatexCode] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initial message from AI
  useEffect(() => {
    const initialMessage = {
      role: "assistant" as const,
      content: `I've analyzed your resume and the job description. I can help optimize your resume for ATS systems. What specific aspects would you like me to focus on?`,
    }
    setMessages([initialMessage])
  }, [])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI thinking
    setIsGenerating(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content:
          "Based on the job description, I've generated LaTeX code to optimize your resume. I've enhanced the keywords, restructured the content for better ATS readability, and emphasized your relevant skills. You can view and copy the LaTeX code in the 'Generated LaTeX' tab.",
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsGenerating(false)

      // Set dummy LaTeX code
      setLatexCode(`\\documentclass[11pt,a4paper]{article}
\\usepackage{geometry}
\\geometry{a4paper, margin=0.75in}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{fontawesome}
\\usepackage{xcolor}

\\titleformat{\\section}{\\Large\\bfseries}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{10pt}{6pt}

\\begin{document}

\\begin{center}
    {\\LARGE \\textbf{John Doe}}\\\\
    {\\small 
    \\faPhone\\ (123) 456-7890 $|$
    \\faEnvelope\\ john.doe@email.com $|$
    \\faLinkedin\\ linkedin.com/in/johndoe $|$
    \\faGithub\\ github.com/johndoe
    }
\\end{center}

\\section{Summary}
Results-driven Software Engineer with 5+ years of experience in full-stack development, specializing in React, Node.js, and cloud infrastructure. Proven track record of delivering scalable applications and optimizing performance. Seeking to leverage technical expertise and leadership skills to drive innovation at [Company Name].

\\section{Skills}
\\begin{itemize}[leftmargin=*, noitemsep]
    \\item \\textbf{Programming Languages:} JavaScript, TypeScript, Python, Java, SQL
    \\item \\textbf{Frontend:} React.js, Next.js, Redux, HTML5, CSS3, Tailwind CSS
    \\item \\textbf{Backend:} Node.js, Express, RESTful APIs, GraphQL
    \\item \\textbf{Databases:} MongoDB, PostgreSQL, MySQL, Redis
    \\item \\textbf{DevOps:} AWS, Docker, Kubernetes, CI/CD, Git
    \\item \\textbf{Testing:} Jest, React Testing Library, Cypress
\\end{itemize}

\\section{Experience}
\\textbf{Senior Software Engineer} \\hfill Jan 2021 - Present\\\\
\\textit{Tech Innovations Inc.} \\hfill San Francisco, CA
\\begin{itemize}[leftmargin=*, noitemsep]
    \\item Led development of a high-traffic e-commerce platform using React and Node.js, resulting in 40\\% improved load times and 25\\% increase in conversion rates
    \\item Architected and implemented microservices infrastructure using Docker and Kubernetes, improving system reliability by 99.9\\%
    \\item Mentored junior developers and conducted code reviews, raising team productivity by 30\\%
    \\item Optimized database queries and implemented caching strategies, reducing API response times by 60\\%
\\end{itemize}

\\textbf{Software Developer} \\hfill Mar 2018 - Dec 2020\\\\
\\textit{Digital Solutions LLC} \\hfill Austin, TX
\\begin{itemize}[leftmargin=*, noitemsep]
    \\item Developed responsive web applications using React.js and Redux, serving 100,000+ daily active users
    \\item Implemented RESTful APIs with Node.js and Express, processing 1M+ daily requests
    \\item Collaborated with UX/UI designers to implement intuitive user interfaces, improving user satisfaction by 45\\%
    \\item Integrated third-party services and payment gateways, increasing revenue streams by 35\\%
\\end{itemize}

\\section{Education}
\\textbf{Master of Science in Computer Science} \\hfill 2016 - 2018\\\\
\\textit{University of Texas at Austin} \\hfill Austin, TX
\\begin{itemize}[leftmargin=*, noitemsep]
    \\item GPA: 3.9/4.0
    \\item Specialization: Software Engineering and Distributed Systems
    \\item Relevant Coursework: Advanced Algorithms, Machine Learning, Cloud Computing
\\end{itemize}

\\textbf{Bachelor of Science in Computer Engineering} \\hfill 2012 - 2016\\\\
\\textit{University of California, Berkeley} \\hfill Berkeley, CA
\\begin{itemize}[leftmargin=*, noitemsep]
    \\item GPA: 3.8/4.0
    \\item Minor: Mathematics
    \\item Dean's List: All semesters
\\end{itemize}

\\section{Projects}
\\textbf{AI-Powered Task Management System}
\\begin{itemize}[leftmargin=*, noitemsep]
    \\item Developed a full-stack application using React, Node.js, and MongoDB with ML-based task prioritization
    \\item Implemented natural language processing for task categorization, achieving 92\\% accuracy
    \\item Deployed on AWS using containerization and CI/CD pipelines for automated testing and deployment
\\end{itemize}

\\textbf{Blockchain-based Supply Chain Tracker}
\\begin{itemize}[leftmargin=*, noitemsep]
    \\item Created a decentralized application using Ethereum smart contracts and React.js frontend
    \\item Implemented real-time tracking and verification features, reducing fraud by 75\\%
    \\item Optimized gas usage and transaction costs, saving clients an average of 30\\% in operational costs
\\end{itemize}

\\section{Certifications}
\\begin{itemize}[leftmargin=*, noitemsep]
    \\item AWS Certified Solutions Architect - Professional
    \\item Google Cloud Professional Cloud Developer
    \\item MongoDB Certified Developer
    \\item Certified Kubernetes Administrator (CKA)
\\end{itemize}

\\end{document}`)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(latexCode)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="p-6 bg-zinc-950 border-zinc-800">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-zinc-400" />
          <div className="text-sm text-zinc-400">
            <span className="font-medium text-zinc-300">{resumeFile?.name}</span>
            <span className="mx-2">•</span>
            <span>Job description: {jobDescription.substring(0, 50)}...</span>
          </div>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="bg-zinc-900 border-b border-zinc-800 w-full justify-start mb-4">
            <TabsTrigger value="chat" className="data-[state=active]:bg-zinc-800">
              Chat
            </TabsTrigger>
            <TabsTrigger value="latex" className="data-[state=active]:bg-zinc-800">
              Generated LaTeX
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <div className="h-[400px] overflow-y-auto space-y-4 pr-2">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-zinc-800 text-white" : "bg-zinc-900 text-zinc-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-zinc-900 text-zinc-100">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse delay-150"></div>
                      <div className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about optimizing your resume..."
                className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 min-h-[60px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                className="h-full bg-zinc-800 hover:bg-zinc-700"
                disabled={!input.trim() || isGenerating}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="latex">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-zinc-200">LaTeX Code</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-200"
                  onClick={copyToClipboard}
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" /> Copy Code
                    </>
                  )}
                </Button>
              </div>
              <LatexDisplay code={latexCode} />
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

