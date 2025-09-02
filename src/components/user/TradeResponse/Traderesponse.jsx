import React, { useState, useEffect } from "react";
import { get_User_Data } from "../../CommonAPI/Admin";
import {
  ChartingPlatformsegment,
  get_Trade_Response,
  getChargingPlatformDataApiForSegments,
  getStrategyType,
} from "../../CommonAPI/User";
import GridExample from "../../../ExtraComponent/CommanDataTable(original)";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

import {
  columns2,
  columns1,
  columns6,
  columns8,
  goldenstrategy_tradehistory
} from "./TradeReponseColumn";
import { useLocation } from "react-router-dom";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import Content from "../../../ExtraComponent/Content";
import TradeResponseCard from "./TradeResponseCard";

const TradeResponse = () => {
  const location = useLocation();

  const StrategyType = sessionStorage.getItem("StrategyType");

  const Username = localStorage.getItem("name");

  const [selectStrategyType, setSelectStrategyType] = useState(
    StrategyType || "ChartingPlatform"
  );

  const [strategyType, setStrategyType] = useState([]);

  const [tradeHistory, setTradeHistory] = useState({
    loading: true,
    data: [],
    data1: [],
  });
  const [selectedRowData, setSelectedRowData] = useState("");
  const [ToDate, setToDate] = useState("");
  const [FromDate, setFromDate] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [selectSegmentType, setSegmentType] = useState("");
  const [getAllTradeData, setAllTradeData] = useState({
    loading: true,
    data: [],
  });
  const [getChartingSegments, setChartingSegments] = useState([]);
  const [getCharting, setGetCharting] = useState([]);
  const [tableType, setTableType] = useState("Scalping");
  const [activeTab, setActiveTab] = useState("Cash");
  const [getChartingSegmentData, setChartingSegmentData] = useState([]);

  const [preSelectTableType, setPreSelectTableType] = useState("");

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

  useEffect(() => {
    if (selectSegmentType) getChartingScript();
  }, [selectSegmentType]);

  useEffect(() => {
    if (selectSegmentType) getChartingScript();
  }, [selectSegmentType]);

  useEffect(() => {
    if (selectStrategyType == "ChartingPlatform") fetchChartingSegments();
  }, [selectStrategyType]);

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

  const columnsToRender = () => {
    switch (selectStrategyType) {
      case "Scalping":
        return columns6;
      case "Option Strategy":
        return columns1;
      case "Pattern":
        return columns2;
      case "ChartingPlatform":
        return columns8;
        case "GoldenStrategy":
        return goldenstrategy_tradehistory;
      default:
        return columns6;
    }
  };
  const GetTradeStrategyType = async () => {
    try {
      const res = await getStrategyType();

      if (res) {
        setStrategyType(res.Data);
      }
    } catch (error) {
      setStrategyType([]);
    }
  };

  const GetTradeResposne = async () => {
    const data = {
      Data:
        selectStrategyType == "GoldenStrategy"
          ? "Golden Strategy"
          : selectStrategyType,
      Username: Username,
      From_date: convertDateFormat(FromDate || formattedDate),
      To_date: convertDateFormat(ToDate || Defult_To_Date),
    };

    // GET TRADEHISTORY
    await get_User_Data(data)
      .then((response) => {
        if (response.Status) {


          const filterLiveTrade = response.Data?.filter((item) => {
            return item.TradeExecution == "Live Trade";
          });
          const filterLiveTrade1 =
            selectStrategyType !== "Scalping"
              ? response?.Data?.filter(
                  (item) => item.TradeExecution === "Live Trade"
                )
              : response?.NewScalping?.filter(
                  (item) => item.TradeExecution === "Live Trade"
                );



          setTradeHistory({
            loading: false,
            data: filterLiveTrade,
            data1: filterLiveTrade1,
          });
        } else {
          setTradeHistory({
            loading: false,
            data: [],
            data1: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the user data", err);
      });
  };

  useEffect(() => {
    GetTradeResposne();
  }, [selectStrategyType, FromDate, ToDate]);

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

  useEffect(() => {
    fetchChartingSegments();
  }, []);

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
    setSelectedRowData((prevSelected) => {
      // Toggle selection if the same row is clicked again
      if (prevSelected?.Token === rowData?.Token) {
        return null;
      }
      return rowData;
    });
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
      setSelectStrategyType(StrategyType || location?.state?.type);
    } else if (location?.state?.type == "MultiCondition") {
      setTableType("MultiCondition");
      setSelectStrategyType(StrategyType || "CharetingPlatform");
    }
  }, [preSelectTableType]);

  const getSegmentDataForCharting = async () => {
    try {
      const req = {
        MainStrategy: "ChartingPlatform",
        Strategy: activeTab,
        Symbol: "",
        Username: Username,
        ETPattern: "",
        Timeframe: "",
        From_date: convertDateFormat(FromDate || formattedDate),
        To_date: convertDateFormat(ToDate || Defult_To_Date),
        Group: "",
        TradePattern: "",
        PatternName: "",
      };
      const res = await get_Trade_Response(req);

      setChartingSegmentData(res?.Data || []);
    } catch (error) {}
  };
  useEffect(() => {
    getSegmentDataForCharting();
  }, [activeTab]);

  const handleSubmit = async () => {
    console.log("selectedRowData",selectStrategyType, selectedRowData.STG);

    const data = {
      MainStrategy:
        selectStrategyType == "Scalping" &&
        selectedRowData?.ScalpType == "Multi_Conditional"
          ? "NewScalping"
          : selectStrategyType == "GoldenStrategy" ||
            selectStrategyType == "Golden Strategy"
          ? "Golden Strategy"
          : selectStrategyType,
      Strategy:
        selectStrategyType == "Scalping" &&
        selectedRowData?.ScalpType != "Multi_Conditional"
          ? selectedRowData?.ScalpType || ""
          : selectStrategyType == "Option Strategy"
          ? selectedRowData?.STG || ""
          : selectStrategyType == "Pattern"
          ? selectedRowData?.TradePattern || ""
          : selectStrategyType == "Scalping" &&
            selectedRowData?.ScalpType == "Multi_Conditional"
          ? selectedRowData?.Targetselection || ""
          : selectStrategyType == "ChartingPlatform" &&
            (selectedRowData?.Optiontype == " " ||
              selectedRowData?.Optiontype == "")
          ? "Cash"
          : selectStrategyType == "ChartingPlatform" &&
            selectedRowData?.Optiontype == "SX"
          ? "Future"
          :  selectStrategyType == "Golden Strategy" || selectStrategyType == "GoldenStrategy"
          ? selectedRowData?.STG
          : "Option",
      Symbol:
        selectStrategyType == "Scalping" || selectStrategyType == "Pattern"
          ? selectedRowData?.Symbol || ""
          : selectStrategyType == "Option Strategy"
          ? selectedRowData?.IName || ""
          : selectStrategyType == "ChartingPlatform"
          ? selectedRowData?.TSymbol || ""
          : "",
      Username: Username,
      ETPattern:
        selectStrategyType == "Scalping"
          ? ""
          : selectStrategyType == "Option Strategy"
          ? selectedRowData?.Targettype || ""
          : selectStrategyType == "Pattern"
          ? selectedRowData?.Pattern || ""
          : "",
      Timeframe:
        selectStrategyType == "Pattern" ? selectedRowData?.TimeFrame || "" : "",
      From_date: convertDateFormat(FromDate || formattedDate),
      To_date: convertDateFormat(ToDate || Defult_To_Date),
      Group:
        selectStrategyType == "Scalping" ||
        selectStrategyType == "Option Strategy"
          ? selectedRowData?.GroupN || ""
          :  selectStrategyType == "Golden Strategy" || selectStrategyType == "GoldenStrategy"
          ? selectedRowData?.GroupN 
          : "",
      TradePattern: "",
      PatternName: "",
    };



    await get_Trade_Response(data)
      .then((response) => {
        if (response.Status) {
          setAllTradeData({
            loading: false,
            data: response.Data || [],
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
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the All TradeData", err);
      });
  };

  useEffect(() => {
    setSelectStrategyType(StrategyType || "ChartingPlatform");
    GetTradeStrategyType();
  }, []);

  useEffect(() => {
    setShowTable(false);
  }, [
    selectStrategyType,
    FromDate,
    ToDate,
    selectedRowData,
    selectSegmentType,
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedData = getAllTradeData.data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(getAllTradeData.data.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Content
      Page_title={"📢 Trade Response"}
      button_status={false}
      backbutton_status={true}
    >
      <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item active" aria-current="page">Trade Response</li>
  </ol>
</nav>
      <div className="iq-card-body">
        <div className="was-validated ">
          <div className="row g-3 mb-4">
                <div className="col-12 col-md-12">
              <div className="d-flex  report-btns justify-content-center">
                <ul className="nav nav-tabs justify-content-center border-bottom rounded-0">
                  {(strategyType || []).map((type, index) => (
                    <li className="nav-item" key={index}>
                      <a
                        className={`nav-link mx-lg-3 ${
                          selectStrategyType === type ? "active" : ""
                        } `}
                        onClick={() => {
                          setSelectStrategyType(type);
                          sessionStorage.setItem("StrategyType", type);
                        }}
                       
                      >
                        {type}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
             <div className="col-12 col-md-12">
              <div className="history-page-dates justify-content-center card-bg-color">
                <div className="history-page-dates ">
                  <div
                    className={`form-group mb-2 ${
                      selectStrategyType === "ChartingPlatform"
                        ? "col-lg-6"
                        : "col-lg-6"
                    }`}
                  >
                    <label>Select From Date</label>
                    <DatePicker
                      className="form-select"
                      selected={FromDate === "" ? formattedDate : FromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </div>

                  {/* Select To Date */}
                  <div
                    className={`form-group mb-2 ${
                      selectStrategyType === "ChartingPlatform"
                        ? "col-lg-6"
                        : "col-lg-6"
                    }`}
                  >
                    <label>Select To Date</label>
                    <DatePicker
                      className="form-select"
                      selected={ToDate === "" ? Defult_To_Date : ToDate}
                      onChange={(date) => setToDate(date)}
                    />
                  </div>
                </div>
              </div>
            </div>
        
           
          </div>

          <div className="modal-body">
            {tableType === "Scalping" && (
              <>
                <div className="iq-header-title">
                  {/* <h4 className="card-title">{selectStrategyType}</h4> */}
                  {selectStrategyType === "ChartingPlatform" && (
                    <div className="container">
                      {/* Tab Navigation */}
                      <div className="d-flex justify-content-center">
                        <ul
                          className="nav nav-pills shadow rounded-pill p-1"
                          // style={{ marginTop: "-40px" }}
                        >
                          {getChartingSegments.map((segment) => (
                            <li className="nav-item" key={segment}>
                              <button
                                className={`nav-link ${
                                  activeTab === segment ? "active" : ""
                                } rounded-pill`}
                                onClick={() => setActiveTab(segment)}
                                style={{
                                  padding: "6px 12px", // Smaller pill size
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
                  )}
                </div>
                {getCharting.length > 0 ||
                tradeHistory?.data.length > 0 ||
                getChartingSegmentData?.length > 0 ? (
                  <div>
                    <GridExample
                      columns={columnsToRender()}
                      data={
                        selectStrategyType === "ChartingPlatform"
                          ? getChartingSegmentData
                          : tradeHistory?.data1 || []
                      }
                      onRowSelect={handleRowSelect}
                      checkBox={true}
                      isChecked={(row) => selectedRowData?.Token === row?.Token} // Ensure proper synchronization
                    />
                  </div>
                ) : (
                  <NoDataFound />
                )}
              </>
            )}
          </div>

          {tableType === "MultiCondition" &&
            selectStrategyType === "Scalping" && (
              <div>
                <div className="iq-header-title mt-4">
                  {/* <h3 className="card-title">Scalping</h3> */}
                </div>
                <div className="modal-body">
                  {tradeHistory?.data1 && tradeHistory?.data1.length > 0 ? (
                    <GridExample
                      columns={columns6}
                      data={tradeHistory?.data1}
                      onRowSelect={handleRowSelect}
                      checkBox={true}
                      isChecked={(row) => selectedRowData?.Token === row?.Token} // Ensure proper synchronization
                    />
                  ) : (
                    <NoDataFound />
                  )}
                </div>
              </div>
            )}

          {!(
            selectStrategyType === "Scalping" && tableType === "MultiCondition"
          ) &&
            ((selectStrategyType === "ChartingPlatform" &&
              getCharting?.length > 0) ||
              tradeHistory?.data?.length > 0) && (
              <button className="btn btn-primary mt-2" onClick={handleSubmit}>
                Submit
              </button>
            )}

          {showTable && (
            <div className="mt-3">
              {getAllTradeData.data && getAllTradeData.data.length > 0 ? (
                <div className="row g-3">
                  {paginatedData.map((item, index) => (
                    <div className="col-md-6" key={index}>
                      <TradeResponseCard
                        data={
                          typeof item === "object" && item !== null ? item : {}
                        }
                        index={(currentPage - 1) * itemsPerPage + index} // Continuous numbering
                      />
                    </div>
                  ))}

                  <nav aria-label="Pagination">
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <li
                            key={page}
                            className={`page-item ${
                              currentPage === page ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          </li>
                        )
                      )}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              ) : (
                <NoDataFound />
              )}
            </div>
          )}
        </div>

        {selectStrategyType === "Scalping" &&
          tableType === "MultiCondition" &&
          tradeHistory.data1?.length > 0 && (
            <button className="btn btn-primary mt-2" onClick={handleSubmit}>
              Submit
            </button>
          )}
      </div>
    </Content>
  );
};

export default TradeResponse;
