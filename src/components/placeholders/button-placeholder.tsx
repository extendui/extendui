import { Card } from "../ui/card"

export const ButtonPlaceholder = () => {
    return (
        <Card className="w-[120px] h-9 border-accent border-2 flex items-center justify-center">
            <div className="w-16 h-1.5 rounded-sm bg-gray-200 dark:bg-gray-200/80" />
        </Card>
    )
}