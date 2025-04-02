"use client"
import { handleExcelSchedules } from '@/lib/helpers.schedules';
import React, { useEffect, useState } from 'react'
import * as XLSX from "xlsx";
import ExcelTable from './ExcelTable';
import ACGridTable from './ACGridTable';
import { DataTable } from '../attendance/DataTable';
import { ColumnDef, RowData } from "@tanstack/react-table"
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DateDataInterface {
    field: string,
    headerName: string
}
declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void
    }
}

const MainScheduleComponent = () => {
    // Array of employee objects of all shifts worked.
    const [data, setData] = useState<any>(null)
    // An array of our date ranges for the excel file uploaded.
    const [colDefs, setColDefs] = useState<any>(null)
    // Columns that will eventually be used to define our data table.
    const [columns, setColumns] = useState<any>(null)
    // dynamic columns eventually generated with dates that are pulled from excel file.
    const TableColumns = (dates: DateDataInterface[]) => {
        const updateData = (rowIndex: number, columnId: string, value: string) => {
            setData((prevData: any) =>
                prevData.map((row: any, index: any) =>
                    index === rowIndex ? { ...row, [columnId]: value } : row
                )
            )
        }
        const columnDates: ColumnDef<any>[] = dates.map((date) => {
            return {
                accessorKey: date.field,
                header: () => <div className="text-left min-w-10"> {date.headerName} </div>,
                cell: ({ getValue, row, column, table }) => {
                    const initialValue = getValue()
                    const [value, setValue] = React.useState<any>(initialValue)
                    const [backgroundSet, setBackgroundSet] = useState(false)
                    const onBlur = () => {
                        table.options.meta?.updateData(row.index, column.id, value)
                    }
                    useEffect(() => {
                        if (value.length > 2) {
                            setBackgroundSet(true)
                        } else {
                            setBackgroundSet(false)
                        }
                    }, [value])
                    return (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <input
                                        className={cn(backgroundSet ? "bg-green-500 text-white" : "bg-white, text-green-500",
                                            "w-full text-center border-none ",
                                            value == "9AM Utilization Analyst" && "bg-green-600 text-white",
                                            value == "Night Shift Utilization Analyst" && "bg-purple-500 text-white"
                                        )}
                                        value={value.length > 1 ? "X" : ""}
                                        onChange={(e) => {
                                            if (e.target.value == "") {
                                                setValue(e.target.value)
                                            } else if (e.target.value == "1") {
                                                setValue("9AM Utilization Analyst")
                                            } else if (e.target.value == "2") {
                                                setValue("8AM Utilization Analyst")
                                            } else if (e.target.value == "3") {
                                                setValue("Night Shift Utilization Analyst")
                                            }

                                        }}
                                        onBlur={onBlur}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p> {value} </p>
                                </TooltipContent>
                            </Tooltip>

                        </TooltipProvider >
                    )
                },
            }
        })
        // we create an initial column name for our names since our initial loop is only for dates. this is our main reference point for the table
        const columns: ColumnDef<any>[] = [
            {
                accessorKey: "name",
                header: () => <div className="text-left">Name</div>,
                // when clicking on a cell, we copy the respective row to our clipboard. This was implemented before our excel export.
                cell: ({ row }) => {
                    const value = row.getValue("name")
                    const fullRowData = row.original;
                    const formattedArray = [
                        fullRowData.name,
                        ...Object.entries(fullRowData)
                            .filter(([key]) => key !== "name") // Exclude the name key
                            .sort(([a], [b]) => a.localeCompare(b)) // Sort by date
                            .map(([, value]) => value) // Extract only values
                    ];
                    const tsvData = formattedArray.join("\t");
                    return <div
                        className="text-left font-bold hover:bg-blue-300 hover:cursor-pointer"
                        onClick={() => {
                            navigator.clipboard.writeText(tsvData)
                            toast.success(`Copied ${value}'s Row. Please paste into excel`)
                        }}
                    >
                        {row.getValue("name")}
                    </div>
                },
            },
        ]
        columns.push(...columnDates)
        return columns
    }
    // upon excel file upload, we render our data table
    function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const binaryData = e.target?.result;
            if (binaryData) {
                const workbook = XLSX.read(binaryData, { type: "binary" });
                const uaSpreadsheet = workbook["Sheets"]["Schedules - UA"]

                const res = handleExcelSchedules(uaSpreadsheet)
                // colDefs is just our dates
                setColDefs(res.colDefs)
                // data is an array of objects containing all of our employees and every shift they are working.
                setData(res.data)
                // Set our columns to the dates. we call TableColumns function inside.
                setColumns(TableColumns(res.colDefs))
                // setData(parsedData)
            }
        };
        reader.readAsBinaryString(file);
    }
    // Converts the created table into an excel file
    function convertToXlsx() {
        if (data) {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            worksheet["!cols"] = [{ wch: 14 }];
            XLSX.utils.book_append_sheet(workbook, worksheet, "Schedule");
            XLSX.writeFile(workbook, "Schedule.xlsx", { compression: true });
        }
    }
    console.log("data here", data)
    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div className="col-span-full space-x-5">
                <h1>Enter schedule here</h1>
                <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                />
                {data && (
                    <Button size={"sm"} variant={"secondary"} onClick={convertToXlsx}>
                        Download to Excel
                    </Button>
                )}
                <Button size={"sm"}>
                    Save
                </Button>
            </div>
            <div className="col-span-full">
                {columns && (
                    <div className='overflow-x-scroll overflow-y-auto'>
                        <DataTable data={data} columns={columns} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default MainScheduleComponent