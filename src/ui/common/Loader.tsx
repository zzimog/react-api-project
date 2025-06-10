import { keyframes } from '@emotion/react';
import styled from '../styled';

/**
 * @todo Get size, color and speed from props
 */
const SIZE = 60;
const COLOR = 'var(--color-primary)';
const SPEED = 1;

const scale = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0)
  }
  60%, 100% {
    transform: translate(-50%, -50%) scale(1)
  }
`;

const pulse = keyframes`
  0%, 60%, 100% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.2)
  }
`;

const LoaderRoot = styled.div({
  position: 'relative',
  width: `${SIZE}px`,
  height: `${SIZE}px`,
  margin: '32px auto',

  [`.circle`]: {
    position: 'absolute',
    width: `${SIZE * 0.8}px`,
    height: `${SIZE * 0.8}px`,
    border: `5px solid ${COLOR}`,
    borderRadius: '50%',
    animationDuration: `${SPEED}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  },

  [`& > .circle`]: {
    top: `${SIZE * 0.1}px`,
    left: `${SIZE * 0.1}px`,
    animationName: pulse,

    [`& > .circle`]: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      animationName: scale,
    },
  },
});

export const Loader = () => {
  return (
    <LoaderRoot>
      <div className="circle">
        <div className="circle" />
      </div>
    </LoaderRoot>
  );
};

export default Loader;
