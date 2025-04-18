import { type NextRequest, NextResponse } from "next/server"

const SERP_API_KEY = process.env.SERP_API_KEY || process.env.NEXT_PUBLIC_SERP_API_KEY

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  if (!SERP_API_KEY) {
    console.error("SERP API key is missing")
    return NextResponse.json({ error: "API configuration error" }, { status: 500 })
  }

  try {
    // Add a timeout to the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout

    console.log(`Fetching profiles for query: ${query}`)
    const response = await fetch(
      `https://serpapi.com/search?engine=google_scholar_profiles&mauthors=${encodeURIComponent(
        query,
      )}&api_key=${SERP_API_KEY}`,
      {
        signal: controller.signal,
        headers: {
          "Accept": "application/json",
        },
      }
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`SERP API error (${response.status}):`, errorText)
      
      if (response.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        )
      }
      
      return NextResponse.json(
        { error: `SERP API returned status ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log(`Successfully fetched profiles, found: ${data.profiles?.length || 0} results`)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching Google Scholar profiles:", error)
    
    // Handle timeout specifically
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Request timed out. The search operation took too long to complete." },
        { status: 504 }
      )
    }
    
    return NextResponse.json(
      {
        error: "Failed to fetch Google Scholar profiles",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
