import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function TicTacToeGame({ onWin }) {
  // 0: empty, 1: player (X), 2: AI (O)
  const [board, setBoard] = useState(Array(9).fill(0));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winRevealed, setWinRevealed] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  // Forced win logic: Player plays X.
  // We want the player to win quickly (e.g., top row or diagonal).
  // Let's guide them to a win or just let them win if they get 3 in a row.
  // Actually, to guarantee no frustration, the AI will play terribly.

  const checkWin = (currentBoard) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line };
      }
    }
    return null;
  };

  const aiMove = (currentBoard) => {
    // Find first empty spot that doesn't block the player's potential win
    const emptySpots = currentBoard.map((val, idx) => val === 0 ? idx : null).filter(val => val !== null);
    if (emptySpots.length === 0) return;

    // A very dumb AI just picks the last empty spot to avoid blocking early
    let chosenSpot = emptySpots[emptySpots.length - 1];

    const newBoard = [...currentBoard];
    newBoard[chosenSpot] = 2; // O
    setBoard(newBoard);
    setIsPlayerTurn(true);
  };

  const handleCellClick = (index) => {
    if (board[index] !== 0 || !isPlayerTurn || winRevealed) return;

    const newBoard = [...board];
    newBoard[index] = 1; // X
    setBoard(newBoard);
    setMoveCount(prev => prev + 1);
    setIsPlayerTurn(false);
  };

  useEffect(() => {
    const winResult = checkWin(board);

    if (winResult && winResult.winner === 1) {
      // Player won!
      setTimeout(() => {
        setWinRevealed(true);
        // Automatically progress after reveal
        setTimeout(() => {
          onWin();
        }, 3000);
      }, 500);
      return;
    }

    // Check for draw (should be rare with dumb AI, but just in case)
    if (!board.includes(0)) {
      // Force reset if draw, we want them to win
      setBoard(Array(9).fill(0));
      setIsPlayerTurn(true);
      return;
    }

    if (!isPlayerTurn && !winRevealed) {
      setTimeout(() => aiMove(board), 600); // AI delay
    }
  }, [board, isPlayerTurn]);


  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <h3>Play tic tac toe to unlock when it all happens.</h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        margin: '20px auto',
        width: '240px',
        height: '240px'
      }}>
        {board.map((cell, index) => {
          let content = cell === 1 ? 'X' : cell === 2 ? 'O' : '';
          let isWinningCell = false;

          if (winRevealed) {
            const winLine = checkWin(board)?.line || [];
            if (winLine.includes(index)) {
              const pos = winLine.indexOf(index);
              if (pos === 0) content = "17";
              if (pos === 1) content = "APR";
              if (pos === 2) content = "7:30 PM";
              isWinningCell = true;
            } else {
              content = ''; // Clear other cells
            }
          }

          return (
            <motion.div
              key={index}
              onClick={() => handleCellClick(index)}
              style={{
                background: isWinningCell ? 'var(--text-red)' : 'rgba(0,0,0,0.05)',
                color: isWinningCell ? 'white' : 'var(--text-dark)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isWinningCell && content === "7:30 PM" ? '1rem' : '2rem',
                fontWeight: 'bold',
                cursor: cell === 0 && isPlayerTurn && !winRevealed ? 'pointer' : 'default',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
              }}
              animate={winRevealed && isWinningCell ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {content}
            </motion.div>
          );
        })}
      </div>

      {winRevealed && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ color: 'var(--text-red)' }}
        >
          Date Locked!
        </motion.h2>
      )}
    </motion.div>
  );
}

export default TicTacToeGame;
