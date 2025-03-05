type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

function Modal({ children, onClose }: ModalProps) {
  return (
    <button className="modal-backdrop" onClick={onClose}>
      <dialog className="modal" open>
        {children}
      </dialog>
    </button>
  );
}

export default Modal;
