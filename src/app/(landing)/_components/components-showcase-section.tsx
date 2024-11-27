'use client';

import Autoplay from 'embla-carousel-autoplay';
import { Upload } from 'lucide-react';

import ComponentShowcaseCard from '@/components/component-showcase-card';
import FadeUp from '@/components/fadeup';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ButtonExample from '@/showcase/components/button/button';
import { CommandExample } from '@/showcase/components/command/command';
import DatePickerExample from '@/showcase/components/date-picker/date-picker';
import { InputExample } from '@/showcase/components/input/input';
import { SelectExample } from '@/showcase/components/select/select';

const componentShowcases = [
  {
    href: '/docs/components/button',
    title: 'Button',
    description: '25+ variants',
    component: <ButtonExample />,
  },
  {
    href: '/docs/components/input',
    title: 'Input',
    description: '17+ variants',
    component: <InputExample />,
  },
  {
    href: '/docs/components/select',
    title: 'Select',
    description: '7+ variants',
    component: <SelectExample />,
  },
  {
    href: '/docs/components/command',
    title: 'Command',
    description: '3+ variants',
    component: <CommandExample />,
  },
  {
    href: '/docs/components/date-picker',
    title: 'Date picker',
    description: '5+ variants',
    component: <DatePickerExample />,
  },
];

const blockShowcases = [
  {
    href: '/docs/blocks/cards/pricing-card',
    title: 'Cards',
    description: '4 variants',
    component: (
      <Card className="w-[200px]">
        <div className="flex flex-col items-center justify-center space-y-3 p-6">
          <div className="h-2 w-4/5 rounded-sm bg-gray-300"></div>
          <div className="h-2 w-2/3 rounded-sm bg-gray-300"></div>
          <div className="flex w-full items-center justify-around gap-2">
            <span className="h-2 w-2 rounded-full bg-gray-300"></span>
            <div className="h-1 w-full rounded-sm bg-gray-300"></div>
          </div>{' '}
          <div className="flex w-full items-center justify-around gap-2">
            <span className="h-2 w-2 rounded-full bg-gray-300"></span>
            <div className="h-1 w-full rounded-sm bg-gray-300"></div>
          </div>{' '}
          <div className="flex w-full items-center justify-around gap-2">
            <span className="h-2 w-2 rounded-full bg-gray-300"></span>
            <div className="h-1 w-full rounded-sm bg-gray-300"></div>
          </div>
          <div className="h-4 w-1/3 rounded-sm bg-gray-300"></div>
        </div>
      </Card>
    ),
  },
  {
    href: '/docs/blocks/file-upload',
    title: 'File Upload',
    description: '1 variant',
    component: (
      <Card className="w-[200px]">
        <div className="space-y-3 p-6">
          <div className="flex h-10 w-full items-center justify-center rounded border-2 border-dashed border-gray-300">
            <Upload />
          </div>
        </div>
      </Card>
    ),
  },
  {
    href: '/docs/blocks/forms/sign-in',
    title: 'Forms',
    description: '2 variants',
    component: (
      <Card className="w-[200px]">
        <div className="flex flex-col items-center justify-center space-y-3 p-6">
          <div className="h-2 w-1/3 rounded-sm bg-gray-300"></div>
          <div className="h-3 w-1/2 rounded-sm bg-gray-300"></div>
          <div className="h-3 w-1/2 rounded-sm bg-gray-300"></div>
          <div className="h-3 w-1/2 rounded-sm bg-gray-300"></div>
          <div className="h-3 w-1/3 rounded-sm bg-gray-300"></div>
        </div>
      </Card>
    ),
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
