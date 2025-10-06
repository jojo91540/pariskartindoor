import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock } from 'lucide-react';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    id: number;
    title: string;
    date: string;
    content: string;
    readTime: string;
  } | null;
}

export default function ArticleModal({ isOpen, onClose, article }: ArticleModalProps) {
  if (!article) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-gradient-to-b from-gray-900 to-black border border-white/20 rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden pointer-events-auto shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="p-8 overflow-y-auto max-h-[80vh]">
                <div className="flex items-center gap-4 mb-4 text-sm text-white/50">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(article.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#0842a5] to-[#a00b0b]">
                  {article.title}
                </h2>

                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 leading-relaxed text-lg whitespace-pre-line">
                    {article.content}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
