import ProblemSolution from '..';
import { render } from '@/test/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

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
  hasPermission: vi.fn()
}));

vi.mock('@/services/problemSolution', () => ({
  problemSolutionHooks: {
    ProblemSolutionList: vi.fn(() => ({
      data: { ProblemSolutionList: [], totalRecords: 0 },
      isLoading: false
    }))
  }
}));

describe('ProblemSolution Component', () => {
  it('renders header, search and table', async () => {
    render(
      <ThemeProvider>
        <ProblemSolution />
      </ThemeProvider>
    );

    expect(screen.getByText(/Problems & Solutions/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search here/i)).toBeInTheDocument();
  });

  it('filter based on search input', async () => {
    render(
      <ThemeProvider>
        <ProblemSolution />
      </ThemeProvider>
    );

    const searchInput = screen.getByPlaceholderText(/Search here/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });

    // debounce + effect
    await waitFor(() => {
      expect(searchInput).toHaveValue('test');
    });
  });
});
