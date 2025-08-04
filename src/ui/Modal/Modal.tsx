import { useState, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../Button';
import './modal.css';

export type ModalProps = {
  open?: boolean;
  onClose?: () => void;
} & PropsWithChildren;

export const Modal = (inProps: ModalProps) => {
  const { open: initialOpen = false, children, onClose } = inProps;
  const [open, setOpen] = useState(initialOpen);

  function handleClose() {
    if (onClose) {
      onClose();
      return;
    }

    setOpen(false);
  }

  return (
    open &&
    createPortal(
      <div className="modal">
        <div className="modal-window">
          <div className="modal-toolbar">
            <Button label="Close" onClick={handleClose} />
          </div>

          <div className="modal-resource">{children}</div>
        </div>
      </div>,
      document.body
    )
  );
};
