import './Letter.css';

interface LetterProps {
  char: string;
}

export const Letter = ({ char }: LetterProps) => {
  return <span id="letter">{char}</span>;
};