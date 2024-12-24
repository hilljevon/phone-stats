"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { EmployeeType } from "../EmployeeTable/EmployeeColumns"
import { handleEmployeeData } from "@/lib/helpers"
const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    "Answered Call %": {
        label: "Answer Rate",
        color: "#0b3068",
    },
    "Not Ready %": {
        label: "Not Ready",
        color: "#cc0000",
    },
} satisfies ChartConfig

export function EmployeeMultiBarChart({ currentData }: { currentData: EmployeeType }) {
    const data = handleEmployeeData(currentData)
    console.log("My data here", data)
    return (
        <Card>
            <CardHeader>
                <CardTitle>Phone Stats</CardTitle>
                <CardDescription>January - October 2024</CardDescription>
            </CardHeader>
            {data && (
                <>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <BarChart accessibilityLayer data={data}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dashed" />}
                                />
                                <Bar dataKey="Answered Call %" fill="#0b3068" radius={4} />
                                <Bar dataKey="Not Ready %" fill="#cc0000" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        {/* <div className="flex gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Showing total visitors for the last 6 months
                        </div> */}
                    </CardFooter>
                </>
            )}
        </Card>
    )
}
