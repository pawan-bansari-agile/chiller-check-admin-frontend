import { lazy } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from '@/shared/components/layout';
import { ROUTES } from '@/shared/constants/routes';
import AuthGuard from '@/shared/guard/AuthGuard';

const PageNotFound = lazy(() => import('@/pages/pageNotFound'));

// PUBLIC ROUTES
const Login = lazy(() => import('@/pages/login/views'));
const VerifyOtp = lazy(() => import('@/pages/verifyOtp/views'));
const ResetPassword = lazy(() => import('@/pages/resetPassword/views'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword/Views'));

// PRIVATE ROUTES
const ChangePassword = lazy(() => import('@/pages/changePassword/views'));
const MyAccount = lazy(() => import('@/pages/myAccount/views'));
const EditAccount = lazy(() => import('@/pages/myAccount/views/EditAccount'));
const Dashboard = lazy(() => import('@/pages/dashboard/views'));
const CompanyManagement = lazy(() => import('@/pages/companyManagement/views'));
const AddCompany = lazy(() => import('@/pages/companyManagement/views/addCompany'));
const EditCompany = lazy(() => import('@/pages/companyManagement/views/editCompany'));
const ViewCompany = lazy(() => import('@/pages/companyManagement/views/viewCompany'));
const FacilityManagement = lazy(() => import('@/pages/facilityManagement/views'));
const AddFacility = lazy(() => import('@/pages/facilityManagement/views/addFacility'));
const EditFacility = lazy(() => import('@/pages/facilityManagement/views/editFacility'));
const ViewFacility = lazy(() => import('@/pages/facilityManagement/views/viewFacility'));
const ChillerManagement = lazy(() => import('@/pages/chillerManagement/views'));
const AddChiller = lazy(() => import('@/pages/chillerManagement/views/addChiller'));
const EditChiller = lazy(() => import('@/pages/chillerManagement/views/editChiller'));
const ViewChiller = lazy(() => import('@/pages/chillerManagement/views/viewChiller'));
const UserManagement = lazy(() => import('@/pages/UserManagement/views/Index'));
const AddUser = lazy(() => import('@/pages/UserManagement/views/AddUser'));
const EditUser = lazy(() => import('@/pages/UserManagement/views/EditUser'));
const ViewUser = lazy(() => import('@/pages/UserManagement/views/ViewUser'));
const TermsCondition = lazy(() => import('@/pages/CMS/views/TermsCondition'));
const EditTermsCondition = lazy(() => import('@/pages/CMS/views/EditTermsCondition'));
const PrivacyPolicy = lazy(() => import('@/pages/CMS/views/PrivacyPolicy'));
const EditPrivacyPolicy = lazy(() => import('@/pages/CMS/views/EditPrivacyPolicy'));
const Notification = lazy(() => import('@/pages/Notification/views'));
const ProblemSolution = lazy(() => import('@/pages/problemSolution/views'));
const ConfigureFiled = lazy(() => import('@/pages/problemSolution/views/ConfigureFiled'));
const Report = lazy(() => import('@/pages/report/views'));
const AddReport = lazy(() => import('@/pages/report/views/AddReport'));
const EditReport = lazy(() => import('@/pages/report/views/EditReport'));
const ViewReport = lazy(() => import('@/pages/report/views/ViewReport'));
const MaintenanceRecord = lazy(() => import('@/pages/maintenanceRecord/views'));
const AddMaintenance = lazy(() => import('@/pages/maintenanceRecord/views/AddMaintenance'));
const EditMaintenance = lazy(() => import('@/pages/maintenanceRecord/views/EditMaintenance'));
const ViewMaintenance = lazy(() => import('@/pages/maintenanceRecord/views/ViewMaintenance'));
const LogEntry = lazy(() => import('@/pages/Log/view'));
const AddLog = lazy(() => import('@/pages/Log/view/AddLog'));
const EditLog = lazy(() => import('@/pages/Log/view/EditLog'));
const ViewLog = lazy(() => import('@/pages/Log/view/ViewLog'));

const ComingSoon = lazy(() => import('@/pages/ComingSoon'));

const Routing = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.VERIFY_OTP} element={<VerifyOtp />} />
      <Route path={ROUTES.RESET_PASSWORD(':token')} element={<ResetPassword />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route
        path={ROUTES.DEFAULT}
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route path={ROUTES.PAGE_NOT_FOUND} element={<PageNotFound />} />
        <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword />} />
        <Route path={ROUTES.MY_PROFILE} element={<MyAccount />} />
        <Route path={ROUTES.EDIT_MY_PROFILE} element={<EditAccount />} />

        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

        {/* company management */}
        <Route path={ROUTES.COMPANY_MANAGEMENT} element={<CompanyManagement />} />
        <Route path={ROUTES.Add_COMPANY_MANAGEMENT} element={<AddCompany />} />
        <Route path={ROUTES.Edit_COMPANY_MANAGEMENT(':id')} element={<EditCompany />} />
        <Route path={ROUTES.VIEW_COMPANY_MANAGEMENT(':id')} element={<ViewCompany />} />

        {/* facility management */}
        <Route path={ROUTES.FACILITY_MANAGEMENT} element={<FacilityManagement />} />
        <Route path={ROUTES.Add_FACILITY_MANAGEMENT} element={<AddFacility />} />
        <Route path={ROUTES.Edit_FACILITY_MANAGEMENT} element={<EditFacility />} />
        <Route path={ROUTES.View_FACILITY_MANAGEMENT} element={<ViewFacility />} />

        {/* chiller management */}
        <Route path={ROUTES.CHILLER_MANAGEMENT} element={<ChillerManagement />} />
        <Route path={ROUTES.Add_CHILLER_MANAGEMENT} element={<AddChiller />} />
        <Route path={ROUTES.Edit_CHILLER_MANAGEMENT} element={<EditChiller />} />
        <Route path={ROUTES.View_CHILLER_MANAGEMENT} element={<ViewChiller />} />

        {/* User management */}
        <Route path={ROUTES.USER_MANAGEMENT} element={<UserManagement />} />
        <Route path={ROUTES.ADD_USER_MANAGEMENT} element={<AddUser />} />
        <Route path={ROUTES.EDIT_USER_MANAGEMENT} element={<EditUser />} />
        <Route path={ROUTES.VIEW_USER_MANAGEMENT} element={<ViewUser />} />

        {/* CMS */}
        <Route path={ROUTES.TERMS_CONDITION} element={<TermsCondition />} />
        <Route path={ROUTES.EDIT_TERMS_CONDITION} element={<EditTermsCondition />} />
        <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
        <Route path={ROUTES.EDIT_PRIVACY_POLICY} element={<EditPrivacyPolicy />} />

        {/* problem & solution */}
        <Route path={ROUTES.PROBLEM_SOLUTION} element={<ProblemSolution />} />
        <Route path={ROUTES.CONFIGURE_FIELD} element={<ConfigureFiled />} />

        {/* reports */}
        <Route path={ROUTES.REPORT} element={<Report />} />
        <Route path={ROUTES.ADD_REPORT} element={<AddReport />} />
        <Route path={ROUTES.EDIT_REPORT} element={<EditReport />} />
        <Route path={ROUTES.VIEW_REPORT} element={<ViewReport />} />

        {/* maintenance */}
        <Route path={ROUTES.MAINTENANCE} element={<MaintenanceRecord />} />
        <Route path={ROUTES.ADD_MAINTENANCE} element={<AddMaintenance />} />
        <Route path={ROUTES.EDIT_MAINTENANCE} element={<EditMaintenance />} />
        <Route path={ROUTES.VIEW_MAINTENANCE} element={<ViewMaintenance />} />

        {/* log */}
        <Route path={ROUTES.LOG_ENTRY} element={<LogEntry />} />
        <Route path={ROUTES.ADD_LOG_ENTRY} element={<AddLog />} />
        <Route path={ROUTES.EDIT_LOG_ENTRY} element={<EditLog />} />
        <Route path={ROUTES.VIEW_LOG_ENTRY} element={<ViewLog />} />

        {/* notification */}
        <Route path={ROUTES.NOTIFICATION} element={<Notification />} />

        <Route path={ROUTES.COMING_SOON} element={<ComingSoon />} />

        <Route path={ROUTES.DEFAULT} element={<Navigate replace to={ROUTES.DASHBOARD} />} />
        <Route path="*" element={<Navigate replace to={ROUTES.PAGE_NOT_FOUND} />} />
      </Route>
      <Route path="*" element={<Navigate replace to={ROUTES.DEFAULT} />} />
    </Routes>
  );
};

export default Routing;
