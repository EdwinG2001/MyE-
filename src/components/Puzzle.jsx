import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const GRID_SIZE = 3;

const Puzzle = () => {
  const [pieces, setPieces] = useState([]);
  const [selectedPieceIndex, setSelectedPieceIndex] = useState(null);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    initPuzzle();
  }, []);

  const initPuzzle = () => {
    let initialPieces = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      initialPieces.push({
        id: i,
        currentPos: i,
        correctPos: i
      });
    }

    // Shuffle
    for (let i = initialPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [initialPieces[i].currentPos, initialPieces[j].currentPos] = [initialPieces[j].currentPos, initialPieces[i].currentPos];
    }
    
    // Sort by currentPos so they render in grid order
    initialPieces.sort((a, b) => a.currentPos - b.currentPos);
    setPieces(initialPieces);
    setIsSolved(false);
    setSelectedPieceIndex(null);
  };

  const handlePieceClick = (index) => {
    if (isSolved) return;

    if (selectedPieceIndex === null) {
      setSelectedPieceIndex(index);
    } else {
      // Swap the two pieces
      const newPieces = [...pieces];
      const pos1 = newPieces[selectedPieceIndex].currentPos;
      const pos2 = newPieces[index].currentPos;
      
      newPieces[selectedPieceIndex].currentPos = pos2;
      newPieces[index].currentPos = pos1;
      
      newPieces.sort((a, b) => a.currentPos - b.currentPos);
      setPieces(newPieces);
      setSelectedPieceIndex(null);
      checkWin(newPieces);
    }
  };

  const checkWin = (currentPieces) => {
    const won = currentPieces.every(p => p.id === p.currentPos);
    if (won) {
      setIsSolved(true);
      confetti({
        particleCount: 150,
        spread: 180,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="glass fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
      <h2 className="text-gradient" style={{ marginBottom: '1rem', fontSize: '2rem' }}>Rompecabezas de Amor</h2>
      <p style={{ marginBottom: '2rem', color: '#555' }}>
        Toca una pieza y luego otra para intercambiarlas. ¡Arma nuestro corazón!
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gap: '2px',
        width: '300px',
        height: '300px',
        margin: '0 auto 2rem auto',
        border: '4px solid #ff4b72',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(255, 75, 114, 0.3)'
      }}>
        {pieces.map((piece, index) => {
          const row = Math.floor(piece.id / GRID_SIZE);
          const col = piece.id % GRID_SIZE;
          const bgPosX = `${(col / (GRID_SIZE - 1)) * 100}%`;
          const bgPosY = `${(row / (GRID_SIZE - 1)) * 100}%`;

          return (
            <div 
              key={piece.id}
              onClick={() => handlePieceClick(index)}
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/heart_puzzle.png)',
                backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                backgroundPosition: `${bgPosX} ${bgPosY}`,
                cursor: 'pointer',
                border: selectedPieceIndex === index ? '3px solid #ffeb3b' : '1px solid rgba(255,255,255,0.2)',
                boxSizing: 'border-box',
                transition: 'border 0.2s'
              }}
            />
          );
        })}
      </div>

      {isSolved && (
        <div className="fade-in" style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#ff4b72', fontSize: '1.8rem' }}>¡Lo lograste mi amor! ❤️</h3>
          <p style={{ color: '#444', marginTop: '0.5rem' }}>Nuestras iniciales juntas, como siempre.</p>
        </div>
      )}

      <button className="btn btn-secondary" onClick={initPuzzle}>
        Mezclar de nuevo
      </button>
    </div>
  );
};

export default Puzzle;
