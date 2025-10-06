import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Trophy, Clock } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Karts électriques nouvelle génération',
    desc: 'Performance maximale, zéro émission',
  },
  {
    icon: Trophy,
    title: 'Circuit repensé et optimisé',
    desc: 'Plus rapide, plus technique, plus fun',
  },
  {
    icon: Clock,
    title: 'Système de chronométrage pro',
    desc: 'Suis tes performances en temps réel',
  },
];

export default function CircuitTeaser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-12 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0842a5]/20 to-black" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(/Kart.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6">
            Tout est nouveau. Tout est{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0842a5] to-[#0842a5]/80">
              amélioré
            </span>
          </h2>
          <p className="text-white/70 text-base md:text-lg">
            Nous avons repensé chaque détail pour offrir la meilleure expérience de karting indoor de Paris.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0842a5]/20 to-[#a00b0b]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 ease-out" />
                <div className="relative bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 md:p-8 hover:border-white/20 hover:bg-white/10 transition-all duration-300 ease-out">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#0842a5] to-[#a00b0b] flex items-center justify-center mb-4 md:mb-6">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{feature.title}</h3>
                  <p className="text-sm md:text-base text-white/60">{feature.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
