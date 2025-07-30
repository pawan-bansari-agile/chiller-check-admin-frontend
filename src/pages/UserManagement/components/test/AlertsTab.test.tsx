import { render } from '@/test/utils';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import AlertsTab from '../AlertsTab';

import ThemeProvider from '@/styles/config';

// update path accordingly

// Mock required modules
vi.mock('@/shared/components/common/FormField', () => ({
  RenderCheckboxGroupInput: ({ inputProps }: any) => (
    <div data-testid="checkbox-group" {...inputProps}>
      CheckboxGroup
    </div>
  ),
  RenderSelectDropDown: ({ inputProps }: any) => (
    <select data-testid="select-dropdown" disabled={inputProps?.disabled} />
  ),
  RenderTextInput: ({ inputProps }: any) => (
    <input data-testid="text-input" disabled={inputProps?.disabled} />
  )
}));

const mockForm = {
  setFieldsValue: vi.fn(),
  getFieldValue: vi.fn(),
  setFieldValue: vi.fn(),
  validateFields: vi.fn().mockResolvedValue({}),
  getFieldsValue: vi.fn(),
  resetFields: vi.fn()
};

vi.mock('antd', async () => {
  const actual = await vi.importActual<typeof import('antd')>('antd');
  return {
    ...actual,
    Form: {
      ...actual.Form,
      useForm: () => vi.fn()
    }
  };
});

const mockRef = { current: { focus: vi.fn() } };

// Mock react module
vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react');
  return {
    ...actual,
    useRef: () => mockRef
  };
});

vi.mock('@/shared/utils/functions', () => ({
  allowHoursPerWeek: vi.fn(),
  allowNegativeDecimalOnly: vi.fn(),
  hexToRGBA: vi.fn()
}));

describe('AlertsTab Component', () => {
  it('renders all metric groups and log inputs correctly', () => {
    render(
      <ThemeProvider>
        <AlertsTab
          form={mockForm}
          id="123"
          response={{
            general: {
              notifyBy: 'both',
              conditions: [
                {
                  metric: 'Outside Air Temp.',
                  warning: { operator: '>', threshold: 5 },
                  alert: { operator: '<', threshold: -5 }
                }
              ]
            },
            logs: [
              { type: 'daily', notifyBy: 'email', daysSince: 5 },
              { type: 'program', notifyBy: 'both', daysSince: 3 }
            ]
          }}
          isDisabled={false}
        />
      </ThemeProvider>
    );

    // General structure
    expect(screen.getAllByTestId('select-dropdown').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('text-input').length).toBeGreaterThan(0);
    expect(screen.getByText('Log Entries')).toBeInTheDocument();
    expect(screen.getAllByTestId('checkbox-group').length).toBeGreaterThan(0);
  });
});
