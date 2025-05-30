import styled from 'styled-components';

export const Input = styled.input`
  width: var(--width-xs);
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 90%;
  }
`;
