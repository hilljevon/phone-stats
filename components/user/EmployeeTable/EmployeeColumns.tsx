"use client"

import { ColumnDef } from "@tanstack/react-table"

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
    "Employee ID": number
}


export const columns: ColumnDef<EmployeeType>[] = [
    {
        accessorKey: "Employee ID",
        header: "Employee",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
]