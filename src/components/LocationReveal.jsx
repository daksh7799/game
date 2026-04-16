import React from 'react';
import { motion } from 'framer-motion';

function LocationReveal({ onNext }) {
  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}
    >
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ color: 'var(--text-red)', fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}
      >
        YOU <br/> CRACKED <br/> IT! 🧩
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{ textAlign: 'center' }}
      >
        <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 20px 0', color: '#2a2a2a' }}>Venue:</p>
        
        <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', fontWeight: '900', color: '#000' }}>
          SUNAR BAGH
        </h1>
        
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '0', color: '#000' }}>
          Agra Rd, Ghat Ki Guni 📍
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ marginTop: '50px' }}
      >
        <button onClick={onNext}>
          REVEAL THE THEME 👉
        </button>
      </motion.div>
    </motion.div>
  );
}

export default LocationReveal;
