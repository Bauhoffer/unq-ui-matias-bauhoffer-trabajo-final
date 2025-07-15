import "./DifficultyMenu.css";
import { useState, useEffect } from "react";
import { Menu } from "../../components/menu/Menu";
import { difficultyService } from "../../services/difficultyService";
import type { ApiError, Difficulty } from "../../types/api";

const DifficultyMenu = () => {
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDifficulties = async () => {
      try {
        setLoading(true);
        const data = await difficultyService.getDifficulties();
        setDifficulties(data);
      } catch (error) {
        const apiError = error as ApiError;
        setError(apiError.message || "Error al cargar dificultades");
        console.error("Error fetching difficulties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDifficulties();
  }, []);

  if (loading) return <div>Cargando dificultades...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="difficulty-menu-container">
      <Menu difficulties={difficulties} title="Elegí tu dificultad" />
    </div>
  );
};

export default DifficultyMenu;
