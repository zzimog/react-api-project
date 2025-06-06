import { useRef, type ButtonHTMLAttributes, type MouseEvent } from 'react';
import styled from '../styled';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonHoverEffect = styled.div({
  position: 'absolute',
  top: 'var(--y)',
  left: 'var(--x)',
  width: 'var(--hoverEffectSize)',
  height: 'var(--hoverEffectSize)',
  transform: 'translate(-50%, -50%)',
  transitionProperty: 'width, height',
  transitionDuration: '.2s',
  transitionTimingFunction: 'ease-in-out',
  backgroundImage: 'radial-gradient(circle closest-side, #ffffff, transparent)',
  opacity: 0.25,
});

const ButtonRoot = styled.button({
  '--hoverEffectSize': 0,

  position: 'relative',
  display: 'flex',
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
    '--hoverEffectSize': '100px',
  },

  [`&:active`]: {
    '--hoverEffectSize': '500px',
  },
});

export const Button = (props: ButtonProps) => {
  const { children, onMouseEnter, onMouseLeave, ...rest } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    window.removeEventListener('mousemove', handleMouseMove);

    if (onMouseLeave) {
      onMouseLeave(evt);
    }
  }

  return (
    <ButtonRoot
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <ButtonHoverEffect />
      {children}
    </ButtonRoot>
  );
};

export default Button;
