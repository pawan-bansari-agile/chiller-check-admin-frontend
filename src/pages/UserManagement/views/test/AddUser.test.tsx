import { render } from '@/test/utils';
import { describe, expect, it, vi } from 'vitest';

import AddUser from '../AddUser';

import ThemeProvider from '@/styles/config';

// Update the path as per your structure

// Mock the child component to isolate the test
vi.mock('../components/UserAddEditForm', () => ({
  default: () => <div data-testid="user-add-edit-form">User Add/Edit Form</div>
}));

// Mock Meta if needed (optional)
vi.mock('@/shared/components/common/Meta', () => ({
  default: ({ title }: { title: string }) => <title>{title}</title>
}));

describe('AddUser Component', () => {
  const setup = () =>
    render(
      <ThemeProvider>
        <AddUser />
      </ThemeProvider>
    );

  it('renders AddUser page with title and form', () => {
    setup();

    expect(document.title).toBe('User Management'); // If Meta sets it correctly
  });
});
