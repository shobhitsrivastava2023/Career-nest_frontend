"use client"

import { useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { DollarSign, TrendingUp, Heart, BarChart3, ScatterChartIcon as ScatterPlot } from "lucide-react"

const data = [
  { company: "SpaceX", valuation: 350, trajectory_score: 86.72, employee_love_score: 54.86 },
  { company: "ByteDance", valuation: 300, trajectory_score: 97.07, employee_love_score: 36.76 },
  { company: "OpenAI", valuation: 157, trajectory_score: 99.73, employee_love_score: 96.25 },
  { company: "Stripe", valuation: 70, trajectory_score: 95.44, employee_love_score: 46.56 },
  { company: "Databricks", valuation: 62, trajectory_score: 97.95, employee_love_score: 80.74 },
  { company: "Canva", valuation: 32, trajectory_score: 95.89, employee_love_score: 82.87 },
  { company: "Discord", valuation: 15, trajectory_score: 92.43, employee_love_score: 25.8 },
  { company: "Ramp", valuation: 13, trajectory_score: 99.43, employee_love_score: 84.94 },
]

export default function Tech_unicorn_valuation() {
  const [activeTab, setActiveTab] = useState("valuation")

  // Get company color based on valuation - using emerald shades
  const getCompanyColor = (valuation: number) => {
    if (valuation > 200) return "#059669" // emerald-600
    if (valuation > 50) return "#10b981" // emerald-500
    if (valuation > 20) return "#34d399" // emerald-400
    return "#6ee7b7" // emerald-300
  }

  // Get bubble size based on valuation
  const getBubbleSize = (valuation: number) => {
    return Math.max(15, Math.min(40, valuation / 10 + 10))
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <BarChart3 className="mr-2 h-5 w-5 text-emerald-400" />
          Tech Unicorn Analysis
        </h2>
        <p className="text-zinc-400 text-sm mt-1">Comparing valuations, growth trajectory, and employee satisfaction</p>
      </div>

      <Card className="bg-zinc-900/60 border-zinc-800 overflow-hidden">
        <CardContent className="p-6">
          <Tabs defaultValue="valuation" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-zinc-800/50 border border-zinc-700 p-1 h-auto">
                <TabsTrigger
                  value="valuation"
                  className="px-4 py-2 rounded-md data-[state=active]:text-white relative overflow-hidden transition-all duration-300 flex items-center gap-2"
                  style={{
                    backgroundColor: activeTab === "valuation" ? "var(--valuation-color, transparent)" : "transparent",
                  }}
                >
                  {activeTab === "valuation" && (
                    <motion.div
                      layoutId="activeUnicornTabBackground"
                      className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <DollarSign className="w-4 h-4" />
                  <span>Valuation</span>
                </TabsTrigger>
                <TabsTrigger
                  value="metrics"
                  className="px-4 py-2 rounded-md data-[state=active]:text-white relative overflow-hidden transition-all duration-300 flex items-center gap-2"
                  style={{
                    backgroundColor: activeTab === "metrics" ? "var(--metrics-color, transparent)" : "transparent",
                  }}
                >
                  {activeTab === "metrics" && (
                    <motion.div
                      layoutId="activeUnicornTabBackground"
                      className="absolute inset-0 bg-gradient-to-br from-violet-600 to-violet-800 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <ScatterPlot className="w-4 h-4" />
                  <span>Performance Metrics</span>
                </TabsTrigger>
              </TabsList>

              <div className="hidden md:flex gap-4">
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-800/50">
                  <DollarSign className="w-3.5 h-3.5 mr-1" />
                  Top Valuation: $350B
                </Badge>
                <Badge variant="outline" className="bg-violet-500/10 text-violet-400 border-violet-800/50">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  Avg Trajectory: 95.6
                </Badge>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <TabsContent value="valuation" className="mt-0 outline-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-5 w-5 text-emerald-500" />
                    <CardTitle className="text-white text-lg">Company Valuation</CardTitle>
                  </div>
                  <p className="text-zinc-400 text-sm mb-6">
                    Valuation in billions of USD for top tech unicorns, sorted by market value
                  </p>

                  <div className="h-[500px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data.sort((a, b) => b.valuation - a.valuation)}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#444" />
                        <XAxis
                          type="number"
                          label={{
                            value: "Valuation ($ Billions)",
                            position: "insideBottom",
                            offset: -10,
                            fill: "#999",
                          }}
                          stroke="#666"
                          tick={{ fill: "#999" }}
                        />
                        <YAxis
                          dataKey="company"
                          type="category"
                          width={100}
                          tick={{ fontSize: 14, fill: "#ccc" }}
                          stroke="#666"
                        />
                        <Tooltip
                          cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                          contentStyle={{
                            backgroundColor: "rgba(23, 23, 23, 0.9)",
                            borderColor: "#555",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                          }}
                          itemStyle={{ color: "#eee" }}
                          labelStyle={{ color: "#fff", fontWeight: "bold", marginBottom: "5px" }}
                          formatter={(value) => [`$${value}B`, "Valuation"]}
                        />
                        <Bar
                          dataKey="valuation"
                          radius={[0, 4, 4, 0]}
                          barSize={30}
                          animationDuration={1500}
                          fill="#10b981" // Default emerald-500 color
                        >
                          {data
                            .sort((a, b) => b.valuation - a.valuation)
                            .map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={getCompanyColor(entry.valuation)} />
                            ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {["SpaceX", "ByteDance", "OpenAI", "Stripe"].map((company) => {
                      const companyData = data.find((d) => d.company === company)
                      if (!companyData) return null
                      return (
                        <Card
                          key={company}
                          className="bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 transition-colors duration-200"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-zinc-400 text-xs">{company}</span>
                              <Badge
                                variant="outline"
                                className="bg-emerald-500/10 text-emerald-400 border-emerald-800/50"
                              >
                                ${companyData.valuation}B
                              </Badge>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                                style={{ width: `${(companyData.valuation / 350) * 100}%` }}
                              ></div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="metrics" className="mt-0 outline-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-2">
                      <TrendingUp className="h-5 w-5 text-violet-500" />
                      <Heart className="h-5 w-5 text-rose-500" />
                    </div>
                    <CardTitle className="text-white text-lg">Trajectory vs. Employee Satisfaction</CardTitle>
                  </div>
                  <p className="text-zinc-400 text-sm mb-6">
                    Comparing growth trajectory scores with employee satisfaction metrics. Bubble size represents
                    company valuation.
                  </p>

                  <div className="h-[500px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis
                          type="number"
                          dataKey="trajectory_score"
                          name="Trajectory Score"
                          domain={[80, 100]}
                          label={{ value: "Trajectory Score", position: "bottom", offset: 0, fill: "#999" }}
                          stroke="#666"
                          tick={{ fill: "#999" }}
                        />
                        <YAxis
                          type="number"
                          dataKey="employee_love_score"
                          name="Employee Love Score"
                          domain={[0, 100]}
                          label={{
                            value: "Employee Satisfaction",
                            angle: -90,
                            position: "insideLeft",
                            fill: "#999",
                          }}
                          stroke="#666"
                          tick={{ fill: "#999" }}
                        />
                        <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />
                        <Legend
                          verticalAlign="top"
                          height={36}
                          content={<CustomLegend />}
                          wrapperStyle={{ paddingBottom: "20px" }}
                        />
                        <Scatter name="Companies" data={data} fill="#8884d8" shape={<CustomShape />} />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card className="bg-zinc-800/50 border-zinc-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="h-4 w-4 text-violet-500" />
                          <h3 className="text-white font-medium">Top Trajectory Scores</h3>
                        </div>
                        <div className="space-y-2">
                          {data
                            .sort((a, b) => b.trajectory_score - a.trajectory_score)
                            .slice(0, 3)
                            .map((company) => (
                              <div key={company.company} className="flex items-center justify-between">
                                <span className="text-zinc-300">{company.company}</span>
                                <Badge
                                  variant="outline"
                                  className="bg-violet-500/10 text-violet-400 border-violet-800/50"
                                >
                                  {company.trajectory_score.toFixed(1)}
                                </Badge>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-zinc-800/50 border-zinc-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Heart className="h-4 w-4 text-rose-500" />
                          <h3 className="text-white font-medium">Top Employee Satisfaction</h3>
                        </div>
                        <div className="space-y-2">
                          {data
                            .sort((a, b) => b.employee_love_score - a.employee_love_score)
                            .slice(0, 3)
                            .map((company) => (
                              <div key={company.company} className="flex items-center justify-between">
                                <span className="text-zinc-300">{company.company}</span>
                                <Badge variant="outline" className="bg-rose-500/10 text-rose-400 border-rose-800/50">
                                  {company.employee_love_score.toFixed(1)}
                                </Badge>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// Custom tooltip for the scatter chart
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-zinc-900 border border-zinc-700 rounded-md shadow-md p-4">
        <p className="font-medium text-white mb-1">{data.company}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
          <span className="text-zinc-400">Valuation:</span>
          <span className="font-medium text-emerald-400">${data.valuation}B</span>
          <span className="text-zinc-400">Trajectory:</span>
          <span className="font-medium text-violet-400">{data.trajectory_score.toFixed(1)}</span>
          <span className="text-zinc-400">Employee Score:</span>
          <span className="font-medium text-rose-400">{data.employee_love_score.toFixed(1)}</span>
        </div>
      </div>
    )
  }
  return null
}

// Custom legend for the scatter chart
function CustomLegend() {
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-2">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
        <span className="text-zinc-300 text-sm">Bubble Size = Valuation</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-violet-500"></div>
        <span className="text-zinc-300 text-sm">X-Axis = Trajectory Score</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-rose-500"></div>
        <span className="text-zinc-300 text-sm">Y-Axis = Employee Satisfaction</span>
      </div>
    </div>
  )
}

// Custom shape for the scatter points
function CustomShape(props: any) {
  const { cx, cy, payload } = props
  const size = Math.max(15, Math.min(40, payload.valuation / 10 + 10)) // Size based on valuation

  // Color based on the quadrant (high/low trajectory and employee score)
  let fillColor, strokeColor
  if (payload.trajectory_score > 95 && payload.employee_love_score > 70) {
    // High trajectory, high employee satisfaction
    fillColor = "rgba(139, 92, 246, 0.7)" // violet with transparency
    strokeColor = "#8b5cf6" // violet-500
  } else if (payload.trajectory_score > 95) {
    // High trajectory, lower employee satisfaction
    fillColor = "rgba(59, 130, 246, 0.7)" // blue with transparency
    strokeColor = "#3b82f6" // blue-500
  } else if (payload.employee_love_score > 70) {
    // Lower trajectory, high employee satisfaction
    fillColor = "rgba(236, 72, 153, 0.7)" // pink with transparency
    strokeColor = "#ec4899" // pink-500
  } else {
    // Lower trajectory, lower employee satisfaction
    fillColor = "rgba(245, 158, 11, 0.7)" // amber with transparency
    strokeColor = "#f59e0b" // amber-500
  }

  return (
    <g>
      <circle cx={cx} cy={cy} r={size} fill={fillColor} stroke={strokeColor} strokeWidth={1.5} />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontSize={size > 25 ? 12 : 10}
        fontWeight="bold"
      >
        {payload.company.substring(0, 3)}
      </text>
    </g>
  )
}
