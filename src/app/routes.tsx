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
        <Route path={ROUTES.MY_ACCOUNT} element={<MyAccount />} />

        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

        {/* company management */}
        <Route path={ROUTES.COMPANY_MANAGEMENT} element={<CompanyManagement />} />
        <Route path={ROUTES.Add_COMPANY_MANAGEMENT} element={<AddCompany />} />
        <Route path={ROUTES.Edit_COMPANY_MANAGEMENT} element={<EditCompany />} />
        <Route path={ROUTES.View_COMPANY_MANAGEMENT} element={<ViewCompany />} />

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

        <Route path={ROUTES.COMING_SOON} element={<ComingSoon />} />

        <Route path={ROUTES.DEFAULT} element={<Navigate replace to={ROUTES.DASHBOARD} />} />
        <Route path="*" element={<Navigate replace to={ROUTES.PAGE_NOT_FOUND} />} />
      </Route>
      <Route path="*" element={<Navigate replace to={ROUTES.DEFAULT} />} />
    </Routes>
  );
};

export default Routing;
