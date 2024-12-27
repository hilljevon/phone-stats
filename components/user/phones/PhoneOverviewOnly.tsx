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
import { useEffect, useMemo, useState } from "react"

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
    absenceSum: {
        label: "Total absences",
        color: "#dd9faf",
    },
    tardiesSum: {
        label: "Total tardies",
        color: "hsl(var(--chart-4))",
    },
    caseAvg: {
        label: "Case Averages",
        color: "hsl(var(--chart-5))",
    }
} satisfies ChartConfig
const average_data = [
    { month: "Jan-24", answeredCallPercent: 74.67, notReadyPercent: 27.16, absenceSum: 23, tardiesSum: 71, caseAvg: 516 },
    { month: "Feb-24", answeredCallPercent: 73.72, notReadyPercent: 22.61, absenceSum: 31, tardiesSum: 87, caseAvg: 396 },
    { month: "Mar-24", answeredCallPercent: 76.01, notReadyPercent: 22.41, absenceSum: 36, tardiesSum: 52, caseAvg: 379 },
    { month: "Apr-24", answeredCallPercent: 75.77, notReadyPercent: 25.61, absenceSum: 43, tardiesSum: 83, caseAvg: 407 },
    { month: "May-24", answeredCallPercent: 77.11, notReadyPercent: 22.89, absenceSum: 35, tardiesSum: 63, caseAvg: 382 },
    { month: "Jun-24", answeredCallPercent: 76.5, notReadyPercent: 22.31, absenceSum: 39, tardiesSum: 66, caseAvg: 364 },
    { month: "Jul-24", answeredCallPercent: 87.75, notReadyPercent: 25.25, absenceSum: 38, tardiesSum: 104, caseAvg: 381 },
    { month: "Aug-24", answeredCallPercent: 86.56, notReadyPercent: 27.16, absenceSum: 24, tardiesSum: 40, caseAvg: 396 },
    { month: "Sep-24", answeredCallPercent: 83.61, notReadyPercent: 27.64, absenceSum: 37, tardiesSum: 46, caseAvg: 391 },
    { month: "Oct-24", answeredCallPercent: 87.22, notReadyPercent: 27, absenceSum: 36, tardiesSum: 90, caseAvg: 400 },
]


const barChartConfig = {
    views: {
        label: "Cases",
    },
    cases: {
        label: "Cases",
        color: "#693690",
    },
} satisfies ChartConfig
export function PhoneOverviewOnly() {
    const [barActiveChart, setBarActiveChart] =
        useState<keyof typeof barChartConfig>("cases")
    const [barChartData2, setBarChartData2] = useState<any[]>([])
    const [chartKey, setChartKey] = useState(0); // Key for chart remounting
    const [barChartActive, setBarChartActive] = useState(false)
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
            absenceSum: average_data.reduce((acc, curr) => acc + curr.absenceSum, 0),
            tardiesSum: average_data.reduce((acc, curr) => acc + curr.tardiesSum, 0),
            caseAvg: 401
        }),
        []
    )
    const determneYAxis = () => {
        if (activeChart == "answeredCallPercent") {
            return [70, 90]
        } else if (activeChart == "notReadyPercent") {
            return [19, 30]
        } else if (activeChart == "absenceSum") {
            return [20, 50]
        } else {
            return [30, 110]
        }
    }
    const determineGraphAreaType = () => {
        if (activeChart == "answeredCallPercent" || activeChart == "notReadyPercent") {
            return "linear"
        } else {
            return "natural"
        }
    }
    useEffect(() => {
        fetch("/data/case_census.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to fetch case census data!")
                }
                return response.json()
            })
            .then((jsonData) => setBarChartData2(jsonData))
            .catch((error) => console.log("Unable to fetch JSON data"))
    }, [])
    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">

                <>
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
                </>
                <div className="flex">
                    <button
                        data-active={activeChart === "answeredCallPercent"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                        onClick={() => {
                            setBarChartActive(false)
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
                            setBarChartActive(false)
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
                    key={chartKey}
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
                            domain={determneYAxis()} // Set the range for the Y-axis
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
                            type={determineGraphAreaType()}
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
