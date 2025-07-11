import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { GameGrid } from "../../components/gameGrid/GameGrid";
import { Keyboard } from "../../components/keyboard/Keyboard";
import { checkWordService } from "../../services/checkWordService";
import { gameSessionService } from "../../services/gameSessionService";
import type {
  CheckWordResponse,
  CheckWordRequest,
  GameSession,
} from "../../types/api";
import "./Game.css";
import { SOLUTION } from "../../types/solution";

interface Attempt {
  word: string;
  result?: CheckWordResponse;
}

type GameStatus = "playing" | "won" | "lost";

const Game = () => {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const difficultyId = searchParams.get("difficulty");

  const maxAttemps = 6;

  useEffect(() => {
    const initializeGame = async () => {
      if (!difficultyId) {
        setError("No se especificó una dificultad");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const session = await gameSessionService.getGameSession(difficultyId);
        setGameSession(session);
        setCurrentWord("");
        setAttempts([]);
        setError(null);
        setGameStatus("playing");
        console.log("Game session created:", session);
      } catch (_) {
      } finally {
        setLoading(false);
      }
    };

    initializeGame();
  }, [difficultyId]);

  const handleKeyPress = (key: string) => {
    if (
      gameSession &&
      gameStatus === "playing" &&
      currentWord.length < gameSession.wordLenght
    ) {
      setCurrentWord((prev) => prev + key);
    }
  };

  const handleEnter = async () => {
    if (!gameSession || gameStatus !== "playing") return;

    if (
      currentWord.length === gameSession.wordLenght &&
      attempts.length < maxAttemps //revisar si corta con 5 o 6 intentos
    ) {
      try {
        const request: CheckWordRequest = {
          sessionId: gameSession.sessionId,
          word: currentWord.toLowerCase(),
        };
        console.log("Request", request);

        const result = await checkWordService.checkWord(request);
        console.log("Resultado del intento:", result);
        // Agregar el intento con su resultado
        const newAttempt = { word: currentWord, result };
        setAttempts((prev) => [...prev, newAttempt]);
        setCurrentWord("");

        const isWinner = result.every(
          (letter) => letter.solution === SOLUTION.CORRECT
        );
        if (isWinner) {
          setGameStatus("won");
          console.log("¡Ganaste!");
        } else if (attempts.length + 1 >= maxAttemps) {
          setGameStatus("lost");
          console.log("Game Over");
        }
      } catch (_) {}
    }
  };

  const handleBackspace = () => {
    if (gameStatus === "playing") {
      setCurrentWord((prev) => prev.slice(0, -1));
    }
  };

  const handlePlayAgain = async () => {
    if (!difficultyId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const newSession = await gameSessionService.getGameSession(difficultyId);
      setGameSession(newSession);
      
      setCurrentWord("");
      setAttempts([]);
      setGameStatus("playing");
      
      console.log("New game session created:", newSession);
    } catch (error) {
      setError("Error al iniciar un nuevo juego");
      console.error("Error creating new game session:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToMenu = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="game-container">
        <div className="game-loading">Iniciando juego...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-container">
        <div className="game-error">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={handleBackToMenu}>Volver al menú</button>
        </div>
      </div>
    );
  }

  if (!gameSession) {
    return (
      <div className="game-container">
        <div className="game-error">No se pudo cargar la sesión de juego</div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Dificultad: {gameSession.difficulty.name}</h2>
        <p>
          Palabras de {gameSession.wordLenght} letras - {maxAttemps} intentos
        </p>
        {gameStatus !== "playing" && (
          <div className="game-status">
            {gameStatus === "won" ? (
              <div className="status-won">¡Felicitaciones! ¡Ganaste!</div>
            ) : (
              <div className="status-lost">Game Over</div>
            )}
          </div>
        )}
      </div>

      <GameGrid
        attempts={attempts}
        currentWord={currentWord}
        maxAttempts={maxAttemps}
        wordLength={gameSession.wordLenght}
      />

      <Keyboard
        onKeyPress={handleKeyPress}
        onEnter={handleEnter}
        onBackspace={handleBackspace}
      />

      {gameStatus !== "playing" && (
        <div className="game-actions">
          <button onClick={handlePlayAgain} className="btn-play-again">
            Jugar de nuevo
          </button>
          <button onClick={handleBackToMenu} className="btn-back-menu">
            Volver al menú
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
