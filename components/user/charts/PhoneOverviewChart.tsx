"use client"

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useMemo, useState } from "react"
const chartData = [
    { date: "2024-01-02", desktop: 222, mobile: 150 },
    { date: "2024-02-02", desktop: 322, mobile: 170 },
    { date: "2024-03-02", desktop: 400, mobile: 120 },
    { date: "2024-04-02", desktop: 222, mobile: 150 },
    { date: "2024-05-02", desktop: 165, mobile: 220 },
    { date: "2024-06-02", desktop: 178, mobile: 200 },
    { date: "2024-07-02", desktop: 200, mobile: 190 },
    { date: "2024-08-02", desktop: 230, mobile: 220 },
    { date: "2024-09-02", desktop: 225, mobile: 180 },
    { date: "2024-10-02", desktop: 190, mobile: 240 },
]

const chartConfig = {
    views: {
        label: "Average",
    },
    answeredCallPercent: {
        label: "Answered Call %",
        color: "hsl(var(--chart-1))",
    },
    notReadyPercent: {
        label: "Not Ready %",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig
const average_data = [
    { month: "Jan-24", answeredCallPercent: 74.67, notReadyPercent: 27.16 },
    { month: "Feb-24", answeredCallPercent: 73.72, notReadyPercent: 22.61 },
    { month: "Mar-24", answeredCallPercent: 76.01, notReadyPercent: 22.41 },
    { month: "Apr-24", answeredCallPercent: 75.77, notReadyPercent: 25.61 },
    { month: "May-24", answeredCallPercent: 77.11, notReadyPercent: 22.89 },
    { month: "Jun-24", answeredCallPercent: 76.5, notReadyPercent: 22.31 },
    { month: "Jul-24", answeredCallPercent: 87.75, notReadyPercent: 25.25 },
    { month: "Aug-24", answeredCallPercent: 86.56, notReadyPercent: 27.16 },
    { month: "Sep-24", answeredCallPercent: 83.61, notReadyPercent: 27.64 },
    { month: "Oct-24", answeredCallPercent: 87.22, notReadyPercent: 27 },
]
export function PhoneOverviewChart() {
    const [activeAnimationChart, setActiveAnimationChart] = useState("answeredCallPercent"); // Track active tab
    const [chartKey, setChartKey] = useState(0); // Key for chart remounting

    // Update active chart and trigger chart remount
    const handleChartSwitch = (chartType: any) => {
        setActiveChart(chartType);
        setChartKey((prevKey) => prevKey + 1); // Change key to force remount
    };
    const [activeChart, setActiveChart] =
        useState<keyof typeof chartConfig>("answeredCallPercent")

    const total = useMemo(
        () => ({
            answeredCallPercent: average_data.reduce((acc, curr) => acc + curr.answeredCallPercent, 0),
            notReadyPercent: average_data.reduce((acc, curr) => acc + curr.notReadyPercent, 0),
        }),
        []
    )
    console.log("Active chart here", activeChart)
    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    {activeChart == "answeredCallPercent" ? (
                        <>
                            <CardTitle>
                                Answered Call Averages Through 2024
                            </CardTitle>
                            <CardDescription>
                                Categorized by month, from Jan-2024 to Oct-2024
                            </CardDescription>
                        </>
                    ) : (
                        <>
                            <CardTitle>
                                Not Ready % Averages Through 2024
                            </CardTitle>
                            <CardDescription>
                                Categorized by month, from Jan-2024 to Oct-2024
                            </CardDescription>
                        </>
                    )}

                </div>
                <div className="flex">
                    <button
                        data-active={activeChart === "answeredCallPercent"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                        onClick={() => {
                            setActiveChart("answeredCallPercent")
                            handleChartSwitch("answeredCallPercent")
                        }}
                    >
                        <span className="text-xs text-muted-foreground">
                            Answered
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            79%
                        </span>
                    </button>
                    <button
                        data-active={activeChart === "notReadyPercent"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                        onClick={() => {
                            setActiveChart("answeredCallPercent")
                            handleChartSwitch("notReadyPercent")
                        }}
                    >
                        <span className="text-xs text-muted-foreground">
                            Not Ready
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            25%
                        </span>
                    </button>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                    key={chartKey} // Force remount on chart switch
                >
                    <AreaChart
                        accessibilityLayer
                        data={average_data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                return value
                            }}
                        />
                        <YAxis
                            domain={activeChart == "answeredCallPercent" ? [70, 90] : [19, 30]} // Set the range for the Y-axis
                            tickMargin={8}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return value
                                    }}
                                />
                            }
                        />
                        <defs>
                            <linearGradient id="fillNotReady" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor={`var(--color-${activeChart})`}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={`var(--color-${activeChart})`}
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey={activeChart}
                            type="linear"
                            fill={`var(--color-${activeChart})`}
                            fillOpacity={0.4}
                            stroke={`var(--color-${activeChart})`}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
