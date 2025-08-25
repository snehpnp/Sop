import React, { useState, useEffect } from "react";
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
import {
  get_Trade_Data,
  ChartingPlatformsegment,
  getChargingPlatformDataApi,
} from "../../CommonAPI/User";
import DatePicker from "react-datepicker";

import { AgChartsReact } from "ag-charts-react";
import "ag-charts-enterprise";
import ApexCharts from "react-apexcharts";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import {
  columns8,
  columns7,
  columns6,
  columns5,
  columns4,
  columns3,
  columns2,
  columns1,
  columns,
  getColumns10,
} from "./TradeHistoryColumn";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import { useLocation } from "react-router-dom";
import DrawdownChartComponent from "../../admin/AdvanceChart/DrawdownChartComponent";
import ProfitAndLossGraph from "../../admin/AdvanceChart/ProfitAndLossGraph";
import ChartComponent from "../../admin/AdvanceChart/ChartComponent";

const Tradehistory = () => {
  const location = useLocation();

  const [selectStrategyType, setStrategyType] = useState("Scalping");

  const [strategyNames, setStrategyNames] = useState([]);
  const [tradeHistory, setTradeHistory] = useState({
    data: [],
    data1: [],
  });

  const [selectedRowData, setSelectedRowData] = useState("");

  const [preSelectTableType, setPreSelectTableType] = useState("");

  const [checkedRows, setCheckedRows] = useState([]);

  const [ToDate, setToDate] = useState("");
  const [FromDate, setFromDate] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [report, setReport] = useState({ loading: true, data1: [], data2: [] });
  const [getPnLData, setPnlData] = useState({
    loading: true,
    data: [],
    data2: [],
  });
  const [getEquityCurveDetails, setEquityCurveDetails] = useState({
    loading: true,
    data: [],
  });
  const [getDropDownData, setDropDownData] = useState({
    loading: true,
    data: [],
  });
  const [getFiveLossTrade, setFiveLossTrade] = useState({
    loading: true,
    data: [],
    data1: [],
  });
  const [getFiveProfitTrade, setFiveProfitTrade] = useState({
    loading: true,
    data: [],
    data1: [],
  });
  const [getCharting, setGetCharting] = useState([]);
  const [selectSegmentType, setSegmentType] = useState("");
  const [getChartingSegments, setChartingSegments] = useState([]);
  const [tableType, setTableType] = useState("Scalping");

  const [getAllTradeData, setAllTradeData] = useState({
    loading: true,
    data: [],
    data1: "",
    data2: "",
    data3: "",
    data4: "",
    Overall: [],
  });

  const Username = localStorage.getItem("name");

  // set Defult Date
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate());
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`;

  // Select From Date
  const DefultToDate = new Date();
  DefultToDate.setDate(DefultToDate.getDate() + 1);
  const year1 = DefultToDate.getFullYear();
  const month1 = String(DefultToDate.getMonth() + 1).padStart(2, "0");
  const day1 = String(DefultToDate.getDate()).padStart(2, "0");
  const Defult_To_Date = `${year1}.${month1}.${day1}`;

  useEffect(() => {
    if (selectStrategyType == "Scalping") {
      setTableType("MultiCondition");
    } else {
      setTableType("Scalping");
    }
  }, [selectStrategyType]);

  // Date Formetor
  const convertDateFormat = (date) => {
    if (date == "") {
      return "";
    }
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    if (selectSegmentType) getChartingScript();
  }, [selectSegmentType]);

  useEffect(() => {
    getChartingData();
  }, []);

  const getChartingData = async () => {
    await getChargingPlatformDataApi(Username)
      .then((res) => {
        if (res.Status) {
          setChartingSegments(res.Client);
          setSegmentType(res?.Client?.[0]?.Segment);
        } else {
          setChartingSegments([]);
        }
      })
      .catch((err) => {
        console.log("Error in finding the User Scripts", err);
      });
  };

  const getChartingScript = async () => {
    const filterData = getChartingSegments.filter(
      (item) => item.Segment == selectSegmentType
    );
    const req = { Username: Username, Segment: filterData[0].Segment };
    await ChartingPlatformsegment(req)
      .then((response) => {
        if (response.Status) {
          setGetCharting(response.Client);
        } else {
          setGetCharting([]);
        }
      })
      .catch((err) => {
        console.log("Error in finding the User Scripts", err);
      });
  };

  const GetTradeHistory = async () => {
    const data = { Data: selectStrategyType, Username: Username };
    //GET TRADEHISTORY
    await get_User_Data(data)
      .then((response) => {
        if (response.Status) {
          setTradeHistory({
            data: response?.Data,
            data1: response?.NewScalping,
          });
        } else {
          setTradeHistory({
            data: [],
            data1: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the user data", err);
      });
  };

  const strategyType = async () => {
    try {
      const res = await getStrategyType();
      if (res.Data) {
        setStrategyNames(res.Data);
      } else {
        console.log("Error in getting the StrategyType");
      }
    } catch (error) {
      console.log("Error in getting the StrategyType", error);
    }
  };
  useEffect(() => {
    strategyType();
    GetTradeHistory();
  }, [selectStrategyType]);

  useEffect(() => {
    if (location?.state?.goto && location?.state?.goto === "dashboard") {
      if (location?.state?.type == "MultiCondition") {
        setSelectedRowData(tradeHistory.data1?.[location?.state?.RowIndex]);
      } else {
        setSelectedRowData(tradeHistory.data?.[location?.state?.RowIndex]);
      }
      setPreSelectTableType(location?.state?.type);
    }
  }, [tradeHistory, location?.state?.RowIndex]);

  const handleRowSelect = (rowData) => {
    setSelectedRowData(rowData);
  };

  useEffect(() => {
    if (!location?.state?.type) {
      if (selectStrategyType == "Scalping") {
        setTableType("MultiCondition");
      }
    } else if (
      location?.state?.type &&
      location?.state?.type != "MultiCondition"
    ) {
      setStrategyType(location?.state?.type);
    } else if (location?.state?.type == "MultiCondition") {
      setTableType("MultiCondition");
      setStrategyType("Scalping");
    }
  }, [preSelectTableType]);

  const handleSubmit = async () => {
    const data = {
      MainStrategy:
        selectStrategyType == "Scalping" &&
        selectedRowData.ScalpType == "Multi_Conditional"
          ? "NewScalping"
          : selectStrategyType,
      Strategy:
        selectStrategyType == "Scalping" &&
        selectedRowData.ScalpType != "Multi_Conditional"
          ? selectedRowData && selectedRowData.ScalpType
          : selectStrategyType == "Option Strategy"
          ? selectedRowData && selectedRowData.STG
          : selectStrategyType == "Pattern"
          ? selectedRowData && selectedRowData.TradePattern
          : selectStrategyType == "Scalping" &&
            selectedRowData.ScalpType == "Multi_Conditional"
          ? selectedRowData && selectedRowData.Targetselection
          : "Cash",
      Symbol:
        selectStrategyType == "Scalping" || selectStrategyType == "Pattern"
          ? selectedRowData && selectedRowData.Symbol
          : selectStrategyType == "Option Strategy"
          ? selectedRowData && selectedRowData.IName
          : selectStrategyType == "ChartingPlatform"
          ? selectedRowData && selectedRowData.TSymbol
          : "",
      Username: Username,
      ETPattern:
        selectStrategyType == "Scalping"
          ? selectedRowData.TType
          : selectStrategyType == "Option Strategy"
          ? selectedRowData && selectedRowData.Targettype
          : selectStrategyType == "Pattern"
          ? selectedRowData && selectedRowData.Pattern
          : "",
      Timeframe:
        selectStrategyType == "Pattern"
          ? selectedRowData && selectedRowData.TimeFrame
          : "",
      From_date: convertDateFormat(FromDate == "" ? formattedDate : FromDate),
      To_date: convertDateFormat(ToDate == "" ? Defult_To_Date : ToDate),
      Group:
        selectStrategyType == "Scalping" ||
        selectStrategyType == "Option Strategy"
          ? selectedRowData && selectedRowData.GroupN
          : "",
      TradePattern: "",
      PatternName: "",
    };
    await get_Trade_History(data)
      .then((response) => {
        if (response.Status) {
          setAllTradeData({
            loading: false,
            data: response.data,
            data1: response.profitconsistant,
            data2: response.profitconcount,
            data3: response.lossconcount,
            data4: response.lossconsistant,
            Overall: response.Overall,
          });
          setShowTable(true);
        } else {
          Swal.fire({
             // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "No Records found",
            icon: "info",
            timer: 1500,
            timerProgressBar: true,
          });
          setAllTradeData({
            loading: false,
            data: [],
            data1: "",
            data2: "",
            data3: "",
            data4: "",
            Overall: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the All TradeData", err);
      });

    //GET PNL DATA
    await get_PnL_Data(data)
      .then((response) => {
        if (response.Status) {
          const newDataArray = response.Barchart.map((item) => ({
            PnL: item.PnL,
            ETime: item.ETime.split(" ")[1].substring(0, 5),
          }));

          setPnlData({
            loading: false,
            data: newDataArray,
            data2: response.Barchart,
          });
        } else {
          setPnlData({
            loading: false,
            data: [],
            data2: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the user data", err);
      });

    //GET GetEquity CurveData
    await get_EQuityCurveData(data)
      .then((response) => {
        if (response.Status) {
          setEquityCurveDetails({
            loading: false,
            data: response.Equitycurve,
          });
        } else {
          setEquityCurveDetails({
            loading: false,
            data: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the user data", err);
      });

    //GET GetEquity CurveData
    await get_DrapDownData(data)
      .then((response) => {
        if (response.Status) {
          setDropDownData({
            loading: false,
            data: response.Drawdown,
          });
        } else {
          setDropDownData({
            loading: false,
            data: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the user data", err);
      });

    // GET 5 MONST PROFIT TRADE
    await get_FiveMostLossTrade(data)
      .then((response) => {
        if (response.Status) {
          setFiveLossTrade({
            loading: false,
            data: response.fivelosstrade,
            data1: response.fivelosstradeall,
          });
        } else {
          setFiveLossTrade({
            loading: false,
            data: [],
            data1: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the user data", err);
      });

    await get_FiveMostProfitTrade(data)
      .then((response) => {
        if (response?.Status) {
          setFiveProfitTrade({
            loading: false,
            data: response.fiveprofittrade,
            data1: response.fiveprofittradeall,
          });
        } else {
          setFiveProfitTrade({
            loading: false,
            data: [],
            data1: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the user data", err);
      });

    // Get Trade Report
    await get_Trade_Data(data)
      .then((response) => {
        if (response?.Status) {
          setReport({
            loading: false,
            data1: response.Data1,
            data2: response.Data2,
          });
        } else {
          setReport({
            loading: false,
            data1: [],
            data2: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the All TradeData", err);
      });
  };

  const chartOptions = {
    zoom: { enabled: true },
    data: getPnLData && getPnLData.data,
    series: [{ type: "bar", xKey: "ETime", yKey: "PnL" }],
  };

  const chartOptions1 = {
    zoom: { enabled: true },
    data: getEquityCurveDetails && getEquityCurveDetails.data,
    series: [
      {
        type: "line",
        xKey: selectStrategyType == "Pattern" ? "ETime" : "ExitTime",
        yKey: selectStrategyType == "Scalping" ? "EquityCurve" : "PnL",
      },
    ],
  };

  const chartOptions2 = {
    zoom: { enabled: true },
    data: getDropDownData && getDropDownData.data,
    series: [{ type: "line", xKey: "ETime", yKey: "Drawdown" }],
  };

  const ETime =
    getFiveProfitTrade && getFiveProfitTrade.data.map((item) => item.ETime);
  const PnL =
    getFiveProfitTrade && getFiveProfitTrade.data.map((item) => item.PnL);

  const ETime1 =
    getFiveLossTrade && getFiveLossTrade.data.map((item) => item.ETime);
  const PnL1 =
    getFiveLossTrade &&
    getFiveLossTrade.data.map((item) =>
      item.PnL < 0 ? -1 * item.PnL : item.PnL
    );

  const options = {
    series: PnL,
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ETime,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const options1 = {
    series: PnL1,
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ETime1,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  useEffect(() => {
    setShowTable(false);
  }, [
    selectStrategyType,
    FromDate,
    ToDate,
    selectedRowData,
    selectSegmentType,
  ]);

  const Accordion = ({ id, title, content }) => (
    <div className="mb-3 mt-3">
      <div className="accordion" id={id}>
        <div className="accordion-item">
          <h2 className="accordion-header" id={`heading-${id}`}>
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse-${id}`}
              aria-expanded="false"
              aria-controls={`collapse-${id}`}
              style={{ fontWeight: "bold" }}>
              {title}
            </button>
          </h2>
          <div
            id={`collapse-${id}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading-${id}`}
            data-bs-parent={`#${id}`}>
            <div className="accordion-body">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="container-fluid" style={{marginTop:"2rem"}}>
        <div className="row">
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">Trade History</h4>
              </div>
            </div>
            <div className="iq-card-body">
              <div className="was-validated ">
                <div className="row">
                  <div
                    className={`form-group  ${
                      selectStrategyType == "ChartingPlatform" ||
                      selectStrategyType == "Scalping"
                        ? "col-lg-3"
                        : "col-lg-4"
                    }`}>
                    <label>Select Strategy Type</label>
                    <select
                      className="form-select"
                      required=""
                      onChange={(e) => setStrategyType(e.target.value)}
                      value={selectStrategyType}>
                      {strategyNames.map((item, index) => {
                        return (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* {selectStrategyType == "Scalping" && (
                    <div
                      className={`form-group  ${
                        selectStrategyType == "ChartingPlatform" ||
                        selectStrategyType == "Scalping"
                          ? "col-lg-3"
                          : "col-lg-4"
                      }`}>
                      <label>Table Type</label>
                      <select
                        className="form-select"
                        required=""
                        onChange={(e) => setTableType(e.target.value)}
                        value={tableType}>
                        <option value="Scalping">Scalping</option>
                        <option value="MultiCondition">Multi Condition</option>
                      </select>
                    </div>
                  )} */}
                  {selectStrategyType == "ChartingPlatform" && (
                    <div
                      className={`form-group  ${
                        selectStrategyType == "ChartingPlatform" ||
                        selectStrategyType == "Scalping"
                          ? "col-lg-3"
                          : "col-lg-4"
                      }`}>
                      <label>Select Segment Type</label>
                      <select
                        className="form-select"
                        required=""
                        onChange={(e) => setSegmentType(e.target.value)}
                        value={selectSegmentType}>
                        {getChartingSegments.map((item, index) => {
                          return (
                            <option key={index} value={item.Segment}>
                              {item.Segment}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}

                  <div
                    className={`form-group ${
                      selectStrategyType == "ChartingPlatform" ||
                      selectStrategyType == "Scalping"
                        ? "col-lg-3"
                        : "col-lg-4"
                    }`}>
                    <label>Select From Date</label>
                    <DatePicker
                      className="form-select"
                      selected={FromDate == "" ? formattedDate : FromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </div>
                  <div
                    className={`form-group ${
                      selectStrategyType == "ChartingPlatform" ||
                      selectStrategyType == "Scalping"
                        ? "col-lg-3"
                        : "col-lg-4"
                    }`}>
                    <label>Select To Date</label>
                    <DatePicker
                      className="form-select custom-date"
                      selected={ToDate == "" ? Defult_To_Date : ToDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </div>
                </div>
              </div>

              {tableType == "Scalping" ? (
                (selectStrategyType === "ChartingPlatform" &&
                  getCharting.length > 0) ||
                (selectStrategyType !== "ChartingPlatform" &&
                  tradeHistory.data.length > 0) ? (
                  <div>
                    <div className="iq-header-title mt-4">
                      <h4 className="card-title">{selectStrategyType}</h4>
                    </div>
                    <div className="modal-body">
                      <GridExample
                        columns={
                          selectStrategyType === "Scalping"
                            ? columns()
                            : selectStrategyType === "Option Strategy"
                            ? columns1()
                            : selectStrategyType === "Pattern"
                            ? columns2()
                            : selectStrategyType === "ChartingPlatform"
                            ? getColumns10()
                            : columns()
                        }
                        data={(selectStrategyType === "ChartingPlatform"
                          ? getCharting
                          : tradeHistory.data
                        ).map((item, index) => ({
                          ...item,
                          isChecked: checkedRows[index] || false,
                        }))}
                        isChecked={location?.state?.RowIndex}
                        onRowSelect={handleRowSelect}
                        checkBox={true}
                      />
                    </div>
                  </div>
                ) : (
                  <NoDataFound />
                )
              ) : null}
              {tableType === "MultiCondition" &&
                selectStrategyType === "Scalping" && (
                  <div>
                    <div className="iq-header-title mt-4">
                      <h3 className="card-title">Multi Conditional</h3>
                    </div>
                    <div className="modal-body">
                      {tradeHistory.data1 && tradeHistory.data1.length > 0 ? (
                        <GridExample
                          columns={columns()}
                          data={tradeHistory.data1.map((item, index) => ({
                            ...item,
                            isChecked: checkedRows[index] || false,
                          }))}
                          onRowSelect={handleRowSelect}
                          checkBox={true}
                          isChecked={location?.state?.RowIndex}
                        />
                      ) : (
                        <NoDataFound />
                      )}
                    </div>
                  </div>
                )}

              {/* Submit Buttons */}
              <div className="mt-2">
                {selectStrategyType === "Scalping" &&
                tableType === "MultiCondition" ? (
                  tradeHistory.data1?.length > 0 && (
                    <button className="btn btn-primary" onClick={handleSubmit}>
                      Submit
                    </button>
                  )
                ) : (selectStrategyType === "ChartingPlatform" &&
                    getCharting?.length > 0) ||
                  (tradeHistory?.data?.length > 0 &&
                    tableType !== "MultiCondition") ? (
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                  </button>
                ) : null}
              </div>

              {showTable && (
                <>
                  <Accordion
                    id="totalProfitLoss"
                    title="Total Profit and Loss Details"
                    content={
                      <>
                        {/* <p className="bold mt-4" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                          Total Profit and Loss:
                          <span
                            style={{
                              color:
                                getAllTradeData &&
                                getAllTradeData.Overall[0].PnL < 0
                                  ? "red"
                                  : "green",
                            }}>
                            {getAllTradeData && getAllTradeData.Overall[0].PnL}
                          </span>
                        </p> */}
                        <p
                          className="bold mt-4"
                          style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            color: "black",
                          }}>
                          Total Profit and Loss:
                          <span
                            style={{
                              color:
                                getAllTradeData?.Overall?.[0]?.PnL < 0
                                  ? "red"
                                  : "green",
                            }}>
                            {getAllTradeData?.Overall?.[0]?.PnL !== undefined
                              ? parseFloat(
                                  getAllTradeData.Overall[0].PnL
                                ).toFixed(2)
                              : "--"}
                          </span>
                        </p>

                        <GridExample
                          columns={columns3(selectStrategyType)}
                          data={getAllTradeData.data}
                          onRowSelect={handleRowSelect}
                          checkBox={false}
                        />
                      </>
                    }
                  />

                  {/* import DrawdownChartComponent from '../DrawdownChartComponent/DrawdownChartComponent'; // Import the new component */}

                  <Accordion
                    id="drawdownGraph"
                    title="Drawdown Graph"
                    content={
                      <>
                        <p
                          className="bold mt-3"
                          style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            color: "black",
                          }}>
                          Drawdown Graph
                        </p>
                        <div style={{ width: "100%", height: "500px" }}>
                          <DrawdownChartComponent data={getDropDownData.data} />{" "}
                          {/* Pass the correct data here */}
                        </div>
                      </>
                    }
                  />

                  {/* <Accordion
                                        id="drawdownGraph1"
                                        title="Drawdown Graph1"
                                        content={
                                            <>
                                                <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                                    Drawdown Graph1
                                                </p>
                                                <div style={{ width: '100%', height: '500px' }}>
                                                    <AgChartsReact options={chartOptions2} />
                                                </div>
                                            </>
                                        }
                                    /> */}

                  <Accordion
                    id="drawdownTable"
                    title="Drawdown Table"
                    content={
                      <GridExample
                        columns={columns6()}
                        data={getDropDownData.data}
                        onRowSelect={handleRowSelect}
                        checkBox={false}
                      />
                    }
                  />

                  {/* <Accordion
                                        id="pnlGraph1"
                                        title="Profit and Loss Graph 1"
                                        content={
                                            <>
                                                <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                                    Profit and Loss Graph 1
                                                </p>
                                                <div style={{ width: '100%', height: '500px' }}>
                                                    <AgChartsReact options={chartOptions} />
                                                </div>
                                            </>
                                        }
                                    /> */}

                  <Accordion
                    id="pnlGraph"
                    title="Profit and Loss Graph"
                    content={
                      <>
                        <p
                          className="bold mt-3"
                          style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            color: "black",
                          }}>
                          Profit and Loss Graph
                        </p>
                        <div style={{ width: "100%", height: "500px" }}>
                          <ProfitAndLossGraph data={getPnLData.data} />
                        </div>
                      </>
                    }
                  />
                  <Accordion
                    id="topTrades"
                    title="5 Most Profit and Loss Trades"
                    content={
                      <div className="d-flex">
                        <div
                          id="chart"
                          style={{ width: "50%", height: "300px" }}>
                          <p
                            className="bold mt-3"
                            style={{
                              fontWeight: "bold",
                              fontSize: "20px",
                              color: "black",
                            }}>
                            5 most Profit Trade
                          </p>
                          <ApexCharts
                            options={options}
                            series={options.series}
                            type="pie"
                            width={options.chart.width}
                          />
                        </div>
                        <div
                          id="chart"
                          style={{ width: "50%", height: "300px" }}>
                          <p
                            className="bold mt-3"
                            style={{
                              fontWeight: "bold",
                              fontSize: "20px",
                              color: "black",
                            }}>
                            5 most Loss Trade
                          </p>
                          <ApexCharts
                            options={options1}
                            series={options1.series}
                            type="pie"
                            width={options1.chart.width}
                          />
                        </div>
                      </div>
                    }
                  />

                  <Accordion
                    id="consistentTrades"
                    title="Consistent Loss & Profit-Making Trades"
                    content={
                      <>
                        <p
                          className="bold mt-3"
                          style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            color: "black",
                          }}>
                          Consistent Loss & Profit-Making Trades:
                        </p>
                        <div className="row">
                          <div className="col-lg-6">
                            <p>
                              Consistent Profit:{" "}
                              <span>
                                {parseFloat(getAllTradeData.data1)?.toFixed(2)}
                              </span>
                            </p>
                            <p>
                              Count Consistent Profit:{" "}
                              <span>
                                {parseFloat(getAllTradeData.data2)?.toFixed(2)}
                              </span>
                            </p>
                          </div>
                          <div className="col-lg-6">
                            <p>
                              Consistent Loss:{" "}
                              <span>
                                {parseFloat(getAllTradeData.data4)?.toFixed(2)}
                              </span>
                            </p>
                            <p>
                              Count Consistent Loss:{" "}
                              <span>
                                {parseFloat(getAllTradeData.data3)?.toFixed(2)}
                              </span>
                            </p>
                          </div>
                        </div>
                      </>
                    }
                  />

                  <Accordion
                    id="equityCurveGraph"
                    title="EquityCurve Graph"
                    content={
                      <>
                        <p
                          className="bold mt-3"
                          style={{
                            fontWeight: "bold",
                            fontSize: "20px",
                            color: "black",
                          }}>
                          EquityCurve
                        </p>
                        <div style={{ width: "100%", height: "500px" }}>
                          <ChartComponent data={getEquityCurveDetails.data} />
                        </div>
                      </>
                    }
                  />

                  {/* <Accordion
                                        id="equityCurveGraph"
                                        title="EquityCurve Graph"
                                        content={
                                            <>
                                                <p className="bold mt-3" style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                                    EquityCurve
                                                </p>
                                                <div style={{ width: '100%', height: '500px' }}>
                                                    <AgChartsReact options={chartOptions1} />
                                                </div>
                                            </>
                                        }
                                    /> */}

                  <Accordion
                    id="equityCurveTable"
                    title="Equity Curve Table"
                    content={
                      <GridExample
                        columns={columns5(selectStrategyType)}
                        data={getEquityCurveDetails.data}
                        onRowSelect={handleRowSelect}
                        checkBox={false}
                      />
                    }
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tradehistory;






// import React, { useState, useEffect, useRef } from "react";
// import {
//   get_User_Data,
//   get_Trade_History,
//   get_PnL_Data,
//   get_EQuityCurveData,
//   get_DrapDownData,
//   get_FiveMostProfitTrade,
//   get_FiveMostLossTrade,
//   getStrategyType,

// } from "../../CommonAPI/Admin";
// import GridExample from "../../../ExtraComponent/CommanDataTable";
// import DatePicker from "react-datepicker";
// import ApexCharts from "react-apexcharts";
// import "react-datepicker/dist/react-datepicker.css";
// import Swal from "sweetalert2";
// import {
//   columns,
//   columns1,
//   columns2,
//   columns3,
//   columns5,
//   columns6,
//   getColumns10,
// } from "./TradeHistoryColumn";
// import NoDataFound from "../../../ExtraComponent/NoDataFound";
// import { useLocation } from "react-router-dom";
// import DrawdownChartComponent from "../../admin/AdvanceChart/DrawdownChartComponent";
// import ProfitAndLossGraph from "../../admin/AdvanceChart/ProfitAndLossGraph";
// import ChartComponent from "../../admin/AdvanceChart/ChartComponent";
// import Content from "../../../ExtraComponent/Content";
// import { getStrategyTagApi, overallReportApi } from "../../CommonAPI/User";
// import ProfitAndLossGraph2 from "../../admin/AdvanceChart/ProfitAndLossGraph2";

// const Tradehistory = () => {
//   const StrategyType = sessionStorage.getItem("StrategyType");
//   const location = useLocation();
//   const sectionRefs = useRef({}); // Refs for each section to scroll to
//   const Username = localStorage.getItem("name");
//   const currentDate = new Date();
//   const formattedDate = `${currentDate.getFullYear()}.${String(
//     currentDate.getMonth() + 1
//   ).padStart(2, "0")}.${String(currentDate.getDate()).padStart(2, "0")}`;
//   const tomorrow = new Date(currentDate);
//   tomorrow.setDate(currentDate.getDate() + 1);
//   const Default_To_Date = `${tomorrow.getFullYear()}.${String(
//     tomorrow.getMonth() + 1
//   ).padStart(2, "0")}.${String(tomorrow.getDate()).padStart(2, "0")}`;

//   // States
//   const [selectStrategyType, setStrategyType] = useState(
//     StrategyType || "ChartingPlatform"
//   );
//   const [strategyNames, setStrategyNames] = useState([]);
//   const [tradeHistory, setTradeHistory] = useState({ data: [], data1: [] });
//   const [selectedRowData, setSelectedRowData] = useState(null);
//   const [checkedRows, setCheckedRows] = useState([]);
//   const [ToDate, setToDate] = useState("");
//   const [FromDate, setFromDate] = useState("");
//   const [showReportSections, setShowReportSections] = useState(false);
//   const [activeTab, setActiveTab] = useState("Cash");
//   const [getChartingData, setChartingData] = useState([]);
//   const [loadedSections, setLoadedSections] = useState({
//     overview: false,
//     pnlAnalysis: false,
//     equity: false,
//     drawdown: false,
//     trades: false,
//     profitLoss: false,
//     consistent: false,
//   });
//   const [getAllTradeData, setAllTradeData] = useState({
//     data: [],
//     Overall: [],
//   });
//   const [getPnLData, setPnlData] = useState({ data: [] });
//   const [getEquityCurveDetails, setEquityCurveDetails] = useState({ data: [] });
//   const [getDropDownData, setDropDownData] = useState({ data: [] });
//   const [getFiveLossTrade, setFiveLossTrade] = useState({
//     data: [],
//     data1: [],
//   });
//   const [getFiveProfitTrade, setFiveProfitTrade] = useState({
//     data: [],
//     data1: [],
//   });
//   const [openSection, setOpenSection] = useState(null);
//   const [AnalyticsOverview, setAnalyticsOverview] = useState([]);
//   // Strategy Tag state
//   const [strategyTagOptions, setStrategyTagOptions] = useState([]);
//   const [selectedStrategyTag, setSelectedStrategyTag] = useState("All");
//   // Set row selection based on location state
//   useEffect(() => {
//     if (location?.state?.goto === "dashboard") {
//       if (location?.state?.type === "MultiCondition") {
//         setSelectedRowData(tradeHistory.data1?.[location?.state?.RowIndex]);
//       } else {
//         setSelectedRowData(tradeHistory.data?.[location?.state?.RowIndex]);
//       }
//       setStrategyType(
//         location?.state?.type === "MultiCondition"
//           ? "ChartingPlatform"
//           : location?.state?.type
//       );
//     }
//     setCheckedRows(location?.state?.RowIndex);
//   }, [
//     tradeHistory,
//     location?.state?.RowIndex,
//     location?.state?.goto,
//     location?.state?.type,
//   ]);



//   const fetchStrategyTags = async () => {
//     try {
//       const response = await getStrategyTagApi(Username);
//       setStrategyTagOptions(response?.StrategyTag || []);
//     }
//     catch (error) {
//       console.error("Error fetching strategy tags:", error);
//     }
//   }

//   useEffect(() => {
//     fetchStrategyTags();
//   }, []);

//   useEffect(() => {
//     const fetchStrategyTypes = async () => {
//       try {
//         const res = await getStrategyType();
//         setStrategyNames(res.Data || []);
//       } catch (error) {
//         console.error("Error fetching strategy types:", error);
//         setStrategyNames([]);
//       }
//     };
//     if (selectStrategyType !== "ChartingPlatform") {
//       const fetchTradeHistory = async () => {
//         try {
//           const response = await get_User_Data({
//             Data: selectStrategyType,
//             Username,
//           });
//           setTradeHistory(
//             response.Status
//               ? {
//                 data: response?.Data || [],
//                 data1: response?.NewScalping || [],
//               }
//               : { data: [], data1: [] }
//           );
//         } catch (err) {
//           console.error("Error fetching trade history:", err);
//         }
//       };
//       fetchTradeHistory();
//     }
//     fetchStrategyTypes();
//   }, [selectStrategyType, Username]);

//   useEffect(() => {
//     setCheckedRows([]); // Reset checked rows
//     setSelectedRowData(null); // Reset selected row data
//   }, [selectStrategyType]);

//   useEffect(() => {
//     setOpenSection(null); // Close all open dropdowns when switching tabs
//   }, [selectStrategyType]);

//   const convertDateFormat = (date) => {
//     if (!date) return "";
//     const dateObj = new Date(date);
//     return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(
//       2,
//       "0"
//     )}.${String(dateObj.getDate()).padStart(2, "0")}`;
//   };

//   const handleRowSelect = (rowData) => {
//     setSelectedRowData(rowData);
//     setOpenSection(null); // Reset open section when selecting a new row
//     setShowReportSections(false);
//   };
//   const handleSubmit = async () => {
//     if (selectStrategyType === "ChartingPlatform") return;
//     if (!selectedRowData) {
//       Swal.fire({
//         icon: "warning",
//         title: "Please select a row first!",
//         confirmButtonColor: "#1ccc8a",
//         timer: 2000,
//       });
//       return;
//     }
//     setLoadedSections({
//       overview: false,
//       pnlAnalysis: false,
//       equity: false,
//       drawdown: false,
//       trades: false,
//       profitLoss: false,
//       consistent: false,
//     });


//     try {
//       const basicData = {
//         MainStrategy:
//           selectStrategyType === "Scalping"
//             ? selectedRowData.ScalpType === "Multi_Conditional"
//               ? "NewScalping"
//               : selectStrategyType
//             : selectStrategyType,
//         Strategy:
//           selectStrategyType === "Scalping"
//             ? selectedRowData.Targetselection
//             : selectStrategyType === "Option Strategy"
//               ? selectedRowData.STG
//               : selectStrategyType === "Pattern"
//                 ? selectedRowData.TradePattern
//                 : activeTab,
//         Symbol: selectStrategyType === "Option Strategy" ? selectedRowData.MainSymbol : selectedRowData.Symbol,
//         Username: selectedRowData.Username || "",
//         ETPattern: selectStrategyType === "Pattern" ? selectedRowData.Pattern : (selectedRowData.TType || selectedRowData.Targettype),
//         Timeframe: selectedRowData.TimeFrame || "",
//         From_date: convertDateFormat(FromDate || formattedDate),
//         To_date: convertDateFormat(ToDate || Default_To_Date),
//         Group: selectedRowData.GroupN || "",
//         TradePattern: "",
//         PatternName: "",
//       };

//       // Fetch Total Profit/Loss Overview data
//       const overviewParams = {
//         MainStrategy: basicData.MainStrategy,
//         Strategy: basicData.Strategy,
//         Symbol: basicData.Symbol,
//         Username: basicData.Username,
//         ETPattern: basicData.ETPattern,
//         Timeframe: basicData.Timeframe,
//         From_date: basicData.From_date,
//         To_date: basicData.To_date,
//         Group: basicData.Group,
//         TradePattern: "",
//         PatternName: "",
//         InitialDeposite: 0,
//       };

//       const overviewRes = await get_Trade_History(overviewParams);

//       if (!overviewRes?.data?.length && !overviewRes?.Overall?.length) {
//         Swal.fire({
//           icon: "info",
//           title: "No Data Found",
//           text: "No records available.",
//           confirmButtonColor: "#1ccc8a",
//           timer: 2000,
//         });
//         return; // Stop execution and prevent auto-scroll
//       }

//       setAllTradeData({
//         data: overviewRes?.data || [],
//         Overall: overviewRes?.Overall || [],
//       });

//       // Open Total Profit/Loss Overview section
//       setShowReportSections(true);
//       setLoadedSections((prev) => ({ ...prev, overview: true }));
//       setOpenSection("overview");

//       // Scroll to the Total Profit/Loss Overview section
//       setTimeout(() => {
//         sectionRefs.current["overview"]?.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }, 100);
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed to load data",
//         text: error.message,
//         confirmButtonColor: "#1ccc8a",
//         timer: 2000,
//       });
//     }
//   };
//   const getChartingSegmentData = async () => {


//     try {
//       const req = {
//         MainStrategy: "ChartingPlatform",
//         Strategy: activeTab,
//         Symbol: "",
//         Username,
//         ETPattern: "",
//         Timeframe: "",
//         From_date: convertDateFormat(FromDate || formattedDate),
//         To_date: convertDateFormat(ToDate || Default_To_Date),
//         Group: "",
//         TradePattern: "",
//         PatternName: "",
//         InitialDeposite: 0,
//       };

//       const res = await get_Trade_History(req);

//       setChartingData(res?.data || []);
//       setAllTradeData({
//         data: res?.data || [],
//         Overall: res?.Overall || [],
//       });
//     } catch (error) {
//       console.error("Error in getChartingSegmentData", error);
//     }
//   };

//   useEffect(() => {
//     if (selectStrategyType === "ChartingPlatform") {
//       getChartingSegmentData();
//     }
//   }, [activeTab, selectStrategyType, FromDate, ToDate]);

//   const loadSectionData = async (section) => {
//     // Always fetch fresh data when section is opened
//     setLoadedSections((prev) => ({ ...prev, [section]: false }));
//     try {
//       let params;
//       if (selectStrategyType === "ChartingPlatform") {
//         params = {
//           MainStrategy: "ChartingPlatform",
//           Strategy: activeTab,
//           Symbol: "",
//           Username,
//           ETPattern: "",
//           Timeframe: "",
//           From_date: convertDateFormat(FromDate || formattedDate),
//           To_date: convertDateFormat(ToDate || Default_To_Date),
//           Group: "",
//           TradePattern: "",
//           PatternName: "",
//           InitialDeposite: 0,
//         }
//       } else {
//         params = {
//           MainStrategy:
//             selectStrategyType === "Scalping"
//               ? selectedRowData.ScalpType === "Multi_Conditional"
//                 ? "NewScalping"
//                 : selectStrategyType
//               : selectStrategyType,
//           Strategy:
//             selectStrategyType === "Scalping"
//               ? selectedRowData.Targetselection
//               : selectStrategyType === "Option Strategy"
//                 ? selectedRowData.STG
//                 : selectStrategyType === "Pattern"
//                   ? selectedRowData.TradePattern
//                   : activeTab,
//           Symbol: selectStrategyType === "Option Strategy" ? selectedRowData.MainSymbol : selectedRowData.Symbol,
//           Username: selectedRowData.Username || "",
//           ETPattern: selectStrategyType === "Pattern" ? selectedRowData.Pattern : (selectedRowData.TType || selectedRowData.Targettype),
//           Timeframe: selectedRowData.TimeFrame || "",
//           From_date: convertDateFormat(FromDate || formattedDate),
//           To_date: convertDateFormat(ToDate || Default_To_Date),
//           Group: selectedRowData.GroupN || "",
//           TradePattern: "",
//           PatternName: "",
//           InitialDeposite: 0,
//         }
//       };

//       if (section === "pnlAnalysis") {
//         const pnlRes = await get_PnL_Data(params);
//         setPnlData({ data: pnlRes.Barchart || [] });
//       } else if (section.includes("AnalyticsOverview")) {
//         const analyticsRes = await overallReportApi(params);
//         setAnalyticsOverview({ data: analyticsRes.Data || [] });
//       } else if (section.includes("equity")) {
//         const equityRes = await get_EQuityCurveData(params);
//         setEquityCurveDetails({ data: equityRes.Equitycurve || [] });
//       } else if (section === "drawdown") {
//         const drawdownRes = await get_DrapDownData(params);
//         setDropDownData({ data: drawdownRes.Drawdown || [] });
//       } else if (section === "trades") {
//         const [lossRes, profitRes] = await Promise.all([
//           get_FiveMostLossTrade(params),
//           get_FiveMostProfitTrade(params),
//         ]);
//         setFiveLossTrade({ data: lossRes.fivelosstrade || [] });
//         setFiveProfitTrade({ data: profitRes.fiveprofittrade || [] });
//       }
//       setLoadedSections((prev) => ({ ...prev, [section]: true }));
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: `Failed to load ${section} data`,
//         text: error.message,
//         timer: 2000,
//       });
//     }
//   };

//   useEffect(() => {
//     setOpenSection(null); // Reset open section when activeTab changes
//   }, [activeTab]);

//   const ReportSection = ({ title, section, children }) => {
//     const isOpen = openSection === section;
//     const sectionRef = (el) => (sectionRefs.current[section] = el); // Assign ref to this section

//     const toggleSection = async () => {
//       if (!isOpen) {
//         setOpenSection(section); // Open this section, closing others
//         await loadSectionData(section);
//         // Scroll to the opened section after a slight delay to ensure rendering
//         setTimeout(() => {
//           sectionRefs.current[section]?.scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           });
//         }, 100);
//       } else {
//         setOpenSection(null); // Close this section
//       }
//     };

//     const renderButtonContent = () => {
//       if (!isOpen) return "🔽 Show Data";
//       return loadedSections[section] ? (
//         "🔼 Hide Data"
//       ) : (
//         <>
//           <span
//             className="spinner-border spinner-border-sm me-1"
//             role="status"
//             aria-hidden="true"
//           ></span>
//           Loading Data...
//         </>
//       );
//     };

//     return (
//       <div ref={sectionRef} className="card mb-3">
//         <div className="card-header d-flex justify-content-between align-items-center">
//           <h5 className="m-0">{title}</h5>
//           <button className="btn btn-primary btn-sm" onClick={toggleSection}>
//             {renderButtonContent()}
//           </button>
//         </div>
//         {isOpen && (
//           <div className="card-body">
//             {loadedSections[section] ? (
//               children
//             ) : (
//               <div className="spinner-border text-primary" />
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   useEffect(() => {
//     if (selectStrategyType === "ChartingPlatform") {
//       setShowReportSections(true);
//       setOpenSection("overview");
//       setLoadedSections(prev => ({
//         ...prev,
//         overview: true
//       }));
//     }
//   }, [selectStrategyType, activeTab, FromDate, ToDate]);

//   const getColumnsForStrategy = () => {
//     switch (selectStrategyType) {
//       case "Scalping":
//         return columns();
//       case "Option Strategy":
//         return columns1();
//       case "Pattern":
//         return columns2();
//       case "ChartingPlatform":
//         return getColumns10();
//       default:
//         return columns();
//     }
//   };

//   const hasSubmittedRef = useRef(false);

//   useEffect(() => {
//     const autoSubmitIfNeeded = async () => {
//       if (
//         !hasSubmittedRef.current &&
//         location?.state?.goto === "dashboard" &&
//         selectedRowData
//       ) {
//         hasSubmittedRef.current = true;
//         await handleSubmit();
//       }
//     };

//     autoSubmitIfNeeded();
//   }, [selectedRowData, location?.state?.goto]);

//   return (
//     <Content
//       Page_title={"📊 Trade History "}
//       button_status={false}
//       backbutton_status={true}
//     >
//       <div className="iq-card-body">
//         <div className="">
//           <div className="row g-3 mb-4">
//             <div className="col-12 col-md-6 col-lg-6">
//               <div className="d-flex  report-btns">
//                 <ul
//                   className="nav nav-pills shadow rounded-pill p-1"

//                 >
//                   {strategyNames.map((type, index) => (
//                     <li className="nav-item" key={index}>
//                       <button
//                         className={`nav-link ${selectStrategyType === type ? "active" : ""
//                           } rounded-pill`}
//                         onClick={() => {
//                           setStrategyType(type);
//                           sessionStorage.setItem("StrategyType", type);
//                         }}
//                         style={{
//                           padding: "10px 20px",
//                           margin: "5px",
//                           border: "none",
//                           outline: "none",
//                         }}
//                       >
//                         {type}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//             </div>


//             <div className="col-12 col-md-6 col-lg-6">
//               <div className="history-page-dates">
//                 <div className="row align-items-end g-2">
//                   <div className="col-12 col-md-4 mb-2 mb-md-0">
//                     <div className="form-group">
//                       <label className="form-label">Strategy Tag</label>
//                       <select
//                         className="form-control"
//                         value={selectedStrategyTag}
//                         onChange={e => setSelectedStrategyTag(e.target.value)}
//                       >
//                         <option value="All">All</option>
//                         {strategyTagOptions.map((tag, idx) => (
//                           <option key={idx} value={tag}>{tag}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-12 col-md-4 mb-2 mb-md-0">
//                     <div className="form-group">
//                       <label className="form-label">Select From Date</label>
//                       <DatePicker
//                         className="form-control"
//                         selected={FromDate || formattedDate}
//                         onChange={setFromDate}
//                         dateFormat="dd/MM/yyyy"
//                       />
//                     </div>
//                   </div>

//                   <div className="col-12 col-md-4">
//                     <div className="form-group">
//                       <label className="form-label">Select To Date</label>
//                       <DatePicker
//                         className="form-control"
//                         selected={ToDate || Default_To_Date}
//                         onChange={setToDate}
//                         dateFormat="dd/MM/yyyy"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {selectStrategyType === "Scalping" ? (
//             <div className="mb-4">
//               {/* <h5 className="card-title">Scalping</h5> */}
//               {tradeHistory.data1?.length > 0 ? (
//                 <>
//                   <GridExample
//                     columns={getColumnsForStrategy()}
//                     data={tradeHistory.data1}
//                     onRowSelect={handleRowSelect}
//                     checkBox={true}
//                     isChecked={checkedRows}
//                   />
//                   <div className="d-grid gap-2">
//                     <button
//                       className="addbtn hoverNone"
//                       onClick={handleSubmit}
//                       disabled={!selectedRowData}
//                     >
//                       📜 Generate History
//                     </button>
//                   </div>
//                 </>
//               ) : null}
//             </div>
//           ) : (
//             <div className="mb-4">
//               {/* <h5>{selectStrategyType}</h5> */}
//               {selectStrategyType === "ChartingPlatform" && (
//                 <div className="container">
//                   <div className="d-flex justify-content-center">
//                     <ul
//                       className="nav nav-pills shadow rounded-pill p-1"

//                     >
//                       <li className="nav-item">
//                         <button
//                           className={`nav-link ${activeTab === "Cash" ? "active" : ""
//                             } rounded-pill`}
//                           onClick={() => setActiveTab("Cash")}
//                           style={{
//                             padding: "10px 20px",
//                             margin: "5px",
//                             border: "none",
//                             outline: "none",
//                           }}
//                         >
//                           Cash
//                         </button>
//                       </li>
//                       <li className="nav-item">
//                         <button
//                           className={`nav-link ${activeTab === "Future" ? "active" : ""
//                             } rounded-pill`}
//                           onClick={() => setActiveTab("Future")}
//                           style={{
//                             padding: "10px 20px",
//                             margin: "5px",
//                             border: "none",
//                             outline: "none",
//                           }}
//                         >
//                           Future
//                         </button>
//                       </li>
//                       <li className="nav-item">
//                         <button
//                           className={`nav-link ${activeTab === "Option" ? "active" : ""
//                             } rounded-pill`}
//                           onClick={() => setActiveTab("Option")}
//                           style={{
//                             padding: "10px 20px",
//                             margin: "5px",
//                             border: "none",
//                             outline: "none",
//                           }}
//                         >
//                           Option
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               )}
//               {selectStrategyType === "ChartingPlatform" ? null : (
//                 tradeHistory.data?.length > 0 ? null : <><NoDataFound /><style>{`.addbtn { display: none; }`}</style></>
//               )}
//               {(
//                 selectStrategyType === "ChartingPlatform"
//                   ? getChartingData?.length > 0
//                   : tradeHistory.data?.length
//               ) ? (
//                 <>
//                   {selectStrategyType !== "ChartingPlatform" &&
//                     <GridExample
//                       columns={getColumnsForStrategy()}
//                       data={
//                         selectStrategyType === "ChartingPlatform"
//                           ? getChartingData
//                           : tradeHistory.data
//                       }
//                       onRowSelect={handleRowSelect}
//                       checkBox={
//                         selectStrategyType === "ChartingPlatform" ? false : true
//                       }
//                       isChecked={checkedRows}
//                     />}
//                   {selectStrategyType !== "ChartingPlatform" && (
//                     <div className="d-grid gap-2">
//                       <button
//                         className="addbtn hoverNone"
//                         onClick={handleSubmit}
//                         disabled={!selectedRowData}
//                       >
//                         📜 Generate History
//                       </button>
//                     </div>
//                   )}
//                 </>
//               ) : null}
//             </div>
//           )}
//           {showReportSections && (
//             <div className="mt-5">
//               {/* AnalyticsOverview Section */}

//               <ReportSection title="Total Profit/Loss Overview" section="overview">
//                 <div
//                   className="pnl-overview"
//                   style={{
//                     color: "#fff",
//                     padding: "20px",
//                     borderRadius: "8px",
//                     textAlign: "center",
//                     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                     marginBottom: "20px",
//                   }}
//                 >
//                   <h4
//                     style={{
//                       margin: 0,
//                       fontSize: "1.75rem",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     💰 Total PnL: ₹
//                     <span
//                       className="badge ms-2"
//                       style={{
//                         backgroundColor:
//                           getAllTradeData.Overall[0]?.PnL > 0
//                             ? "#008000"
//                             : "#B22222",
//                         color: "white",
//                         padding: "8px 15px",
//                         borderRadius: "5px",
//                         fontSize: "1.25rem",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {getAllTradeData.Overall[0]?.PnL?.toFixed(2) || "0.00"}
//                     </span>
//                   </h4>
//                 </div>


//                 <GridExample
//                   columns={columns3(selectStrategyType)}
//                   data={
//                     (selectStrategyType !== "ChartingPlatform" || selectedStrategyTag === "All")
//                       ? getAllTradeData.data
//                       : getAllTradeData.data.filter(item => item.StrategyTag === selectedStrategyTag)
//                   }
//                   // data = {getAllTradeData.data}
//                   checkBox={false}
//                 />
//               </ReportSection>


//               <ReportSection title="Analytics Overview" section="AnalyticsOverview">
//                 {AnalyticsOverview.data?.length > 0 ? (
//                   <div className="analytics-overview">
//                     <div className="row">
//                       {Object.entries(AnalyticsOverview.data[0]).map(([key, value]) => (
//                         <div className="col-md-4 mb-3" key={key}>
//                           <div className="card modern-card-shadow">
//                             <div className="card-body text-center">
//                               <h6 className="card-text-Color">{key}</h6>
//                               <h5 className="card-text-Color">
//                                 {value !== null ? value : "N/A"}
//                               </h5>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ) : (
//                   <NoDataFound />
//                 )}
//               </ReportSection>

//               {/* Profit/Loss Overview Section */}


//               <ReportSection title="Profit/Loss Analysis" section="pnlAnalysis">
//                 <ProfitAndLossGraph data={getPnLData.data} />
//               </ReportSection>
//               <ReportSection title="Equity Curve Analysis" section="equity">
//                 <div style={{ height: "350px", overflow: "hidden" }}>
//                   <ChartComponent data={getEquityCurveDetails.data} />
//                 </div>
//                 <GridExample
//                   columns={columns5(selectStrategyType)}
//                   data={getEquityCurveDetails.data}
//                   checkBox={false}
//                 />
//               </ReportSection>
//               <ReportSection title="Drawdown Analysis" section="drawdown">
//                 <div style={{ height: "350px", overflow: "hidden" }}>
//                   <DrawdownChartComponent data={getDropDownData.data} />
//                 </div>
//                 <GridExample
//                   columns={columns6()}
//                   data={getDropDownData.data}
//                   checkBox={false}
//                 />
//               </ReportSection>
//               <ReportSection title="Top Trades Analysis" section="trades">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="card h-100">
//                       <div
//                         className="card-header text-white"
//                         style={{ backgroundColor: "#006400" }}
//                       >
//                         💹 Top Profitable Trades
//                       </div>
//                       <div className="card-body">
//                         {getFiveProfitTrade.data && getFiveProfitTrade.data.length > 0 ? (
//                           <ApexCharts
//                             options={getChartOptions(
//                               getFiveProfitTrade.data,
//                               "Profit"
//                             )}
//                             series={getFiveProfitTrade.data.map((t) => t.PnL)}
//                             type="pie"
//                             height={350}
//                           />
//                         ) : (
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                               textAlign: "center",
//                               marginBottom: "150px",
//                               marginTop: "150px",
//                             }}>
//                             <img
//                               src="/assets/images/no-record-found.png"
//                               width="50%"
//                               alt="No records found"
//                             />
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="card h-100">
//                       <div
//                         className="card-header text-white"
//                         style={{ backgroundColor: "#8B0000" }}
//                       >
//                         📉 Top Loss-Making Trades
//                       </div>
//                       <div className="card-body">
//                         {getFiveLossTrade.data && getFiveLossTrade.data.length > 0 ? (
//                           <ApexCharts
//                             options={getChartOptions(
//                               getFiveLossTrade.data,
//                               "Loss"
//                             )}
//                             series={getFiveLossTrade.data.map((t) =>
//                               Math.abs(t.PnL)
//                             )}
//                             type="pie"
//                             height={350}
//                           />
//                         ) : (<div
//                           style={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             textAlign: "center",
//                             marginBottom: "150px",
//                             marginTop: "150px",
//                           }}>
//                           <img
//                             src="/assets/images/no-record-found.png"
//                             width="50%"
//                             alt="No records found"
//                           />
//                         </div>

//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </ReportSection>
//             </div>
//           )}
//         </div>
//       </div>
//     </Content>
//   );
// };

// const getChartOptions = (data, type) => ({
//   chart: { type: "pie" },
//   labels: data.map((t) => t.ETime.split(" ")[1].substring(0, 5)),

//   colors:
//     type === "Profit"
//       ? [
//         "#22c55e", // Emerald Green
//         "#3b82f6", // Blue
//         "#10b981", // Teal
//         "#6366f1", // Indigo
//         "#f59e0b"  // Amber
//       ]
//       : [
//         "#b91c1c", // Dark Red
//         "#dc2626", // Red
//         "#991b1b", // Deeper Red
//         "#7f1d1d", // Blood Red
//         "#450a0a"  // Near-Black Red
//       ],

//   legend: { position: "bottom" },
//   dataLabels: { enabled: true },
//   tooltip: {
//     y: {
//       formatter: (value) => `₹${value.toFixed(2)}`,
//     },
//   },
// });


// export default Tradehistory;
