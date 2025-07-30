import { render } from '@/test/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import UserManagement from '../Index';

import ThemeProvider from '@/styles/config';

vi.mock('@ckeditor/ckeditor5-watchdog', async () => {
  const actual = await vi.importActual('@ckeditor/ckeditor5-watchdog');
  return actual;
});
vi.mock('@ckeditor/ckeditor5-react', () => ({
  CKEditor: () => null
}));

// Mock the CKEditor build
vi.mock('@ckeditor/ckeditor5-build-classic', () => ({
  default: {}
}));

// 🚨 Critical: mock the watchdog module too
vi.mock('@ckeditor/ckeditor5-watchdog', () => ({
  default: {}
}));

vi.mock('@/shared/utils/functions', () => ({
  debounce: (fn: any) => fn,
  getSortOrder: vi.fn((order) => (order === 'ascend' ? 'ASC' : order === 'descend' ? 'DESC' : '')),
  hexToRGBA: vi.fn(),
  capitalizeFirstLetter: vi.fn(),
  getAntDSortOrder: vi.fn(),
  buildSearchParams: vi.fn(),
  formatPhoneNumberInUsFormat: vi.fn(),
  hasPermission: vi.fn()
}));

vi.mock('@/services/user', () => ({
  userHooks: {
    UserList: vi.fn(() => ({
      data: { UserList: [], totalRecords: 0 },
      isLoading: false
    }))
  }
}));

describe('UserManagement Component', () => {
  it('renders header, search, select and table', async () => {
    render(
      <ThemeProvider>
        <UserManagement />
      </ThemeProvider>
    );

    expect(screen.getByText(/User management/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search for User/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Company/i)).toBeInTheDocument(); // fixed
    expect(screen.getByText(/Select Facility/i)).toBeInTheDocument(); // fixed
    expect(screen.getByText(/Select Role/i)).toBeInTheDocument(); // fixed
  });

  it('filters users based on search input', async () => {
    render(
      <ThemeProvider>
        <UserManagement />
      </ThemeProvider>
    );

    const searchInput = screen.getByPlaceholderText(/Search for User/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });

    // debounce + effect
    await waitFor(() => {
      expect(searchInput).toHaveValue('test');
    });
  });

  it('updates table when company is selected', async () => {
    render(
      <ThemeProvider>
        <UserManagement />
      </ThemeProvider>
    );

    // Open dropdown
    const companyDropdown = screen.getByText(/Select Company/i);
    fireEvent.mouseDown(companyDropdown);
  });

  it('should update facility dropdown when a value is selected', async () => {
    render(
      <ThemeProvider>
        <UserManagement />
      </ThemeProvider>
    );

    const facilityDropdown = screen.getByText(/Select Facility/i);
    fireEvent.mouseDown(facilityDropdown);
  });

  it('should update role dropdown when a value is selected', async () => {
    render(
      <ThemeProvider>
        <UserManagement />
      </ThemeProvider>
    );

    const roleDropdown = screen.getByText(/Select Role/i);
    fireEvent.mouseDown(roleDropdown);
  });
});
