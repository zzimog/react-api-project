import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import styled from '../styled';

export type ModalProps = {
  open?: boolean;
  onClose?: () => void;
} & PropsWithChildren;

const ModalCinema = styled.div({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(0, 0, 0, 0.5)',
});

const ModalRoot = styled.div({
  position: 'absolute',
  top: '50%',
  left: '50%',
  padding: '16px',
  background: '#fff',
  transform: 'translate(-50%, -50%)',
});

export const Modal = (props: ModalProps) => {
  const { open, children, onClose } = props;

  function handleClose() {
    if (onClose) {
      onClose();
    }
  }

  if (!open) {
    return;
  }

  return createPortal(
    <>
      <ModalCinema onClick={handleClose} />
      <ModalRoot>{children}</ModalRoot>
    </>,
    document.body
  );
};

export default Modal;
