import { render } from '@/test/utils';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import AnalyticsTab from '../components/AnalyticsTab';

import ThemeProvider from '@/styles/config';

vi.mock('@/shared/components/common/Details', () => ({
  default: ({ detailsTitle, detailsDescription }: any) => (
    <div data-testid={`mock-details-${detailsDescription?.replace(/\s/g, '')}`}>
      <div>{detailsTitle}</div>
      <div>{detailsDescription}</div>
    </div>
  )
}));

const mockProps = {
  maker: 'Carrier',
  year: '2022',
  module: 'VFD-23',
  cost: '150',
  facilityName: 'Main Facility',
  serialNumber: 'CH123456'
};

const renderComponent = () => {
  return render(
    <ThemeProvider>
      <AnalyticsTab {...mockProps} />
    </ThemeProvider>
  );
};

describe('AnalyticsTab Component', () => {
  it('renders all Details components with correct values', () => {
    renderComponent();

    expect(screen.getByTestId('mock-details-Cost').textContent).toContain('150');
    expect(screen.getByTestId('mock-details-Maker').textContent).toContain('Carrier');
    expect(screen.getByTestId('mock-details-Facilities').textContent).toContain('Main Facility');
    expect(screen.getByTestId('mock-details-SerialNumber').textContent).toContain('CH123456');
  });
  it('renders basic details', () => {
    renderComponent();

    expect(screen.getByText(/Carrier/i)).toBeInTheDocument();
    expect(screen.getByText(/VFD-23\(2022\)/i)).toBeInTheDocument();
    expect(screen.getByText(/\$150 KW\/hr/i)).toBeInTheDocument();
    expect(screen.getByText(/Main Facility/i)).toBeInTheDocument();
    expect(screen.getByText(/CH123456/i)).toBeInTheDocument();
  });

  it('renders chart legends', () => {
    renderComponent();
    const weekElements = screen.getAllByText(/Week/i);
    expect(weekElements.length).toBeGreaterThan(0);
    const monthElements = screen.getAllByText(/Month/i);
    expect(monthElements.length).toBeGreaterThan(0);
    const yearElements = screen.getAllByText(/Year/i);
    expect(yearElements.length).toBeGreaterThan(0);
  });

  it('renders gauge cards and headers', () => {
    renderComponent();
    expect(screen.getByText(/Average Energy Loss/i)).toBeInTheDocument();
    expect(screen.getByText(/Efficient Rating/i)).toBeInTheDocument();
    expect(screen.getByText(/Cost At Load/i)).toBeInTheDocument();
    expect(screen.getByText(/Average Energy Consumption/i)).toBeInTheDocument();
    expect(screen.getByText(/Issue Reported - Condenser/i)).toBeInTheDocument();
  });

  it('renders data row under issue report', () => {
    renderComponent();
    expect(screen.getByText(/8-4-2024 5:30 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/Loss: 12%/i)).toBeInTheDocument();
    expect(screen.getByText(/Load: 10%/i)).toBeInTheDocument();
    expect(screen.getByText('86.0')).toBeInTheDocument();
    expect(screen.getByText('96.0')).toBeInTheDocument();
    expect(screen.getByText('95.4')).toBeInTheDocument();
    expect(screen.getByText('183.0')).toBeInTheDocument();
    expect(screen.getByText('7.8')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});
