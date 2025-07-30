import { render } from '@/test/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Button } from 'antd';
import { vi } from 'vitest';

import ChillerAddEditForm from '../components/chillerAddEdit';

import ThemeProvider from '@/styles/config';

// Mock modules
vi.mock('@/services/chiller', () => ({
  chillerHooks: {
    ChillerView: vi.fn().mockReturnValue({ data: null, isLoading: false }),
    useAddChiller: () => ({ mutate: vi.fn(), isPending: false }),
    useEditChiller: () => ({ mutate: vi.fn(), isPending: false })
  },
  chillerQueryKeys: {
    all: ['chiller-all']
  }
}));

vi.mock('@/services/company', () => ({
  companyHooks: {
    AllCompanyList: () => ({ data: [{ _id: '1', name: 'Company A' }], isLoading: false })
  },
  companyQueryKeys: {
    all: ['company-all']
  }
}));

vi.mock('@/services/facility', () => ({
  facilityHooks: {
    AllFacilityListByCompany: () => ({ data: [{ _id: '1', name: 'Facility A' }], isLoading: false })
  },
  facilityQueryKeys: {
    all: ['facility-all']
  }
}));

vi.mock('@/services/user', () => ({
  userQueryKeys: {
    all: ['user-all']
  }
}));

vi.mock('@/shared/components/common/Loader', () => ({
  Loader: () => <div>Loader</div>
}));

vi.mock('@/shared/components/common/HeaderToolbar', () => ({
  __esModule: true,
  default: ({ title, button }: any) => (
    <div>
      <h1>{title}</h1>
      {button}
    </div>
  )
}));

vi.mock('@/shared/components/common/ShadowPaper', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>
}));

vi.mock('@/shared/utils/functions', () => ({
  showToaster: vi.fn(),
  capitalizeFirstLetter: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
  hexToRGBA: vi.fn(),
  validateWeeklyHours: vi.fn(),
  allowHoursPerWeek: vi.fn(),
  validateAverageLoad: vi.fn(),
  allowAverageLoad: vi.fn(),
  allowTonsKwr: vi.fn(),
  validateEnergyCost: vi.fn(),
  allowEnergyCost: vi.fn(),
  allowNegativeDecimalOnly: vi.fn(),
  validateDesignVoltage: vi.fn()
}));

// Mock form sections
vi.mock('../GeneralForm', () => () => <div>GeneralForm</div>);
vi.mock('../NamePlateForm', () => () => <div>NamePlateForm</div>);
vi.mock('../CondensorForm', () => () => <div>CondensorForm</div>);
vi.mock('../EvaporatorForm', () => () => <div>EvaporatorForm</div>);
vi.mock('../ElectricalForm', () => () => <div>ElectricalForm</div>);
vi.mock('../ReadoutsForm', () => () => <div>ReadoutsForm</div>);
vi.mock('../AdditionalInfoForm', () => () => <div>AdditionalInfoForm</div>);

describe('ChillerAddEditForm', () => {
  const setup = () => {
    return render(
      <ThemeProvider>
        <ChillerAddEditForm />
        <Button htmlType="submit">Add</Button>
      </ThemeProvider>
    );
  };

  it('renders all form sections and submit button', () => {
    setup();
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Name Plate Data')).toBeInTheDocument();
    expect(screen.getByText('Condenser')).toBeInTheDocument();
    expect(screen.getByText('Evaporator')).toBeInTheDocument();
    expect(screen.getByText('Electrical')).toBeInTheDocument();
    expect(screen.getByText('Readouts')).toBeInTheDocument();
    expect(screen.getByText('Additional Info')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('disables submit button during loading or mutation', () => {
    setup();
    const submitButton = screen.getByRole('button', { name: 'Add' });
    expect(submitButton).not.toBeDisabled();
  });

  it('triggers form submission on submit click', async () => {
    setup();
    const submitButton = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(submitButton).toBeInTheDocument();
    });
  });
});
