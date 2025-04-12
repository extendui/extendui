'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

import ContactDialog from '@/app/pricing/_components/contact-dialog';
import { cn } from '@/lib/utils';

type Props = {
  plan: {
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
};

const variants = {
  badge: {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1.2 },
    },
  },
  card: {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
};

export default function PricingCard({ plan }: Props) {
  return (
    <div className="relative mt-12 flex h-full flex-col pb-2 text-start">
      {plan.featured && (
        <motion.div
          className="absolute -top-7 left-0"
          variants={variants.badge}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
        >
          <div className="bg-accent rounded-l-3xl rounded-r-xl px-4 py-1.5 pb-12 pl-6 text-sm font-medium text-white">
            Most Popular
          </div>
        </motion.div>
      )}
      <motion.div
        className={cn(
          'z-10 flex w-full grow flex-col rounded-3xl p-6',
          plan.featured
            ? 'bg-linear-to-b from-gray-800 to-gray-900 text-white'
            : 'bg-background',
        )}
        variants={variants.card}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <p className="text-xl font-medium">{plan.title}</p>
          <p className="text-sm text-gray-400">{plan.description}</p>
        </div>
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold">
              {plan.price === 'Custom' ? plan.price : `$${plan.price}`}
            </span>
            <span className="ml-2 text-lg text-gray-400">{plan.interval}</span>
          </div>
          <p className="text-sm text-gray-400">{plan.priceTagline}</p>
        </div>
        <div className="mb-6">
          <ContactDialog />
        </div>
        <ul className="grow space-y-3">
          {plan.features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-start space-x-3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  delay: index * 0.1 + 0.2,
                }}
              >
                <Check className="text-accent h-4 w-4" />
              </motion.span>
              <p className="text-sm">{feature}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
