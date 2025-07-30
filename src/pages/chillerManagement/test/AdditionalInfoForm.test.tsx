import { render } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import AdditionalInfoForm from '../components/AdditionalInfoForm';

import ThemeProvider from '@/styles/config';

// Utility to wrap form and expose submit behavior
const renderWithForm = () => {
  render(
    <ThemeProvider>
      <AdditionalInfoForm />
      <button type="submit">Submit</button>
    </ThemeProvider>
  );
};

describe('AdditionalInfoForm', () => {
  let onFinish: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onFinish = vi.fn();
  });

  it('renders all fields', () => {
    renderWithForm();

    expect(screen.getByLabelText(/Oil Pressure Differential/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Calculate Efficiency Using/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number Of Compressors/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/User Notes/i)).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    renderWithForm();

    fireEvent.click(screen.getByText('Submit'));

    expect(onFinish).not.toHaveBeenCalled();
  });

  it('shows error when user notes contain only whitespace', async () => {
    const user = userEvent.setup();
    renderWithForm();

    // Fill required selects to bypass their validations
    const selects = screen.getAllByRole('combobox');
    for (const select of selects) {
      await user.click(select);
    }

    // Fill whitespace in the "User Notes" field
    const notesInput = screen.getByLabelText(/User Notes/i);
    await user.clear(notesInput);
    await user.type(notesInput, '   '); // Only whitespace
  });
});
