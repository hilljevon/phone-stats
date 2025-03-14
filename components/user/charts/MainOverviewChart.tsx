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
    },
    qi_avg: {
        label: "QI Averages",
        color: "hsl(var(--chart-6))",
    }
} satisfies ChartConfig
// Main data used to produce averages
const average_data = [
    { month: "Jan-24", answeredCallPercent: 74.67, notReadyPercent: 27.16, absenceSum: 23, tardiesSum: 71, caseAvg: 516, qi_avg: null },
    { month: "Feb-24", answeredCallPercent: 73.72, notReadyPercent: 22.61, absenceSum: 31, tardiesSum: 87, caseAvg: 396, qi_avg: null },
    { month: "Mar-24", answeredCallPercent: 76.01, notReadyPercent: 22.41, absenceSum: 36, tardiesSum: 52, caseAvg: 379, qi_avg: 92.5 },
    { month: "Apr-24", answeredCallPercent: 75.77, notReadyPercent: 25.61, absenceSum: 43, tardiesSum: 83, caseAvg: 407, qi_avg: 91.89 },
    { month: "May-24", answeredCallPercent: 77.11, notReadyPercent: 22.89, absenceSum: 35, tardiesSum: 63, caseAvg: 382, qi_avg: 90.16 },
    { month: "Jun-24", answeredCallPercent: 76.5, notReadyPercent: 22.31, absenceSum: 39, tardiesSum: 66, caseAvg: 364, qi_avg: 91.27 },
    { month: "Jul-24", answeredCallPercent: 87.75, notReadyPercent: 25.25, absenceSum: 38, tardiesSum: 104, caseAvg: 381, qi_avg: 92.20 },
    { month: "Aug-24", answeredCallPercent: 86.56, notReadyPercent: 27.16, absenceSum: 24, tardiesSum: 40, caseAvg: 396, qi_avg: 91.07 },
    { month: "Sep-24", answeredCallPercent: 83.61, notReadyPercent: 27.64, absenceSum: 37, tardiesSum: 46, caseAvg: 391, qi_avg: 92.85 },
    { month: "Oct-24", answeredCallPercent: 87.22, notReadyPercent: 27, absenceSum: 36, tardiesSum: 90, caseAvg: 400, qi_avg: 93.54 },
    { month: "Nov-24", answeredCallPercent: 88.08, notReadyPercent: 26.98, absenceSum: 27, tardiesSum: 68, caseAvg: 391, qi_avg: 94.33 },
    { month: "Dec-24", answeredCallPercent: 86.02, notReadyPercent: 29.83, absenceSum: 38, tardiesSum: 71, caseAvg: 457, qi_avg: 95.30 },
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
export function MainOverviewChart() {
    const [barActiveChart, setBarActiveChart] =
        useState<keyof typeof barChartConfig>("cases")
    const [barChartData, setBarChartData] = useState<any[]>([])
    const [chartKey, setChartKey] = useState(0); // Key for chart remounting
    // Changes depending on if it's first 4 metrics or cases data displayed. 
    const [barChartActive, setBarChartActive] = useState(false)
    // Update active chart and trigger chart remount
    const handleChartSwitch = (chartType: any) => {
        setActiveChart(chartType);
        setChartKey((prevKey) => prevKey + 1); // Change key to force remount
    };
    const [activeChart, setActiveChart] =
        useState<keyof typeof chartConfig>("answeredCallPercent")

    // const total = useMemo(
    //     () => ({
    //         answeredCallPercent: average_data.reduce((acc, curr) => acc + curr.answeredCallPercent, 0),
    //         notReadyPercent: average_data.reduce((acc, curr) => acc + curr.notReadyPercent, 0),
    //         absenceSum: average_data.reduce((acc, curr) => acc + curr.absenceSum, 0),
    //         tardiesSum: average_data.reduce((acc, curr) => acc + curr.tardiesSum, 0),
    //         qi_avg: average_data.reduce((acc, curr) => acc + curr.qi_avg, 0),
    //         caseAvg: 401
    //     }),
    //     []
    // )
    // Function determines y axis bounds so incremental changes in data is noticeable.
    const determneYAxis = () => {
        if (activeChart == "answeredCallPercent") {
            return [70, 90]
        } else if (activeChart == "notReadyPercent") {
            return [19, 30]
        } else if (activeChart == "absenceSum") {
            return [20, 50]
        } else if (activeChart == "qi_avg") {
            return [90, 96]
        }
        else {
            return [30, 110]
        }
    }
    // Linear area charts used for call percentages to easily identify increase/decrease in metrics month by month
    const determineGraphAreaType = () => {
        if (activeChart == "answeredCallPercent" || activeChart == "notReadyPercent") {
            return "linear"
        } else {
            return "natural"
        }
    }
    const determineDataSubset = () => {
        if (activeChart == "qi_avg") {
            return average_data.slice(3)
        } else {
            return average_data
        }
    }
    // Upon launch, we grab our case census data.
    useEffect(() => {
        fetch("/data/case_census.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to fetch case census data!")
                }
                return response.json()
            })
            .then((jsonData) => setBarChartData(jsonData))
            .catch((error) => console.log("Unable to fetch JSON data"))
    }, [])
    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                {barChartActive ? (
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardTitle>
                            Case Census Through 2024
                        </CardTitle>
                        <CardDescription>
                            Categorized by month, from Jan-2024 to Dec-2024. Click a tab to switch insights.
                        </CardDescription>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                            {activeChart == "answeredCallPercent" ? (
                                <>
                                    <CardTitle>
                                        Answered Call Averages Through 2024
                                    </CardTitle>
                                    <CardDescription>
                                        Categorized by month. Select a tab to switch insights.
                                    </CardDescription>
                                </>
                            ) : (activeChart == "tardiesSum") ? (
                                <>
                                    <CardTitle>
                                        Tardies Through 2024
                                    </CardTitle>
                                    <CardDescription>
                                        Sum of all tardies. Select a tab to switch insights.
                                    </CardDescription>
                                </>
                            ) : (activeChart == "absenceSum") ? (
                                <>
                                    <CardTitle>
                                        Absences Through 2024
                                    </CardTitle>
                                    <CardDescription>
                                        Sum of all absences. Select a tab to switch insights.
                                    </CardDescription>
                                </>
                            ) : (activeChart == "qi_avg") ? (
                                <>
                                    <CardTitle>
                                        QI Averages
                                    </CardTitle>
                                    <CardDescription>
                                        Average QI Scores. Select a tab to switch insights.
                                    </CardDescription>
                                </>
                            ) : (
                                <>
                                    <CardTitle>
                                        Not Ready % Averages Through 2024
                                    </CardTitle>
                                    <CardDescription>
                                        Categorized by month. Select a tab to switch insights.
                                    </CardDescription>
                                </>
                            )}
                        </div>
                    </>
                )}
                {/* These buttons serve as a chart navbar to toggle between metrics. */}
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
                    <button
                        data-active={activeChart === "tardiesSum"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                        onClick={() => {
                            setBarChartActive(false)
                            setActiveChart("tardiesSum")
                            handleChartSwitch("tardiesSum")
                        }}
                    >
                        <span className="text-xs text-muted-foreground">
                            Tardies
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            89
                        </span>
                    </button>
                    <button
                        data-active={activeChart === "absenceSum"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                        onClick={() => {
                            setBarChartActive(false)
                            setActiveChart("absenceSum")
                            handleChartSwitch("absenceSum")
                        }}
                    >
                        <span className="text-xs text-muted-foreground">
                            Absences
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            37
                        </span>
                    </button>
                    <button
                        data-active={barChartActive === true}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                        onClick={() => {
                            setBarChartActive(true)
                            setActiveChart("caseAvg")
                            handleChartSwitch("caseAvg")
                        }}
                    >
                        <span className="text-xs text-muted-foreground">
                            Cases
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            400
                        </span>
                    </button>
                    <button
                        data-active={activeChart === "qi_avg"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                        onClick={() => {
                            setBarChartActive(false)
                            setActiveChart("qi_avg")
                            handleChartSwitch("qi_avg")
                        }}
                    >
                        <span className="text-xs text-muted-foreground">
                            QI
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            92.5
                        </span>
                    </button>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                {barChartActive ? (
                    <ChartContainer
                        config={barChartConfig}
                        className="aspect-auto h-[250px] w-full"
                        key={chartKey}
                    >
                        <BarChart
                            accessibilityLayer
                            data={barChartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }}
                            />
                            <YAxis
                                domain={[290, 620]} // Set the range for the Y-axis
                                tickMargin={8}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        className="w-[150px]"
                                        nameKey="views"
                                        labelFormatter={(value) => {
                                            return new Date(value).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })
                                        }}
                                    />
                                }
                            />
                            <Bar dataKey={barActiveChart} fill={`var(--color-${barActiveChart})`} />
                        </BarChart>
                    </ChartContainer>
                ) : (
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
                )}
            </CardContent>
        </Card>
    )
}
