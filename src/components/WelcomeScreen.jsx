import React from 'react';
import { Heart } from 'lucide-react';

const WelcomeScreen = ({ onEnter }) => {
  return (
    <div className="welcome-screen">
      <div className="glass" style={{ padding: '4rem', maxWidth: '600px', animation: 'float 4s ease-in-out infinite' }}>
        <Heart size={64} color="#ff4b72" className="animate-pulse-heart" style={{ margin: '0 auto 2rem auto', display: 'block' }} />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} className="text-gradient">Para mi amor Milena 💖​ Mi negrita</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#555' }}>
          Un pequeño rincón especial hecho solo para ti, lleno de amor, recuerdos y juegos.
        </p>
        <button className="btn" onClick={onEnter} style={{ fontSize: '1.2rem', padding: '15px 40px' }}>
          Entrar a nuestro mundo <Heart size={20} fill="white" />
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
