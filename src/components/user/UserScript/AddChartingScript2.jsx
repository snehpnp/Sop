import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../ExtraComponent/Loader";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import FullDataTable from "../../../ExtraComponent/CommanDataTable(original)";
import { getColumns8 } from "../../user/UserDashboard/Columns";
import {
  ChartingPlatformSegment,
  DeleteSingleChartingScript,
  getChargingPlatformDataApi,
  getChargingPlatformDataApiForSegments,
  getStrategyTagApi,
  getUserChartingScripts,
} from "../../CommonAPI/User";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Content from "../../../ExtraComponent/Content";
import ChartingCard from "../UserDashboard/ChartingCard";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";

const AddChartingScript2 = () => {
  const location = useLocation();
  const {
    selectStrategyType,
    scriptType,
    tableType,
    data,
    selectedType,
    // FromDate: initialFromDate,
    // ToDate: initialToDate,
    chartingSubTab: initialTab,
    view: initialView,
    fixedRowPerPage,
    segment,
  } = location.state?.data || {};

  const [chartingSubTab, setChartingSubTab] = useState(initialTab || "Cash");
  const [view, setView] = useState("table");
  const [getCharting, setGetCharting] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(new Date(Date.now()));
  const [toDate, setToDate] = useState(new Date(Date.now()));
  const [strategy, setStrategy] = React.useState("All");
  const [selectedSignal, setSelectedSignal] = useState("All");
  const [chartingSegments, setChartingSegments] = useState([]);
  const [getDataSource, setDataSource] = useState("All");

  const [strategyTagOptions, setStrategyTagOptions] = useState([]);
  const navigate = useNavigate();
  const Username = localStorage.getItem("name");


  useEffect(() => {
    fetchChartingSegments();
  }, []);

  
  useEffect(() => {
    fetchStrategyTags();
  }, []);

  useEffect(() => {
    if (segment) {
      setChartingSubTab(segment);
    }
  }, [segment]);

  useEffect(() => {
    fetchChartingData();
  }, [chartingSubTab, fromDate, toDate, strategy, selectedSignal,getDataSource]);


  const fetchChartingData = async () => {
    setLoading(true);
    const adjustedToDate = new Date(toDate);
    adjustedToDate.setDate(adjustedToDate.getDate() + 1); // Increment toDate by 1 day

    const req = {
      Username: localStorage.getItem("name"),
      Segment: chartingSubTab,
      From_date: fromDate.toISOString().split("T")[0].replace(/-/g, "."), // Format to yyyy.mm.dd
      To_date: adjustedToDate.toISOString().split("T")[0].replace(/-/g, "."), // Format to yyyy.mm.dd
      Exchange:
        chartingSubTab === "Cash"
          ? "NSE"
          : chartingSubTab.includes("NFO")
          ? "NFO"
          : chartingSubTab.includes("MCX")
          ? "MCX"
          : "BFO",
    };
    try {
      const response = await getUserChartingScripts(req);
      if (response?.Status) {
        let filteredData = response.Client;

        if (strategy !== "All") {
          filteredData = filteredData.filter(
            (item) => item.StrategyTag === strategy
          );
        }

        if (selectedSignal !== "All") {
          filteredData = filteredData.filter(
            (item) => item.AccType === selectedSignal
          );
        }

        if (getDataSource !== "All") {
          filteredData = filteredData.filter(
            (item) => item.DataSource === getDataSource
          );
        }

        setGetCharting(filteredData);
      } else {
        setGetCharting([]);
      }
    } catch (error) {
      console.error("Error fetching charting data:", error);
      setGetCharting([]);
    } finally {
      setLoading(false);
    }
  };
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



  const HandleContinueDiscontinue = async (rowData, isCardExit = false) => {
    try {
      let req = null;
      if (isCardExit) {
        req = {
          Username: Username,
          Symbol: rowData?.TSymbol,
        };
      } else {
        const index = rowData.rowIndex;
        // Safely check if index is valid
        if (index < 0 || index >= getCharting.length) {
          console.error("Invalid index:", index);
          return;
        }
        req = {
          Username: Username,
          Symbol: getCharting[index]?.TSymbol,
        };
      }

      const response = await DeleteSingleChartingScript(req);

      if (response?.Status) {
        Swal.fire({
          backdrop: "#121010ba",
          title: "Success",
          text: response.message,
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          fetchChartingData();
        });
      } else {
        Swal.fire({
          backdrop: "#121010ba",
          title: "Failed",
          text: response?.message || "Something went wrong.",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error in HandleContinueDiscontinue:", error);
      Swal.fire({
        backdrop: "#121010ba",
        title: "Error",
        text: "An unexpected error occurred.",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
      });
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


  return (
    <Content
      Page_title={"🖥️ Panel Track"}
      button_status={false}
      backbutton_status={false}
    >
      <div className="iq-card-body">
        <div className="d-flex justify-content-between align-items-center">
          <button
            style={{ height: "32px", lineHeight: "16px" }}
            className="btn btn-primary m-3"
            onClick={() => navigate("/user/dashboard")}
          >
            <i className="las la-arrow-left"></i> Back
          </button>

          <div
            className="d-flex"
            style={{ gap: "10px", flex: 1, justifyContent: "flex-end" }}
          >
            {getCharting?.length > 0 && (
              <>
                <button
                  className={`nav-link rounded-pill ${
                    view === "table" ? "active" : ""
                  }`}
                  onClick={() => setView("table")}
                  style={{
                    padding: "7px 20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    backgroundColor: view === "table" ? "#007bff" : "#fff",
                    color: view === "table" ? "#fff" : "#333",
                    border: "1px solid #ddd",
                  }}
                >
                  Table View
                </button>
                <button
                  className={`nav-link rounded-pill ${
                    view === "card" ? "active" : ""
                  }`}
                  onClick={() => setView("card")}
                  style={{
                    padding: "7px 20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    backgroundColor: view === "card" ? "#007bff" : "#fff",
                    color: view === "card" ? "#fff" : "#333",
                    border: "1px solid #ddd",
                  }}
                >
                  Card View
                </button>
              </>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <div>
            {data === "ChartingPlatform" && (
              <div
                className="d-flex align-items-center card-bg-color"
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "10px 24px 10px 24px",
                  borderRadius: "10px",
                  flexWrap: "wrap",
                  gap: "24px",
                  width: "80vw",
                  justifyContent: "space-between",
                  minHeight: 80,
                  marginBottom: 16,
                }}
              >
                {/* Heading */}
                <h4
                  className="m-0 card-text-Color"
                  style={{ fontWeight: "600", flex: 1, minWidth: 120 }}
                >
                  {"Signals"}
                </h4>
                {/* Filter Controls Grid */}
                <div
                  className="d-flex flex-wrap align-items-end"
                  style={{
                    gap: "24px",
                    flex: 4,
                    justifyContent: "flex-end",
                    minWidth: 700,
                  }}
                >
                  {/* Strategy Tag Select */}
                  <div style={{ minWidth: 200, maxWidth: 260, flex: 1 }}>
                    <label
                      id="strategy-select-label"
                      style={{
                        fontWeight: 600,
                        marginBottom: 4,
                        display: "block",
                      }}
                      className="card-text-Color"
                    >
                      Select Strategy Tag
                    </label>
                    <Box>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          labelId="strategy-select-label"
                          id="strategy-select"
                          value={strategy}
                          onChange={(e) => setStrategy(e.target.value)}
                          displayEmpty
                          style={{ background: "inherit", color: "inherit" }}
                        >
                          <MenuItem value="All">All</MenuItem>
                          {strategyTagOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                  {/* Signals Sent By Select */}
                  <div style={{ minWidth: 200, maxWidth: 260, flex: 1 }}>
                    <label
                      style={{
                        fontWeight: 600,
                        marginBottom: 4,
                        display: "block",
                      }}
                      className="card-text-Color"
                    >
                      DataSource
                    </label>
                    <Box>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          id="signal-sent-by-select"
                          value={getDataSource}
                          onChange={(e) => setDataSource(e.target.value)}
                          displayEmpty
                          style={{ background: "inherit", color: "inherit" }}
                        >
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="MT4">MT4</MenuItem>
                          <MenuItem value="Option Chain">Option Chain</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                  {/* From Date */}
                  <div style={{ minWidth: 180, flex: 1 }}>
                    <label
                      style={{
                        fontWeight: 600,
                        marginBottom: 4,
                        display: "block",
                      }}
                      className="card-text-Color"
                    >
                      Select From Date:
                    </label>
                    <DatePicker
                      selected={fromDate}
                      onChange={(date) => setFromDate(date)}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                      style={{
                        borderRadius: 8,
                        border: "1px solid #007bff",
                        padding: "8px 12px",
                        fontSize: 14,
                      }}
                      calendarClassName="custom-datepicker"
                    />
                  </div>
                  {/* To Date */}
                  <div style={{ minWidth: 180, flex: 1 }}>
                    <label
                      className="card-text-Color"
                      style={{
                        fontWeight: 600,
                        marginBottom: 4,
                        display: "block",
                      }}
                    >
                      Select To Date:
                    </label>
                    <DatePicker
                      selected={toDate}
                      onChange={(date) => setToDate(date)}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                      style={{
                        borderRadius: 8,
                        border: "1px solid #007bff",
                        padding: "8px 12px",
                        fontSize: 14,
                      }}
                      calendarClassName="custom-datepicker"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {data && (
          <>
            <div className="iq-card-header d-flex justify-content-between">
              {/* <div className="iq-header-title">
                  {tableType === "MultiCondition" ? (
                  <h3 className="card-title">{"Scalping"}</h3>
                ) : (
                  // <h4 className="card-title">{data}</h4>
                )}  
              </div> */}
            </div>
            <div className="iq-card-body" style={{ padding: "3px" }}>
              <div className="table-responsive">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <div
                      className="d-flex chartingsignal-capsule-btns"
                      style={{
                        gap: "10px",
                        flex: 2,
                        justifyContent: "center",
                        minWidth: 300,
                      }}
                    >
                      {chartingSegments.map((tab) => (
                        <button
                          key={tab}
                          className={`nav-link rounded-pill ${
                            chartingSubTab === tab ? "active" : ""
                          }`}
                          onClick={() => setChartingSubTab(tab)}
                          style={{
                            padding: "10px 30px",
                            fontSize: "14px",
                            fontWeight: "600",
                            backgroundColor:
                              chartingSubTab === tab ? "#007bff" : "#fff",
                            color: chartingSubTab === tab ? "#fff" : "#333",
                            border: "1px solid #ddd",
                            minWidth: "90px",
                          }}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Conditional rendering for Text View and Card View */}
                    {view === "table" ? (
                      getCharting?.length > 0 ? (
                        <FullDataTable
                          columns={getColumns8(
                            HandleContinueDiscontinue,
                            chartingSubTab,
                            fetchChartingData
                          )}
                          data={getCharting}
                          checkBox={false}
                          rowPerPage={fixedRowPerPage}
                        />
                      ) : (
                        <NoDataFound />
                      )
                    ) : (
                      <div className="card-view-container">
                        {getCharting?.length > 0 ? (
                          <ChartingCard
                            data={getCharting}
                            HandleContinueDiscontinue={
                              HandleContinueDiscontinue
                            }
                            fetchChartingData={fetchChartingData}
                          />
                        ) : (
                          <NoDataFound />
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Content>
  );
};

export default AddChartingScript2;
