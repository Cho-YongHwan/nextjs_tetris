import React from "react";
import styles from "../../styles/Controls.module.css";

interface ControlsProps {
  onStart: () => void;
  onPause: () => void;
  onRestart: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveDown: () => void;
  onRotate: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  onStart,
  onPause,
  onRestart,
  onMoveLeft,
  onMoveRight,
  onMoveDown,
  onRotate,
}) => {
  return (
    <div className={styles.controls}>
      <div className={styles.buttons}>
        <button onClick={onStart} className={styles.controlButton}>
          Start
        </button>
        <button onClick={onPause} className={styles.controlButton}>
          Pause
        </button>
        <button onClick={onRestart} className={styles.controlButton}>
          Restart
        </button>
      </div>
      {/* <div className={styles.arrows}>
        <button onClick={onMoveLeft} className={styles.arrowButton}>
          Left
        </button>
        <button onClick={onRotate} className={styles.arrowButton}>
          Rotate
        </button>
        <button onClick={onMoveRight} className={styles.arrowButton}>
          Right
        </button>
        <button onClick={onMoveDown} className={styles.arrowButton}>
          Down
        </button>
      </div> */}
    </div>
  );
};

export default Controls;
