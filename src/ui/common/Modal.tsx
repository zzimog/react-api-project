import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import styled from '../styled';

export type ModalProps = {
  open?: boolean;
  width?: string;
  height?: string;
  onClose?: () => void;
} & PropsWithChildren;

const ModalCinema = styled.div({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(152, 164, 174, 0.5)',
});

const ModalRoot = styled.div({
  position: 'absolute',
  top: '50%',
  left: '50%',
  maxWidth: '100vw',
  background: '#fff',
  transform: 'translate(-50%, -50%)',
  borderRadius: '8px',
  overflow: 'hidden',
});

export const Modal = (props: ModalProps) => {
  const { open, width, height, children, onClose } = props;

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
      <ModalRoot
        style={{
          width,
          height,
        }}
      >
        {children}
      </ModalRoot>
    </>,
    document.body
  );
};

export default Modal;
