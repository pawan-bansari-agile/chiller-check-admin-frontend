import React from 'react';

import { render } from '@/test/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Button, Form } from 'antd';
import { describe, expect, it, vi } from 'vitest';

import EvaporatorForm from '../components/EvaporatorForm';

const renderWithForm = (unit = 'English') => {
  const Wrapper: React.FC = () => {
    const [form] = Form.useForm();
    return (
      <Form form={form} onFinish={vi.fn()} layout="vertical">
        <EvaporatorForm unit={unit} />
        <Button htmlType="submit">Submit</Button>
      </Form>
    );
  };
  return render(<Wrapper />);
};

describe('EvaporatorForm', () => {
  it('renders all fields', () => {
    renderWithForm();

    expect(screen.getByLabelText('Design Chill Water Pressure Drop')).toBeInTheDocument();
    expect(screen.getByLabelText('Actual Chill Water Pressure Drop Unit')).toBeInTheDocument();
    expect(screen.getByLabelText('Evaporator Pressure Unit')).toBeInTheDocument();
    expect(screen.getByLabelText('Design Evaporator Approach Temp.')).toBeInTheDocument();
    expect(screen.getByLabelText('Evaporator Design Outlet Water Temp.')).toBeInTheDocument();
    expect(screen.getByLabelText('Evaporator Design ∆ T')).toBeInTheDocument();
    expect(screen.getByLabelText('Evaporator Design Flow')).toBeInTheDocument();
  });

  it('accepts valid numeric inputs', async () => {
    renderWithForm();

    fireEvent.change(screen.getByPlaceholderText('Evaporator Design Outlet Water Temp.'), {
      target: { value: '45.5' }
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(
        screen.queryByText('Please enter evaporator design outlet water temp.')
      ).not.toBeInTheDocument();
    });
  });

  it('shows error for invalid inputs', async () => {
    renderWithForm();

    fireEvent.change(screen.getByPlaceholderText('Evaporator Design Outlet Water Temp.'), {
      target: { value: '-.' }
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(
        screen.getByText('Please enter a valid evaporator design outlet water temperature.')
      ).toBeInTheDocument();
    });
  });
});
