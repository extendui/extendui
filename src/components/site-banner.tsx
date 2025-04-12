'use client';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Banner } from './extendui/banner';

export function SiteBanner() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="md:py-0">
      <div className="container h-12 flex-row items-center justify-center gap-4">
        <Banner
          position="top"
          variant="primary"
          width="default"
          link="https://animated.extend-ui.com/"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="bg-accent/90"
        >
          <Banner.Description
            position="center"
            className="flex items-center justify-center gap-2 font-[400] text-white no-underline hover:no-underline"
          >
            ✨ Check out our new product Animated!
            <ArrowRight
              size={16}
              className={cn(
                'transition-transform duration-300',
                isHovered && 'translate-x-1',
              )}
            />
          </Banner.Description>
        </Banner>
      </div>
    </div>
  );
}
