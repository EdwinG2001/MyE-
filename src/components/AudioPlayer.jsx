import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import music from '../music.mp3';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Attempt autoplay when component mounts (after welcome screen)
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(e => {
        console.log("Autoplay prevented:", e);
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="audio-player-fixed glass" style={{ padding: '10px 20px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '15px' }}>
      <Music size={20} color="#ff4b72" className={isPlaying ? 'animate-pulse-heart' : ''} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#ff4b72' }}>Nuestra Canción</span>
        <span style={{ fontSize: '0.7rem', color: '#666' }}>(Puedes cambiarla luego)</span>
      </div>
      <button
        onClick={togglePlay}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '50%', width: '35px', height: '35px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
      >
        {isPlaying ? <Pause size={16} color="#ff4b72" /> : <Play size={16} color="#ff4b72" style={{ marginLeft: '2px' }} />}
      </button>

      {/* 
      */}
      <audio
        ref={audioRef}
        loop
        src={music}
      />
    </div>
  );
};

export default AudioPlayer;
