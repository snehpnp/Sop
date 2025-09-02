import React, { useState, useEffect } from "react";
import {
  getNetPnLData,
  getStrategyType,
} from "../../CommonAPI/User";
import GridExample from "../../../ExtraComponent/CommanDataTable";
import DatePicker from "react-datepicker";
import {
  columns,
  columns1,
  columns2,
  columns3,
  columns4,
  columns5,
  columns6,
  columns7,
} from "./PnLColumn";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import Content from "../../../ExtraComponent/Content";
import NoDataFound from "../../../ExtraComponent/NoDataFound";

const Tradehistory = () => {
  const location = useLocation();
  const StrategyType = sessionStorage.getItem("StrategyType");

  const [selectStrategyType, setStrategyType] = useState(
    StrategyType || "ChartingPlatform"
  );

  const [tableType, setTableType] = useState("MultiCondition");
  const [activeTab, setActiveTab] = useState("Cash");

  const [strategyNames, setStrategyNames] = useState([]);
  const [ToDate, setToDate] = useState("");
  const [FromDate, setFromDate] = useState("");
  const [getPnLData, setPnlData] = useState({
    loading: true,
    data: [],
    data1: [],
    data2: [],
  });
  const [getFilteredPnlData, setFilteredPnlData] = useState([]);
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

  const handleSubmit = async () => {
    const data = {
      MainStrategy:
        selectStrategyType === "Scalping" ? "NewScalping" : selectStrategyType == "GoldenStrategy" ? "Golden Strategy" : selectStrategyType,
      Username: Username,
      From_date: convertDateFormat(FromDate == "" ? formattedDate : FromDate),
      To_date: convertDateFormat(ToDate == "" ? Defult_To_Date : ToDate),
    };

    //GET PNL DATA
    await getNetPnLData(data)
      .then((response) => {
        if (response?.Status) {
          setPnlData({
            loading: false,
            data: response.data,
            data1: response.Overall,
            data2: response.TotalPnL,
          });
        } else {
          Swal.fire({
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "No Records found",
            icon: "info",
            text: response.message,
            timer: 1500,
            timerProgressBar: true,
          });
          setPnlData({
            loading: false,
            data: [],
            data1: [],
            data2: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the user data", err);
      });
  };
  const fetchStrategyType = async () => {
    const res = await getStrategyType();
    setStrategyNames(res.Data);
  };

  useEffect(() => {
    handleSubmit();
  }, [selectStrategyType, activeTab, FromDate, ToDate]);

  useEffect(() => {
    const filteredData = getPnLData?.data1?.filter(
      (item) => item.Segment === activeTab
    );
    setFilteredPnlData(filteredData);
  }, [activeTab]);

  useEffect(() => {
    if (location?.state?.type && location?.state?.type != "MultiCondition") {
      setStrategyType(StrategyType || location?.state?.type);
      handleSubmit(); // Auto-submit when location.state is present
    } else if (location?.state?.type == "MultiCondition") {
      setStrategyType(StrategyType || "ChartingPlatform");
      handleSubmit(); // Auto-submit when location.state is present
    }
  }, []);

  useEffect(() => {
    fetchStrategyType();
  }, []);

  return (
    <Content
      Page_title="💰 Net P&L"
      button_status={false}
      backbutton_status={true}>
      <nav aria-label="breadcrumb"> 
        <ol className="breadcrumb">
          {/* <li className="breadcrumb-item"><a href="#">Home</a></li> */}
          <li className="breadcrumb-item active" aria-current="page">Net P&L</li>
        </ol>
      </nav>
      <div className="iq-card-body">
        <div className="was-validated ">
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-12 col-lg-12">
              <div className="d-flex  report-btns justify-content-center">
                <ul
                  className="nav nav-tabs justify-content-center border-bottom rounded-0"
                >
                  {strategyNames.map((type, index) => (
                    <li className="nav-item" key={index}>
                      <a
                        className={`nav-link ${selectStrategyType === type ? "active" : ""} `}
                        onClick={() => {
                          setStrategyType(type);
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
            <div className="col-12 col-md-12 col-lg-12 mt-3">
              <div className="history-page-dates  justify-content-center card-bg-color">
                <div className="history-page-dates">
                  <div
                    className={`form-group ${selectStrategyType === "ChartingPlatform"
                      ? "col-lg-6"
                      : "col-lg-6"
                      }`}>
                    <label>Select From Date</label>
                    <DatePicker
                      className="form-select"
                      selected={FromDate === "" ? formattedDate : FromDate}
                      onChange={(date) => setFromDate(date)}
                    />
                  </div>

                  {/* Select To Date */}
                  <div
                    className={`form-group ${selectStrategyType === "ChartingPlatform"
                      ? "col-lg-6"
                      : "col-lg-6"
                      }`}>
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
        </div>

        {/* <button className="addbtn  ms-2 mt-2" onClick={handleSubmit}>
          Submit
        </button> */}

        {getPnLData.data1 && getPnLData.data1.length > 0 ? (
          <>
            <p
              className="bold mt-4"
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "black",
              }}>
              Total Profit and Loss :{" "}
              <span
                style={{
                  color: getPnLData.data2 < 0 ? "red" : "green",
                }}>
                {getPnLData.data2.toFixed(2)}
              </span>
            </p>
            <div className="mt-3">
              <GridExample
                columns={
                  selectStrategyType == "Scalping"
                    ? columns1()
                    : selectStrategyType == "Pattern"
                      ? columns3()
                      : selectStrategyType == "ChartingPlatform"
                        ? columns6()
                        : columns5()
                }
                data={getPnLData.data1}
                checkBox={false}
              />
            </div>
          </>
        ) : (
          <NoDataFound />
        )}
      </div>
    </Content>
  );
};

export default Tradehistory;
