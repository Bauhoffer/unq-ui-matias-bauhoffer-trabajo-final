import { GameRules } from "../../gameRules/GameRules";
import BaseModal from "../baseModal/BaseModal";

type RulesModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

const RulesModal = ({
  isOpen,
  onClose,
}: RulesModalProps) => {
  const title = "Reglas del Juego";

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} isDismissible={true}>
        <GameRules />
    </BaseModal>
  );
};

export default RulesModal;
