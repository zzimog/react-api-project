import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
import './button.css';

export type ButtonProps = {
  icon?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (inProps: ButtonProps) => {
  const { icon, label, size = 'md', className, ...rest } = inProps;

  return (
    <button
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
    </button>
  );
};
