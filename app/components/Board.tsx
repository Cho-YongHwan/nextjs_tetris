"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/Board.module.css";
import {
  createBoard,
  moveBlock,
  rotateBlock,
  checkCollision,
  mergeBlockToBoard,
  clearLines,
} from "../../lib/gameLogic";
import Block from "./Block";

const getRandomBlock = () => {
  const blocks = [
    {
      shape: [[1, 1, 1, 1]],
      color: "cyan",
    },
    {
      shape: [
        [0, 1, 1],
        [1, 1, 0],
      ],
      color: "red",
    },
    {
      shape: [
        [1, 1, 0],
        [0, 1, 1],
      ],
      color: "gray",
    },
    {
      shape: [
        [1, 1],
        [1, 1],
      ],
      color: "yellow",
    },
    {
      shape: [
        [1, 1, 1],
        [0, 1, 0],
      ],
      color: "purple",
    },
  ];

  const randomIndex = Math.floor(Math.random() * blocks.length);
  return blocks[randomIndex];
};

const Board: React.FC = () => {
  const [board, setBoard] = useState(createBoard());
  const [currentBlock, setCurrentBlock] = useState(() => ({
    ...getRandomBlock(),
    position: { x: 3, y: 0 },
  }));
  const [gameOver, setGameOver] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isKeyDown, setIsKeyDown] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMove = (direction: string) => {
    setCurrentBlock((prevBlock) => {
      const { block: movedBlock, collision } = moveBlock(
        board,
        prevBlock,
        direction
      );

      if (collision && direction === "down") {
        const newBoard = mergeBlockToBoard(board, prevBlock);
        const { newBoard: clearedBoard } = clearLines(newBoard);
        setBoard(clearedBoard);

        const newBlock = {
          ...getRandomBlock(),
          position: { x: 3, y: 0 },
        };

        if (checkCollision(clearedBoard, newBlock)) {
          setGameOver(true);
          return prevBlock; // Keep the previous block to indicate game over
        }

        return newBlock;
      }

      return movedBlock;
    });
  };

  const handleRotate = () => {
    setCurrentBlock((prevBlock) => rotateBlock(board, prevBlock));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameOver) return;

      if (event.key === "ArrowLeft") {
        handleMove("left");
      } else if (event.key === "ArrowRight") {
        handleMove("right");
      } else if (event.key === "ArrowDown") {
        setIsKeyDown(true);
        handleMove("down");
      } else if (event.key === "ArrowUp") {
        handleRotate();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setIsKeyDown(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      if (!isKeyDown) {
        handleMove("down");
      }
    }, 1000);

    setIntervalId(interval);

    return () => clearInterval(interval);
  }, [board, gameOver, isKeyDown]);

  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <div
            key={`${rowIndex}-${cellIndex}`}
            className={styles.cell}
            style={{ backgroundColor: cell }}
          ></div>
        ))
      )}
      <Block
        shape={currentBlock.shape}
        position={currentBlock.position}
        color={currentBlock.color}
      />
      {gameOver && <div className={styles.gameOver}>Game Over</div>}
    </div>
  );
};

export default Board;
