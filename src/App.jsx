import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import AudioPlayer from './components/AudioPlayer';
import BlogHome from './components/BlogHome';
import Quiz from './components/Quiz';
import Puzzle from './components/Puzzle';
import Maze from './components/Maze';
import { Heart, Music, Image as ImageIcon, Crosshair, Home } from 'lucide-react';

const FloatingHearts = () => {
  // Generate random hearts
  const [hearts] = useState(() => Array.from({ length: 15 }).map(() => ({
    left: Math.random() * 100,
    animationDuration: 10 + Math.random() * 15,
    animationDelay: Math.random() * 5,
    size: 20 + Math.random() * 30
  })));

  return (
    <>
      {hearts.map((h, i) => (
        <Heart
          key={i}
          className="heart-particle"
          fill="rgba(255, 255, 255, 0.5)"
          style={{
            left: `${h.left}vw`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            animationDuration: `${h.animationDuration}s`,
            animationDelay: `${h.animationDelay}s`
          }}
        />
      ))}
    </>
  );
};

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'quiz', 'puzzle', 'maze'

  // Easter Egg Logic
  const [keys, setKeys] = useState('');
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      setKeys(prev => (prev + e.key).slice(-10).toLowerCase());
    };
    window.addEventListener('keypress', handler);
    return () => window.removeEventListener('keypress', handler);
  }, []);

  useEffect(() => {
    if (keys.includes('teamo')) {
      setShowSecret(true);
      setKeys('');
    }
  }, [keys]);

  if (!hasEntered) {
    return <WelcomeScreen onEnter={() => setHasEntered(true)} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <BlogHome setCurrentView={setCurrentView} />;
      case 'quiz':
        return <Quiz />;
      case 'puzzle':
        return <Puzzle />;
      case 'maze':
        return <Maze />;
      default:
        return <BlogHome setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="app-container fade-in">
      <FloatingHearts />

      <nav className="glass" style={{ margin: '1rem', padding: '1rem 2rem', borderRadius: '50px' }}>
        <div className="nav-links" style={{ justifyContent: 'center', width: '100%', gap: '2rem' }}>
          <div
            className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentView('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Home size={20} /> Inicio
          </div>
          <div
            className={`nav-item ${currentView === 'quiz' ? 'active' : ''}`}
            onClick={() => setCurrentView('quiz')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Heart size={20} /> Quiz
          </div>
          <div
            className={`nav-item ${currentView === 'puzzle' ? 'active' : ''}`}
            onClick={() => setCurrentView('puzzle')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <ImageIcon size={20} /> Rompecabezas
          </div>
          <div
            className={`nav-item ${currentView === 'maze' ? 'active' : ''}`}
            onClick={() => setCurrentView('maze')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Crosshair size={20} /> Laberinto
          </div>
        </div>
      </nav>

      <main style={{ paddingBottom: '5rem' }}>
        {renderView()}
      </main>

      <AudioPlayer />

      {/* Easter Egg Modal */}
      {showSecret && (
        <div className="modal-overlay" onClick={() => setShowSecret(false)}>
          <div className="glass fade-in" style={{ padding: '3rem', maxWidth: '500px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <Heart size={60} fill="#ff4b72" color="#ff4b72" className="animate-pulse-heart" style={{ margin: '0 auto 1rem' }} />
            <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '1rem' }}>¡Encontraste mi secreto!</h2>
            <p style={{ color: '#444', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Sabía que mi ingeniera favorita iba a encontrar este mensaje oculto.
              Yo también te amo muchísimo, Mi negrita hermosa. Gracias por ser el código perfecto en mi vida jiji me llaman romeo. ❤️
            </p>
            <button className="btn" onClick={() => setShowSecret(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
