export const ROUTES = {
  DEFAULT: `/`,
  PAGE_NOT_FOUND: `/404`,

  LOGIN: `/login`,
  REGISTER: `/register`,
  VERIFY_OTP: `/verify-otp`,
  RESET_PASSWORD: (token: string) => `/reset-password/${token}`,
  FORGOT_PASSWORD: `/forgot-password`,

  CHANGE_PASSWORD: `/change-password`,
  MY_PROFILE: `/my-profile`,
  EDIT_MY_PROFILE: `/my-profile/edit`,
  COMING_SOON: `/coming-soon`,

  DASHBOARD: `/dashboard`,

  // company management
  COMPANY_MANAGEMENT: `/company-management`,
  Add_COMPANY_MANAGEMENT: `/company-management/add`,
  Edit_COMPANY_MANAGEMENT: (id: string) => `/company-management/edit/${id}`,
  VIEW_COMPANY_MANAGEMENT: (id: string) => `/company-management/view/${id}`,

  // facility management
  FACILITY_MANAGEMENT: `/facility-management`,
  Add_FACILITY_MANAGEMENT: `/facility-management/add`,
  Edit_FACILITY_MANAGEMENT: `/facility-management/edit`,
  View_FACILITY_MANAGEMENT: `/facility-management/view`,

  // chiller management
  CHILLER_MANAGEMENT: `/chiller-management`,
  Add_CHILLER_MANAGEMENT: `/chiller-management/add`,
  Edit_CHILLER_MANAGEMENT: `/chiller-management/edit`,
  View_CHILLER_MANAGEMENT: `/chiller-management/view`,

  // user management
  USER_MANAGEMENT: `/user-management`,
  ADD_USER_MANAGEMENT: `/user-management/add`,
  EDIT_USER_MANAGEMENT: `/user-management/edit`,
  VIEW_USER_MANAGEMENT: `/user-management/view`,

  // CMS
  TERMS_CONDITION: `/terms-condition`,
  EDIT_TERMS_CONDITION: `/terms-condition/edit`,
  PRIVACY_POLICY: `/privacy-policy`,
  EDIT_PRIVACY_POLICY: `/privacy-policy/edit`,
  NOTIFICATION: `/notification`,

  // problem & solution
  PROBLEM_SOLUTION: `/problem-solution`,
  CONFIGURE_FIELD: `/configure-field`,

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
