import { type NextRequest, NextResponse } from "next/server"
import { google } from "@ai-sdk/google"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    console.log("API route called")
    const formData = await request.formData()
    const resumeFile = formData.get("resume") as File
    const jobDescription = formData.get("jobDescription") as string

    if (!resumeFile || !jobDescription) {
      console.log("Missing resume or job description")
      return NextResponse.json({ error: "Missing resume or job description" }, { status: 400 })
    }

    console.log("Processing resume file:", resumeFile.name, resumeFile.size, "bytes")

    try {
      // Convert resume file to ArrayBuffer
      const fileBuffer = await resumeFile.arrayBuffer()
      console.log("File buffer created, size:", fileBuffer.byteLength)

      // Create the Google Generative AI model
      const model = google("gemini-1.5-pro-latest")

      console.log("Calling AI model...")
      // Generate optimized resume using AI SDK
      const { text } = await generateText({
        model,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `I have a resume and a job description. Please optimize the resume for this specific job using LaTeX format.

                # Job Description:
                ${jobDescription}

                # Instructions:
                1. Analyze the resume and job description
                2. Reorganize, rewrite, and restructure the resume to highlight relevant skills and experiences
                3. Format the output as complete LaTeX code for a professional resume
                4. Use a clean, modern LaTeX resume template
                5. Ensure all original information is preserved but optimized and tailored for the job
                6. Include proper LaTeX document class, packages, and structure
                7. Make sure the LaTeX code is complete and can be compiled directly

                Return only the LaTeX code without any explanation or markdown formatting.`,
              },
              {
                type: "file",
                data: new Uint8Array(fileBuffer),
                mimeType: "application/pdf",
              },
            ],
          },
        ],
      })

      console.log("AI response received, length:", text.length)

      // Return the generated text as a proper NextResponse
      return NextResponse.json({ latex: text })
    } catch (aiError) {
      console.error("AI processing error:", aiError)
      const errorMessage = aiError instanceof Error ? aiError.message : "AI processing failed"
      return NextResponse.json({ error: "Failed to process resume with AI", details: errorMessage }, { status: 500 })
    }
  } catch (error) {
    console.error("Error processing resume:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return NextResponse.json({ error: "Failed to process resume", details: errorMessage }, { status: 500 })
  }
}
