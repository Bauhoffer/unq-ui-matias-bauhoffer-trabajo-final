import "./Welcome.css";
import { GameRules } from "../../components/gameRules/GameRules";
import { useNavigate } from "react-router-dom";
import { Letter } from "../../components/letter/Letter";

const Welcome = () => {
  const Navigate = useNavigate();
  const title = "Wordly";
  const handleStartGame = () => {
    Navigate("/difficulty");
  };
  return (
    <div className="welcome-container">
      <div className="title-container">
        {title.split("").map((char, index) => (
          <Letter key={index} char={char} />
        ))}
      </div>
      <GameRules />
      <button className="start-game-button" onClick={handleStartGame}>
        Comenzar Juego
      </button>
    </div>
  );
};

export default Welcome;
