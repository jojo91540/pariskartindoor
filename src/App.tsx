import { useState } from 'react';
import Hero from './components/Hero';
import Giveaways from './components/Giveaways';
import ProgressTimeline from './components/ProgressTimeline';
import SocialWall from './components/SocialWall';
import FooterCountdown from './components/FooterCountdown';
import LeadModal from './components/LeadModal';

export default function App() {
  const [showLead, setShowLead] = useState(false);
  const [activeGiveaway, setActiveGiveaway] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-blue-500/40">
      <Hero onPrimary={() => setShowLead(true)} />
      <Giveaways onEnter={(g) => { setActiveGiveaway(g); setShowLead(true); }} />
      <ProgressTimeline />
      <SocialWall />
      <FooterCountdown />

      <LeadModal
        open={showLead}
        onClose={() => { setShowLead(false); setActiveGiveaway(null); }}
        defaultGiveaway={activeGiveaway}
      />
    </main>
  );
}
