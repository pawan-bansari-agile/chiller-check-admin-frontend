import { render } from '@/test/utils';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import EditChiller from '../views/editChiller';

import ThemeProvider from '@/styles/config';

// Optionally mock child components
vi.mock('@/shared/components/common/Meta', () => ({
  default: () => <title data-testid="meta-title">Meta Title</title>
}));

vi.mock('../components/chillerAddEdit', () => ({
  default: () => <div data-testid="chiller-form">Chiller Form</div>
}));

describe('EditChiller Component', () => {
  it('should render Meta title and ChillerAddEditForm', () => {
    render(
      <ThemeProvider>
        <EditChiller />
      </ThemeProvider>
    );

    // Check if Meta title is rendered
    expect(screen.getByTestId('meta-title')).toBeInTheDocument();

    // Check if Chiller form is rendered
    expect(screen.getByTestId('chiller-form')).toBeInTheDocument();
  });
});
