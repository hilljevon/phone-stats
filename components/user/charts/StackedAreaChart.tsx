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
// const dataCards = [
//     {
//         title: "Tardies Ranked",
//         rank1: "August",
//         rank2: "September",
//         rank3: 
//     }
// ]
const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    absenceSum: {
        label: "Absences",
        color: "hsl(var(--chart-1))",
    },
    tardiesSum: {
        label: "Tardies",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig
const sortedAnswerCallsAvg = {
    title: "Top Answered Call % By Month",
    months: [
        {
            month: 'Jul-24',
            data: 87.75,

        },
        {
            month: 'Oct-24',
            data: 87.22,
        },
        {
            month: 'Aug-24',
            data: 86.56,
        },
        {
            month: 'Sep-24',
            data: 83.61,
        },
        {
            month: 'May-24',
            data: 77.11,
        },
        {
            month: 'Jun-24',
            data: 76.5,
        },
        {
            month: 'Mar-24',
            data: 76.01,
        },
        {
            month: 'Apr-24',
            data: 75.77,
        },
        {
            month: 'Jan-24',
            data: 74.67,
        },
        {
            month: 'Feb-24',
            data: 73.72,
        }
    ]
}
const sortedNotReadyAvg = {
    title: "Lowest Not Ready % By Month",
    months: [
        {
            month: 'Jun-24',
            data: 22.31,

        },
        {
            month: 'Mar-24',
            data: 22.41,

        },
        {
            month: 'Feb-24',
            data: 22.61,

        },
        {
            month: 'May-24',

            data: 22.89,

        },
        {
            month: 'Jul-24',
            data: 25.25,
        },
        {
            month: 'Apr-24',
            data: 25.61,
        },
        {
            month: 'Oct-24',
            data: 27,
        },
        {
            month: 'Jan-24',
            data: 27.16,
        },
        {
            month: 'Aug-24',
            data: 27.16,
        },
        {
            month: 'Sep-24',
            data: 27.64,
        }
    ]
}
const sortedAbsencesAvg = {
    title: "Least Absences By Month",
    months: [
        {
            month: 'Jan-24',
            data: 23,

        },
        {
            month: 'Aug-24',
            data: 24,

        },
        {
            month: 'Feb-24',
            data: 31,

        },
        {
            month: 'May-24',
            data: 35,

        },
        {
            month: 'Mar-24',
            data: 36,

        },
        {
            month: 'Oct-24',
            data: 36,

        },
        {
            month: 'Sep-24',

            data: 37,

        },
        {
            month: 'Jul-24',
            data: 38,
        },
        {
            month: 'Jun-24',
            data: 39,

        },
        {
            month: 'Apr-24',
            data: 43,

        }
    ]
}
const sortedTardiesAvg = {
    title: "Least Tardies By Month",
    months: [
        {
            month: 'Aug-24',
            data: 40
        },
        {
            month: 'Sep-24',
            data: 46
        },
        {
            month: 'Mar-24',
            data: 52
        },
        {
            month: 'May-24',
            data: 63
        },
        {
            month: 'Jun-24',
            data: 66
        },
        {
            month: 'Jan-24',
            data: 71
        },
        {
            month: 'Apr-24',
            data: 83
        },
        {
            month: 'Feb-24',
            data: 87
        },
        {
            month: 'Oct-24',
            data: 90
        },
        {
            month: 'Jul-24',
            data: 104
        }

    ]
}
const allCards = [
    {
        title: "Top Answered Call % By Month",
        months: [
            {
                month: 'Jul-24',
                data: 87.75,

            },
            {
                month: 'Oct-24',
                data: 87.22,
            },
            {
                month: 'Aug-24',
                data: 86.56,
            },
            {
                month: 'Sep-24',
                data: 83.61,
            },
            {
                month: 'May-24',
                data: 77.11,
            },
            {
                month: 'Jun-24',
                data: 76.5,
            },
            {
                month: 'Mar-24',
                data: 76.01,
            },
            {
                month: 'Apr-24',
                data: 75.77,
            },
            {
                month: 'Jan-24',
                data: 74.67,
            },
            {
                month: 'Feb-24',
                data: 73.72,
            }
        ]
    },
    {
        title: "Lowest Not Ready % By Month",
        months: [
            {
                month: 'Jun-24',
                data: 22.31,

            },
            {
                month: 'Mar-24',
                data: 22.41,

            },
            {
                month: 'Feb-24',
                data: 22.61,

            },
            {
                month: 'May-24',

                data: 22.89,

            },
            {
                month: 'Jul-24',
                data: 25.25,
            },
            {
                month: 'Apr-24',
                data: 25.61,
            },
            {
                month: 'Oct-24',
                data: 27,
            },
            {
                month: 'Jan-24',
                data: 27.16,
            },
            {
                month: 'Aug-24',
                data: 27.16,
            },
            {
                month: 'Sep-24',
                data: 27.64,
            }
        ]
    },
    {
        title: "Least Absences By Month",
        months: [
            {
                month: 'Jan-24',
                data: 23,

            },
            {
                month: 'Aug-24',
                data: 24,

            },
            {
                month: 'Feb-24',
                data: 31,

            },
            {
                month: 'May-24',
                data: 35,

            },
            {
                month: 'Mar-24',
                data: 36,

            },
            {
                month: 'Oct-24',
                data: 36,

            },
            {
                month: 'Sep-24',

                data: 37,

            },
            {
                month: 'Jul-24',
                data: 38,
            },
            {
                month: 'Jun-24',
                data: 39,

            },
            {
                month: 'Apr-24',
                data: 43,

            }
        ]
    },
    {
        title: "Least Tardies By Month",
        months: [
            {
                month: 'Aug-24',
                data: 40
            },
            {
                month: 'Sep-24',
                data: 46
            },
            {
                month: 'Mar-24',
                data: 52
            },
            {
                month: 'May-24',
                data: 63
            },
            {
                month: 'Jun-24',
                data: 66
            },
            {
                month: 'Jan-24',
                data: 71
            },
            {
                month: 'Apr-24',
                data: 83
            },
            {
                month: 'Feb-24',
                data: 87
            },
            {
                month: 'Oct-24',
                data: 90
            },
            {
                month: 'Jul-24',
                data: 104
            }

        ]
    }
]
export function StackedAreaChart() {
    const [timeRange, setTimeRange] = useState("0")
    const [filteredData, setFilteredData] = useState<any[]>(average_data)
    const handleFilteredData = () => {
        if (timeRange == "0") {
            setFilteredData(average_data)
        } else if (timeRange == "1") {
            setFilteredData(average_data.slice(4))
        } else {
            setFilteredData(average_data.slice(7))
        }
    }
    useEffect(() => {
        handleFilteredData()
    }, [timeRange])
    const sortedByAnsweredCallPercent = [...average_data].sort((a, b) => a.answeredCallPercent - b.answeredCallPercent);
    const sortedByNotReadyPercent = [...average_data].sort((a, b) => a.notReadyPercent - b.notReadyPercent);
    const sortedByAbsenceSum = [...average_data].sort((a, b) => a.absenceSum - b.absenceSum);
    const sortedByTardiesSum = [...average_data].sort((a, b) => a.tardiesSum - b.tardiesSum);
    console.log("Sorted here", sortedByAnsweredCallPercent.reverse())
    console.log("Sorted by not ready", sortedByNotReadyPercent)
    console.log("Sorted by absences", sortedByAbsenceSum)
    console.log("Sorted by tardies", sortedByTardiesSum)

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Attendance</CardTitle>
                    <CardDescription>
                        <span className="text-green-600 font-semibold">Tardies </span> and <span className="text-orange-600 font-semibold"> Absences </span> through 2024
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
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillabsenceSum" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-absenceSum)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-absenceSum)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="filltardiesSum" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-tardiesSum)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-tardiesSum)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        {/* <YAxis
                            domain={[0, 150]} // Set the min and max values here
                            tickCount={6} // Adjust the number of ticks
                            dataKey={"tardiesSum"}
                        /> */}
                        {/* LOG Y VALUES ARE USED TO MORE APPROPRIATELY SEE CHANGE IN VALUES */}
                        <YAxis
                            scale="log"
                            domain={[20, 160]}
                            allowDataOverflow={true}
                        />
                        <XAxis
                            dataKey="month"
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
                            dataKey="absenceSum"
                            type="natural"
                            fill="url(#fillabsenceSum)"
                            stroke="var(--color-absenceSum)"
                            stackId="a"
                        />
                        <Area
                            dataKey="tardiesSum"
                            type="natural"
                            fill="url(#filltardiesSum)"
                            stroke="var(--color-tardiesSum)"
                            stackId="a"
                        />

                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}