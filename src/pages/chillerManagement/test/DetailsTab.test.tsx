import { render } from '@/test/utils';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { IChillerViewRes } from '@/services/chiller/types';

import { MEASUREMENT_UNITS } from '@/shared/constants';

import DetailsTab from '../components/DetailsTab';

import ThemeProvider from '@/styles/config';

const mockChillerData: IChillerViewRes = {
  type: 'Screw',
  unit: MEASUREMENT_UNITS[0].value, // English
  companyName: 'ABC Corp',
  facilityName: 'Plant 1',
  ChillerNo: 'CH-001',
  weeklyHours: 40,
  weeksPerYear: 52,
  avgLoadProfile: 70,
  desInletWaterTemp: '45°F',
  make: 'Trane',
  model: 'XYZ123',
  serialNumber: 'SN987654',
  manufacturedYear: 2022,
  refrigType: 'R-134a',
  tons: 100,
  kwr: 300,
  efficiencyRating: 0.6,
  energyCost: 0.12,
  condDPDrop: 5,
  condDPDropUnit: 'psi',
  condAPDropUnit: 'kPa',
  condPressureUnit: 'psi',
  condApproach: 5,
  condDesignFlow: 200,
  condDesignDeltaT: 10,
  evapDPDrop: 4,
  evapDPDropUnit: 'kPa',
  evapAPDropUnit: 'bar',
  evapDesignDeltaT: 6,
  evapDesignFlow: 150,
  evapApproach: 3,
  evapDOWTemp: 40,
  evapPressureUnit: 'psi',
  useEvapRefrigTemp: true,
  designVoltage: 480,
  voltageChoice: '480V',
  ampChoice: 'Full Load',
  fullLoadAmps: 350,
  purgeReadingUnit: 'Hrs',
  maxPurgeTime: 30,
  havePurge: true,
  haveBearingTemp: false,
  compOPIndicator: 'Normal',
  userNote: 'Unit working fine.',
  numberOfCompressors: 2,
  useRunHours: 'Yes',
  _id: '',
  companyId: '',
  facilityId: '',
  status: '',
  highPressureRefrig: false,
  oilPresHighUnit: '',
  oilPresLowUnit: '',
  oilPresDifUnit: '',
  useLoad: false
};

describe('DetailsTab', () => {
  it('renders all major sections', () => {
    render(
      <ThemeProvider>
        <DetailsTab chillerData={mockChillerData} />
      </ThemeProvider>
    );

    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Name Plate Data')).toBeInTheDocument();
    expect(screen.getByText('Condenser')).toBeInTheDocument();
    expect(screen.getByText('Evaporator')).toBeInTheDocument();
    expect(screen.getByText('Electrical')).toBeInTheDocument();
    expect(screen.getByText('Readouts')).toBeInTheDocument();
    expect(screen.getByText('Additional Info')).toBeInTheDocument();
  });

  it('renders correct values from chillerData', () => {
    render(
      <ThemeProvider>
        <DetailsTab chillerData={mockChillerData} />
      </ThemeProvider>
    );
    expect(screen.getByText('ABC Corp')).toBeInTheDocument();
    expect(screen.getByText('Plant 1')).toBeInTheDocument();
    expect(screen.getByText('CH-001')).toBeInTheDocument();
    expect(screen.getByText('40 Hrs.')).toBeInTheDocument();
    expect(screen.getByText('70 %')).toBeInTheDocument();
    expect(screen.getByText('45°F')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('0.6 kw/ton')).toBeInTheDocument();
  });

  it('shows correct boolean values', () => {
    render(
      <ThemeProvider>
        <DetailsTab chillerData={mockChillerData} />
      </ThemeProvider>
    );
    expect(screen.getAllByText('Yes')).toHaveLength(3); // useEvapRefrigTemp, havePurge
    expect(screen.getAllByText('No')).toHaveLength(1); // haveBearingTemp
  });

  it('handles missing optional values gracefully', () => {
    const partialData = {
      type: '',
      unit: '',
      companyName: '',
      ChillerNo: '',
      havePurge: false,
      useEvapRefrigTemp: false
    } as IChillerViewRes;

    render(
      <ThemeProvider>
        <DetailsTab chillerData={partialData} />
      </ThemeProvider>
    );

    expect(screen.getAllByText('No')).toHaveLength(3); // booleans
  });
});
