"use client";

import React from "react";
import styles from "../../styles/Block.module.css";

interface BlockProps {
  shape: number[][];
  position: { x: number; y: number };
  color: string;
}

const Block: React.FC<BlockProps> = ({ shape, position, color }) => {
  return (
    <div
      className={styles.block}
      style={{
        top: position.y * 20, // assuming each cell is 20px
        left: position.x * 20,
      }}
    >
      {shape.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`${styles.cell} ${cell ? styles.filled : ""}`}
              style={{ backgroundColor: cell ? color : "transparent" }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Block;
