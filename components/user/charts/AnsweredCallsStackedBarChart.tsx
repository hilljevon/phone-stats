"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, ReferenceLine, XAxis } from "recharts"

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
import { organizeBarChartData } from "@/lib/helpers"

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

export function AnsweredCallsStackedBarChart() {
    const [sliderValue, setSliderValue] = useState(60); // I
    const handleSliderChange = (value: number[]) => {
        setSliderValue(value[0]); // Update slider value
    };
    organizeBarChartData()
    return (
        <Card>
            <CardHeader>
                <CardTitle>Answered Calls</CardTitle>
                <CardDescription> Trending up by 5.2% this month <TrendingUp className="inline h-4 w-4" /></CardDescription>
            </CardHeader>
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
                        />
                        <Bar
                            dataKey="middle"
                            stackId="a"
                            fill="#f6b26b"
                            radius={[0, 0, 0, 0]}
                        />
                        <Bar
                            dataKey="above"
                            stackId="a"
                            fill="#89b5b4"
                            radius={[4, 4, 0, 0]}
                        />
                        <ReferenceLine className="font-bold m-4" y={sliderValue} stroke="red" strokeWidth={2} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Target: <span className="text-red-500 font-bold">{sliderValue}</span>
                </div>
                <div className="leading-none text-muted-foreground">
                    Adjust slider below for target % goal.
                </div>
            </CardFooter>
            <Slider
                value={[sliderValue]}
                defaultValue={[sliderValue]}
                max={80}
                step={1}
                onValueChange={handleSliderChange}
            />

        </Card>

    )
}
