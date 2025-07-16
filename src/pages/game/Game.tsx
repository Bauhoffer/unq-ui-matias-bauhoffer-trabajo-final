import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { GameGrid } from "../../components/gameGrid/GameGrid";
import { Keyboard } from "../../components/keyboard/Keyboard";
import Error from "../../components/error/Error";
import GameOverModal from "../../components/modal/gameOverModal/GameOverModal";
import RulesModal from "../../components/modal/rulesModal/RulesModal";
import { checkWordService } from "../../services/checkWordService";
import { gameSessionService } from "../../services/gameSessionService";
import type {
  CheckWordResponse,
  CheckWordRequest,
  GameSession,
} from "../../types/api";
import "./Game.css";
import { SOLUTION } from "../../types/solution";
import goBackIcon from "../../assets/left-arrow-circle.svg";
import rulesIcon from "../../assets/question-circle.svg";
import type { HandledApiError } from "../../services/errorHandler";
import toast, { Toaster } from "react-hot-toast";
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
  const [showModal, setShowModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [isCheckingWord, setIsCheckingWord] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const difficultyId = searchParams.get("difficulty");

  const maxAttemps = 6;

  useEffect(() => {
    const initializeGame = async () => {
      if (!difficultyId) {
        setError("No se especificó una dificultad.");
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
      } catch (error) {
        const err = error as HandledApiError;
        if (
          err?.statusCode === 404 &&
          err.message.includes("Difficulty not found")
        ) {
          setError("Dificultad no encontrada.");
        }
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
    if (!gameSession || gameStatus !== "playing" || isCheckingWord) return;

    if (
      currentWord.length === gameSession.wordLenght &&
      attempts.length < maxAttemps
    ) {
      try {
        setIsCheckingWord(true);
        const request: CheckWordRequest = {
          sessionId: gameSession.sessionId,
          word: currentWord.toLowerCase(),
        };

        const result = await checkWordService.checkWord(request);
        const newAttempt = { word: currentWord, result };
        setAttempts((prev) => [...prev, newAttempt]);
        setCurrentWord("");

        const isWinner = result.every(
          (letter) => letter.solution === SOLUTION.CORRECT
        );

        if (isWinner) {
          setGameStatus("won");
          setShowModal(true);
        } else if (attempts.length + 1 >= maxAttemps) {
          setGameStatus("lost");
          setShowModal(true);
        }
      } catch (error) {
        const err = error as HandledApiError;
        if (
          err?.statusCode === 400 &&
          err.message.includes("Invalid request")
        ) {
          setError("Uy, parece que algo salió mal. Intentalo de nuevo por favor.");
        }
        if (
          err?.statusCode === 404 &&
          err.message.includes("Session not found")
        ) {
          setError("Uy, parece que algo salió mal. Intentalo de nuevo por favor.");
        }
        if (err?.statusCode === 400 && err.message.includes("Incorrect word")) {
          toast.error("Esa palabra no existe. Intenta con otra.");
        }
      } finally {
        setIsCheckingWord(false);
      }
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
      setShowModal(false);

      const newSession = await gameSessionService.getGameSession(difficultyId);
      setGameSession(newSession);

      setCurrentWord("");
      setAttempts([]);
      setGameStatus("playing");
    } catch (error) {
      const err = error as HandledApiError;
      if (
        err?.statusCode === 404 &&
        err.message.includes("Difficulty not found")
      ) {
        setError("Dificultad no encontrada.");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const resetGameSession = () => {
    setCurrentWord("");
    setAttempts([]);
    setGameSession(null);
    setError(null);
    setGameStatus("playing");
    setShowModal(false);
    setShowRulesModal(false);
  };

  const handleBackToMenu = () => {
    resetGameSession();
    navigate("/difficulty");
  };

  const handleShowRules = () => {
    setShowRulesModal(true);
  };

  const handleCloseRulesModal = () => {
    setShowRulesModal(false);
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
        <Error errorMessage={error} actionButton={handleBackToMenu} />
      </div>
    );
  }

  if (!gameSession) {
    return (
      <div className="game-container">
        <Error errorMessage={"No se pudo cargar la sesión de juego."} actionButton={handleBackToMenu} />
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <img
          src={goBackIcon}
          alt="go back"
          className="game-header-icons"
          onClick={handleBackToMenu}
        />
        <Toaster
          toastOptions={{
            className: "toast",
          }}
        />
        <img
          src={rulesIcon}
          alt="game rules"
          className="game-header-icons"
          onClick={handleShowRules}
        />
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
        isLoading={isCheckingWord}
      />

      <GameOverModal
        isOpen={showModal}
        isWinner={gameStatus === "won"}
        onPlayAgain={handlePlayAgain}
        onBackToMenu={handleBackToMenu}
      />

      <RulesModal isOpen={showRulesModal} onClose={handleCloseRulesModal} />
    </div>
  );
};

export default Game;
