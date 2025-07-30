import { lazy } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { authStore } from '@/store/auth';

import Layout from '@/shared/components/layout';
import { USER_ROLES } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import AuthGuard from '@/shared/guard/AuthGuard';
import PermissionGuard from '@/shared/guard/PermissionGuard';

const PageNotFound = lazy(() => import('@/pages/pageNotFound'));

// PUBLIC ROUTES
const Login = lazy(() => import('@/pages/login/views'));
const VerifyOtp = lazy(() => import('@/pages/verifyOtp/views'));
const ResetPassword = lazy(() => import('@/pages/resetPassword/views'));
const SetPassword = lazy(() => import('@/pages/setPassword/views'));
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

const Routing = () => {
  const { userData } = authStore((state) => state);
  const { permissions = {} } = userData;
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.VERIFY_OTP} element={<VerifyOtp />} />
      <Route path={ROUTES.RESET_PASSWORD(':token')} element={<ResetPassword />} />
      <Route path={ROUTES.SET_PASSWORD(':token')} element={<SetPassword />} />
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
        <Route
          path={ROUTES.COMPANY_MANAGEMENT}
          element={
            <PermissionGuard permissionKey="company" action="view" permissions={permissions}>
              <CompanyManagement />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.Add_COMPANY_MANAGEMENT}
          element={
            <PermissionGuard permissionKey="company" action="add" permissions={permissions}>
              <AddCompany />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.Edit_COMPANY_MANAGEMENT(':id')}
          element={
            <PermissionGuard permissionKey="company" action="edit" permissions={permissions}>
              <EditCompany />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.VIEW_COMPANY_MANAGEMENT(':id')}
          element={
            <PermissionGuard permissionKey="company" action="view" permissions={permissions}>
              <ViewCompany />
            </PermissionGuard>
          }
        />

        {/* facility management */}
        <Route
          path={ROUTES.FACILITY_MANAGEMENT}
          element={
            <PermissionGuard permissionKey="facility" action="view" permissions={permissions}>
              <FacilityManagement />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.Add_FACILITY_MANAGEMENT}
          element={
            <PermissionGuard permissionKey="facility" action="add" permissions={permissions}>
              <AddFacility />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.Edit_FACILITY_MANAGEMENT(':id')}
          element={
            <PermissionGuard permissionKey="facility" action="edit" permissions={permissions}>
              <EditFacility />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.View_FACILITY_MANAGEMENT(':id')}
          element={
            <PermissionGuard permissionKey="facility" action="view" permissions={permissions}>
              <ViewFacility />
            </PermissionGuard>
          }
        />

        {/* chiller management */}
        <Route
          path={ROUTES.CHILLER_MANAGEMENT}
          element={
            userData?.role !== USER_ROLES.OPERATOR ? (
              <PermissionGuard permissionKey="chiller" action="view" permissions={permissions}>
                <ChillerManagement />
              </PermissionGuard>
            ) : (
              <ChillerManagement />
            )
          }
        />
        <Route
          path={ROUTES.Add_CHILLER_MANAGEMENT}
          element={
            <PermissionGuard permissionKey="chiller" action="add" permissions={permissions}>
              <AddChiller />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.Edit_CHILLER_MANAGEMENT(':id')}
          element={
            <PermissionGuard permissionKey="chiller" action="edit" permissions={permissions}>
              <EditChiller />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.View_CHILLER_MANAGEMENT(':id')}
          element={
            userData?.role !== USER_ROLES.OPERATOR ? (
              <PermissionGuard permissionKey="chiller" action="view" permissions={permissions}>
                <ViewChiller />
              </PermissionGuard>
            ) : (
              <ViewChiller />
            )
          }
        />

        {/* User management */}
        <Route
          path={ROUTES.USER_MANAGEMENT}
          element={
            <PermissionGuard permissionKey="users" action="view" permissions={permissions}>
              <UserManagement />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.ADD_USER_MANAGEMENT}
          element={
            <PermissionGuard permissionKey="users" action="add" permissions={permissions}>
              <AddUser />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.EDIT_USER_MANAGEMENT(':id')}
          element={
            <PermissionGuard permissionKey="users" action="edit" permissions={permissions}>
              <EditUser />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.VIEW_USER_MANAGEMENT(':id')}
          element={
            <PermissionGuard permissionKey="users" action="view" permissions={permissions}>
              <ViewUser />
            </PermissionGuard>
          }
        />

        {/* CMS */}
        <Route path={ROUTES.TERMS_CONDITION} element={<TermsCondition />} />
        <Route path={ROUTES.EDIT_TERMS_CONDITION} element={<EditTermsCondition />} />
        <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
        <Route path={ROUTES.EDIT_PRIVACY_POLICY} element={<EditPrivacyPolicy />} />

        {/* problem & solution */}
        <Route
          path={ROUTES.PROBLEM_SOLUTION}
          element={
            <PermissionGuard permissionKey="setting" action="view" permissions={permissions}>
              <ProblemSolution />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.CONFIGURE_FIELD(':id')}
          element={
            <PermissionGuard permissionKey="setting" action="edit" permissions={permissions}>
              <ConfigureFiled />
            </PermissionGuard>
          }
        />

        {/* reports */}
        <Route
          path={ROUTES.REPORT}
          element={
            <PermissionGuard permissionKey="report" action="view" permissions={permissions}>
              <Report />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.ADD_REPORT}
          element={
            <PermissionGuard permissionKey="report" action="add" permissions={permissions}>
              <AddReport />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.EDIT_REPORT}
          element={
            <PermissionGuard permissionKey="report" action="edit" permissions={permissions}>
              <EditReport />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.VIEW_REPORT}
          element={
            <PermissionGuard permissionKey="report" action="view" permissions={permissions}>
              <ViewReport />
            </PermissionGuard>
          }
        />

        {/* maintenance */}
        <Route
          path={ROUTES.MAINTENANCE}
          element={
            <PermissionGuard permissionKey="maintenance" action="view" permissions={permissions}>
              <MaintenanceRecord />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.ADD_MAINTENANCE}
          element={
            <PermissionGuard permissionKey="maintenance" action="add" permissions={permissions}>
              <AddMaintenance />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.EDIT_MAINTENANCE}
          element={
            <PermissionGuard permissionKey="maintenance" action="edit" permissions={permissions}>
              <EditMaintenance />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.VIEW_MAINTENANCE}
          element={
            <PermissionGuard permissionKey="maintenance" action="view" permissions={permissions}>
              <ViewMaintenance />
            </PermissionGuard>
          }
        />

        {/* log */}
        <Route
          path={ROUTES.LOG_ENTRY}
          element={
            <PermissionGuard permissionKey="log" action="view" permissions={permissions}>
              <LogEntry />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.ADD_LOG_ENTRY}
          element={
            <PermissionGuard permissionKey="log" action="add" permissions={permissions}>
              <AddLog />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.EDIT_LOG_ENTRY}
          element={
            <PermissionGuard permissionKey="log" action="edit" permissions={permissions}>
              <EditLog />
            </PermissionGuard>
          }
        />
        <Route
          path={ROUTES.VIEW_LOG_ENTRY}
          element={
            <PermissionGuard permissionKey="log" action="view" permissions={permissions}>
              <ViewLog />
            </PermissionGuard>
          }
        />

        {/* notification */}
        <Route path={ROUTES.NOTIFICATION} element={<Notification />} />

        <Route path={ROUTES.DEFAULT} element={<Navigate replace to={ROUTES.DASHBOARD} />} />
        <Route path="*" element={<Navigate replace to={ROUTES.PAGE_NOT_FOUND} />} />
      </Route>
      <Route path="*" element={<Navigate replace to={ROUTES.DEFAULT} />} />
    </Routes>
  );
};

export default Routing;
