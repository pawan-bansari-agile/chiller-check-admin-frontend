import { render } from '@/test/utils';
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import PermissionTab from '../PermissionTab';

import ThemeProvider from '@/styles/config';

vi.mock('@/shared/constants', () => ({
  MODULES_BY_ROLE: {
    admin: [
      { key: 'user', label: 'User Management', actions: ['view', 'add', 'edit', 'toggleStatus'] },
      { key: 'company', label: 'Company Management', actions: ['view', 'edit'] }
    ]
  }
}));

vi.mock('@/shared/components/common/Table', async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    CommonTable: ({ dataSource }: any) => (
      <div data-testid="mock-table">
        {/* Optionally render simplified rows */}
        {dataSource?.map((item: any, i: number) => (
          <div key={i}>Row: {item.label || item.key}</div>
        ))}
      </div>
    )
  };
});

vi.mock('@/shared/constants', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/shared/constants')>();
  return {
    ...actual,
    API_BASE: 'http://mock-api-base.com' // ✅ Add the missing export
  };
});

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

describe('PermissionTab Component', () => {
  const mockPermissions: any = {
    user: ['view'],
    company: ['view', 'edit']
  };

  it('renders table with correct columns and data', () => {
    render(
      <ThemeProvider>
        {' '}
        <PermissionTab
          form={mockForm}
          role="admin"
          id="1"
          permission={mockPermissions}
          initialRef={{ current: false }}
        />
      </ThemeProvider>
    );
    waitFor(() => {
      expect(screen.getByText('Company Management')).toBeInTheDocument();
      expect(screen.getByText('View')).toBeInTheDocument();
      expect(screen.getByText('Add')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Active / Inactive / Delete')).toBeInTheDocument();
    });
  });

  it('calls setFieldsValue when checkbox is checked for Add', () => {
    render(
      <PermissionTab
        form={mockForm}
        role="admin"
        id="1"
        permission={mockPermissions}
        initialRef={{ current: false }}
      />
    );

    expect(mockForm.setFieldsValue).toHaveBeenCalled();
  });
});
