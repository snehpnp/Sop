
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../ExtraComponent/Loader";
import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";
// import Dashboard from "../components/subAdmin/subadminDashboard/Dashboard";
import Dashboard from "../components/subadmin/subadminDashboard/Dashboard";

// import AddClient from "../components/subAdmin/Client/AddClient";
import AddClient from "../components/subadmin/Client/AddClient";

// import AllClient from "../components/subAdmin/Client/Allclient";
import AllClient from "../components/subadmin/Client/Allclient";

// import SubAdminGroups from "../components/subAdmin/Groups/StrategyGroup";
import SubAdminGroups from "../components/subadmin/Groups/StrategyGroup";

// import TradeHistory from "../components/subAdmin/TradeHistory/Tradehistory";
import TradeHistory from "../components/subadmin/TradeHistory/Tradehistory";

// import Signals from "../components/subAdmin/Signals/TradeReport";
import Signals from "../components/subadmin/Signals/TradeReport";

// import AddscriptScalping from "../components/subAdmin/SubAdminScript/Addscript.Scalping";
import AddscriptScalping from "../components/subadmin/SubAdminScript/Addscript.Scalping";

// import PatternScript from "../components/subAdmin/SubAdminScript/AddScript.Pattern";
import PatternScript from "../components/subadmin/SubAdminScript/AddScript.Pattern";

// import AddScriptOption from "../components/subAdmin/SubAdminScript/AddScript.Option";
import AddScriptOption from "../components/subadmin/SubAdminScript/AddScript.Option";

// import AllScript from "../components/subAdmin/SubAdminScript/AllScript";
import AllScript from "../components/subadmin/SubAdminScript/AllScript";

// import ChangePassword from "../components/subAdmin/Password/ChangePassword";
import ChangePassword from "../components/subadmin/Password/ChangePassword";



import { SidebarProvider } from "../components/layouts/SidebarContext";

const SubAdminRoutes = ({permissionData}) => {

  return (
    <div className="wrapper">
         <SidebarProvider> 
         <Sidebar permissionData={permissionData} />
      <div id="content-page" className="content-page">
        <Header permissionData={permissionData} />

        {/* Suspense wrapper for lazy-loaded components */}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addclient" element={<AddClient />} />
            <Route path="/allclient" element={<AllClient />} />
            <Route path="/groups" element={<SubAdminGroups />} />
            <Route path="/trade-history" element={<TradeHistory />} />
            <Route path="/signals" element={<Signals />} />
            <Route path="/addscript/scalping" element={<AddscriptScalping />} />
            <Route path="/addscript/pattern" element={<PatternScript />} />
            <Route path="/addscript/option" element={<AddScriptOption />} />
            <Route path="/all-script" element={<AllScript />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </Suspense>
      </div>
      </SidebarProvider>
    </div>
  );
};

export default SubAdminRoutes;


