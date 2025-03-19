import React from "react";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

function Modal({ children, onClose }: ModalProps) {
  return (
    <>
      <div
        className="modal-backdrop"
        onClick={onClose}
        onKeyDown={onClose}
        role="button"
        tabIndex={0}
        style={{
          position: "fixed",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 100,
        }}
      />
      <div
        className="modal"
        style={{
          position: "fixed",
          zIndex: 101,
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
      >
        {children}
      </div>
    </>
  );
}

export default Modal;
