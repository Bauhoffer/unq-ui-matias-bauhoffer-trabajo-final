import { Letter } from "../letter/Letter";

type WordProps = {
  word: string;
};

const Word = ({ word }: WordProps) => {
  return (
    <div className="word-container">
      <div className="word">
        {word.split("").map((char, index) => (
          <Letter key={index} char={char} />
        ))}
      </div>
    </div>
  );
};

export default Word;
