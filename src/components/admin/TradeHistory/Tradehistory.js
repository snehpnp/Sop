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
    GetClientService,
    getChartingStrategyTag,
} from "../../CommonAPI/Admin";
import GridExample from "../../../ExtraComponent/CommanDataTable";
import {
    get_Trade_Data,
    ChartingPlatformsegment,
    getChargingPlatformDataApi,
    getStrategyTagApi,
    ChartingPlatformSegment,
} from "../../CommonAPI/User";
import DatePicker from "react-datepicker";
import { AgChartsReact } from "ag-charts-react";
import "ag-charts-enterprise";
import ApexCharts from "react-apexcharts";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import {
    columns7,
    columns6,
    columns5,
    columns4,
    columns3,
    columns2,
    columns1,
    columns,
} from "./TradeHistoryColumn";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import { useLocation } from "react-router-dom";
import DrawdownChartComponent from "../../admin/AdvanceChart/DrawdownChartComponent";
import ProfitAndLossGraph from "../../admin/AdvanceChart/ProfitAndLossGraph";
import ChartComponent from "../../admin/AdvanceChart/ChartComponent";
import Content from '../../../ExtraComponent/Content';
import PillTabs from "../../../ExtraComponent/PillTabs";


const Tradehistory = () => {
    const StrategyType = sessionStorage.getItem("StrategyType");
    const location = useLocation();
    const sectionRefs = useRef({});
    const [selectStrategyType, setStrategyType] = useState(StrategyType || "ChatingPlatform");
    const [strategyNames, setStrategyNames] = useState([]);
    const [tradeHistory, setTradeHistory] = useState({ data: [], data1: [] });
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [checkedRows, setCheckedRows] = useState([]);
    const [ToDate, setToDate] = useState("");
    const [FromDate, setFromDate] = useState("");
    const [showReportSections, setShowReportSections] = useState(false);
    const [getCharting, setGetCharting] = useState([]);
    const [selectSegmentType, setSegmentType] = useState("");
    const [getChartingSegments, setChartingSegments] = useState([]);
    const [getGroupData, setGroupData] = useState({ loading: true, data: [] });
    const Username = sessionStorage.getItem("Username");
    const [selectGroup, setSelectGroup] = useState("Admin");

    const [activeTab, setActiveTab] = useState("Cash");
    const [strategyTagOptions, setStrategyTagOptions] = useState([]);
    const [selectedStrategyTag, setSelectedStrategyTag] = useState("All")
    const [chartingSegmentOption, setChartingSegmentOption] = useState([]);


    // Track if data for a section has been loaded.
    const [loadedSections, setLoadedSections] = useState({
        overview: false,
        pnlAnalysis: false,
        equity: false,
        drawdown: false,
        trades: false,
        profitLoss: false,
        consistent: false,
    });

    // Data states
    const [getAllTradeData, setAllTradeData] = useState({ data: [], Overall: [], });
    const [getPnLData, setPnlData] = useState({ data: [] });
    const [getEquityCurveDetails, setEquityCurveDetails] = useState({ data: [] });
    const [getDropDownData, setDropDownData] = useState({ data: [] });
    const [getFiveLossTrade, setFiveLossTrade] = useState({ data: [], data1: [], });
    const [getFiveProfitTrade, setFiveProfitTrade] = useState({ data: [], data1: [], });
    const [getChartingData, setChartingData] = useState([]);
    const [multiplier, setMultiplier] = useState(1);


    // Date configuration
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}.${String(
        currentDate.getMonth() + 1
    ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    const Default_To_Date = `${tomorrow.getFullYear()}.${String(
        tomorrow.getMonth() + 1
    ).padStart(2, "0")}.${String(tomorrow.getDate()).padStart(2, "0")}`;

    useEffect(() => {
        // if (getGroupData?.data?.length > 0) {
        //     setSelectGroup('Admin');
        // }
        setStrategyType(StrategyType || "ChartingPlatform");
    }, [getGroupData, Username, StrategyType]);

    const fetchStrategyTypes = async () => {
        try {
            const res = await getStrategyType();
            setStrategyNames(res?.Data || []);
        } catch (error) {
            console.error("Error fetching strategy types:", error);
        }
    };

    useEffect(() => {
        fetchStrategyTypes();
        GetAllGroupDetails();
    }, []);



    const fetchChartingSegments = async () => {
        try {
            const response = await ChartingPlatformSegment();
            if (response) {
                setChartingSegmentOption(response.Segment || []);
            } else {
                setChartingSegmentOption([]);
            }
        } catch (error) {
            console.error("Error fetching charting segments:", error);
        }
    };

    useEffect(() => {
        fetchChartingSegments();
    }, []);


    const fetchStrategyTags = async () => {
        try {
            let response;
            if (selectGroup === "Admin") {
                response = await getChartingStrategyTag();
                setStrategyTagOptions(response?.data?.map(item => item.Strategytag) || []);
            }
            else {
                response = await getStrategyTagApi(selectGroup);
                setStrategyTagOptions(response?.StrategyTag || []);
            }
        }
        catch (error) {
            console.error("Error fetching strategy tags:", error);
        }
    }


    useEffect(() => {
        fetchStrategyTags();
    }, [selectGroup]);

    const GetAllGroupDetails = async () => {
        try {
            const response = await GetClientService();
            if (response?.Status) {
                setGroupData({
                    loading: false,
                    data: response.Data || [],
                });
            } else {
                setGroupData({
                    loading: false,
                    data: [],
                });
            }
        } catch (error) {
            console.error("Error fetching group data:", error);
            setGroupData({
                loading: false,
                data: [],
            });
        }
    };

    const getChartingSegmentData = async () => {

        try {

            setLoadedSections({
                overview: true,
                pnlAnalysis: false,
                equity: false,
                drawdown: false,
                trades: false,
                profitLoss: false,
                consistent: false,
            });


            const req = {
                MainStrategy: "ChartingPlatform",
                Strategy: activeTab,
                Symbol: "",
                Username: selectGroup,
                ETPattern: selectStrategyType === "ChartingPlatform"
                    ? activeTab === "Cash"
                        ? "NSE"
                        : activeTab.includes("NFO")
                            ? "NFO"
                            : activeTab.includes("MCX")
                                ? "MCX"
                                : "BFO" : "",
                Timeframe: "",
                From_date: convertDateFormat(FromDate || formattedDate),
                To_date: convertDateFormat(ToDate || Default_To_Date),
                Group: "",
                TradePattern: "",
                PatternName: "",
                mult: multiplier,
            };
            const res = await get_Trade_History(req);
            setChartingData(res?.data || []);
            setAllTradeData({
                data: res.data || [],
                Overall: res?.Overall || [],
            });
            setShowReportSections(true);
        } catch (error) {
            console.error("Error in getChartingSegmentData", error);
        }
    };

    useEffect(() => {
        if (selectStrategyType === "ChartingPlatform") {
            getChartingSegmentData();
            setShowReportSections(true);  
        } else {
            setShowReportSections(false);  
        }
    }, [activeTab, selectGroup, selectStrategyType, FromDate, ToDate]);


    useEffect(() => {
        getChartingSegmentData();
    }, [multiplier]);

    const fetchTradeHistory = async () => {
        try {
            const response = await get_User_Data({
                Data: selectStrategyType && selectStrategyType == "Scalping" ? "NewScalping" : selectStrategyType,
                Username: selectGroup,
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

    // Fetch trade history whenever strategy type or selected username changes.
    useEffect(() => {
        fetchStrategyTypes();
        fetchTradeHistory();
    }, [selectStrategyType, selectGroup]);

    const convertDateFormat = (date) => {
        if (!date) return "";
        const dateObj = new Date(date);
        return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, "0")}.${String(dateObj.getDate()).padStart(2, "0")}`;
    };

    // When a row is selected, close all open report sections and hide report area.
    const handleRowSelect = (rowData) => {
        setSelectedRowData(rowData);
        setOpenSections({});
        setShowReportSections(false); // Hide sections on row select for non-ChartingPlatform
    };

    const handleSubmit = async () => {
        if (!selectedRowData) {
            Swal.fire({
                icon: "warning",
                title: "Please select a row first!",
                confirmButtonColor: "#1ccc8a",
            });
            return;
        }

        // Reset loaded sections so new data is fetched.
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
                        : selectStrategyType,
                Strategy:
                    selectStrategyType === "Scalping"
                        ? selectedRowData.ScalpType !== "Multi_Conditional"
                            ? selectedRowData.Targetselection
                            : selectedRowData.Targetselection
                        : selectStrategyType === "Option Strategy"
                            ? selectedRowData.STG
                            : selectStrategyType === "Pattern"
                                ? selectedRowData.TradePattern
                                : "Cash",
                Symbol:
                    selectStrategyType === "Scalping" || selectStrategyType === "Pattern"
                        ? selectedRowData.Symbol
                        : selectStrategyType === "Option Strategy"
                            ? selectedRowData.IName
                            : selectStrategyType === "ChartingPlatform"
                                ? selectedRowData.TSymbol
                                : "",
                ETPattern:
                    selectStrategyType === "Scalping"
                        ? selectedRowData.TType
                        : selectStrategyType === "Option Strategy"
                            ? selectedRowData.Targettype
                            : selectStrategyType === "Pattern"
                                ? selectedRowData.Pattern
                                : "",
                Group: ["Scalping", "Option Strategy"].includes(selectStrategyType)
                    ? selectedRowData.GroupN
                    : "",
                Username,
                From_date: convertDateFormat(FromDate || formattedDate),
                To_date: convertDateFormat(ToDate || Default_To_Date),
                Timeframe:
                    selectStrategyType === "Pattern" ? selectedRowData.TimeFrame : "",
                TradePattern: "",
                PatternName: "",
            };

            const tradeRes = await get_Trade_History(basicData);
            if (!tradeRes.data || tradeRes.data.length === 0) {
                Swal.fire({
                    icon: "info",
                    title: "No Record Found",
                    text: "No data available for the selected criteria.",
                    confirmButtonColor: "#1ccc8a",
                });
                return;
            }
            setAllTradeData({
                data: tradeRes.data || [],
                Overall: tradeRes.Overall || [],
            });
            setShowReportSections(true); // Only show after Generate is clicked
            setOpenSections({ overview: true }); // Ensure Overview section is open after Generate
            setLoadedSections(prev => ({ ...prev, overview: true })); // Set overview loaded state to true
            setTimeout(() => {
                if (sectionRefs.current["overview"]) {
                    sectionRefs.current["overview"].scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 200);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to load initial data",
                text: error.message,
                confirmButtonColor: "#1ccc8a",
            });
        }
    };

    const loadSectionData = async (section) => {
        if (loadedSections[section]) return;
        try {
            if (section === "overview") {
                setLoadedSections((prev) => ({ ...prev, [section]: true }));
                return;
            }

            let params;
            if (selectStrategyType === "ChartingPlatform") {
                params = {
                    MainStrategy: "ChartingPlatform",
                    Strategy: activeTab,
                    Symbol: "",
                    Username: selectGroup,
                    ETPattern: activeTab === "Cash"
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
                    mult: multiplier || 1,  

                }
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
                            ? selectedRowData.ScalpType !== "Multi_Conditional"
                                ? selectedRowData.Targetselection
                                : selectedRowData.Targetselection
                            : selectStrategyType === "Option Strategy"
                                ? selectedRowData.STG
                                : selectStrategyType === "Pattern"
                                    ? selectedRowData.TradePattern
                                    : "Cash",
                    Symbol:
                        selectStrategyType === "Scalping" || selectStrategyType === "Pattern"
                            ? selectedRowData.Symbol
                            : selectStrategyType === "Option Strategy"
                                ? selectedRowData.IName
                                : selectStrategyType === "ChartingPlatform"
                                    ? selectedRowData.TSymbol
                                    : "",
                    ETPattern:
                        selectStrategyType === "Scalping"
                            ? selectedRowData.TType
                            : selectStrategyType === "Option Strategy"
                                ? selectedRowData.Targettype
                                : selectStrategyType === "Pattern"
                                    ? selectedRowData.Pattern
                                    : "",
                    Group: ["Scalping", "Option Strategy"].includes(selectStrategyType)
                        ? selectedRowData.GroupN
                        : "",
                    Username,
                    From_date: convertDateFormat(FromDate || formattedDate),
                    To_date: convertDateFormat(ToDate || Default_To_Date),
                    Timeframe:
                        selectStrategyType === "Pattern" ? selectedRowData.TimeFrame : "",
                    TradePattern: "",
                    PatternName: "",

                }
            };

            if (section === "pnlAnalysis") {
                const pnlRes = await get_PnL_Data(params);
                setPnlData({ data: pnlRes.Barchart || [] });
            } else if (section === "equity") {
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
                confirmButtonColor: "#1ccc8a",
            });
        }
    };


    // Track open/closed state for each report section.
    const [openSections, setOpenSections] = useState(() =>
        selectStrategyType === "ChartingPlatform" ? { overview: true } : {}
    );

    // Close all opened sections on selectStrategyType change, except for ChartingPlatform
    useEffect(() => {
        if (selectStrategyType === "ChartingPlatform") {
            setOpenSections({ overview: true });
        } else {
            setOpenSections({});
        }
    }, [selectStrategyType, activeTab, multiplier]);

    // Remove auto-reset of selectGroup to Admin on selectStrategyType change
    useEffect(() => {
        if (getGroupData?.data?.length > 0) {
            // Only set Admin if selectGroup is not set at all
            // setSelectGroup(prev => prev === "" ? 'Admin' : prev);
        }
        setStrategyType(StrategyType || "ChartingPlatform");
    }, [getGroupData, Username, StrategyType]);

    // ReportSection component.
    const ReportSection = ({ title, section, children }) => {
        const isOpen = openSections[section] || false;
        const sectionRef = (el) => (sectionRefs.current[section] = el);

        const toggleSection = async () => {
            if (!isOpen) {
                // Close all other sections and open only the clicked one
                setOpenSections({ [section]: true });
                await loadSectionData(section);
                // Auto-scroll to the opened section after a short delay
                setTimeout(() => {
                    if (sectionRefs.current[section]) {
                        sectionRefs.current[section].scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 200);
            } else {
                setOpenSections((prev) => ({ ...prev, [section]: false }));
            }
        };

        const renderButtonContent = () => {
            if (!isOpen) {
                return "Show Data";
            } else {
                return loadedSections[section]
                    ? "Hide Data"
                    : <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true" />;
            }
        };

        return (
            <div className="card mb-3" ref={sectionRef}>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="m-0">{title}</h5>
                    <button className="btn btn-primary btn-sm" onClick={toggleSection}>
                        {renderButtonContent()}
                    </button>
                </div>
                {isOpen && (
                    <div className="card-body">
                        {loadedSections[section] ? children : <div className="spinner-border text-primary" />}
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
                return columns7();
            default:
                return columns();
        }
    };



    return (
        <Content
            Page_title={" 📊 Trade History"}
            button_status={false}
            backbutton_status={true}
        >
            <div className="iq-card-body">
                <div className="card-body">
                    {/* <div className="row g-3 mb-4">

                    <PillTabs tabs={strategyNames} activeTab={selectStrategyType} setActiveTab={setStrategyType} />


                        <div className={`col-12 col-md-4  ${selectStrategyType === "ChartingPlatform" ? "col-lg-3" : "col-lg-4"}`}>
                            <div className="form-group">
                                <label>Select Username</label>
                                <select
                                    className="form-select"
                                    required=""
                                    onChange={(e) => {
                                        setSelectGroup(e.target.value);
                                        sessionStorage.setItem("Username", e.target.value);
                                    }}
                                    value={selectGroup}
                                >
                                    <option value="Admin">Admin</option>
                                    {getGroupData.data &&
                                        getGroupData.data.map((item) => (
                                            <option key={item.Username} value={item.Username}>
                                                {item.Username}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                            <div className="form-group">
                                <label className="form-label">Strategy Type</label>
                                <select
                                    className="form-select"
                                    value={selectStrategyType}
                                    onChange={(e) => {
                                        setStrategyType(e.target.value);
                                        sessionStorage.setItem("StrategyType", e.target.value);
                                    }}
                                >
                                    {strategyNames.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div> 
                        {selectStrategyType === "ChartingPlatform" && <div className={`col-12 col-md-4  ${selectStrategyType === "ChartingPlatform" ? "col-lg-3" : "col-lg-4"}`}>
                            <div className="form-group">
                                <label className="form-label">Strategy Tag</label>
                                <select
                                    className="form-control"
                                    value={selectedStrategyTag}
                                    onChange={e => setSelectedStrategyTag(e.target.value)}
                                >
                                    <option value="All">All</option>
                                    {strategyTagOptions.map((tag, idx) => (
                                        <option key={idx} value={tag}>{tag}</option>
                                    ))}
                                </select>
                            </div>
                        </div>}

                        <div className={`col-12 col-md-4  ${selectStrategyType === "ChartingPlatform" ? "col-lg-3" : "col-lg-4"}`}>
                            <div className="form-group">
                                <label className="form-label">Select From Date</label>
                                <DatePicker
                                    className="form-control"
                                    selected={FromDate || formattedDate}
                                    onChange={setFromDate}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                        </div>
                        <div className={`col-12 col-md-4  ${selectStrategyType === "ChartingPlatform" ? "col-lg-3" : "col-lg-4"}`}>
                            <div className="form-group">
                                <label className="form-label">Select To Date</label>
                                <DatePicker
                                    className="form-control"
                                    selected={ToDate || Default_To_Date}
                                    onChange={setToDate}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                        </div>
                    </div> */}

                    <div className="row g-3 mb-4">
                        {/* First Row: All filters in a single row, equal width and gap */}
                        <div className="col-12">
                            <div className="d-flex flex-row flex-wrap gap-3" style={{ gap: '16px' }}>
                                {/* Strategy Tag */}
                               {selectStrategyType == "ChartingPlatform" &&  <div style={{ flex: 1, minWidth: 180 }}>
                                    <label className="form-label">Strategy Tag</label>
                                    <select
                                        className="form-control"
                                        value={selectedStrategyTag}
                                        onChange={e => setSelectedStrategyTag(e.target.value)}
                                    >
                                        <option value="All">All</option>
                                        {strategyTagOptions.map((tag, idx) => (
                                            <option key={idx} value={tag}>{tag}</option>
                                        ))}
                                    </select>
                                </div>}
                                {/* From Date */}
                                <div style={{ flex: 1, minWidth: 180 }}>
                                    <label className="form-label card-text-Color">Select From Date</label>
                                    <DatePicker
                                        className="form-control"
                                        selected={FromDate || formattedDate}
                                        onChange={setFromDate}
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                                {/* To Date */}
                                <div style={{ flex: 1, minWidth: 180 }}>
                                    <label className="form-label">Select To Date</label>
                                    <DatePicker
                                        className="form-control"
                                        selected={ToDate || Default_To_Date}
                                        onChange={setToDate}
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                                {/* Select User */}
                                <div style={{ flex: 1, minWidth: 180 }}>
                                    <label className="form-label">Select User</label>
                                    <select
                                        className="form-select"
                                        required
                                        onChange={(e) => {
                                            setSelectGroup(e.target.value);
                                            sessionStorage.setItem("Username", e.target.value);
                                        }}
                                        value={selectGroup}
                                    >
                                        {selectStrategyType === "ChartingPlatform" ? (
                                            <option value="Admin">Admin</option>
                                        ) : (
                                            <option value="">Select User</option>
                                        )}
                                        {getGroupData.data &&
                                            getGroupData.data.map((item) => (
                                                <option key={item.Username} value={item.Username}>
                                                    {item.Username}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                {/* Multiplier - only show when ChartingPlatform is selected */}
                                {selectStrategyType === "ChartingPlatform" && (
                                    <div style={{ flex: 1, minWidth: 180 }}>
                                        <label className="form-label">Multiplier</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter multiplier"
                                            value={multiplier}
                                            onChange={(e) => setMultiplier(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Second Row: Strategy Type Options (Pill Buttons) */}
                        <div className="col-12 mb-3"> {/* Added mb-3 for margin below */}
                            <div className="d-flex report-btns">
                                <ul className="nav nav-pills shadow rounded-pill p-1">
                                    {strategyNames.map((type, index) => (
                                        <li className="nav-item" key={index}>
                                            <button
                                                className={`nav-link ${selectStrategyType === type ? "active" : ""} rounded-pill`}
                                                onClick={() => {
                                                    setStrategyType(type);
                                                    sessionStorage.setItem("StrategyType", type);
                                                }}
                                                style={{
                                                    padding: "6px 14px",
                                                    margin: "6px", // increased from 3px for more gap
                                                    border: "none",
                                                    outline: "none",
                                                    fontSize: "0.95rem",
                                                    minWidth: "unset"
                                                }}
                                            >
                                                {type}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                         
                        {selectStrategyType === "ChartingPlatform" && (
                            <div className="col-12 mt-2"> {/* Added mt-2 for margin above */}
                                <div className="container">
                                    <div className="d-flex justify-content-start">
                                        <ul className="nav nav-pills shadow rounded-pill p-1" style={{ marginTop: "-10px" }}>
                                            {chartingSegmentOption.map((segment) => (
                                                <li className="nav-item" key={segment}>
                                                    <button
                                                        className={`nav-link ${activeTab === segment ? "active" : ""} rounded-pill`}
                                                        onClick={() => setActiveTab(segment)}
                                                        style={{
                                                            padding: "7px 14px",
                                                            margin: "6px", // increased from 3px for more gap
                                                            fontSize: "0.97rem",
                                                            border: "none",
                                                            outline: "none",
                                                            minWidth: "70px"
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
                        )}
                    </div>


                    {selectStrategyType === "Scalping" ? (
                        <div className="mb-4">
                            {/* <h5>Multi Conditional Strategies</h5> */}
                            {/* <h5>Scalping</h5> */}
                            {tradeHistory.data?.length > 0 ? (
                                <GridExample
                                    columns={getColumnsForStrategy()}
                                    data={tradeHistory.data}
                                    onRowSelect={handleRowSelect}
                                    checkBox={true}
                                />
                            ) : (
                                <NoDataFound />
                            )}
                        </div>
                    ) : (selectStrategyType !== "ChartingPlatform" &&
                        <div className="mb-4">
                            {/* <h5>{selectStrategyType} Strategies</h5> */}
                            {(selectStrategyType === "ChartingPlatform" ? getChartingData.length > 0 : tradeHistory.data?.length > 0) ? (
                                <GridExample
                                    columns={getColumnsForStrategy()}
                                    data={selectStrategyType === "ChartingPlatform" ? getChartingData : tradeHistory.data}
                                    onRowSelect={handleRowSelect}
                                    checkBox={selectStrategyType === "ChartingPlatform" ? false : true}
                                />
                            ) : (
                                <NoDataFound />
                            )}
                        </div>

                    )}

                    {selectStrategyType !== "ChartingPlatform" && (
                        <div className="d-grid gap-2">
                            <button
                                className="addbtn hoverNone"
                                onClick={handleSubmit}
                                disabled={!selectedRowData}>
                                📜 Generate History
                            </button>
                        </div>
                    )}
                    {showReportSections && (
                        <div className="mt-5">
                            <ReportSection title="Total Profit/Loss Overview" section="overview">
                                {getAllTradeData && getAllTradeData?.Overall?.length > 0 ? (
                                    <>
                                        <div
                                            className="pnl-overview"
                                            style={{
                                                // background: "linear-gradient(to right, #1e3c72, #2a5298)",
                                                color: "#fff",
                                                padding: "20px",
                                                borderRadius: "8px",
                                                textAlign: "center",
                                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                                marginBottom: "20px",
                                            }}
                                        >
                                            {/* <h4
                                                className="admin-pnl-data"

                                            >
                                                Total PnL: ₹
                                                {getAllTradeData.Overall[0]?.PnL?.toFixed(2) || "0.00"}
                                                <span
                                                    className={`badge ms-2 ${getAllTradeData.Overall?.PnL >= 0
                                                        ? "bg-success"
                                                        : "bg-danger"
                                                        }`}
                                                    style={{
                                                        fontSize: "1rem",
                                                        padding: "0.5rem 1rem",
                                                        borderRadius: "4px",
                                                        color: "white",
                                                    }}
                                                >
                                                    {getAllTradeData.Overall[0]?.PnL >= 0 ? "Profit" : "Loss"}
                                                </span>
                                            </h4> */}

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
                                        <GridExample
                                            columns={columns3(selectStrategyType)}
                                            data={
                                                (selectStrategyType !== "ChartingPlatform" || selectedStrategyTag === "All")
                                                    ? getAllTradeData.data
                                                    : getAllTradeData.data.filter(item => item.StrategyTag === selectedStrategyTag)
                                            }
                                            checkBox={false}
                                        />
                                    </>
                                ) : (
                                    <NoDataFound />
                                )}
                            </ReportSection>

                            <ReportSection title="Profit/Loss Analysis" section="pnlAnalysis">
                                {getPnLData.data && getPnLData.data.length > 0 ? (
                                    <ProfitAndLossGraph data={getPnLData.data} />
                                ) : (
                                    <NoDataFound />
                                )}
                            </ReportSection>

                            <ReportSection title="Equity Curve Analysis" section="equity">
                                {getEquityCurveDetails.data && getEquityCurveDetails.data.length > 0 ? (
                                    <>
                                        <div style={{ height: "350px", overflow: "hidden" }}>
                                            <ChartComponent data={getEquityCurveDetails.data} />
                                        </div>
                                        <GridExample
                                            columns={columns5(selectStrategyType)}
                                            data={getEquityCurveDetails.data}
                                            checkBox={false}
                                        />
                                    </>
                                ) : (
                                    <NoDataFound />
                                )}
                            </ReportSection>

                            <ReportSection title="Drawdown Analysis" section="drawdown">
                                {getDropDownData.data && getDropDownData.data.length > 0 ? (
                                    <>
                                        <div style={{ height: "350px", overflow: "hidden" }}>
                                            <DrawdownChartComponent data={getDropDownData.data} />
                                        </div>
                                        <GridExample
                                            columns={columns6()}
                                            data={getDropDownData.data}
                                            checkBox={false}
                                        />
                                    </>
                                ) : (
                                    <NoDataFound />
                                )}
                            </ReportSection>

                            <ReportSection title="Top Trades Analysis" section="trades">
                                {((getFiveProfitTrade.data && getFiveProfitTrade.data.length > 0) ||
                                    (getFiveLossTrade.data && getFiveLossTrade.data.length > 0)) ? (
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="card h-100">
                                                <div className="card-header bg-success text-white">
                                                    Top Profitable Trades
                                                </div>
                                                <div className="card-body">
                                                    {getFiveProfitTrade.data && getFiveProfitTrade.data.length > 0 ? (
                                                        <ApexCharts
                                                            options={getChartOptions(getFiveProfitTrade.data, "Profit")}
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
                                                            }}>
                                                            <img
                                                                src="/assets/images/no-record-found.png"
                                                                width="70%"
                                                                alt="No records found"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="card h-100">
                                                <div className="card-header bg-danger text-white">
                                                    Top Loss-making Trades
                                                </div>
                                                <div className="card-body">
                                                    {getFiveLossTrade.data && getFiveLossTrade.data.length > 0 ? (
                                                        <ApexCharts
                                                            options={getChartOptions(getFiveLossTrade.data, "Loss")}
                                                            series={getFiveLossTrade.data.map((t) => Math.abs(t.PnL))}
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
                                                            }}>
                                                            <img
                                                                src="/assets/images/no-record-found.png"
                                                                width="70%"
                                                                alt="No records found"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <NoDataFound />
                                )}
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
    colors: [
        "#FF5733", // Red-Orange
        "#33FF57", // Green
        "#3357FF", // Blue
        "#FF33A1", // Pink
        "#F3FF33", // Yellow
        "#33FFF3", // Cyan
        "#A133FF", // Purple
        "#FF8C33", // Orange
        "#33FF8C", // Light Green
        "#8C33FF"  // Violet
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

