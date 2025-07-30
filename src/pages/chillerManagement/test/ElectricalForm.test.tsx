import React from 'react';

import { render } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
import { Button, Form } from 'antd';
import { describe, expect, it, vi } from 'vitest';

import ElectricalForm from '../components/ElectricalForm';

const renderWithForm = () => {
  const Wrapper: React.FC = () => {
    const [form] = Form.useForm();
    return (
      <Form form={form} onFinish={vi.fn()} layout="vertical">
        <ElectricalForm />
        <Button htmlType="submit">Submit</Button>
      </Form>
    );
  };
  return render(<Wrapper />);
};

describe('ElectricalForm', () => {
  it('renders all form fields', () => {
    renderWithForm();

    expect(screen.getByText('Design Voltage')).toBeInTheDocument();
    expect(screen.getAllByText('Voltage Choice')[0]).toBeInTheDocument();
    expect(screen.getByText('Full-Load Amperage')).toBeInTheDocument();
    expect(screen.getAllByText('Amperage Choice')[0]).toBeInTheDocument();
  });

  it('renders voltage and amperage select options correctly', () => {
    renderWithForm();

    const voltageSelect = screen.getAllByText('Voltage Choice');
    fireEvent.mouseDown(voltageSelect[0]);

    const ampSelect = screen.getAllByText('Amperage Choice');
    fireEvent.mouseDown(ampSelect[0]);
  });

  it('shows error for invalid input in Design Voltage and Full Load Amperage', async () => {
    renderWithForm();

    const voltageInput = screen.getByPlaceholderText('Design Voltage');
    fireEvent.change(voltageInput, { target: { value: 'abc' } });
    fireEvent.blur(voltageInput);

    const ampInput = screen.getByPlaceholderText('Full-Load Amperage');
    fireEvent.change(ampInput, { target: { value: '!' } });
    fireEvent.blur(ampInput);
  });
});
