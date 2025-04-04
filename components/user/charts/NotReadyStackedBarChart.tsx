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

export const notReadyCategorized = [
    {
        "month": "Jan-24",
        "below": 10,
        "middle": 19,
        "above": 51,
    },
    {
        "month": "Feb-24",
        "below": 4,
        "middle": 15,
        "above": 61
    },
    {
        "month": "Mar-24",
        "below": 4,
        "middle": 14,
        "above": 62
    },
    {
        "month": "Apr-24",
        "below": 9,
        "middle": 20,
        "above": 51
    },
    {
        "month": "May-24",
        "below": 2,
        "middle": 21,
        "above": 57
    },
    {
        "month": "Jun-24",
        "below": 5,
        "middle": 16,
        "above": 59
    },
    {
        "month": "Jul-24",
        "below": 6,
        "middle": 19,
        "above": 55
    },
    {
        "month": "Aug-24",
        "below": 8,
        "middle": 22,
        "above": 50
    },
    {
        "month": "Sep-24",
        "below": 15,
        "middle": 22,
        "above": 43
    },
    {
        "month": "Oct-24",
        "below": 13,
        "middle": 25,
        "above": 42
    },
    {
        "month": "Nov-24",
        "below": 13,
        "middle": 19,
        "above": 49
    },
    {
        "month": "Dec-24",
        "below": 15,
        "middle": 26,
        "above": 40
    },

]
const chartConfig = {
    above: {
        label: "Above",
        color: "hsl(var(--chart-3))",
    },
    below: {
        label: "Below",
        color: "hsl(var(--chart-1))",
    },
    middle: {
        label: "Middle",
        color: "hsl(var(--chart-2))",
    },

} satisfies ChartConfig

// Stacked Bar Interface
interface StackedBarChartInterface {
    month: string,
    below: number,
    middle: number,
    above: number
}
interface NotReadyAnalyticsInterface {
    differenceInAbovePercent: number,
    differenceInBelowPercent: number,
    differenceInMidPercent: number
}
// These averages are # of individuals that fall in this tier this year.
const belowPercentAverageNR = 7.6
const midPercentAverageNR = 19.3
const abovePercentAverageNR = 53.1
export function NotReadyStackedBarChart() {
    const [sliderValue, setSliderValue] = useState(60);
    const [activeBarIndex, setActiveBarIndex] = useState<number | undefined>(undefined)
    const [notReadyAnalytics, setNotReadyAnalytics] = useState<NotReadyAnalyticsInterface | null>(null)
    const [currentData, setCurrentData] = useState<StackedBarChartInterface | undefined>(undefined)
    const handleSliderChange = (value: number[]) => {
        setSliderValue(value[0]); // Update slider value
    };
    const handleBarClick = (data: StackedBarChartInterface, idx: number) => {
        setActiveBarIndex(idx)
        setCurrentData(notReadyCategorized[idx])
        const analytics = handleBarClickAnalytics(data, idx, "notReady")
        setNotReadyAnalytics(analytics)
    }
    useEffect(() => {
        const getStats = async () => {
            await organizeBarChartData()
        }
        getStats()
    }, [])
    return (
        <Card>
            {currentData == undefined ? (
                <CardHeader>
                    <CardTitle>
                        Not Ready Times
                    </CardTitle>
                    <CardDescription>
                        Filtering all employees according to not ready metric standards. See below for performance threshold. Double click a month to view analytics
                    </CardDescription>
                </CardHeader>
            ) : (
                <CardHeader>
                    {notReadyAnalytics && (
                        <>
                            <CardTitle>
                                Not Ready Times - {currentData.month}
                            </CardTitle>
                            {(currentData.above - abovePercentAverageNR) > 0 ? (
                                <CardDescription>
                                    <span className="text-green-500 text-sm"> Trending up {Math.floor(currentData.above - abovePercentAverageNR)}% this month <TrendingUp className="inline h-4 w-4" /> </span><span className="text-xs from-neutral-200"> *based on total # above average.</span>
                                </CardDescription>
                            ) : (
                                <CardDescription className="text-red-500">
                                    Trending down {Math.floor(currentData.above - abovePercentAverageNR)}% this month <TrendingDown className="inline h-4 w-4" /><span className="text-xs from-neutral-200"> *based on total # above average.</span>
                                </CardDescription>
                            )}

                        </>
                    )}
                </CardHeader>
            )}
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={notReadyCategorized}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
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
                        <ChartLegend content={<ChartLegendContent />} />
                        {/* <ReferenceLine className="font-bold m-4" y={sliderValue} stroke="red" strokeWidth={2} /> */}
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                {notReadyAnalytics != null ? (
                    <>
                        {/* <div className="flex gap-2 font-medium leading-none">
                            Data
                        </div> */}
                        <div className="leading-none text-muted-foreground">
                            Compared to the previous month, there is a <span className="text-green-600">
                                {Math.floor(notReadyAnalytics.differenceInAbovePercent)}% change for not ready % above average</span>,<span className="text-orange-500"> {Math.floor(notReadyAnalytics.differenceInMidPercent)}% change for average count</span>, and <span className="text-red-600">{Math.floor(notReadyAnalytics.differenceInBelowPercent)}% change in those below average</span>.
                        </div>
                        <div className="flex gap-2 leading-none font-bold border-t w-full pt-3">
                            Benchmarks:
                        </div>
                        <hr />
                        <div className="leading-none text-muted-foreground font-semibold">
                            Above Average: <span className="text-green-700 underline">25% and below</span>. Average: <span className="text-yellow-600 underline">26% - 39%</span> . Below Average: <span className="text-red-600 underline">40% and above</span>.
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex gap-2 leading-none font-bold">
                            Benchmarks:
                        </div>
                        <hr />
                        <div className="leading-none text-muted-foreground font-semibold">
                            Above Average: <span className="text-green-700 underline">25% and below</span>. Average: <span className="text-yellow-600 underline">26% - 39%</span> . Below Average: <span className="text-red-600 underline">40% and above</span>.
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
