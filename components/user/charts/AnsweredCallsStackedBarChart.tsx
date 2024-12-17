"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, ReferenceLine, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import { Slider } from "@/components/ui/slider"
import { useEffect, useState } from "react"
import { handleBarClickAnalytics, organizeBarChartData } from "@/lib/helpers"

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]
export const answeredCallsCategorized = [
    {
        "month": "Jan-24",
        "below": 35,
        "middle": 17,
        "above": 28
    },
    {
        "month": "Feb-24",
        "below": 40,
        "middle": 22,
        "above": 18
    },
    {
        "month": "Mar-24",
        "below": 32,
        "middle": 19,
        "above": 29
    },
    {
        "month": "Apr-24",
        "below": 32,
        "middle": 18,
        "above": 30
    },
    {
        "month": "May-24",
        "below": 33,
        "middle": 17,
        "above": 30
    },
    {
        "month": "Jun-24",
        "below": 27,
        "middle": 22,
        "above": 31
    },
    {
        "month": "Jul-24",
        "below": 12,
        "middle": 10,
        "above": 58
    },
    {
        "month": "Aug-24",
        "below": 10,
        "middle": 9,
        "above": 61
    },
    {
        "month": "Sep-24",
        "below": 13,
        "middle": 11,
        "above": 56
    },
    {
        "month": "Oct-24",
        "below": 9,
        "middle": 11,
        "above": 60
    }
]
const chartConfig = {
    below: {
        label: "Below",
        color: "hsl(var(--chart-1))",
    },
    middle: {
        label: "Middle",
        color: "hsl(var(--chart-2))",
    },
    above: {
        label: "Above",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

interface StackedBarChartInterface {
    month: string,
    below: number,
    middle: number,
    above: number
}
interface AnsweredCallsInterface {
    month: string,
    val: number
}
const abovePercentAverage = 53.1
const belowPercentAverage = 7.6
const midPercentAverage = 17.4
interface AnsweredCallAnalyticsInterface {
    differenceInAbovePercent: number,
    differenceInBelowPercent: number,
    differenceInMidPercent: number
}
export function AnsweredCallsStackedBarChart() {
    // const [sliderValue, setSliderValue] = useState(60); // 
    const [activeBarIndex, setActiveBarIndex] = useState<number | undefined>(undefined)
    const [answeredCallAnalytics, setAnsweredCallAnalytics] = useState<AnsweredCallAnalyticsInterface | null>(null)
    const [currentData, setCurrentData] = useState<StackedBarChartInterface | undefined>(undefined)
    // const handleSliderChange = (value: number[]) => {
    //     setSliderValue(value[0]); // Update slider value
    // };
    const handleBarClick = (data: StackedBarChartInterface, idx: number) => {
        setActiveBarIndex(idx)
        setCurrentData(answeredCallsCategorized[idx])
        const analytics = handleBarClickAnalytics(data, idx, "answeredCalls")
        setAnsweredCallAnalytics(analytics)
    }
    return (
        <Card>
            {currentData == undefined ? (
                <CardHeader>
                    <CardTitle>
                        Answered Calls
                    </CardTitle>
                    <CardDescription>
                        Double click a month to view analytics
                    </CardDescription>
                </CardHeader>
            ) : (
                <CardHeader>
                    {answeredCallAnalytics && (
                        <>
                            <CardTitle>
                                Answered Calls - {currentData.month}
                            </CardTitle>
                            {(currentData.above - abovePercentAverage) > 0 ? (
                                <CardDescription>
                                    <span className="text-green-500 text-sm"> Trending up {Math.floor(currentData.above - abovePercentAverage)}% this month <TrendingUp className="inline h-4 w-4" /> </span><span className="text-xs from-neutral-200"> *based on total # above average.</span>
                                </CardDescription>
                            ) : (
                                <CardDescription className="text-red-500">
                                    Trending down {Math.floor(currentData.above - abovePercentAverage)}% this month <TrendingDown className="inline h-4 w-4" />
                                </CardDescription>
                            )}

                        </>
                    )}
                </CardHeader>
            )}
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={answeredCallsCategorized}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="below"
                            stackId="a"
                            fill="#e06666"
                            radius={[0, 0, 4, 4]}
                            activeIndex={activeBarIndex}
                            onClick={(data, idx) => {
                                handleBarClick(data, idx)
                            }}
                            activeBar={({ ...props }) => {
                                return (
                                    <Rectangle
                                        {...props}
                                        fillOpacity={0.8}
                                        stroke={"#3d85c6"}
                                        strokeDasharray={4}
                                        strokeDashoffset={4}
                                        strokeWidth={2}
                                    />
                                )
                            }}
                        />
                        <Bar
                            dataKey="middle"
                            stackId="a"
                            fill="#f6b26b"
                            radius={[0, 0, 0, 0]}
                            onClick={(data, idx) => {
                                handleBarClick(data, idx)
                            }}
                            activeIndex={activeBarIndex}
                            activeBar={({ ...props }) => {
                                return (

                                    <Rectangle
                                        {...props}
                                        fillOpacity={0.8}
                                        stroke={"#3d85c6"}
                                        strokeDasharray={4}
                                        strokeDashoffset={0}
                                        strokeWidth={2}
                                    />
                                )
                            }}
                        />
                        <Bar
                            dataKey="above"
                            stackId="a"
                            fill="#89b5b4"
                            radius={[4, 4, 0, 0]}
                            onClick={(data, idx) => {
                                handleBarClick(data, idx)
                            }}
                            activeIndex={activeBarIndex}
                            activeBar={({ ...props }) => {
                                return (
                                    <Rectangle
                                        {...props}
                                        fillOpacity={0.8}
                                        stroke={"#3d85c6"}
                                        strokeDasharray={4}
                                        strokeDashoffset={4}
                                        strokeWidth={2}
                                    />
                                )
                            }}
                        />
                        {/* <ReferenceLine className="font-bold m-4" y={sliderValue} stroke="red" strokeWidth={2} /> */}
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                {answeredCallAnalytics != null ? (
                    <>
                        {/* <div className="flex gap-2 font-medium leading-none">
                            Data
                        </div> */}
                        <div className="leading-none text-muted-foreground">
                            Compared to the previous month, there is a <span className="text-green-600">
                                {Math.floor(answeredCallAnalytics.differenceInAbovePercent)}% change for answered calls above average</span>,<span> {Math.floor(answeredCallAnalytics.differenceInMidPercent)}% change for average count</span>, and <span>{Math.floor(answeredCallAnalytics.differenceInBelowPercent)}% change in those below average</span>.
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex gap-2 leading-none font-bold">
                            Benchmarks:
                        </div>
                        <div className="leading-none text-muted-foreground font-semibold">
                            Above Average: <span className="text-green-700 underline">80% and above</span>. Average: <span className="text-yellow-600 underline">70% - 79%</span> . Below Average: <span className="text-red-600 underline">69% and below</span>.
                        </div>
                    </>
                )}

            </CardFooter>
            {/* <Slider
                value={[sliderValue]}
                defaultValue={[sliderValue]}
                max={80}
                step={1}
                onValueChange={handleSliderChange}
            /> */}

        </Card>

    )
}
