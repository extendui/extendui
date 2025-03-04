'use client';

import Autoplay from 'embla-carousel-autoplay';

import ComponentShowcaseCard from '@/components/component-showcase-card';
import FadeUp from '@/components/fadeup';
import { BannerPlaceholder } from '@/components/placeholders/banner-placeholder';
import { ButtonPlaceholder } from '@/components/placeholders/button-placeholder';
import { CardsPlaceholder } from '@/components/placeholders/cards-placeholder';
import { CommandPlaceholder } from '@/components/placeholders/command-placeholder';
import { DatePickerPlaceholder } from '@/components/placeholders/date-picker-placeholder';
import { FileUploadPlaceholder } from '@/components/placeholders/file-upload-placeholder';
import { FormsPlaceholder } from '@/components/placeholders/forms-placeholder';
import { InputPlaceholder } from '@/components/placeholders/input-placeholder';
import { SelectPlaceholder } from '@/components/placeholders/select-placeholder';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const componentShowcases = [
  {
    href: '/docs/components/banner',
    title: 'Banner',
    description: '1+ variants',
    component: <BannerPlaceholder />
  },
  {
    href: '/docs/components/button',
    title: 'Button',
    description: '25+ variants',
    component: <ButtonPlaceholder />,
  },
  {
    href: '/docs/components/input',
    title: 'Input',
    description: '17+ variants',
    component: <InputPlaceholder />,
  },
  {
    href: '/docs/components/select',
    title: 'Select',
    description: '7+ variants',
    component: <SelectPlaceholder />,
  },
  {
    href: '/docs/components/command',
    title: 'Command',
    description: '3+ variants',
    component: <CommandPlaceholder />
  },
  {
    href: '/docs/components/date-picker',
    title: 'Date picker',
    description: '5+ variants',
    component: <DatePickerPlaceholder />
  },
];

const blockShowcases = [
  {
    href: '/docs/blocks/cards/pricing-card',
    title: 'Cards',
    description: '4 variants',
    component: <CardsPlaceholder />
  },
  {
    href: '/docs/blocks/file-upload',
    title: 'File Upload',
    description: '1 variant',
    component: <FileUploadPlaceholder />
  },
  {
    href: '/docs/blocks/forms/sign-in',
    title: 'Forms',
    description: '2 variants',
    component: <FormsPlaceholder />
  },
];

export default function ShowcaseSection() {
  return (
    <section
      id="components-showcase"
      className="container mx-auto max-w-7xl px-4 py-16"
    >
      <FadeUp duration={0.8} delay={0.1}>
        <h2 className="mb-8 text-center text-3xl font-bold">Components</h2>
      </FadeUp>
      <FadeUp duration={0.8} delay={0.1}>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3500,
            }),
          ]}
          className="mx-auto"
        >
          <CarouselContent>
            {componentShowcases.map(
              ({ href, title, description, component }, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <ComponentShowcaseCard
                      href={href}
                      title={title}
                      description={description}
                      component={component}
                    />
                  </div>
                </CarouselItem>
              ),
            )}
          </CarouselContent>

          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </FadeUp>
      <FadeUp duration={0.8} delay={0.1}>
        <h2 className="mb-8 mt-32 text-center text-3xl font-bold">Blocks</h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3500,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {blockShowcases.map(
              ({ href, title, description, component }, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <ComponentShowcaseCard
                      href={href}
                      title={title}
                      description={description}
                      component={component}
                    />
                  </div>
                </CarouselItem>
              ),
            )}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </FadeUp>
    </section>
  );
}
