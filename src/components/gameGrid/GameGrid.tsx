import "./GameGrid.css";
import { Letter } from "../letter/Letter";
import type { CheckWordResponse } from "../../types/api";

interface Attempt {
  word: string;
  result?: CheckWordResponse;
}

interface GameGridProps {
  attempts: Attempt[];
  currentWord: string;
  maxAttempts: number;
  wordLength: number;
}

export const GameGrid = ({
  attempts,
  currentWord,
  maxAttempts,
  wordLength,
}: GameGridProps) => {
  const renderRow = (rowIndex: number) => {
    const attempt = attempts[rowIndex];
    const isCurrentRow = rowIndex === attempts.length && currentWord.length > 0;

    const letters = [];

    for (let i = 0; i < wordLength; i++) {
      if (attempt?.result) {
        const letterResult = attempt.result[i];
        letters.push(
          <Letter
            key={i}
            char={letterResult?.letter || ""}
            solution={letterResult?.solution}
          />
        );
      } else if (isCurrentRow) {
        const char = currentWord[i] || "";
        letters.push(<Letter key={i} char={char} isEmpty={char === ""} />);
      } else if (attempt) {
        const char = attempt.word[i] || "";
        letters.push(<Letter key={i} char={char} />);
      } else {
        letters.push(<Letter key={i} char="" isEmpty={true} />);
      }
    }

    return (
      <div key={rowIndex} className="grid-row">
        {letters}
      </div>
    );
  };

  return (
    <div className="game-grid">
      {Array.from({ length: maxAttempts }, (_, index) => renderRow(index))}
    </div>
  );
};
