import "./Keyboard.css";
import { Key } from "./Key";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
}

export const Keyboard = ({
  onKeyPress,
  onEnter,
  onBackspace,
}: KeyboardProps) => {
  const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"];
  const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyPress = (key: string) => {
    if (key === "ENTER") {
      onEnter();
    } else if (key === "BACKSPACE") {
      onBackspace();
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {firstRow.map((letter) => (
          <Key key={letter} letter={letter} onClick={handleKeyPress} />
        ))}
      </div>

      <div className="keyboard-row">
        {secondRow.map((letter) => (
          <Key key={letter} letter={letter} onClick={handleKeyPress} />
        ))}
      </div>

      <div className="keyboard-row">
        <Key
          letter="⌫"
          onClick={() => handleKeyPress("BACKSPACE")}
          isSpecial={true}
          width="wide"
        />
        {thirdRow.map((letter) => (
          <Key key={letter} letter={letter} onClick={handleKeyPress} />
        ))}
        <Key
          letter="Enter"
          onClick={() => handleKeyPress("ENTER")}
          isSpecial={true}
          width="wide"
        />
      </div>
    </div>
  );
};
