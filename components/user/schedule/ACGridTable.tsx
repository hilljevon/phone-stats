"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from "ag-grid-community";
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component

const ACGridTable = ({ rowData, colDefs }: { rowData: any, colDefs: any }) => {
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