import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import SuccessModal from "./components/SuccessModal";
import MemoryCard from "./components/MemoryCard";
import FloatingHearts from "./components/FloatingHearts";

function App() {
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number; y: number } | null>(null);
  const [noAttempts, setNoAttempts] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [acceptedProposal, setAcceptedProposal] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showMessage, setShowMessage] = useState(false);

  
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const lastMoveTimeRef = useRef(0);

  const memories = [
    {
      imageUrl: "/memory1.JPG",
      caption: `Our first trip, where the lake reflected the sky…\nand my heart reflected you.`,
    },
    {
      imageUrl: "/memory2.jpeg",
      caption: `Our first Diwali together,\nyou lit my world brighter than a thousand diyas.`,
    },
    {
      imageUrl: "/memory3.JPG",
      caption: `Every candle reminds me how you light up my life.`,
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!noButtonPosition || noAttempts >= 5) return;

    const now = Date.now();
    if (now - lastMoveTimeRef.current < 100) return;
    lastMoveTimeRef.current = now;

    const button = noButtonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();

    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(e.clientX - buttonCenterX, 2) +
        Math.pow(e.clientY - buttonCenterY, 2)
    );

    if (distance < 150) {
      const angle = Math.atan2(
        buttonCenterY - e.clientY,
        buttonCenterX - e.clientX
      );

      const moveDistance = 180;

      const newX = rect.left + Math.cos(angle) * moveDistance;
      const newY = rect.top + Math.sin(angle) * moveDistance;

      const maxX = window.innerWidth - rect.width - 20;
      const maxY = window.innerHeight - rect.height - 20;

      setNoButtonPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });

      setNoAttempts((prev) => prev + 1);
    }
  };

  const handleYesClick = () => {
    setShowModal(true);
    setTimeout(() => {
      setAcceptedProposal(true);
    }, 3500);
  };

  const yesButtonScale = 1 + noAttempts * 0.12;
  //const noButtonScale = Math.max(0.4, 1 - noAttempts * 0.12);

  useEffect(() => {
    document.title = "Will You Be My Valentine? 💖";
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-amber-50 overflow-x-hidden"
    >
      <FloatingHearts />

      {!acceptedProposal ? (
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <div className="text-center max-w-2xl mx-auto">

            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-8"
            >
              <Heart size={80} className="fill-pink-500 text-pink-500" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent">
              Will You Be My Valentine, Kusuma?
            </h1>

            <div className="flex items-center justify-center gap-2 mb-12">
              <Sparkles className="text-amber-500" size={24} />
              <p className="text-xl italic text-gray-700">
                You are the sweetest chapter of my life.
              </p>
              <Sparkles className="text-amber-500" size={24} />
            </div>

            {/* BUTTONS */}
            <div className="flex items-center justify-center gap-8 mt-10">

              {/* YES */}
              <motion.button
                whileHover={{ scale: yesButtonScale * 1.05 }}
                whileTap={{ scale: yesButtonScale * 0.95 }}
                animate={{ scale: yesButtonScale }}
                onClick={handleYesClick}
                className="px-12 py-6 bg-gradient-to-r from-pink-500 to-red-500 text-white text-2xl font-bold rounded-full shadow-2xl"
              >
                YES 💘
              </motion.button>

              {/* NO */}
{noAttempts < 8 && (
  <motion.button
    ref={noButtonRef}
    onMouseEnter={() => {
      if (noAttempts >= 8) return;
      
      // Show cute message
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
  
      // Generate random position far from current position
      const randomX = (Math.random() - 0.5) * 500;
      const randomY = (Math.random() - 0.5) * 400;
  
      setNoPosition({ x: randomX, y: randomY });
      setNoAttempts((prev) => prev + 1);
    }}
    animate={{
      x: noPosition.x,
      y: noPosition.y,
      scale: Math.max(0.3, 1 - noAttempts * 0.08),
      opacity: Math.max(0.4, 1 - noAttempts * 0.07)
    }}
    transition={{ 
      type: "spring", 
      stiffness: 150,
      damping: 15,
      mass: 0.5
    }}
    style={{
      position: noAttempts > 0 ? 'absolute' : 'relative'
    }}
    className="px-10 py-5 bg-gray-400 text-white text-xl font-semibold rounded-full shadow-lg cursor-pointer"
  >
    NO 😢
  </motion.button>
              
              )}
            </div>

            {/* Teasing messages */}
            {noAttempts > 0 && noAttempts < 8 && (
              <p className="mt-10 text-pink-600 italic text-lg">
                {noAttempts === 1 && "Are you sure? 🥺"}
                {noAttempts === 2 && "Please reconsider... 💔"}
                {noAttempts === 3 && "My heart is fragile... 😢"}
                {noAttempts === 4 && "I believe in you! ✨"}
                {noAttempts === 5 && "Almost there... maybe yes? 🦋"}
                {noAttempts === 6 && "Last chance! Pretty please? 🌈"}
                {noAttempts === 7 && "This is destiny. Just press YES. 😌"}
              </p>
            )}

            {noAttempts >= 8 && (
              <p className="mt-10 text-2xl text-pink-600 font-semibold">
                I knew you'd say YES 💖
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full px-6 py-20">
      
          <h2 className="text-5xl font-bold text-center mb-16 text-pink-600">
            Happy Valentine’s Day 💖
          </h2>
      
          {/* IMAGES GRID */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {memories.map((memory, index) => (
                <MemoryCard
                  key={index}
                  imageUrl={memory.imageUrl}
                  caption={memory.caption}
                  delay={index * 0.3}
                />
              ))}
            </div>
          </div>
      
          {/* SIGNATURE SECTION (NOW FULL WIDTH + CENTERED) */}
          <div className="w-full flex justify-center mt-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center text-center"
            >
      
              {/* Names Row */}
              <div className="flex items-center justify-center gap-20 text-3xl md:text-4xl font-semibold">
      
                {/* Vivekanand */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center text-pink-700"
                >
                  <span className="text-xl mb-1">✍️</span>
                  Vivekanand
                </motion.div>
      
                {/* Heart */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-red-500 text-5xl"
                >
                  ❤️
                </motion.div>
      
                {/* Kusuma */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center text-rose-700"
                >
                  <span className="text-xl mb-1">✍️</span>
                  Kusuma
                </motion.div>
      
              </div>
      
              {/* Seal */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-pink-500 italic text-lg"
              >
                Sealed with love 💌
              </motion.p>
      
            </motion.div>
          </div>
      
        </div>
      )
      }

      <AnimatePresence>
        {showModal && !acceptedProposal && (
          <SuccessModal onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
