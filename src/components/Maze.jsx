import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

// Simple maze map (1 = wall, 0 = path, 2 = start(Milena), 3 = end(Edwin))
const mazeMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 3, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const TILE_SIZE = 40;
const ROWS = mazeMap.length;
const COLS = mazeMap[0].length;

const Maze = () => {
  const canvasRef = useRef(null);
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isWon) return;

      let { x, y } = playerPos;
      if (e.key === 'ArrowUp') y -= 1;
      if (e.key === 'ArrowDown') y += 1;
      if (e.key === 'ArrowLeft') x -= 1;
      if (e.key === 'ArrowRight') x += 1;

      if (mazeMap[y][x] !== 1) {
        setPlayerPos({ x, y });
        if (mazeMap[y][x] === 3) {
          setIsWon(true);
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, isWon]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Maze
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const val = mazeMap[row][col];
        if (val === 1) {
          ctx.fillStyle = '#ffb6c1'; // wall color
          ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        } else {
          ctx.fillStyle = '#fff5f7'; // path color
          ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }

        // Target (Edwin)
        if (val === 3) {
          ctx.fillStyle = '#ff4b72';
          ctx.font = "20px Arial";
          ctx.fillText("🧑🏻", col * TILE_SIZE + 8, row * TILE_SIZE + 28);
        }
      }
    }

    // Draw Player (Negrita)
    ctx.fillStyle = '#d63384';
    ctx.font = "20px Arial";
    ctx.fillText("👩🏻", playerPos.x * TILE_SIZE + 8, playerPos.y * TILE_SIZE + 28);

  }, [playerPos]);

  const resetGame = () => {
    setPlayerPos({ x: 1, y: 1 });
    setIsWon(false);
  };

  return (
    <div className="glass fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
      <h2 className="text-gradient" style={{ marginBottom: '1rem', fontSize: '2rem' }}>Encuéntrame</h2>
      <p style={{ marginBottom: '2rem', color: '#555' }}>
        Usa las flechas del teclado para llegar hasta donde estoy.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <canvas
          ref={canvasRef}
          width={COLS * TILE_SIZE}
          height={ROWS * TILE_SIZE}
          style={{
            border: '2px solid #ff4b72',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(255, 75, 114, 0.2)'
          }}
        />
      </div>

      {isWon && (
        <div className="fade-in" style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#ff4b72', fontSize: '1.8rem' }}>¡Me encontraste! ❤️</h3>
          <p style={{ color: '#444', marginTop: '0.5rem' }}>Siempre sabrás cómo llegar a mi corazón.</p>
        </div>
      )}

      {/* Controles para móvil mejorados */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        marginBottom: '2rem',
        marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(255,255,255,0.5)',
        borderRadius: '20px'
      }}>
        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '10px' }}>Controles Táctiles</p>
        <button
          className="btn"
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowUp' }))}
          style={{ width: '50px', height: '50px', padding: '0', borderRadius: '15px' }}
        >
          ↑
        </button>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button
            className="btn"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowLeft' }))}
            style={{ width: '50px', height: '50px', padding: '0', borderRadius: '15px' }}
          >
            ←
          </button>
          <button
            className="btn"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }))}
            style={{ width: '50px', height: '50px', padding: '0', borderRadius: '15px' }}
          >
            ↓
          </button>
          <button
            className="btn"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowRight' }))}
            style={{ width: '50px', height: '50px', padding: '0', borderRadius: '15px' }}
          >
            →
          </button>
        </div>
      </div>

      <button className="btn btn-secondary" onClick={resetGame}>
        Volver a jugar
      </button>
    </div>
  );
};

export default Maze;
