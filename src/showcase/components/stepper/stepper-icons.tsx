'use client';

import { FaceIcon, ImageIcon, CheckIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import { Button } from '@/components/extendui/button';
import { Stepper } from '@/components/extendui/stepper';

export const StepperWithIcons = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { step: 1, icon: FaceIcon },
    { step: 2, icon: ImageIcon },
    { step: 3, icon: CheckIcon },
  ];

  const handleNextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  return (
    <div className="mx-auto mt-4 max-w-xl space-y-12 text-center">
      <Stepper
        value={activeStep}
        onValueChange={setActiveStep}
        separatorWidth={100}
      >
        {steps.map(({ step, icon: Icon }, index) => (
          <Stepper.Item key={step} step={step}>
            <Stepper.Trigger asChild>
              <div
                className={`group-data-[state=completed]/step:bg-accent group-data-[state=active]/step:bg-accent flex items-center justify-center rounded-xl p-2 text-gray-500 group-data-[state=active]/step:text-white group-data-[state=completed]/step:text-white`}
                style={{ width: '40px', height: '40px' }}
              >
                <Icon className="h-6 w-6" />
              </div>
            </Stepper.Trigger>
            {index < steps.length - 1 && (
              <Stepper.Separator className="group-data-[state=completed]/step:bg-accent" />
            )}
          </Stepper.Item>
        ))}
      </Stepper>
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

StepperWithIcons.displayName = 'StepperWithIcons';
