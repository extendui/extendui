export function getCommandExampleCode(state: Record<string, any>) {
  const { disabled, labelText, notFoundText } = state;

  return `import { useState } from 'react';
import { Input } from '@/components/extendui/input';
import { CaretSortIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { UtensilsCrossed } from 'lucide-react';

const statuses = [
  { value: "completed", label: "Completed", color: "text-emerald-600" },
  { value: "in_progress", label: "In Progress", color: "text-blue-600" },
  { value: "pending", label: "Pending", color: "text-yellow-500" },
  { value: "cancelled", label: "Cancelled", color: "text-gray-500" },
  { value: "failed", label: "Failed", color: "text-red-600" },
];
  
export const CommandDemo = () => {
  const [open, setOpen] = useState(false);
  const [showIcon, setShowIcon] = useSatat(false)
  const [value, setValue] = useState<string>("");

  const findElement = (value: string) => {
      const status = statuses.find((status) => status.value === value);
      return (
        <div className="flex items-center gap-2">
          {showIcon && <Dot className={status?.color} width={10} height={10} strokeWidth={20} />}
          {status?.label}
        </div>
      )
    }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={${disabled}}
            className="w-[180px] justify-between px-3 font-normal"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value
                ? findElement(value)
                : <>${labelText}</>}
            </span>
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="p-0"
        >
          <Command>
            <CommandInput/>
            <CommandList>
              <CommandEmpty>${notFoundText}</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {showIcon && <Dot className={status.color} strokeWidth={12} />}
                      {status.label}
                    </div>
                    <Check
                      className={cn(
                        "ml-auto",
                        value === status.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}`;
}