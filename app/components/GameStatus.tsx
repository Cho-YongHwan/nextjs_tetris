import React from "react";
import styles from "../../styles/GameStatus.module.css";

interface GameStatusProps {
  score: number;
  level: number;
  linesCleared: number;
}

const GameStatus: React.FC<GameStatusProps> = ({
  score,
  level,
  linesCleared,
}) => {
  return (
    <div className={styles.status}>
      <h1>Score: {score}</h1>
      <h2>Level: {level}</h2>
      <h3>Lines Cleared: {linesCleared}</h3>
    </div>
  );
};

export default GameStatus;
