import type { ReactNode } from 'react';
import styled from 'styled-components';

const StickyHeader = styled.div`
  position: sticky;
  top: 40px;
  width: 100%;
  background-color: var(--color-dark-bg);
  z-index: 1;
  padding-top: 1rem;
  max-width: var(--width-lg);
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const PageHeader = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => {
  return (
    <StickyHeader>
      <Title>{title}</Title>
      {children}
    </StickyHeader>
  );
};
