"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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


const chartConfig = {
    "Answered Call %": {
        label: "Answer",
        color: "#0b3068",
    },
    "Not Ready %": {
        label: "NR",
        color: "	#500303",
    },
} satisfies ChartConfig

export function EmployeeMultiBarChart({ currentData }: { currentData: EmployeeType }) {
    const data = handleEmployeeData(currentData)
    return (
        <Card>
            <CardHeader>
                <CardTitle>Phone Stats</CardTitle>
                <CardDescription>
                    <span className="text-[#0b3068] font-semibold">Answered Call % </span> and <span className="text-[#500303] font-semibold">Not Ready %</span>
                </CardDescription>
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
                                <YAxis
                                    tickLine={true}
                                    tickCount={6} // Adjust the number of ticks
                                    domain={[0, 100]}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dashed" />}
                                />
                                <Bar dataKey="Answered Call %" fill="#0b3068" radius={4} />
                                <Bar dataKey="Not Ready %" fill="	#500303" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                    </CardFooter>
                </>
            )}
        </Card>
    )
}
