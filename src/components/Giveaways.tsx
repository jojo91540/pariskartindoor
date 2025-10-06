import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Gift, Sparkles, Crown } from 'lucide-react';

const GIVEAWAYS = [
  {
    title: 'Première session gratuite',
    desc: 'Sois parmi les premiers à rouler lors de la réouverture.',
    slug: 'session-gratuite',
    icon: Gift,
  },
  {
    title: 'Soirée d\'ouverture VIP',
    desc: 'Invitation exclusive + tour de piste avant tout le monde.',
    slug: 'vip-opening',
    icon: Sparkles,
  },
  {
    title: 'Casque custom PKI',
    desc: 'Un casque édition limitée aux couleurs Paris Kart Indoor.',
    slug: 'casque-custom',
    icon: Crown,
  },
];

export default function Giveaways({ onEnter }: { onEnter: (slug: string) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-12 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#a00b0b]/10 to-black" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none pb-8"
      >
        <div className="relative w-full max-w-6xl px-6">
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#a00b0b]/20 blur-[150px] rounded-full" />
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#0842a5]/15 blur-[120px] rounded-full" />
          <motion.img
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            src="/Kart.png"
            alt="Kart"
            className="w-full max-w-4xl mx-auto h-auto object-contain relative z-0 drop-shadow-[0_0_120px_rgba(160,11,11,0.5)]"
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-12 bg-black/60 blur-2xl rounded-full" />
        </div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Gagne des{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a00b0b] to-[#a00b0b]/80">
              cadeaux exclusifs
            </span>
          </h2>
          <p className="text-white/70 text-base md:text-lg">
            Inscris-toi maintenant et tente de gagner l'un de ces prix réservés aux early adopters.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {GIVEAWAYS.map((giveaway, i) => {
            const Icon = giveaway.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.95, y: 0 }}
                className="relative group cursor-pointer"
                onClick={() => onEnter(giveaway.slug)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#a00b0b]/20 to-[#a00b0b]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 ease-out" />
                <div className="relative bg-white/5 backdrop-blur border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-8 hover:border-[#a00b0b]/50 hover:bg-white/10 transition-all duration-300 ease-out">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#a00b0b] to-[#a00b0b]/80 flex items-center justify-center mb-2 md:mb-6">
                    <Icon className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-3">{giveaway.title}</h3>
                  <p className="text-xs md:text-base text-white/60 mb-2 md:mb-6">{giveaway.desc}</p>
                  <div className="text-xs md:text-base text-[#a00b0b] font-medium group-hover:text-[#a00b0b]/80 transition-colors duration-200">
                    Participer →
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
