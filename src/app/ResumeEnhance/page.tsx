import ResumeForm from "../components/resume-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume ATS Optimizer",
  description: "Optimize your resume for ATS systems using AI",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-white">Resume ATS Optimizer</h1>
        <ResumeForm />
      </div>
    </main>
  )
}

