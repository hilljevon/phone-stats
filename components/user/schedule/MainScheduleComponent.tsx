"use client"
import { handleExcelSchedules } from '@/lib/helpers.schedules';
import React, { useEffect, useState } from 'react'
import * as XLSX from "xlsx";
import ExcelTable from './ExcelTable';
import ACGridTable from './ACGridTable';
import { DataTable } from '../attendance/DataTable';
import { ColumnDef } from "@tanstack/react-table"
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DateDataInterface {
    field: string,
    headerName: string
}
const MainScheduleComponent = () => {
    const [data, setData] = useState<any>(null)
    const [colDefs, setColDefs] = useState<any>(null)
    const [columns, setColumns] = useState<any>(null)
    const [editingCell, setEditingCell] = useState<any>(null);
    const dat = [
        ["Name", "2025-02-01", "2025-02-02", "2025-02-03"],  // Header Row
        ["Alice", "X", "", "X"],
        ["Bob", "", "X", ""],
        ["Charlie", "X", "X", "X"]
    ];
    // Convert the 2D array into a clipboard-friendly format
    const formattedString = dat.map(row => row.join("\t")).join("\n");
    const TableColumns = (dates: DateDataInterface[]) => {
        const columnDates: ColumnDef<any>[] = dates.map((date) => {
            const obj: ColumnDef<any> = {
                accessorKey: date.field,
                header: () => <div className="text-left"> {date.headerName} </div>,
                cell: ({ row }) => {
                    const containsCurrentDate = row["original"][date.field]
                    if (containsCurrentDate.length > 0) {
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
                    const fullRowData = row.original;
                    const formattedArray = [
                        fullRowData.name,
                        ...Object.entries(fullRowData)
                            .filter(([key]) => key !== "name") // Exclude the name key
                            .sort(([a], [b]) => a.localeCompare(b)) // Sort by date
                            .map(([, value]) => value) // Extract only values
                    ];
                    console.log("Formatted array here", formattedArray)
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
                setColDefs(res.colDefs)
                setData(res.data)
                setColumns(TableColumns(res.colDefs))
                // setData(parsedData)
            }
        };
        reader.readAsBinaryString(file);
    }
    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div className="col-span-full">
                <h1>Enter schedule here</h1>
                <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                />
                <Button onClick={() => {
                    navigator.clipboard.writeText(formattedString)
                    toast("Copied!")
                }}>
                    Copy
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