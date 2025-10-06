import { motion } from 'framer-motion';
import { Calendar, Flag, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import ArticleModal from './ArticleModal';

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  type: 'article' | 'opening';
  content?: string;
  readTime?: string;
}

const TARGET_OPENING_DATE = new Date();
TARGET_OPENING_DATE.setMonth(TARGET_OPENING_DATE.getMonth() + 2);

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    title: "Une nouvelle ère commence",
    date: "2025-09-15",
    type: 'article',
    readTime: "3 min",
    content: `Après plusieurs mois de travaux intensifs, Paris Kart Indoor s'apprête à rouvrir ses portes avec des installations entièrement modernisées. Notre équipe a travaillé sans relâche pour vous offrir une expérience de karting indoor incomparable.

Nous avons repensé chaque aspect de notre centre pour garantir votre sécurité et votre plaisir. Des vestiaires rénovés aux zones d'accueil repensées, en passant par un système de chronométrage de dernière génération, tout a été conçu pour vous offrir le meilleur.

Cette réouverture marque le début d'une nouvelle ère pour Paris Kart Indoor, et nous sommes impatients de vous accueillir pour partager cette passion de la vitesse et de la compétition.`
  },
  {
    id: 2,
    title: "Nos nouveaux karts électriques",
    date: "2025-09-20",
    type: 'article',
    readTime: "4 min",
    content: `Découvrez notre flotte de karts 100% électriques de nouvelle génération. Ces bolides silencieux offrent des performances exceptionnelles tout en respectant l'environnement.

Avec une accélération instantanée et une vitesse de pointe impressionnante, nos karts électriques vous garantissent des sensations fortes sans compromis. Le silence de fonctionnement permet également une meilleure communication entre pilotes et une expérience plus immersive.

Chaque kart est équipé de technologies avancées incluant un système de télémétrie en temps réel, vous permettant d'analyser vos performances et de progresser course après course. Les batteries haute capacité assurent une autonomie optimale pour des sessions de course prolongées.

Nous avons également mis en place un système de réglage personnalisé pour adapter chaque kart à votre niveau et à votre style de pilotage.`
  },
  {
    id: 3,
    title: "Un circuit repensé",
    date: "2025-09-28",
    type: 'article',
    readTime: "5 min",
    content: `Notre circuit a été entièrement redessiné par des experts en sports mécaniques pour offrir le parfait équilibre entre technique et vitesse.

Avec ses 450 mètres de piste, le nouveau tracé propose des virages techniques variés, des lignes droites stratégiques et des zones de dépassement étudiées pour favoriser les courses spectaculaires. Chaque virage a été pensé pour mettre à l'épreuve votre technique de pilotage.

Le revêtement de dernière génération offre une adhérence optimale et constante, permettant des trajectoires précises et des freinages tardifs. L'éclairage LED ambiant crée une atmosphère unique tout en garantissant une visibilité parfaite à chaque instant.

Des systèmes de sécurité de pointe, incluant des barrières absorbant les chocs et un système de surveillance vidéo intégral, garantissent votre protection tout au long de la course.

Que vous soyez débutant ou pilote confirmé, notre nouveau circuit saura vous challenger et vous procurer des moments inoubliables.`
  },
  {
    id: 4,
    title: "Réouverture officielle",
    date: TARGET_OPENING_DATE.toISOString().split('T')[0],
    type: 'opening'
  }
];

export default function Timeline() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [selectedArticle, setSelectedArticle] = useState<TimelineEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleArticleClick = (event: TimelineEvent) => {
    if (event.type === 'article') {
      setSelectedArticle(event);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedArticle(null), 300);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  function getTimeLeft() {
    const diff = TARGET_OPENING_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  return (
    <section className="relative py-12 md:py-24 bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0842a5] to-[#a00b0b]">
              Actualités
            </span>
          </h2>
          <p className="text-white/60 text-base md:text-lg">
            Suivez l'évolution de notre projet et découvrez les nouveautés qui vous attendent
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0842a5] to-[#a00b0b] md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-12">
            {timelineEvents.map((event, index) => {
              const isOpening = event.type === 'opening';
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={event.id}
                  initial={{ x: isLeft ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
                >
                  <div className={`flex-1 ${isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} text-left w-full md:w-auto`}>
                    {isOpening ? (
                      <div className="bg-gradient-to-r from-[#0842a5] to-[#a00b0b] p-4 md:p-6 rounded-2xl border-2 border-white/20 shadow-2xl">
                        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                          <Flag className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          <h3 className="text-xl md:text-2xl font-bold text-white">{event.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                          {Object.entries(timeLeft).map(([unit, value]) => (
                            <div key={unit} className="bg-black/40 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-lg">
                              <div className="text-xl md:text-2xl font-bold text-white">{String(value).padStart(2, '0')}</div>
                              <div className="text-[10px] md:text-xs text-white/70 uppercase">
                                {unit === 'days' ? 'jours' : unit === 'hours' ? 'heures' : unit === 'minutes' ? 'min' : 'sec'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleArticleClick(event)}
                        className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-white/10 hover:border-[#0842a5]/50 transition-all duration-300 hover:bg-white/10 cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 mb-2 text-white/50">
                          <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          <span className="text-xs md:text-sm">
                            {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2">{event.title}</h3>
                        <div className="flex items-center gap-2 text-[#0842a5] group-hover:text-[#0842a5]/80 transition-colors mt-3">
                          <span className="text-xs md:text-sm font-medium">Lire l'article</span>
                          <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-4 border-black md:-translate-x-1/2 my-4 md:my-0"
                       style={{
                         background: 'linear-gradient(135deg, #0842a5 0%, #a00b0b 100%)'
                       }}>
                    <div className="absolute inset-0 rounded-full animate-ping opacity-75"
                         style={{
                           background: 'linear-gradient(135deg, #0842a5 0%, #a00b0b 100%)'
                         }} />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <ArticleModal
        isOpen={isModalOpen}
        onClose={closeModal}
        article={selectedArticle}
      />
    </section>
  );
}
