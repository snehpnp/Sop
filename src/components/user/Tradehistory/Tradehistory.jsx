import React, { useState, useEffect, useRef } from "react";
import {
  get_User_Data,
  get_Trade_History,
  get_PnL_Data,
  get_EQuityCurveData,
  get_DrapDownData,
  get_FiveMostProfitTrade,
  get_FiveMostLossTrade,
  getStrategyType,
} from "../../CommonAPI/Admin";
import GridExample from "../../../ExtraComponent/CommanDataTable";
import DatePicker from "react-datepicker";
import ApexCharts from "react-apexcharts";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import {
  columns,
  columns1,
  columns2,
  columns3,
  columns5,
  columns6,
  getColumns10,
  goldenstrategy_tradehistory,
  goldenstrategy_tradehistory_data,
  ChartingPlatformColumn
} from "./TradeHistoryColumn";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import { useLocation } from "react-router-dom";
import DrawdownChartComponent from "../../admin/AdvanceChart/DrawdownChartComponent";
import ProfitAndLossGraph from "../../admin/AdvanceChart/ProfitAndLossGraph";
import ChartComponent from "../../admin/AdvanceChart/ChartComponent";
import Content from "../../../ExtraComponent/Content";
import {
  getChargingPlatformDataApiForSegments,
  getStrategyTagApi,
  overallReportApi,
} from "../../CommonAPI/User";

const Tradehistory = () => {
  const StrategyType = sessionStorage.getItem("StrategyType");
  const location = useLocation();
  const sectionRefs = useRef({}); // Refs for each section to scroll to
  const Username = localStorage.getItem("name");
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}.${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;
  const tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);
  const Default_To_Date = `${tomorrow.getFullYear()}.${String(
    tomorrow.getMonth() + 1
  ).padStart(2, "0")}.${String(tomorrow.getDate()).padStart(2, "0")}`;

  // States
  const [selectStrategyType, setStrategyType] = useState(
    StrategyType || "ChartingPlatform"
  );

  const [strategyNames, setStrategyNames] = useState([]);
  const [tradeHistory, setTradeHistory] = useState({ data: [], data1: [] });
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [checkedRows, setCheckedRows] = useState([]);
  const [ToDate, setToDate] = useState("");
  const [FromDate, setFromDate] = useState("");
  const [showReportSections, setShowReportSections] = useState(false);
  const [activeTab, setActiveTab] = useState("Cash");
  const [getChartingData, setChartingData] = useState([]);
  const [loadedSections, setLoadedSections] = useState({
    overview: false,
    pnlAnalysis: false,
    equity: false,
    drawdown: false,
    trades: false,
    profitLoss: false,
    consistent: false,
  });
  const [getAllTradeData, setAllTradeData] = useState({
    data: [],
    Overall: [],
  });
  const [getPnLData, setPnlData] = useState({ data: [] });
  const [getEquityCurveDetails, setEquityCurveDetails] = useState({ data: [] });
  const [getDropDownData, setDropDownData] = useState({ data: [] });
  const [getFiveLossTrade, setFiveLossTrade] = useState({
    data: [],
    data1: [],
  });
  const [getFiveProfitTrade, setFiveProfitTrade] = useState({
    data: [],
    data1: [],
  });
  const [openSection, setOpenSection] = useState(null);
  const [AnalyticsOverview, setAnalyticsOverview] = useState([]);
  const [strategyTagOptions, setStrategyTagOptions] = useState([]);
  const [selectedStrategyTag, setSelectedStrategyTag] = useState("All");
  const [chartingSegments, setChartingSegments] = useState([]);
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    if (location?.state?.goto === "dashboard") {
      if (location?.state?.type === "MultiCondition") {
        setSelectedRowData(tradeHistory.data1?.[location?.state?.RowIndex]);
      } else {
        setSelectedRowData(tradeHistory.data?.[location?.state?.RowIndex]);
      }

      if (
        selectStrategyType === "Scalping" &&
        location?.state?.type === "MultiCondition"
      ) {
        setCheckedRows(location?.state?.RowIndex);
      } else if (
        selectStrategyType === "Option Strategy" &&
        location?.state?.type === "Option Strategy"
      ) {
        setCheckedRows(location?.state?.RowIndex);
      } else if (
        selectStrategyType === "ChartingPlatform" &&
        location?.state?.type === "ChartingPlatform"
      ) {
        setCheckedRows(location?.state?.RowIndex);
      } else if (
        selectStrategyType === "GoldenStrategy" ||
        selectStrategyType === "Golden Strategy" ||
        location?.state?.type === "GoldenStrategy"
      ) {
        setCheckedRows(location?.state?.RowIndex);
      } else {
        setCheckedRows(null);
      }
    }
  }, [
    tradeHistory,
    location?.state?.RowIndex,
    location?.state?.goto,
    location?.state?.type,
  ]);

  useEffect(() => {
    fetchStrategyTags();
  }, []);

  useEffect(() => {
    const fetchStrategyTypes = async () => {
      try {
        const res = await getStrategyType();
        setStrategyNames(res.Data || []);
      } catch (error) {
        console.error("Error fetching strategy types:", error);
        setStrategyNames([]);
      }
    };
    if (selectStrategyType !== "ChartingPlatform") {
      const fetchTradeHistory = async () => {
        try {
          const response = await get_User_Data({
            Data:
              selectStrategyType == "GoldenStrategy" ||
              selectStrategyType === "Golden Strategy"
                ? "Golden Strategy"
                : selectStrategyType,
            Username,
          });
          setTradeHistory(
            response.Status
              ? {
                  data: response?.Data || [],
                  data1: response?.NewScalping || [],
                }
              : { data: [], data1: [] }
          );
        } catch (err) {
          console.error("Error fetching trade history:", err);
        }
      };
      fetchTradeHistory();
    }
    fetchStrategyTypes();
  }, [selectStrategyType, Username]);

  useEffect(() => {
    setCheckedRows([]); // Reset checked rows
    setSelectedRowData(null); // Reset selected row data
  }, [selectStrategyType]);

  useEffect(() => {
    setOpenSection(null); // Close all open dropdowns when switching tabs
  }, [selectStrategyType]);

  useEffect(() => {
    fetchChartingSegments();
  }, []);

  useEffect(() => {
    setStrategyType(
      location?.state?.type === "MultiCondition"
        ? "Scalping"
        : location?.state?.type
        ? location?.state?.type
        : "ChartingPlatform"
    );
  }, [location?.state?.RowIndex, location?.state?.goto, location?.state?.type]);

  useEffect(() => {
    if (selectStrategyType === "ChartingPlatform") {
      getChartingSegmentData();
    } else if (
      selectStrategyType === "Scalping" ||
      selectStrategyType === "Option Strategy" ||
      selectStrategyType === "Pattern" ||
      selectStrategyType === "GoldenStrategy" ||
      selectStrategyType === "Golden Strategy"
    ) {
      setShowReportSections(false);
    }
  }, [activeTab, selectStrategyType, FromDate, ToDate]);

  useEffect(() => {
    setOpenSection(null); // Reset open section when activeTab changes
  }, [activeTab]);

  useEffect(() => {
    const autoSubmitIfNeeded = async () => {
      if (
        !hasSubmittedRef.current &&
        location?.state?.goto === "dashboard" &&
        selectedRowData
      ) {
        hasSubmittedRef.current = true;
        await handleSubmit();
      }
    };

    autoSubmitIfNeeded();
  }, [selectedRowData, location?.state?.goto]);

  useEffect(() => {
    if (selectStrategyType === "ChartingPlatform") {
      setShowReportSections(true);
      setOpenSection("overview");
      setLoadedSections((prev) => ({
        ...prev,
        overview: true,
      }));
    }
  }, [selectStrategyType, activeTab, FromDate, ToDate]);

  const fetchChartingSegments = async () => {
    try {
      const response = await getChargingPlatformDataApiForSegments(Username);

      if (response) {
        const combineItem = response.data.find(
          (item) => item.CombineChartingSignal
        );
        const combineSignals = combineItem?.CombineChartingSignal || [];

        setChartingSegments(combineSignals);
      } else {
        setChartingSegments([]);
      }
    } catch (error) {
      console.error("Error fetching charting segments:", error);
    }
  };

  const fetchStrategyTags = async () => {
    try {
      const response = await getStrategyTagApi(Username);
      setStrategyTagOptions(response?.StrategyTag || []);
    } catch (error) {
      console.error("Error fetching strategy tags:", error);
    }
  };

  const convertDateFormat = (date) => {
    if (!date) return "";
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(dateObj.getDate()).padStart(2, "0")}`;
  };

  const handleRowSelect = (rowData) => {
    setSelectedRowData(rowData);
    setOpenSection(null); // Reset open section when selecting a new row
    setShowReportSections(false);
  };
  const handleSubmit = async () => {
    if (selectStrategyType === "ChartingPlatform") return;
    if (!selectedRowData) {
      Swal.fire({
        icon: "warning",
        title: "Please select a row first!",
        confirmButtonColor: "#1ccc8a",
        timer: 2000,
      });
      return;
    }
    setLoadedSections({
      overview: false,
      pnlAnalysis: false,
      equity: false,
      drawdown: false,
      trades: false,
      profitLoss: false,
      consistent: false,
    });

    try {
      const basicData = {
        MainStrategy:
          selectStrategyType === "Scalping"
            ? selectedRowData.ScalpType === "Multi_Conditional"
              ? "NewScalping"
              : selectStrategyType
            : selectStrategyType === "GoldenStrategy" ||
              selectStrategyType === "Golden Strategy"
            ? "Golden Strategy"
            : selectStrategyType,
        Strategy:
          selectStrategyType === "Scalping"
            ? selectedRowData.Targetselection
            : selectStrategyType === "Option Strategy"
            ? selectedRowData.STG
            : selectStrategyType === "Pattern"
            ? selectedRowData.TradePattern
            : selectStrategyType === "GoldenStrategy" ||
              selectStrategyType === "Golden Strategy"
            ? selectedRowData.STG
            : activeTab,
        Symbol:
          selectStrategyType === "Option Strategy"
            ? selectedRowData.MainSymbol
            : selectStrategyType === "GoldenStrategy" ||
              selectStrategyType === "Golden Strategy"
            ? selectedRowData.MainSymbol
            : selectedRowData.Symbol,
        Username: selectedRowData.Username || "",
        ETPattern:
          selectStrategyType === "Pattern"
            ? selectedRowData.Pattern
            : selectStrategyType === "ChartingPlatform"
            ? activeTab === "Cash"
              ? "NSE"
              : activeTab.includes("NFO")
              ? "NFO"
              : activeTab.includes("MCX")
              ? "MCX"
              : "BFO"
            : selectStrategyType === "GoldenStrategy" ||
              selectStrategyType === "Golden Strategy"
            ? ""
            : selectedRowData.TType || selectedRowData.Targettype,
        Timeframe: selectedRowData.TimeFrame || "",
        From_date: convertDateFormat(FromDate || formattedDate),
        To_date: convertDateFormat(ToDate || Default_To_Date),
        Group: selectedRowData.GroupN || "",
        TradePattern: "",
        PatternName: "",
      };

      const overviewParams = {
        MainStrategy: basicData.MainStrategy,
        Strategy: basicData.Strategy,
        Symbol: basicData.Symbol,
        Username: basicData.Username,
        ETPattern: basicData.ETPattern,
        Timeframe: basicData.Timeframe,
        From_date: basicData.From_date,
        To_date: basicData.To_date,
        Group: basicData.Group,
        TradePattern: "",
        PatternName: "",
        InitialDeposite: 0,
      };
      const overviewRes = await get_Trade_History(overviewParams);

      if (!overviewRes?.data?.length && !overviewRes?.Overall?.length) {
        Swal.fire({
          icon: "info",
          title: "No Data Found",
          text: "No records available.",
          confirmButtonColor: "#1ccc8a",
          timer: 2000,
        });
        return; // Stop execution and prevent auto-scroll
      }

      setAllTradeData({
        data: overviewRes?.data || [],
        Overall: overviewRes?.Overall || [],
      });

      setShowReportSections(true);
      setLoadedSections((prev) => ({ ...prev, overview: true }));
      setOpenSection("overview");

      setTimeout(() => {
        sectionRefs.current["overview"]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to load data",
        text: error.message,
        confirmButtonColor: "#1ccc8a",
        timer: 2000,
      });
    }
  };
  const getChartingSegmentData = async () => {
    try {
      const req = {
        MainStrategy: "ChartingPlatform",
        Strategy: activeTab,
        Symbol: "",
        Username,
        ETPattern:
          selectStrategyType === "ChartingPlatform"
            ? activeTab === "Cash"
              ? "NSE"
              : activeTab.includes("NFO")
              ? "NFO"
              : activeTab.includes("MCX")
              ? "MCX"
              : "BFO"
            : "",
        Timeframe: "",
        From_date: convertDateFormat(FromDate || formattedDate),
        To_date: convertDateFormat(ToDate || Default_To_Date),
        Group: "",
        TradePattern: "",
        PatternName: "",
        InitialDeposite: 0,
      };
      const res = await get_Trade_History(req);
      setChartingData(res?.data || []);
      setAllTradeData({
        data: res?.data || [],
        Overall: res?.Overall || [],
      });
    } catch (error) {
      console.error("Error in getChartingSegmentData", error);
    }
  };

  const loadSectionData = async (section) => {
    // Always fetch fresh data when section is opened
    setLoadedSections((prev) => ({ ...prev, [section]: false }));
    try {
      let params;
      if (selectStrategyType === "ChartingPlatform") {
        params = {
          MainStrategy: "ChartingPlatform",
          Strategy: activeTab,
          Symbol: "",
          Username,
          ETPattern:
            activeTab === "Cash"
              ? "NSE"
              : activeTab.includes("NFO")
              ? "NFO"
              : activeTab.includes("MCX")
              ? "MCX"
              : "BFO",
          Timeframe: "",
          From_date: convertDateFormat(FromDate || formattedDate),
          To_date: convertDateFormat(ToDate || Default_To_Date),
          Group: "",
          TradePattern: "",
          PatternName: "",
          InitialDeposite: 0,
        };
      } else {
        params = {
          MainStrategy:
            selectStrategyType === "Scalping"
              ? selectedRowData.ScalpType === "Multi_Conditional"
                ? "NewScalping"
                : selectStrategyType
              : selectStrategyType,
          Strategy:
            selectStrategyType === "Scalping"
              ? selectedRowData.Targetselection
              : selectStrategyType === "Option Strategy"
              ? selectedRowData.STG
              : selectStrategyType === "Pattern"
              ? selectedRowData.TradePattern
              : selectStrategyType === "Golden Strategy" ||
                selectStrategyType === "GoldenStrategy"
              ? selectedRowData?.STG
              : activeTab,
          Symbol:
            selectStrategyType === "Option Strategy"
              ? selectedRowData.MainSymbol
              : selectStrategyType === "Golden Strategy"
              ? selectedRowData.MainSymbol
              : selectedRowData.Symbol,
          Username: selectedRowData.Username || "",
          ETPattern:
            selectStrategyType === "Pattern"
              ? selectedRowData.Pattern
              : selectedRowData.TType || selectedRowData.Targettype || "",
          Timeframe: selectedRowData.TimeFrame || "",
          From_date: convertDateFormat(FromDate || formattedDate),
          To_date: convertDateFormat(ToDate || Default_To_Date),
          Group: selectedRowData.GroupN || "",
          TradePattern: "",
          PatternName: "",
          InitialDeposite: 0,
        };
      }

      if (section === "pnlAnalysis") {
        const pnlRes = await get_PnL_Data(params);
        setPnlData({ data: pnlRes.Barchart || [] });
      } else if (section.includes("AnalyticsOverview")) {
        const analyticsRes = await overallReportApi(params);
        setAnalyticsOverview({ data: analyticsRes.Data || [] });
      } else if (section.includes("equity")) {
        const equityRes = await get_EQuityCurveData(params);
        setEquityCurveDetails({ data: equityRes.Equitycurve || [] });
      } else if (section === "drawdown") {
        const drawdownRes = await get_DrapDownData(params);
        setDropDownData({ data: drawdownRes.Drawdown || [] });
      } else if (section === "trades") {
        const [lossRes, profitRes] = await Promise.all([
          get_FiveMostLossTrade(params),
          get_FiveMostProfitTrade(params),
        ]);
        setFiveLossTrade({ data: lossRes.fivelosstrade || [] });
        setFiveProfitTrade({ data: profitRes.fiveprofittrade || [] });
      }
      setLoadedSections((prev) => ({ ...prev, [section]: true }));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `Failed to load ${section} data`,
        text: error.message,
        timer: 2000,
      });
    }
  };

  const ReportSection = ({ title, section, children }) => {
    const isOpen = openSection === section;
    const sectionRef = (el) => (sectionRefs.current[section] = el); // Assign ref to this section

    const toggleSection = async () => {
      if (!isOpen) {
        setOpenSection(section); // Open this section, closing others
        await loadSectionData(section);
        // Scroll to the opened section after a slight delay to ensure rendering
        setTimeout(() => {
          sectionRefs.current[section]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } else {
        setOpenSection(null); // Close this section
      }
    };

    const renderButtonContent = () => {
      if (!isOpen) return "🔽 Show Data";
      return loadedSections[section] ? (
        "🔼 Hide Data"
      ) : (
        <>
          <span
            className="spinner-border spinner-border-sm me-1"
            role="status"
            aria-hidden="true"
          ></span>
          Loading Data...
        </>
      );
    };

    return (
      <div ref={sectionRef} className="card mb-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="m-0">{title}</h5>
          <button className="btn btn-primary btn-sm" onClick={toggleSection}>
            {renderButtonContent()}
          </button>
        </div>
        {isOpen && (
          <div className="card-body">
            {loadedSections[section] ? (
              children
            ) : (
              <div className="spinner-border text-primary" />
            )}
          </div>
        )}
      </div>
    );
  };

  const getColumnsForStrategy = () => {
    switch (selectStrategyType) {
      case "Scalping":
        return columns();
      case "Option Strategy":
        return columns1();
      case "Pattern":
        return columns2();
      case "ChartingPlatform":
        return getColumns10();
      case "GoldenStrategy":
        return goldenstrategy_tradehistory();
      case "Golden Strategy":
        return goldenstrategy_tradehistory();
      default:
        return columns();
    }
  };

  return (
    <Content
      Page_title={"📊 Trade History "}
      button_status={false}
      backbutton_status={true}
    >
      <div className="iq-card-body">
        <div className="">
          <div className="row g-3 mb-2">
            {" "}
            {/* Reduced mb-4 to mb-2 for less vertical gap */}
            {/* First Row: Strategy Tag, From Date, To Date */}
            <div className="col-12">
              <div className="row align-items-end g-2">
                {/* From Date */}
                <div className="col-md-4 mb-2">
                  <label className="form-label">Select From Date</label>
                  <DatePicker
                    className="form-control"
                    selected={FromDate || formattedDate}
                    onChange={setFromDate}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                {/* To Date */}
                <div className="col-md-4 mb-2">
                  <label className="form-label">Select To Date</label>
                  <DatePicker
                    className="form-control"
                    selected={ToDate || Default_To_Date}
                    onChange={setToDate}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>

                {/* Strategy Tag */}
                {selectStrategyType == "ChartingPlatform" && (
                  <div className="col-md-4 mb-2">
                    <label className="form-label">Strategy Tag</label>
                    <select
                      className="form-control"
                      value={selectedStrategyTag}
                      onChange={(e) => setSelectedStrategyTag(e.target.value)}
                    >
                      <option value="All">All</option>
                      {strategyTagOptions.map((tag, idx) => (
                        <option key={idx} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
            {/* Second Row: Strategy Type Options (Pill Buttons) */}
            <div className="col-12">
              <div className="d-flex report-btns">
                <ul className="nav nav-pills shadow rounded-pill p-1">
                  {strategyNames.map((type, index) => (
                    <li className="nav-item" key={index}>
                      <button
                        className={`nav-link ${
                          selectStrategyType === type ? "active" : ""
                        } rounded-pill`}
                        onClick={() => {
                          setStrategyType(type || "ChartingPlatform");
                          sessionStorage.setItem("StrategyType", type);
                        }}
                        style={{
                          padding: "6px 12px", // Decreased size
                          margin: "8px", // Increased gap between pills
                          fontSize: "0.95rem",
                          border: "none",
                          outline: "none",
                        }}
                      >
                        {type}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Third Row: Segments (only if ChartingPlatform is selected) */}
            {selectStrategyType === "ChartingPlatform" && (
              <div className="col-12">
                <div className="d-flex justify-content-start">
                  <ul className="nav nav-pills shadow rounded-pill p-1">
                    {chartingSegments.map((segment) => (
                      <li className="nav-item" key={segment}>
                        <button
                          className={`nav-link ${
                            activeTab === segment ? "active" : ""
                          } rounded-pill`}
                          onClick={() => setActiveTab(segment)}
                          style={{
                            padding: "6px 12px", // Decreased size
                            marginRight: "8px", // Increased gap between pills
                            fontSize: "0.95rem",
                            border: "none",
                            outline: "none",
                          }}
                        >
                          {segment}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          {selectStrategyType === "Scalping" ? (
            <div className="mb-4">
              {/* <h5 className="card-title">Scalping</h5> */}
              {tradeHistory.data1?.length > 0 ? (
                <>
                  <GridExample
                    columns={getColumnsForStrategy()}
                    data={tradeHistory.data1}
                    onRowSelect={handleRowSelect}
                    checkBox={true}
                    isChecked={checkedRows}
                  />
                  <div className="d-grid gap-2">
                    <button
                      className="addbtn hoverNone"
                      onClick={handleSubmit}
                      disabled={!selectedRowData}
                    >
                      📜 Generate History
                    </button>
                  </div>
                </>
              ) : (
                <NoDataFound />
              )}
            </div>
          ) : (
            <div className="mb-4">
              {selectStrategyType === "ChartingPlatform" ? null : tradeHistory
                  .data?.length > 0 ? null : (
                <>
                  <NoDataFound />
                  <style>{`.addbtn { display: none; }`}</style>
                </>
              )}
              {(
                selectStrategyType === "ChartingPlatform"
                  ? getChartingData?.length > 0
                  : tradeHistory.data?.length
              ) ? (
                <>
                  {selectStrategyType !== "ChartingPlatform" && (
                    <>
                      <GridExample
                        columns={getColumnsForStrategy()}
                        data={
                          selectStrategyType === "ChartingPlatform"
                            ? getChartingData
                            : tradeHistory.data
                        }
                        onRowSelect={handleRowSelect}
                        checkBox={
                          selectStrategyType === "ChartingPlatform"
                            ? false
                            : true
                        }
                        isChecked={checkedRows}
                      />
                    </>
                  )}
                  {selectStrategyType !== "ChartingPlatform" && (
                    <div className="d-grid gap-2">
                      <button
                        className="addbtn hoverNone"
                        onClick={handleSubmit}
                        disabled={!selectedRowData}
                      >
                        📜 Generate History
                      </button>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          )}
          {showReportSections && (
            <div className="mt-5">
              {/* AnalyticsOverview Section */}

              <ReportSection
                title="Total Profit/Loss Overview"
                section="overview"
              >
                <div
                  className="pnl-overview d-flex justify-content-center align-items-center"
                  style={{
                    color: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    marginBottom: "20px",
                  }}
                >
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "1.75rem",
                      fontWeight: "bold",
                    }}
                  >
                    💰 Total PnL: ₹
                    <span
                      className="badge ms-2"
                      style={{
                        backgroundColor:
                          getAllTradeData.Overall[0]?.PnL > 0
                            ? "#008000"
                            : "#B22222",
                        color: "white",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                      }}
                    >
                      {getAllTradeData.Overall[0]?.PnL?.toFixed(2) || "0.00"}
                    </span>
                  </h4>
                </div>

                {getAllTradeData.data.length > 0 ? (
                  <>
                    {console.log("selectStrategyType", selectStrategyType)}
                    <GridExample
                      columns={
                        selectStrategyType == "GoldenStrategy" ||
                        selectStrategyType == "Golden Strategy"
                          ? goldenstrategy_tradehistory_data()
                          : selectStrategyType == "ChartingPlatform"
                          ? ChartingPlatformColumn(selectStrategyType)
                          : columns3(selectStrategyType)
                      }
                      data={
                        selectStrategyType !== "ChartingPlatform" ||
                        selectedStrategyTag === "All"
                          ? getAllTradeData.data
                          : getAllTradeData.data.filter(
                              (item) => item.StrategyTag === selectedStrategyTag
                            )
                      }
                      // data = {getAllTradeData.data}
                      checkBox={false}
                    />
                  </>
                ) : (
                  <NoDataFound />
                )}
              </ReportSection>

              <ReportSection
                title="Analytics Overview"
                section="AnalyticsOverview"
              >
                {AnalyticsOverview.data?.length > 0 ? (
                  <div className="analytics-overview">
                    <div className="row">
                      {Object.entries(AnalyticsOverview.data[0]).map(
                        ([key, value]) => (
                          <div className="col-md-4 mb-3" key={key}>
                            <div className="card modern-card-shadow">
                              <div className="card-body text-center">
                                <h6 className="card-text-Color">{key}</h6>
                                <h5 className="card-text-Color">
                                  {value !== null ? value : "N/A"}
                                </h5>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <NoDataFound />
                )}
              </ReportSection>

              {/* Profit/Loss Overview Section */}

              <ReportSection title="Profit/Loss Analysis" section="pnlAnalysis">
                <ProfitAndLossGraph data={getPnLData.data} />
              </ReportSection>
              <ReportSection title="Equity Curve Analysis" section="equity">
                <div style={{ height: "350px", overflow: "hidden" }}>
                  <ChartComponent data={getEquityCurveDetails.data} />
                </div>
                <GridExample
                  columns={columns5(selectStrategyType)}
                  data={getEquityCurveDetails.data}
                  checkBox={false}
                />
              </ReportSection>
              <ReportSection title="Drawdown Analysis" section="drawdown">
                <div style={{ height: "350px", overflow: "hidden" }}>
                  <DrawdownChartComponent data={getDropDownData.data} />
                </div>
                <GridExample
                  columns={columns6()}
                  data={getDropDownData.data}
                  checkBox={false}
                />
              </ReportSection>
              <ReportSection title="Top Trades Analysis" section="trades">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div
                        className="card-header text-white"
                        style={{ backgroundColor: "#006400" }}
                      >
                        💹 Top Profitable Trades
                      </div>
                      <div className="card-body">
                        {getFiveProfitTrade.data &&
                        getFiveProfitTrade.data.length > 0 ? (
                          <ApexCharts
                            options={getChartOptions(
                              getFiveProfitTrade.data,
                              "Profit"
                            )}
                            series={getFiveProfitTrade.data.map((t) => t.PnL)}
                            type="pie"
                            height={350}
                          />
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textAlign: "center",
                              marginBottom: "150px",
                              marginTop: "150px",
                            }}
                          >
                            <img
                              src="/assets/images/no-record-found.png"
                              width="50%"
                              alt="No records found"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div
                        className="card-header text-white"
                        style={{ backgroundColor: "#8B0000" }}
                      >
                        📉 Top Loss-Making Trades
                      </div>
                      <div className="card-body">
                        {getFiveLossTrade.data &&
                        getFiveLossTrade.data.length > 0 ? (
                          <ApexCharts
                            options={getChartOptions(
                              getFiveLossTrade.data,
                              "Loss"
                            )}
                            series={getFiveLossTrade.data.map((t) =>
                              Math.abs(t.PnL)
                            )}
                            type="pie"
                            height={350}
                          />
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textAlign: "center",
                              marginBottom: "150px",
                              marginTop: "150px",
                            }}
                          >
                            <img
                              src="/assets/images/no-record-found.png"
                              width="50%"
                              alt="No records found"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ReportSection>
            </div>
          )}
        </div>
      </div>
    </Content>
  );
};

const getChartOptions = (data, type) => ({
  chart: { type: "pie" },
  labels: data.map((t) => t.ETime.split(" ")[1].substring(0, 5)),

  colors:
    type === "Profit"
      ? [
          "#22c55e", // Emerald Green
          "#3b82f6", // Blue
          "#10b981", // Teal
          "#6366f1", // Indigo
          "#f59e0b", // Amber
        ]
      : [
          "#b91c1c", // Dark Red
          "#dc2626", // Red
          "#991b1b", // Deeper Red
          "#7f1d1d", // Blood Red
          "#450a0a", // Near-Black Red
        ],

  legend: { position: "bottom" },
  dataLabels: { enabled: true },
  tooltip: {
    y: {
      formatter: (value) => `₹${value.toFixed(2)}`,
    },
  },
});

export default Tradehistory;
