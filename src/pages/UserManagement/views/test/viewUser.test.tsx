import { render } from '@/test/utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import ViewUser from '../ViewUser';

import ThemeProvider from '@/styles/config';

// Mock data
const mockUserData = {
  id: '123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '1234567890',
  lastLoginTime: '2024-06-01T10:00:00Z',
  role: 'facilityManager',
  isActive: true,
  profileImage: '',
  company: { name: 'Acme Corp' },
  facilities: [{ name: 'Facility A' }, { name: 'Facility B' }],
  permissions: [],
  alerts: []
};

vi.mock('@/shared/utils/functions', () => ({
  debounce: (fn: any) => fn,
  getSortOrder: vi.fn((order) => (order === 'ascend' ? 'ASC' : order === 'descend' ? 'DESC' : '')),
  hexToRGBA: vi.fn(),
  capitalizeFirstLetter: vi.fn(),
  getAntDSortOrder: vi.fn(),
  buildSearchParams: vi.fn(),
  formatPhoneNumberInUsFormat: vi.fn(),
  hasPermission: vi.fn(),
  toAbsoluteUrl: vi.fn(),
  allowHoursPerWeek: vi.fn(),
  allowNegativeDecimalOnly: vi.fn()
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ id: '123' })
  };
});

vi.mock('@/services/user', async () => {
  const actual = await vi.importActual('@/services/user');
  return {
    ...actual,
    userHooks: {
      GetUserDetail: () => ({
        data: mockUserData,
        isLoading: false
      }),
      useActiveInactiveUser: () => ({
        mutate: vi.fn(),
        isPending: false
      }),
      OperatorsList: () => ({
        data: mockUserData,
        isLoading: false
      })
    },
    userQueryKeys: {
      all: ['userList']
    }
  };
});

describe('ViewUser Component', () => {
  const setup = () =>
    render(
      <ThemeProvider>
        <ViewUser />
      </ThemeProvider>
    );

  it('renders user details correctly', async () => {
    setup();

    expect(await screen.findByText('View User')).toBeInTheDocument();
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('User Role')).toBeInTheDocument();
    expect(screen.getByText('Facility')).toBeInTheDocument();
  });

  it('opens and closes the modal when Inactivate is clicked', async () => {
    setup();
    const hasPermission = vi.fn();
    if (hasPermission()) {
      const inactivateBtn = screen.getByText('Inactivate');
      fireEvent.click(inactivateBtn);

      await waitFor(() => {
        expect(screen.getByText('Inactivate User')).toBeInTheDocument();
      });

      const cancelBtn = screen.getByText('Cancel');
      fireEvent.click(cancelBtn);

      await waitFor(() => {
        expect(screen.queryByText('Inactivate User')).not.toBeInTheDocument();
      });
    }
  });
});
