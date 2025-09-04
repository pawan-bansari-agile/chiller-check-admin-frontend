import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import EditLog from '../view/EditLog';

import ThemeProvider from '@/styles/config';

vi.mock('../components/AddEditLog', () => ({
  default: () => <div data-testid="add-edit-log">Mocked AddEditLog</div>
}));

vi.mock('@/shared/components/common/Meta', () => ({
  default: ({ title }: { title: string }) => <title>{title}</title>
}));

describe('EditLog Component', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider>
        <EditLog />
      </ThemeProvider>
    );
    expect(screen.getByTestId('add-edit-log')).toBeInTheDocument();
  });

  it('sets the correct meta title', () => {
    render(
      <ThemeProvider>
        <EditLog />
      </ThemeProvider>
    );
    expect(document.title).toBe('Log Entries');
  });
});
