import "./DifficultyMenu.css";
import { useState, useEffect } from "react";
import { Menu } from "../../components/menu/Menu";
import { difficultyService } from "../../services/difficultyService";
import type { Difficulty } from "../../types/api";
import Error from "../../components/error/Error";
import { useNavigate } from "react-router-dom";
import type { HandledApiError } from "../../services/errorHandler";

const DifficultyMenu = () => {
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDifficulties = async () => {
      try {
        setLoading(true);
        const data = await difficultyService.getDifficulties();
        setDifficulties(data);
      } catch (error) {
        const err = error as HandledApiError;
        setError(err.message || "Error al cargar dificultades");
      } finally {
        setLoading(false);
      }
    };

    fetchDifficulties();
  }, []);

  const handleBackToMenu = () => {
    navigate("/difficulty");
  };

  if (loading) return <div>Cargando dificultades...</div>;
  if (error) return <Error errorMessage={error} actionButton={handleBackToMenu} />;

  return (
    <div className="difficulty-menu-container">
      <Menu difficulties={difficulties} title="Elegí tu dificultad" />
    </div>
  );
};

export default DifficultyMenu;
