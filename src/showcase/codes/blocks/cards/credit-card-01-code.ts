export function getCreditCard01Code() {
  return `'use client';

import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const PERSPECTIVE = 400;
const CARD_ANIMATION_DURATION = 0.5;
const INITIAL_DELAY = 0.2;

const springTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 30,
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CreditCard01() {
  const [isVisible, setIsVisible] = useState(false);

  const cardData = {
    number: '4111 1111 1111 9743',
    holder: 'John Doe',
    expiry: '12/24',
  };

  const getMaskedNumber = (number: string) => {
    const lastFour = number.slice(-4);
    return \`**** **** **** \${lastFour}\`;
  };

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: CARD_ANIMATION_DURATION }}
        style={{ perspective: PERSPECTIVE }}
        className="relative touch-none"
      >
        <motion.div
          className="relative h-48 w-80 overflow-hidden rounded-xl bg-lime-300 p-6 shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: CARD_ANIMATION_DURATION }}
        >
          <div className="flex items-center justify-between">
            <motion.div
              className="text-2xl font-bold text-blue-900"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: INITIAL_DELAY, duration: CARD_ANIMATION_DURATION }}
            >
              VISA
            </motion.div>

            <motion.button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-200 hover:cursor-pointer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, ...springTransition }}
              onClick={() => setIsVisible(!isVisible)}
              aria-label={isVisible ? 'Hide card details' : 'Show card details'}
            >
              {isVisible ? <EyeOff className="h-4 w-4 text-blue-900" /> : <Eye className="h-4 w-4 text-blue-900" />}
            </motion.button>
          </div>

          <motion.div
            className="mt-2 text-xl font-medium tracking-wider text-blue-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {isVisible ? cardData.number : getMaskedNumber(cardData.number)}
          </motion.div>

          <div className="mt-6 flex justify-between">
            <motion.div
              className="text-blue-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: CARD_ANIMATION_DURATION }}
            >
              <div className="text-xs opacity-80">Card Holder</div>
              <div className="font-semibold">{cardData.holder}</div>
            </motion.div>

            <motion.div
              className="text-blue-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: CARD_ANIMATION_DURATION }}
            >
              <div className="text-xs opacity-80">Expires</div>
              <div className="font-semibold">{isVisible ? cardData.expiry : '**/**'}</div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}`;
}
