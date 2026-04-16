import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  {
    line: "Gulabi aankhen jo teri dekhi ____",
    options: ["Ulti karne ka man kar gaya", "Sharabi yeh dil ho gaya", "bandar ki yaad aagayi"],
    correct: 1
  },
  {
    line: "Kabhi kabhi mere dil mein ____",
    options: ["Khayal Aata hai", "Dard ho jaata hai", "Rakhi Sawant Aajati hai"],
    correct: 0
  },
  {
    line: "Chura liya hai tumne jo dil ko ____",
    options: ["Kaccha mat chaurana please", "Nazar nahi churana sanam", "Vapis Karjana mujhe"],
    correct: 1
  }
];

function LyricsGame({ onWin }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [selectedOpt, setSelectedOpt] = useState(null);

  const handleOptionClick = (index) => {
    if (feedback !== null) return; // Prevent clicking while showing feedback

    setSelectedOpt(index);
    const isCorrect = index === QUESTIONS[currentQ].correct;

    if (isCorrect) {
      setFeedback('correct');
      setTimeout(() => {
        setFeedback(null);
        setSelectedOpt(null);
        if (currentQ < QUESTIONS.length - 1) {
          setCurrentQ(prev => prev + 1);
        } else {
          onWin(); // All questions answered
        }
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        setSelectedOpt(null);
      }, 1000);
    }
  };

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      style={{ minHeight: '350px' }}
    >
      <h3>Complete the Lyrics 🎤<br />(Bollywood Edition)</h3>

      <div style={{ marginTop: '30px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', fontStyle: 'italic', marginBottom: '20px' }}>
              🎶 "{QUESTIONS[currentQ].line}"
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {QUESTIONS[currentQ].options.map((opt, idx) => {
                let bgColor = '#fff';
                let color = 'var(--text-dark)';
                let border = '2px solid rgba(0,0,0,0.1)';

                if (selectedOpt === idx) {
                  if (feedback === 'correct') {
                    bgColor = '#27ae60'; // Green
                    color = 'white';
                    border = '2px solid #27ae60';
                  } else if (feedback === 'wrong') {
                    bgColor = '#e74c3c'; // Red
                    color = 'white';
                    border = '2px solid #e74c3c';
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    style={{
                      background: bgColor,
                      color: color,
                      border: border,
                      padding: '12px 20px',
                      borderRadius: '8px',
                      textAlign: 'left',
                      fontSize: '1rem',
                      fontFamily: "'Outfit', sans-serif",
                      cursor: feedback ? 'default' : 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: 'none'
                    }}
                    whileHover={!feedback ? { scale: 1.02, backgroundColor: '#f0f0f0' } : {}}
                    whileTap={!feedback ? { scale: 0.98 } : {}}
                  >
                    {opt}
                    {selectedOpt === idx && feedback === 'correct' && <span>✔️</span>}
                    {selectedOpt === idx && feedback === 'wrong' && <span>❌</span>}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ marginTop: '20px', minHeight: '30px' }}>
        <AnimatePresence>
          {feedback === 'correct' && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: '#27ae60', fontWeight: 'bold', margin: 0 }}>Correct! ✨</motion.p>
          )}
          {feedback === 'wrong' && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: '#e74c3c', fontWeight: 'bold', margin: 0 }}>Try again! 🙈</motion.p>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}

export default LyricsGame;
