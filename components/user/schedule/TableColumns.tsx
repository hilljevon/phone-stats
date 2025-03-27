"use client"
import { ColumnDef } from "@tanstack/react-table"
import React, { useState } from 'react'
interface DateDataInterface {
    field: string,
    headerName: string
}
const TableColumns = (dates: DateDataInterface[]) => {
    const columnDates: ColumnDef<any>[] = dates.map((date) => {
        const obj: ColumnDef<any> = {
            accessorKey: date.field,
            header: () => <div className="text-left"> {date.headerName} </div>,
            cell: ({ row }) => {
                const containsCurrentDate = row["original"][date.field]
                if (containsCurrentDate) {
                    return <div className="bg-green-500 text-white">x</div>
                } else {
                    return <div></div>
                }
            },
        }
        return obj
    })
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "name",
            header: () => <div className="text-left">Name</div>,
            cell: ({ row }) => {
                const value = row.getValue("name")
                return <div className="text-left font-bold"> {row.getValue("name")} </div>
            },
        },
    ]
    columns.push(...columnDates)
    return columns
}

export default TableColumns


