import "./Key.css";

interface KeyProps {
  letter: string | React.ReactNode;
  onClick: (key: string) => void;
  isSpecial?: boolean;
  width?: "wide";
  disabled?: boolean;
}

export const Key = ({
  letter,
  onClick,
  isSpecial = false,
  width,
  disabled = false,
}: KeyProps) => {
  const handleClick = () => {
    if (disabled) return;

    if (typeof letter === "string") {
      onClick(letter);
    }
  };

  return (
    <button
      className={`key ${isSpecial ? "key-special" : ""} ${width === "wide" ? "key-wide" : ""} ${disabled ? "key-disabled" : ""}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {letter}
    </button>
  );
};
