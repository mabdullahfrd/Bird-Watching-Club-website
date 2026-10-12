import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { WhyWingWatchers } from './components/WhyWingWatchers';
import { NoticeMoreInteractive } from './components/NoticeMoreInteractive';
import { OutingProcess } from './components/OutingProcess';
import { ExploreDaejeon } from './components/ExploreDaejeon';
import { BirdingJournal } from './components/BirdingJournal';
import { SeasonalCalendar } from './components/SeasonalCalendar';
import { ActivitiesGrid } from './components/ActivitiesGrid';
import { GuessTheBirdGame } from './components/GuessTheBirdGame';
import { GallerySection } from './components/GallerySection';
import { MemberExperience } from './components/MemberExperience';
import { CareForNature } from './components/CareForNature';
import { ContinuityCommunity } from './components/ContinuityCommunity';
import { EventsSection } from './components/EventsSection';
import { JoinSection } from './components/JoinSection';
import { Footer } from './components/Footer';
import { AudioPlayerDrawer } from './components/AudioPlayerDrawer';
import { GuessTheBirdPage } from './pages/GuessTheBirdPage';
import { LogoProvider } from './context/LogoContext';

function MainAppContent() {
  const [lang, setLang] = useState<'en' | 'kr'>('en');
  const [isAudioDrawerOpen, setIsAudioDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'game'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      return hash === '#game' || hash === '#game-page' ? 'game' : 'home';
    }
    return 'home';
  });

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#game' || hash === '#game-page') {
        setCurrentPage('game');
      } else if (!hash || hash === '#' || hash === '#home') {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'kr' : 'en'));
  };

  const handleScrollToJoin = () => {
    if (currentPage === 'game') {
      setCurrentPage('home');
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById('join');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById('join');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAudio = () => {
    setIsAudioDrawerOpen(true);
  };

  const handleOpenGame = () => {
    setCurrentPage('game');
    window.location.hash = '#game';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToEvents = () => {
    setCurrentPage('home');
    window.location.hash = '';
    setTimeout(() => {
      const el = document.getElementById('events');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // If on dedicated game page
  if (currentPage === 'game') {
    return (
      <div className="min-h-screen bg-[#F6F4ED] text-[#242E1F]">
        <GuessTheBirdPage
          lang={lang}
          onToggleLang={handleToggleLang}
          onBackToHome={handleBackToHome}
          onNavigateToEvents={handleNavigateToEvents}
        />

        {/* Ambient Sound Drawer */}
        <AudioPlayerDrawer
          lang={lang}
          isOpen={isAudioDrawerOpen}
          onClose={() => setIsAudioDrawerOpen(false)}
        />
      </div>
    );
  }

  // Home Page View
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#242E1F]">
      {/* 3-Zone Sticky Navigation Bar */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenJoin={handleScrollToJoin}
        onOpenAudio={handleOpenAudio}
        onOpenGame={handleOpenGame}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          lang={lang}
          onOpenJoin={handleScrollToJoin}
          onOpenAudio={handleOpenAudio}
        />

        {/* 01. Introduction: A Different Kind of Campus Experience */}
        <Introduction lang={lang} />

        {/* 02. Why Wing Watchers: Slow Down, Notice More, Meet People, Keep Exploring */}
        <WhyWingWatchers lang={lang} />

        {/* 03. Interactive Feature: "Notice More" / Look Closer Observation Station */}
        <NoticeMoreInteractive lang={lang} />

        {/* 04. How an Outing Works: Meet & Plan, Walk & Watch, Record & Share */}
        <OutingProcess lang={lang} />

        {/* 05. Start Close to Campus: The City is Our Outdoor Classroom */}
        <ExploreDaejeon lang={lang} />

        {/* 06. Digital Birding Journal: The Wing Watchers Field Note */}
        <BirdingJournal lang={lang} />

        {/* 07. Seasonal Rhythm Calendar: Spring, Summer, Autumn, Winter */}
        <SeasonalCalendar lang={lang} />

        {/* 08. Activities Grid: 12 Community-First Activities */}
        <ActivitiesGrid lang={lang} onOpenGame={handleOpenGame} />

        {/* 09. Interactive Game: Guess the Bird Challenge (Embedded + Dedicated Page Launcher) */}
        <GuessTheBirdGame
          lang={lang}
          onOpenDedicatedPage={handleOpenGame}
        />

        {/* 10. Photography Gallery with Lightbox Viewer */}
        <GallerySection lang={lang} />

        {/* 11. Member Experience: Made for Every Major. Beginners Included. */}
        <MemberExperience lang={lang} />

        {/* 12. Care for Nature: Observe Without Disturbing */}
        <CareForNature lang={lang} />

        {/* 13. Continuity & Community: Leave Something for the Next Group */}
        <ContinuityCommunity lang={lang} />

        {/* 14. Upcoming Walks & Outings with Event Sign-Up Form */}
        <EventsSection lang={lang} />

        {/* 15. Join Section: Your Next Walk Starts Here */}
        <JoinSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} onOpenAudio={handleOpenAudio} />

      {/* Interactive Soundscape & Bird Call Soundboard Drawer */}
      <AudioPlayerDrawer
        lang={lang}
        isOpen={isAudioDrawerOpen}
        onClose={() => setIsAudioDrawerOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LogoProvider>
      <MainAppContent />
    </LogoProvider>
  );
}
