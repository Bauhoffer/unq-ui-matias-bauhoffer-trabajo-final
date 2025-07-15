import { type ReactNode } from "react";
import "./BaseModal.css";

type BaseModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  children: ReactNode;
  isDismissible?: boolean;
  showCloseButton?: boolean;
};

const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
  isDismissible = true,
  showCloseButton = true,
}: BaseModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (isDismissible && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div className="base-modal-overlay" onClick={handleOverlayClick}>
      <div className="base-modal-content">
        <div className="base-modal-header">
          <h2 className="base-modal-title">{title}</h2>
          {showCloseButton && (
            <button className="base-modal-close" onClick={onClose}>
              &times;
            </button>
          )}
        </div>
        <div className="base-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default BaseModal;
