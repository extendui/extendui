'use client';

import { Minus, Plus } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/extendedui/button/button';
import { Input } from '@/components/extendedui/input/input';

export const InputDecreaseIncrease = ({ min = 0, max = 100, step = 1 }: { min?: number; max?: number; step?: number }) => {
  const [value, setValue] = React.useState(min);

  const decrease = () => {
    setValue((prevValue) => Math.max(min, prevValue - step));
  };

  const increase = () => {
    setValue((prevValue) => Math.min(max, prevValue + step));
  };

  return (
    <div className="flex items-center">
      <Button
        onClick={decrease}
        size="icon"
        variant="outline"
        className="w-[40px] rounded-r-none border-r-0"
      >
        <Minus className="size-4" />
      </Button>
      <Input
        type="number"
        className="flex-grow -me-px rounded-none text-center border-x-0 focus:outline-none focus-visible:outline-none pointer-events-none
          [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        value={value}
        readOnly
        min={min}
        max={max}
        step={step}
      />
      <Button
        onClick={increase}
        size="icon"
        variant="outline"
        className="w-[40px] rounded-l-none border-l-0"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};