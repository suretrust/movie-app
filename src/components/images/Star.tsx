import styled from 'styled-components';

type StarProps = {
  isActive: boolean;
  onClick?: () => void;
  size?: number;
};

const StyledStar = styled.button<{ $isActive: boolean; size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: ${({ $isActive }) =>
    $isActive ? 'var(--color-goldenrod)' : 'transparent'};
  border: 2px solid var(--color-gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 0;

  &:hover {
    background-color: ${({ $isActive }) =>
      $isActive ? 'var(--color-gold)' : 'var(--color-dark-bg)'};
  }

  svg {
    fill: ${({ $isActive }) => ($isActive ? 'white' : 'var(--color-gold)')};
    width: 60%;
    height: 60%;
  }
`;

export const Star = ({ isActive, onClick, size = 30 }: StarProps) => {
  return (
    <StyledStar
      onClick={onClick}
      $isActive={isActive}
      data-active={isActive}
      size={size}
      aria-label={isActive ? 'unfavorite' : 'favorite'}
    >
      <svg viewBox='0 0 24 24'>
        <path d='M12 .587l3.668 7.571L24 9.75l-6 5.847L19.336 24 12 20.203 4.664 24 6 15.597 0 9.75l8.332-1.592z' />
      </svg>
    </StyledStar>
  );
};
