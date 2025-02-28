"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from "ag-grid-community";
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component

const ACGridTable = ({ rowData, colDefs }: { rowData: any, colDefs: any }) => {
    // const [rowData, setRowData] = useState([
    //     { make: "Tesla", price: 64950, electric: true },
    //     { make: "Ford", model: "F-Series", price: 33850, electric: false },
    //     { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    // ]);
    // Column defs done
    // const [colDefs, setColDefs] = useState<any>([
    //     { field: "make" },
    //     { field: "model" },
    //     { field: "price" },
    //     { field: "electric" }
    // ]);
    const autoSizeStrategy: any = useMemo(() => {
        return {
            type: 'fitCellContents'
        };
    }, []);
    return (
        <div style={{ height: '100vh', width: "auto" }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                autoSizeStrategy={autoSizeStrategy}
            />
        </div>
    )
}

export default ACGridTable