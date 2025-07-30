import { render } from '@/test/utils';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ViewFacilityResponsibilitiesTab from '../ViewFacilityResponsibilities';

import ThemeProvider from '@/styles/config';

// Adjust path

// Mock CommonTable to isolate test
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
            <td>{item.companyName}</td>
            <td>{item.name}</td>
            <td>{item.totalChiller}</td>
            <td>{item.totalOperators}</td>
            <td>{item.isActive ? 'Active' : 'Inactive'}</td>
            <td>{item._id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}));

vi.mock('@/shared/constants/routes', () => ({
  ROUTES: {
    View_FACILITY_MANAGEMENT: (id: string) => `/view-facility/${id}`
  }
}));

describe('ViewFacilityResponsibilitiesTab Component', () => {
  const mockFacilityList = [
    {
      _id: 'facility123',
      companyName: 'Acme Corp',
      name: 'Facility A',
      totalChiller: 3,
      totalOperators: 5,
      isActive: true
    },
    {
      _id: 'facility456',
      companyName: 'Beta Corp',
      name: 'Facility B',
      totalChiller: 1,
      totalOperators: 2,
      isActive: false
    }
  ];

  it('renders facility data correctly', () => {
    render(
      <ThemeProvider>
        <ViewFacilityResponsibilitiesTab facilityList={mockFacilityList} />
      </ThemeProvider>
    );

    // Title check
    expect(screen.getByText('Facilities')).toBeInTheDocument();

    // Table headers
    expect(screen.getByText('Company Name')).toBeInTheDocument();
    expect(screen.getByText('Facility Name')).toBeInTheDocument();
    expect(screen.getByText('Chillers')).toBeInTheDocument();
    expect(screen.getByText('Operators')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    // First row data
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Facility A')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();

    // Second row data
    expect(screen.getByText('Beta Corp')).toBeInTheDocument();
    expect(screen.getByText('Facility B')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });
});
