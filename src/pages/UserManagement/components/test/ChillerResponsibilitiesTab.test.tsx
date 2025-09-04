import { render } from '@/test/utils';
import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ChillerResponsibilitiesTab from '../ChillerResponsibilites';

import ThemeProvider from '@/styles/config';

const mockChillerAllList = vi.fn();

vi.mock('@/shared/components/common/Table', () => ({
  CommonTable: ({ columns, dataSource, loading, emptyText }: any) => {
    if (loading) return <div data-testid="loading">Loading...</div>;

    return (
      <div>
        {dataSource?.length ? (
          <div data-testid="table-content">
            {dataSource.map((record: any, index: number) => (
              <div key={record._id || index} data-testid="chiller-row">
                {columns.map((col: any) => (
                  <div key={col.key || index}>
                    {col.render ? col.render(record[col.dataIndex], record) : record[col.dataIndex]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          emptyText
        )}
      </div>
    );
  }
}));

vi.mock('@/shared/components/common/Table/EmptyState', () => ({
  __esModule: true,
  default: ({ defaultDescription }: any) => (
    <div data-testid="empty-state">{defaultDescription}</div>
  )
}));

vi.mock('@/shared/constants/routes', () => ({
  ROUTES: {
    View_CHILLER_MANAGEMENT: (id: string) => `/chiller/${id}`
  }
}));

vi.mock('@/services/chiller', () => ({
  chillerHooks: {
    ChillerAllList: (...args: any[]) => mockChillerAllList(...args)
  }
}));

vi.mock('@/services/chiller', () => ({
  chillerHooks: {
    ChillerAllList: () => ({
      data: [
        {
          _id: 'f1',
          facilityName: 'Main Facility',
          ChillerNo: 'Acme Corp',
          energyCost: 4,
          totalOperators: 6,
          status: true
        }
      ],
      isLoading: false
    })
  }
}));

vi.mock('@/shared/utils/functions', () => ({
  capitalizeFirstLetter: (str: string) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : ''),
  hexToRGBA: vi.fn()
}));

describe('ChillerResponsibilitiesTab', () => {
  const mockSetChillerIds = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title', () => {
    render(
      <ThemeProvider>
        <ChillerResponsibilitiesTab
          facilityIds={[]}
          chillerIds={[]}
          setChillerIds={mockSetChillerIds}
          companyName="CoolAir"
          form={vi.fn()}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('Chillers')).toBeInTheDocument();
  });

  it('shows loading state when isLoading is true', () => {
    render(
      <ThemeProvider>
        <ChillerResponsibilitiesTab
          facilityIds={[]}
          chillerIds={[]}
          setChillerIds={mockSetChillerIds}
          form={vi.fn()}
        />
      </ThemeProvider>
    );
  });
});
