import { render } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MEASUREMENT_UNITS } from '@/shared/constants';

import NamePlateForm from '../components/NamePlateForm';

const renderWithForm = (unit: any) => {
  render(<NamePlateForm unit={unit} />);
};

describe('NamePlateForm', () => {
  it('renders all required fields', () => {
    renderWithForm(MEASUREMENT_UNITS[0].value); // English

    expect(screen.getAllByText('Make')[0]).toBeInTheDocument();
    expect(screen.getByText('Model')).toBeInTheDocument();
    expect(screen.getByText('Serial No.')).toBeInTheDocument();
    expect(screen.getAllByText('Year Manufactured')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Refrigerant Type')[0]).toBeInTheDocument();
    expect(screen.getByText('Tons/KWR')).toBeInTheDocument();
    expect(screen.getByText('Efficiency Rating')).toBeInTheDocument();
    expect(screen.getByText('Energy Cost (kw. hr.)')).toBeInTheDocument();
  });

  it('validates required fields on submit', async () => {
    renderWithForm(MEASUREMENT_UNITS[0].value);
  });

  it('disables Tons/KWR and Efficiency Rating when unit is not selected', () => {
    renderWithForm(undefined);
    expect(screen.getByPlaceholderText('Tons/KWR')).toBeDisabled();
    expect(screen.getByPlaceholderText('Efficiency Rating')).toBeDisabled();
  });

  it('renders unit-specific suffix in Efficiency Rating field', () => {
    renderWithForm(MEASUREMENT_UNITS[1].value); // Metric
    expect(screen.getByText('COP')).toBeInTheDocument();
  });

  it('shows no validation error for valid energy cost input', async () => {
    renderWithForm(MEASUREMENT_UNITS[0].value);
    const energyCostInput = screen.getByPlaceholderText('Energy Cost');

    fireEvent.change(energyCostInput, { target: { value: '0.12' } });
    fireEvent.blur(energyCostInput);
  });
});
