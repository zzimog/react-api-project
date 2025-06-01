import type { PropsWithChildren } from 'react';
import styled from '@utils/styled';

type ModalProps = {
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
  padding: '16px',
  background: '#fff',
});

const Modal = (props: ModalProps) => {
  const { open, children, onClose } = props;

  function handleClose() {
    if (onClose) {
      onClose();
    }
  }

  if (!open) {
    return;
  }

  return (
    <ModalCinema onClick={handleClose}>
      <ModalRoot>{children}</ModalRoot>
    </ModalCinema>
  );
};

export default Modal;
