import "./Menu.css";
import { useNavigate } from "react-router-dom";
import type { Difficulty } from "../../types/api";

interface MenuProps {
  difficulties: Difficulty[];
  title: string;
}

export const Menu = ({ difficulties, title }: MenuProps) => {
  const navigate = useNavigate();

  const handleDifficultySelect = (difficulty: Difficulty) => {
    navigate(`/game?difficulty=${difficulty.id}`);
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">{title}</h1>
      <div className="difficulty-options">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty.id}
            onClick={() => handleDifficultySelect(difficulty)}
          >
            {difficulty.name}
          </button>
        ))}
      </div>
    </div>
  );
};
