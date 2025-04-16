import { type NextRequest, NextResponse } from "next/server"

const SERP_API_KEY = process.env.NEXT_PUBLIC_SERP_API_KEY

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const resultId = searchParams.get("resultId")

  if (!resultId) {
    return NextResponse.json({ error: "resultId parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://serpapi.com/search?engine=google_scholar_cite&q=${encodeURIComponent(resultId)}&api_key=${SERP_API_KEY}`,
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("SERP API error:", errorText)
      return NextResponse.json(
        { error: `SERP API returned status ${response.status}: ${errorText}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching Google Scholar citations:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch Google Scholar citations",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
