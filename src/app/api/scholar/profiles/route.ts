import { type NextRequest, NextResponse } from "next/server"

const SERP_API_KEY = process.env.NEXT_PUBLIC_SERP_API_KEY

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://serpapi.com/search?engine=google_scholar_profiles&mauthors=${encodeURIComponent(
        query,
      )}&api_key=${SERP_API_KEY}`,
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
    console.error("Error fetching Google Scholar profiles:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch Google Scholar profiles",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
