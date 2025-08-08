import type { ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { Icon, theme } from '@/ui';
import { match } from '@/utils';
import { type ButtonClasses, buttonClasses } from './buttonClasses';
import clsx from 'clsx';

const classes: ButtonClasses = buttonClasses;

export type ButtonProps = {
  icon?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonRoot = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  padding: 0;
  border: 0;
  border-radius: 4px;
  font-size: ${(p) =>
    match(p.size, {
      sm: '0.8em',
      md: '1em',
      lg: '1.2em',
    })};
  font-weight: 500;
  color: ${theme.colors.white};
  background: ${theme.colors.primary};
  overflow: hidden;
  cursor: pointer;
  opacity: ${(p) => p.disabled && 0.5};

  &:active {
    color: whitesmoke;
    background: slategray;
  }

  &:disabled,
  &.disabled {
    pointer-events: none;
    cursor: default;
  }

  .${classes.icon}, .${classes.label} {
    box-sizing: content-box;
    line-height: 1.5em;
  }

  .${classes.label} {
    padding: ${(p) =>
      match(p.size, {
        sm: '4px 8px',
        md: '8px 12px',
        lg: '12px 16px',
      })};
  }

  .${classes.icon} {
    width: 1.5em;
    text-align: center;
    padding: ${(p) =>
      match(p.size, {
        sm: '4px',
        md: '8px',
        lg: '12px',
      })};

    & + .${classes.label} {
      padding-left: 0;
    }
  }
`;

export const Button = (inProps: ButtonProps) => {
  const { icon, label, size = 'md', className, ...rest } = inProps;

  return (
    <ButtonRoot size={size} className={clsx(className, classes.root)} {...rest}>
      {icon && <Icon className={classes.icon} name={icon} />}
      {label && <span className={classes.label}>{label}</span>}
    </ButtonRoot>
  );
};
