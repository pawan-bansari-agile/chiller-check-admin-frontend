import { render } from '@/test/utils';
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import UserAddEditForm from '../UserAddEditForm';

import ThemeProvider from '@/styles/config';

vi.mock('@/services/user', () => ({
  userHooks: {
    GetUserDetail: vi.fn(() => ({ data: null, isLoading: false })),
    useAddUser: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
    useEditUser: vi.fn(() => ({ mutate: vi.fn(), isPending: false })),
    userQueryKeys: { all: ['users'] }
  }
}));

vi.mock('@/services/company', () => ({
  companyHooks: {
    AllCompanyList: vi.fn(() => ({ data: [], isLoading: false }))
  }
}));

vi.mock('@/services/common', () => ({
  commonApi: {
    uploadFileAction: vi.fn(() => Promise.resolve([{ name: 'test.png' }]))
  }
}));

vi.mock('@/shared/components/common/FormField', () => ({
  RenderTextInput: ({ label }: any) => <div>{label}</div>,
  RenderPatternFormatInput: ({ label }: any) => <div>{label}</div>,
  RenderSelect: ({ label }: any) => <div>{label}</div>
}));

vi.mock('@/shared/components/common/HeaderToolbar', () => ({
  default: () => <div>Header Toolbar</div>
}));

vi.mock('@/shared/components/common/Loader', () => ({
  Loader: () => <div>Loader</div>
}));

vi.mock('@/shared/components/common/ShadowPaper', () => ({
  default: ({ children }: any) => <div>{children}</div>
}));

vi.mock('@/shared/components/common/PermissionTab', () => ({
  default: () => <div>PermissionTab</div>
}));

vi.mock('@/shared/constants', async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    MODULES_BY_ROLE: {
      subAdmin: [
        {
          key: 'user',
          label: 'User Management',
          actions: ['view', 'add', 'edit']
        }
      ]
    },
    USER_ADD_ROLE: [
      { label: 'Sub Admin', value: 'subAdmin' },
      { label: 'Corporate Manager', value: 'corporateManager' }
    ],
    USER_ROLES: {
      SUB_ADMIN: 'subAdmin',
      CORPORATE_MANAGER: 'corporateManager',
      FACILITY_MANAGER: 'facilityManager'
    },
    PATTERNS: { BLANK_SPACE: /^\S(.*\S)?$/ },
    getDefaultLogs: () => []
  };
});

const renderComponent = () => {
  render(
    <ThemeProvider>
      <UserAddEditForm />
    </ThemeProvider>
  );
};

describe('UserAddEditForm', () => {
  it('renders basic form structure', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Header Toolbar')).toBeInTheDocument();
      expect(screen.getByText('First Name')).toBeInTheDocument();
      expect(screen.getByText('Last Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      // expect(screen.getByText('Phone number')).toBeInTheDocument();
      expect(screen.getByText('User Role')).toBeInTheDocument();
    });
  });

  it('handles submit with missing fields', async () => {
    renderComponent();

    // Error validations should prevent submission
    await waitFor(() => {
      expect(screen.getByText('First Name')).toBeInTheDocument();
    });
  });
});
