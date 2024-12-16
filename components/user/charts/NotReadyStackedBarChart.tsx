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
    }
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

export function NotReadyStackedBarChart() {
    const [sliderValue, setSliderValue] = useState(60); // I
    const handleSliderChange = (value: number[]) => {
        setSliderValue(value[0]); // Update slider value
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Not Ready Times</CardTitle>
                <CardDescription> Trending up by 5.2% this month <TrendingUp className="inline h-4 w-4" /></CardDescription>
            </CardHeader>
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
                        <ChartLegend content={<ChartLegendContent />} />
                        {/* <ReferenceLine className="font-bold m-4" y={sliderValue} stroke="red" strokeWidth={2} /> */}
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                {/* <div className="flex gap-2 font-medium leading-none">
                    Target: <span className="text-red-500 font-bold">{sliderValue}</span>
                </div>
                <div className="leading-none text-muted-foreground">
                    Adjust slider below for target % goal.
                </div> */}
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
