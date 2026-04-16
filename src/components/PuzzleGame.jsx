import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SIZE = 3;
const TOTAL = SIZE * SIZE;
const BOARD_SIZE = 360;

function PuzzleGame({ onWin }) {
  const [pieces, setPieces] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const shuffled = [...Array(TOTAL).keys()].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
  }, []);

  const cellSize = BOARD_SIZE / SIZE;

  const checkWin = (arr) => arr.every((val, i) => val === i);

  const getPosition = (index) => {
    const row = Math.floor(index / SIZE);
    const col = index % SIZE;
    return { x: col * cellSize, y: row * cellSize };
  };

  const getDropIndex = (x, y) => {
    const rect = containerRef.current.getBoundingClientRect();

    if (
      x < rect.left ||
      x > rect.right ||
      y < rect.top ||
      y > rect.bottom
    ) return null;

    const col = Math.floor(((x - rect.left) / rect.width) * SIZE);
    const row = Math.floor(((y - rect.top) / rect.height) * SIZE);

    return row * SIZE + col;
  };

  const handleDragEnd = (index, event, info) => {
    const dropIndex = getDropIndex(info.point.x, info.point.y);
    if (dropIndex === null) return;

    const newPieces = [...pieces];
    [newPieces[index], newPieces[dropIndex]] = [
      newPieces[dropIndex],
      newPieces[index],
    ];

    setPieces(newPieces);

    // ✅ IMPORTANT: detect win HERE
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
          width: BOARD_SIZE,
          height: BOARD_SIZE,
          margin: "20px auto",
        }}
      >
        {pieces.map((val, index) => {
          const pos = getPosition(index);

          return (
            <motion.div
              key={val}
              drag
              dragConstraints={containerRef}
              onDragEnd={(e, info) => handleDragEnd(index, e, info)}
              animate={{ x: pos.x, y: pos.y }}
              transition={{ type: "spring", stiffness: 300 }}
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