import type { ButtonHTMLAttributes, MouseEvent } from 'react';
import { createRef } from 'react';
import styled from '@/ui/styled';
import generateClasses from '@/utils/generateClasses';

const classes = generateClasses('Button', ['root', 'halo', 'label']);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonHalo = styled.div({
  position: 'absolute',
  top: 'var(--y)',
  left: 'var(--x)',
  width: 'var(--haloSize)',
  height: 'var(--haloSize)',
  transform: 'translate(-50%, -50%)',
  transitionProperty: 'width, height',
  transitionDuration: '.2s',
  transitionTimingFunction: 'ease-in-out',
  backgroundImage: 'radial-gradient(circle closest-side, #ffffff, transparent)',
  opacity: 0.25,
});

export const ButtonRoot = styled.button({
  '--haloSize': 0,

  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
  width: 'fit-content',
  padding: '10px 16px',
  border: 0,
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#fff',
  backgroundColor: 'var(--color-primary)',
  overflow: 'hidden',

  [`&:hover`]: {
    '--haloSize': '100px',
  },

  [`&:active`]: {
    '--haloSize': '500px',
  },
});

export const Button = (props: ButtonProps) => {
  const { children, onMouseEnter, onMouseLeave, ...rest } = props;
  const buttonRef = createRef<HTMLButtonElement>();

  function handleMouseMove(evt: globalThis.MouseEvent) {
    if (!buttonRef.current) {
      return;
    }

    const { top, left } = buttonRef.current.getBoundingClientRect();
    const x = evt.pageX - left;
    const y = evt.pageY - top;

    buttonRef.current.style.setProperty('--x', `${x}px`);
    buttonRef.current.style.setProperty('--y', `${y}px`);
  }

  function handleMouseEnter(evt: MouseEvent<HTMLButtonElement>) {
    window.addEventListener('mousemove', handleMouseMove);

    if (onMouseEnter) {
      onMouseEnter(evt);
    }
  }

  function handleMouseLeave(evt: MouseEvent<HTMLButtonElement>) {
    if (!buttonRef.current) {
      return;
    }

    window.removeEventListener('mousemove', handleMouseMove);
    buttonRef.current.style.removeProperty('--x');
    buttonRef.current.style.removeProperty('--y');

    if (onMouseLeave) {
      onMouseLeave(evt);
    }
  }

  return (
    <ButtonRoot
      ref={buttonRef}
      className={classes.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <ButtonHalo className={classes.halo} />
      {children}
    </ButtonRoot>
  );
};

export default Button;
