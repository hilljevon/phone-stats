"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
const chartData = [
    { date: "2024-01-01", desktop: 200, mobile: 130 },
    { date: "2024-02-01", desktop: 250, mobile: 180 },
    { date: "2024-03-01", desktop: 190, mobile: 122 },
    { date: "2024-04-01", desktop: 133, mobile: 97 },
    { date: "2024-05-01", desktop: 180, mobile: 110 },
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
const average_data = [
    { month: "Jan-24", answeredCallPercent: 74.67, notReadyPercent: 27.16, absenceSum: 23, tardiesSum: 71 },
    { month: "Feb-24", answeredCallPercent: 73.72, notReadyPercent: 22.61, absenceSum: 31, tardiesSum: 87 },
    { month: "Mar-24", answeredCallPercent: 76.01, notReadyPercent: 22.41, absenceSum: 36, tardiesSum: 52 },
    { month: "Apr-24", answeredCallPercent: 75.77, notReadyPercent: 25.61, absenceSum: 43, tardiesSum: 83 },
    { month: "May-24", answeredCallPercent: 77.11, notReadyPercent: 22.89, absenceSum: 35, tardiesSum: 63 },
    { month: "Jun-24", answeredCallPercent: 76.5, notReadyPercent: 22.31, absenceSum: 39, tardiesSum: 66 },
    { month: "Jul-24", answeredCallPercent: 87.75, notReadyPercent: 25.25, absenceSum: 38, tardiesSum: 104 },
    { month: "Aug-24", answeredCallPercent: 86.56, notReadyPercent: 27.16, absenceSum: 24, tardiesSum: 40 },
    { month: "Sep-24", answeredCallPercent: 83.61, notReadyPercent: 27.64, absenceSum: 37, tardiesSum: 46 },
    { month: "Oct-24", answeredCallPercent: 87.22, notReadyPercent: 27, absenceSum: 36, tardiesSum: 90 },
]
const metricCategories = ["answeredCallPercent", "month", "notReadyPercent", "absenceSum", "tardiesSum"]

const chartConfig2 = {
    visitors: {
        label: "Cases",
    },
    cases: {
        label: "Cases",
        color: "#03a9f4",
    },
}
interface CaseCensusInterface {
    date: string,
    cases: number
}
export function CaseCensusStackedArea() {
    const [initialData, setInitialData] = useState<CaseCensusInterface[] | null>(null)
    const [timeRange, setTimeRange] = useState("0")
    const [filteredData, setFilteredData] = useState<any[]>(average_data)
    const handleFilteredData = () => {
        if (initialData) {
            if (timeRange == "0") {
                setFilteredData(initialData)
            } else if (timeRange == "1") {
                setFilteredData(initialData.slice(121))
            } else {
                setFilteredData(initialData.slice(213))
            }
        }
    }
    useEffect(() => {
        handleFilteredData()
    }, [timeRange])
    useEffect(() => {
        fetch("/data/case_census.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to fetch case census data!")
                }
                return response.json()
            })
            .then((jsonData) => {
                setInitialData(jsonData)
                setFilteredData(jsonData)
            })
            .catch((error) => console.log("Unable to fetch JSON data"))
    }, [])

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Case Census</CardTitle>
                    <CardDescription>
                        <span className="text-[#03a9f4] font-semibold"> Cases </span> through 2024
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="0" className="rounded-lg">
                            Yearly
                        </SelectItem>
                        <SelectItem value="1" className="rounded-lg">
                            Last 6 Months
                        </SelectItem>
                        <SelectItem value="2" className="rounded-lg">
                            Last 3 Months
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig2}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillcases" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-cases)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-cases)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillcases" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-cases)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-cases)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <YAxis
                            domain={[0, 615]} // Set the min and max values here
                            tickCount={6} // Adjust the number of ticks
                            dataKey={"tardiesSum"}
                        />
                        {/* LOG Y VALUES ARE USED TO MORE APPROPRIATELY SEE CHANGE IN VALUES */}
                        {/* <YAxis
                            scale="log"
                            domain={[20, 160]}
                            allowDataOverflow={true}
                        /> */}
                        <XAxis
                            dataKey="date"
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                // const date = new Date(value)
                                // return date.toLocaleDateString("en-US", {
                                //     month: "short",
                                //     day: "numeric",
                                // })
                                return value
                            }}
                        />


                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        // return new Date(value).toLocaleDateString("en-US", {
                                        //     month: "short",
                                        //     day: "numeric",
                                        // })
                                        return value
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="cases"
                            type="natural"
                            fill="url(#fillcases)"
                            stroke="var(--color-cases)"
                            stackId="a"
                        />
                        {/* <Area
                            dataKey="tardiesSum"
                            type="natural"
                            fill="url(#filltardiesSum)"
                            stroke="var(--color-tardiesSum)"
                            stackId="a"
                        /> */}

                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
