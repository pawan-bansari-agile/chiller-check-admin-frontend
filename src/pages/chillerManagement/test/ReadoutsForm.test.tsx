import { render } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
import { Button, Form } from 'antd';
import { vi } from 'vitest';

import ReadoutsForm from '../components/ReadoutsForm';

describe('ReadoutsForm', () => {
  const onFinish = vi.fn();

  const setup = () => {
    render(
      <Form onFinish={onFinish}>
        <ReadoutsForm />
        <Button htmlType="submit">Submit</Button>
      </Form>
    );
  };

  it('renders all form fields', () => {
    setup();

    expect(screen.getByText(/Purge Total Pumpout Time Readout On Chiller/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Purge Total Pumpout Time Measured In What Units/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Max. Daily Purge Total Pumpout Time Before Alert/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Readout For Bearing Temp/i)).toBeInTheDocument();
  });

  it('submits form when all fields are valid', async () => {
    setup();

    // Select "Yes" for both radio groups
    fireEvent.click(screen.getAllByText('Yes')[0]); // pumpOutTimeReadout
    fireEvent.click(screen.getByLabelText('Mins. Only'));
    fireEvent.change(
      screen.getByPlaceholderText(/Max. Daily Purge Total Pumpout Time Before Alert/i),
      { target: { value: '60' } }
    );
    fireEvent.click(screen.getAllByLabelText('Yes')[1]); // bearingTemp

    fireEvent.click(screen.getByText(/Submit/i));

    await screen.findByText('Submit'); // wait for rerender

    expect(onFinish).toHaveBeenCalledWith({
      pumpOutTimeReadout: true,
      purgePumpOutReading: 'Mins. Only',
      maxDailyPurge: '60',
      bearingTemp: true
    });
  });
});
