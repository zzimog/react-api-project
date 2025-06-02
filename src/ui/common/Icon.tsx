import '@fontsource-variable/material-symbols-rounded/wght.css';
import styled from '../styled';

export type IconProps = {
  name: string;
  size?: number;
};

export const Icon = (props: IconProps) => {
  const { name, size = 16 } = props;

  const IconRoot = styled.span({
    fontFamily: 'Material Symbols Rounded Variable',
    fontSize: `${size}px`,
    color: 'inherit',
  });

  return <IconRoot>{name}</IconRoot>;
};

export default Icon;
