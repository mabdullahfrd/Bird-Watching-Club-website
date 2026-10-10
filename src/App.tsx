import React, { useState } from 'react';
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
import { GallerySection } from './components/GallerySection';
import { MemberExperience } from './components/MemberExperience';
import { CareForNature } from './components/CareForNature';
import { ContinuityCommunity } from './components/ContinuityCommunity';
import { EventsSection } from './components/EventsSection';
import { JoinSection } from './components/JoinSection';
import { Footer } from './components/Footer';
import { AudioPlayerDrawer } from './components/AudioPlayerDrawer';

export default function App() {
  const [lang, setLang] = useState<'en' | 'kr'>('en');
  const [isAudioDrawerOpen, setIsAudioDrawerOpen] = useState(false);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'kr' : 'en'));
  };

  const handleScrollToJoin = () => {
    const el = document.getElementById('join');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAudio = () => {
    setIsAudioDrawerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#242E1F]">
      {/* 3-Zone Sticky Navigation Bar */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenJoin={handleScrollToJoin}
        onOpenAudio={handleOpenAudio}
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

        {/* 08. Activities Grid: 7 Community-First Activities */}
        <ActivitiesGrid lang={lang} />

        {/* 09. Photography Gallery with Lightbox Viewer */}
        <GallerySection lang={lang} />

        {/* 10. Member Experience: Made for Every Major. Beginners Included. */}
        <MemberExperience lang={lang} />

        {/* 11. Care for Nature: Observe Without Disturbing */}
        <CareForNature lang={lang} />

        {/* 12. Continuity & Community: Leave Something for the Next Group */}
        <ContinuityCommunity lang={lang} />

        {/* 13. Upcoming Walks / Events with Instant RSVP */}
        <EventsSection
          lang={lang}
          onSelectEventToRegister={() => handleScrollToJoin()}
        />

        {/* 14. Join Section: Your Next Walk Starts Here */}
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
