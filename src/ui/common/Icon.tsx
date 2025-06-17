import '@fontsource-variable/material-symbols-rounded/wght.css';
import styled from '../styled';
import generateClasses from '@/utils/generateClasses';
import clsx from 'clsx';

const sizes: Record<string, number> = {
  small: 14,
  medium: 16,
  large: 20,
};

const classes = generateClasses('MaterialIcon', [
  'icon',
  ...Object.keys(sizes),
]);

export type IconProps = {
  name: string;
  size?: 'small' | 'medium' | 'large';
};

export const IconRoot = styled.span({
  fontFamily: 'Material Symbols Rounded Variable',
  color: 'inherit',

  ...Object.keys(sizes).reduce<Record<string, object>>((prev, size) => {
    prev[`&.${classes[size]}`] = {
      fontSize: `${sizes[size]}px`,
    };
    return prev;
  }, {}),
});

export const Icon = (props: IconProps) => {
  const { name, size = 'medium' } = props;

  return (
    <IconRoot className={clsx(classes.icon, classes[size])}>{name}</IconRoot>
  );
};

export default Icon;
