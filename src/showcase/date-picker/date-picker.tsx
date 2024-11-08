"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { Button } from "../../components/extendui/button"

export function DatePickerExample() {
    const [date, setDate] = React.useState<Date>()
    const [month, setMonth] = React.useState<Date>(new Date())

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[220px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        month={month}
                        onMonthChange={setMonth}
                        selected={date}
                        onSelect={setDate}
                        variant={"default"}
                    // disabled={{ dayOfWeek: [0, 6] }}
                    />
                </PopoverContent>
            </Popover>
        </>
    )
}
