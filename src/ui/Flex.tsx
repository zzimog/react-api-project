import type { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { theme } from './theme';

export type FlexProps = {
  dir?: 'row' | 'column';
  wrap?: boolean;
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  placement?: CSSProperties['alignContent'];
  spacing?: number;
  style?: CSSProperties;
};

export const Flex = styled.div<FlexProps>((props) => ({
  width: '100%',
  display: 'flex',
  flexDirection: props.dir,
  flexWrap: props.wrap ? 'wrap' : 'nowrap',
  justifyContent: props.justify,
  alignItems: props.align,
  alignContent: props.placement,
  gap: theme.spacing(props.spacing ?? 2),
}));
