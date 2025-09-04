import { render } from '@/test/utils';
import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ViewChillerResponsibilitiesTab from '../ViewChillerTab';

import ThemeProvider from '@/styles/config';

// Mock dependencies
vi.mock('@/shared/components/common/Table', () => ({
  CommonTable: ({ columns, dataSource, emptyText }: any) => (
    <div data-testid="common-table">
      {dataSource?.length
        ? dataSource.map((data: any, index: number) => (
            <div key={index} data-testid="table-row">
              {columns.map((col: any) => (
                <div key={col.key} data-testid={`col-${col.key}`}>
                  {col.render ? col.render(data[col.dataIndex], data, index) : data[col.dataIndex]}
                </div>
              ))}
            </div>
          ))
        : emptyText}
    </div>
  )
}));

vi.mock('@/shared/components/common/Table/EmptyState', () => ({
  default: ({ isEmpty, defaultDescription }: any) =>
    isEmpty ? <div data-testid="empty-state">{defaultDescription}</div> : null
}));

vi.mock('@/shared/constants/routes', () => ({
  ROUTES: {
    View_CHILLER_MANAGEMENT: (id: string) => `/chillers/${id}`
  }
}));

vi.mock('@/shared/utils/functions', () => ({
  capitalizeFirstLetter: vi.fn(),
  hexToRGBA: vi.fn(),
  hasPermission: vi.fn()
}));

describe('ViewChillerResponsibilitiesTab', () => {
  const sampleData = [
    {
      _id: '1',
      companyName: 'Tech Corp',
      facilityName: { name: 'Facility A' },
      ChillerNo: 'CH123',
      energyCost: '₹5000',
      totalOperators: 3,
      status: 'active'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders table title', () => {
    render(
      <ThemeProvider>
        <ViewChillerResponsibilitiesTab chillerList={[]} />
      </ThemeProvider>
    );
    expect(screen.getByText('Chillers')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    render(
      <ThemeProvider>
        <ViewChillerResponsibilitiesTab chillerList={[]} />
      </ThemeProvider>
    );
    expect(screen.getByTestId('empty-state')).toHaveTextContent('No Chiller Found');
  });

  it('renders table with data', () => {
    render(
      <ThemeProvider>
        <ViewChillerResponsibilitiesTab chillerList={sampleData} companyName="Tech Corp" />
      </ThemeProvider>
    );

    expect(screen.getAllByTestId('table-row')).toHaveLength(1);
    expect(screen.getByTestId('col-companyName')).toHaveTextContent('Tech Corp');
    expect(screen.getByTestId('col-facilityName')).toHaveTextContent('Facility A');
    expect(screen.getByTestId('col-ChillerNo')).toHaveTextContent('CH123');
    expect(screen.getByTestId('col-energyCost')).toHaveTextContent('₹5000');
  });

  it('renders Last Log Entry column with conditional color', () => {
    render(
      <ThemeProvider>
        <ViewChillerResponsibilitiesTab chillerList={sampleData} />
      </ThemeProvider>
    );

    const lastEntryName = screen.getByText('Monica Geller');
    const lastEntryTime = screen.getByText('12/11/24 15:00');
    expect(lastEntryName).toBeInTheDocument();
    expect(lastEntryTime).toBeInTheDocument();

    const cell = lastEntryName.closest('.last-entry-cell');
    expect(cell).toHaveClass('bgRed'); // because efficiencyLoss = 51
  });
});
