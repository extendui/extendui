'use client';

import { CaretSortIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { UtensilsCrossed } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectHelperText,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/extendui/select';
import { useEngineSettingsSelectStore } from '@/zustand/stores/useEngineSettingsSelect';

export default function SelectExample() {
  const { variant, error, disabled, showIcon, changeOpenIcon, leftText, helperText, placeholeder } = useEngineSettingsSelectStore();
  return (
    <div>
      <Select disabled={disabled}>
        <SelectTrigger
          error={error}
          variant={variant}
          openIcon={changeOpenIcon ? <ChevronDownIcon /> : <CaretSortIcon />}
          icon={showIcon ? <UtensilsCrossed size={16} strokeWidth={2} aria-hidden="true" /> : null}
          leftText={leftText}
          className="min-w-[160px]"
        >
          <SelectValue placeholder={placeholeder} />
        </SelectTrigger>
        <SelectContent variant={variant}>
          <SelectGroup >
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <SelectHelperText error={error}>
        {helperText}
      </SelectHelperText>
    </div>
  );
}

