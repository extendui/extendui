export function getPricingCardCode() {
    return `
'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

import { ScalingButton } from '@/showcase/components/button/button-scaling';

export default function PricingCard() {
  const features = [
    '2 Senior Developers',
    'Landing Page Development',
    '15-20 Days Service (One time)',
    'Private Discord Channel',
    'One Request at a time',
  ];

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-full max-w-md rounded-3xl bg-gradient-to-b from-gray-800 to-gray-900 p-6 text-white shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-2 text-2xl font-bold">Extend MVP</h2>
        <div className="mb-4 flex items-baseline">
          <span className="text-5xl font-extrabold">$3000</span>
          <span className="ml-2 text-xl">/month</span>
        </div>
        <p className="mb-6 text-gray-400">Product Development</p>
        <ul className="mb-6 space-y-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-center space-x-3"
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
        <ScalingButton className="w-full bg-white text-black hover:bg-white/90">
          Order Now
        </ScalingButton>
      </motion.div>
    </div>
  );
}

  `;
  }
  