"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { searchScopus } from "@/lib/scopus-api"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, AlertCircle, BookOpen, Calendar, User, Award, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ScopusSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const response = await searchScopus(query)
      setResults(response["search-results"].entry || [])
    } catch (err) {
      setError("Failed to fetch research data")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Scopus Research Explorer</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Search for academic publications, authors, and research papers across the Scopus database
          </p>
        </div>

        <Card className="bg-zinc-950 border-black shadow-lg">
          <CardContent className="pt-6">
            <div className="relative flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search by author, title, keyword..."
                  className="bg-black border-black pl-10 h-12 text-white"
                />
              </div>
              <Button onClick={handleSearch} disabled={loading} className="bg-blue-600 hover:bg-blue-700 h-12 px-6">
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="bg-red-900/20 border-red-800 text-red-300">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-zinc-800 border-zinc-700 overflow-hidden">
                <CardHeader className="pb-2">
                  <Skeleton className="h-7 w-3/4 bg-zinc-700" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-5 w-1/2 bg-zinc-700" />
                  <Skeleton className="h-5 w-2/3 bg-zinc-700" />
                  <Skeleton className="h-5 w-1/3 bg-zinc-700" />
                  <div className="flex gap-2 pt-2">
                    <Skeleton className="h-6 w-20 rounded-full bg-zinc-700" />
                    <Skeleton className="h-6 w-24 rounded-full bg-zinc-700" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {hasSearched && results.length === 0 ? (
              <Card className="bg-zinc-800 border-zinc-700 p-8 text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <BookOpen className="h-12 w-12 text-zinc-500" />
                  <h3 className="text-xl font-medium">No results found</h3>
                  <p className="text-zinc-400 max-w-md">
                    We couldn't find any publications matching your search. Try using different keywords or broaden your
                    search criteria.
                  </p>
                </div>
              </Card>
            ) : (
              <>
                {results.length > 0 && (
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium">Results ({results.length})</h2>
                    <Badge variant="outline" className="bg-zinc-800 text-zinc-300">
                      Scopus Database
                    </Badge>
                  </div>
                )}
                <div className="space-y-6">
                  {results.map((result) => (
                    <Card
                      key={result["dc:identifier"]}
                      className="bg-zinc-800 border-zinc-700 hover:border-zinc-600 transition-all duration-200"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-bold leading-tight text-blue-300">
                          {result["dc:title"]}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                            <span className="text-zinc-300 truncate">
                              <span className="text-zinc-400 mr-2">Author:</span>
                              {result["dc:creator"]}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                            <span className="text-zinc-300 truncate">
                              <span className="text-zinc-400 mr-2">Journal:</span>
                              {result["prism:publicationName"]}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                            <span className="text-zinc-300">
                              <span className="text-zinc-400 mr-2">Published:</span>
                              {result["prism:coverDate"]}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                            <span className="text-zinc-300">
                              <span className="text-zinc-400 mr-2">Citations:</span>
                              {result["citedby-count"]}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {result["authkeywords"]?.split(";").map(
                            (keyword: string, i: number) =>
                              keyword.trim() && (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="bg-blue-900/30 text-blue-200 hover:bg-blue-800/40"
                                >
                                  {keyword.trim()}
                                </Badge>
                              ),
                          )}
                        </div>

                        <div className="pt-2 flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-300 border-blue-800/50 hover:bg-blue-900/20"
                            onClick={() => window.open(result["link"]?.[0]?.["@href"], "_blank")}
                          >
                            View Publication <ExternalLink className="ml-2 h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {!hasSearched && (
              <Card className="bg-zinc-800 border-zinc-700 p-8 text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <Search className="h-12 w-12 text-zinc-500" />
                  <h3 className="text-xl font-medium">Start your research</h3>
                  <p className="text-zinc-400 max-w-md">
                    Enter keywords, author names, or publication titles to discover relevant academic research from
                    Scopus.
                  </p>
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}

