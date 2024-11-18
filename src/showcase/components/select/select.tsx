'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/extendui/select';
import { useEngineSettingsSelectStore } from '@/zustand/stores/useEngineSettingsSelect';

export default function SelectExample() {
  const { variant, error, disabled } = useEngineSettingsSelectStore();
  return (
    <Select>
      <SelectTrigger
        disabled={disabled}
        error={error}
        variant={variant}
        className="w-[180px]"
      >
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
