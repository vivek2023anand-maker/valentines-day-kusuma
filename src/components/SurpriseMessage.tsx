import { useEffect, useState } from 'react';
import { X, Heart, Sparkles } from 'lucide-react';

interface SurpriseMessageProps {
  isOpen: boolean;
  onClose: () => void;
}

function SurpriseMessage({ isOpen, onClose }: SurpriseMessageProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowContent(true), 100);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div
        className={`relative bg-gradient-to-br from-rose-100 via-pink-50 to-red-50 rounded-3xl shadow-2xl max-w-2xl w-full p-8 md:p-12 transform transition-all duration-500 ${
          showContent ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-lg z-10"
        >
          <X className="w-6 h-6 text-rose-600" />
        </button>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <Heart className="w-16 h-16 text-red-500 animate-heartbeat" fill="currentColor" />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin-slow" />
          </div>
        </div>

        <div className="mt-8 space-y-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-rose-600 animate-slideDown">
            My Dearest Kusuma
          </h2>

          <div className="flex justify-center gap-2 animate-zoomIn" style={{ animationDelay: '0.2s' }}>
            <Heart className="w-8 h-8 text-red-500 animate-heartbeat" fill="currentColor" />
            <Heart className="w-8 h-8 text-red-500 animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.2s' }} />
            <Heart className="w-8 h-8 text-red-500 animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.4s' }} />
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-200 via-pink-200 to-red-200 blur-2xl opacity-50 animate-pulse"></div>
            <p className="relative text-xl md:text-2xl text-gray-800 leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              You are my today, my tomorrow, and my forever. Thank you for being my strength, my happiness, and my greatest love story.
            </p>
          </div>

          <div className="flex gap-3 justify-center text-4xl animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <span className="animate-bounce">🌹</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>❤️</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🌹</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>❤️</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🌹</span>
          </div>

          <div className="pt-4 animate-zoomIn" style={{ animationDelay: '0.8s' }}>
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-full shadow-lg">
              <span className="text-lg font-semibold">Forever Yours</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-rose-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SurpriseMessage;
