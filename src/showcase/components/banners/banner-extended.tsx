'use client';

import React from 'react';

import { Banner } from '@/components/extendui/banner';

export default function BannerExtended() {
    return (
        <div className="relative h-full w-full overflow-hidden rounded-lg border">
            <Banner
                variant={'default'}
                position={'top'}
                link="#"
            >
                <Banner.Description position="center">
                    Banner component
                </Banner.Description>
                <Banner.Dismiss />
            </Banner>
            <div className="flex h-full min-h-[150px] items-center justify-center">
                <p className="text-muted-foreground">Content Area</p>
            </div>
        </div>
    )
}