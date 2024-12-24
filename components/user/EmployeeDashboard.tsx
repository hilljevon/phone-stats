"use client"
import React, { useEffect } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
const EmployeeDashboard = () => {
    useEffect(() => {
        fetch("/data/case_census.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to fetch case census data!")
                }
                return response.json()
            })
            .then((jsonData) => {
                console.log("JSON DATA HERE", jsonData)
            })
            .catch((error) => console.log("Unable to fetch JSON data"))
    }, [])
    return (
        <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                <div className="col-span-full">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Employee Table Overview</AccordionTrigger>
                            <AccordionContent>
                                Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </>
    )
}

export default EmployeeDashboard