import React, { useEffect, useState, useMemo } from "react";
import Coptyscript from "./Copyscript";
import GroupScript from "./Groupscript";
import CurrentScript from "./CurrentScript";
import {
  GetAllUserGroup,
  GetSingleChart,
  GetUserScripts,
  OpenPosition,
  Option_Detail,
  ScalpingPositionDetails,
  getStrategyType,
} from "../../CommonAPI/User";
import { GetAllGroupService, GetGroupNames } from "../../CommonAPI/Admin";
import FullDataTable from "../../../ExtraComponent/CommanDataTable";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import Content from "../../../ExtraComponent/Content";
import { FiPlusCircle } from "react-icons/fi";

import { useLocation, useNavigate } from "react-router-dom";
import PillTabs from "../../../ExtraComponent/PillTabs";
import SuggestedBotCard from "./suggestedBotCard/SuggestedBotCard";
import { Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

const Userdashboard = () => {
  const userName = localStorage.getItem("name");
  const StrategyType = sessionStorage.getItem("StrategyType");
  const redirectStrategyType = sessionStorage.getItem("redirectStrategyType");

  const addVia = sessionStorage.getItem("addVia");
  const groupName = sessionStorage.getItem("groupName");
  const [activeTab1, setActiveTab1] = useState("CurrentPosition");
  const [activeTab, setActiveTab] = useState(addVia || "currentScript");
  const [subTab, setSubTab] = useState(
    redirectStrategyType || "ChartingPlatform"
  ); // default charting
  const [refresh, setRefresh] = useState(false);
  const [getGroup, setGroup] = useState("");
  const [strategyType, setStrategyType] = useState([]);
  const [tableType, setTableType] = useState(StrategyType || "MultiCondition");
  const [data2, setData2] = useState({ status: true, msg: "Initial state" });
  const [groupNames, setGroupNames] = useState([]);
  const [suggestedBotdata, setSuggestedBotdata] = useState([]);
  const [optionStrategyData, setOptionStrategyData] = useState({
    parameters: {},
    Description: [],
  });
  const [patternStrategyData, setPatternStrategyData] = useState({
    parameters: {},
    Description: [],
  });

  const [ToDate, setToDate] = useState(() => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [FromDate, setFromDate] = useState(new Date());

  const [pillActiveTab, setPillActiveTab] = useState("Scalping");

  const tabOptions = ["Scalping", "Option Strategy", "Pattern"];
  const [strategyData, setStrategyData] = useState({
    parameters: {},
    Description: "",
  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [allScripts, setAllScripts] = useState({ data: [], len: 0 });
  const [filteredSuggestedBotdata, setFilteredSuggestedBotdata] = useState([]);
  const navigate = useNavigate();
  const [getAddScript, setAddScript] = useState("");
 const strategies = [];

  useEffect(() => {
    setSubTab(redirectStrategyType);
  }, [redirectStrategyType]);

  const currentDate = new Date();
  const formattedDate = `${String(currentDate.getDate()).padStart(
    2,
    "0"
  )}.${String(currentDate.getMonth() + 1).padStart(
    2,
    "0"
  )}.${currentDate.getFullYear()}`;

  const tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);

  const Defult_To_Date = `${String(tomorrow.getDate()).padStart(
    2,
    "0"
  )}.${String(tomorrow.getMonth() + 1).padStart(
    2,
    "0"
  )}.${tomorrow.getFullYear()}`;

  const formatDate = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}.${month}.${day}`;
  };

  const [getGroupName, setGroupName] = useState({ loading: true, data: [] });
  const [getPositionData, setPositionData] = useState({
    loading: true,
    Scalping: [],
    Option: [],
    Pattern: [],
    NewScalping: [],
    ChartingData: [],
  });

  useEffect(() => {
    fetchStrategyType();
    GetOpenPosition();
    // getAllGroupNames();
    GetUserAllScripts();
  }, []);

  useEffect(() => {
    getUserAllGroup();
  }, [activeTab]);

  useEffect(() => {
    setGroup("");
    sessionStorage.setItem("StrategyType", subTab);
    sessionStorage.removeItem("groupName");
  }, [subTab]);

  useEffect(() => {
    setSubTab(redirectStrategyType || "ChartingPlatform");
  }, [redirectStrategyType]);

  useEffect(() => {
    getSuggestedBotData();
  }, [activeTab1]);

  useEffect(() => {
    // Filter suggestedBotdata whenever suggestedBotdata or pillActiveTab changes
    if (activeTab1 === "SuggestedBots") {
      setFilteredSuggestedBotdata(
        suggestedBotdata.filter((item) => item.StrategyType === pillActiveTab)
      );
    }
  }, [suggestedBotdata, pillActiveTab, activeTab1]);

  const fetchStrategyType = async () => {
    try {
      const res = await getStrategyType();
      if (res.Data) {
        console.log("res.Data", res.Data);
        setStrategyType(res.Data);
      }
    } catch (error) {
      console.log("Error in finding the strategy type", error);
    }
  };

  const getUserAllGroup = async () => {
    const data = { User: userName };
    await GetAllUserGroup(data)
      .then((response) => {
        if (response.Status) {
          setRefresh(!refresh);
          setGroupName({
            loading: false,
            data: response?.Data?.map((item) => item?.value || item),
          });
          setData2({ status: true, msg: "Groups fetched successfully" });
        } else {
          setGroupName({
            loading: false,
            data: [],
          });
          setData2({
            status: false,
            msg: response.Message || "No groups found",
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the group name", err);
        setData2({ status: false, msg: "Error fetching groups" });
      });
  };

  const GetOpenPosition = async () => {
    const data = { userName: userName };
    await OpenPosition(data)
      .then((response) => {
        if (response.Status) {
          setPositionData({
            loading: false,
            Scalping: response.Scalping || [],
            Option: response.Option || [],
            Pattern: response.Pattern || [],
            NewScalping: response?.NewScalping || [],
            ChartingData: response?.ChartingData || [],
          });
        } else {
          setPositionData({
            loading: false,
            Scalping: [],
            Option: [],
            Pattern: [],
            ChartingData: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the open postion data", err);
      });
  };

  const columns1 = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          return rowIndex + 1;
        },
      },
    },
    {
      name: "ScalpType",
      label: "ScalpType",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Symbol",
      label: "Symbol",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "ETime",
      label: "Entry Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "EPrice",
      label: "Entry Price",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "TradeType",
      label: "Trade Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Quantity",
      label: "Quantity",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Trade",
      label: "Trade",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Target",
      label: "Target",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "SL",
      label: "Stop Loss",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "GroupN",
      label: "Unique Name",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const columns2 = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          return rowIndex + 1;
        },
      },
    },
    {
      name: "STG",
      label: "Strategy",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Symbol",
      label: "Symbol",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "ETime",
      label: "Entry Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "EPrice",
      label: "Entry Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "LotSize",
      label: "Lot",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Trade",
      label: "Trade",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Option Type",
      label: "Option Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Strike price",
      label: "Strike price",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Hashing",
      label: "Hashing",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "TradeType",
      label: "Transaction Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Target",
      label: "Target",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "SL",
      label: "Stop Loss",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const columns3 = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          return rowIndex + 1;
        },
      },
    },
    {
      name: "TradePattern",
      label: "Pattern Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "SPattern",
      label: "Pattern Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "PatternTime",
      label: "Pattern Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Symbol",
      label: "Symbol",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "ETime",
      label: "Entry Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "EPrice",
      label: "Entry Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "TradeType",
      label: "Transaction Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Quantity",
      label: "Lot",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Target",
      label: "Target",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "SL",
      label: "Stop Loss",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "TimeFrame",
      label: "Time Frame",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Trade",
      label: "Trade",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const columns4 = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          return rowIndex + 1;
        },
      },
    },
    {
      name: "ScalpType",
      label: "Target Type",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Symbol",
      label: "Symbol",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "ETime",
      label: "Entry Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "EPrice",
      label: "Entry Price",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "TradeType",
      label: "Transaction Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Quantity",
      label: "Quantity",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Trade",
      label: "Trade",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Target",
      label: "Target",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "SL",
      label: "Re-entry",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "GroupN",
      label: "Unique Name",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const columns5 = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          return rowIndex + 1;
        },
      },
    },
    {
      name: "Symbol",
      label: "Symbol",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Token",
      label: "Token",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "ETime",
      label: "Entry Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "EPrice",
      label: "Entry Price",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "TradeType",
      label: "Trade Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Quantity",
      label: "Quantity",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Trade",
      label: "Trade",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Target",
      label: "Target",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "SL",
      label: "Stop Loss",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Username",
      label: "Username",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Stretegy",
      label: "Stretegy",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "AccType",
      label: "Account Type",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Segmenttype",
      label: "Segment Type",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

 
  const getSuggestedBotData = async () => {
    try {
      if (activeTab1 === "SuggestedBots") {
        const res = await GetGroupNames();
        if (res.Status) {
          setSuggestedBotdata(res.Data);
        } else {
          console.error("Error fetching group names:", res.Message);
        }
        return strategies.filter(
          (strategy) => strategy.strategyType === pillActiveTab
        );
      }
    } catch (error) {
      console.error("Error fetching suggested bot data:", error);
    }
  };

  const handleViewDetails = async (title) => {
    try {
      const req = {
        Group: title,
        Strategy: pillActiveTab,
      };

      if (pillActiveTab === "Scalping") {
        const res = await GetAllGroupService(req);
        if (res.Status) {
          setStrategyData((prev) => ({
            ...prev,
            parameters: res.Data?.[0],
          }));
        }
        const req2 = {
          PositionType: res.Data?.[0]?.FixedSM,
        };
        const res2 = await ScalpingPositionDetails(req2);
        if (res2.status) {
          setStrategyData((prev) => ({
            ...prev,
            Description:
              res2.data?.[0]?.Description || "No description available",
          }));
        }
      } else if (pillActiveTab === "Option Strategy") {
        const res = await GetAllGroupService(req);

        if (res.Status) {
          setOptionStrategyData((prev) => ({
            ...prev,
            parameters: res.Data?.[0],
          }));

          const req2 = {
            StrategyName: res.Data?.[0]?.STG,
          };
          const res2 = await Option_Detail(req2);
          if (res2.status) {
            setOptionStrategyData((prev) => ({
              ...prev,
              Description: res2?.data[0],
            }));
          }
        }
      } else if (pillActiveTab === "Pattern") {
        const res = await GetAllGroupService(req);
        if (res.Status) {
          setPatternStrategyData((prev) => ({
            ...prev,
            parameters: res.Data?.[0],
          }));

          const req2 = {
            Pattern: res.Data?.[0]?.Pattern,
            PatternType: "CandleStick Pattern",
            TType: "",
          };
          const res2 = await GetSingleChart(req2);
          if (res2.status) {
            setPatternStrategyData((prev) => ({
              ...prev,
              Description: res2?.data[0],
            }));
          }
        }
      }

      setShowDetailsModal(true);
    } catch (error) {
      console.error("Error in handleViewDetails:", error);
    }
  };

  const GetUserAllScripts = async () => {
    const data = { Username: userName };
    await GetUserScripts(data)
      .then((response) => {
        if (response.Status) {
          setAllScripts({
            data: response?.data,
            len: response?.data?.length - 1,
          });
        } else {
          setAllScripts({
            data: [],
            len: 0,
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the User Scripts", err);
      });
  };

  const handleAddScript1 = (data1, type) => {
    if (allScripts?.data?.[allScripts?.len]?.CombineScalping?.length == 0) {
      Swal.fire({
        title: "Warning",
        text: "You don't have any valid plan to use this strategy",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true,
      });
    } else {
      const isExist =
        allScripts?.data?.[allScripts?.len]?.CombineScalping?.find(
          (item) => item === data1?.ScalpType
        ) ?? "";
      if (!isExist) {
        Swal.fire({
          title: "Warning",
          text: "This script is not available for you",
          icon: "warning",
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }
      const data = {
        selectGroup: strategyData.parameters?.Group,
        selectStrategyType: "Scalping",
        type: "group",
        ...data1,
      };
      navigate("/user/addscript/scalping", {
        state: { data: data, scriptType: allScripts },
      });
    }
  };

  const handleAddScript2 = (data1) => {
    if (allScripts.data.length == 0) {
      Swal.fire({
        title: "Warning",
        text: "You don't have any valid plan to use this strategy",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true,
      });
    } else {
      let OptionStgArr = allScripts?.data[allScripts?.len]?.CombineOption;

      if (
        (OptionStgArr?.includes("Straddle_Strangle") &&
          [
            "ShortStrangle",
            "LongStrangle",
            "LongStraddle",
            "ShortStraddle",
          ]?.includes(data1?.STG)) ||
        (OptionStgArr?.includes("Butterfly_Condor") &&
          [
            "LongIronButterfly",
            "ShortIronButterfly",
            "LongIronCondor",
            "ShortIronCondor",
          ]?.includes(data1?.STG)) ||
        (OptionStgArr?.includes("Spread") &&
          [
            "BearCallSpread",
            "BearPutSpread",
            "BullCallSpread",
            "BullPutSpread",
          ]?.includes(data1?.STG)) ||
        (OptionStgArr?.includes("Ladder_Coverd") &&
          [
            "BullCallLadder",
            "BullPutLadder",
            "CoveredCall",
            "CoveredPut",
          ]?.includes(data1?.STG)) ||
        (OptionStgArr?.includes("Collar_Ratio") &&
          [
            "LongCollar",
            "ShortCollar",
            "RatioCallSpread",
            "RatioPutSpread",
          ]?.includes(data1?.STG)) ||
        (OptionStgArr?.includes("Shifting_FourLeg") &&
          [
            "LongFourLegStretegy",
            "ShortShifting",
            "LongShifting",
            "ShortFourLegStretegy",
          ]?.includes(data1?.STG))
      ) {
        const data = {
          selectGroup: optionStrategyData.parameters?.Group,
          selectStrategyType: "Option Strategy",
          type: "copy",
          ...data1,
        };
        navigate("/user/addscript/option", {
          state: { data: data, scriptType: allScripts },
        });
      } else {
        Swal.fire({
          title: "Warning",
          text: "This script is not available for you",
          icon: "warning",
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }
    }
  };

  const handleAddScript3 = (data1) => {
    if (allScripts.data.length == 0) {
      Swal.fire({
        title: "Warning",
        text: "You don't have any valid plan to use this strategy",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true,
      });
    } else {
      const isExist =
        allScripts?.data[allScripts?.len]?.CombinePattern?.find(
          (item) => item === data1?.TradePattern
        ) ?? "";
      if (!isExist) {
        Swal.fire({
          title: "Warning",
          text: "This script is not available for you",
          icon: "warning",
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }
      const data = {
        selectGroup: patternStrategyData.parameters?.Group,
        selectStrategyType: "Pattern",
        type: "group",
        ...data1,
      };
      navigate("/user/addscript/pattern", {
        state: { data: data, scriptType: allScripts },
      });
    }
  };

  const handleAddToScript = async () => {
    try {
      if (pillActiveTab === "Scalping") {
        handleAddScript1(strategyData.parameters, 2);
      } else if (pillActiveTab === "Option Strategy") {
        handleAddScript2(optionStrategyData.parameters);
      } else if (pillActiveTab === "Pattern") {
        handleAddScript3(patternStrategyData.parameters);
      }
    } catch (error) {
      console.error("Error in handleAddToScript:", error);
    }
  };


  return (
    <Content
      Page_title="📊 User Dashboard"
      button_status={false}
      backbutton_status={false}
    >
      <div className="iq-card-body">
        <ul
          className="nav nav-tabs justify-content-center border-bottom rounded-0"
          id="myTab-2"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link d-flex align-items-center gap-8 me-5 ${
                activeTab1 === "CurrentPosition" ? "active" : ""
              }`}
              id="home-tab-justify"
              data-bs-toggle="tab"
              href="#home-justify"
              role="tab"
              aria-controls="home"
              aria-selected={activeTab1 === "CurrentPosition"}
              onClick={() => setActiveTab1("CurrentPosition")}
            >
              🏦 <span>Current Script</span>
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link d-flex align-items-center gap-8 ms-8 me-5 ${
                activeTab1 === "OpenPosition" ? "active" : ""
              }`}
              id="profile-tab-justify"
              data-bs-toggle="tab"
              href="#profile-justify"
              role="tab"
              aria-controls="profile"
              aria-selected={activeTab1 === "OpenPosition"}
              onClick={() => setActiveTab1("OpenPosition")}
            >
              📈 <span>Open Position</span>
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link d-flex align-items-center gap-8 ms-8 ${
                activeTab1 === "SuggestedBots" ? "active" : ""
              }`}
              id="profile-tab-justify"
              data-bs-toggle="tab"
              href="#profile-justify"
              role="tab"
              aria-controls="profile"
              aria-selected={activeTab1 === "SuggestedBots"}
              onClick={() => setActiveTab1("SuggestedBots")}
            >
              🤖 <span>Suggested Bots</span>
            </a>
          </li>
        </ul>

        <div className="row mt-3">
          {activeTab1 === "CurrentPosition" && (
            <>
              <div className="d-flex justify-content-center align-items-center flex-column gap-4 mt-4">
                <div
                  className="d-flex justify-content-center align-items-center w-100"
                  style={{ maxWidth: "1200px" }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <ul className="nav nav-pills shadow rounded-pill p-1 d-flex flex-wrap mb-0">
                      {strategyType.map((type, index) => (
                        <li className="nav-item" key={index}>
                          <button
                            className={`nav-link rounded-pill ${
                              subTab === type.trim()
                                ? "active rounded-pill"
                                : "nav-link rounded-pill"
                            }`}
                            style={{
                              padding: "10px 20px",
                              margin: "5px",
                              border: "none",
                              outline: "none",
                            }}
                            onClick={() => {
                              setSubTab(type.trim());
                              setGroup("");
                              sessionStorage.setItem(
                                "StrategyType",
                                type.trim()
                              );
                              sessionStorage.removeItem("groupName");
                            }}
                          >
                            <FiPlusCircle className="me-1" /> {type} Bot
                          </button>
                        </li>
                      ))}
                    </ul>

                    <button
                      className="addbtn"
                      style={{ marginLeft: "4rem" }} // ms-5 = margin-left: 3rem (Bootstrap spacing scale)
                      onClick={() => setAddScript(subTab)}
                    >
                      {subTab === "ChartingPlatform" ? "Signals" : "Add Script"}
                    </button>
                  </div>
                </div>
                <div
                  className="d-flex justify-content-center align-items-center w-100"
                  style={{ maxWidth: "1200px", marginBottom: "-35px" }}
                >
                  <div className="">
                    <div className="d-flex flex-wrap gap-3 ">
                      <ul className="nav nav-pills shadow rounded-pill p-1"></ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {activeTab1 === "CurrentPosition" && (
          <>
            {activeTab === "group" ? (
              <div
                className="tab-pane fade show active"
                id="home-justify"
                role="tabpanel"
              >
                <div className="mt-3">
                  {subTab ? (
                    getGroup === "copyScript" ? (
                      <Coptyscript
                        data={subTab}
                        selectedType={activeTab}
                        data2={data2}
                        FromDate={formatDate(FromDate)}
                        ToDate={formatDate(ToDate)}
                      />
                    ) : (
                      <GroupScript
                        data={subTab}
                        selectedType={activeTab}
                        GroupName={getGroup}
                        data2={data2}
                      />
                    )
                  ) : null}
                </div>
              </div>
            ) : (
              activeTab === "currentScript" && (
                <div
                  className="tab-pane fade show active"
                  id="home-justify"
                  role="tabpanel"
                >
                  {subTab && (
                    <CurrentScript
                      tableType={tableType}
                      data={subTab}
                      selectedType={activeTab}
                      FromDate={formatDate(FromDate)}
                      ToDate={formatDate(ToDate)}
                      alignDates="right"
                      getAddScript={getAddScript}
                    />
                  )}

                  {getGroup && (
                    <>
                      {/* <ViewGroup group={getGroup}  isCopyScriptVisible={true}/> */}
                      <GroupScript
                        data={subTab}
                        selectedType={activeTab}
                        GroupName={getGroup}
                        data2={data2}
                        getGroup={getGroup}
                      />
                    </>
                  )}
                </div>
              )
            )}
          </>
        )}

        {activeTab1 === "OpenPosition" && (
          <>
            {getPositionData.NewScalping?.length > 0 && (
              <>
                <h4>Scalping</h4>
                <FullDataTable
                  columns={columns4}
                  data={getPositionData.NewScalping}
                  checkBox={false}
                  alignDates="right"
                />
              </>
            )}

            {getPositionData.Option?.length > 0 && (
              <div className="mt-4">
                <h4>Option</h4>
                <FullDataTable
                  columns={columns2}
                  data={getPositionData.Option}
                  checkBox={false}
                  alignDates="right"
                />
              </div>
            )}

            {getPositionData.Pattern?.length > 0 && (
              <div className="mt-4">
                <h4>Pattern</h4>
                <FullDataTable
                  columns={columns3}
                  data={getPositionData.Pattern}
                  checkBox={false}
                  alignDates="right"
                />
              </div>
            )}

            {getPositionData.ChartingData?.length > 0 && (
              <div className="mt-4">
                <h4>Charting Platform</h4>
                <FullDataTable
                  columns={columns5}
                  data={getPositionData.ChartingData}
                  checkBox={false}
                  alignDates="right"
                />
              </div>
            )}
          </>
        )}

        {activeTab1 === "SuggestedBots" && (
          <>
            <PillTabs
              tabs={tabOptions}
              activeTab={pillActiveTab}
              setActiveTab={setPillActiveTab}
            />
            {filteredSuggestedBotdata.length === 0 ? (
              <NoDataFound />
            ) : (
              <Container className="py-4 mt-4">
                <Row className="g-4">
                  {filteredSuggestedBotdata.map((strategy, index) => (
                    <Col xs={12} sm={6} md={4} key={index}>
                      <SuggestedBotCard
                        title={strategy.GroupName}
                        strategyType={strategy.StrategyType}
                        description={strategy.Message}
                        onViewDetails={() =>
                          handleViewDetails(strategy.GroupName)
                        }
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
            )}
          </>
        )}

        {activeTab1 === "OpenPosition" &&
          getPositionData.Scalping?.length === 0 &&
          getPositionData.NewScalping?.length === 0 &&
          getPositionData.Option?.length === 0 &&
          getPositionData.Pattern?.length === 0 &&
          getPositionData.ChartingData?.length === 0 && <NoDataFound />}

        {/* Modal for Strategy Details */}
        {showDetailsModal && (
          <div
            className="custom-modal-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(30, 41, 59, 0.7)",
              zIndex: 1050,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className={"custom-modal-content card-bg-color card-text-Color"}
              style={{
                background: "#fff",
                borderRadius: "18px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                maxWidth: 600,
                width: "95%",
                padding: 0,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                maxHeight: "75vh",
              }}
            >
              <div
                style={{
                  padding: "2.5rem 2rem 0.5rem 2rem",
                  position: "relative",
                  flex: "0 0 auto",
                }}
              >
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  style={{
                    position: "absolute",
                    top: 18,
                    right: 18,
                    zIndex: 2,
                  }}
                  onClick={() => {
                    setShowDetailsModal(false);
                    setStrategyData({ parameters: {}, Description: "" });
                    setOptionStrategyData({ parameters: {}, Description: [] });
                  }}
                ></button>

                <h3
                  className="fw-bold mb-3"
                  style={{ color: "#1e293b", letterSpacing: "0.5px" }}
                >
                  Strategy Details
                </h3>
                <hr
                  style={{ margin: "0 0 1.5rem 0", borderColor: "#e2e8f0" }}
                />
              </div>
              <div
                style={{
                  maxHeight: "45vh",
                  overflowY: "auto",
                  padding: "0 2rem 0 2rem",
                  flex: "1 1 auto",
                }}
              >
                {pillActiveTab === "Option Strategy" &&
                optionStrategyData.Description &&
                Object.keys(optionStrategyData.Description).length > 0 ? (
                  <div>
                    {/* Option Strategy Image */}
                    {optionStrategyData.Description.image_data && (
                      <div className="text-center mb-3">
                        <img
                          src={`data:image/png;base64,${optionStrategyData.Description.image_data}`}
                          alt="Strategy"
                          style={{
                            maxWidth: "100%",
                            maxHeight: 260,
                            borderRadius: 10,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                          }}
                        />
                      </div>
                    )}
                    {/* Pattern Details if present */}
                    {optionStrategyData.Description.Pattern && (
                      <div className="">
                        <h5 className="fw-bold" style={{ color: "#0ea5e9" }}>
                          Pattern Details
                        </h5>
                        <div className="mb-2">
                          <b>Pattern Type:</b>{" "}
                          {optionStrategyData.Description.PatternType}
                        </div>
                        <div className="mb-2">
                          <b>Pattern:</b>{" "}
                          {optionStrategyData.Description.Pattern}
                        </div>
                        <div className="mb-2">
                          <b>Description:</b>{" "}
                          {optionStrategyData.Description.Description}
                        </div>
                        <div className="mb-2">
                          <b>Trade Type:</b>{" "}
                          {optionStrategyData.Description.TType}
                        </div>
                      </div>
                    )}
                    <h4 className="fw-bold mb-2" style={{ color: "#0ea5e9" }}>
                      {optionStrategyData.Description["Strategy Name"]}
                    </h4>
                    <div className="mb-2">
                      <b>Market Outlook:</b>{" "}
                      {optionStrategyData.Description["View (Market Outlook)"]}
                    </div>
                    <div className="mb-2">
                      <b>Strategy:</b>{" "}
                      {optionStrategyData.Description["Strategy"]}
                    </div>
                    <div className="mb-2">
                      <b>Risk (Max Loss):</b>{" "}
                      {optionStrategyData.Description["Risk (Max Loss)"]}
                    </div>
                    <div className="mb-2">
                      <b>Reward (Max Profit):</b>{" "}
                      {optionStrategyData.Description["Reward (Max Profit)"]}
                    </div>
                    <div className="mb-2">
                      <b>Breakeven Points:</b> <br />
                      <span className="ms-3">
                        Upper BE:{" "}
                        {
                          optionStrategyData.Description["Breakeven Points"]?.[
                            "Upper BE"
                          ]
                        }
                      </span>
                      <br />
                      <span className="ms-3">
                        Lower BE:{" "}
                        {
                          optionStrategyData.Description["Breakeven Points"]?.[
                            "Lower BE"
                          ]
                        }
                      </span>
                    </div>
                    <div className="mb-2">
                      <b>Max Profit When?</b>
                      <br />
                      <span className="ms-3">
                        Upward:{" "}
                        {
                          optionStrategyData.Description["Max Profit When?"]
                            ?.Upward
                        }
                      </span>
                      <br />
                      <span className="ms-3">
                        Downward:{" "}
                        {
                          optionStrategyData.Description["Max Profit When?"]
                            ?.Downward
                        }
                      </span>
                    </div>
                    <div className="mb-2">
                      <b>Max Loss When?</b>{" "}
                      {optionStrategyData.Description["Max Loss When?"]}
                    </div>
                    {/* Parameters Section */}
                    <div className="mt-4">
                      <h5 className="fw-bold" style={{ color: "#0ea5e9" }}>
                        Parameters
                      </h5>
                      <div className="container-fluid">
                        <div className="row g-3">
                          {[
                            {
                              label: "Option type",
                              value: optionStrategyData.parameters?.STG,
                            },
                            {
                              label: "Risk Handle",
                              value: optionStrategyData.parameters?.Targettype,
                            },
                            {
                              label: "Symbol",
                              value: optionStrategyData.parameters?.Symbol,
                            },
                            {
                              label: "Expiry Type",
                              value: optionStrategyData.parameters?.Expirytype,
                            },
                            {
                              label: "Measurement Type",
                              value:
                                optionStrategyData.parameters?.strategytype,
                            },
                            {
                              label: "Target",
                              value:
                                optionStrategyData.parameters?.["Target value"],
                            },
                            {
                              label: "Stoploss",
                              value:
                                optionStrategyData.parameters?.["SL value"],
                            },
                            {
                              label: "Trade execution",
                              value:
                                optionStrategyData.parameters?.TradeExecution,
                            },
                            {
                              label: "Lot",
                              value:
                                optionStrategyData.parameters?.["Lot Size"],
                            },
                            {
                              label: "Exit Day",
                              value:
                                optionStrategyData.parameters?.["Product Type"],
                            },
                            {
                              label: "Entry Time",
                              value:
                                optionStrategyData.parameters?.["Entry Time"],
                            },
                            {
                              label: "Exit Time",
                              value:
                                optionStrategyData.parameters?.["Exit Time"],
                            },
                            {
                              label: "Strike Type",
                              value: optionStrategyData.parameters?.StrikeType,
                            },
                          ].map((item, idx) => (
                            <div className="col-md-6" key={idx}>
                              <div className=" ">
                                <label
                                  className="form-label fw-semibold"
                                  style={{ color: "#334155" }}
                                >
                                  {item.label}
                                </label>
                                <input
                                  type="text"
                                  className="form-control bg-light border-0 text-dark fw-semibold"
                                  value={item.value || "N/A"}
                                  disabled
                                  style={{ borderRadius: "8px" }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : pillActiveTab === "Pattern" &&
                  patternStrategyData.Description &&
                  Object.keys(patternStrategyData.Description).length > 0 ? (
                  <div>
                    {/* Pattern Image */}
                    {patternStrategyData.Description.image_data && (
                      <div className="text-center mb-3">
                        <img
                          src={`data:image/png;base64,${patternStrategyData.Description.image_data}`}
                          alt="Pattern"
                          style={{
                            maxWidth: "100%",
                            maxHeight: 260,
                            borderRadius: 10,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                          }}
                        />
                      </div>
                    )}
                    <h4 className="fw-bold mb-2" style={{ color: "#0ea5e9" }}>
                      {patternStrategyData.Description.Pattern}
                    </h4>
                    <div className="mb-2">
                      <b>Pattern Type:</b>{" "}
                      {patternStrategyData.Description.PatternType}
                    </div>
                    <div className="mb-2">
                      <b>Description:</b>{" "}
                      {patternStrategyData.Description.Description}
                    </div>
                    <div className="mb-2">
                      <b>Trade Type:</b> {patternStrategyData.Description.TType}
                    </div>
                    {/* Pattern Parameters Section */}
                    <div className="mt-4">
                      <h5 className="fw-bold" style={{ color: "#0ea5e9" }}>
                        Parameters
                      </h5>
                      <div className="container-fluid">
                        <div className="row g-3">
                          {[
                            {
                              label: "Pattern Name",
                              value:
                                patternStrategyData.parameters?.TradePattern,
                            },
                            {
                              label: "Pattern Type",
                              value: patternStrategyData.parameters?.Pattern,
                            },
                            {
                              label: "Symbol",
                              value: patternStrategyData.parameters?.Symbol,
                            },
                            {
                              label: "Trade type",
                              value: patternStrategyData.parameters?.TType,
                            },
                            {
                              label: "Quantity",
                              value: patternStrategyData.parameters?.Quantity,
                            },
                            {
                              label: "Time Frame",
                              value: patternStrategyData.parameters?.TimeFrame,
                            },
                            {
                              label: "Measurement type",
                              value: patternStrategyData.parameters?.TStype,
                            },
                            {
                              label: "Target",
                              value:
                                patternStrategyData.parameters?.[
                                  "Target value"
                                ],
                            },
                            {
                              label: "Stoploss",
                              value:
                                patternStrategyData.parameters?.["SL value"],
                            },
                            {
                              label: "Trade Execution",
                              value:
                                patternStrategyData.parameters?.TradeExecution,
                            },
                            {
                              label: "Exit Day",
                              value: patternStrategyData.parameters?.ExitDay,
                            },
                            {
                              label: "Entry Time",
                              value: patternStrategyData.parameters?.EntryTime,
                            },
                            {
                              label: "Exit Time",
                              value: patternStrategyData.parameters?.ExitTime,
                            },
                            // { label: "Strike Type", value: patternStrategyData.parameters?.["Strike Price"] },
                          ].map((item, idx) => (
                            <div className="col-md-6" key={idx}>
                              <div className=" ">
                                <label
                                  className="form-label fw-semibold"
                                  style={{ color: "#334155" }}
                                >
                                  {item.label}
                                </label>
                                <input
                                  type="text"
                                  className="form-control bg-light border-0 text-dark fw-semibold"
                                  value={item.value || "N/A"}
                                  disabled
                                  style={{ borderRadius: "8px" }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : pillActiveTab === "Scalping" && strategyData.Description ? (
                  <div>
                    <h4 className="fw-bold mb-2" style={{ color: "#0ea5e9" }}>
                      Description
                    </h4>
                    <div
                      className="mb-3 card-text-Color"
                      style={{
                        whiteSpace: "pre-line",
                        color: "#334155",
                        fontSize: "1rem",
                      }}
                    >
                      {strategyData.Description}
                    </div>
                    {/* Parameters Section for Scalping */}
                    <div className="mt-4">
                      <h5 className="fw-bold" style={{ color: "#0ea5e9" }}>
                        Parameters
                      </h5>
                      <div className="container-fluid">
                        <div className="row g-3">
                          {[
                            {
                              label: "Symbol",
                              value: strategyData.parameters?.Symbol,
                            },
                            // { label: "Trading Type", value: strategyData.parameters?.Trading },
                            {
                              label: "Trade Type",
                              value: strategyData.parameters?.TType,
                            },
                            {
                              label: "Measurement Type",
                              value: strategyData.parameters?.TStype,
                            },
                            {
                              label: "Target",
                              value: strategyData.parameters?.["Booking Point"],
                            },
                            {
                              label: "Re-entry",
                              value:
                                strategyData.parameters?.["Re-entry Point"],
                            },
                            {
                              label: "Lot",
                              value: strategyData.parameters?.Quantity,
                            },
                            {
                              label: "Exit Day",
                              value: strategyData.parameters?.ExitDay,
                            },
                            {
                              label: "Entry Time",
                              value: strategyData.parameters?.EntryTime,
                            },
                            {
                              label: "Exit Time",
                              value: strategyData.parameters?.ExitTime,
                            },
                            {
                              label: "Trade Execution",
                              value: strategyData.parameters?.TradeExecution,
                            },
                            {
                              label: "Target Selection",
                              value: strategyData.parameters?.Targetselection,
                            },
                          ].map((item, idx) => (
                            <div className="col-md-6" key={idx}>
                              <div className=" ">
                                <label
                                  className="form-label fw-semibold"
                                  style={{ color: "#334155" }}
                                >
                                  {item.label}
                                </label>
                                <input
                                  type="text"
                                  className="form-control bg-light border-0 text-dark fw-semibold"
                                  value={item.value || "N/A"}
                                  disabled
                                  style={{ borderRadius: "8px" }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-info">
                    No description available.
                  </div>
                )}
              </div>
              <div
                className="d-flex justify-content-end mt-4"
                style={{ padding: "0 2rem 2rem 2rem", flex: "0 0 auto" }}
              >
                <button
                  type="button"
                  className="addbtn px-3 py-1 rounded-pill me-2"
                  style={{ fontSize: "0.95rem" }}
                  onClick={() => {
                    // TODO: Add your logic for adding to script here
                    handleAddToScript();
                  }}
                >
                  Add to script
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary px-3 py-1 rounded-pill"
                  style={{ fontSize: "0.95rem" }}
                  onClick={() => {
                    setShowDetailsModal(false);
                    setStrategyData({ parameters: {}, Description: "" });
                    setOptionStrategyData({ parameters: {}, Description: [] });
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Content>
  );
};

export default Userdashboard;
