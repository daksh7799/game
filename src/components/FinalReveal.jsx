import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

function FinalReveal({ venue }) {

  useEffect(() => {
    // Fire confetti when this component mounts
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#8a161e', '#f39c12', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#8a161e', '#f39c12', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        padding: '20px',
        background: 'linear-gradient(145deg, #fff8e1, #fde4a7)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        textAlign: 'center'
      }}
    >
      <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: 'var(--text-red)', fontFamily: "'Playfair Display', serif" }}>
        You did it! 🎉
      </h2>

      <div style={{ position: 'relative', width: '100%', maxWidth: '300px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', marginBottom: '20px' }}>
        <img
          src="/final-theme.png"
          alt="Bollywood Karaoke Night"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#000', margin: '10px 0 5px 0' }}>
        See you at {venue} 📍
      </p>
      <p style={{ fontStyle: 'italic', color: '#666', fontWeight: 'bold', fontSize: '1.1rem' }}>
        AT 7:30 PM
      </p>
    </motion.div>
  );
}

export default FinalReveal;
