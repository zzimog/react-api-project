import type { ButtonHTMLAttributes } from 'react';
import styled from '../styled';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonRoot = styled.button({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: '#fff',
  background: 'var(--color-primary)',
  padding: '8px 16px',
  border: 0,
  borderRadius: '4px',
  cursor: 'pointer',
});

export const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;

  return <ButtonRoot {...rest}>{children}</ButtonRoot>;
};

export default Button;
