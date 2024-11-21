'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

import ContactDialog from '../contact-dialog';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

import { Button } from './button';

type PricingPlan = {
  title: string;
  description: string;
  buttonText: string;
  href?: string;
  features: string[];
  price: string;
  interval: string;
  priceTagline: string;
  featured?: boolean;
};

export default function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div className="flex h-full items-center justify-center">
      <Card
        className={`relative flex h-full flex-col ${
          plan.featured
            ? 'border-primary bg-gradient-to-b from-gray-800 to-gray-900 text-white'
            : 'bg-background'
        }`}
      >
        <CardHeader className="flex flex-col gap-2 p-6 text-left">
          <p
            className={`text-sm font-medium text-primary ${
              plan.featured && 'text-white'
            }`}
          >
            {plan.title}
          </p>
          <div>
            {plan.priceTagline && (
              <div
                className={`text-sm text-muted-foreground ${
                  plan.featured && 'text-neutral-200'
                }`}
              >
                {plan.priceTagline}
              </div>
            )}
            <div className="flex items-baseline gap-1">
              <span className="bg-gradient-to-t from-accent to-accent/[0.8] bg-clip-text text-3xl font-bold text-transparent">
                {plan.price}
              </span>
              {plan.interval && (
                <span
                  className={`text-muted-foreground ${
                    plan.featured && 'text-neutral-200'
                  }`}
                >
                  {plan.interval}
                </span>
              )}
            </div>
          </div>
          <p
            className={`text-sm text-muted-foreground ${
              plan.featured && 'text-neutral-200'
            }`}
          >
            {plan.description}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-6">
          <ul className="mb-6 space-y-3 text-left text-xs">
            {plan.features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-x-3"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.span
                  className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    delay: index * 0.1 + 0.2,
                  }}
                >
                  <Check className="h-3 w-3 text-white" />
                </motion.span>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="mt-auto flex flex-col gap-2 p-6">
          <Button
            className={`w-full ${
              plan.featured &&
              'border-primary bg-gradient-to-b from-zinc-100 to-zinc-300 text-black'
            }`}
            variant={plan.featured ? 'default' : 'outline'}
            asChild
          >
            {plan.href ? (
              <Link href={plan.href}>{plan.buttonText}</Link>
            ) : (
              <ContactDialog featured={plan.featured} />
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
