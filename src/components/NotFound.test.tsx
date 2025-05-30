import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NotFound } from './NotFound';
import { TestProviders } from '../test-utils/TestProviders';

describe('<NotFound />', () => {
  const renderNotFound = () => {
    render(
      <TestProviders>
        <NotFound />
      </TestProviders>
    );
  };

  it('displays the 404 heading and message', () => {
    renderNotFound();

    expect(
      screen.getByRole('heading', { name: /404 - page not found/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/sorry, the page you are looking for does not exist/i)
    ).toBeInTheDocument();
  });

  it('provides a link to navigate back to home', () => {
    renderNotFound();

    const homeLink = screen.getByRole('link', { name: /go back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
