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
const barChartData = [
    { date: "2024-04-01", desktop: 222, mobile: 150 },
    { date: "2024-04-02", desktop: 97, mobile: 180 },
    { date: "2024-04-03", desktop: 167, mobile: 120 },
    { date: "2024-04-04", desktop: 242, mobile: 260 },
    { date: "2024-04-05", desktop: 373, mobile: 290 },
    { date: "2024-04-06", desktop: 301, mobile: 340 },
    { date: "2024-04-07", desktop: 245, mobile: 180 },
    { date: "2024-04-08", desktop: 409, mobile: 320 },
    { date: "2024-04-09", desktop: 59, mobile: 110 },
    { date: "2024-04-10", desktop: 261, mobile: 190 },
    { date: "2024-04-11", desktop: 327, mobile: 350 },
    { date: "2024-04-12", desktop: 292, mobile: 210 },
    { date: "2024-04-13", desktop: 342, mobile: 380 },
    { date: "2024-04-14", desktop: 137, mobile: 220 },
    { date: "2024-04-15", desktop: 120, mobile: 170 },
    { date: "2024-04-16", desktop: 138, mobile: 190 },
    { date: "2024-04-17", desktop: 446, mobile: 360 },
    { date: "2024-04-18", desktop: 364, mobile: 410 },
    { date: "2024-04-19", desktop: 243, mobile: 180 },
    { date: "2024-04-20", desktop: 89, mobile: 150 },
    { date: "2024-04-21", desktop: 137, mobile: 200 },
    { date: "2024-04-22", desktop: 224, mobile: 170 },
    { date: "2024-04-23", desktop: 138, mobile: 230 },
    { date: "2024-04-24", desktop: 387, mobile: 290 },
    { date: "2024-04-25", desktop: 215, mobile: 250 },
    { date: "2024-04-26", desktop: 75, mobile: 130 },
    { date: "2024-04-27", desktop: 383, mobile: 420 },
    { date: "2024-04-28", desktop: 122, mobile: 180 },
    { date: "2024-04-29", desktop: 315, mobile: 240 },
    { date: "2024-04-30", desktop: 454, mobile: 380 },
    { date: "2024-05-01", desktop: 165, mobile: 220 },
    { date: "2024-05-02", desktop: 293, mobile: 310 },
    { date: "2024-05-03", desktop: 247, mobile: 190 },
    { date: "2024-05-04", desktop: 385, mobile: 420 },
    { date: "2024-05-05", desktop: 481, mobile: 390 },
    { date: "2024-05-06", desktop: 498, mobile: 520 },
    { date: "2024-05-07", desktop: 388, mobile: 300 },
    { date: "2024-05-08", desktop: 149, mobile: 210 },
    { date: "2024-05-09", desktop: 227, mobile: 180 },
    { date: "2024-05-10", desktop: 293, mobile: 330 },
    { date: "2024-05-11", desktop: 335, mobile: 270 },
    { date: "2024-05-12", desktop: 197, mobile: 240 },
    { date: "2024-05-13", desktop: 197, mobile: 160 },
    { date: "2024-05-14", desktop: 448, mobile: 490 },
    { date: "2024-05-15", desktop: 473, mobile: 380 },
    { date: "2024-05-16", desktop: 338, mobile: 400 },
    { date: "2024-05-17", desktop: 499, mobile: 420 },
    { date: "2024-05-18", desktop: 315, mobile: 350 },
    { date: "2024-05-19", desktop: 235, mobile: 180 },
    { date: "2024-05-20", desktop: 177, mobile: 230 },
    { date: "2024-05-21", desktop: 82, mobile: 140 },
    { date: "2024-05-22", desktop: 81, mobile: 120 },
    { date: "2024-05-23", desktop: 252, mobile: 290 },
    { date: "2024-05-24", desktop: 294, mobile: 220 },
    { date: "2024-05-25", desktop: 201, mobile: 250 },
    { date: "2024-05-26", desktop: 213, mobile: 170 },
    { date: "2024-05-27", desktop: 420, mobile: 460 },
    { date: "2024-05-28", desktop: 233, mobile: 190 },
    { date: "2024-05-29", desktop: 78, mobile: 130 },
    { date: "2024-05-30", desktop: 340, mobile: 280 },
    { date: "2024-05-31", desktop: 178, mobile: 230 },
    { date: "2024-06-01", desktop: 178, mobile: 200 },
    { date: "2024-06-02", desktop: 470, mobile: 410 },
    { date: "2024-06-03", desktop: 103, mobile: 160 },
    { date: "2024-06-04", desktop: 439, mobile: 380 },
    { date: "2024-06-05", desktop: 88, mobile: 140 },
    { date: "2024-06-06", desktop: 294, mobile: 250 },
    { date: "2024-06-07", desktop: 323, mobile: 370 },
    { date: "2024-06-08", desktop: 385, mobile: 320 },
    { date: "2024-06-09", desktop: 438, mobile: 480 },
    { date: "2024-06-10", desktop: 155, mobile: 200 },
    { date: "2024-06-11", desktop: 92, mobile: 150 },
    { date: "2024-06-12", desktop: 492, mobile: 420 },
    { date: "2024-06-13", desktop: 81, mobile: 130 },
    { date: "2024-06-14", desktop: 426, mobile: 380 },
    { date: "2024-06-15", desktop: 307, mobile: 350 },
    { date: "2024-06-16", desktop: 371, mobile: 310 },
    { date: "2024-06-17", desktop: 475, mobile: 520 },
    { date: "2024-06-18", desktop: 107, mobile: 170 },
    { date: "2024-06-19", desktop: 341, mobile: 290 },
    { date: "2024-06-20", desktop: 408, mobile: 450 },
    { date: "2024-06-21", desktop: 169, mobile: 210 },
    { date: "2024-06-22", desktop: 317, mobile: 270 },
    { date: "2024-06-23", desktop: 480, mobile: 530 },
    { date: "2024-06-24", desktop: 132, mobile: 180 },
    { date: "2024-06-25", desktop: 141, mobile: 190 },
    { date: "2024-06-26", desktop: 434, mobile: 380 },
    { date: "2024-06-27", desktop: 448, mobile: 490 },
    { date: "2024-06-28", desktop: 149, mobile: 200 },
    { date: "2024-06-29", desktop: 103, mobile: 160 },
    { date: "2024-06-30", desktop: 446, mobile: 400 },
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
export function PhoneOverviewChart() {
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
                {barChartActive ? (
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardTitle>
                            Case Census Through 2024
                        </CardTitle>
                        <CardDescription>
                            Categorized by month, from Jan-2024 to Oct-2024
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
                )}

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
                            data={barChartData2}
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
