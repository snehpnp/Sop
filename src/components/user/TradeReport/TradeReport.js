import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { get_User_Data, getStrategyType } from "../../CommonAPI/Admin";
import {
  get_Trade_Report,
  getChargingPlatformDataApi,
  getChartingReport,
  getStrategyTagApi,
  getChargingPlatformDataApiForSegments,
} from "../../CommonAPI/User";
import GridExample from "../../../ExtraComponent/CommanDataTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import {
  getColumns3,
  getColumns2,
  getColumns1,
  getColumns,
  getColumns4,
  getColumns5,
  getColumns8,
  getColumns7,
  getColumns6,
  getColumns9,
  getColumns10,
  getColumns12,
  getgoldenStrategyCol,
  goldenstrategy_tradereport
} from "./ReportColumn";
import { useLocation } from "react-router-dom";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import Content from "../../../ExtraComponent/Content";
import Select from "react-select";

const TradeReport = () => {
  // Refs
  const hasSubmittedRef = useRef(false);
  const tableRef = useRef(null);
  
  // Location and cached values
  const location = useLocation();
  const StrategyType = useMemo(() => sessionStorage.getItem("StrategyType"), []);
  const userName = useMemo(() => localStorage.getItem("name"), []);
  const Username = useMemo(() => localStorage.getItem("name"), []);

  // State variables grouped by functionality
  const [selectStrategyType, setStrategyType] = useState();
  const [strategyNames, setStrategyNames] = useState([]);
  const [selectedStrategyTag, setSelectedStrategyTag] = useState("All");
  const [strategyTagOptions, setStrategyTagOptions] = useState([]);
  
  // Date states
  const [ToDate, setToDate] = useState("");
  const [FromDate, setFromDate] = useState("");
  
  // Data states
  const [tradeReport, setTradeReport] = useState({ data: [], data1: [] });
  const [getAllTradeData, setAllTradeData] = useState({
    loading: true,
    data1: [],
    data2: [],
  });
  const [chartingData, setChartingData] = useState([]);
  const [unfilteredChartData, setUnfilteredChartData] = useState([]);
  const [openCloseChartingData, setOpenCloseChartingData] = useState({
    CloseData: [],
    OpenData: [],
  });
  const [chartingSegments, setChartingSegments] = useState([]);
  
  // UI states
  const [showTable, setShowTable] = useState(false);
  const [tableType, setTableType] = useState("MultiCondition");
  const [selectedRowData, setSelectedRowData] = useState({});
  const [checkedRows, setCheckedRows] = useState();
  const [preSelectTableType, setPreSelectTableType] = useState("");
  const [activeTab, setActiveTab] = useState("Cash");

  // Memoized date calculations
  const { formattedDate, Defult_To_Date } = useMemo(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}.${month}.${day}`;

    const DefultToDate = new Date();
    DefultToDate.setDate(DefultToDate.getDate() + 1);
    const year1 = DefultToDate.getFullYear();
    const month1 = String(DefultToDate.getMonth() + 1).padStart(2, "0");
    const day1 = String(DefultToDate.getDate()).padStart(2, "0");
    const Defult_To_Date = `${year1}.${month1}.${day1}`;

    return { formattedDate, Defult_To_Date };
  }, []);

  // Memoized utility functions
  const convertDateFormat = useCallback((date) => {
    if (date === "") return "";
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  }, []);

  // Memoized strategy tag options
  const strategyTagSelectOptions = useMemo(() => [
    { value: "All", label: "All" },
    ...strategyTagOptions.map((tag) => ({ value: tag, label: tag }))
  ], [strategyTagOptions]);

  // Memoized filtered charting data
  const filteredChartingData = useMemo(() => {
    if (selectStrategyType === "ChartingPlatform") {
      return unfilteredChartData.filter((item) => item.Segment === activeTab);
    }
    return [];
  }, [selectStrategyType, unfilteredChartData, activeTab]);

  // Memoized strategy tag filtered data
  const filteredOpenData = useMemo(() => {
    if (selectStrategyType === "ChartingPlatform" && selectedStrategyTag !== "All") {
      return openCloseChartingData.OpenData.filter(
        (item) => item.StrategyTag === selectedStrategyTag
      );
    }
    return openCloseChartingData.OpenData;
  }, [selectStrategyType, selectedStrategyTag, openCloseChartingData.OpenData]);

  const filteredCloseData = useMemo(() => {
    if (selectStrategyType === "ChartingPlatform" && selectedStrategyTag !== "All") {
      return openCloseChartingData.CloseData.filter(
        (item) => item.StrategyTag === selectedStrategyTag
      );
    }
    return openCloseChartingData.CloseData;
  }, [selectStrategyType, selectedStrategyTag, openCloseChartingData.CloseData]);

  // Optimized API functions with useCallback
  const fetchStrategyTags = useCallback(async () => {
    try {
      const response = await getStrategyTagApi(Username);
      setStrategyTagOptions(response?.StrategyTag || []);
    } catch (error) {
      console.error("Error fetching strategy tags:", error);
    }
  }, [Username]);

  const fetchChartingSegments = useCallback(async () => {
    try {
      const response = await getChargingPlatformDataApiForSegments(Username);
      if (response) {
        const combineItem = response.data.find((item) => item.CombineChartingSignal);
        const combineSignals = combineItem?.CombineChartingSignal || [];
        setChartingSegments(combineSignals);
      } else {
        setChartingSegments([]);
      }
    } catch (error) {
      console.error("Error fetching charting segments:", error);
    }
  }, [Username]);

  const strategyTypeFn = useCallback(async () => {
    try {
      const res = await getStrategyType();
      if (res.Data && Array.isArray(res.Data)) {
        setStrategyNames(res.Data);
      } else {
        setStrategyNames([]);
      }
    } catch (error) {
      console.log("Error in getStrategyType", error);
    }
  }, []);

  const getChartingData = useCallback(async () => {
    const res = await getChargingPlatformDataApi(userName);
    setUnfilteredChartData(res.Client);
  }, [userName]);

  const GetTradeReport = useCallback(async () => {
    const data = {
      Data: selectStrategyType === "GoldenStrategy" ? "Golden Strategy" : selectStrategyType,
      Username: Username,
      From_date: convertDateFormat(FromDate === "" ? formattedDate : FromDate),
      To_date: convertDateFormat(ToDate === "" ? Defult_To_Date : ToDate),
    };
    
    try {
      const response = await get_User_Data(data);
      if (response.Status) {
        setTradeReport({
          data: response?.Data,
          data1: response?.NewScalping,
        });
      } else {
        setTradeReport({ data: [], data1: [] });
      }
    } catch (err) {
      console.log("Error in finding the user data", err);
    }
  }, [selectStrategyType, Username, FromDate, ToDate, convertDateFormat, formattedDate, Defult_To_Date]);

  const handleViewchartingReport = useCallback(async () => {
    const req = {
      MainStrategy: "ChartingPlatform",
      Strategy: activeTab,
      Symbol: "",
      Username: Username,
      ETPattern:
        activeTab === "Cash"
          ? "NSE"
          : activeTab.includes("NFO")
          ? "NFO"
          : activeTab.includes("MCX")
          ? "MCX"
          : "BFO",
      Timeframe: "",
      From_date: convertDateFormat(FromDate === "" ? formattedDate : FromDate),
      To_date: convertDateFormat(ToDate === "" ? Defult_To_Date : ToDate),
      Group: "",
      TradePattern: "",
      PatternName: "",
    };
    
    try {
      const res = await getChartingReport(req);
      if (res.Status) {
        setOpenCloseChartingData({
          CloseData: res.CloseData,
          OpenData: res.OpenData,
        });
        setShowTable(true);
      } else {
        setOpenCloseChartingData({ CloseData: [], OpenData: [] });
        setShowTable(false);
      }
    } catch (err) {
      console.log("Error in getting the charting report", err);
    }
  }, [activeTab, Username, FromDate, ToDate, convertDateFormat, formattedDate, Defult_To_Date]);

  const handleSubmit = useCallback(async (rowData = selectedRowData) => {
    const data = {
      MainStrategy:
        selectStrategyType === "Scalping" &&
        selectedRowData?.ScalpType === "Multi_Conditional"
          ? "NewScalping"
          : selectStrategyType === "GoldenStrategy" || selectStrategyType === "Golden Strategy"
          ? "Golden Strategy"
          : selectStrategyType,
      Strategy:
        selectStrategyType === "Scalping" &&
        selectedRowData?.ScalpType !== "Multi_Conditional"
          ? selectedRowData?.ScalpType
          : selectStrategyType === "Option Strategy"
          ? selectedRowData?.STG
          : selectStrategyType === "Pattern"
          ? selectedRowData?.TradePattern
          : selectStrategyType === "Scalping" &&
            selectedRowData.ScalpType === "Multi_Conditional"
          ? selectedRowData?.Targetselection
          : selectStrategyType === "ChartingPlatform"
          ? rowData?.Segment
          : selectStrategyType === "GoldenStrategy" || selectStrategyType === "Golden Strategy"
          ? selectedRowData?.STG
          : "",
      Symbol:
        selectStrategyType === "Scalping" || selectStrategyType === "Pattern"
          ? selectedRowData?.Symbol
          : selectStrategyType === "Option Strategy"
          ? selectedRowData?.IName
          : selectStrategyType === "ChartingPlatform"
          ? ""
          : selectStrategyType === "GoldenStrategy" || selectStrategyType === "Golden Strategy"
          ? selectedRowData?.MainSymbol
          : selectedRowData?.Symbol,
      Username: Username,
      ETPattern:
        selectStrategyType === "Scalping"
          ? selectedRowData?.TType
          : selectStrategyType === "Option Strategy"
          ? selectedRowData?.Targettype
          : selectStrategyType === "Pattern"
          ? selectedRowData?.Pattern
          : "",
      Timeframe:
        selectStrategyType === "Pattern" ? selectedRowData?.TimeFrame : "",
      From_date: convertDateFormat(FromDate === "" ? formattedDate : FromDate),
      To_date: convertDateFormat(ToDate === "" ? Defult_To_Date : ToDate),
      Group:
        selectStrategyType === "Scalping" ||
        selectStrategyType === "Option Strategy"
          ? selectedRowData?.GroupN
          : selectStrategyType === "GoldenStrategy" || selectStrategyType === "Golden Strategy"
          ? selectedRowData?.GroupN
          : "",
      TradePattern: "",
      PatternName: "",
    };

    try {
      const response = await get_Trade_Report(data);
      if (response.Status) {
        setAllTradeData({
          loading: false,
          data1: response.CloseData ? response.CloseData : [],
          data2: response.OpenData ? response.OpenData : [],
        });
        setShowTable(true);
      } else {
        Swal.fire({
          backdrop: "#121010ba",
          confirmButtonColor: "#1ccc8a",
          title: "No Records found",
          icon: "info",
          timer: 1500,
          timerProgressBar: true,
        });
        setAllTradeData({ loading: false, data1: [], data2: [] });
        setShowTable(false);
      }
    } catch (err) {
      console.log("Error in finding the All TradeData", err);
    }
  }, [
    selectStrategyType,
    selectedRowData,
    Username,
    FromDate,
    ToDate,
    convertDateFormat,
    formattedDate,
    Defult_To_Date,
  ]);

  const handleRowSelect = useCallback((rowData) => {
    setSelectedRowData(rowData);
    setShowTable(false);
  }, []);

  const handleStrategyTypeChange = useCallback((type) => {
  
    setStrategyType(type);
    sessionStorage.setItem("StrategyType", type);
  }, []);

  const handleStrategyTagChange = useCallback((option) => {
    setSelectedStrategyTag(option.value);
  }, []);

  const handleActiveTabChange = useCallback((segment) => {
    setActiveTab(segment);
  }, []);

  // Memoized column getters
  const getColumnsForStrategy = useCallback((strategyType, targetSelection, stg) => {
    switch (strategyType) {
      case "Scalping":
        return getColumns();
      case "Option Strategy":
        return getColumns1();
      case "Pattern":
      case "Pattern Script":
        return getColumns2();
      case "GoldenStrategy":
      case "Golden Strategy":
        return getgoldenStrategyCol();
      default:
        return getColumns9();
    }
  }, []);

  const getOpenTradeColumns = useCallback(() => {
    switch (selectStrategyType) {
      case "Scalping":
        return getColumns3(selectedRowData?.Targetselection);
      case "Option Strategy":
        return getColumns4(getAllTradeData?.data2?.[0]?.STG);
      case "Pattern":
      case "Pattern Script":
        return getColumns5();
      case "ChartingPlatform":
        return getColumns12();
      default:
        return getColumns3();
    }
  }, [selectStrategyType, selectedRowData?.Targetselection, getAllTradeData?.data2]);

  const getCloseTradeColumns = useCallback(() => {
    switch (selectStrategyType) {
      case "Scalping":
        return getColumns6(selectedRowData?.Targetselection);
      case "Option Strategy":
        return getColumns7(getAllTradeData?.data1?.[0]?.STG);
      case "Pattern":
      case "Pattern Script":
        return getColumns8();
      case "ChartingPlatform":
        return getColumns10();
      case "GoldenStrategy":
      case "Golden Strategy":
        return goldenstrategy_tradereport();
      default:
        return getColumns6();
    }
  }, [selectStrategyType, selectedRowData?.Targetselection, getAllTradeData?.data1]);

  // Initial data fetch - only runs once
  useEffect(() => {
    fetchStrategyTags();
    fetchChartingSegments();
    strategyTypeFn();
    getChartingData();
  }, []); // Empty dependency array for initial load only

  // Strategy type updates
  useEffect(() => {
   
    setStrategyType(StrategyType || "ChartingPlatform");
  }, [StrategyType]);

  // Reset table when strategy or rows change
  useEffect(() => {
    setShowTable(false);
  }, [selectStrategyType, checkedRows]);

  // Main data fetching effect
  useEffect(() => {
    if (selectStrategyType !== "ChartingPlatform") {
      GetTradeReport();
    } else {
      handleViewchartingReport();
    }
    setSelectedRowData("");
    setCheckedRows(null);
  }, [selectStrategyType, FromDate, ToDate, GetTradeReport, handleViewchartingReport]);

  // Location state handling
  useEffect(() => {
    if (location?.state?.goto && location?.state?.goto === "dashboard") {
      if (location?.state?.type === "MultiCondition") {
        setSelectedRowData(tradeReport.data1?.[location?.state?.RowIndex]);
      } else {
        setSelectedRowData(tradeReport.data?.[location?.state?.RowIndex]);
      }
      setPreSelectTableType(location?.state?.type);
    }

    // Set checked rows based on strategy type and location state
    const shouldSetCheckedRows = 
      (selectStrategyType === "Scalping" && location?.state?.type === "MultiCondition") ||
      (selectStrategyType === "Option Strategy" && location?.state?.type === "Option Strategy") ||
      (selectStrategyType === "ChartingPlatform" && location?.state?.type === "ChartingPlatform") ||
      (selectStrategyType === "GoldenStrategy" || selectStrategyType === "Golden Strategy") ||
      (selectStrategyType === "Pattern" && location?.state?.type === "Pattern") ||
      (selectStrategyType === "Pattern Script" && location?.state?.type === "Pattern Script");


    if (shouldSetCheckedRows) {
      setCheckedRows(location?.state?.RowIndex);
    } else {
      setCheckedRows(null);
    }
  }, [tradeReport, location?.state?.RowIndex, selectStrategyType, location?.state]);

  // Submit data when selectedRowData changes
  useEffect(() => {
    const submitData = async () => {
      if (
        !hasSubmittedRef.current &&
        location?.state?.RowIndex !== undefined &&
        location?.state?.RowIndex !== null &&
        selectedRowData &&
        Object.keys(selectedRowData).length > 0
      ) {
        hasSubmittedRef.current = true;
        await handleSubmit(selectedRowData);
      }
    };
    
    if (selectedRowData != null && selectedRowData !== undefined && Object.keys(selectedRowData).length > 0) {
      submitData();
    }
  }, [selectedRowData, handleSubmit, location?.state?.RowIndex]);

  // Table type management
  useEffect(() => {
    if (!location?.state?.type) {
      if (selectStrategyType === "Scalping") {
        setTableType("MultiCondition");
      }
    }
    //  else if (location?.state?.type && location?.state?.type !== "MultiCondition") {
    //   setStrategyType(location?.state?.type);
    // } else if (location?.state?.type === "MultiCondition") {
    //   setTableType("MultiCondition");
    //   setStrategyType(StrategyType || "ChartingPlatform");
    // }
  }, [preSelectTableType, selectStrategyType, location?.state?.type]);

  // Update charting data when filters change
  useEffect(() => {
    setChartingData(filteredChartingData);
  }, [filteredChartingData]);

  // Table type based on strategy
  useEffect(() => {
    if (selectStrategyType === "Scalping") {
      setTableType("MultiCondition");
    } else {
      setTableType("Scalping");
    }
  }, [selectStrategyType]);

  // ChartingPlatform specific updates
  useEffect(() => {
    if (selectStrategyType === "ChartingPlatform") {
      handleViewchartingReport();
    }
  }, [activeTab, selectStrategyType, handleViewchartingReport]);

  // Auto-select first strategy
  useEffect(() => {
    if (strategyNames.length > 0 && !selectStrategyType) {
     
      setStrategyType(strategyNames[0]);
    }
  }, [strategyNames, selectStrategyType]);

  // Auto-scroll to table
  useEffect(() => {
    if (
      showTable &&
      selectStrategyType !== "ChartingPlatform" &&
      (getAllTradeData?.data2?.length > 0 || getAllTradeData?.data1?.length > 0) &&
      tableRef.current
    ) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showTable, selectStrategyType, getAllTradeData]);

  // Reset selections when strategy changes
  useEffect(() => {
    setCheckedRows([]);
    setSelectedRowData(null);
  }, [selectStrategyType]);

  // Memoized render functions
  const renderStrategyButtons = useMemo(() => (
    <div className="col-12 col-md-12 col-lg-12 trade-report-btns">
      <div className="d-flex report-btn justify-content-center">
        <ul className="nav nav-tabs justify-content-center border-bottom rounded-0 p-1 mb-3">
          {strategyNames.map((type, index) => (
            <li className="nav-item" key={index}>
              <a
                className={`nav-link me-lg-5 ${
                  selectStrategyType === type ? "active" : ""
                } `}
                onClick={() => handleStrategyTypeChange(type)}
                style={{
                 
                }}
              >
                {type}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ), [strategyNames, selectStrategyType, handleStrategyTypeChange]);

  const renderSegmentButtons = useMemo(() => {
    if (selectStrategyType !== "ChartingPlatform") return null;
    
    return (
      <div className="row mb-2">
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <ul className="nav nav-pills shadow rounded-pill p-1">
              {chartingSegments.map((segment) => (
                <li className="nav-item" key={segment}>
                  <button
                    className={`nav-link ${
                      activeTab === segment ? "active" : ""
                    } rounded-pill`}
                    onClick={() => handleActiveTabChange(segment)}
                    style={{
                      padding: "6px 12px",
                      margin: "4px",
                      border: "none",
                      outline: "none",
                      fontSize: "0.95rem",
                    }}
                  >
                    {segment}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }, [selectStrategyType, chartingSegments, activeTab, handleActiveTabChange]);

  const renderMainTable = useMemo(() => {
    const isScalpingMultiCondition = tableType === "MultiCondition" && selectStrategyType === "Scalping";
    const isScalpingRegular = tableType === "Scalping" && selectStrategyType !== "ChartingPlatform";
    
    if (isScalpingMultiCondition) {
      return tradeReport?.data1 && tradeReport?.data1?.length > 0 ? (
        <div className="modal-body">
        
          <GridExample
            columns={getColumns9() || []}
            data={tradeReport?.data1}
            onRowSelect={handleRowSelect}
            checkBox={true}
            isChecked={checkedRows}
          />
        </div>
      ) : (
        <NoDataFound />
      );
    }

    if (isScalpingRegular) {
      return tradeReport?.data?.length > 0 ? (
        <div className="modal-body">
     
          <GridExample
            columns={getColumnsForStrategy(selectStrategyType)}
            data={tradeReport?.data}
            onRowSelect={handleRowSelect}
            checkBox={selectStrategyType !== "ChartingPlatform"}
            isChecked={checkedRows}
          />
        </div>
      ) : (
        <NoDataFound />
      );
    }

    return null;
  }, [
    tableType,
    selectStrategyType,
    tradeReport,
    getColumnsForStrategy,
    handleRowSelect,
    checkedRows
  ]);

  const renderSubmitButton = useMemo(() => {
    const shouldShowSubmit = 
      selectStrategyType !== "ChartingPlatform" &&
      ((selectStrategyType === "Scalping" &&
        (tradeReport?.data?.length > 0 || tradeReport?.data1?.length > 0)) ||
       ((selectStrategyType === "Option Strategy" ||
         selectStrategyType === "Pattern" ||
         selectStrategyType === "GoldenStrategy" ||
         selectStrategyType === "Golden Strategy" ||
         selectStrategyType === "Pattern Script") &&
        tradeReport?.data?.length > 0));

    return shouldShowSubmit ? (
      <button className="addbtn mt-2" onClick={() => handleSubmit()}>
        Submit
      </button>
    ) : null;
  }, [selectStrategyType, tradeReport, handleSubmit]);

  const renderTradeResults = useMemo(() => {
    const shouldShowTable = 
      (showTable && selectStrategyType !== "ChartingPlatform") ||
      selectStrategyType === "ChartingPlatform";

    if (!shouldShowTable) return null;

    const isChartingPlatformEmpty = 
      selectStrategyType === "ChartingPlatform" &&
      openCloseChartingData?.OpenData?.length === 0 &&
      openCloseChartingData?.CloseData?.length === 0;

    if (isChartingPlatformEmpty) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "150px",
          }}
        >
          <img
            src="/assets/images/no-record-found.png"
            width="30%"
            alt="No records found"
          />
        </div>
      );
    }

    const hasData = 
      selectStrategyType === "ChartingPlatform"
        ? true
        : getAllTradeData?.data2?.length > 0 ||
          getAllTradeData?.data1?.length > 0 ||
          (openCloseChartingData?.OpenData?.length > 0 &&
           openCloseChartingData?.CloseData?.length > 0);

    if (!hasData) {
      return <NoDataFound />;
    }

    return (
      <>
        {/* Open Trade Table */}
        {((getAllTradeData?.data2?.length > 0 || openCloseChartingData?.OpenData?.length > 0) || filteredOpenData?.length > 0) && (
          selectStrategyType === "ChartingPlatform") && (
          <>
            <h4 className="mt-4 mb-2">Open Trade</h4>
            <GridExample
              columns={getOpenTradeColumns()}
              data={
                selectStrategyType === "ChartingPlatform"
                  ? filteredOpenData
                  : getAllTradeData?.data2
              }
              onRowSelect={handleRowSelect}
              checkBox={false}
            />
          </>
        )}

        {/* Close Trade Table */}
        {((getAllTradeData?.data1?.length > 0 || openCloseChartingData?.CloseData?.length > 0) ||
          selectStrategyType === "ChartingPlatform") && (
          <div className="mt-3">
            <h4 className="mt-3 mb-2">Close Trade</h4>
            <GridExample
              columns={getCloseTradeColumns()}
              data={
                selectStrategyType === "ChartingPlatform"
                  ? filteredCloseData
                  : getAllTradeData?.data1
              }
              onRowSelect={handleRowSelect}
              checkBox={false}
              isChecked={0}
            />
          </div>
        )}
      </>
    );
  }, [
    showTable,
    selectStrategyType,
    openCloseChartingData,
    getAllTradeData,
    getOpenTradeColumns,
    getCloseTradeColumns,
    filteredOpenData,
    filteredCloseData,
    handleRowSelect
  ]);

  return (
    <Content
      Page_title={"📑 Trade Report"}
      button_status={false}
      backbutton_status={true}
    >
      <div className="iq-card-body">
        <div className="was-validated">
          <div className="row mb-4">
            <div className="col-12">
                {/* Second Row: Strategy Type Options (Pill Buttons) */}
          <div className="row mb-2">
            {renderStrategyButtons}
          </div>
              <div className="row align-items-start g-2 px-lg-5 justify-content-center card-bg-color">

                
                {/* From Date */}
                <div className=" col-lg-4 col-md-4 col-12 z-3 m-0">
                  <label className="card-text-Color">Select From Date</label>
                  <DatePicker
                    className="form-select"
                    selected={FromDate === "" ? formattedDate : FromDate}
                    onChange={(date) => setFromDate(date)}
                    style={{ width: "100%",zIndex:1100 }}
                  />
                </div>
                
                {/* To Date */}
                <div className="col-lg-4 col-md-4 col-12 z-3 m-0">
                  <label className="card-text-Color">Select To Date</label>
                  <DatePicker
                    className="form-select"
                    selected={ToDate === "" ? Defult_To_Date : ToDate}
                    onChange={(date) => setToDate(date)}
                    style={{ width: "100%" }}
                  />
                </div>


                {selectStrategyType === "ChartingPlatform" && (
                  <div className=" col-lg-4 col-md-4 col-12 m-0">
                    <label
                      htmlFor="strategyTag"
                      className="card-text-Color"
                     
                    >
                      Strategy Tag
                    </label>
                    <div className="relative"  style={{ height: "44px" }}>
                      <Select
                        id="strategyTag"
                      
                        classNamePrefix="react-select"
                        options={strategyTagSelectOptions}
                        value={{
                          value: selectedStrategyTag,
                          label: selectedStrategyTag,
                        }}
                        onChange={handleStrategyTagChange}
                        isSearchable={true}
                        isClearable={false}
                        menuPlacement="auto"
                        styles={{
                          container: (base) => ({ ...base, width: "100%" }),
                          menu: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                      />
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        

          {/* Third Row: Segments (only if ChartingPlatform is selected) */}
          {renderSegmentButtons}

          {/* Main Data Tables */}
          {renderMainTable}

          {/* Submit Button */}
          {renderSubmitButton}

          {/* Trade Results Tables */}
          <div ref={tableRef}>
            {renderTradeResults}
          </div>
        </div>
      </div>
    </Content>
  );
};

export default TradeReport;