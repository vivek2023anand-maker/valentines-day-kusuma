import { motion } from 'framer-motion';

interface MemoryCardProps {
  imageUrl: string;
  caption: string;
  delay: number;
}

export default function MemoryCard({ imageUrl, caption, delay }: MemoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-xl overflow-hidden group"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt="Memory"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <p className="text-gray-700 text-center italic leading-relaxed whitespace-pre-line">
          {caption}
        </p>
      </div>
    </motion.div>
  );
}
