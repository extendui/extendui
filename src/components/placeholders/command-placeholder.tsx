import { ChevronDown } from "lucide-react"

import { Card } from "../ui/card"

export const CommandPlaceholder = () => {
    return (
        <Card className="w-[200px] h-9 border-accent border-2 flex items-center justify-between px-2">
            <div className="w-24 h-4 rounded-sm bg-gray-200" />
            <div>
                <ChevronDown className='text-accent' size={16} />
            </div>
        </Card>
    )
}