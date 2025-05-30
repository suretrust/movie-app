import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageHeader } from './PageHeader';
import { TestProviders } from '../test-utils/TestProviders';
import type { ReactNode } from 'react';

describe('<PageHeader />', () => {
  const renderPageHeader = (title: string, children?: ReactNode) => {
    render(
      <TestProviders>
        <PageHeader title={title}>{children}</PageHeader>
      </TestProviders>
    );
  };

  it('renders the header title', () => {
    renderPageHeader('Test Title');

    expect(
      screen.getByRole('heading', { name: 'Test Title' })
    ).toBeInTheDocument();
  });

  it('renders children when provided', () => {
    renderPageHeader('With Children', <p>Some child content</p>);

    expect(screen.getByText('Some child content')).toBeInTheDocument();
  });
});
