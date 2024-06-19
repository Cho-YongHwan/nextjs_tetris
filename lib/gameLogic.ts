interface Position {
  x: number;
  y: number;
}

interface Block {
  shape: number[][];
  position: Position;
  color: string;
}

export const createBoard = (): string[][] => {
  const rows = 20;
  const cols = 10;
  const board: string[][] = Array.from({ length: rows }, () =>
    Array(cols).fill("transparent")
  );
  return board;
};
export const moveBlock = (
  board: string[][],
  block: Block,
  direction: string
): { block: Block; collision: boolean } => {
  const { shape, position } = block;
  let newPosition = { ...position };

  if (direction === "left") {
    newPosition.x -= 1;
  } else if (direction === "right") {
    newPosition.x += 1;
  } else if (direction === "down") {
    newPosition.y += 1;
  }

  const collision = checkCollision(board, {
    shape,
    position: newPosition,
    color: block.color,
  });
  console.log("Collision after move:", collision);

  if (!collision) {
    return { block: { ...block, position: newPosition }, collision: false };
  }

  return { block, collision: true }; // Return the block and indicate collision
};

export const rotateBlock = (board: string[][], block: Block): Block => {
  const { shape, position } = block;
  const newShape = shape[0].map((_, index) =>
    shape.map((row) => row[index]).reverse()
  );

  if (
    !checkCollision(board, { shape: newShape, position, color: block.color })
  ) {
    return { ...block, shape: newShape };
  }

  return block;
};

export const checkCollision = (board: string[][], block: Block): boolean => {
  const { shape, position } = block;

  const collision = shape.some((row, y) =>
    row.some((value, x) => {
      if (value !== 0) {
        const newY = position.y + y;
        const newX = position.x + x;

        const isCollision =
          newY < 0 || // Check if newY is above the board
          newY >= board.length || // Check if newY is below the board
          newX < 0 || // Check if newX is to the left of the board
          newX >= board[0].length || // Check if newX is to the right of the board
          board[newY][newX] !== "transparent"; // Check if the cell is already occupied

        if (isCollision) {
          console.log("checkCollision true at position:", { newY, newX });
        }
        return isCollision;
      }
      return false;
    })
  );

  console.log("checkCollision result:", collision);
  return collision;
};

export const mergeBlockToBoard = (
  board: string[][],
  block: Block
): string[][] => {
  console.log("mergeBlockToBoard");
  const { shape, position, color } = block;
  const newBoard = board.map((row) => row.slice());

  shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        const newY = position.y + y;
        const newX = position.x + x;
        if (
          newY >= 0 &&
          newY < board.length &&
          newX >= 0 &&
          newX < board[0].length
        ) {
          newBoard[newY][newX] = color;
        }
      }
    });
  });

  return newBoard;
};

export const clearLines = (
  board: string[][]
): { newBoard: string[][]; linesCleared: number } => {
  console.log("clearLines");
  const newBoard = board.filter((row) =>
    row.some((cell) => cell === "transparent")
  );
  const linesCleared = board.length - newBoard.length;
  while (newBoard.length < board.length) {
    newBoard.unshift(new Array(board[0].length).fill("transparent"));
  }
  return { newBoard, linesCleared };
};
