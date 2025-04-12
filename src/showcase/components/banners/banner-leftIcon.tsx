'use client';

import React from 'react';

import { Banner } from '@/components/extendui/banner';

export default function BannerLeftIcon() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border">
      <Banner variant={'default'} position={'top'}>
        <Banner.LeftIcon>🚀</Banner.LeftIcon>
        <Banner.Description position="center">
          <div className="flex items-center justify-center">
            Banner component
          </div>
        </Banner.Description>
      </Banner>
      <div className="flex h-full min-h-[150px] items-center justify-center" />
    </div>
  );
}
