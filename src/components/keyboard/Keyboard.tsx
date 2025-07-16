import "./Keyboard.css";
import { Key } from "./Key";
import check from "../../assets/check.svg";
import backspace from "../../assets/backspace.svg";
interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
  isLoading?: boolean;
}

export const Keyboard = ({
  onKeyPress,
  onEnter,
  onBackspace,
  isLoading = false,
}: KeyboardProps) => {
  const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"];
  const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyPress = (key: string) => {
    if (isLoading) return;

    if (key === "ENTER") {
      onEnter();
    } else if (key === "BACKSPACE") {
      onBackspace();
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className={`keyboard ${isLoading ? 'keyboard-disabled' : ''}`}>
      <div className="keyboard-row">
        {firstRow.map((letter) => (
          <Key 
            key={letter} 
            letter={letter} 
            onClick={handleKeyPress}
            disabled={isLoading}
          />
        ))}
      </div>

      <div className="keyboard-row">
        {secondRow.map((letter) => (
          <Key 
            key={letter} 
            letter={letter} 
            onClick={handleKeyPress}
            disabled={isLoading}
          />
        ))}
      </div>

      <div className="keyboard-row">
        <Key
          letter={<img src={backspace} alt="backspace" className="backspace"/>}
          onClick={handleKeyPress}
          isSpecial={true}
          width="wide"
          disabled={isLoading}
          keyValue="BACKSPACE"
        />
        {thirdRow.map((letter) => (
          <Key 
            key={letter} 
            letter={letter} 
            onClick={handleKeyPress}
            disabled={isLoading}
          />
        ))}
        <Key
          letter={isLoading ? (
            <div className="spinner"></div>
          ) : (
            <img src={check} alt="enter" className="enter"/>
          )}
          onClick={handleKeyPress}
          isSpecial={true}
          width="wide"
          disabled={isLoading}
          keyValue="ENTER"
        />
      </div>
    </div>
  );
};
