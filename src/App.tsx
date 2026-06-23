import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import NocSimulator from './components/game/NocSimulator';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [gameResetKey, setGameResetKey] = useState(0);

  const handlePageChange = (page: string) => {
    if (page === 'game') {
      setGameResetKey(prev => prev + 1);
    }
    setActivePage(page);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-sys-light dark:bg-sys-darker text-slate-900 dark:text-slate-100 font-sans selection:bg-sys-indigo/30 selection:text-sys-indigo dark:selection:bg-sys-neon/30 dark:selection:text-sys-neon transition-colors duration-300">
      <Header activePage={activePage} setActivePage={handlePageChange} />
      
      <main className={`w-full flex justify-center ${activePage === 'game' ? 'h-screen pt-24 pb-6 items-stretch' : 'min-h-screen pt-24 pb-12 items-center'}`}>
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <Hero setActivePage={setActivePage} />
            </motion.div>
          )}
          
          {(activePage === 'about' || activePage === 'skills') && (
            <motion.div key="about" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <About />
            </motion.div>
          )}

          {activePage === 'projects' && (
            <motion.div key="projects" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <Projects />
            </motion.div>
          )}

          {activePage === 'contact' && (
            <motion.div key="contact" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <Contact />
            </motion.div>
          )}

          {activePage === 'game' && (
            <motion.div key="game" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full h-full max-w-6xl mx-auto px-4 md:px-8">
              <NocSimulator key={gameResetKey} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
