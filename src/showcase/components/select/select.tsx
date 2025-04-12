'use client';

import { CaretSortIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { UtensilsCrossed } from 'lucide-react';

import { Select } from '@/components/extendui/select';
import { useEngineSettingsSelectStore } from '@/zustand/stores/useEngineSettingsSelect';

export const SelectExample = () => {
  const {
    variant,
    error,
    disabled,
    showIcon,
    changeOpenIcon,
    leftText,
    helperText,
    placeholder,
  } = useEngineSettingsSelectStore();
  return (
    <div>
      <Select disabled={disabled}>
        <Select.Trigger
          error={error}
          variant={variant}
          openIcon={changeOpenIcon ? <ChevronDownIcon /> : <CaretSortIcon />}
          icon={
            showIcon ? (
              <UtensilsCrossed size={16} strokeWidth={2} aria-hidden="true" />
            ) : null
          }
          leftText={leftText}
          className="min-w-[160px]"
        >
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>
        <Select.Content variant={variant}>
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="banana">Banana</Select.Item>
            <Select.Item value="blueberry">Blueberry</Select.Item>
            <Select.Item value="grapes">Grapes</Select.Item>
            <Select.Item value="pineapple">Pineapple</Select.Item>
          </Select.Group>
        </Select.Content>
        <Select.HelperText error={error}>{helperText}</Select.HelperText>
      </Select>
    </div>
  );
};
