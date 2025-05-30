import styled from 'styled-components';
import { LOADER_TEXT } from '../constants';

const LoadingWrapper = styled.p`
  color: var(--color-dark-bg);
  position: absolute;
  left: 50%;
  height: 120px;
  width: 120px;
  transform: translate(-50%, 50%);
  background-color: var(--color-goldenrod);
  padding: 0.5rem 1rem;
  border-radius: 50%;
  animation: blink 1s infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 2;
  font-weight: bold;
  font-size: 1rem;

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const LoadingMessage = () => {
  return <LoadingWrapper>{LOADER_TEXT}</LoadingWrapper>;
};
