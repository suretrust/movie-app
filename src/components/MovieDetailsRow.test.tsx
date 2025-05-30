import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MovieDetailsRow } from './MovieDetailsRow';
import { TestProviders } from '../test-utils/TestProviders';

describe('<MovieDetailsRow />', () => {
  const renderMovieDetailsRow = (name: string, value: string) => {
    render(
      <TestProviders>
        <MovieDetailsRow name={name} value={value} />
      </TestProviders>
    );
  };

  it('renders the label and value correctly', () => {
    renderMovieDetailsRow('director', 'Christopher Nolan');

    expect(screen.getByText('director:')).toBeInTheDocument();
    expect(screen.getByText('Christopher Nolan')).toBeInTheDocument();
  });

  it('renders the value inside a <b> tag', () => {
    renderMovieDetailsRow('genre', 'Sci-Fi');

    const boldElement = screen.getByText('Sci-Fi');
    expect(boldElement.tagName).toBe('B');
  });
});
