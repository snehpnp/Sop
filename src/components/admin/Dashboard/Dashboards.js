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

  // Add a simple card style for all dashboard cards
  const cardStyle = {
    background: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1.5px 4px rgba(0,0,0,0.08)', // Enhanced shadow
    marginBottom: '24px',
    padding: '16px',
  };

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
          <div className="container-fluid">
            {/* Date Range Card - full width */}
            <div className="row  ">
              <div className="col-12">
                <div style={cardStyle} className="d-flex justify-content-start align-items-center flex-wrap align-items-start gap-3 card-bg-color card-text-Color">
                  <div className="me-3 card-text-Color">
                    <strong className="card-text-Color">Filter Accounts : </strong>
                  </div>

                  <div className=" d-flex justify-content-center align-items-center  me-3 card-text-Color">
                    <label htmlFor="fromDate" className="form-label me-2 card-text-Color">
                      From
                    </label>
                    <input
                      type="date"
                      id="fromDate"
                      className="form-control card-text-Color card-bg-color"
                      onChange={(e) => setFromDate(e.target.value)}
                      value={fromDate}
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center card-text-Color">
                    <label htmlFor="toDate" className="form-label me-2 card-text-Color">
                      To
                    </label>
                    <input
                      type="date"
                      id="toDate"
                      className="form-control card-text-Color card-bg-color"
                      onChange={(e) => setToDate(e.target.value)}
                      value={toDate}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4">
                <div style={cardStyle} className="card-bg-color card-text-Color">
                  <div className="iq-card-header d-flex justify-content-between card-bg-color card-text-Color">
                    <div className="iq-header-title card-text-Color">
                      <h3 className="card-title card-text-Color">Live Account</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="iq-card-body p-2 card-bg-color card-text-Color">
                    <div className="table-responsive  ">
                      <table className="table mb-0 table-borderless bg-transparent card-text-Color">
                        <tbody>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-online mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Total: </h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
                                {Data3?.data3[0]?.Total_Live_Account}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-blue mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Active: </h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
                                {Data3?.data3[0]?.Active_Live_Account}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-away mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Expired: </h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
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
                <div style={cardStyle} className="card-bg-color card-text-Color">
                  <div className="iq-card-header d-flex justify-content-between card-bg-color card-text-Color">
                    <div className="iq-header-title card-text-Color">
                      <h3 className="card-title card-text-Color">Free Demo Account</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="iq-card-body p-2 card-bg-color card-text-Color">
                    <div className="table-responsive">
                      <table className="table mb-0 table-borderless bg-transparent card-text-Color">
                        <tbody>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-online mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Total:</h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
                                {Data3?.data3[0]?.Total_Free_Demo_Account}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-blue mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Active</h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
                                {
                                  Data3?.data3[0]
                                    ?.Active_Free_Demo_Account
                                }
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-away mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Expired</h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
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
                <div style={cardStyle} className="card-bg-color card-text-Color">
                  <div className="iq-card-header d-flex justify-content-between card-bg-color card-text-Color">
                    <div className="iq-header-title card-text-Color">
                      <h3 className="card-title card-text-Color">Three Days Live Account</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="iq-card-body p-2 card-bg-color card-text-Color">
                    <div className="table-responsive ">
                      <table className="table mb-0 table-borderless bg-transparent card-text-Color">
                        <tbody>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-online mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Total</h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
                                {
                                  Data3?.data3[0]
                                    ?.Total_Two_Days_Live_Account
                                }
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-blue mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Active</h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
                                {
                                  Data3?.data3[0]
                                    ?.Active_Two_Days_Live_Account
                                }
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-away mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Expired</h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
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
            </div>
            <div className="row align-items-center">

              <div className="row  ">
                <div className="col-12">
                  <div style={cardStyle} className="themed-card d-flex justify-content-start align-items-center flex-wrap align-items-start gap-3 card-bg-color card-text-Color">
                    <div className="me-3 card-text-Color">
                      <strong className="card-text-Color">Filter Trades  : </strong>
                    </div>

                    <div className=" d-flex justify-content-center align-items-center  me-3 card-text-Color">
                      <label htmlFor="fromDate1" className="form-label me-2 card-text-Color">
                        From
                      </label>
                      <input
                        type="date"
                        id="fromDate1"
                        className="form-control card-text-Color card-bg-color"
                        onChange={(e) => setFromDate1(e.target.value)}
                        value={fromDate1}
                      />
                    </div>
                    <div className="d-flex justify-content-center align-items-center card-text-Color">
                      <label htmlFor="toDate1" className="form-label me-2 card-text-Color">
                        To
                      </label>
                      <input
                        type="date"
                        id="toDate1"
                        className="form-control card-text-Color card-bg-color"
                        onChange={(e) => setToDate1(e.target.value)}
                        value={toDate1}
                      />
                    </div>
                  </div>
                </div>
              </div>




            </div>
            <div className="row">
              <div className="col-lg-4">
                <div style={cardStyle} className="card-bg-color card-text-Color">
                  <div className="iq-card-header d-flex justify-content-between card-bg-color card-text-Color">
                    <div className="iq-header-title card-text-Color">
                      <h3 className="card-title card-text-Color">Total Trade</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="iq-card-body p-2 card-bg-color card-text-Color">
                    <div className="table-responsive ">
                      <table className="table mb-0 table-borderless bg-transparent card-text-Color">
                        <tbody>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-blue mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Scalping : </h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
                                {Data4?.data4[0]?.ScalpingTotalTrade}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-blue mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Option : </h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
                                {Data4?.data4[0]?.OptionTotalTrade}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-primary mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Pattern : </h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
                                {Data4?.data4[0]?.PatternTotalTrade}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-primary mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Charting : </h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
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
                <div style={cardStyle} className="card-bg-color card-text-Color">
                  <div className="iq-card-header d-flex justify-content-between card-bg-color card-text-Color">
                    <div className="iq-header-title card-text-Color">
                      <h3 className="card-title card-text-Color">Paper Trade</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="iq-card-body p-2 card-bg-color card-text-Color">
                    <div className="table-responsive ">
                      <table className="table mb-0 table-borderless bg-transparent card-text-Color">
                        <tbody>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-blue mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Scalping :</h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
                                {Data4?.data4[0]?.ScalpingPaperTrade}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-blue mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Option :</h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
                                {Data4?.data4[0]?.OptionPaperTrade}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-primary mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Pattern :</h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
                                {Data4?.data4[0]?.PatternPaperTrade}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-primary mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Charting :</h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
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
                <div style={cardStyle} className="card-bg-color card-text-Color">
                  <div className="iq-card-header d-flex justify-content-between card-bg-color card-text-Color">
                    <div className="iq-header-title card-text-Color">
                      <h3 className="card-title card-text-Color">Live Trade</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="iq-card-body p-2 card-bg-color card-text-Color">
                    <div className="table-responsive ">
                      <table className="table mb-0 table-borderless bg-transparent card-text-Color">
                        <tbody>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-blue mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Scalping :</h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
                                {Data4?.data4[0]?.ScalpingLiveTrade}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-blue mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Option :</h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
                                {Data4?.data4[0]?.OptionLiveTrade}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-primary mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Pattern :</h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
                                {Data4?.data4[0]?.PatternLiveTrade}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="iq-profile-avatar status-primary mt-4 card-bg-color"></div>
                            </td>
                            <td>
                              <h6 className="mb-0 card-text-Color">Charting :</h6>
                            </td>
                            <td>
                              <span className="card-text-Color">
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
            <div className="row" style={{ marginTop: 24, marginBottom: 24 }}>
              {/* Left: Minimal Admin Card - reduced height, moved up */}
              <div className="col-lg-4 d-flex align-items-start">
                <div className="card-bg-color card-text-Color" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1.5px 4px rgba(0,0,0,0.08)', padding: 20, textAlign: 'center', border: 'none', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: 240, maxHeight: 280 }}>
                  <img
                    src="assets/images/user/11.png"
                    alt="profile-img"
                    style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e0e0e0', background: '#f4f6fa', marginBottom: 12, boxShadow: '0 2px 8px #e0e0e0' }}
                  />
                  <h3 className="card-text-Color" style={{ fontWeight: 700, fontSize: '1.1rem', color: '#222', marginBottom: 4, letterSpacing: 0.5 }}>Admin</h3>
                  <div style={{ borderTop: '1px solid #f0f0f0', margin: '12px 0', width: '100%' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 15, padding: '0 6px' }}>
                      <span className="card-text-Color" style={{ color: '#888', fontWeight: 500 }}>Total Revenue</span>
                      <span className="card-text-Color" style={{ fontWeight: 700, color: '#2e7d32', fontSize: 16 }}>{Data2.data1}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 15, padding: '0 6px' }}>
                      <span className="card-text-Color" style={{ color: '#888', fontWeight: 500 }}>Total Clients</span>
                      <span className="card-text-Color" style={{ fontWeight: 700, color: '#1976d2', fontSize: 16 }}>{Data2.data}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right: Graph Card - less padding, graph fills card */}
              <div className="col-lg-8 d-flex align-items-stretch">
                <div className="card-bg-color card-text-Color" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1.5px 4px rgba(0,0,0,0.08)', padding: 12, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 240 }}>
                  <h4 className="card-text-Color" style={{ color: '#444', fontWeight: 600, marginBottom: 10, fontSize: '1.08rem', letterSpacing: 0.2 }}>Earning Per Day</h4>
                  <div style={{ width: '70vw', minHeight: 200, height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AdminDashboardChart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Content>
  );
};

export default Dashboards;
