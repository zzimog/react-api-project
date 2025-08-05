import type { ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { Icon, theme } from '@ui';
import './button.css';

export type ButtonProps = {
  icon?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonRoot = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.25em;
  padding: 0;
  border: 0;
  border-radius: 0.25em;
  padding: 0.5em 0.75em;
  font-size: 1em;
  font-weight: 500;
  color: ${theme.colors.white.hex()};
  background: ${theme.colors.primary.darken(0.2).hex()};
  overflow: hidden;
  cursor: pointer;
`;

export const Button = (inProps: ButtonProps) => {
  const { icon, label, size = 'md', className, ...rest } = inProps;

  return (
    <ButtonRoot
      className={clsx(
        'button',
        { 'button-icon': icon, 'button-label': label },
        className
      )}
      data-size={size}
      {...rest}
    >
      {icon && <Icon name={icon} />}
      {label && <span className="label">{label}</span>}
    </ButtonRoot>
  );
};
