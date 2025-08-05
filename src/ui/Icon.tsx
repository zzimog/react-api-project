import type { HTMLAttributes } from 'react';
import styled from '@emotion/styled';

export type IconProps = {
  name: string;
} & HTMLAttributes<HTMLElement>;

const IconRoot = styled.i`
  font-family: 'Material Symbols Rounded Variable';
`;

export const Icon = (inProps: IconProps) => {
  const { name, ...rest } = inProps;

  return <IconRoot {...rest}>{name}</IconRoot>;
};
