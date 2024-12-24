"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const employees = [
    {
        "value": "0",
        "label": "Employee 1"
    },
    {
        "value": "1",
        "label": "Employee 2"
    },
    {
        "value": "2",
        "label": "Employee 3"
    },
    {
        "value": "3",
        "label": "Employee 4"
    },
    {
        "value": "4",
        "label": "Employee 5"
    },
    {
        "value": "5",
        "label": "Employee 6"
    },
    {
        "value": "6",
        "label": "Employee 7"
    },
    {
        "value": "7",
        "label": "Employee 8"
    },
    {
        "value": "8",
        "label": "Employee 9"
    },
    {
        "value": "9",
        "label": "Employee 10"
    },
    {
        "value": "10",
        "label": "Employee 11"
    },
    {
        "value": "11",
        "label": "Employee 12"
    },
    {
        "value": "12",
        "label": "Employee 13"
    },
    {
        "value": "13",
        "label": "Employee 14"
    },
    {
        "value": "14",
        "label": "Employee 15"
    },
    {
        "value": "15",
        "label": "Employee 16"
    },
    {
        "value": "16",
        "label": "Employee 17"
    },
    {
        "value": "17",
        "label": "Employee 18"
    },
    {
        "value": "18",
        "label": "Employee 19"
    },
    {
        "value": "19",
        "label": "Employee 20"
    },
    {
        "value": "20",
        "label": "Employee 21"
    },
    {
        "value": "21",
        "label": "Employee 22"
    },
    {
        "value": "22",
        "label": "Employee 23"
    },
    {
        "value": "23",
        "label": "Employee 24"
    },
    {
        "value": "24",
        "label": "Employee 25"
    },
    {
        "value": "25",
        "label": "Employee 26"
    },
    {
        "value": "26",
        "label": "Employee 27"
    },
    {
        "value": "27",
        "label": "Employee 28"
    },
    {
        "value": "28",
        "label": "Employee 29"
    },
    {
        "value": "29",
        "label": "Employee 30"
    },
    {
        "value": "30",
        "label": "Employee 31"
    },
    {
        "value": "31",
        "label": "Employee 32"
    },
    {
        "value": "32",
        "label": "Employee 33"
    },
    {
        "value": "33",
        "label": "Employee 34"
    },
    {
        "value": "34",
        "label": "Employee 35"
    },
    {
        "value": "35",
        "label": "Employee 36"
    },
    {
        "value": "36",
        "label": "Employee 37"
    },
    {
        "value": "37",
        "label": "Employee 38"
    },
    {
        "value": "38",
        "label": "Employee 39"
    },
    {
        "value": "39",
        "label": "Employee 40"
    },
    {
        "value": "40",
        "label": "Employee 41"
    },
    {
        "value": "41",
        "label": "Employee 42"
    },
    {
        "value": "42",
        "label": "Employee 43"
    },
    {
        "value": "43",
        "label": "Employee 44"
    },
    {
        "value": "44",
        "label": "Employee 45"
    },
    {
        "value": "45",
        "label": "Employee 46"
    },
    {
        "value": "46",
        "label": "Employee 47"
    },
    {
        "value": "47",
        "label": "Employee 48"
    },
    {
        "value": "48",
        "label": "Employee 49"
    },
    {
        "value": "49",
        "label": "Employee 50"
    },
    {
        "value": "50",
        "label": "Employee 51"
    },
    {
        "value": "51",
        "label": "Employee 52"
    },
    {
        "value": "52",
        "label": "Employee 53"
    },
    {
        "value": "53",
        "label": "Employee 54"
    },
    {
        "value": "54",
        "label": "Employee 55"
    },
    {
        "value": "55",
        "label": "Employee 56"
    },
    {
        "value": "56",
        "label": "Employee 57"
    },
    {
        "value": "57",
        "label": "Employee 58"
    },
    {
        "value": "58",
        "label": "Employee 59"
    },
    {
        "value": "59",
        "label": "Employee 60"
    },
    {
        "value": "60",
        "label": "Employee 61"
    },
    {
        "value": "61",
        "label": "Employee 62"
    },
    {
        "value": "62",
        "label": "Employee 63"
    },
    {
        "value": "63",
        "label": "Employee 64"
    },
    {
        "value": "64",
        "label": "Employee 65"
    },
    {
        "value": "65",
        "label": "Employee 66"
    },
    {
        "value": "66",
        "label": "Employee 67"
    },
    {
        "value": "67",
        "label": "Employee 68"
    },
    {
        "value": "68",
        "label": "Employee 69"
    },
    {
        "value": "69",
        "label": "Employee 70"
    },
    {
        "value": "70",
        "label": "Employee 71"
    },
    {
        "value": "71",
        "label": "Employee 72"
    },
    {
        "value": "72",
        "label": "Employee 73"
    },
    {
        "value": "73",
        "label": "Employee 74"
    },
    {
        "value": "74",
        "label": "Employee 75"
    },
    {
        "value": "75",
        "label": "Employee 76"
    },
    {
        "value": "76",
        "label": "Employee 77"
    },
    {
        "value": "77",
        "label": "Employee 78"
    },
    {
        "value": "78",
        "label": "Employee 79"
    },
    {
        "value": "79",
        "label": "Employee 80"
    }
]
export function EmployeeSelectCombobox({ value, setValue }: { value: string, setValue: React.Dispatch<React.SetStateAction<string>> }) {
    const [open, setOpen] = React.useState(false)
    // const [value, setValue] = React.useState("")
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? employees.find((employee) => employee.value === value)?.label
                        : "Select employee..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search employee..." />
                    <CommandList>
                        <CommandEmpty>No employee found.</CommandEmpty>
                        <CommandGroup>
                            {employees.map((employee) => (
                                <CommandItem
                                    key={employee.value}
                                    value={employee.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === employee.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {employee.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
