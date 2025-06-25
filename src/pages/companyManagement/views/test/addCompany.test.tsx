import { render } from '@/test/utils';
import { describe, expect, it, vi } from 'vitest';

import AddCompany from '../addCompany';

import ThemeProvider from '@/styles/config';

// adjust path if needed

// Mock child components

vi.mock('@/shared/components/common/Meta', () => ({
  default: ({ title }: { title: string }) => <title>{title}</title>
}));

vi.mock('../components/CompanyAddEditForm', () => ({
  default: () => <div data-testid="company-form">Company Form</div>
}));

describe('AddCompany Page', () => {
  it('should render Meta, HeaderToolbar, and CompanyAddEditForm', () => {
    render(
      <ThemeProvider>
        <AddCompany />
      </ThemeProvider>
    );

    // Check Meta title
    expect(document.title).toBe('Company Management');
  });
});
