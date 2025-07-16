import "./Key.css";

interface KeyProps {
  letter: string | React.ReactNode;
  onClick: (key: string) => void;
  isSpecial?: boolean;
  width?: "wide";
  disabled?: boolean;
  keyValue?: string;
}

export const Key = ({
  letter,
  onClick,
  isSpecial = false,
  width,
  disabled = false,
  keyValue,
}: KeyProps) => {
  const handleClick = () => {
    if (disabled) return;

    const key = keyValue || (typeof letter === "string" ? letter : "");
    if (key) {
      onClick(key);
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
