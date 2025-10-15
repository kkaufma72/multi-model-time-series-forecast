"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ModelComparisonProps {
  stock: string
}

const modelMetrics = [
  {
    model: "LSTM",
    rmse: 2.34,
    mae: 1.87,
    r2: 0.95,
    mape: 1.2,
  },
  {
    model: "XGBoost",
    rmse: 2.89,
    mae: 2.21,
    r2: 0.93,
    mape: 1.5,
  },
  {
    model: "Prophet",
    rmse: 3.12,
    mae: 2.45,
    r2: 0.9,
    mape: 1.8,
  },
  {
    model: "Ensemble",
    rmse: 2.01,
    mae: 1.62,
    r2: 0.98,
    mape: 0.9,
  },
]

export function ModelComparison({ stock }: ModelComparisonProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Model Performance - RMSE & MAE</CardTitle>
          <CardDescription>Lower values indicate better prediction accuracy</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="model" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="rmse" fill="hsl(var(--chart-1))" name="RMSE" radius={[4, 4, 0, 0]} />
              <Bar dataKey="mae" fill="hsl(var(--chart-2))" name="MAE" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Model Performance - R² & MAPE</CardTitle>
          <CardDescription>R² closer to 1.0 and lower MAPE indicate better fit</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="model" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="r2" fill="hsl(var(--chart-3))" name="R² Score" radius={[4, 4, 0, 0]} />
              <Bar dataKey="mape" fill="hsl(var(--chart-4))" name="MAPE %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Model Comparison Summary</CardTitle>
          <CardDescription>Detailed performance metrics for {stock}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Model</th>
                  <th className="text-right py-3 px-4 font-medium">RMSE</th>
                  <th className="text-right py-3 px-4 font-medium">MAE</th>
                  <th className="text-right py-3 px-4 font-medium">R² Score</th>
                  <th className="text-right py-3 px-4 font-medium">MAPE %</th>
                  <th className="text-right py-3 px-4 font-medium">Training Time</th>
                </tr>
              </thead>
              <tbody>
                {modelMetrics.map((metric, idx) => (
                  <tr key={metric.model} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">{metric.model}</td>
                    <td className="text-right py-3 px-4 font-mono text-sm">{metric.rmse.toFixed(2)}</td>
                    <td className="text-right py-3 px-4 font-mono text-sm">{metric.mae.toFixed(2)}</td>
                    <td className="text-right py-3 px-4 font-mono text-sm">{metric.r2.toFixed(3)}</td>
                    <td className="text-right py-3 px-4 font-mono text-sm">{metric.mape.toFixed(1)}%</td>
                    <td className="text-right py-3 px-4 text-sm text-muted-foreground">
                      {metric.model === "LSTM"
                        ? "45s"
                        : metric.model === "XGBoost"
                          ? "12s"
                          : metric.model === "Prophet"
                            ? "8s"
                            : "52s"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
