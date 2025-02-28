"use client"
import { handleExcelSchedules } from '@/lib/helpers.schedules';
import React, { useState } from 'react'
import * as XLSX from "xlsx";
import ExcelTable from './ExcelTable';
import ACGridTable from './ACGridTable';
interface Schedule {
    [key: string]: string[];  // The key is a string (person's name), and the value is an array of strings (dates)
}
const MainScheduleComponent = () => {
    const [data, setData] = useState<any>(null)
    const [colDefs, setColDefs] = useState<any>(null)
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
            </div>
            <div className="col-span-full">
                {data && (
                    // <ExcelTable dates={data.names} names={data.names} />
                    // <div>
                    //     {Object.entries(data).map(([name, dates]) => (
                    //         <div key={name}>
                    //             <h2>{name}</h2>
                    //             <ul>
                    //                 {dates.map((date, index) => (
                    //                     <li key={index}>{date}</li>
                    //                 ))}
                    //             </ul>
                    //         </div>
                    //     ))}
                    // </div>
                    <div>
                        <ACGridTable
                            rowData={data}
                            colDefs={colDefs}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default MainScheduleComponent