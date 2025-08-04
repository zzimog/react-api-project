import type { CSSProperties, PropsWithChildren } from 'react';

export type FlexProps = {
  dir?: 'row' | 'column';
  wrap?: boolean;
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  placement?: CSSProperties['alignContent'];
  gap?: number;
  style?: CSSProperties;
} & PropsWithChildren;

export const Flex = (inProps: FlexProps) => {
  const {
    dir = 'row',
    wrap = true,
    justify = 'normal',
    align = 'normal',
    placement = 'normal',
    gap = 0,
    style,
    children,
    ...rest
  } = inProps;

  const flexStyle: CSSProperties = {
    width: '100%',
    display: 'flex',
    flexFlow: `${dir} ${wrap ? 'wrap' : 'nowrap'}`,
    justifyContent: justify,
    alignItems: align,
    alignContent: placement,
    gap,
    ...style,
  };

  return (
    <div style={flexStyle} {...rest}>
      {children}
    </div>
  );
};
