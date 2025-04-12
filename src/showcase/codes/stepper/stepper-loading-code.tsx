export function getStepperLoadingCode() {
  return `"use client";
    
    import { useState } from "react";
    
    import { Button } from "@/components/extendui/button";
    import { Stepper } from "@/components/extendui/stepper";
    
    export const StepperLoading = () => {
        const [activeStep, setActiveStep] = useState(1)
        const [loading, setLoading] = useState(false)
        const steps = [1, 2, 3]
        const handleNextStep = () => {
            setLoading(true)
            setTimeout(() => {
                setActiveStep((prev) => prev + 1)
                setLoading(false)
            }, 500)
        }
    
        return (
            <div className="mx-auto max-w-xl space-y-12 text-center mt-4">
                <Stepper
                    value={activeStep}
                    onValueChange={setActiveStep}
                    separatorWidth={100}
                >
                    {steps.map((step) => (
                        <Stepper.Item
                            key={step}
                            step={step}
                            loading={loading}
                        >
                            <Stepper.Trigger asChild>
                                <Stepper.Indicator />
                            </Stepper.Trigger>
                            {step < steps.length && <Stepper.Separator />}
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
    
    StepperLoading.displayName = 'StepperLoading';`;
}
