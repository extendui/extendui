'use client';

import { Stepper } from '@/components/extendui/stepper';
import { useEngineSettingsStepperStore } from '@/zustand/stores/useEngineSettingsStepper';

export const StepperExample = () => {
  const {
    variant,
    orientation,
    activeStep,
    disabled,
    loading,
    separatorWidth,
    completed,
    setActiveStep,
  } = useEngineSettingsStepperStore();

  const steps = [1, 2, 3, 4];

  return (
    <Stepper
      orientation={orientation}
      value={activeStep}
      onValueChange={setActiveStep}
      separatorWidth={separatorWidth}
    >
      {steps.map((step) => (
        <Stepper.Item
          key={step}
          step={step}
          disabled={disabled}
          loading={loading}
          completed={completed}
        >
          <Stepper.Trigger>
            <Stepper.Indicator variant={variant} />
          </Stepper.Trigger>
          {step < steps.length && <Stepper.Separator />}
        </Stepper.Item>
      ))}
    </Stepper>
  );
};
