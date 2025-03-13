export function getBannerRightIconCode() {
    return `'use client';

import { ChatBubbleIcon } from '@radix-ui/react-icons';
import React from 'react';

export default function BannerRightIcon() {
    return (
        <div className="relative h-full w-full overflow-hidden rounded-lg border">
            <Banner
                variant={'default'}
                position={'top'}
                size={'lg'}
            >
                <Banner.RightIcon>🚀</Banner.RightIcon>
                <Banner.Description position="center">
                    Banner component
                </Banner.Description>
            </Banner>
            <div className="flex h-full min-h-[150px] items-center justify-center"/>
        </div>
    )
}`
}