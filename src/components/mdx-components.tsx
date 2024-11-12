'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import * as React from 'react';

import { CodeBlockWrapper } from '@/components/code-block-wrapper';
import { ComponentSource } from '@/components/component-source';
import { FrameworkDocs } from '@/components/framework-docs';
import { PropsTable } from '@/components/props-table';
import { StyleWrapper } from '@/components/style-wrapper';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import '@/styles/mdx.css';
import { useConfig } from '@/hooks/use-config';
import { cn } from '@/lib/utils';
import CreditCard from '@/showcase/blocks/cards/credit-card-01';
import CreditCard2 from '@/showcase/blocks/cards/credit-card-02';
import PricingCard from '@/showcase/blocks/cards/pricing-card';
import FileUpload from '@/showcase/blocks/file-upload';
import SignIn from '@/showcase/blocks/sign-in';
import ButtonExample from '@/showcase/components/button/button';
import { Rotating3DButton } from '@/showcase/components/button/button-3d-rotating';
import { BouncingButton } from '@/showcase/components/button/button-bouncing';
import { PulsatingShadowButton } from '@/showcase/components/button/button-pulsating';
import { RotatingButton } from '@/showcase/components/button/button-rotating';
import { ScalingButton } from '@/showcase/components/button/button-scaling';
import { SendingButton } from '@/showcase/components/button/button-sending-01';
import { SendingButton02 } from '@/showcase/components/button/button-sending-02';
import ButtonSettingsEngine from '@/showcase/components/button/settings-engine';
import DatePickerExample from '@/showcase/components/date-picker/date-picker';
import DatePickerSettingsEngine from '@/showcase/components/date-picker/settings-engine';
import InputExample from '@/showcase/components/input/input';
import { InputButton } from '@/showcase/components/input/input-button';
import { InputClear } from '@/showcase/components/input/input-clear';
import { InputDecreaseIncrease } from '@/showcase/components/input/input-decrease-increase';
import { InputExtended } from '@/showcase/components/input/input-extended';
import FileInput from '@/showcase/components/input/input-file';
import { InputIconLeft } from '@/showcase/components/input/input-iconLeft';
import { InputIconRight } from '@/showcase/components/input/input-iconRight';
import { InputLabel } from '@/showcase/components/input/input-label';
import { InputPassword } from '@/showcase/components/input/input-password';
import { InputSelectLeft } from '@/showcase/components/input/input-selectLeft';
import { InputSelectRight } from '@/showcase/components/input/input-selectRight';
import InputSettingsEngine from '@/showcase/components/input/settings-engine';


import { Input } from './extendui/input';
import { Icons } from './icons/icons';
import { PreCustom } from './pre-custom';
import Preview from './preview';

function CustomLink(props: any) {
  const href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) return <a {...props} />;

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

const components = {
  Preview,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertTitle,
  AlertDescription,
  PropsTable,
  ComponentSource,
  FrameworkDocs,
  StyleWrapper,
  Image,
  ScalingButton,
  BouncingButton,
  PulsatingShadowButton,
  Rotating3DButton,
  RotatingButton,
  PricingCard,
  CreditCard,
  CreditCard2,
  Icons,
  FileUpload,
  SignIn,
  ButtonExample,
  ButtonSettingsEngine,
  DatePickerSettingsEngine,
  InputExample,
  InputSettingsEngine,
  Input,
  InputIconLeft,
  InputIconRight,
  InputPassword,
  InputLabel,
  InputClear,
  InputExtended,
  InputSelectRight,
  InputSelectLeft,
  InputButton,
  InputDecreaseIncrease,
  FileInput,
  DatePickerExample,
  SendingButton,
  SendingButton02,
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'font-heading mt-2 scroll-m-20 text-4xl font-bold',
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  a: (props: any) => (
    <CustomLink
      {...props}
      className="font-medium underline underline-offset-4"
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('my-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('my-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic', className)}
      {...props}
    />
  ),
  pre: PreCustom,
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'dark relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className,
      )}
      {...props}
    />
  ),
  AspectRatio,
  Spacer: ({ ...props }) => <div className="h-6" {...props} />,
  CodeBlockWrapper: ({ ...props }) => (
    <CodeBlockWrapper className="rounded-md border" {...props} />
  ),
  Step: ({ className, ...props }: React.ComponentProps<'h3'>) => (
    <h3
      className={cn(
        'font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),
  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
    <Tabs className={cn('relative mt-6 w-full', className)} {...props} />
  ),
  TabsList: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsList>) => (
    <TabsList
      className={cn(
        'w-full justify-start rounded-none border-b bg-transparent p-0',
        className,
      )}
      {...props}
    />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      className={cn(
        'relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none',
        className,
      )}
      {...props}
    />
  ),
  TabsContent: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        'relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold',
        className,
      )}
      {...props}
    />
  ),
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn('font-medium underline underline-offset-4', className)}
      {...props}
    />
  ),
  LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        'flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10',
        className,
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
};

interface MDXProps {
  code: string;
}

export function Mdx({ code }: MDXProps) {
  const [config] = useConfig();
  const Component = useMDXComponent(code, {
    style: config.style,
  });

  return (
    <div className="mdx max-w-none dark:prose-invert">
      <Component components={components} />
    </div>
  );
}
