import "./Key.css";

interface KeyProps {
  letter: string;
  onClick: (letter: string) => void;
  isSpecial?: boolean;
  width?: "normal" | "wide";
}

export const Key = ({
  letter,
  onClick,
  isSpecial = false,
  width = "normal",
}: KeyProps) => {
  const handleClick = () => {
    onClick(letter);
  };

  return (
    <button
      className={`key ${isSpecial ? "key-special" : ""} key-${width}`}
      onClick={handleClick}
    >
      {letter}
    </button>
  );
};
