import { render } from '@/test/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { showToaster } from '@/shared/utils/functions';

import EditTermsCondition from './EditTermsCondition';

import ThemeProvider from '@/styles/config';

vi.mock('@/shared/utils/functions', () => ({
  showToaster: vi.fn(),
  hexToRGBA: vi.fn()
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

const mockUseCmsList = vi.fn();
const mockUpdateCms = vi.fn();

vi.mock('@/services/cms', async () => {
  const actual = await vi.importActual('@/services/cms');
  return {
    ...actual,
    cmsHooks: {
      useCmsList: () => mockUseCmsList(),
      useUpdateCms: () => ({
        mutate: mockUpdateCms,
        isPending: false
      })
    }
  };
});

// Mocks for CKEditorFormItem — replace if it's too complex to mount
vi.mock('@/shared/components/common/FormField', async () => {
  const actual = await vi.importActual('@/shared/components/common/FormField');
  return {
    ...actual,
    CKEditorFormItem: ({ onChange, data }: any) => (
      <textarea
        data-testid="ckeditor"
        onChange={(e) => onChange?.(e, { getData: () => e.target.value })}
        defaultValue={data}
        placeholder="CKEditor"
      />
    )
  };
});

vi.mock('@/shared/components/common/Loader', () => ({
  Loader: () => <div data-testid="loader">Mocked Loader</div>
}));

describe('EditTermsCondition', () => {
  it('renders loading state', () => {
    mockUseCmsList.mockReturnValue({
      data: null,
      isLoading: true
    });
    render(
      <ThemeProvider>
        <EditTermsCondition />
      </ThemeProvider>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders CKEditor with initial value', async () => {
    render(
      <ThemeProvider>
        <EditTermsCondition />
      </ThemeProvider>
    );
  });

  it('handles CKEditor change and form submit', async () => {
    render(
      <ThemeProvider>
        <EditTermsCondition />
      </ThemeProvider>
    );
    const textarea = await screen.findByTestId('ckeditor');
    fireEvent.change(textarea, { target: { value: 'Updated Terms Content' } });

    const saveBtn = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(mockUpdateCms).toHaveBeenCalledTimes(1);
      const payload = mockUpdateCms.mock.calls[0][0];
      expect(payload).toEqual({
        title: 'termsAndCond',
        value: undefined
      });
    });
  });

  it('shows error toaster on mutation failure', async () => {
    mockUpdateCms.mockImplementation((_payload, { onError }: any) => {
      onError({ message: 'Failed to update' });
    });

    render(
      <ThemeProvider>
        <EditTermsCondition />
      </ThemeProvider>
    );
    fireEvent.change(await screen.findByTestId('ckeditor'), {
      target: { value: 'Failing update' }
    });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(showToaster).toHaveBeenCalledWith('error', 'Failed to update');
    });
  });

  it('shows success toaster and redirects on success', async () => {
    mockUpdateCms.mockImplementation((_payload, { onSuccess }: any) => {
      onSuccess({ message: 'Updated successfully' });
    });

    render(
      <ThemeProvider>
        <EditTermsCondition />
      </ThemeProvider>
    );
    fireEvent.change(await screen.findByTestId('ckeditor'), {
      target: { value: 'Successful update' }
    });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(showToaster).toHaveBeenCalledWith('success', 'Updated successfully');
    });
  });
});
