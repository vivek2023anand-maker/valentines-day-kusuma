import { useState } from 'react';
import { Heart } from 'lucide-react';
import RosePetals from './components/RosePetals';
import SurpriseMessage from './components/SurpriseMessage';

function App() {
  const [showSurprise, setShowSurprise] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 overflow-hidden relative">
      <RosePetals />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-8 animate-fadeIn">
          <div className="space-y-4">
            <Heart className="w-16 h-16 text-rose-500 mx-auto animate-heartbeat" fill="currentColor" />

            <h1 className="text-5xl md:text-7xl font-bold text-rose-600 animate-slideDown">
              Happy Rose Day
            </h1>

            <h2 className="text-4xl md:text-6xl font-semibold text-rose-500 animate-slideDown" style={{ animationDelay: '0.2s' }}>
              Kusuma
            </h2>
          </div>

          <div className="relative inline-block animate-zoomIn" style={{ animationDelay: '0.4s' }}>
            <div className="absolute inset-0 bg-rose-400 blur-3xl opacity-30 animate-pulse"></div>
            <img
              src="/image.jpg"
              alt="Rose Day"
              className="relative w-80 md:w-96 h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 animate-float"
            />
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 rounded-full animate-bounce flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
          </div>

          <button
            onClick={() => setShowSurprise(true)}
            className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-red-500 text-white text-xl font-semibold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-bounce"
            style={{ animationDelay: '0.6s' }}
          >
            <span className="relative z-10">Click for a Surprise! 🌹</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <div className="flex gap-4 justify-center animate-fadeIn" style={{ animationDelay: '0.8s' }}>
            <div className="text-6xl animate-spin-slow">🌹</div>
            <div className="text-6xl animate-spin-slow" style={{ animationDelay: '0.3s' }}>🌹</div>
            <div className="text-6xl animate-spin-slow" style={{ animationDelay: '0.6s' }}>🌹</div>
          </div>
        </div>
      </div>

      <SurpriseMessage isOpen={showSurprise} onClose={() => setShowSurprise(false)} />
    </div>
  );
}

export default App;
