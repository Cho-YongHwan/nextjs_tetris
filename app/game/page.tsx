"use client";

import React, { useState } from "react";
import Board from "../components/Board";
import GameStatus from "../components/GameStatus";
import Controls from "../components/Controls";
import styles from "../../styles/Game.module.css";

const GamePage: React.FC = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [linesCleared, setLinesCleared] = useState(0);

  const handleStart = () => {
    console.log("Game Started");
  };

  const handlePause = () => {
    console.log("Game Paused");
  };

  const handleRestart = () => {
    console.log("Game Restarted");
    setScore(0);
    setLevel(1);
    setLinesCleared(0);
  };

  const handleMoveLeft = () => {
    console.log("Move Left");
  };

  const handleMoveRight = () => {
    console.log("Move Right");
  };

  const handleMoveDown = () => {
    console.log("Move Down");
  };

  const handleRotate = () => {
    console.log("Rotate");
  };

  return (
    <div className={styles.game}>
      <div className={styles.board}>
        <Board />
      </div>
      <div className={styles.status}>
        <GameStatus score={score} level={level} linesCleared={linesCleared} />
      </div>
      <Controls
        onStart={handleStart}
        onPause={handlePause}
        onRestart={handleRestart}
        onMoveLeft={handleMoveLeft}
        onMoveRight={handleMoveRight}
        onMoveDown={handleMoveDown}
        onRotate={handleRotate}
      />
    </div>
  );
};

export default GamePage;
