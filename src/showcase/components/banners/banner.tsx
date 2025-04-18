'use client';

import React, { useEffect, useState } from 'react';

import { Banner } from '@/components/extendui/banner';
import { useEngineSettingsBanner } from '@/zustand/stores/useEngineSettingsBanner';

export default function BannerDemo() {
  const bannerSettings = useEngineSettingsBanner();
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [bannerKey, setBannerKey] = useState(0);

  useEffect(() => {
    if (bannerSettings.visible) {
      setIsBannerDismissed(false);
      setBannerKey((prevKey) => prevKey + 1);
    }
  }, [bannerSettings]);

  const handleDismiss = () => {
    setIsBannerDismissed(true);
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border">
      {bannerSettings.visible && !isBannerDismissed && (
        <Banner
          key={bannerKey}
          variant={bannerSettings.variant}
          position={bannerSettings.position}
          size={bannerSettings.size}
          link="#"
          className={bannerSettings.className}
          onDismiss={handleDismiss}
        >
          <Banner.Description position="center">
            <div className="flex items-center justify-center">
              {bannerSettings.icon} {bannerSettings.title}
            </div>
          </Banner.Description>
          <Banner.Dismiss />
        </Banner>
      )}
      <div className="flex h-full min-h-[150px] items-center justify-center" />
    </div>
  );
}
