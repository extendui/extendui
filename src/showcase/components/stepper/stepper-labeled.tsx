"use client";

import { FaceIcon, ImageIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { Button } from "@/components/extendui/button";
import { Stepper } from "@/components/extendui/stepper";

export const StepperLabeled = () => {
    const [activeStep, setActiveStep] = useState(1);

    const steps = [
        {
            step: 1,
            icon: FaceIcon,
            label: "Personal Info",
            description: "Enter your name and contact details",
        },
        {
            step: 2,
            icon: ImageIcon,
            label: "Upload Images",
            description: "Add your profile pictures",
        },
        {
            step: 3,
            icon: CheckIcon,
            label: "Completed",
            description: "Review and submit account",
        },
    ];

    const handleNextStep = () => {
        setActiveStep((prev) => prev + 1);
    };

    return (
        <div className="mx-auto max-w-xl space-y-12 text-center mt-4">
            <Stepper
                value={activeStep}
                onValueChange={setActiveStep}
                separatorWidth={100}
            >
                {steps.map(({ step, icon: Icon, label, description }, index) => (
                    <Stepper.Item key={step} step={step}>
                        <Stepper.Trigger asChild>
                            <div className="flex flex-col items-center">
                                <div
                                    className={`p-2 size-8 rounded-lg flex items-center justify-center bg-muted text-gray-500 group-data-[state=completed]/step:bg-accent group-data-[state=active]/step:bg-accent group-data-[state=completed]/step:text-white group-data-[state=active]/step:text-white`}
                                >
                                    <Icon className="size-4" />
                                </div>
                                <div className="mt-2 space-y-1 sm:w-32">
                                    <Stepper.Title
                                        className={`${step <= activeStep
                                            ? "text-accent"
                                            : "text-gray-500"
                                            } font-medium`}
                                    >
                                        {label}
                                    </Stepper.Title>
                                    <Stepper.Description
                                        className={`max-sm:hidden ${step <= activeStep
                                            ? "text-accent"
                                            : "text-gray-400"
                                            } text-sm`}
                                    >
                                        {description}
                                    </Stepper.Description>
                                </div>
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

StepperLabeled.displayName = "StepperLabeled";