import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../ExtraComponent/Loader";

import Sidebar from "../components/layouts/Sidebar";
import SidebarRight from "../components/layouts/SidebarRight";
import Header from "../components/layouts/Header";
import Dashboard from "../components/user/UserDashboard/Userdashboard";
import Addscript from "../components/user/UserScript/Addscript.scalping";
import Profile from "../components/user/UserProfile/Profile";
import AddScriptOption from "../components/user/UserScript/AddScript.Option";
import LastPattern from "../components/user/Patterns/LastPattern";
import Editprofile from "../components/user/UserProfile/Editprofile";
import Discription from "../components/user/Discription/Discription2 copy";
import Tradehistory from "../components/user/Tradehistory/Tradehistory";
import Traderesponse from "../components/user/TradeResponse/Traderesponse";
import ProfitAndLoss from "../components/user/ProfitAndLoss/ProfitAndLoss";
import Pannel from "../components/user/TrackPanel/TrackPannel";
import TradeReport from "../components/user/TradeReport/TradeReport";
import AddScriptPattern from "../components/user/UserScript/AddScript.Pattern";
import AddNewScalpingScript from "../components/user/UserScript/AddNewScript.Scalping";
import AddNewScalpingOption from "../components/user/UserScript/AddNewScript.Option";
import AddNewScalpingOptionMarketwise from "../components/user/UserScript/NewMarketWise.Option";
import AddNewScalpingPattern from "../components/user/UserScript/AddNewScript.Pattern";
import TechnicalPattern from "../components/user/Patterns/TechnicalPattern";
import Transection from "../components/user/Transection/AllTransection";
import AllPlan from "../components/user/Plan/AllPlan";
import NewStrategy from "../components/user/NewStrategy/NewStrategy";
import AddChartingScript from "../components/user/UserScript/AddChartingScript";
import MyPlans from "../components/user/Plan/MyPlans";
import Group from "../components/user/Group/Group";
import ViewGroup from "../components/user/Group/ViewGroup";
import { SidebarProvider } from "../components/layouts/SidebarContext";
import OptionChain from "../components/user/OptioniChain/OptionChain";
import ApiCreateInfo from "../components/user/ApiCreateInfo/ApiCreateInfo";
import AddChartingScript2 from "../components/user/UserScript/AddChartingScript2";
import StrategyTag from "../components/user/strategyTag/StrategyTag";
import Addgoldenstrategy from "../components/user/UserScript/Addgoldenstrategy";

const UserRoute = ({ permissionData }) => {

  return (
    <>
      <div className="wrapper">
        <SidebarProvider>
          <Sidebar  permissionData={permissionData} />

          <div id="content-page" className="content-page">
            <Header permissionData={permissionData} />
            <Routes>
              
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/plans" element={<MyPlans />} />
              <Route path="/editprofile" element={<Editprofile />} />
              <Route path="/lastpattern" element={<LastPattern />} />
              <Route path="/addscript/scalping" element={<Addscript />} />
              <Route path="/addscript/pattern" element={<AddScriptPattern />} />
              <Route path="/addscript/option" element={<AddScriptOption />} />
              <Route path="/discription" element={<Discription />} />
              <Route path="/api-create-info" element={<ApiCreateInfo />} />

              <Route path="/tradehistory" element={<Tradehistory />} />
              <Route path="/traderesponse" element={<Traderesponse />} />
              <Route path="/profitandloss" element={<ProfitAndLoss />} />
              <Route path="/pannel" element={<Pannel />} />
              <Route path="/tradereport" element={<TradeReport />} />
              <Route path="/Group" element={<Group />} />
              <Route path="/StrategyTag" element={<StrategyTag />} />

              <Route path="/OptionChain" element={<OptionChain />} />
              <Route path="/ViewGroup" element={<ViewGroup />} />
              <Route
                path="/newscript/scalping"
                element={<AddNewScalpingScript />}
              />
              <Route
                path="/newscript/option"
                element={<AddNewScalpingOption />}
              />
              <Route
                path="/newscript/option/marketwise"
                element={<AddNewScalpingOptionMarketwise />}
              />
              <Route
                path="/newscript/pattern"
                element={<AddNewScalpingPattern />}
              />
              <Route path="/technical/pattern" element={<TechnicalPattern />} />
              <Route path="all/transection" element={<Transection />} />
              <Route path="all/plan" element={<AllPlan />} />
              <Route path="/newStrategy" element={<NewStrategy />} />
              <Route
                path="/newscript/charting"
                element={<AddChartingScript />}
              />
              <Route
                path="/newscript/charting2"
                element={<AddChartingScript2 />}
              />
              <Route
                path="/newscript/goldenstrategy"
                element={<Addgoldenstrategy />}
              />
            </Routes>
          </div>

          <SidebarRight position="right" permissionData={permissionData} />
        </SidebarProvider>
      </div>
    </>
  );
};

export default UserRoute;
