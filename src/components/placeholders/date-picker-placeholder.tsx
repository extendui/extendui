import { Calendar } from "lucide-react"

import { Card } from "../ui/card"

export const DatePickerPlaceholder = () => {
    return (
        <Card className="w-[200px] h-9 border-accent border-2 flex items-center justify-between px-2">
            <div className="w-24 h-1.5 ml-1 rounded-sm bg-gray-200 dark:bg-gray-200/80" />
            <div>
                <Calendar className='text-accent' size={16} />
            </div>
        </Card>
    )
}