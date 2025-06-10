export const ROUTES = {
  DEFAULT: `/`,
  PAGE_NOT_FOUND: `/404`,

  LOGIN: `/login`,
  REGISTER: `/register`,
  VERIFY_OTP: `/verify-otp`,
  RESET_PASSWORD: (token: string) => `/reset-password/${token}`,
  FORGOT_PASSWORD: `/forgot-password`,

  CHANGE_PASSWORD: `/change-password`,
  MY_ACCOUNT: `/my-account`,
  COMING_SOON: `/coming-soon`,

  DASHBOARD: `/dashboard`,

  // company management
  COMPANY_MANAGEMENT: `/company-management`,
  Add_COMPANY_MANAGEMENT: `/company-management/add`,
  Edit_COMPANY_MANAGEMENT: `/company-management/edit`,
  View_COMPANY_MANAGEMENT: `/company-management/view`,

  // facility management
  FACILITY_MANAGEMENT: `/facility-management`,
  Add_FACILITY_MANAGEMENT: `/facility-management/add`,
  Edit_FACILITY_MANAGEMENT: `/facility-management/edit`,
  View_FACILITY_MANAGEMENT: `/facility-management/view`,

  // chiller management
  CHILLER_MANAGEMENT: `/chiller-management`,
  Add_CHILLER_MANAGEMENT: `/chiller-management/add`,
  Edit_CHILLER_MANAGEMENT: `/chiller-management/edit`,
  View_CHILLER_MANAGEMENT: `/chiller-management/view`
};
