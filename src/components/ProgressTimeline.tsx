import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ArticleModal from './ArticleModal';
import { RetroGrid } from './ui/shadcn-io/retro-grid';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  read_time: string;
  image_url: string;
  instagram_url?: string;
}

export default function ProgressTimeline() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <>
      <section className="relative py-24 bg-black overflow-hidden">
        <RetroGrid
          angle={65}
          cellSize={80}
          opacity={0.3}
          lightLineColor="#0842a5"
          darkLineColor="#0842a5"
          className="opacity-60"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Suivre </span>
              <span className="bg-gradient-to-r from-[#0842a5] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">l'avancement</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Découvrez les dernières actualités et avancées du projet dans l'ordre chronologique
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Aucune actualité disponible pour le moment</p>
            </div>
          ) : (
            <div className="relative">
              <div ref={scrollRef} className="relative overflow-x-auto pb-8 scrollbar-hide">
                <div className="flex gap-8 sm:gap-12 min-w-max px-4 py-12">
                  {articles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative flex flex-col items-center"
                    >
                      <a
                        href={article.instagram_url || 'https://www.instagram.com/p/DOngAJkjKPI/'}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute -top-12 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                      >
                        <Instagram className="w-5 h-5 text-white" />
                      </a>

                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedArticle(article)}
                        className="w-64 sm:w-80 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition-all duration-300"
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </motion.div>

                      <div className="mt-6 text-center max-w-xs">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {article.title}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {formatDate(article.date)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scroll('left')}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0842a5] to-[#3b82f6] text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-medium">Précédent</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scroll('right')}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0842a5] to-[#3b82f6] text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                >
                  <span className="font-medium">Suivant</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          )}
        </div>

        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-10 w-80 h-80 bg-[#0842a5]/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#a00b0b]/15 rounded-full blur-[100px]"
        />
      </section>

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </>
  );
}
