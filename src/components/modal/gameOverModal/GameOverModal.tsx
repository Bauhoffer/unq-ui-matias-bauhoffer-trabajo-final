import BaseModal from "../baseModal/BaseModal";
import "./GameOverModal.css";

interface GameOverModalProps {
  isOpen: boolean;
  isWinner: boolean;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const GameOverModal = ({
  isOpen,
  isWinner,
  onPlayAgain,
  onBackToMenu,
}: GameOverModalProps) => {
  const title = isWinner ? "¡Felicitaciones!" : "Game Over";
  const message = isWinner ? "¡Ganaste!" : "Perdiste";
  const emoji = isWinner ? "🎉" : "😔";

  return (
    <BaseModal isOpen={isOpen} title={title} isDismissible={false} showCloseButton={false}>
      <div className="game-over-modal">
        <div className="game-over-emoji">{emoji}</div>
        <div className="game-over-message">{message}</div>
        
        <div className="game-over-actions">
          <button 
            onClick={onBackToMenu} 
            className="btn-modal btn-back-menu"
          >
            Volver al menú
          </button>
          <button 
            onClick={onPlayAgain} 
            className="btn-modal btn-play-again"
          >
            Jugar de nuevo
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default GameOverModal;
