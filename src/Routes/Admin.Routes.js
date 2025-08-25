import React, { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from '../ExtraComponent/Loader';
import Dashboards from '../components/admin/Dashboard/Dashboards';
// import Dashboards from '../components/admin/Dashboard/Dashboards';
import { SidebarProvider } from "../components/layouts/SidebarContext";
import Sidebar from '../components/layouts/Sidebar';
import Header from '../components/layouts/Header';
import Adduser from '../components/admin/User/Adduser';
import Clientservice from '../components/admin/User/Clientservice';
import Tradehistory from '../components/admin/TradeHistory/Tradehistory';
import Allscript from '../components/admin/AdminScript/AllScript';
import Clientactivity from '../components/admin/User/Clientactivity';
import Clientreport from '../components/admin/User/Clientreport';
import Smtp from '../components/admin/Smtp/Smtp';
import UserLogs from '../components/admin/User/UserLogs';
import StrategyGroup from '../components/admin/Groups/StrategyGroup';
import ServiceReport from '../components/admin/User/ServiceReport';
import AddscriptScalping from '../components/admin/AdminScript/Addscript.Scalping';
import AddScriptOption from '../components/admin/AdminScript/AddScript.Option'
import PatternScript from '../components/admin/AdminScript/AddScript.Pattern'
import System from '../components/admin/System/System';
import AllPlan from '../components/admin/Plan/AllPlan';
import AddPlan from '../components/admin/Plan/AddPlan';
import TransectionRequest from '../components/admin/Requests/TransectionRequests';
import AddSubadmin from '../components/admin/SubAdmin/AddSubadmin';
import AllSubadmin from '../components/admin/SubAdmin/AllSubadmin';
import EditSubadmin from '../components/admin/SubAdmin/EditSubadmin';
import ApiCreateInfo from '../components/admin/apicreateInfo/ApiCreateInfo';
import SidebarRight from '../components/layouts/SidebarRight';
import ChartComponent from '../components/admin/AdvanceChart/ChartComponent';
import OptionChain from '../components/admin/OptionChain/OptionChain';
import MasterAccount from '../components/admin/MasterAccount/MasterAccount';
import CouponPage from '../components/admin/CouponPage/CouponPage';
import AddCoupon from '../components/admin/CouponPage/AddCoupon';
import StrategyTag from '../components/admin/AdminScript/StrategyTag/StrategyTag';
import AllStrategyTag from '../components/admin/AdminScript/StrategyTag/AllStrategyTag';
import ResponseQnA from '../components/admin/ResponseQnA/ResponseQnA';

// const Dashboards = lazy(() => import('../components/admin/Dashboard/Dashboards'));
// const Sidebar = lazy(() => import('../components/layouts/Sidebar'));
// const Header = lazy(() => import('../components/layouts/Header'));
// const Adduser = lazy(() => import('../components/admin/User/Adduser'));
// const Clientservice = lazy(() => import('../components/admin/User/Clientservice'));
// const Tradehistory = lazy(() => import('../components/admin/TradeHistory/Tradehistory'));
// const Allscript = lazy(() => import('../components/admin/AdminScript/AllScript'));
// const Clientactivity = lazy(() => import('../components/admin/User/Clientactivity'));
// const Clientreport = lazy(() => import('../components/admin/User/Clientreport'));
// const Smtp = lazy(() => import('../components/admin/Smtp/Smtp'));
// const UserLogs = lazy(() => import('../components/admin/User/UserLogs'));
// const StrategyGroup = lazy(() => import('../components/admin/Groups/StrategyGroup'));
// const ServiceReport = lazy(() => import('../components/admin/User/ServiceReport'));
// const AddscriptScalping = lazy(() => import('../components/admin/AdminScript/Addscript.Scalping'));
// const AddScriptOption = lazy(() => import('../components/admin/AdminScript/AddScript.Option'));
// const PatternScript = lazy(() => import('../components/admin/AdminScript/AddScript.Pattern'));
// const System = lazy(() => import('../components/admin/System/System'));
// const AllPlan = lazy(() => import('../components/admin/Plan/AllPlan'));
// const AddPlan = lazy(() => import('../components/admin/Plan/AddPlan'));
// const TransectionRequest = lazy(() => import('../components/admin/Requests/TransectionRequests'));
// const AddSubadmin = lazy(() => import('../components/admin/SubAdmin/AddSubadmin'));
// const AllSubadmin = lazy(() => import('../components/admin/SubAdmin/AllSubadmin'));
// const EditSubadmin = lazy(() => import('../components/admin/SubAdmin/EditSubadmin'));
// const ApiCreateInfo = lazy(() => import('../components/admin/apicreateInfo/ApiCreateInfo'));
// const SidebarRight = lazy(() => import('../components/layouts/SidebarRight'));


const AdminRoute = ({permissionData}) => {


  return (
    <>
      <div className='wrapper'>
      <SidebarProvider> 
        <Sidebar permissionData={permissionData} />
        <div id="content-page" className="content-page">
          <Header permissionData={permissionData} />


          <Routes>
            <Route path="/dashboard" element={<Dashboards />} />
            <Route path="/adduser" element={<Adduser />} />
            <Route path="/clientservice" element={<Clientservice />} />
            <Route path="/tradehistory" element={<Tradehistory />} />
            <Route path="/allscript" element={<Allscript />} />
            <Route path="/addscript/scalping" element={<AddscriptScalping />} />
            <Route path="/addscript/pattern" element={<PatternScript />} />
            <Route path="/addscript/option" element={<AddScriptOption />} />
            <Route path="/clientactivity" element={<Clientactivity />} />
            <Route path="/clientreport" element={<Clientreport />} />
            <Route path="/smtp" element={<Smtp />} />
            <Route path="/userlogs" element={<UserLogs />} />
            <Route path="/strategygroup" element={<StrategyGroup />} />
            <Route path="/servicreport" element={<ServiceReport />} />
            <Route path="/system" element={<System />} />
            <Route path="/allplan" element={<AllPlan />} />
            <Route path="/addplan" element={<AddPlan />} />
            <Route path="/transectionrequest" element={<TransectionRequest />} />
            <Route path="/addSubadmin" element={<AddSubadmin />} />
            <Route path="/allSubadmin" element={<AllSubadmin />} />
            <Route path="/editSubadmin" element={<EditSubadmin />} />
            <Route path="/api-create-info" element={<ApiCreateInfo />} />
            <Route path="/chart" element={<ChartComponent />} />
            <Route path="/optionchain" element={<OptionChain />} />
            <Route path="/Master-Account" element={<MasterAccount />} />
            <Route path="/Coupon" element={<CouponPage />} />
            <Route path="/addCoupon" element={<AddCoupon />} />
            <Route path="/add-Strategy-tag" element={<StrategyTag />} />
            <Route path="/Strategy-tag" element={<AllStrategyTag />} />
            <Route path="/ResponseQnA" element={<ResponseQnA />} />
          </Routes>
        </div>
        <SidebarRight permissionData={permissionData} />
        </SidebarProvider>
      </div >
    </>
  );
}

export default AdminRoute;

