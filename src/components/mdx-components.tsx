/* eslint-disable ts/ban-ts-comment */
// @ts-nocheck
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import type { NpmCommands } from '../types/unist.type';

import type { Event } from '@/lib/events';
import { cn } from '@/lib/utils';
import { useConfig } from '@/hooks/use-config';
import { Callout } from '@/components/callout';
import { CodeBlockWrapper } from '@/components/code-block-wrapper';
import { ComponentSource } from '@/components/component-source';
import { CopyButton, CopyNpmCommandButton } from '@/components/copy-button';
import { FrameworkDocs } from '@/components/framework-docs';
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
import type { Style } from '@/registry/styles';
import { PropsTable } from '@/components/props-table';
import Preview from './preview';
import ButtonExample from '@/showcase/components/button/button';
import ButtonSettingsEngine from '@/showcase/components/button/settings-engine';

import '@/styles/mdx.css'; // Import the MDX styles
import { PreCustom } from './pre-custom';
import ButtonAnimated, {
  AnimatedButton,
  RotatingButton,
} from '@/components/extendedui/button/button-rotating';
import { ScalingButton } from '@/components/extendedui/button/button-scaling';
import { Rotating3DButton } from '@/components/extendedui/button/button-3d-rotating';
import { BouncingButton } from '@/components/extendedui/button/button-bouncing';
import { PulsatingShadowButton } from '@/components/extendedui/button/button-pulsating';
import PricingCard from '@/showcase/blocks/cards/pricing-card';
import CreditCard from '@/showcase/blocks/cards/credit-card';
import InputExample from '@/showcase/components/input/input';
import InputSettingsEngine from '@/showcase/components/input/settings-engine';
import FileUpload from '@/showcase/blocks/cards/file-upload';
import { Input } from './ui/input';
import { Icons } from './icons/icons';
import { InputIconLeft } from '@/components/extendedui/input/input-iconLeft';
import { InputIconRight } from '@/components/extendedui/input/input-iconRight';


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
  Callout,
  PropsTable,
  ComponentSource,
  FrameworkDocs,
  StyleWrapper,
  Image,
  ButtonExample,
  ScalingButton,
  BouncingButton,
  PulsatingShadowButton,
  RotatingButton,
  Rotating3DButton,
  PricingCard,
  CreditCard,
  Icons,
  FileUpload,
  ButtonSettingsEngine,
  InputExample,
  InputSettingsEngine,
  Input,
  InputIconLeft,
  InputIconRight,
  ComponentInstallation: (props: any) => <ComponentInstallation {...props} />,
  ComponentSource: (props: any) => <ComponentSource {...props} />,
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
  FrameworkDocs: ({
    className,
    ...props
  }: React.ComponentProps<typeof FrameworkDocs>) => (
    <FrameworkDocs className={cn(className)} {...props} />
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
