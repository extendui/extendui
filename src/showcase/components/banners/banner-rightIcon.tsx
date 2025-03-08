'use client';

import React from 'react';

import { Banner } from '@/components/extendui/banner';

export default function BannerRightIcon() {
    return (
        <div className="relative h-full w-full overflow-hidden rounded-lg border">
            <Banner
                variant={'default'}
                position={'top'}
            >
                <Banner.Description position="center">
                    <div className="flex justify-center items-center gap-2">
                        Banner component
                    </div>
                </Banner.Description>
                <Banner.RightIcon>🚀</Banner.RightIcon>
            </Banner>
            <div className="flex h-full min-h-[150px] items-center justify-center">
                <p className="text-muted-foreground">Content Area</p>
            </div>
        </div>
    )
}