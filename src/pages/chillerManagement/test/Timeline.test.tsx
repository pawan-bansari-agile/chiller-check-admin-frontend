import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, it, vi } from 'vitest';

import { chillerHooks } from '@/services/chiller';

import TimelineTab from '../components/TimelineTab';

import ThemeProvider from '@/styles/config';

vi.mock('@/services/chiller', () => ({
  chillerHooks: {
    ChillerTimeLineList: vi.fn()
  }
}));

vi.mock('@/shared/utils/functions', async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    debounce: (fn: any) => fn, // immediate execution for testing
    getSortOrder: (order: string | undefined) =>
      order === 'ascend' ? 'asc' : order === 'descend' ? 'desc' : ''
  };
});

const mockTimelineData = {
  timelineList: [
    {
      createdAt: '2024-07-15T14:30:00Z',
      title: 'Maintenance Called',
      description: 'Chiller needed urgent maintenance.'
    },
    {
      createdAt: '2024-07-20T10:00:00Z',
      title: 'Inspection Done',
      description: 'Routine inspection completed.'
    }
  ],
  totalRecords: 2
};

describe('TimelineTab Component', () => {
  const queryClient = new QueryClient();

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TimelineTab id="123" />
        </ThemeProvider>
      </QueryClientProvider>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loader when loading', () => {
    (chillerHooks.ChillerTimeLineList as any).mockReturnValue({
      data: undefined,
      isLoading: true
    });

    renderComponent();

    // CommonTable loading spinner uses Antd's role
    expect(document.querySelector('.ant-spin')).toBeInTheDocument();
  });

  it('renders timeline data correctly', async () => {
    (chillerHooks.ChillerTimeLineList as any).mockReturnValue({
      data: mockTimelineData,
      isLoading: false
    });

    renderComponent();

    expect(await screen.findByText('Maintenance Called')).toBeInTheDocument();
    expect(screen.getByText('Routine inspection completed.')).toBeInTheDocument();
  });

  it('displays empty state if no data is found', () => {
    (chillerHooks.ChillerTimeLineList as any).mockReturnValue({
      data: { timelineList: [], totalRecords: 0 },
      isLoading: false
    });

    renderComponent();

    expect(screen.getByText('No Timeline Entries Found')).toBeInTheDocument();
  });

  it('triggers search input and updates state', async () => {
    const mockReturn = {
      data: mockTimelineData,
      isLoading: false
    };

    (chillerHooks.ChillerTimeLineList as any).mockReturnValue(mockReturn);

    renderComponent();

    const searchInput = screen.getByPlaceholderText('Search');

    fireEvent.change(searchInput, { target: { value: 'Maintenance' } });

    // This will not assert data re-fetch since we mocked the hook, but confirms input works
    expect(searchInput).toHaveValue('Maintenance');
  });

  it('handles date range selection', async () => {
    const mockReturn = {
      data: mockTimelineData,
      isLoading: false
    };

    (chillerHooks.ChillerTimeLineList as any).mockReturnValue(mockReturn);

    renderComponent();

    const [rangePickerInput] = screen.getAllByRole('textbox');

    expect(rangePickerInput).toBeInTheDocument();
    fireEvent.mouseDown(rangePickerInput);
  });
});
