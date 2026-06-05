import React from 'react';
import { Heart, Stars } from 'lucide-react';

const BlogHome = ({ setCurrentView }) => {
  return (
    <div className="container fade-in">
      <div className="glass" style={{ padding: '3rem', marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }} className="text-gradient">
          Hola, mi amor hermosa
        </h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#444', marginBottom: '2rem' }}>
          He creado este pequeño espacio en la web solo para ti, Mi Reina. Porque los dos seremos ingenieros en sistemas y sabemos que el código también puede ser una carta de amor. Quería hacer algo diferente, algo interactivo y bien lindo para recordarte lo mucho que te amo y lo especial que eres para mí.
          <br /><br />
          Aquí abajo encontrarás unos jueguitos que preparé con mucho cariño. ¡Espero que te gusten!
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Heart fill="#ff4b72" color="#ff4b72" className="animate-pulse-heart" />
          <Heart fill="#ff4b72" color="#ff4b72" className="animate-pulse-heart" style={{ animationDelay: '0.5s' }} />
          <Heart fill="#ff4b72" color="#ff4b72" className="animate-pulse-heart" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Juegos para mi Ingeniera Favorita</h2>

      <div className="grid">
        <div className="glass game-card" onClick={() => setCurrentView('quiz')}>
          <Stars size={48} color="#ff4b72" style={{ margin: '0 auto 1rem auto' }} />
          <h3>¿Cuánto me conoces?</h3>
          <p style={{ marginTop: '1rem', color: '#666' }}>Un pequeño quiz con preguntas sobre nosotros. ¡A ver qué puntuación sacas!</p>
          <button className="btn" style={{ marginTop: '1.5rem', width: '100%' }}>Jugar Quiz</button>
        </div>

        <div className="glass game-card" onClick={() => setCurrentView('puzzle')}>
          <Heart size={48} color="#ff4b72" style={{ margin: '0 auto 1rem auto' }} />
          <h3>Rompecabezas de Amor</h3>
          <p style={{ marginTop: '1rem', color: '#666' }}>Un lindo corazón para armar. ¿Podrás juntar todas las piezas?</p>
          <button className="btn" style={{ marginTop: '1.5rem', width: '100%' }}>Armar Corazón</button>
        </div>

        <div className="glass game-card" onClick={() => setCurrentView('maze')}>
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#ff4b72" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            style={{ margin: '0 auto 1rem auto', display: 'block' }}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h6V3" />
            <path d="M15 3v6h6" />
            <path d="M9 9v6H3" />
            <path d="M15 9h6v6" />
            <path d="M9 15h6v6" />
          </svg>
          <h3>Encuentrame mi amor</h3>
          <p style={{ marginTop: '1rem', color: '#666' }}>Un laberinto donde tú (Milena) tienes que llegar hasta mí (Amor).</p>
          <button className="btn" style={{ marginTop: '1.5rem', width: '100%' }}>Jugar Laberinto</button>
        </div>
      </div>
    </div>
  );
};

export default BlogHome;
