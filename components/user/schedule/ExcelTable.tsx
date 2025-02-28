"use client"
import React, { useEffect, useState } from 'react'
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import { HotTable } from '@handsontable/react-wrapper';
import { registerAllModules } from 'handsontable/registry';
registerAllModules();


const ExcelTable = ({ dates, names }: { dates: any[], names: any[] }) => {
    const [data, setData] = useState<any[]>()
    useEffect(() => {
        const newData = [
            ["", ...dates],
            [...names]
        ]
        setData(newData)
    }, [])
    return (
        <div >
            <HotTable
                data={data}
                rowHeaders={false}
                colHeaders={false}
                width={"auto"}
                height={"auto"}
                autoWrapRow={true}
                themeName="ht-theme-main"
                autoWrapCol={true}
                licenseKey="non-commercial-and-evaluation" // for non-commercial use only
            // mergeCells={{
            //     virtualized: true,
            //     cells: [{ row: 0, col: 0, rowspan: 2, colspan: 1 }]
            // }}
            />
        </div>
    )
}

export default ExcelTable