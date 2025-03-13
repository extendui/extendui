'use client';

import { Check, ChevronDown, Dot } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/extendui/button";
import { Command } from "@/components/extendui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEngineSettingsCommandStore } from "@/zustand/stores/useEngineSettingsCommand";


const statuses = [
  { value: "completed", label: "Completed", color: "text-emerald-600" },
  { value: "in_progress", label: "In Progress", color: "text-blue-600" },
  { value: "pending", label: "Pending", color: "text-yellow-500" },
  { value: "cancelled", label: "Cancelled", color: "text-gray-500" },
  { value: "failed", label: "Failed", color: "text-red-600" },
];


export const CommandExample = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const { disabled, showIcon, labelText, notFoundText, placeholder } = useEngineSettingsCommandStore();
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
            disabled={disabled}
            className="w-[180px] justify-between px-3 font-normal"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value
                ? findElement(value)
                : <>{labelText}</>}
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
            <Command.Input placeholder={placeholder} />
            <Command.List>
              <Command.Empty>{notFoundText}</Command.Empty>
              <Command.Group>
                {statuses.map((status) => (
                  <Command.Item
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
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}