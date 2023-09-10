// Modal.js
import React from "react";
import modalStyles from "./modal.module.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  header?: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
};

const Modal = ({ isOpen, onClose, header, body, footer }: ModalProps) => {
  const closeModal = () => {
    onClose();
  };

  return (
    isOpen && (
      <div className={modalStyles["modal-overlay"]}>
        <div className={modalStyles.modal}>
          <div className={modalStyles["modal-header"]}>
            {header && <div className={modalStyles["modal-header-content"]}>{header}</div>}
            <button className={modalStyles["modal-close"]} onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className={modalStyles["modal-content"]}>{body}</div>
          {footer && <div className={modalStyles["modal-footer"]}>{footer}</div>}
        </div>
      </div>
    )
  );
};

export default Modal;
