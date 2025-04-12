'use client';

import { useState } from 'react';

import { Button } from '@/components/extendui/button';
import { Stepper } from '@/components/extendui/stepper';

export const StepperProgress = () => {
  const [activeStep, setActiveStep] = useState(1);
  const steps = [1, 2, 3, 4];

  const handleNextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const stepInfo: Record<number, string> = {
    1: 'Initial setup and configuration',
    2: 'Data collection and processing',
    3: 'Analysis and verification',
    4: 'Final review and completion',
  };

  return (
    <div className="mx-auto mt-4 max-w-xl space-y-8 text-center">
      <Stepper
        value={activeStep}
        onValueChange={setActiveStep}
        separatorWidth={100}
      >
        {steps.map((step, index) => (
          <Stepper.Item key={step} step={step}>
            <Stepper.Trigger
              className="w-full flex-col items-start gap-2"
              asChild
            >
              <Stepper.Indicator
                asChild
                className={`data-[state=completed]:bg-accent data-[state=active]:bg-accent h-2 w-18 ${
                  index === 0
                    ? 'rounded-r-xl'
                    : index === steps.length - 1
                      ? 'rounded-l-xl'
                      : 'rounded-none'
                }`}
              ></Stepper.Indicator>
            </Stepper.Trigger>
          </Stepper.Item>
        ))}
      </Stepper>
      <div className="flex flex-col text-sm">
        <span className="text-gray-300">
          Step {activeStep} of {steps.length}
        </span>
        <span className="text-gray-400">{stepInfo[activeStep]}</span>
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          onClick={() => setActiveStep((prev) => prev - 1)}
          disabled={activeStep === 1}
        >
          Prev
        </Button>
        <Button
          variant="outline"
          onClick={handleNextStep}
          disabled={activeStep >= steps.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

StepperProgress.displayName = 'StepperProgress';
