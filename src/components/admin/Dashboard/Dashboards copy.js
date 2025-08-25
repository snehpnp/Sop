import React, { useState, useEffect } from "react";
import {
  GetAdminDashboard,
  AdmindashboardGraph,
  AdmindashboardData,
  GetAdminDashboardClient,
  GetAdminDashboardTrade,
} from "../../CommonAPI/Admin";
import Loader from "../../../ExtraComponent/Loader";
import { createRoot } from "react-dom/client";
import { AgCharts } from "ag-charts-react";
import { AgChartsReact } from "ag-charts-react";
import AdminDashboardChart from "../AdvanceChart/AdminDashboardChart";
import Content from "../../../ExtraComponent/Content";

const Dashboards = () => {
  const [dashData, setData] = useState({
    loading: false,
    data: [],
  });
  const [Data2, setData2] = useState({
    data: "",
    data1: "",
  });
  const [Data1, setData1] = useState({
    loading: true,
    data: [],
  });

  const [Data3, setData3] = useState({
    loading: true,
    data3: [],
  });

  const [Data4, setData4] = useState({
    loading: true,
    data4: [],
  });


  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };

  const getOneMonthAgoDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };


  const [fromDate, setFromDate] = useState(getOneMonthAgoDate());
  const getNextDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };

  const [toDate, setToDate] = useState(getNextDate());


  
  const getCurrentDate1 = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };

  const getOneMonthAgoDate1 = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };

  const [fromDate1, setFromDate1] = useState(getOneMonthAgoDate1());
  const [toDate1, setToDate1] = useState(getNextDate());


   const formatDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}.${month}.${day}`;
  };




  const options = {
    data: Data1 && Data1.data,
    series: [{ type: "bar", xKey: "ServiceStartDate", yKey: "Credit Use" }],
    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Service Start Date",
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "Credit Use",
        },
      },
    ],
    zoom: {
      enabled: true,
    },
  };

  // const GetAdminDashboardData = async () => {
  //   await GetAdminDashboard()
  //     .then((response) => {
  //       if (response.Status) {
  //         setData({
  //           loading: false,
  //           data: response.Data,
  //         });
  //       } else {
  //         setData({
  //           loading: false,
  //           data3: [],
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //     });
  // };

  const GetAdminDashboardClientDetails = async () => {
    const req = {
      From_date: formatDate(new Date(fromDate)), 
      To_date: formatDate(new Date(toDate)),     
    };
  
    await GetAdminDashboardClient(req) // Ensure the API function accepts a body
      .then((response) => {
  
        if (response.Status) {
          setData3({
            loading: false,
            data3: response.Data,
          });
        } else {
          setData3({
            loading: false,
            data3: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in fetching the Dashboard Details", err);
      });
  };

  const GetAdminDashboardTradeDetails = async () => {
    const req = {
      From_date: formatDate(new Date(fromDate1)), // Apply formatDate
      To_date: formatDate(new Date(toDate1)),    // Apply formatDate
    };
  
    await GetAdminDashboardTrade(req) // Ensure the API function accepts a body
      .then((response) => {
  
        if (response.Status) {
          setData4({
            loading: false,
            data4: response.Data,
          });
        } else {
          setData4({
            loading: false,
            data4: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in fetching the Dashboard Details", err);
      });
  };
  







  // useEffect(() => {
  //   GetAdminDashboardData();
  // }, []);
  useEffect(() => {
    if (fromDate && toDate) {
      const delayDebounceFn = setTimeout(() => {
        GetAdminDashboardClientDetails();
      }, 500); // 500ms delay
  
      return () => clearTimeout(delayDebounceFn); // Cleanup function to prevent multiple calls
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    if (fromDate1 && toDate1) {
      const delayDebounceFn = setTimeout(() => {
        GetAdminDashboardTradeDetails();
      }, 500); // 500ms delay
  
      return () => clearTimeout(delayDebounceFn); // Cleanup function to prevent multiple calls
    }
  }, [fromDate1, toDate1]);




  const GetDashboardGraphData = async () => {
    await AdmindashboardGraph()
      .then((response) => {
        if (response.Status) {
          setData2({
            loading: false,
            data: response.TotalAccount,
            data1: response.ammount,
          });
        } else {
          setData2({
            loading: false,
            data: "",
            data1: "",
          });
        }
      })
      .catch((err) => {
        console.log("Error in fatching the Dashboard Details", err);
      });
  };

  const GetDashboardData = async () => {
    await AdmindashboardData()
      .then((response) => {
        if (response.Status) {
          setData1({
            loading: false,
            data: response.Data,
          });
        } else {
          setData1({
            loading: false,
            data: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in fatching the Dashboard Details", err);
      });
  };

  useEffect(() => {
    GetDashboardGraphData();
    GetDashboardData();
  }, []);

  return (
    <Content
      Page_title="📈 Dashboard"
      button_status={false}
      backbutton_status={false}
    >
      <div>
        {dashData.loading ? (
          <Loader />
        ) : (
          <div className="container-fluid" >
            <div className="row align-items-center">
              <div className="col-md-6 mb-3">
                <label htmlFor="fromDate" className="form-label card-text-Color">
                  Select From Date
                </label>
                <input
                  type="date"
                  id="fromDate"
                  className="form-control"
                  onChange={(e) => setFromDate(e.target.value)}
                  value={fromDate}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="toDate" className="form-label card-text-Color">
                  Select To Date
                </label>
                <input
                  type="date"
                  id="toDate"
                  className="form-control"
                  onChange={(e) => setToDate(e.target.value)}
                  value={toDate}
                />
              </div>
            </div>


            <div className="row">
              <div className="col-sm-12">
                <div className="row ">
                  <div className="col-lg-4 ">
                    <div className="iq-card borderColor">
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "40%" }}
                        ></div>
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          aria-valuenow={20}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "20%" }}
                        ></div>
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          aria-valuenow={10}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "10%" }}
                        ></div>
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "40%" }}
                        ></div>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          aria-valuenow={20}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "20%" }}
                        ></div>
                        <div
                          className="progress-bar bg-secondary"
                          role="progressbar"
                          aria-valuenow={10}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                      <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                          <h3 className="card-title">Live Account</h3>
                        </div>
                      </div>

                      <div className="iq-card-body p-2">
                        <div className="table-responsive  ">
                          <table className="table mb-0 table-borderless bg-transparent">
                            <tbody>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-online mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Total: </h6>
                                </td>
                                <td>
                                  <span className="">
                                    {Data3?.data3[0]?.Total_Live_Account}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-blue mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Active: </h6>
                                </td>
                                <td>
                                  <span className="">
                                    {Data3?.data3[0]?.Active_Live_Account}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-primary mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Expired: </h6>
                                </td>
                                <td>
                                  <span className="">
                                    {Data3?.data3[0]?.Expired_Live_Account}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="iq-card borderColor">
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "40%" }}
                        ></div>
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          aria-valuenow={20}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "20%" }}
                        ></div>
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          aria-valuenow={10}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "10%" }}
                        ></div>
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "40%" }}
                        ></div>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          aria-valuenow={20}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "20%" }}
                        ></div>
                        <div
                          className="progress-bar bg-secondary"
                          role="progressbar"
                          aria-valuenow={10}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                      <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                          <h3 className="card-title">Free Demo Account</h3>
                        </div>
                      </div>
                      <div className="iq-card-body p-2">
                        <div className="table-responsive">
                          <table className="table mb-0 table-borderless bg-transparent">
                            <tbody>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-online mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Total:</h6>
                                </td>
                                <td>
                                  <span className="">
                                    {Data3?.data3[0]?.Total_Free_Demo_Account}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-blue mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Active</h6>
                                </td>
                                <td>
                                  <span className="">
                                    {
                                      Data3?.data3[0]
                                        ?.Active_Free_Demo_Account
                                    }
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-primary mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Expired</h6>
                                </td>
                                <td>
                                  <span className="">
                                    {
                                      Data3?.data3[0]
                                        ?.Expired_Free_Demo_Account
                                    }
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="iq-card borderColor">
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "40%" }}
                        ></div>
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          aria-valuenow={20}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "20%" }}
                        ></div>
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          aria-valuenow={10}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "10%" }}
                        ></div>
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "40%" }}
                        ></div>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          aria-valuenow={20}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "20%" }}
                        ></div>
                        <div
                          className="progress-bar bg-secondary"
                          role="progressbar"
                          aria-valuenow={10}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                      <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                          <h3 className="card-title">
                            Three Days Live Account
                          </h3>
                        </div>
                      </div>
                      <div className="iq-card-body p-2">
                        <div className="table-responsive ">
                          <table className="table mb-0 table-borderless bg-transparent">
                            <tbody>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-online mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Total</h6>
                                </td>
                                <td>
                                  <span className="">
                                    {
                                      Data3?.data3[0]
                                        ?.Total_Two_Days_Live_Account
                                    }
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-blue mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Active</h6>
                                </td>
                                <td>
                                  <span className="">
                                    {
                                      Data3?.data3[0]
                                        ?.Active_Two_Days_Live_Account
                                    }
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-primary mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Expired</h6>
                                </td>
                                <td>
                                  <span className="">
                                    {
                                      Data3?.data3[0]
                                        ?.Expired_Two_Days_Live_Account
                                    }
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="fromDate1" className="form-label card-text-Color">
                        Select From Date
                      </label>
                      <input
                        type="date"
                        id="fromDate1"
                        className="form-control"
                        onChange={(e) => setFromDate1(e.target.value)}
                        value={fromDate1}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="toDate1" className="form-label">
                        Select To Date
                      </label>
                      <input
                        type="date"
                        id="toDate1"
                        className="form-control"
                        onChange={(e) => setToDate1(e.target.value)}
                        value={toDate1}
                      />
                    </div>
                  </div> 
                   <div className="col-lg-4">
                    <div className="iq-card borderColor">
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "40%" }}
                        ></div>
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          aria-valuenow={20}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "20%" }}
                        ></div>
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          aria-valuenow={10}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "10%" }}
                        ></div>
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "40%" }}
                        ></div>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          aria-valuenow={20}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "20%" }}
                        ></div>
                        <div
                          className="progress-bar bg-secondary"
                          role="progressbar"
                          aria-valuenow={10}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                      <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                          <h3 className="card-title">
                            Total Trade
                          </h3>
                        </div>
                      </div>
                      <div className="iq-card-body p-2">
                        <div className="table-responsive ">
                          <table className="table mb-0 table-borderless bg-transparent">
                            <tbody>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-online mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Scalping : </h6>
                                </td>
                                <td>
                                  <span className="">
                                  {Data4?.data4[0]?.ScalpingTotalTrade}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-blue mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Option : </h6>
                                </td>
                                <td>
                                  <span className="">
                                  {Data4?.data4[0]?.OptionTotalTrade}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-primary mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Pattern : </h6>
                                </td>
                                <td>
                                  <span className="">
                                  {Data4?.data4[0]?.PatternTotalTrade}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-primary mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Charting : </h6>
                                </td>
                                <td>
                                  <span className="">
                                  {Data4?.data4[0]?.ChartingTotalTrade}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="iq-card borderColor">
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "40%" }}
                        ></div>
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          aria-valuenow={20}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "20%" }}
                        ></div>
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          aria-valuenow={10}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "10%" }}
                        ></div>
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "40%" }}
                        ></div>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          aria-valuenow={20}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "20%" }}
                        ></div>
                        <div
                          className="progress-bar bg-secondary"
                          role="progressbar"
                          aria-valuenow={10}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                      <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                          <h3 className="card-title">
                            Paper Trade
                          </h3>
                        </div>
                      </div>
                      <div className="iq-card-body p-2">
                        <div className="table-responsive ">
                          <table className="table mb-0 table-borderless bg-transparent">
                            <tbody>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-online mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Scalping :</h6>
                                </td>
                                <td>
                                  <span className="">
                                  {Data4?.data4[0]?.ScalpingPaperTrade}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-blue mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Option :</h6>
                                </td>
                                <td>
                                  <span className="">
                                  {Data4?.data4[0]?.OptionPaperTrade}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-primary mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Pattern :</h6>
                                </td>
                                <td>
                                  <span className="">
                                  {Data4?.data4[0]?.PatternPaperTrade}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-primary mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Charting :</h6>
                                </td>
                                <td>
                                  <span className="">
                                  {Data4?.data4[0]?.ChartingPaperTrade}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div> 

                  <div className="col-lg-4">
                    <div className="iq-card borderColor">
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "40%" }}
                        ></div>
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          aria-valuenow={20}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "20%" }}
                        ></div>
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          aria-valuenow={10}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "10%" }}
                        ></div>
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "40%" }}
                        ></div>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          aria-valuenow={20}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "20%" }}
                        ></div>
                        <div
                          className="progress-bar bg-secondary"
                          role="progressbar"
                          aria-valuenow={10}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                      <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                          <h3 className="card-title">
                            Live Trade
                          </h3>
                        </div>
                      </div>
                      <div className="iq-card-body p-2">
                        <div className="table-responsive ">
                          <table className="table mb-0 table-borderless bg-transparent">
                            <tbody>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-online mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Scalping :</h6>
                                </td>
                                <td>
                                  <span className="">
                                  {Data4?.data4[0]?.ScalpingLiveTrade}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-blue mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Option :</h6>
                                </td>
                                <td>
                                  <span className="">
                                  {Data4?.data4[0]?.OptionLiveTrade}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-primary mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Pattern :</h6>
                                </td>
                                <td>
                                  <span className="">
                                    {Data4?.data4[0]?.PatternLiveTrade}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="iq-profile-avatar status-primary mt-4">
                                    {" "}
                                  </div>
                                </td>
                                <td>
                                  <h6 className="mb-0 ">Charting :</h6>
                                </td>
                                <td>
                                  <span className="">
                                    {Data4?.data4[0]?.ChartingLiveTrade}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="iq-card iq-user-profile-block">
                    <div className="iq-card-body p-2">
                      <div className="user-details-block">
                        <div className="user-profile text-center">
                          <img
                            src="assets/images/user/11.png"
                            alt="profile-img"
                            className="avatar-130 img-fluid"
                          />
                        </div>
                        <div className="text-center mt-3">
                          <h3 className="mb-0 ">
                            Admin
                          </h3>
                        </div>
                        <hr />
                        <ul className="doctoe-sedual d-flex align-items-center justify-content-between p-0">
                          <h3 className="mb-0 ">
                            Total Revenue{" "}
                            <span style={{ marginLeft: "10px" }}>-</span>
                          </h3>

                          <h3 className="counter">{Data2.data1}</h3>
                        </ul>
                        <hr />
                        <ul className="doctoe-sedual d-flex align-items-center justify-content-between p-0">
                          <h3 className="mb-0 ">
                            Total Clients{" "}
                            <span style={{ marginLeft: "28px" }}>-</span>
                          </h3>

                          <h3 className="counter">{Data2.data}</h3>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <AdminDashboardChart />
              </div>
            </div>
          </div>
        )}
      </div>
    </Content>
  );
};

export default Dashboards;
