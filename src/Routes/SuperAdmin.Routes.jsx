import React,{lazy,Suspense} from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from '../ExtraComponent/Loader';
import Dashboards from '../components/superAdmin/dashboard/Dashboard';
import Sidebar from '../components/layouts/Sidebar';
import Header from '../components/layouts/Header';
import AdminDetails from '../components/superAdmin/adminDetails/Admindetails';
import CreateAdmin from '../components/superAdmin/accountCreate/CreateAccount';
import AmountDetails from '../components/superAdmin/amountdetails/AmmountDetails';
import AdminActivity from '../components/superAdmin/adminActivity/adminActivity';
import ClientThreadReport from '../components/superAdmin/clientThreadReport/clientThreadReport';
import ClientThreadResponse from '../components/superAdmin/clientThreadResponse/ClientThreadResponse';
import UpdateClientDetails from '../components/superAdmin/updateClientDetails/UpdateClientDetails';
import ApiCreateInfo from '../components/superAdmin/apiCreateInfo/ApiCreateInfo';
import NewUpdate from '../components/superAdmin/newUpdate/NewUpdate';
import SidebarRight from '../components/layouts/SidebarRight';


// const Dashboards = lazy(() => import('../components/superAdmin/dashboard/Dashboard'));
// const Sidebar = lazy(() => import('../components/layouts/Sidebar'));
// const SidebarRight = lazy(() => import('../components/layouts/SidebarRight'));
// const Header = lazy(() => import('../components/layouts/Header'));
// const AdminDetails = lazy(() => import('../components/superAdmin/adminDetails/Admindetails'));
// const CreateAdmin = lazy(() => import('../components/superAdmin/accountCreate/CreateAccount'));
// const AmountDetails = lazy(() => import('../components/superAdmin/amountdetails/AmmountDetails'));
// const AdminActivity = lazy(() => import('../components/superAdmin/adminActivity/adminActivity'));
// const ClientThreadReport = lazy(() => import('../components/superAdmin/clientThreadReport/clientThreadReport'));
// const ClientThreadResponse = lazy(() => import('../components/superAdmin/clientThreadResponse/ClientThreadResponse'));
// const UpdateClientDetails = lazy(() => import('../components/superAdmin/updateClientDetails/UpdateClientDetails'));
// const ApiCreateInfo = lazy(() => import('../components/superAdmin/apiCreateInfo/ApiCreateInfo'));
// const NewUpdate = lazy(() => import('../components/superAdmin/newUpdate/NewUpdate'));

// const Dashboards = lazy(() => import('../components/superAdmin/dashboard/Dashboard'));
// const Sidebar = lazy(() => import('../components/layouts/Sidebar'));
// const Header = lazy(() => import('../components/layouts/Header'));
// const AdminDetails = lazy(() => import('../components/superAdmin/adminDetails/Admindetails'));
// const CreateAdmin = lazy(() => import('../components/superAdmin/accountCreate/CreateAccount'));
// const AmountDetails = lazy(() => import('../components/superAdmin/amountdetails/AmmountDetails'));
// const AdminActivity = lazy(() => import('../components/superAdmin/adminActivity/adminActivity'));
// const ClientThreadReport = lazy(() => import('../components/superAdmin/clientThreadReport/clientThreadReport'));
// const ClientThreadResponse = lazy(() => import('../components/superAdmin/clientThreadResponse/ClientThreadResponse'));
// const UpdateClientDetails = lazy(() => import('../components/superAdmin/updateClientDetails/UpdateClientDetails'));
// const ApiCreateInfo = lazy(() => import('../components/superAdmin/apiCreateInfo/ApiCreateInfo'));
// const NewUpdate = lazy(() => import('../components/superAdmin/newUpdate/NewUpdate'));


import { SidebarProvider } from "../components/layouts/SidebarContext";
import AdminOffer from '../components/superAdmin/adminOfferPage/AdminOffer';
import AddBrokerSteps from '../components/superAdmin/apiCreateInfo/AddBrokerSteps';
import ResponseQnA from '../components/superAdmin/ResponseQnA/ResponseQnA';

const SuperAdminRoute = () => {
  return (
    <>
      <div className="wrapper">
      <SidebarProvider> 
      <Sidebar position="left" />
        <div id="content-page" className="content-page">
          <Header />

          <Routes>
            <Route path="/dashboard" element={<Dashboards />} />
            <Route path="/admin-details" element={<AdminDetails />} />
            <Route path="/create-admin" element={<CreateAdmin />} />

            <Route path="/amount-details" element={<AmountDetails />} />
            <Route path="/admin-activity" element={<AdminActivity />} />
            <Route
              path="/client-thread-report"
              element={<ClientThreadReport />}
            />
            <Route
              path="/client-trade-response"
              element={<ClientThreadResponse />}
            />
            <Route
              path="/update-client-details"
              element={<UpdateClientDetails />}
            />
            <Route path="/api-create-info" element={<ApiCreateInfo />} />
            <Route path="/addBrokerSteps" element={<AddBrokerSteps />} />
            <Route path="/new-update" element={<NewUpdate />} />
            <Route path="/admin-offer" element={<AdminOffer />} />
            <Route path="/ResponseQnA" element={<ResponseQnA />} />
          </Routes>
        </div>
        <SidebarRight position="right"/>
        </SidebarProvider>
      </div>
    </>
  );
};

export default SuperAdminRoute;
