import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BackgroundPaths from './BackgroundPaths';

const TARGET_DATE = new Date();
TARGET_DATE.setMonth(TARGET_DATE.getMonth() + 2);

export default function Hero({ onPrimary }: { onPrimary: () => void }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  function getTimeLeft() {
    const diff = TARGET_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  return (
    <section id="top" className="relative h-[92vh] md:h-screen">
      <div className="absolute inset-0 overflow-hidden bg-black">
        <BackgroundPaths />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(8,66,165,0.15)_0%,_rgba(0,0,0,0.8)_50%,_rgba(0,0,0,1)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#0842a5]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#a00b0b]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 h-full flex flex-col">

        <div className="flex-1 flex items-center relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              >
                <div className="relative flex justify-center">
                  <motion.img
                    src="/Logo_PKI.png"
                    alt="Paris Kart Indoor"
                    className="w-full max-w-md lg:max-w-lg drop-shadow-[0_0_60px_rgba(8,66,165,0.6)] object-contain"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                  <div className="absolute -inset-8 bg-gradient-to-r from-[#0842a5]/20 to-[#a00b0b]/20 blur-3xl -z-10 opacity-70" />
                </div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                  className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-center w-full"
                >
                  <motion.button
                    onClick={onPrimary}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="px-6 sm:px-10 py-3 sm:py-4 rounded-xl bg-black font-bold text-base sm:text-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto text-center"
                  >
                    Rejoindre la réouverture
                  </motion.button>
                  <motion.a
                    href="#story"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="px-6 sm:px-10 py-3 sm:py-4 rounded-xl bg-black font-bold text-base sm:text-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto text-center"
                  >
                    Découvrir l'histoire
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
