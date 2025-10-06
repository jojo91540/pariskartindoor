import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const GIVEAWAYS = [
  { value: 'session-gratuite', label: 'Première session gratuite' },
  { value: 'vip-opening', label: 'Soirée d\'ouverture VIP' },
  { value: 'casque-custom', label: 'Casque custom PKI' },
];

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  defaultGiveaway: string | null;
}

export default function LeadModal({ open, onClose, defaultGiveaway }: LeadModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [giveaway, setGiveaway] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultGiveaway) {
      setGiveaway(defaultGiveaway);
    }
  }, [defaultGiveaway]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setEmail('');
        setName('');
        setGiveaway('');
        setSuccess(false);
        setError('');
      }, 300);
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: dbError } = await supabase
        .from('leads')
        .insert([
          {
            email,
            name,
            giveaway: giveaway || null,
          },
        ]);

      if (dbError) throw dbError;

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError('Une erreur est survenue. Réessaye plus tard.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-900 border border-white/10 rounded-2xl max-w-lg w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white hover:scale-110 transition-all duration-200 ease-out"
              >
                <X className="w-6 h-6" />
              </button>

              {success ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">C'est dans la poche !</h3>
                  <p className="text-white/70">
                    On te recontacte très vite pour la réouverture.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Rejoins l'aventure PKI
                  </h3>
                  <p className="text-white/70 mb-6">
                    Inscris-toi pour être parmi les premiers informés et participer aux tirages au sort.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                        Prénom
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#0842a5] focus:ring-2 focus:ring-[#0842a5]/20 focus:outline-none text-white placeholder-white/40 transition-all duration-200 ease-out"
                        placeholder="Ton prénom"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#0842a5] focus:ring-2 focus:ring-[#0842a5]/20 focus:outline-none text-white placeholder-white/40 transition-all duration-200 ease-out"
                        placeholder="ton@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="giveaway" className="block text-sm font-medium text-white/80 mb-2">
                        Je veux participer au tirage (optionnel)
                      </label>
                      <select
                        id="giveaway"
                        value={giveaway}
                        onChange={(e) => setGiveaway(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#0842a5] focus:outline-none text-white"
                      >
                        <option value="">Aucun tirage sélectionné</option>
                        {GIVEAWAYS.map((g) => (
                          <option key={g.value} value={g.value}>
                            {g.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#0842a5] to-[#a00b0b] font-semibold shadow-lg hover:from-[#0842a5]/90 hover:to-[#a00b0b]/90 hover:shadow-[#0842a5]/50 hover:scale-[1.02] transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Inscription...
                        </>
                      ) : (
                        'Valider mon inscription'
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
