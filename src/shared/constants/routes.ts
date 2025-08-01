export const ROUTES = {
  DEFAULT: `/`,
  PAGE_NOT_FOUND: `/404`,

  LOGIN: `/login`,
  REGISTER: `/register`,
  VERIFY_OTP: `/verify-otp`,
  RESET_PASSWORD: (token: string) => `/reset-password/${token}`,
  SET_PASSWORD: (token: string) => `/set-password/${token}`,
  FORGOT_PASSWORD: `/forgot-password`,

  CHANGE_PASSWORD: `/change-password`,
  MY_PROFILE: `/my-profile`,
  EDIT_MY_PROFILE: `/my-profile/edit`,

  DASHBOARD: `/dashboard`,

  // company management
  COMPANY_MANAGEMENT: `/company-management`,
  Add_COMPANY_MANAGEMENT: `/company-management/add`,
  Edit_COMPANY_MANAGEMENT: (id: string) => `/company-management/edit/${id}`,
  VIEW_COMPANY_MANAGEMENT: (id: string) => `/company-management/view/${id}`,

  // facility management
  FACILITY_MANAGEMENT: `/facility-management`,
  Add_FACILITY_MANAGEMENT: `/facility-management/add`,
  Edit_FACILITY_MANAGEMENT: (id: string) => `/facility-management/edit/${id}`,
  View_FACILITY_MANAGEMENT: (id: string) => `/facility-management/view/${id}`,

  // chiller management
  CHILLER_MANAGEMENT: `/chiller-management`,
  Add_CHILLER_MANAGEMENT: `/chiller-management/add`,
  Edit_CHILLER_MANAGEMENT: (id: string) => `/chiller-management/edit/${id}`,
  View_CHILLER_MANAGEMENT: (id: string) => `/chiller-management/view/${id}`,

  // user management
  USER_MANAGEMENT: `/user-management`,
  ADD_USER_MANAGEMENT: `/user-management/add`,
  EDIT_USER_MANAGEMENT: (id: string) => `/user-management/edit/${id}`,
  VIEW_USER_MANAGEMENT: (id: string) => `/user-management/view/${id}`,

  // CMS
  TERMS_CONDITION: `/terms-condition`,
  EDIT_TERMS_CONDITION: `/terms-condition/edit`,
  PRIVACY_POLICY: `/privacy-policy`,
  EDIT_PRIVACY_POLICY: `/privacy-policy/edit`,
  NOTIFICATION: `/notification`,

  // problem & solution
  PROBLEM_SOLUTION: `/problem-solution`,
  CONFIGURE_FIELD: (id: string) => `/configure-field/${id}`,

  // reports
  REPORT: `/report`,
  ADD_REPORT: `/report/add`,
  EDIT_REPORT: `/report/edit`,
  VIEW_REPORT: `/report/view`,

  // maintenance
  MAINTENANCE: `/maintenance-records`,
  ADD_MAINTENANCE: `/maintenance/add`,
  EDIT_MAINTENANCE: `/maintenance/edit`,
  VIEW_MAINTENANCE: `/maintenance-records/view`,

  // log
  LOG_ENTRY: `/log-entries`,
  ADD_LOG_ENTRY: `/log-entries/add`,
  EDIT_LOG_ENTRY: `/log-entries/edit`,
  VIEW_LOG_ENTRY: `/log-entries/view`
};
