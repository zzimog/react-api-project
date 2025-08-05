import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const rotate = keyframes`
  0%   { transform: rotate(0);      }
  100% { transform: rotate(360deg); }
`;

export const Loader = styled.div<{ size?: number }>`
  position: relative;
  width: ${(p) => p.size || 100}px;
  height: ${(p) => p.size || 100}px;

  &::before {
    content: '';
    position: absolute;
    inset: 50% 0 0 50%;
    width: 90%;
    height: 90%;
    border-radius: 50%;
    margin: -45% 0 0 -45%;
    border: 5px solid white;
    border-right-color: transparent;
    animation: ${rotate} 1s linear infinite;
  }
`;
