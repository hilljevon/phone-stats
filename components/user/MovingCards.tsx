"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const average_data = [
    { month: "Jan-24", answeredCallPercent: 74.67, notReadyPercent: 27.16, absenceSum: 23, tardiesSum: 71 },
    { month: "Feb-24", answeredCallPercent: 73.72, notReadyPercent: 22.61, absenceSum: 31, tardiesSum: 87 },
    { month: "Mar-24", answeredCallPercent: 76.01, notReadyPercent: 22.41, absenceSum: 36, tardiesSum: 52 },
    { month: "Apr-24", answeredCallPercent: 75.77, notReadyPercent: 25.61, absenceSum: 43, tardiesSum: 83 },
    { month: "May-24", answeredCallPercent: 77.11, notReadyPercent: 22.89, absenceSum: 35, tardiesSum: 63 },
    { month: "Jun-24", answeredCallPercent: 76.5, notReadyPercent: 22.31, absenceSum: 39, tardiesSum: 66 },
    { month: "Jul-24", answeredCallPercent: 87.75, notReadyPercent: 25.25, absenceSum: 38, tardiesSum: 104 },
    { month: "Aug-24", answeredCallPercent: 86.56, notReadyPercent: 27.16, absenceSum: 24, tardiesSum: 40 },
    { month: "Sep-24", answeredCallPercent: 83.61, notReadyPercent: 27.64, absenceSum: 37, tardiesSum: 46 },
    { month: "Oct-24", answeredCallPercent: 87.22, notReadyPercent: 27, absenceSum: 36, tardiesSum: 90 },
]
export const MovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        title: string,
        months: { month: string, data: number }[],
        caption: string
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-screen overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_40%,white_90%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className="w-[350px] max-w-full relative border rounded-lg  bg-card text-card-foreground shadow-sm flex-shrink-0 px-8 py-6 md:w-[450px]"
                        style={{
                            background:
                                "white",
                        }}
                        key={item.title}
                    >
                        <blockquote>
                            <div
                                aria-hidden="true"
                                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                            >

                            </div>
                            <div className="flex items-center justify-center w-full">
                                <span className=" relative z-20 text-lg leading-[1.6] font-bold text-[#2b8aa0]">
                                    {item.title}
                                </span>
                            </div>

                            <div className="relative z-20 flex justify-center items-center">
                                {/* <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full justify-between mt-4">
                                    {item.months.map((data, idx) => (
                                        <div className="col-span-1" key={idx}>
                                            <span className="font-extrabold">{idx + 1}. </span> {data.month}
                                        </div>
                                    ))}
                                </div> */}
                                <Table className="">
                                    <TableCaption className="mt-4"> {item.caption} </TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Rank</TableHead>
                                            <TableHead>Month</TableHead>
                                            <TableHead>Value</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {item.months.map((data, idx) => (
                                            <TableRow className="py-2 my-2" key={idx}>
                                                <TableCell className="font-medium py-1 my-1"> {idx + 1} </TableCell>
                                                <TableCell className="py-1 my-1"> {data.month} </TableCell>
                                                <TableCell className="py-1 my-1"> {data.data} </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    );
};
