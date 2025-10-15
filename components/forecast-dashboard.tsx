"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ForecastChart } from "@/components/forecast-chart"
import { ModelComparison } from "@/components/model-comparison"
import { FeatureImportance } from "@/components/feature-importance"
import { MetricsGrid } from "@/components/metrics-grid"
import { TrendingUp, Activity, BarChart3, Brain } from "lucide-react"

const STOCKS = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "MSFT", name: "Microsoft Corp." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
]

const MODELS = ["LSTM", "XGBoost", "Prophet", "Ensemble"]

export function ForecastDashboard() {
  const [selectedStock, setSelectedStock] = useState("AAPL")
  const [selectedModel, setSelectedModel] = useState("Ensemble")
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLastUpdated(new Date())
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-balance">Multi-Model Time Series Forecasting</h1>
          <p className="text-muted-foreground mt-2">Advanced ML predictions using LSTM, XGBoost, and Prophet models</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs">
            <Activity className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
          <Button onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? "Updating..." : "Refresh Data"}
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Stock Symbol</label>
                <Select value={selectedStock} onValueChange={setSelectedStock}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STOCKS.map((stock) => (
                      <SelectItem key={stock.symbol} value={stock.symbol}>
                        {stock.symbol} - {stock.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MODELS.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <MetricsGrid stock={selectedStock} model={selectedModel} />

      {/* Main Content */}
      <Tabs defaultValue="forecast" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="forecast">
            <TrendingUp className="w-4 h-4 mr-2" />
            Forecast
          </TabsTrigger>
          <TabsTrigger value="comparison">
            <BarChart3 className="w-4 h-4 mr-2" />
            Models
          </TabsTrigger>
          <TabsTrigger value="features">
            <Brain className="w-4 h-4 mr-2" />
            Features
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-6">
          <ForecastChart stock={selectedStock} model={selectedModel} />
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <ModelComparison stock={selectedStock} />
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <FeatureImportance model={selectedModel} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
