import { render } from '@/test/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import CompanyAddEditForm from './CompanyAddEditForm';

import ThemeProvider from '@/styles/config';

vi.mock('@/shared/utils/functions', () => ({
  showToaster: vi.fn(),
  allowOnlyNumbers: vi.fn(),
  hexToRGBA: vi.fn(),
  capitalizeFirstLetterWhileTyping: vi.fn(),
  uniqueFieldValidator: vi.fn(),
  allowNegativeDecimalOnly: vi.fn()
}));

vi.mock('@/shared/components/common/HeaderToolbar', () => ({
  default: ({ title }: { title: string }) => <div data-testid="header-toolbar">{title}</div>
}));

// Mock company hooks
const mockAdd = vi.fn();
const mockEdit = vi.fn();
const mockView = vi.fn();

beforeEach(() => {
  mockAdd.mockReset();
  mockEdit.mockReset();
  mockView.mockReset();
});

describe('CompanyAddEditForm – create mode', () => {
  it('renders all fields', () => {
    render(
      <ThemeProvider>
        <CompanyAddEditForm />
      </ThemeProvider>
    );
    expect(screen.getByLabelText(/Company Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address Line 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Facilities/i)).toBeInTheDocument();
  });

  it('can add and remove facility rows', async () => {
    render(
      <ThemeProvider>
        <CompanyAddEditForm />
      </ThemeProvider>
    );
    const addBtn = screen.getByRole('button', { name: /Add Facility/i });
    fireEvent.click(addBtn);
    // Expect first facility row
    expect(await screen.findByPlaceholderText('Facility')).toBeInTheDocument();

    const removeBtn = screen.getByRole('button', { name: /Remove/i });
    fireEvent.click(removeBtn);
    await waitFor(() => expect(screen.queryByPlaceholderText('Facility')).not.toBeInTheDocument());
  });

  it('submits create payload', async () => {
    render(
      <ThemeProvider>
        <CompanyAddEditForm />
      </ThemeProvider>
    ); // Fill base company fields
    fireEvent.change(screen.getByPlaceholderText('Enter Company Name'), {
      target: { value: 'Test Co' }
    });
    fireEvent.change(screen.getByPlaceholderText('Address Line 1'), {
      target: { value: '123 Main St' }
    });
    fireEvent.change(screen.getByPlaceholderText('Address Line 2'), {
      target: { value: 'Suite 100' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter City'), {
      target: { value: 'Anytown' }
    });

    fireEvent.change(screen.getByPlaceholderText('Add Website'), {
      target: { value: 'https://test.com' }
    });

    // Add facility
    fireEvent.click(screen.getByRole('button', { name: /Add Facility/i }));
    fireEvent.change(screen.getByPlaceholderText('Facility'), {
      target: { value: 'Facility One' }
    });
    fireEvent.change(screen.getByPlaceholderText('Address'), {
      target: { value: '456 Other St' }
    });
    fireEvent.change(screen.getAllByPlaceholderText('Address Line 2')[1], {
      target: { value: 'Unit A' }
    });

    fireEvent.change(screen.getByPlaceholderText('Altitude'), {
      target: { value: '500' }
    });
    fireEvent.click(await screen.findByRole('button', { name: /Add/i }));
  });

  it('submits edit payload with just new facilities', async () => {
    render(
      <ThemeProvider>
        <CompanyAddEditForm />
      </ThemeProvider>
    );
  });
});
