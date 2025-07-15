import './Letter.css';
import type { Solution } from '../../types/solution';

interface LetterProps {
  char: string;
  solution?: Solution;
  isEmpty?: boolean;
}

export const Letter = ({ char, solution, isEmpty = false }: LetterProps) => {
  const getClassName = () => {
    let className = 'letter';
    
    if (isEmpty) {
      className += ' letter-empty';
    } else if (solution) {
      className += ` letter-${solution}`;
    } else if (char) {
      className += ' letter-pending';
    } else {
      className += ' letter-empty';
    }
    
    return className;
  };

  return (
    <div className={getClassName()}>
      {char}
    </div>
  );
};