export function getStepperExampleCode(state: Record<string, any>) {
  const {
    variant,
    orientation,
    activeStep,
    disabled,
    loading,
    separatorWidth,
    completed,
  } = state;

  return `import { Button } from '@/components/extendui/button';

    const steps = [1, 2, 3, 4];
    const [activeStep, setActiveStep] = useState(${activeStep})
  
    export function ButtonDemo() {
        return (
            <Stepper
                orientation={'${orientation}'}
                value={${activeStep}}
                onValueChange={(e) => setActiveStep(e.target.value)}
                separatorWidth={${separatorWidth}}
            >
                {steps.map((step) => (
                    <Stepper.Item
                        key={step}
                        step={step}
                        disabled={${disabled}}
                        loading={${loading}}
                        completed={${completed}}
                    >
                        <Stepper.Trigger>
                            <Stepper.Indicator variant={'${variant}'} />
                        </Stepper.Trigger>
                        {step < steps.length && <Stepper.Separator />}
                    </Stepper.Item>
                ))}
            </Stepper>
        );
    }`;
}
