import { render } from '@/test/utils';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ViewResponsibilitiesTab from '../ViewResponsibilitiesTab';

import ThemeProvider from '@/styles/config';

// Mock CommonTable to inspect props if needed
vi.mock('@/shared/components/common/Table', () => ({
  CommonTable: ({ columns, dataSource }: any) => (
    <table data-testid="common-table">
      <thead>
        <tr>
          {columns.map((col: any) => (
            <th key={col.key}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((item: any, idx: number) => (
          <tr key={idx}>
            <td>{item.name}</td>
            <td>{item.totalFacilities}</td>
            <td>{item.totalChiller}</td>
            <td>{item.totalOperators}</td>
            <td>{item.status}</td>
            <td>{item._id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}));

// Mock routes
vi.mock('@/shared/constants/routes', () => ({
  ROUTES: {
    VIEW_COMPANY_MANAGEMENT: (id: string) => `/view-company/${id}`
  }
}));

// Mock utils
vi.mock('@/shared/utils/functions', () => ({
  capitalizeFirstLetter: vi.fn(),
  hexToRGBA: vi.fn(),
  hasPermission: vi.fn()
}));

describe('ViewResponsibilitiesTab Component', () => {
  const mockCompanyList = [
    {
      _id: 'company123',
      name: 'Acme Corp',
      totalFacilities: 5,
      totalChiller: 2,
      totalOperators: 10,
      status: 'active'
    }
  ];

  it('renders table with company data', () => {
    render(
      <ThemeProvider>
        <ViewResponsibilitiesTab companyList={mockCompanyList} />
      </ThemeProvider>
    );

    // Check for title
    expect(screen.getByText('Company')).toBeInTheDocument();

    // Check table headers
    expect(screen.getByText('Company Name')).toBeInTheDocument();
    expect(screen.getByText('Facilities')).toBeInTheDocument();
    expect(screen.getByText('Chillers')).toBeInTheDocument();
    expect(screen.getByText('Operators')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    // Check data rows
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
    expect(screen.getByText('company123')).toBeInTheDocument();
  });
});
