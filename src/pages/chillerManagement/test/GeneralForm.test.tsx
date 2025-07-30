import { render } from '@/test/utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from 'antd';
import { describe, expect, it } from 'vitest';

import GeneralForm from '../components/GeneralForm';

const mockCompanyOptions = [
  { label: 'Company A', value: 'company-a' },
  { label: 'Company B', value: 'company-b' }
];

const mockFacilityOptions = [{ label: 'Facility X', value: 'facility-x' }];

describe('GeneralForm', () => {
  const Wrapper = (props: any) => {
    const [form] = Form.useForm();
    return (
      <Form form={form}>
        <GeneralForm {...props} form={form} />
      </Form>
    );
  };

  it('renders all fields correctly', () => {
    render(
      <Wrapper
        companyOptions={mockCompanyOptions}
        facilityOptions={mockFacilityOptions}
        isCompanyLoading={false}
        isFacilityLoading={false}
        companyName="company-a"
      />
    );

    expect(screen.getByText('Company Name')).toBeInTheDocument();
    expect(screen.getByText('Facility')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Unit')).toBeInTheDocument();
    expect(screen.getByText('Chiller Name/No')).toBeInTheDocument();
    expect(screen.getByText('Weekly Hours Of Operation')).toBeInTheDocument();
    expect(screen.getByText('Weeks Per Year')).toBeInTheDocument();
    expect(screen.getByText('Avg. Load Profile')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(
      <Wrapper
        companyOptions={[]}
        facilityOptions={[]}
        isCompanyLoading={false}
        isFacilityLoading={false}
        companyName=""
      />
    );

    await userEvent.click(screen.getByText('Company Name'));
    await userEvent.tab();
  });

  it('disables Facility select when company is not selected', () => {
    render(
      <Wrapper
        companyOptions={[]}
        facilityOptions={[]}
        isCompanyLoading={false}
        isFacilityLoading={false}
        companyName={''}
      />
    );

    const facilitySelect = screen.getByRole('combobox', { name: 'Facility' });
    expect(facilitySelect).toBeDisabled();
  });

  it('disables Type select and has default value', () => {
    render(
      <Wrapper
        companyOptions={mockCompanyOptions}
        facilityOptions={mockFacilityOptions}
        isCompanyLoading={false}
        isFacilityLoading={false}
        companyName="company-a"
      />
    );

    const typeSelect = screen.getByLabelText('Type');
    expect(typeSelect).toBeDisabled();
  });
});
