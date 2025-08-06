import styled from '@emotion/styled';
import { match } from '@/utils';

export type TextProps = {
  size?: number;
};

export const Text = styled.span<TextProps>`
  font-weight: ${({ as }) => {
    if ((as as string)?.startsWith('h')) {
      return 600;
    }

    return 400;
  }};

  font-size: ${({ as, size }) =>
    size ||
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
