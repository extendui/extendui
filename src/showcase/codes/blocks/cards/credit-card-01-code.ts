export function getCreditCard01Code() {
    return `
'use client';

import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function CreditCard() {
  const [isCardNumberVisible, setIsCardNumberVisible] = useState(false);
  const fullCardNumber = '4111 1111 1111 9743';
  const maskedCardNumber = '**** **** **** 9743';
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative h-48 w-80 overflow-hidden rounded-xl bg-lime-300 p-6 shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-2xl font-bold text-blue-900"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          VISA
        </motion.div>

        <motion.div
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200 hover:cursor-pointer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 500 }}
          onClick={() => setIsCardNumberVisible(!isCardNumberVisible)}
        >
          {isCardNumberVisible ? (
            <EyeOff className="h-4 w-4 text-blue-900" />
          ) : (
            <Eye className="h-4 w-4 text-blue-900" />
          )}
        </motion.div>

        {isCardNumberVisible ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="fullNumber"
            className="font-bold text-blue-900"
          >
            {fullCardNumber}
          </motion.span>
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="maskedNumber"
            className="font-bold text-blue-900"
          >
            {maskedCardNumber}
          </motion.span>
        )}
        <div className="mt-6 flex justify-between">
          <motion.div
            className="text-blue-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="text-xs">Holder</div>
            <div className="font-semibold">John Doe</div>
          </motion.div>
          <motion.div
            className="text-blue-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="text-xs">Exp Date</div>
            {isCardNumberVisible ? (
              <div className="font-semibold">12/24</div>
            ) : (
              <div className="font-semibold">**/**</div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
  `;
  }
  