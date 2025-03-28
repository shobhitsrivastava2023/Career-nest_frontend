"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Heart } from "lucide-react"

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

export default function TechUnicornValuation() {
  return (
    <div className="bg-zinc-900 container mx-auto py-6 px-4 max-w-5xl h-[120vh]">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Tech Unicorn Analysis</h1>
        <p className="text-zinc-400 mt-2">Comparing valuations, growth trajectory, and employee satisfaction</p>
      </div>

      <Tabs defaultValue="valuation" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="valuation">Valuation</TabsTrigger>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="valuation" className="mt-4">
          <Card className="bg-zinc-800 border-zinc-700 h-[90vh]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-500" />
                <CardTitle className="text-white">Company Valuation</CardTitle>
              </div>
              <CardDescription className="text-zinc-400">Valuation in billions of USD for top tech unicorns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    valuation: {
                      label: "Valuation ($ Billions)",
                      color: "rgb(16, 185, 129)", // emerald-500
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%" >
                    <BarChart
                      data={data.sort((a, b) => b.valuation - a.valuation)}
                      layout="vertical"
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }
                      
                    
                    }
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis
                        type="number"
                        label={{ value: "Valuation ($ Billions)", position: "insideBottom", offset: -5 }}
                        stroke="#ffffff"
                      />
                      <YAxis 
                        dataKey="company" 
                        type="category" 
                        width={100} 
                        tick={{ fontSize: 14 }} 
                        stroke="#ffffff"
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent formatter={(value) => [`$${value}B`, "Valuation"]} />}
                      />
                      <Bar 
                        dataKey="valuation" 
                        fill="rgb(16, 185, 129)"
                        radius={[0, 4, 4, 0]} 
                        barSize={25} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="metrics" className="mt-4">
          <Card className="bg-zinc-800 border-zinc-700 h-[90vh] ">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  <Heart className="h-5 w-5 text-rose-500" />
                </div>
                <CardTitle className="text-white">Trajectory vs. Employee Satisfaction</CardTitle>
              </div>
              <CardDescription  className="text-white">Comparing growth trajectory scores with employee satisfaction metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <ChartContainer
                  config={{
                    trajectory: {
                      label: "Trajectory Score",
                      color: "hsl(var(--chart-2))",
                    },
                    employee: {
                      label: "Employee Satisfaction",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        type="number"
                        dataKey="trajectory_score"
                        name="Trajectory Score"
                        domain={[80, 100]}
                        label={{ value: "Trajectory Score", position: "bottom", offset: 0 }}
                      />
                      <YAxis
                        type="number"
                        dataKey="employee_love_score"
                        name="Employee Love Score"
                        domain={[0, 100]}
                        label={{ value: "Employee Satisfaction", angle: -90, position: "insideLeft" }}
                      />
                      <ChartTooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />
                      <Scatter name="Companies" data={data} fill="var(--color-trajectory)" shape={<CustomShape />} />
                    </ScatterChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 mt-7">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 "></div>
                  <span className="text-white">Trajectory Score: Growth potential</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                  <span className="text-white">Employee Score: Workplace satisfaction</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Custom tooltip for the scatter chart
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-background border border-border rounded-md shadow-md p-3">
        <p className="font-medium">{data.company}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-sm">
          <span className="text-muted-foreground">Valuation:</span>
          <span className="font-medium">${data.valuation}B</span>
          <span className="text-muted-foreground">Trajectory:</span>
          <span className="font-medium">{data.trajectory_score.toFixed(1)}</span>
          <span className="text-muted-foreground">Employee Score:</span>
          <span className="font-medium">{data.employee_love_score.toFixed(1)}</span>
        </div>
      </div>
    )
  }
  return null
}

// Custom shape for the scatter points
function CustomShape(props: any) {
  const { cx, cy, payload } = props
  const size = payload.valuation / 50 + 10 // Size based on valuation

  return (
    <g>
      <circle cx={cx} cy={cy} r={size} fill="rgba(130, 202, 157, 0.7)" stroke="#82ca9d" strokeWidth={1} />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#333"
        fontSize={size > 15 ? 12 : 10}
        fontWeight="bold"
      >
        {payload.company.substring(0, 3)}
      </text>
    </g>
  )
}

