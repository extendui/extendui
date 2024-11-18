"use client";


import { CreditCard } from "lucide-react";
import { usePaymentInputs } from "react-payment-inputs";
import images, { type CardImages } from "react-payment-inputs/images";

import { Input } from "@/components/extendui/input";

export default function CreditCardInput() {
    const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps, getCardImageProps } =
        usePaymentInputs();

    return (
        <div className="space-y-2">
            <div className="rounded-lg">
                <div className="w-80 relative focus-within:z-10">
                    <Input
                        variant={"filled"}
                        className="rounded-b-none"
                        {...getCardNumberProps()}
                    >
                        <Input.Group>
                            <Input.RightIcon>
                                <div className="text-muted-foreground">
                                    {meta.cardType ? (
                                        <svg
                                            className="overflow-hidden rounded-sm"
                                            {...getCardImageProps({ images: images as unknown as CardImages })}
                                            width={20}
                                        />
                                    ) : (
                                        <CreditCard size={16} strokeWidth={2} aria-hidden="true" />
                                    )}
                                </div>
                            </Input.RightIcon>
                        </Input.Group>
                    </Input>
                </div>
                <div className="w-80 -mt-px flex space-x-[2px]">
                    <div className="w-1/2 flex-1 focus-within:z-10">
                        <Input
                            variant={"filled"}
                            className="rounded-e-none rounded-t-none mt-1"
                            {...getExpiryDateProps()}
                        />
                    </div>
                    <div className="-ms-px w-1/2 flex-1 focus-within:z-10">
                        <Input
                            variant={"filled"}
                            className="rounded-s-none rounded-t-none mt-1"
                            {...getCVCProps()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
