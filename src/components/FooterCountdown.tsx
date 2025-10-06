import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FooterCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 1, hours: 1, minutes: 1, seconds: 1 });

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(prev => ({
        days: prev.days >= 99 ? 1 : prev.days + 1,
        hours: prev.hours >= 23 ? 0 : prev.hours + 1,
        minutes: prev.minutes >= 59 ? 0 : prev.minutes + 1,
        seconds: prev.seconds >= 59 ? 0 : prev.seconds + 1,
      }));
    }, 100);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="py-20 relative border-t border-white/10 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-5xl font-bold mb-8 md:mb-12">
            <span className="text-white">Réouverture </span>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">dans</span>
          </h3>

          <div className="flex justify-center gap-3 md:gap-10 mb-10 md:mb-16">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <motion.div
                key={unit}
                className="text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-xl md:rounded-2xl blur-lg md:blur-xl opacity-60 group-hover:opacity-80 transition-all duration-300" />
                  <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl border-2 border-blue-400/30 rounded-xl md:rounded-2xl p-3 md:p-8 min-w-[60px] md:min-w-[120px] shadow-2xl group-hover:border-blue-400/50 transition-all duration-300">
                    <div className="text-2xl md:text-6xl font-bold bg-gradient-to-br from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]">
                      {String(value).padStart(2, '0')}
                    </div>
                  </div>
                </div>
                <div className="text-cyan-300/90 text-xs md:text-base mt-2 md:mt-4 capitalize font-semibold tracking-wider">
                  {unit === 'days' ? 'jours' : unit === 'hours' ? 'heures' : unit === 'minutes' ? 'minutes' : 'secondes'}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base md:text-lg"
          >
            <p className="font-bold text-xl md:text-3xl bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-2 md:mb-3">Paris Kart Indoor 2025</p>
            <p className="text-gray-400 text-base md:text-lg">Le retour d'une légende</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
