import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const TESTIMONIALS = [
  {
    text: "Les meilleurs souvenirs de ma vie étaient à PKI. J'ai hâte de revenir !",
    author: "Marc L.",
  },
  {
    text: "Enfin ! Paris Kart Indoor était une institution. C'est une excellente nouvelle.",
    author: "Sophie M.",
  },
  {
    text: "J'y allais tous les mois. Le meilleur circuit indoor de la capitale, sans hésiter.",
    author: "Thomas D.",
  },
];

export default function SocialWall() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />

      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-10 w-96 h-96 bg-[#0842a5]/30 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#a00b0b]/30 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#0842a5]/20 to-[#a00b0b]/20 rounded-full blur-[150px]"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ils attendent ce moment depuis 3 ans
          </h2>
          <p className="text-white/70 text-lg">
            Rejoins la communauté PKI et reste connecté.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-300 ease-out"
            >
              <p className="text-white/80 mb-4 italic">"{testimonial.text}"</p>
              <p className="text-white/50 text-sm">— {testimonial.author}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="flex justify-center gap-4 md:gap-6"
        >
          <a
            href="#"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 hover:border-white/40 transition-all duration-300 ease-out"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <a
            href="#"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 hover:border-white/40 transition-all duration-300 ease-out"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <a
            href="#"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 hover:border-white/40 transition-all duration-300 ease-out"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
