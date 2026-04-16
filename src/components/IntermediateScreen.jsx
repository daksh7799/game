import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "Date locked.",
  "Time set.",
  "Location still missing..."
];

function IntermediateScreen({ onNext }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (msgIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setMsgIndex(prev => prev + 1);
      }, 1200); // Faster sequence (1.2s)
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 800); // Faster appearance (0.8s)
      return () => clearTimeout(timer);
    }
  }, [msgIndex]);

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ minHeight: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        {messages.map((msg, index) => (
          index <= msgIndex && (
            <motion.h2
              key={index}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8 }}
              style={{ margin: 0, color: index === 2 ? '#2a2a2a' : 'var(--text-red)' }}
            >
              {msg}
            </motion.h2>
          )
        ))}
      </div>

      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: '30px' }}
        >
          <button onClick={onNext}>
            Reveal Location
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default IntermediateScreen;
