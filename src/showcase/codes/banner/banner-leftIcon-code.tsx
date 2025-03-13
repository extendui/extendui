export function getBannerLeftIconCode() {
    return `'use client';

import React from 'react';
import { Banner } from '@/components/extendui/banner';

export default function BannerLeftIcon() {
    return (
        <div className="relative h-full w-full overflow-hidden rounded-lg border">
            <Banner
                variant={'default'}
                position={'top'}
                size={'lg'}
            >
                <Banner.LeftIcon>🚀</Banner.LeftIcon>
                <Banner.Description position="center">
                    Banner component
                </Banner.Description>
            </Banner>
            <div className="flex h-full min-h-[150px] items-center justify-center"/>
        </div>
    )
}`
}