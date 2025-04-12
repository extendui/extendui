'use client';

import { CreditCard } from 'lucide-react';
import { usePaymentInputs } from 'react-payment-inputs';
import images, { type CardImages } from 'react-payment-inputs/images';

import { Input } from '@/components/extendui/input';

export const CreditCardInput = () => {
  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs();

  return (
    <div className="space-y-2">
      <div className="rounded-lg">
        <div className="relative w-80 focus-within:z-10">
          <Input
            variant={'filled'}
            className="rounded-b-none"
            {...getCardNumberProps()}
          >
            <Input.Group>
              <Input.RightIcon>
                <div className="text-muted-foreground">
                  {meta.cardType ? (
                    <svg
                      className="overflow-hidden rounded-sm"
                      {...getCardImageProps({
                        images: images as unknown as CardImages,
                      })}
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
        <div className="-mt-px flex w-80 space-x-[2px]">
          <div className="w-1/2 flex-1 focus-within:z-10">
            <Input
              variant={'filled'}
              className="mt-1 rounded-e-none rounded-t-none"
              {...getExpiryDateProps()}
            />
          </div>
          <div className="-ms-px w-1/2 flex-1 focus-within:z-10">
            <Input
              variant={'filled'}
              className="mt-1 rounded-s-none rounded-t-none"
              {...getCVCProps()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
