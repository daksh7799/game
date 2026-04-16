import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "25 years ago... a story began ❤️",
  "A story of love, laughter, and forever...",
  "Now it's time to celebrate that story ✨"
];

function IntroScreen({ onNext, onStartMusic }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (msgIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setMsgIndex(prev => prev + 1);
      }, 2000); // 2 seconds per message (snappier)
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 1000); // Wait 1s after last message to show button
      return () => clearTimeout(timer);
    }
  }, [msgIndex]);

  const handleStart = () => {
    onStartMusic(); // Try to start music on first interaction
    onNext();
  };

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <div style={{ minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.h2
            key={msgIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
          >
            {messages[msgIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      {showButton && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ marginTop: '30px' }}
        >
          <button onClick={handleStart}>
            👉 Unlock the Secret 🔐
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default IntroScreen;
