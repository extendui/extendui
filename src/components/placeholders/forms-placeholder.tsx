import { Card } from "../ui/card"

export const FormsPlaceholder = () => {
  return (
    <Card className="w-[180px] border-accent border-2">
      <div className="flex flex-col justify-center  p-4">
        <div className='space-y-2 items-start'>
          <div className="h-2 w-2/5 rounded-sm mb-4 bg-gray-200" />
          <div className='grid grid-cols-2 gap-2'>
            <div className="h-2 rounded-sm bg-gray-200" />
            <div className="h-2 rounded-sm bg-gray-200" />
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <div className="h-2 rounded-sm bg-gray-200" />
            <div className="h-2 rounded-sm bg-gray-200" />
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <div className="h-2 rounded-sm bg-gray-200" />
            <div className="h-2 rounded-sm bg-gray-200" />
          </div>
        </div>
        <div className="space-y-3 flex justify-end items-end">
          <div className="h-3 w-3/12 rounded-xl mt-4 bg-accent" />
        </div>
      </div>
    </Card>
  )
}