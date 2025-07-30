// CondensorForm.test.tsx
import { render } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
// adjust path accordingly
import { Form } from 'antd';
import { describe, expect, it } from 'vitest';

import { MEASUREMENT_UNITS } from '@/shared/constants';

import CondensorForm from '../components/CondensorForm';

const renderWithForm = (ui: React.ReactElement) => {
  const Wrapper: React.FC = () => {
    const [form] = Form.useForm();
    return <Form form={form}>{ui}</Form>;
  };
  return render(<Wrapper />);
};

describe('CondensorForm', () => {
  it('renders without crashing', () => {
    renderWithForm(<CondensorForm />);
    expect(screen.getByText(/Design Condenser Water Pressure Drop/i)).toBeInTheDocument();
  });

  it('renders correctly with English unit', () => {
    renderWithForm(<CondensorForm unit={MEASUREMENT_UNITS[0].value} />);
    expect(screen.getByPlaceholderText(/Enter Here/i)).not.toBeDisabled();
    expect(screen.getByText(/Design Condenser ∆ T/i)).toBeInTheDocument();
  });

  it('renders correctly with Metric unit', () => {
    renderWithForm(<CondensorForm unit={MEASUREMENT_UNITS[1].value} />);
    expect(screen.getByPlaceholderText(/Enter Here/i)).not.toBeDisabled();
  });

  it('shows error for invalid Design Condenser Approach Temp.', async () => {
    renderWithForm(<CondensorForm unit={MEASUREMENT_UNITS[0].value} />);
    const input = screen.getByPlaceholderText('Design Condenser Approach Temp.');

    fireEvent.change(input, { target: { value: '-.' } });
    fireEvent.blur(input);
  });

  it('allows valid number input for Design Condenser ∆ T', async () => {
    renderWithForm(<CondensorForm unit={MEASUREMENT_UNITS[0].value} />);
    const input = screen.getByPlaceholderText('Design Condenser ∆ T');
    fireEvent.change(input, { target: { value: '12.34' } });
    fireEvent.blur(input);

    const error = screen.queryByText(/Please enter a valid design condenser ∆ T/i);
    expect(error).toBeNull();
  });
});
