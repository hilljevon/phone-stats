"use client"
import * as React from "react"
import { GalleryVerticalEnd, PhoneCall, PhoneIncoming } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
// This is sample data.
const data = {
    navMain: [
        {
            title: "Overview",
            url: "/",
            items: [
                {
                    title: "Dashboard",
                    url: "/",
                    isActive: true,
                },
                {
                    title: "Employees",
                    url: "/employees",
                },
                {
                    title: "Phones",
                    url: "/phones",
                },
                {
                    title: "Attendance",
                    url: "/attendance",
                },
                {
                    title: "Cases",
                    url: "/cases",
                },
            ],
        },

        // {
        //     title: "In Depth",
        //     url: "#",
        //     items: [
        //         {
        //             title: "Individual Statistics",
        //             url: "#",
        //         },
        //         {
        //             title: "Search Employee",
        //             url: "#",
        //         },
        //         {
        //             title: "Data Tables",
        //             url: "#",
        //         },
        //     ],
        // },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    return (
        <Sidebar variant="floating" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <PhoneIncoming className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">OURS Phone Stats 2024</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="gap-2">
                        {data.navMain.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url} className="font-medium">
                                        {item.title}
                                    </a>
                                </SidebarMenuButton>
                                {item.items?.length ? (
                                    <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                                        {item.items.map((item) => (
                                            <SidebarMenuSubItem key={item.title}>
                                                <SidebarMenuSubButton asChild isActive={item.url == pathname}>
                                                    <a href={item.url}>{item.title}</a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                ) : null}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
