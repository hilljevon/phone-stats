"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface EmployeeType {
    "Jan-24 Answered Call %": number
    "Jan-24 Not Ready %": number
    "Jan-24 Tardies": number
    "Jan-24 Absences": number
    "Feb-24 Answered Call %": number
    "Feb-24 Not Ready %": number
    "Feb-24 Tardies": number
    "Feb-24 Absences": number
    "Mar-24 Answered Call %": number
    "Mar-24 Not Ready %": number
    "Mar-24 Tardies": number
    "Mar-24 Absences": number
    "Apr-24 Answered Call %": number
    "Apr-24 Not Ready %": number
    "Apr-24 Tardies": number
    "Apr-24 Absences": number
    "May-24 Answered Call %": number
    "May-24 Not Ready %": number
    "May-24 Tardies": number
    "May-24 Absences": number
    "Jun-24 Answered Call %": number
    "Jun-24 Not Ready %": number
    "Jun-24 Tardies": number
    "Jun-24 Absences": number
    "Jul-24 Answered Call %": number
    "Jul-24 Not Ready %": number
    "Jul-24 Tardies": number
    "Jul-24 Absences": number
    "Aug-24 Answered Call %": number
    "Aug-24 Not Ready %": number
    "Aug-24 Tardies": number
    "Aug-24 Absences": number
    "Sep-24 Answered Call %": number
    "Sep-24 Not Ready %": number
    "Sep-24 Tardies": number
    "Sep-24 Absences": number
    "Oct-24 Answered Call %": number
    "Oct-24 Not Ready %": number
    "Oct-24 Tardies": number
    "Oct-24 Absences": number
    "Nov-24 Tardies": number
    "Nov-24 Absences": number
    "Dec-24 Tardies": number
    "Dec-24 Absences": number
    "Employee ID": number
}


export const employeeColumns: ColumnDef<EmployeeType>[] = [
    {
        accessorKey: "Employee ID",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Employee ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "Oct-24 Not Ready %",
        header: "Oct Not Ready",
    },
    {
        accessorKey: "Oct-24 Answered Call %",
        header: "Oct Answered Call",
    },
    {
        accessorKey: "Oct-24 Tardies",
        header: "Oct Tardies",
    },
    {
        accessorKey: "Oct-24 Absences",
        header: "Oct Absences",
    },
]
