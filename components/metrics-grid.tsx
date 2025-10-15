"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target, Zap } from "lucide-react"

interface MetricsGridProps {
  stock: string
  model: string
}

export function MetricsGrid({ stock, model }: MetricsGridProps) {
  const accuracy = model === "Ensemble" ? 98.2 : model === "LSTM" ? 95.3 : model === "XGBoost" ? 93.1 : 90.4
  const rmse = model === "Ensemble" ? 2.01 : model === "LSTM" ? 2.34 : model === "XGBoost" ? 2.89 : 3.12
  const prediction =
    stock === "AAPL"
      ? 185.42
      : stock === "GOOGL"
        ? 145.78
        : stock === "MSFT"
          ? 392.15
          : stock === "TSLA"
            ? 258.9
            : 175.32
  const confidence = model === "Ensemble" ? 96 : model === "LSTM" ? 92 : model === "XGBoost" ? 88 : 85

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{accuracy.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-primary inline-flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.3% from baseline
            </span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">RMSE</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${rmse.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">Root Mean Square Error</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">30-Day Prediction</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${prediction.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-secondary inline-flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3.2% projected growth
            </span>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Confidence Score</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{confidence}%</div>
          <p className="text-xs text-muted-foreground mt-1">95% confidence interval</p>
        </CardContent>
      </Card>
    </div>
  )
}
