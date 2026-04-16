import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SIZE = 3;
const TOTAL = SIZE * SIZE;
function PuzzleGame({ onWin }) {
  const [boardSize, setBoardSize] = useState(300);
  const [pieces, setPieces] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      setBoardSize(Math.min(window.innerWidth * 0.85, 360));
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const shuffled = [...Array(TOTAL).keys()].sort(() => Math.random() - 0.5);
    setPieces(shuffled);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const cellSize = boardSize / SIZE;

  const checkWin = (arr) => arr.every((val, i) => val === i);

  const getPosition = (index) => {
    const row = Math.floor(index / SIZE);
    const col = index % SIZE;
    return { x: col * cellSize, y: row * cellSize };
  };

  const handleDragEnd = (index, event, info) => {
    // page coordinates to container relative
    const rect = containerRef.current.getBoundingClientRect();
    const x = info.point.x - rect.left;
    const y = info.point.y - rect.top;

    if (x < 0 || x > boardSize || y < 0 || y > boardSize) return;

    const col = Math.floor((x / boardSize) * SIZE);
    const row = Math.floor((y / boardSize) * SIZE);
    const dropIndex = row * SIZE + col;

    if (dropIndex === index) return;

    const newPieces = [...pieces];
    [newPieces[index], newPieces[dropIndex]] = [
      newPieces[dropIndex],
      newPieces[index],
    ];

    setPieces(newPieces);

    if (checkWin(newPieces)) {
      setIsWon(true);
    }
  };

  // ✅ TRIGGER NEXT STAGE AFTER STATE UPDATE
  useEffect(() => {
    if (isWon) {
      setTimeout(() => {
        onWin(); // 🔥 THIS WAS MISSING / WRONG
      }, 1200);
    }
  }, [isWon]);

  const getStyle = (val) => {
    const row = Math.floor(val / SIZE);
    const col = val % SIZE;

    return {
      backgroundImage: "url('/puzzle.jpg')",
      backgroundSize: `${SIZE * 100}% ${SIZE * 100}%`,
      backgroundPosition: `${(col / (SIZE - 1)) * 100}% ${(row / (SIZE - 1)) * 100}%`,
    };
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ color: "white" }}>Complete the Puzzle 🧩</h2>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: boardSize,
          height: boardSize,
          margin: "20px auto",
          touchAction: "none", // Prevent scroll interference
        }}
      >
        {pieces.map((val, index) => {
          const pos = getPosition(index);

          return (
            <motion.div
              key={val}
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              dragMomentum={false}
              onDragEnd={(e, info) => handleDragEnd(index, e, info)}
              animate={{ x: pos.x, y: pos.y }}
              whileDrag={{ zIndex: 10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{
                position: "absolute",
                width: cellSize,
                height: cellSize,
                ...getStyle(val),
                borderRadius: "12px",
                cursor: "grab",
              }}
            />
          );
        })}
      </div>
      <p style={{ color: "white", marginTop: "10px" }}>DRAG AND DROP</p>

      {isWon && <h3>Nice! ❤️</h3>}
    </div>
  );
}

export default PuzzleGame;