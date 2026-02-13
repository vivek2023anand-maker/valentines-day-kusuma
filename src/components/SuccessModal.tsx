
import { motion } from 'framer-motion';
import Confetti from './Confetti';

interface SuccessModalProps {
  onClose: () => void;
}

export default function SuccessModal({ onClose }: SuccessModalProps) {
  const message = [
    "Kusuma…",
    "From our first trip to the lake,",
    "to our first Diwali rangoli together,",
    "to every smile we've shared…",
    "",
    "You are my forever."
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-40 p-4"
      onClick={onClose}
    >
      <Confetti />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="bg-gradient-to-br from-pink-100 via-rose-50 to-amber-50 rounded-3xl shadow-2xl p-12 max-w-2xl mx-auto text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-4">
          {message.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.5, duration: 0.6 }}
              className={`${
                index === 0
                  ? 'text-4xl font-bold text-pink-600'
                  : index === message.length - 1
                  ? 'text-3xl font-semibold text-rose-600 mt-8'
                  : 'text-xl text-gray-700'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          onClick={onClose}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
        >
          Continue
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
