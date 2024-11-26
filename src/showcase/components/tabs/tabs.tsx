import { motion, AnimatePresence, type Variants } from 'framer-motion';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types for form fields and tab data
interface FormField {
  id: string;
  label: string;
  type: 'text' | 'password' | 'email';
  defaultValue?: string;
}

interface TabData {
  title: string;
  description: string;
  fields: FormField[];
}

interface TabContentProps extends TabData {
  value: TabValue;
}

// Union type for tab values
type TabValue = 'account' | 'password';

// Types for animation variants

// Props for tab trigger wrapper
interface TabTriggerWrapperProps {
  value: TabValue;
  activeValue: TabValue;
  children: React.ReactNode;
}

export function AnimatedTabsDemo() {
  const [activeTab, setActiveTab] = useState<TabValue>('account');
  const [direction, setDirection] = useState<number>(0);

  const handleTabChange = (value: TabValue): void => {
    setDirection(value === 'account' ? -1 : 1);
    setActiveTab(value);
  };

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const inputVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1 },
    }),
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const TabContent: React.FC<TabContentProps> = ({
    value,
    title,
    description,
    fields,
  }) => (
    <motion.div
      key={value}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <Card>
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                className="space-y-1"
                variants={inputVariants}
                custom={index}
              >
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  type={field.type}
                  defaultValue={field.defaultValue}
                />
              </motion.div>
            ))}
          </CardContent>
          <CardFooter>
            <Button>
              Save {value === 'password' ? 'password' : 'changes'}
            </Button>
          </CardFooter>
        </motion.div>
      </Card>
    </motion.div>
  );

  const tabData: Record<TabValue, TabData> = {
    account: {
      title: 'Account',
      description:
        "Make changes to your account here. Click save when you're done.",
      fields: [
        {
          id: 'name',
          label: 'Name',
          type: 'text',
          defaultValue: 'Pedro Duarte',
        },
        {
          id: 'username',
          label: 'Username',
          type: 'text',
          defaultValue: '@peduarte',
        },
      ],
    },
    password: {
      title: 'Password',
      description:
        "Change your password here. After saving, you'll be logged out.",
      fields: [
        { id: 'current', label: 'Current password', type: 'password' },
        { id: 'new', label: 'New password', type: 'password' },
      ],
    },
  };

  const TabTriggerWrapper: React.FC<TabTriggerWrapperProps> = ({
    value,
    activeValue,
    children,
  }) => (
    <TabsTrigger
      value={value}
      className={`relative rounded-md px-2 py-1 text-sm font-medium text-gray-500 transition-colors duration-300 focus-within:outline-primary/50 ${activeValue === value ? 'text-primary' : 'hover:text-gray-900 dark:hover:text-gray-100'}`}
      onClick={() => handleTabChange(value)}
    >
      {children}
      {activeValue === value && (
        <motion.div
          layoutId="activeTab"
          className="absolute left-0 top-0 flex size-full h-full w-full items-end justify-center"
          transition={{
            type: 'spring',
            bounce: 0,
            delay: 0.1,
          }}
        >
          <span className="z-0 h-[3px] w-[60%] rounded-t-full bg-primary"></span>
        </motion.div>
      )}
    </TabsTrigger>
  );

  return (
    <Tabs value={activeTab} className="w-[400px]">
      <TabsList className="relative mb-2 flex w-full items-center justify-start bg-transparent">
        <TabTriggerWrapper value="account" activeValue={activeTab}>
          Account
        </TabTriggerWrapper>
        <TabTriggerWrapper value="password" activeValue={activeTab}>
          Password
        </TabTriggerWrapper>
      </TabsList>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <TabContent
            key={activeTab}
            value={activeTab}
            {...tabData[activeTab]}
          />
        </AnimatePresence>
      </div>
    </Tabs>
  );
}

export default AnimatedTabsDemo;
