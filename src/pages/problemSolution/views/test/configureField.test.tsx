import { render } from '@/test/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { problemSolutionHooks } from '@/services/problemSolution';

import ConfigureFiled from '../ConfigureFiled';

import ThemeProvider from '@/styles/config';

vi.mock('@/services/problemSolution', () => ({
  problemSolutionHooks: {
    GetProblemSolutionDetail: vi.fn(),
    useEditProblemSolution: vi.fn()
  },
  problemSolutionQueryKeys: {
    all: ['problem-solution']
  }
}));

vi.mock('@/shared/utils/functions', () => ({
  showToaster: vi.fn(),
  hexToRGBA: vi.fn(),
  hasPermission: vi.fn()
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ id: '123' })
  };
});

vi.mock('@/shared/components/common/Loader', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>
}));

vi.mock('@/shared/components/common/Details', () => ({
  default: ({ detailsTitle, detailsDescription }: any) => (
    <div>
      <span>{detailsTitle}</span>: <span>{detailsDescription}</span>
    </div>
  )
}));

vi.mock('@/shared/components/common/FormField', () => ({
  RenderTextAreaInput: ({ formItemProps }: any) => (
    <textarea placeholder={formItemProps.label} {...formItemProps} />
  )
}));

vi.mock('@/shared/components/common/CardWithTitle', () => ({
  default: ({ title, children }: any) => (
    <div>
      <h3>{title}</h3>
      {children}
    </div>
  )
}));

vi.mock('@/shared/components/common/HeaderToolbar', () => ({
  default: ({ title, button }: any) => (
    <div>
      <h1>{title}</h1>
      {button}
    </div>
  )
}));

vi.mock('@/shared/components/common/Meta', () => ({
  default: ({ title }: any) => <title>{title}</title>
}));

// Setup common mocks
const mockMutate = vi.fn();

beforeEach(() => {
  (problemSolutionHooks.GetProblemSolutionDetail as any).mockReturnValue({
    data: {
      problem: 'Test Problem',
      solution: 'Test Solution',
      section: 'Test Section',
      field: 'Test Field',
      updated_by: 'Admin',
      updatedAt: new Date().toISOString()
    },
    isLoading: false
  });

  (problemSolutionHooks.useEditProblemSolution as any).mockReturnValue({
    mutate: mockMutate,
    isPending: false
  });
});

describe('ConfigureFiled Component', () => {
  it('renders loader when loading', () => {
    (problemSolutionHooks.GetProblemSolutionDetail as any).mockReturnValueOnce({
      data: null,
      isLoading: true
    });

    render(
      <ThemeProvider>
        <ConfigureFiled />
      </ThemeProvider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders problem and solution textareas with values', async () => {
    render(
      <ThemeProvider>
        <ConfigureFiled />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Write problem')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Write Solution')).toBeInTheDocument();
      expect(screen.getByText('Field Module')).toBeInTheDocument();
      expect(screen.getByText('Field Name')).toBeInTheDocument();
    });
  });

  it('calls mutate function on form submit', async () => {
    render(
      <ThemeProvider>
        <ConfigureFiled />
      </ThemeProvider>
    );

    // Fill in the textarea values
    fireEvent.change(screen.getByPlaceholderText('Write problem'), {
      target: { value: 'Updated Problem' }
    });
    fireEvent.change(screen.getByPlaceholderText('Write Solution'), {
      target: { value: 'Updated Solution' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });
});
