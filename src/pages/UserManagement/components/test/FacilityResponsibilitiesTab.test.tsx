import { render } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import FacilityResponsibilitiesTab from '../FacilityResponsibilities';

import ThemeProvider from '@/styles/config';

// ✅ Adjust path

// Mock routes
vi.mock('@/shared/constants/routes', () => ({
  ROUTES: {
    View_FACILITY_MANAGEMENT: (id: string) => `/view-facility/${id}`
  }
}));

// Mock getSortOrder utility
vi.mock('@/shared/utils/functions', () => ({
  getSortOrder: vi.fn(),
  hexToRGBA: vi.fn()
}));

// Mock facilityHooks.FacilityList API hook
vi.mock('@/services/facility', () => ({
  facilityHooks: {
    FacilityList: () => ({
      data: {
        facilityList: [
          {
            _id: 'f1',
            name: 'Main Facility',
            companyName: 'Acme Corp',
            totalChiller: 4,
            totalOperators: 6,
            isActive: true
          }
        ],
        totalRecords: 1
      },
      isLoading: false
    })
  }
}));

// Mock CommonTable
vi.mock('@/shared/components/common/Table', () => ({
  CommonTable: ({ columns, dataSource, rowSelection, onChange }: any) => (
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
          {dataSource.map((row: any, idx: number) => (
            <tr key={idx}>
              <td>
                <input
                  type="checkbox"
                  checked={rowSelection.selectedRowKeys.includes(row._id)}
                  onChange={(e) => rowSelection.onChange(e.target.checked ? [row._id] : [])}
                />
              </td>
              <td>{row.companyName}</td>
              <td>{row.name}</td>
              <td>{row.totalChiller}</td>
              <td>{row.totalOperators}</td>
              <td>{row.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <a href={`/view-facility/${row._id}`}>View</a>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7}>
              <button
                onClick={() =>
                  onChange(
                    { current: 2, pageSize: 10 },
                    {},
                    {
                      order: 'ascend',
                      field: 'totalChiller'
                    }
                  )
                }
              >
                Trigger Sort
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}));

describe('FacilityResponsibilitiesTab Component', () => {
  it('renders facility data and handles row selection and sorting', () => {
    const setFacilityIds = vi.fn();
    const setChillerIds = vi.fn();

    render(
      <ThemeProvider>
        <FacilityResponsibilitiesTab
          facilityIds={['f1']}
          setFacilityIds={setFacilityIds}
          companySelect="company1"
          chillerIds={['f1']}
          setChillerIds={setChillerIds}
          form={vi.fn()}
        />
      </ThemeProvider>
    );

    // Header & row content
    expect(screen.getByText('Facilities')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Main Facility')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();

    // Action link
    const viewLink = screen.getByText('View');
    expect(viewLink).toBeInTheDocument();
    expect(viewLink.getAttribute('href')).toBe('/view-facility/f1');

    // Simulate deselect row
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(setFacilityIds).toHaveBeenCalledWith([]);

    // Simulate sort trigger
    fireEvent.click(screen.getByText('Trigger Sort'));
    // You can’t directly assert internal setState, but no error = success here
  });
});
