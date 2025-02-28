import { AppSidebar } from "@/components/user/AppSideBar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import React from 'react'
import { PhoneOverviewOnly } from "@/components/user/phones/PhoneOverviewOnly"
import { NotReadyStackedBarChart } from "@/components/user/charts/NotReadyStackedBarChart"
import { AnsweredCallsStackedBarChart } from "@/components/user/charts/AnsweredCallsStackedBarChart"
import MainScheduleComponent from "@/components/user/schedule/MainScheduleComponent"


const page = () => {
    return (
        <>
            <SidebarProvider
                defaultOpen={false}
                style={
                    {
                        "--sidebar-width": "19rem",
                    } as React.CSSProperties
                }
            >
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/">
                                        Overview
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Scheduling</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <MainScheduleComponent />

                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

export default page