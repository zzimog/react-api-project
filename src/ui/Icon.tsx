import clsx from 'clsx';
import type { CSSProperties, HTMLAttributes } from 'react';

export type IconProps = {
  name: string;
} & HTMLAttributes<HTMLElement>;

const iconStyle: CSSProperties = {
  fontFamily: 'Material Symbols Rounded Variable',
};

export const Icon = (inProps: IconProps) => {
  const { name, className, ...rest } = inProps;

  return (
    <i style={iconStyle} className={clsx('icon', className)} {...rest}>
      {name}
    </i>
  );
};
