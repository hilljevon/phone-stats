"use client"
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { EmployeeDataTable } from './EmployeeTable/EmployeeDataTable'
import { employeeColumns, EmployeeType } from './EmployeeTable/EmployeeColumns'
import { EmployeeSelectCombobox } from './EmployeeSelectCombobox'
import { EmployeeMultiBarChart } from './employeeCharts/EmployeeMultiBarChart'
import { EmployeeMultiBarAttendance } from './employeeCharts/EmployeeMultiBarAttendance'
const EmployeeDashboard = () => {
    const [allCases, setAllCases] = useState<EmployeeType[]>([])
    const [employeeValue, setEmployeeValue] = useState("")
    const [currentData, setCurrentData] = useState<EmployeeType | null>(null)
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/data/complete_w_attendance.json");
            const json = await res.json();
            setAllCases(json);
        };
        fetchData();
    }, [])
    useEffect(() => {
        if (allCases) {
            const employeeValInt = parseInt(employeeValue)
            setCurrentData(allCases[employeeValInt])
        }

    }, [employeeValue])
    return (
        <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                <div className="col-span-full">
                    <div className="flex justify-center items-center w-full">
                        <EmployeeSelectCombobox value={employeeValue} setValue={setEmployeeValue} />
                    </div>
                </div>
                <div className="col-span-full">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>All Employees</AccordionTrigger>
                            <AccordionContent>
                                {allCases && (
                                    <EmployeeDataTable columns={employeeColumns} data={allCases} />
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                {currentData && (
                    <>
                        <div className="col-span-2">
                            <EmployeeMultiBarChart currentData={currentData} />
                        </div>
                        <div className="col-span-2">
                            <EmployeeMultiBarAttendance currentData={currentData} />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default EmployeeDashboard