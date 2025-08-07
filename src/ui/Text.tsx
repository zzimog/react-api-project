import styled from '@emotion/styled';
import { match } from '@/utils';

export type TextProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export const Text = styled.span<TextProps>`
  font-weight: ${({ as }) => {
    if ((as as string)?.startsWith('h')) {
      return 600;
    }

    return 400;
  }};

  font-size: ${({ as, size }) =>
    match(size, {
      xl: 20,
      lg: 18,
      md: 16,
      sm: 14,
      xs: 12,
    }) ||
    match(as, {
      h1: 22,
      h2: 20,
      h3: 18,
      h4: 16,
      h5: 14,
      h6: 12,
    }) ||
    16}px;
`;
