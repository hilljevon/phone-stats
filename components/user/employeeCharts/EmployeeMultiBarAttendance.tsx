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
import { handleEmployeeAttendance, handleEmployeeData } from "@/lib/helpers"
const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    "Tardies": {
        label: "Tardies",
        color: "#ffc300",
    },
    "Absences": {
        label: "Absences",
        color: "#dc3545",
    },
} satisfies ChartConfig

export function EmployeeMultiBarAttendance({ currentData }: { currentData: EmployeeType }) {
    const data = handleEmployeeAttendance(currentData)
    return (
        <Card>
            <CardHeader>
                <CardTitle>Attendance Stats</CardTitle>
                <CardDescription>
                    <span className="text-[#ffc300] font-semibold">Tardies </span> and <span className="text-[#dc3545] font-bold">Absences</span>
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
                                    domain={[0, 8]}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dashed" />}
                                />
                                <Bar dataKey="Tardies" fill="	#ffc300" radius={4} />
                                <Bar dataKey="Absences" fill="#dc3545" radius={4} />
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
