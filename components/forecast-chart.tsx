"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"
import { useMemo } from "react"

interface ForecastChartProps {
  stock: string
  model: string
}

// Generate realistic stock data with predictions
function generateStockData(stock: string, model: string) {
  const data = []
  const basePrice =
    stock === "AAPL" ? 180 : stock === "GOOGL" ? 140 : stock === "MSFT" ? 380 : stock === "TSLA" ? 250 : 170
  const volatility = stock === "TSLA" ? 0.03 : 0.015

  // Historical data (60 days)
  for (let i = 60; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const randomWalk = (Math.random() - 0.5) * volatility * basePrice
    const trend = (60 - i) * 0.1
    const actual = basePrice + trend + randomWalk

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      actual: Number.parseFloat(actual.toFixed(2)),
      predicted: null,
      upperBound: null,
      lowerBound: null,
    })
  }

  // Forecast data (30 days)
  const lastActual = data[data.length - 1].actual
  const modelAccuracy = model === "Ensemble" ? 0.98 : model === "LSTM" ? 0.95 : model === "XGBoost" ? 0.93 : 0.9

  for (let i = 1; i <= 30; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    const trend = i * 0.15
    const predicted = lastActual + trend + (Math.random() - 0.5) * volatility * basePrice * (1 - modelAccuracy)
    const confidence = predicted * 0.05

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      actual: null,
      predicted: Number.parseFloat(predicted.toFixed(2)),
      upperBound: Number.parseFloat((predicted + confidence).toFixed(2)),
      lowerBound: Number.parseFloat((predicted - confidence).toFixed(2)),
    })
  }

  return data
}

export function ForecastChart({ stock, model }: ForecastChartProps) {
  const data = useMemo(() => generateStockData(stock, model), [stock, model])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Forecast - {stock}</CardTitle>
        <CardDescription>Historical prices and {model} model predictions with 95% confidence intervals</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} interval={14} />
            <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="upperBound"
              stroke="none"
              fill="url(#confidenceGradient)"
              fillOpacity={1}
              name="Confidence Interval"
            />
            <Area type="monotone" dataKey="lowerBound" stroke="none" fill="hsl(var(--background))" fillOpacity={1} />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              dot={false}
              name="Actual Price"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Predicted Price"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
