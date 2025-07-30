import { render } from '@/test/utils';
import { describe, expect, it, vi } from 'vitest';

import AddFacility from '../addFacility';

import ThemeProvider from '@/styles/config';

// Mock Meta and FacilityAddEditForm components
vi.mock('@/shared/components/common/Meta', () => ({
  default: ({ title }: { title: string }) => <title>{title}</title>
}));

vi.mock('../components/facilityAddEditForm', () => ({
  default: () => <div>Facility Form Component</div>
}));

describe('AddFacility Page', () => {
  it('should render the page with Meta and FacilityAddEditForm', () => {
    render(
      <ThemeProvider>
        <AddFacility />
      </ThemeProvider>
    );

    // Check if the Meta title is present
    expect(document.title).toBe('Facility Management');
  });
});
