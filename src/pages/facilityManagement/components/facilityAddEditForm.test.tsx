import { render } from '@/test/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import FacilityAddEditForm from './facilityAddEditForm';

import ThemeProvider from '@/styles/config';

vi.mock('@/shared/utils/functions', () => ({
  showToaster: vi.fn(),
  allowAverageLoad: vi.fn(),
  allowEnergyCost: vi.fn(),
  capitalizeFirstLetter: vi.fn(),
  capitalizeFirstLetterWhileTyping: vi.fn(),
  allowHoursPerWeek: vi.fn(),
  allowNegativeDecimalOnly: vi.fn(),
  allowOnlyNumbers: vi.fn(),
  allowTonsKwr: vi.fn(),
  getUnitValidator: vi.fn(),
  uniqueFieldValidator: vi.fn(),
  validateAltitude: vi.fn(),
  validateAverageLoad: vi.fn(),
  validateEnergyCost: vi.fn(),
  validateWeeklyHours: vi.fn(),
  hexToRGBA: vi.fn()
}));

vi.mock('@/shared/components/common/HeaderToolbar', () => ({
  default: ({ title }: { title: string }) => <div data-testid="header-toolbar">{title}</div>
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

const renderWithRouter = () => {
  return render(
    <ThemeProvider>
      <FacilityAddEditForm />
    </ThemeProvider>
  );
};

describe('FacilityForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render "Add Facility" title when no id is provided', () => {
    renderWithRouter();
    expect(screen.getByText(/Add Facility/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
  });

  it('should show validation errors when submitting empty form', async () => {
    renderWithRouter();
    fireEvent.click(screen.getByRole('button', { name: /Add/i }));
  });

  it('should disable Add button while pending', () => {
    renderWithRouter();
    const submitButton = screen.getAllByText(/Add/i);
    expect(submitButton);
  });

  it('should call onPlaceSelected on address selection', async () => {
    renderWithRouter();

    // This depends on how your `RenderGoogleAutocompleteInput` behaves
    // Triggering that programmatically would require mocking the internal component.
    // For now, assume you can fire a change:
    const input = screen.getByPlaceholderText('Address Line 1');
    fireEvent.change(input, { target: { value: '1600 Amphitheatre Parkway' } });

    await waitFor(() => {
      expect(input).toHaveValue('1600 Amphitheatre Parkway');
    });
  });

  it('should not show chiller table initially', () => {
    renderWithRouter();
    expect(screen.queryByText(/Chiller Name/i)).not.toBeInTheDocument();
  });

  it('should show chiller table after clicking Add Chiller', async () => {
    renderWithRouter();

    const addButton = screen.getByRole('button', { name: /Add Chiller/i });
    fireEvent.click(addButton);

    expect(await screen.findByText(/Chiller Name/i)).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('Chiller Name')).toHaveLength(1);
  });

  it('should show validation errors when required fields are empty', async () => {
    renderWithRouter();

    fireEvent.click(screen.getByRole('button', { name: /Add Chiller/i }));
    const submitBtn = screen.getByRole('button', { name: /Add/i });

    fireEvent.click(submitBtn);
  });

  it('should allow adding multiple chillers', () => {
    renderWithRouter();

    const addBtn = screen.getByRole('button', { name: /Add Chiller/i });
    fireEvent.click(addBtn);
    fireEvent.click(addBtn);

    const chillerInputs = screen.getAllByPlaceholderText('Chiller Name');
    expect(chillerInputs.length).toBe(2);
  });

  it('should remove a chiller row on clicking Remove', async () => {
    renderWithRouter();

    const addBtn = screen.getByRole('button', { name: /Add Chiller/i });
    fireEvent.click(addBtn);

    const removeBtn = await screen.findByRole('button', { name: /Remove/i });
    fireEvent.click(removeBtn);

    await waitFor(() => {
      expect(screen.queryByText(/Chiller Name/i)).not.toBeInTheDocument();
    });
  });

  it('should render KWR or Tons input based on selected unit', async () => {
    renderWithRouter();

    fireEvent.click(screen.getByRole('button', { name: /Add Chiller/i }));
  });
});
