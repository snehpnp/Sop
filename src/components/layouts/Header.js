import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UpdateBrokerKey from "./Update_Broker_Key";
import Loginwihapi from "./log_with_api";
import * as Config from "../../Utils/Config";
import axios from "axios";
import {
  addChartingScript,
  getChargingPlatformDataApi,
  
  TradingStatus,
} from "../CommonAPI/User";
import Swal from "sweetalert2";
import { Wallet, ChevronUp, ChevronDown, SunMoon } from "lucide-react";
import {
  LastPattern,
  DataStart,
  AutoLogin,
  DataStartget,
  AutoLoginget,
  GetIndexData,
} from "../CommonAPI/Admin";
import { addBroker } from "../CommonAPI/SuperAdmin";
import { jwtDecode } from "jwt-decode";
import { Get_Profile_Data } from "../CommonAPI/User";
import { useTheme } from "../../ThemeContext";
import { connectWebSocket } from "../user/UserDashboard/LivePrice";
import $ from "jquery";
import ApiProcessModal from "./ApiProcessModal";
import Chatbot from "./Chatbot";
import DynamicModal from "../../ExtraComponent/DynamicModal";
import { toast } from "react-toastify";

const Header = ({ permissionData }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFunds, setShowFunds] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [selectedImage, setSelectedImage] = useState(
    localStorage.getItem("userProfileImage") || null
  );

  const navigate = useNavigate();
  const role = localStorage.getItem("Role");
  const Username = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const [isActive, setIsActive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeElement, setActiveElement] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [getTradingStatus, setTradingStatus] = useState(false);

  const [getBrokerName, setBrokerName] = useState("");
  const [showAddBrokerModal, setShowAddBrokerModal] = useState(false);
  const [addBrokerName, setAddBrokerName] = useState("");
  const [userName, setUserName] = useState("");
  // const [permissionData, setPermissionData] = useState("");
  // const { theme, toggleTheme } = useTheme();
  const { theme, changeTheme, availableThemes } = useTheme();

  const [autoLoginLoading, setAutoLoginLoading] = useState(false);
  const [dataStartloading, setDataStartLoading] = useState(false);
  const [lastPatternloading, setLastPatternLoading] = useState(false);

  const [showApiStepsModal, setShowApiStepsModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fund: "",
    lot: "",
  });
  const [activeTab, setActiveTab] = useState("Cash");
  const [chartingSegments, setChartingSegments] = useState([]);
  const [baseValue, setBaseValue] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [isDataStart, setIsDataStart] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const prevInputValueRef = useRef(0);

  const location = useLocation();
  const Broker = localStorage.getItem("Broker");

  const niftyRef = useRef(null);
  const bankNiftyRef = useRef(null);

  const handleBroker = async () => {
    setShowApiStepsModal(true);
  };

  const getChartingData = async () => {
    try {
      const res = await getChargingPlatformDataApi("Admin");
      let updatedFormData = {
        fund: "",
        lot: "",
      };
      res.Client.forEach((item) => {
        if (item.Segment === activeTab) {
          if (activeTab === "Cash") {
            updatedFormData.fund = item.Fund;
            setBaseValue(item.Fund);
          } else {
            updatedFormData.lot = item.Quantity;
            setBaseValue(item.Quantity);
          }
        }
      });
      setFormData(updatedFormData);
    } catch (err) {
      console.error("Error in getting the charting data", err);
    }
  };

  useEffect(() => {
    getprofiledata();
    GetindexdataApi();
  }, []);
  useEffect(() => {
    getChartingData();
  }, [open, activeTab]);

  useEffect(() => {
    fetchDataStartget();
    fetchAutoLoginget();
  }, []);

  useEffect(() => {
    if (activeTab === "Cash") {
      setFormData({ fund: baseValue * multiplier, lot: 0 });
    } else {
      setFormData({ lot: baseValue * multiplier, fund: 0 });
    }
  }, [baseValue, multiplier, activeTab]);

  useEffect(() => {
    fetchChartingSegments();
  }, []);

  useEffect(() => {
    if (activeTab === "Cash") {
      setFormData({ fund: baseValue * multiplier, lot: 0 });
    } else {
      setFormData({ lot: baseValue * multiplier, fund: 0 });
    }
  }, [baseValue, multiplier, activeTab]);

  useEffect(() => {
    setMultiplier(1);
  }, [activeTab]);

  useEffect(() => {
    const name = localStorage.getItem("name");
    const expireClient = localStorage.getItem("expire");

    if (role === "User" && expireClient === "1") {
      if (location.pathname === "/user/all/transection") {
        navigate("/user/all/transection", { replace: true }); // Allow transection page
      } else {
        navigate("/user/all/plan", { replace: true }); // Redirect to plan page for all other URLs
      }
    }

    if (name) {
      setUserName(name);
    }
  }, [navigate]);



  useEffect(() => {
    clearSession();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".search-toggle") &&
        !event.target.classList.contains("search-input")
      ) {
        setActiveElement(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      document.body.classList.add("sidebar-main");
    } else {
      document.body.classList.remove("sidebar-main");
    }
  }, [isActive]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchChartingSegments = async () => {
    try {
      const response = await getChargingPlatformDataApi(Username);
      if (response) {
        setChartingSegments(response.Client.map((item) => item.Segment) || []);
      } else {
        setChartingSegments([]);
      }
    } catch (error) {
      console.error("Error fetching charting segments:", error);
    }
  };

  const fetchDataStartget = async () => {
    try {
      if (role === "Admin") {
        const response = await DataStartget();
        setIsDataStart(response?.Status);
      }
    } catch (error) {
      console.error("Error fetching data start:", error);
    }
  };

  const fetchAutoLoginget = async () => {
    try {
      if (role === "Admin") {
        const response = await AutoLoginget();
        setIsAutoLogin(response?.Status);
      }
    } catch (error) {
      console.error("Error fetching auto login data:", error);
    }
  };

  const handleChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setBaseValue(val); // ✅ This is important
    setMultiplier(1); // Reset multiplier on manual change
  };

  const handleUp = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setMultiplier((m) => m + 1);
  };

  const handleDown = () => {
    setMultiplier((m) => (m > 1 ? m - 1 : 1));
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setBaseValue(0);
    setMultiplier(1);
    setFormData({ fund: "", lot: "" });
    prevInputValueRef.current = 0;
    setOpen(false);
  };

  const handleTypeAction = async () => {
    const req = {
      Username: "Admin",
      Status: "On",
      Fund: activeTab === "Cash" ? formData.fund : 0,
      Lot: activeTab !== "Cash" ? formData.lot : 0,
      Segment: activeTab,
      TradeCount: 1000000,
      RunningTrade: 1000000,
      MaxProfit: 0,
      MaxLoss: 0,
      ExitDay: "Intraday",
      ASStatus: "On",
      Strategytag: [""],
    };

    try {
      let response = await addChartingScript(req);
      if (response?.Status) {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        await getChartingData();
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      setMultiplier(1); // Reset multiplier to 1 after successful submission
    } catch (err) {
      console.error("Error in adding the charting data", err);
    }
  };

  const handleToggle = async (value) => {
    // Prevent toggling to the same state
    if (value === getTradingStatus) {
      return; // Exit early if user clicks the currently active mode
    }

    const newStatus = value;

    if (newStatus == true) {
      const requestData = {
        Username: Username,
        session: "",
        AccToken: "",
        usrid: "",
        sid: "",
        jwt_Token: "",
        BrokerName: getBrokerName,
      };
      Loginwihapi(requestData);
    } else {
      var data = {
        Username: Username,
        session: "",
        AccToken: "",
        usrid: "",
        sid: "",
        jwt_Token: "",
      };

      try {
        const response = await axios.post(
          `${Config.base_url}ConnectBroker`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.Status) {
          // Assuming the status is in response.data.Status
          Swal.fire({
            // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "Success!",
            text: "Trading On successfully.",
            icon: "success",
            confirmButtonText: "OK",
            timer: 1000,
          }).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
        } else {
          Swal.fire({
            // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "Success!",
            text: "Trading Off successfully.",
            icon: "success",
            confirmButtonText: "OK",
            timer: 1000,
          }).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
        }
      } catch (err) {
        console.error("Error in ConnectBroker request", err);
        Swal.fire({
          // background: "#1a1e23 ",
          backdrop: "#121010ba",
          confirmButtonColor: "#1ccc8a",
          title: "Error!",
          text: "An error occurred. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleChatToggle = () => {
    setShowChat(!showChat);
  };

  const handleClick = (event, id) => {
    event.preventDefault();

    if (activeElement === id) {
      setActiveElement(null);
    } else {
      setActiveElement(id);
    }
  };

  const logout = async () => {
    localStorage.clear();
    navigate("/");
  };

  const clearSession = () => {
    var decoded = jwtDecode(token);
    if (decoded.exp * 1000 < new Date().getTime()) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const toggleFullscreen = () => {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const fetchData = async () => {
    if (role == "User") {
      const requestData = { userName: Username };
      const response = await TradingStatus(requestData);

      if (response) {
        setBrokerName(response.Brokername);
        if (response.Status) {
          setTradingStatus(true);
        }
      }
    }
  };

  const handleAutoLoginbtn = async () => {
    setAutoLoginLoading(true); // Loader start
    try {
      let confirmResult;
      if (isAutoLogin) {
        confirmResult = await Swal.fire({
          background: "#1a1e23",
          backdrop: "#121010ba",
          title: "Start Data?",
          text: "Already running, Do you want to proceed anyway?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#1ccc8a",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        });
      }

      if (!confirmResult.isConfirmed) {
        setAutoLoginLoading(false);
        return;
      }

      const response = await AutoLogin();
      Swal.fire({
        background: "#1a1e23",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: response.Status ? "Auto Login On!" : "Error!",
        text: response.message,
        icon: response.Status ? "success" : "error",
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        background: "#1a1e23",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
      });
      fetchAutoLoginget();
    } finally {
      setAutoLoginLoading(false); // Loader stop
    }
  };

  const handleDataStart = async () => {
    setDataStartLoading(true);

    try {
      let confirmResult;
      if (isDataStart) {
        confirmResult = await Swal.fire({
          background: "#1a1e23",
          backdrop: "#121010ba",
          title: "Start Data?",
          text: "Already running, Do you want to proceed anyway?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#1ccc8a",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        });

        if (!confirmResult.isConfirmed) {
          setDataStartLoading(false);
          return;
        }
      }

      const response = await DataStart(); // API call

      Swal.fire({
        background: "#1a1e23",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: response.Status ? "Data Started!" : "Error!",
        text: response.message,
        icon: response.Status ? "success" : "error",
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        background: "#1a1e23",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
      });
    } finally {
      setDataStartLoading(false);
      fetchDataStartget();
    }
  };

  const handleLastPattern = async () => {
    setLastPatternLoading(true);
    try {
      const response = await LastPattern(); // API call
      Swal.fire({
        // background: "#1a1e23 ",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Last Pattern On !",
        text: response.message,
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        // background: "#1a1e23 ",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Error !",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
      });
    } finally {
      setLastPatternLoading(false); // Loader stop
    }
  };

  const walletmodal = () => {
    navigate("/user/all/transection");
  };

  const toggleFundsVisibility = () => {
    setShowFunds(!showFunds);
    walletmodal(showFunds);
  };

  const handleSetApiKey = async (e) => {
    e.preventDefault();
    const broker = localStorage.getItem("Broker");
    if (broker == "DEMO") {
      return Swal.fire({
        // background: "#1a1e23 ",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Warning!",
        text: "You are using a demo account. You Can't set API key.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }

    setIsModalVisible(true);
  };

  const handleAddBroker = async () => {
    const req = { BrokerName: addBrokerName };

    if (addBrokerName == "") {
      Swal.fire({
        // background: "#1a1e23 ",
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Warning!",
        text: "Please enter Broker Name.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    await addBroker(req)
      .then((response) => {
        if (response.Status) {
          Swal.fire({
            // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "Success!",
            text: "Broker Added successfully.",
            icon: "success",
            confirmButtonText: "OK",
            timer: 1000,
          });
          setAddBrokerName("");
          setShowAddBrokerModal(false);
        } else {
          Swal.fire({
            // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "Error!",
            text: response.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error("Error in GetUserBalence request", error);
      });
  };

  const getprofiledata = async () => {
    if (role != "User") {
      return;
    }
    const data = {
      username: Username,
    };
    await Get_Profile_Data(data).then((response) => {
      if (response.Status) {
        localStorage.setItem("expire", 0);
        localStorage.setItem("Broker", response.Data[0].BrokerName);
        localStorage.setItem("Permission", response.Data[0].Permission || "[]");
      } else {
        if (response.message === "Client Expired") {
          localStorage.setItem("expire", 1);
          navigate("/user/all/plan");
        }
      }
    });
  };

  const GetindexdataApi = async () => {
    try {
      let currentWebSocket = null;
      let tokenMap = {}; // use let instead of const

      const response = await GetIndexData();
     
      // if (response.Status) {
        // reset mapping each time
        tokenMap = {};
        const channels = [];

        if (response.FiniftyToken?.[0]) {
          channels.push(`NFO|${response.FiniftyToken[0]}`);
          tokenMap[response.FiniftyToken[0]] = "FINNIFTY";
        }

        if (response.BankniftyToken?.[0]) {
          channels.push(`NFO|${response.BankniftyToken[0]}`);
          tokenMap[response.BankniftyToken[0]] = "BANKNIFTY";
        }

        if (response.NiftyToken?.[0]) {
          channels.push(`NFO|${response.NiftyToken[0]}`);
          tokenMap[response.NiftyToken[0]] = "NIFTY";
        }

        // Purana WebSocket close kar do
        if (currentWebSocket && typeof currentWebSocket.close === "function") {
          currentWebSocket.close();
        }


        // Connect new WebSocket with all channels
        currentWebSocket = connectWebSocket(
          { userId: response?.Userid, sessionId: response?.Access_Token || ""},
          channels, // pass array of channels
          (data) => {
            if (data.lp && data.tk) {
              const indexName = tokenMap[data.tk];
              if (indexName) {
                $(`.LivePrice_${indexName}`).html(data.lp);
              }
            }
          }
        );
      // }
    } catch (err) {
      console.log("Error in fetching Index Data", err);
    }
  };

  return (
    <>
      <div className="iq-top-navbar ">
        <div className="iq-navbar-custom">
          <div className="iq-sidebar-logo">
            <img
              className="header_img2 header-logo-img"
              alt="Logo"
              id="header_img2"
            />
         
          </div>

          <button className="botIcon" onClick={handleChatToggle}>
            <i className="fa fa-commenting fs-5" aria-hidden="true" />
          </button>

          {/* Conditionally render chatbot */}
          {showChat && <Chatbot onClose={() => setShowChat(false)} />}
          {role === "Admin" ? (
            <nav className="navbar navbar-expand-lg navbar-light p-0">
              <button
                className="navbar-toggler ms-3"
                type="button"
                data-bs-toggle="collapse"
                href="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="ri-menu-3-line" />
              </button>
              <button className="me-3 menusidebar" onClick={toggleSidebar}>
                <i className="ri-more-fill" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto navbar-list align-items-center">
                  <li className="nav-item dropdown">
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="adminMenuDropdown"
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={(e) => setIsModalVisible(true)}
                        >
                          🔐 Set API Key
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => setShowModal(true)}
                        >
                          🔑 Auto Login
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          onClick={(e) => navigate("/admin/transectionrequest")}
                        >
                          💵 Transaction Requests
                        </button>
                      </li>

                     

                      <li>
                        <button
                          className="dropdown-item"
                          onClick={(e) => navigate("/admin/addcoupon")}
                        >
                          🎟️ Add Coupon
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          onClick={(e) => navigate("/admin/Strategy-tag")}
                        >
                          🛡️ Strategy Tag
                        </button>
                      </li>

                      {permissionData?.includes("Option Chain") && (
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={(e) => navigate("/admin/Master-Account")}
                          >
                            👑 Master Account
                          </button>
                        </li>
                      )}
                    </ul>
                  </li>

                  

                  {role === "Admin" && (
                    <div className="d-flex justify-content-end align-items-center  btn-width">
                      <button
                        className={`w-100 py-1 px-3 shadow-sm btn m-2 ${
                          isAutoLogin ? "btn-success" : "btn-danger"
                        }`}
                        onClick={handleAutoLoginbtn}
                        disabled={autoLoginLoading}
                      >
                        {autoLoginLoading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            ></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            🔑{" "}
                            <strong
                              className="btn-text-color"
                              style={{ fontSize: "0.9rem" }}
                            >
                              Auto Login
                            </strong>
                          </>
                        )}
                      </button>

                      <button
                        className={`w-100 py-1 px-3 shadow-sm btn m-2 ${
                          isDataStart ? "btn-success" : "btn-danger"
                        }`}
                        onClick={handleDataStart}
                        disabled={dataStartloading}
                      >
                        {dataStartloading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            ></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            🚀{" "}
                            <strong
                              className="btn-text-color"
                              style={{ fontSize: "0.9rem" }}
                            >
                              Data Start
                            </strong>
                          </>
                        )}
                      </button>

                      <div
                        className="nav-item mx-3 btn-text-color"
                        onClick={() => {
                          navigate("/admin/clientactivity");
                        }}
                      >
                        <button
                          type="button"
                          data-bs-dismiss="modal"
                          className="addbtn mt-0 btn1 "
                        >
                          <span className="btn-text-color">
                            <span>
                              <Wallet className="iconcol" />
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  )}


                  <div className="container py-2" style={{ maxWidth: "320px" }}>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <label
                        htmlFor="theme-select"
                        className="form-label fw-semibold card-text-Color d-flex align-items-center mb-0"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <SunMoon className="me-1" size={16} />
                        Theme:
                      </label>

                      <select
                        id="theme-select"
                        value={theme}
                        onChange={(e) => changeTheme(e.target.value)}
                        className="form-select form-select-sm"
                        style={{
                          width: "140px",
                          fontSize: "0.85rem",
                          padding: "0.25rem 0.5rem",
                        }}
                      >
                        {availableThemes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <li
                    className={`nav-item ${
                      activeElement === "profile" ? "iq-show" : ""
                    }`}
                  >
                    <a
                      href="#"
                      className={`text-decoration-none search-toggle d-flex align-items-center iq-waves-effectt ${
                        activeElement === "profile" ? "active" : ""
                      }`}
                      onClick={(e) => handleClick(e, "profile")}
                    >
                      <img
                        src={selectedImage || "/assets/images/user/demo.jpg"}
                        className="img-fluid rounded-circle me-3 border border-2 border-primary"
                        alt="user"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="caption text-start">
                        <h6 className="mb-0 fw-semibold card-text-Color">
                          {Username}
                        </h6>
                        {/* <span className="font-size-12 text-muted">online</span> */}
                      </div>
                    </a>

                    <div className="iq-sub-dropdown iq-user-dropdown">
                      <div className="card shadow border-0">
                        <div className="card-body p-0">
                          <div className="bg-primary p-3 rounded-top">
                            <h5 className="text-white mb-0 card-text-Color">
                              {Username}
                            </h5>
                            {/* <span className="text-white-50">online</span> */}
                          </div>

                          {/* Menu Items */}
                          <div
                            className="list-group list-group-flush ps-2"
                            style={{
                              maxHeight: "400px", // fixed height (adjust as needed)
                              overflowY: "auto", // vertical scrollbar
                              overflowX: "hidden", // hide horizontal overflow
                            }}
                          >
                            <button
                              className="list-group-item list-group-item-action d-flex align-items-center ms-2 card-bg-color"
                              onClick={() =>
                                Broker == "BAJAJ" ? "" : setIsModalVisible(true)
                              }
                            >
                              🔐{" "}
                              <span className="ms-2 card-text-Color">
                                Set API Key
                              </span>
                            </button>

                            <button
                              className="list-group-item list-group-item-action d-flex align-items-center card-bg-color ms-2"
                              onClick={() => setShowModal(true)}
                            >
                              🔑{" "}
                              <span className="ms-2 card-text-Color">
                                Auto Login
                              </span>
                            </button>

                            <button
                              className="list-group-item list-group-item-action d-flex align-items-center card-bg-color ms-2"
                              onClick={() =>
                                navigate("/admin/transectionrequest")
                              }
                            >
                              💵{" "}
                              <span className="ms-2 card-text-Color">
                                Transaction Requests
                              </span>
                            </button>

                            <button
                              className="list-group-item list-group-item-action d-flex align-items-center card-bg-color ms-2"
                              onClick={() => navigate("/admin/Coupon")}
                            >
                              🎟️{" "}
                              <span className="ms-2 card-text-Color">
                                Coupons
                              </span>
                            </button>

                            {/* <button className="list-group-item list-group-item-action d-flex align-items-center card-bg-color ms-2" onClick={() => regenerateKey()}>
                              🔁 <span className="ms-2 card-text-Color">Re-Generate Key</span>
                            </button> */}

                            <button
                              className="list-group-item list-group-item-action d-flex align-items-center card-bg-color ms-2"
                              onClick={() => navigate("/admin/ResponseQnA")}
                            >
                              📬{" "}
                              <span className="ms-2 card-text-Color">
                                Respond to Queries
                              </span>
                            </button>

                            <button
                              className="list-group-item list-group-item-action d-flex align-items-center card-bg-color ms-2"
                              onClick={() => navigate("/admin/Master-Account")}
                            >
                              👑{" "}
                              <span className="ms-2 card-text-Color">
                                Master Account
                              </span>
                            </button>

                            <button
                              className="list-group-item list-group-item-action d-flex align-items-center card-bg-color ms-2"
                              onClick={() => setOpen(true)}
                            >
                              📡{" "}
                              <span className="ms-2 card-text-Color">
                                Admin Signal
                              </span>
                            </button>

                            <button
                              className="list-group-item list-group-item-action d-flex align-items-center card-bg-color ms-2"
                              onClick={() => navigate("/admin/servicreport")}
                            >
                              🛠️{" "}
                              <span className="ms-2 card-text-Color">
                                Service Report
                              </span>
                            </button>

                            <button
                              className="list-group-item list-group-item-action d-flex align-items-center card-bg-color ms-2"
                              onClick={() => navigate("/admin/userlogs")}
                            >
                              👤{" "}
                              <span className="ms-2 card-text-Color">
                                User Panel Log
                              </span>
                            </button>

                            <button
                              className="list-group-item list-group-item-action d-flex align-items-center card-bg-color ms-2"
                              onClick={() => navigate("/admin/clientreport")}
                            >
                              📑{" "}
                              <span className="ms-2 card-text-Color">
                                Client Thread Report
                              </span>
                            </button>

                            <button
                              className="list-group-item list-group-item-action d-flex align-items-center card-bg-color ms-2"
                              onClick={() => navigate("/admin/smtp")}
                            >
                              ⚙️{" "}
                              <span className="ms-2 card-text-Color">
                                System & SMTP Details
                              </span>
                            </button>

                            <button
                              className="list-group-item list-group-item-action d-flex align-items-center card-bg-color ms-2"
                              onClick={() => navigate("/admin/api-create-info")}
                            >
                              💻{" "}
                              <span className="ms-2 card-text-Color">
                                API Create Information
                              </span>
                            </button>
                          </div>

                          <DynamicModal
                            open={open}
                            handleClose={() => setOpen(false)}
                            title="Charting Signal"
                          >
                            <div className="row g-4">
                              <div className="d-flex justify-content-center">
                                <ul
                                  className="nav nav-pills shadow rounded-pill p-1"
                                  style={{ padding: "2px" }}
                                >
                                  {chartingSegments.map((segment) => (
                                    <li className="nav-item" key={segment}>
                                      <button
                                        className={`nav-link ${
                                          activeTab === segment ? "active" : ""
                                        } rounded-pill`}
                                        onClick={() => setActiveTab(segment)}
                                        style={{
                                          padding: "4px 10px",
                                          margin: "6px",
                                          fontSize: "1rem",
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

                              <div className="card card-bg-color shadow rounded p-3 d-flex flex-column align-items-center">
                                <div className="mb-3">
                                  <p className="card-text-Color fw-semibold mb-3">
                                    {activeTab}
                                  </p>
                                  <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                                    {/* Label */}
                                    <label className="form-label card-text-Color mb-0">
                                      {activeTab === "Cash" ? "Fund" : "Lot"}
                                    </label>

                                    {/* Input Field */}
                                    <input
                                      type="number"
                                      name="fund"
                                      className="form-control modern-input"
                                      placeholder={`Enter ${
                                        activeTab === "Cash" ? "fund" : "lot"
                                      } amount`}
                                      value={
                                        activeTab === "Cash"
                                          ? formData.fund
                                          : formData.lot
                                      }
                                      onChange={handleChange}
                                      style={{ width: "130px" }}
                                    />

                                    {/* Vertical Arrow Buttons */}
                                    <div className="d-flex flex-column">
                                      <button
                                        type="button"
                                        className="btn btn-outline-secondary p-1 mb-1"
                                        onClick={handleUp}
                                        title="Increase"
                                      >
                                        <ChevronUp size={18} />
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-secondary p-1"
                                        onClick={handleDown}
                                        title="Decrease"
                                      >
                                        <ChevronDown size={18} />
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {/* Save Button */}
                                <div className="text-end pt-2">
                                  <button
                                    className="addbtn"
                                    onClick={() => handleTypeAction("cash")}
                                  >
                                    Save Changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </DynamicModal>

                          {/* Logout Button */}
                          <div className="text-center p-3 border-top">
                            <button
                              className="btn btn-danger w-100"
                              onClick={logout}
                            >
                              Log out <i className="ri-login-box-line ms-2"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          ) : role === "Subadmin" ? (
            <nav className="navbar navbar-expand-lg navbar-light p-0">
              <button
                className="navbar-toggler ms-3"
                type="button"
                data-bs-toggle="collapse"
                href="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="ri-menu-3-line" />
              </button>
              <button className="me-3 menusidebar" onClick={toggleSidebar}>
                <i className="ri-more-fill" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto navbar-list align-items-center">
                  {/* <li className="nav-item">
                    <button
                      className="addbtn mx-3 btn1"
                      style={{ pointerEvents: "none" }}
                    >
                      Hello, {Username}
                    </button>
                  </li> */}

                  {/* <li
                    className="nav-item iq-full-screen"
                    onClick={toggleFullscreen}
                  >
                    <a href="#" className="iq-waves-effect" id="btnFullscreen">
                      <i
                        className={
                          isFullscreen
                            ? "ri-fullscreen-exit-line"
                            : "ri-fullscreen-line"
                        }
                      />
                    </a>
                  </li> */}

                  {/* <li className="nav-item iq-full-screen">
                    <button
                      onClick={toggleTheme}
                      className={`addbtn  ms-auto`}
                      style={{
                        // backgroundColor: theme === "light" ? "#222" : "#f8f9fa",
                        // color: theme === "light" ? "#fff" : "#000",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    </button>
                  </li> */}

                  {/* <label className="theme-switch">
                    <input type="checkbox" className="theme-switch__checkbox"
                      checked={theme === "dark"}
                      onChange={toggleTheme}
                    />
                    <div className="theme-switch__container"  >
                      <div className="theme-switch__clouds" />
                      <div className="theme-switch__stars-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z" fill="currentColor" />
                        </svg>
                      </div>
                      <div className="theme-switch__circle-container">
                        <div className="theme-switch__sun-moon-container">
                          <div className="theme-switch__moon">
                            <div className="theme-switch__spot" />
                            <div className="theme-switch__spot" />
                            <div className="theme-switch__spot" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </label> */}
                  <div className="container py-2" style={{ maxWidth: "320px" }}>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <label
                        htmlFor="theme-select"
                        className="form-label fw-semibold card-text-Color d-flex align-items-center mb-0"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <SunMoon className="me-1" size={16} />
                        Theme:
                      </label>

                      <select
                        id="theme-select"
                        value={theme}
                        onChange={(e) => changeTheme(e.target.value)}
                        className="form-select form-select-sm"
                        style={{
                          width: "140px",
                          fontSize: "0.85rem",
                          padding: "0.25rem 0.5rem",
                        }}
                      >
                        {availableThemes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <li
                    className={`nav-item ${
                      activeElement === "profile" ? "iq-show" : ""
                    }`}
                  >
                    <a
                      href="#"
                      className={`search-toggle d-flex align-items-center iq-waves-effectt ${
                        activeElement === "profile" ? "active" : ""
                      }`}
                      onClick={(e) => handleClick(e, "profile")}
                    >
                      <div className="caption">
                        <button
                          className="addbtn iq-sign-btn "
                          onClick={logout}
                          role="button"
                          style={{ width: "150px", height: "60px" }}
                        >
                          Log out
                          <i className="iconcol ri-login-box-line ms-2" />
                        </button>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          ) : role === "User" ? (
            <nav className="navbar navbar-expand-lg navbar-light p-0">
              <button
                className="navbar-toggler "
                type="button"
                data-bs-toggle="collapse"
                href="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="ri-menu-3-line" />
              </button>

              <button className="me-3 menusidebar" onClick={toggleSidebar}>
                <i className="ri-more-fill" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <div
                  className="btn-group paper-live-trading-btn tradin-btn-align"
                  role="group"
                  style={{
                    backgroundColor: "#2a2e32",
                    borderRadius: "20px",
                    padding: "2px",
                    height: "36px",
                    marginLeft: "0.2rem",
                  }}
                >
                  <button
                    type="button"
                    className="btn border-0"
                    style={{
                      width: "120px",
                      backgroundColor: getTradingStatus ? "#2a2e32" : "#7367f0",
                      color: getTradingStatus ? "#6c7293" : "white",
                      fontWeight: "500",
                      padding: "6px 12px",
                      fontSize: "13px",
                      transition: "all 0.3s ease",
                      borderRadius: "18px",
                      boxShadow: getTradingStatus
                        ? "none"
                        : "0 2px 6px rgba(115,103,240,0.4)",
                    }}
                    onClick={() => handleToggle(false)}
                  >
                    Paper Trading
                  </button>
                  <button
                    type="button"
                    className="btn border-0"
                    style={{
                      width: "120px",
                      backgroundColor: getTradingStatus ? "#7367f0" : "#2a2e32",
                      color: "white",
                      fontWeight: "500",
                      padding: "6px 12px",
                      fontSize: "13px",
                      transition: "all 0.3s ease",
                      borderRadius: "18px",
                      boxShadow: getTradingStatus
                        ? "0 2px 6px rgba(115,103,240,0.4)"
                        : "none",
                    }}
                    onClick={() => handleToggle(true)}
                  >
                    Live Trading
                  </button>
                </div>

                <ul className="navbar-nav ms-auto navbar-list align-items-center">
                  {getBrokerName && getBrokerName == "Demo" ? (
                    <li className="nav-item">
                      <button type="button" className="addbtn  btn1">
                        Demo Account
                      </button>
                    </li>
                  ) : (
                    <></>
                  )}

                  <li className="live-price-item">
                    <div className="live-price-box">
                      <span className="label card-text-Color">NIFTY:</span>
                      <span
                        className="LivePrice_NIFTY liveprice-text-color ms-1"
                        ref={niftyRef}
                      >
                        {}
                      </span>
                    </div>
                  </li>

                  <li className="live-price-item">
                    <div className="live-price-box">
                      <span className="label card-text-Color">BANKNIFTY:</span>
                      <span
                        className="LivePrice_BANKNIFTY liveprice-text-color ms-1"
                        ref={bankNiftyRef}
                      >
                        {}
                      </span>
                    </div>
                  </li>

                  <li className="live-price-item">
                    <div className="live-price-box">
                      <span className="label card-text-Color">FINNIFTY:</span>
                      <span className="LivePrice_FINNIFTY liveprice-text-color ms-1">
                        {}
                      </span>
                    </div>
                  </li>

                  <li
                    className="nav-item mx-3 btn-text-color"
                    onClick={toggleFundsVisibility}
                  >
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      className="addbtn mt-0 btn1 "
                    >
                      <span className="btn-text-color">
                        <span>
                          <Wallet className="iconcol" />
                        </span>
                      </span>
                    </button>
                  </li>

                  {/* <li
                    className="nav-item iq-full-screen"
                    onClick={toggleFullscreen}
                  >
                    <a href="#" className="iq-waves-effect" id="btnFullscreen">
                      <i
                        className={
                          isFullscreen
                            ? "ri-fullscreen-exit-line"
                            : "ri-fullscreen-line"
                        }
                      />
                    </a>
                  </li> */}

                  {/* <li className="nav-item iq-full-screen">
                    <button
                      onClick={toggleTheme}
                      className={`addbtn  ms-auto`}
                      style={{
                        // backgroundColor: theme === "light" ? "#222" : "#f8f9fa",
                        // color: theme === "light" ? "#fff" : "#000",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                    </button>
                  </li> */}

                  {/* <label className="theme-switch">
                    <input type="checkbox" className="theme-switch__checkbox"
                      checked={theme === "dark"}
                      onChange={toggleTheme}
                    />
                    <div className="theme-switch__container"  >
                      <div className="theme-switch__clouds" />
                      <div className="theme-switch__stars-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z" fill="currentColor" />
                        </svg>
                      </div>
                      <div className="theme-switch__circle-container">
                        <div className="theme-switch__sun-moon-container">
                          <div className="theme-switch__moon">
                            <div className="theme-switch__spot" />
                            <div className="theme-switch__spot" />
                            <div className="theme-switch__spot" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </label> */}

                  {/* <div className="container py-3">
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <label htmlFor="theme-select" className="form-label fw-bold card-text-Color d-flex align-items-center">
                        <SunMoon className="me-2" size={20} />
                        Theme:
                      </label>
                      <select
                        id="theme-select"
                        value={theme}
                        onChange={(e) => changeTheme(e.target.value)}
                        className="form-select w-auto"
                        style={{ maxWidth: "200px" }}
                      >
                        {availableThemes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div> */}

                  <div className="container py-2" style={{ maxWidth: "320px" }}>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <label
                        htmlFor="theme-select"
                        className="form-label fw-semibold card-text-Color d-flex align-items-center mb-0"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <SunMoon className="me-1" size={16} />
                        Theme:
                      </label>

                      <select
                        id="theme-select"
                        value={theme}
                        onChange={(e) => changeTheme(e.target.value)}
                        className="form-select form-select-sm"
                        style={{
                          width: "140px",
                          fontSize: "0.85rem",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "6px", // Rounded border
                          overflowY: "auto", // Helps in some cases
                        }}
                        size={1} // Optional: Forces single-line dropdown view
                      >
                        {availableThemes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <li
                    className={`nav-item ${
                      activeElement === "profile" ? "iq-show" : ""
                    }`}
                  >
                    <a
                      href="#"
                      className={`search-toggle d-flex align-items-center iq-waves-effectt ${
                        activeElement === "profile" ? "active" : ""
                      }`}
                      onClick={(e) => handleClick(e, "profile")}
                    >
                      {/* <img
                        src="/assets/images/user/1.jpg"
                        className="img-fluid rounded-circle me-3"
                        alt="user"
                      /> */}
                      <img
                        src={selectedImage || "/assets/images/user/demo.jpg"}
                        className="img-fluid rounded-circle me-1"
                        alt="user"
                      />
                      <div className="caption">
                        <h6 className="mb-0 line-height card-text-Color">
                          {Username}
                        </h6>
                        {/* <span className="font-size-12 card-text-Color">online</span> */}
                      </div>
                    </a>
                    <div className="iq-sub-dropdown iq-user-dropdown">
                      <div className="iq-card shadow-none m-0">
                        <div className="iq-card-body p-0 ">
                          <div className="bg-primary p-3">
                            <h5 className="text-white-important">{Username}</h5>
                            {/* <span className="text-white-important">online</span> */}
                          </div>
                          <Link
                            to="/user/profile"
                            className="iq-sub-card iq-bg-primary-hover text-decoration-none"
                          >
                            <div className="media align-items-center d-flex">
                              <div className="rounded card-icon bg-soft-primary">
                                <i className="ri-file-user-line" />
                              </div>
                              <div className="media-body ms-3">
                                <h6 className="mb-0 ">My Profile</h6>
                                <p className="mb-0 font-size-12 text-decoration-none">
                                  View personal profile details.
                                </p>
                              </div>
                            </div>
                          </Link>

                          <Link
                            to="/user/plans"
                            className="iq-sub-card iq-bg-primary-hover text-decoration-none"
                          >
                            <div className="media align-items-center d-flex">
                              <div className="rounded card-icon bg-soft-primary">
                                <i className="ri-file-user-line" />
                              </div>
                              <div className="media-body ms-3">
                                <h6 className="mb-0 ">My Plans</h6>
                                <p className="mb-0 font-size-12 text-decoration-none">
                                  View Purchased Plan details.
                                </p>
                              </div>
                            </div>
                          </Link>

                          {Broker == "BAJAJ" ? (
                            ""
                          ) : (
                            <Link
                              className="iq-sub-card iq-bg-warning-hover text-decoration-none"
                              onClick={(e) => handleSetApiKey(e)}
                            >
                              <div className="media align-items-center d-flex">
                                <div className="rounded card-icon bg-soft-warning">
                                  <i className="ri-profile-line" />
                                </div>
                                <div className="media-body ms-3">
                                  <h6 className="mb-0 ">Set API Key</h6>
                                </div>
                              </div>
                            </Link>
                          )}
                          <Link
                            to="/user/editprofile"
                            className="iq-sub-card iq-bg-warning-hover text-decoration-none"
                          >
                            <div className="media align-items-center d-flex">
                              <div className="rounded card-icon bg-soft-warning">
                                <i className="ri-profile-line" />
                              </div>
                              <div className="media-body ms-3">
                                <h6 className="mb-0 ">Change Password</h6>
                              </div>
                            </div>
                          </Link>

                          <Link className="iq-sub-card iq-bg-warning-hover text-decoration-none">
                            <div
                              className="media align-items-center d-flex"
                              onClick={handleBroker}
                            >
                              <div className="rounded card-icon bg-soft-warning">
                                <i className="ri-profile-line" />
                              </div>
                              <div className="media-body ms-3">
                                <h6 className="mb-0 ">API Process</h6>
                              </div>
                            </div>
                          </Link>

                          <div className="d-inline-block w-100 text-center p-3">
                            <button
                              className="addbtn iq-sign-btn"
                              onClick={logout}
                              role="button"
                            >
                              Log out
                              <i className="iconcol ri-login-box-line ms-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          ) : (
            <nav className="navbar navbar-expand-lg navbar-light p-0">
              {/* <div className="nav-item mx-5">
                <button
                  type="button"
                  className="addbtn ms-5"
                  onClick={(e) => setShowAddBrokerModal(true)}
                >
                  Add Broker
                </button>
              </div> */}
              <button
                className="navbar-toggler ms-3"
                type="button"
                data-bs-toggle="collapse"
                href="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="ri-menu-3-line" />
              </button>
              <button className="me-3 menusidebar" onClick={toggleSidebar}>
                <i className="ri-more-fill" />
              </button>
              <div className=" w-100 d-flex justify-content-end align-items-center"></div>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto navbar-list align-items-center">
                  {/* 
                  <label className="theme-switch">
                    <input type="checkbox" className="theme-switch__checkbox"
                      checked={theme === "dark"}
                      onChange={toggleTheme}
                    />
                    <div className="theme-switch__container"  >
                      <div className="theme-switch__clouds" />
                      <div className="theme-switch__stars-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z" fill="currentColor" />
                        </svg>
                      </div>
                      <div className="theme-switch__circle-container">
                        <div className="theme-switch__sun-moon-container">
                          <div className="theme-switch__moon">
                            <div className="theme-switch__spot" />
                            <div className="theme-switch__spot" />
                            <div className="theme-switch__spot" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </label> */}

                  <div className="container py-2" style={{ maxWidth: "320px" }}>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <label
                        htmlFor="theme-select"
                        className="form-label fw-semibold card-text-Color d-flex align-items-center mb-0"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <SunMoon className="me-1" size={16} />
                        Theme:
                      </label>

                      <select
                        id="theme-select"
                        value={theme}
                        onChange={(e) => changeTheme(e.target.value)}
                        className="form-select form-select-sm"
                        style={{
                          width: "140px",
                          fontSize: "0.85rem",
                          padding: "0.25rem 0.5rem",
                        }}
                      >
                        {availableThemes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* <li
                    className={`nav-item ${activeElement === "profile" ? "iq-show" : ""
                      }`}
                  >
                    <a
                      href="#"
                      className={`search-toggle d-flex align-items-center iq-waves-effectt ${activeElement === "profile" ? "active" : ""
                        }`}
                      onClick={(e) => handleClick(e, "profile")}
                    >
                      <div className="caption">
                        <button
                          className="addbtn iq-sign-btn"
                          onClick={logout}
                          role="button"
                        >
                          Log out
                          <i className="iconcol ri-login-box-line ms-2" />
                        </button>
                      </div>
                    </a>
                  </li> */}

                  <li
                    className={`nav-item ${
                      activeElement === "profile" ? "iq-show" : ""
                    }`}
                  >
                    <a
                      href="#"
                      className={`text-decoration-none search-toggle d-flex align-items-center iq-waves-effectt ${
                        activeElement === "profile" ? "active" : ""
                      }`}
                      onClick={(e) => handleClick(e, "profile")}
                    >
                      <img
                        src={selectedImage || "/assets/images/user/demo.jpg"}
                        className="img-fluid rounded-circle me-3 border border-2 border-primary"
                        alt="user"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="caption text-start">
                        <h6 className="mb-0 fw-semibold card-text-Color">
                          {Username}
                        </h6>
                        {/* <span className="font-size-12 text-muted">online</span> */}
                      </div>
                    </a>

                    <div className="iq-sub-dropdown iq-user-dropdown">
                      <div className="card shadow border-0">
                        <div className="card-body p-0">
                          <div className="bg-primary p-3 rounded-top">
                            <h5 className="text-white mb-0 card-text-Color">
                              {Username}
                            </h5>
                            {/* <span className="text-white-50">online</span> */}
                          </div>

                          {/* Menu Items */}
                          <div className="list-group list-group-flush ps-2">
                            <button
                              className="list-group-item list-group-item-action d-flex align-items-center ms-2 card-bg-color"
                              onClick={(e) => setShowAddBrokerModal(true)}
                            >
                              ➕
                              <span className="ms-2 card-text-Color">
                                Add Broker
                              </span>
                            </button>

                            <button
                              className="list-group-item list-group-item-action d-flex align-items-center card-bg-color ms-2"
                              onClick={() =>
                                navigate("/superadmin/ResponseQnA")
                              }
                            >
                              📬{" "}
                              <span className="ms-2 card-text-Color">
                                Respond to Queries
                              </span>
                            </button>
                          </div>

                          {/* Logout Button */}
                          <div className="text-center p-3 border-top">
                            <button
                              className="btn btn-danger w-100"
                              onClick={logout}
                            >
                              Log out <i className="ri-login-box-line ms-2"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          )}
        </div>
      </div>

      {showModal && (
        <div
          className="modal show"
          id="exampleModal"
          style={{ display: "block" }}
        >
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          ></div>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg border-0 rounded-4">
              <div className="modal-header card-bg-color">
                <h5
                  className="modal-title card-text-Color"
                  id="exampleModalLabel"
                >
                  🔑 Auto Login
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                />
              </div>

              <div className="modal-body">
                <div className="d-flex flex-column align-items-center gap-3">
                  {/* Auto Login Button */}
                  <button
                    className="addbtn w-75 py-2 shadow-sm btn btn-outline-primary"
                    onClick={handleAutoLoginbtn}
                    disabled={autoLoginLoading}
                  >
                    {autoLoginLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        🔑{" "}
                        <strong className="btn-text-color">Auto Login</strong>
                      </>
                    )}
                  </button>

                  {/* Data Start Button */}
                  <button
                    className="addbtn w-75 py-2 shadow-sm btn btn-outline-success"
                    onClick={handleDataStart}
                    disabled={dataStartloading}
                  >
                    {dataStartloading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        🚀{" "}
                        <strong className="btn-text-color">Data Start</strong>
                      </>
                    )}
                  </button>

                  {/* Last Pattern Button */}
                  <button
                    className="addbtn w-75 py-2 shadow-sm btn btn-outline-warning"
                    onClick={handleLastPattern}
                    disabled={lastPatternloading}
                  >
                    {lastPatternloading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        🔍{" "}
                        <strong className="btn-text-color">Last Pattern</strong>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showAddBrokerModal && (
        <div
          className="modal show"
          id="exampleModal"
          style={{ display: "block" }}
        >
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          ></div>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Broker
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setAddBrokerName("");
                    setShowAddBrokerModal(false);
                  }}
                />
              </div>
              <div>
                <div className="mx-4">
                  <label className="mt-4">Broker Name</label>
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Enter Broker Name"
                    onChange={(e) => setAddBrokerName(e.target.value)}
                    value={addBrokerName}
                  />
                </div>
                <div className="d-flex justify-content-end mb-4 mx-4">
                  <button className="addbtn" onClick={handleAddBroker}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
     
      <UpdateBrokerKey
        isVisible={isModalVisible}
        closeModal={handleCloseModal}
        Role={role}
      />

      {/* API Steps Modal */}
      {showApiStepsModal && (
        <ApiProcessModal
          brokerName={Broker}
          show={showApiStepsModal}
          onClose={() => setShowApiStepsModal(false)}
        />
      )}
    </>
  );
};

export default Header;
