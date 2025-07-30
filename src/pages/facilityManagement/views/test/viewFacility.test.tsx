import { render } from '@/test/utils';
import { fireEvent, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { facilityHooks } from '@/services/facility';

import ViewFacility from '../viewFacility';

import ThemeProvider from '@/styles/config';

vi.mock('@/services/facility', () => ({
  facilityHooks: {
    FacilityView: vi.fn(),
    useActiveInactiveFacility: () => ({
      mutate: vi.fn(),
      isPending: false
    })
  }
}));

vi.mock('@/store/auth', () => ({
  authStore: vi.fn().mockReturnValue({
    userData: { role: 'admin' } // or your desired role for test
  })
}));

const mockFacilityData = {
  name: 'Test Facility',
  companyName: 'Test Company',
  timezone: 'Asia/Kolkata',
  altitude: 500,
  altitudeUnit: 'meters',
  totalChiller: 2,
  address: '123 Test Street',
  isActive: true,
  chillers: [
    {
      _id: 'chiller1',
      make: 'MakeA',
      model: 'ModelX',
      ChillerNo: 'C-101'
    }
  ]
};

vi.mock('@/shared/utils/functions', async () => {
  const actual = await vi.importActual('@/shared/utils/functions');
  return {
    ...actual,
    hasPermission: () => true
  };
});

describe('ViewFacility Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (facilityHooks.FacilityView as any).mockReturnValue({
      data: mockFacilityData,
      isLoading: false
    });
  });

  it('renders facility details correctly', async () => {
    render(
      <ThemeProvider>
        <ViewFacility />
      </ThemeProvider>
    );

    expect(screen.getAllByText(/Test Facility/i)?.[0]).toBeInTheDocument();
    expect(screen.getByText(/Test Company/i)).toBeInTheDocument();
    expect(screen.getByText(/Asia\/Kolkata/i)).toBeInTheDocument();
    expect(screen.getByText(/500 Meters/i)).toBeInTheDocument();
    expect(screen.getByText(/123 Test Street/i)).toBeInTheDocument();
  });

  it('opens modal on Inactivate button click', async () => {
    render(
      <ThemeProvider>
        <ViewFacility />
      </ThemeProvider>
    );

    const inactivateButton = screen.getByRole('button', { name: /inactivate/i });
    fireEvent.click(inactivateButton);

    const modal = await screen.findByRole('dialog');
    expect(within(modal).getByText(/Inactivate Facility/i)).toBeInTheDocument();
    expect(within(modal).getByText(/If a facility is inactivated/i)).toBeInTheDocument();
  });
});
