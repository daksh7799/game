import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

import IntroScreen from './components/IntroScreen';
import TicTacToeGame from './components/TicTacToeGame';
import IntermediateScreen from './components/IntermediateScreen';
import PuzzleGame from './components/PuzzleGame';
import LyricsGame from './components/LyricsGame';
import LocationReveal from './components/LocationReveal';
import FinalReveal from './components/FinalReveal';

const STAGES = {
  INTRO: 0,
  TIC_TAC_TOE: 1,
  INTERMEDIATE: 2,
  PUZZLE: 3,
  LOCATION_REVEAL: 4,
  LYRICS: 5,
  REVEAL: 6
};

function App() {
  const [stage, setStage] = useState(STAGES.INTRO);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Royalty-free romantic soft music placeholder
    audioRef.current = new Audio('https://www.bensound.com/bensound-music/bensound-romantic.mp3');
    audioRef.current.loop = true;
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const nextStage = () => {
    setStage(prev => prev + 1);
  };

  return (
    <div className="game-container">
      <button className="music-toggle" onClick={toggleAudio}>
        {isPlaying ? <Volume2 color="white" /> : <VolumeX color="white" />}
      </button>

      <AnimatePresence mode="wait">
        {stage === STAGES.INTRO && <IntroScreen key="intro" onNext={nextStage} onStartMusic={toggleAudio} />}
        {stage === STAGES.TIC_TAC_TOE && <TicTacToeGame key="tictactoe" onWin={nextStage} />}
        {stage === STAGES.INTERMEDIATE && <IntermediateScreen key="intermediate" onNext={nextStage} />}
        {stage === STAGES.PUZZLE && <PuzzleGame key="puzzle" onWin={nextStage} />}
        {stage === STAGES.LOCATION_REVEAL && <LocationReveal key="location" onNext={nextStage} />}
        {stage === STAGES.LYRICS && <LyricsGame key="lyrics" onWin={nextStage} />}
        {stage === STAGES.REVEAL && <FinalReveal key="reveal" venue="SUNAR BAGH" />}
      </AnimatePresence>
    </div>
  );
}

export default App;
