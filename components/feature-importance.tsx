"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface FeatureImportanceProps {
  model: string
}

const featureData = [
  { feature: "Previous Close", importance: 0.28, category: "price" },
  { feature: "Volume", importance: 0.18, category: "volume" },
  { feature: "Moving Avg (50d)", importance: 0.15, category: "technical" },
  { feature: "RSI", importance: 0.12, category: "technical" },
  { feature: "MACD", importance: 0.1, category: "technical" },
  { feature: "Bollinger Bands", importance: 0.08, category: "technical" },
  { feature: "Market Sentiment", importance: 0.05, category: "sentiment" },
  { feature: "Day of Week", importance: 0.04, category: "temporal" },
]

const COLORS = {
  price: "hsl(var(--chart-1))",
  volume: "hsl(var(--chart-2))",
  technical: "hsl(var(--chart-3))",
  sentiment: "hsl(var(--chart-4))",
  temporal: "hsl(var(--chart-5))",
}

export function FeatureImportance({ model }: FeatureImportanceProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Feature Importance - {model}</CardTitle>
          <CardDescription>Relative contribution of each feature to model predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={featureData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                type="number"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              />
              <YAxis
                type="category"
                dataKey="feature"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
                width={150}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
              />
              <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                {featureData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.category as keyof typeof COLORS]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feature Categories</CardTitle>
          <CardDescription>Breakdown by feature type</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.price }} />
                <span className="text-sm font-medium">Price Features</span>
              </div>
              <span className="text-sm font-mono">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.volume }} />
                <span className="text-sm font-medium">Volume Features</span>
              </div>
              <span className="text-sm font-mono">18%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.technical }} />
                <span className="text-sm font-medium">Technical Indicators</span>
              </div>
              <span className="text-sm font-mono">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.sentiment }} />
                <span className="text-sm font-medium">Sentiment Analysis</span>
              </div>
              <span className="text-sm font-mono">5%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.temporal }} />
                <span className="text-sm font-medium">Temporal Features</span>
              </div>
              <span className="text-sm font-mono">4%</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-2">
            <h4 className="text-sm font-semibold">Key Insights</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Technical indicators drive 45% of predictions</li>
              <li>• Price history is the strongest single feature</li>
              <li>• Volume provides significant signal</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
