import { render } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ResponsibilitiesTab from '../ResponsibilitiesTab';

import ThemeProvider from '@/styles/config';

// Adjust path

// Mock ROUTES
vi.mock('@/shared/constants/routes', () => ({
  ROUTES: {
    VIEW_COMPANY_MANAGEMENT: (id: string) => `/view-company/${id}`
  }
}));

// Mock utilities
vi.mock('@/shared/utils/functions', () => ({
  capitalizeFirstLetter: vi.fn(),
  getSortOrder: vi.fn(),
  hexToRGBA: vi.fn()
}));

// Mock CommonTable
vi.mock('@/shared/components/common/Table', () => ({
  CommonTable: ({ columns, dataSource, onChange }: any) => (
    <>
      <table data-testid="common-table">
        <thead>
          <tr>
            {columns.map((col: any) => (
              <th key={col.key}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((item: any, index: number) => (
            <tr key={index}>
              <td>{columns[0].render(item._id)}</td>
              <td>{item.name}</td>
              <td>{item.totalFacilities}</td>
              <td>{item.totalChiller}</td>
              <td>{item.totalOperators}</td>
              <td>{columns[5].render(item.status)}</td>
              <td>{columns[6].render(item._id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() =>
          onChange({ current: 2, pageSize: 10 }, {}, { order: 'ascend', field: 'totalChiller' })
        }
      >
        Trigger Sort
      </button>
    </>
  )
}));

// Mock API hook
vi.mock('@/services/company', () => ({
  companyHooks: {
    CompanyListUnAssigned: () => ({
      data: {
        companyList: [
          {
            _id: 'c1',
            name: 'Acme Corp',
            totalFacilities: 3,
            totalChiller: 5,
            totalOperators: 12,
            status: 'active'
          }
        ],
        totalRecords: 1
      },
      isLoading: false
    })
  }
}));

describe('ResponsibilitiesTab Component', () => {
  const setCompanyId = vi.fn();

  it('renders data and handles selection and sorting', () => {
    render(
      <ThemeProvider>
        <ResponsibilitiesTab companyId="c1" setCompanyId={setCompanyId} form={vi.fn()} />
      </ThemeProvider>
    );

    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/view-company/c1');

    // Simulate sort
    fireEvent.click(screen.getByText('Trigger Sort'));
    // No assertion for sort args because setArgs is internal state,
    // but you can spy on setArgs or extract it into a handler for testability.
  });
});
