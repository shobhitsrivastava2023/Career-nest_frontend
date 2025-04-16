"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Search,
  AlertCircle,
  BookOpen,
  Calendar,
  User,
  Award,
  ExternalLink,
  Bookmark,
  Quote,
  GraduationCap,
  RefreshCw,
  Filter,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { searchScholarProfiles, searchScholarArticles } from "@/lib/scopus-api"

type ScholarProfile = {
  name: string
  link: string
  thumbnail: string
  author_id: string
  affiliations: string
  email: string
  cited_by: number
  interests: Array<{ title: string; link: string }>
}

type ScholarArticle = {
  title: string
  link: string
  publication_info: {
    summary: string
    authors: string[]
  }
  result_id: string
  cited_by?: {
    value: number
    link: string
  }
  year: string
  snippet: string
}

export default function GoogleScholarSearch() {
  const [query, setQuery] = useState("")
  const [profileResults, setProfileResults] = useState<ScholarProfile[]>([])
  const [articleResults, setArticleResults] = useState<ScholarArticle[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [activeTab, setActiveTab] = useState("profiles")

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      if (activeTab === "profiles") {
        const response = await searchScholarProfiles(query)
        setProfileResults(response.profiles || [])
      } else {
        const response = await searchScholarArticles(query)
        setArticleResults(response.organic_results || [])
      }
    } catch (err) {
      console.error("Search error:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch Google Scholar data")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (hasSearched && query) {
      // Re-run search when changing tabs if we've already searched
      setLoading(true)
      setTimeout(() => {
        handleSearch()
      }, 100)
    }
  }

  const handleRetry = () => {
    handleSearch()
  }

  return (
    <div className="w-full space-y-8">
      <Tabs defaultValue="profiles" className="w-full" onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-2 mb-6 bg-zinc-800/50 backdrop-blur-sm w-full max-w-xs">
          <TabsTrigger
            value="profiles"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700"
          >
            <User className="mr-2 h-4 w-4" />
            Profiles
          </TabsTrigger>
          <TabsTrigger
            value="articles"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Articles
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                activeTab === "profiles"
                  ? "Search for researchers and academics..."
                  : "Search for papers, articles, and publications..."
              }
              className="bg-zinc-950/50 border-zinc-800 pl-10 h-12 text-white"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white flex-1 md:flex-none"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 px-6 flex-1 md:flex-none"
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="bg-red-900/20 border-red-800 text-red-300">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="ml-2 bg-red-900/30 border-red-800 text-red-200 hover:bg-red-800/30"
              >
                <RefreshCw className="mr-2 h-3 w-3" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <TabsContent value="profiles" className="mt-6">
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-6 flex gap-4">
                    <Skeleton className="h-20 w-20 rounded-full bg-zinc-700" />
                    <div className="space-y-3 flex-1">
                      <Skeleton className="h-7 w-3/4 bg-zinc-700" />
                      <Skeleton className="h-5 w-1/2 bg-zinc-700" />
                      <div className="flex gap-2 pt-2">
                        <Skeleton className="h-6 w-20 rounded-full bg-zinc-700" />
                        <Skeleton className="h-6 w-24 rounded-full bg-zinc-700" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {hasSearched && profileResults.length === 0 ? (
                <Card className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm p-8 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <User className="h-12 w-12 text-zinc-500" />
                    <h3 className="text-xl font-medium">No profiles found</h3>
                    <p className="text-zinc-400 max-w-md">
                      We couldn't find any academic profiles matching your search. Try using different keywords or check
                      the spelling.
                    </p>
                  </div>
                </Card>
              ) : (
                <>
                  {profileResults.length > 0 && (
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-medium">Profiles ({profileResults.length})</h2>
                      <Badge
                        variant="outline"
                        className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 text-blue-300 border-blue-800/50"
                      >
                        Google Scholar
                      </Badge>
                    </div>
                  )}
                  <div className="space-y-6">
                    {profileResults.map((profile, index) => (
                      <Card
                        key={index}
                        className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm hover:bg-zinc-800/70 transition-all duration-200"
                      >
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            {profile.thumbnail ? (
                              <img
                                src={profile.thumbnail || "/placeholder.svg"}
                                alt={profile.name}
                                className="h-20 w-20 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                                <User className="h-10 w-10 text-white" />
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
                                {profile.name}
                              </h3>
                              {profile.affiliations && <p className="text-zinc-300 mt-1">{profile.affiliations}</p>}
                              <div className="flex items-center gap-2 mt-2">
                                <Award className="h-4 w-4 text-blue-400" />
                                <span className="text-zinc-300">
                                  <span className="text-zinc-400 mr-1">Cited by:</span>
                                  {profile.cited_by}
                                </span>
                              </div>

                              {profile.interests && profile.interests.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {profile.interests.map((interest, i) => (
                                    <Badge
                                      key={i}
                                      variant="secondary"
                                      className="bg-blue-900/20 text-blue-200 hover:bg-blue-800/30 border border-blue-800/30"
                                    >
                                      {interest.title}
                                    </Badge>
                                  ))}
                                </div>
                              )}

                              <div className="mt-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-blue-300 border-blue-800/30 hover:bg-blue-900/30"
                                  onClick={() => window.open(profile.link, "_blank")}
                                >
                                  View Profile <ExternalLink className="ml-2 h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {!hasSearched && (
                <Card className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm p-8 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <GraduationCap className="h-12 w-12 text-zinc-500" />
                    <h3 className="text-xl font-medium">Discover Academic Profiles</h3>
                    <p className="text-zinc-400 max-w-md">
                      Search for researchers, professors, and academics to explore their publications, citations, and
                      research interests.
                    </p>
                  </div>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="articles" className="mt-6">
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm overflow-hidden">
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
              {hasSearched && articleResults.length === 0 ? (
                <Card className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm p-8 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <BookOpen className="h-12 w-12 text-zinc-500" />
                    <h3 className="text-xl font-medium">No articles found</h3>
                    <p className="text-zinc-400 max-w-md">
                      We couldn't find any articles matching your search. Try using different keywords or broaden your
                      search criteria.
                    </p>
                  </div>
                </Card>
              ) : (
                <>
                  {articleResults.length > 0 && (
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-medium">Articles ({articleResults.length})</h2>
                      <Badge
                        variant="outline"
                        className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 text-blue-300 border-blue-800/50"
                      >
                        Google Scholar
                      </Badge>
                    </div>
                  )}
                  <div className="space-y-6">
                    {articleResults.map((article, index) => (
                      <Card
                        key={index}
                        className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm hover:bg-zinc-800/70 transition-all duration-200"
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
                            {article.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {article.publication_info?.authors && (
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-blue-400 flex-shrink-0" />
                                <span className="text-zinc-300 truncate">
                                  <span className="text-zinc-400 mr-2">Authors:</span>
                                  {article.publication_info.authors.join(", ")}
                                </span>
                              </div>
                            )}
                            {article.publication_info?.summary && (
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-blue-400 flex-shrink-0" />
                                <span className="text-zinc-300 truncate">
                                  <span className="text-zinc-400 mr-2">Publication:</span>
                                  {article.publication_info.summary}
                                </span>
                              </div>
                            )}
                            {article.year && (
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-blue-400 flex-shrink-0" />
                                <span className="text-zinc-300">
                                  <span className="text-zinc-400 mr-2">Year:</span>
                                  {article.year}
                                </span>
                              </div>
                            )}
                            {article.cited_by && (
                              <div className="flex items-center gap-2">
                                <Quote className="h-4 w-4 text-blue-400 flex-shrink-0" />
                                <span className="text-zinc-300">
                                  <span className="text-zinc-400 mr-2">Citations:</span>
                                  {article.cited_by.value}
                                </span>
                              </div>
                            )}
                          </div>

                          {article.snippet && <p className="text-zinc-400 text-sm">{article.snippet}</p>}

                          <div className="pt-2 flex justify-end gap-2">
                            {article.cited_by && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-zinc-300 border-zinc-700 hover:bg-zinc-700"
                                onClick={() => window.open(article.cited_by?.link, "_blank")}
                              >
                                View Citations <Quote className="ml-2 h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-300 border-blue-800/30 hover:bg-blue-900/30"
                              onClick={() => window.open(article.link, "_blank")}
                            >
                              View Article <ExternalLink className="ml-2 h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {!hasSearched && (
                <Card className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm p-8 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <Bookmark className="h-12 w-12 text-zinc-500" />
                    <h3 className="text-xl font-medium">Find Academic Articles</h3>
                    <p className="text-zinc-400 max-w-md">
                      Search for research papers, articles, and publications across Google Scholar's extensive database.
                    </p>
                  </div>
                </Card>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
