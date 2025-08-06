import { useState, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { Flex, Button, theme } from '@/ui';

export type ModalProps = {
  open?: boolean;
  onClose?: () => void;
} & PropsWithChildren;

const ModalRoot = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);

  .modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: ${theme.spacing(4)};
    color: black;
    background: white;
    transform: translate(-50%, -50%);
  }
`;

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
      <ModalRoot>
        <div className="modal-window">
          <Flex justify="flex-end">
            <Button label="Close" onClick={handleClose} />
          </Flex>

          <div className="modal-resource">{children}</div>
        </div>
      </ModalRoot>,
      document.body
    )
  );
};
