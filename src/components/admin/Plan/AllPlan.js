import React, { useState, useEffect } from "react";
import Select from "react-select";

import { FaRupeeSign, FaEdit } from "react-icons/fa";
import {
  BadgeCheck,
  BadgePercent,
  CalendarDays,
  LineChart,
  Signal,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { EditPlan, Get_All_Plans } from "../../CommonAPI/User";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal"; // <-- Modal import
import Button from "react-bootstrap/Button"; // <-- Button import
import "./AllPlan.css"; // Import your custom CSS
import Content from "../../../ExtraComponent/Content";
import {
  AdminProfile,
  getAddOnPlans,
  GetAllStratgy,
  getChartingStrategyTag,
} from "../../CommonAPI/Admin";
import Swal from "sweetalert2";
import NoDataFound from "../../../ExtraComponent/NoDataFound";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import {
  Clock,
  List,
  Activity,
  Layers,
  TrendingUp,
  IndianRupee,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import {
  CalendarClock,
  BarChart2,
  FileText,
  Tags,
  ListOrdered,
} from "lucide-react";

// Make sure Bootstrap CSS is imported in your entry file (index.js or App.js)
// import 'bootstrap/dist/css/bootstrap.min.css';

const AdminServicesList = () => {
  const [plansData, setPlansData] = useState({
    loading: true,
    data: [],
    data1: [],
  });

  const [expandedOptions, setExpandedOptions] = useState([]);
  const [expandedPatternItems, setExpandedPatternItems] = useState([]);
  const [expandedPatternItems1, setExpandedPatternItems1] = useState([]);

  const redirectPlan = sessionStorage.getItem("redirectPlan");

  // State for the Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPlanData, setEditPlanData] = useState(null);
  const [planData, setPlanData] = useState({});
  const [activeTab, setActiveTab] = useState("");
  const [editablePlans, setEditablePlans] = useState([
    "ABCd",
    "XYZ",
    "Testing",
  ]);
  const [strategyTags, setStrategyTags] = useState([]); // State for strategy tag options
  const [adminProfile, setAdminProfile] = useState(null);
  const [addOnPlans, setAddOnPlans] = useState([]);

  const navigate = useNavigate();
  const adminPermission = localStorage.getItem("adminPermission");

  useEffect(() => {
    sessionStorage.setItem("SelectedPlanTab", activeTab);
  }, [activeTab]);

  const toggleOptions = (index) => {
    setExpandedOptions((prev) =>
      prev?.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    setEditPlanData("");
  }, [activeTab]);

  const toggleExpand = (index) => {
    setExpandedPatternItems((prev) =>
      prev?.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

    const toggleExpand1 = (index) => {
    setExpandedPatternItems1((prev) =>
      prev?.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Function to handle edit button click
  const handleEdit = async (plan) => {
    try {
      const res = await GetAllStratgy();
      setPlanData(res);
    } catch (error) {
      console.error("Error in editPlan", error);
    }
    setEditPlanData(plan);
    setShowEditModal(true);
  };

  useEffect(() => {
    fetchPlans();
    // fetchStarategyTag();
    fetchStrategyTags();
  }, [showEditModal]);

  const fetchPlans = async () => {
    try {
      const response = await Get_All_Plans();
      if (response.Status) {
        const filterPlan = response.Admin.filter(
          (plan) =>
            plan.Planname !== "Three Days Live" &&
            plan.Planname !== "Two Days Demo" &&
            plan.Planname !== "One Week Demo"
        );
        const filterPlanCharting = response.Charting.filter(
          (plan) =>
            plan.Planname !== "Three Days Live" &&
            plan.Planname !== "Two Days Demo" &&
            plan.Planname !== "One Week Demo"
        );
        setPlansData({
          loading: false,
          data: response.Admin,
          data1: response.Charting,
        });
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      setPlansData({ loading: false, data: [], data1: [] });
    }
  };

  const fetchAddOnPlans = async () => {
    try {
      const response = await getAddOnPlans();
      if (response.Status) {
        setAddOnPlans(response.Data);
      } else {
        setAddOnPlans([]);
      }
    } catch (error) {
      console.error("Error fetching AddOn plans:", error);
    }
  };
  useEffect(() => {
    fetchAddOnPlans();
  }, []);

  const fetchStrategyTags = async () => {
    try {
      const res = await getChartingStrategyTag();
      if (res && res.data) {
        const tags = res.data.map((tag) => ({
          value: tag.Strategytag,
          label: tag.Strategytag,
        }));
        setStrategyTags(tags); // Store fetched strategy tags in state
      }
    } catch (err) {
      console.error("Failed to fetch strategy tags");
    }
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditPlanData({
      ...editPlanData,
      [name]: value,
    });
  };

  const handleModalSave = async () => {
    try {
      const updatedPlanRequest = {
        Scalping: activeTab === "Scalping" ? editPlanData.Scalping : [],
        Option: activeTab === "Scalping" ? editPlanData["Option Strategy"] : [],
        PatternS: activeTab === "Scalping" ? editPlanData.Pattern : [],
        planname: editPlanData.Planname,
        Charting: editPlanData.ChartingSignal,
        SOPPrice: editPlanData.SOPPrice || 0.0,
        NumberofScript: editPlanData.NumberofScript || 0,
        SOPPaperTrade: editPlanData.SOPPaperTrade || 0.0,
        SOPLiveTrade: editPlanData.SOPLiveTrade || 0.0,
        ChartPerTrade: editPlanData.ChartPerTrade || 0.0,
        ChartPerMonth: editPlanData.ChartPerMonth || 0.0,
        ChartPaperTrade: editPlanData.ChartPaperTrade || 0.0, // New field
        ChartLiveTrade: editPlanData.ChartLiveTrade || 0.0, // New field
        Strategytag: editPlanData.Strategytag || [], // Pass selected strategy tags
      };

      const res = await EditPlan(updatedPlanRequest);
      if (res.Status) {
        Swal.fire({
          title: "Plan Updated",
          icon: "success",
          draggable: true,
          timer: 3000,
        });
      } else {
        Swal.fire({
          title: res.message,
          icon: "failed",
          draggable: true,
          timer: 3000,
        });
      }
      fetchPlans();
      setShowEditModal(false);
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "failed",
        draggable: true,
        timer: 3000,
      });
      console.error("Error in plan edit", error);
    }
  };

  const handleModalCancel = () => {
    setShowEditModal(false);
  };

  const fetchAdminDetials = async () => {
    try {
      const response = await AdminProfile();
      setAdminProfile(response.Data[0]);
    } catch (err) {
      console.log("Error in Fetching Admin Details", err);
    }
  };

  useEffect(() => {
    fetchAdminDetials();
  }, []);

  // Listen for redirectPlan changes and set active tab accordingly
  useEffect(() => {
    const handleTabFromRedirect = () => {
      if (redirectPlan) {
        setActiveTab(redirectPlan);
        // sessionStorage.removeItem("redirectPlan"); // Optional: clear after using
      }
    };
    handleTabFromRedirect();

    // Listen for storage changes from other tabs/windows
    const onStorage = (e) => {
      if (e.key === "redirectPlan") {
        handleTabFromRedirect();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!activeTab) {
      setActiveTab("Scalping");
    }
    if (redirectPlan) {
      setActiveTab(redirectPlan);
      sessionStorage.removeItem("redirectPlan"); // Clear after using
    }
  }, [redirectPlan]);

  return (
    <Content
      Page_title={"📌 All Admin Plans"}
      button_status={true}
      backbutton_status={true}
      route={"/admin/addplan"}
      button_title={"Add Plan"}
    >
      <div className="iq-card-body">
        <div className="d-flex align-items-center mb-3">
          <h4 className="flex-grow-1"></h4>
          <button
            className="addbtn ml-auto"
            color="addbtn"
            onClick={() => navigate("/admin/addplan")}
          >
            ➕ Add Plan
          </button>
        </div>

        <div className="container mt-4">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={activeTab || "Scalping"}>
              {/* 🛠️ Styled Tabs */}
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  backgroundColor: "#f8f9fa", // Light background for tabs
                  borderRadius: "8px 8px 0 0",
                  padding: "10px",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  display: { xs: "none", md: "flex" },
                }}
              >
                <TabList
                  aria-label="lab API tabs example"
                  sx={{
                    "& .MuiTab-root": {
                      width: "50%", // Equal width for all tabs
                      fontSize: "20px", // Bigger font size
                      fontWeight: "bold", // Bold text
                      textTransform: "none", // Remove uppercase
                      padding: "12px 20px",
                    },
                    "& .Mui-selected": {
                      color: "#1976d2", // Highlight active tab
                      borderBottom: "3px solid #1976d2", // Underline effect
                    },
                  }}
                  value={activeTab || "Scalping"}
                  onChange={(e, v) => setActiveTab(v)}
                  id="admin-plans-tabs"
                  className="mb-3 custom-tabs"
                  variant="fullWidth"
                >
                  <Tab label="📊 SOP" value="Scalping" />
                  {adminPermission?.includes("ChartingPlatform") && (
                    <Tab label="⚡ Charting" value="Charting" />
                  )}
                  <Tab label="💰 AddOn" value="AddOn" />
                </TabList>
              </Box>
              <TabPanel value="Scalping">
                {plansData.loading ? (
                  <p>Loading...</p>
                ) : plansData.data.length === 0 ? (
                  <NoDataFound />
                ) : (
                  <div className="allplans-container">
                    {plansData.data.map((plan, index) => (
                      <div key={index} className="allplan-card">
                        <div className="price">
                          <h2 className="plan-title">{plan.Planname}</h2>
                          <FaRupeeSign className="text-success" />{" "}
                          <span className="card-text-Color">
                            {plan.SOPPrice}
                          </span>
                          <hr className="card-text-Color"></hr>
                        </div>

                        <ul className="features">
                          <li className="d-flex justify-content-between align-items-center">
                            <span className="d-flex align-items-center gap-2">
                              <CalendarDays size={18} />{" "}
                              <strong className="card-text-Color">
                                Duration:
                              </strong>
                            </span>
                            <span>{plan["Plan Validity"]}</span>
                          </li>

                          <li className="d-flex justify-content-between align-items-center">
                            <span className="d-flex align-items-center gap-2">
                              <ListOrdered size={18} />{" "}
                              <strong className="card-text-Color">
                                Scripts:
                              </strong>
                            </span>
                            <span>{plan.NumberofScript}</span>
                          </li>

                          {plan.Scalping && (
                            <li className="d-flex justify-content-between align-items-center">
                              <span className="d-flex align-items-center gap-2">
                                <Activity size={18} />{" "}
                                <strong className="card-text-Color">
                                  Scalping:
                                </strong>
                              </span>
                              <span>{plan.Scalping.join(", ")}</span>
                            </li>
                          )}

                          {plan["Option Strategy"] &&
                            plan["Option Strategy"].length > 0 && (
                              <li className="d-flex justify-content-between align-items-center">
                                <span className="d-flex align-items-center gap-2">
                                  <FileText size={18} />{" "}
                                  <strong className="card-text-Color">
                                    Options:
                                  </strong>
                                </span>
                                <span className="text-end">
                                  {plan["Option Strategy"].length > 1 ? (
                                    expandedOptions.includes(index) ? (
                                      <>
                                        {plan["Option Strategy"].join(", ")}
                                        <span
                                          className="show-more ms-2"
                                          onClick={() => toggleOptions(index)}
                                          role="button"
                                          style={{ cursor: "pointer" }}
                                        >
                                          🔼
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {plan["Option Strategy"][0]}
                                        <span
                                          className="show-more ms-2"
                                          onClick={() => toggleOptions(index)}
                                          role="button"
                                          style={{ cursor: "pointer" }}
                                        >
                                          🔽
                                        </span>
                                      </>
                                    )
                                  ) : (
                                    plan["Option Strategy"].join(", ")
                                  )}
                                </span>
                              </li>
                            )}

                          {plan.Pattern && plan.Pattern.length > 0 && (
                            <li className="d-flex justify-content-between align-items-center">
                              <span className="d-flex align-items-center gap-2">
                                <LineChart size={18} />{" "}
                                <strong className="card-text-Color">
                                  Patterns:
                                </strong>
                              </span>
                              <span className="text-end">
                                {expandedPatternItems.includes(index) ? (
                                  <>
                                    {plan.Pattern.join(", ")}
                                    <span
                                      className="show-more ms-2"
                                      onClick={() => toggleExpand(index)}
                                      role="button"
                                      style={{ cursor: "pointer" }}
                                    >
                                      🔼
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    {plan.Pattern[0]}
                                    <span
                                      className="show-more ms-2"
                                      onClick={() => toggleExpand(index)}
                                      role="button"
                                      style={{ cursor: "pointer" }}
                                    >
                                      🔽
                                    </span>
                                  </>
                                )}
                              </span>
                            </li>
                          )}

                          {plan?.SOPPaperTrade > 0 && (
                            <li className="d-flex justify-content-between align-items-center">
                              <span className="d-flex align-items-center gap-2">
                                <BadgeCheck size={18} />{" "}
                                <strong className="card-text-Color">
                                  Paper Trade:
                                </strong>
                              </span>
                              <span className="text-success">
                                ₹{plan?.SOPPaperTrade}
                              </span>
                            </li>
                          )}

                          {plan?.SOPLiveTrade > 0 && (
                            <li className="d-flex justify-content-between align-items-center">
                              <span className="d-flex align-items-center gap-2">
                                <BadgePercent size={18} />{" "}
                                <strong className="card-text-Color">
                                  Live Trade:
                                </strong>
                              </span>
                              <span className="text-primary">
                                ₹{plan?.SOPLiveTrade}
                              </span>
                            </li>
                          )}
                           {plan?.GoldenStrategy?.length > 0 && (
                            <li className="d-flex justify-content-between align-items-center">
                              <span className="d-flex align-items-center gap-2">
                                <LineChart size={18} />{" "}
                                <strong className="card-text-Color">
                                  Golden Strategy:
                                </strong>
                              </span>
                              <span className="text-end">
                                {expandedPatternItems1.includes(index) ? (
                                  <>
                                    {plan?.GoldenStrategy.join(", ")}
                                    <span
                                      className="show-more ms-2"
                                      onClick={() => toggleExpand1(index)}
                                      role="button"
                                      style={{ cursor: "pointer" }}
                                    >
                                      🔼
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    {plan?.GoldenStrategy[0]}
                                    <span
                                      className="show-more ms-2"
                                      onClick={() => toggleExpand1(index)}
                                      role="button"
                                      style={{ cursor: "pointer" }}
                                    >
                                      🔽
                                    </span>
                                  </>
                                )}
                              </span>
                            </li>
                          )}
                        </ul>

                        {editablePlans?.includes(plan.Planname) ? (
                          <button
                            className="plan-btn edit-btn"
                            onClick={() => handleEdit(plan)}
                          >
                            <FaEdit className="me-2" /> Edit Plan
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}
              </TabPanel>
              {adminPermission?.includes("ChartingPlatform") && (
                <TabPanel value="Charting">
                  {plansData.loading ? (
                    <p>Loading...</p>
                  ) : plansData.data1.length === 0 ? (
                    <NoDataFound />
                  ) : (
                    <div className="allplans-container">
                      {plansData.data1.map((plan, index) => (
                        <div key={index} className="allplan-card">
                          <h2 className="plan-title">{plan.Planname}</h2>

                          <div className="price d-flex align-items-center gap-2 m-auto">
                            <FaRupeeSign className="text-success" />
                            <strong className="card-text-Color">
                              {plan.ChartPerMonth}
                            </strong>
                          </div>
                          <hr className="card-text-Color"></hr>

                          <ul className="features">
                            <li className="d-flex justify-content-between align-items-center">
                              <span className="d-flex align-items-center gap-2">
                                <CalendarClock size={18} />{" "}
                                <strong className="card-text-Color">
                                  Duration:
                                </strong>
                              </span>
                              <h6 className="mb-0">{plan["Plan Validity"]}</h6>
                            </li>

                            {plan.ChartingSignal && (
                              <li className="d-flex justify-content-between align-items-center">
                                <span className="d-flex align-items-center gap-2">
                                  <Signal size={18} />{" "}
                                  <strong className="card-text-Color">
                                    Charting Signals:
                                  </strong>
                                </span>
                                <h6 className="mb-0">
                                  {plan.ChartingSignal.join(", ")}
                                </h6>
                              </li>
                            )}

                            {plan.ChartLiveTrade !== 0 && (
                              <li className="d-flex justify-content-between align-items-center">
                                <span className="d-flex align-items-center gap-2">
                                  <BadgePercent size={18} />{" "}
                                  <strong className="card-text-Color">
                                    Live Trade Price:
                                  </strong>
                                </span>
                                <h6 className="mb-0 text-primary">
                                  ₹{plan.ChartLiveTrade}
                                </h6>
                              </li>
                            )}

                            {plan.ChartPaperTrade !== 0 && (
                              <li className="d-flex justify-content-between align-items-center">
                                <span className="d-flex align-items-center gap-2">
                                  <BadgeCheck size={18} />{" "}
                                  <strong className="card-text-Color">
                                    Paper Trade Price:
                                  </strong>
                                </span>
                                <h6 className="mb-0 text-success">
                                  ₹{plan.ChartPaperTrade}
                                </h6>
                              </li>
                            )}

                            {plan.Strategytag && (
                              <li className="d-flex justify-content-between align-items-center">
                                <span className="d-flex align-items-center gap-2">
                                  <Tags size={18} />{" "}
                                  <strong className="card-text-Color">
                                    Strategy Tag:
                                  </strong>
                                </span>
                                <h6 className="mb-0">
                                  {Array.isArray(plan.Strategytag)
                                    ? plan.Strategytag.join(", ")
                                    : plan.Strategytag}
                                </h6>
                              </li>
                            )}
                          </ul>

                          {editablePlans?.includes(plan.Planname) ? (
                            <button
                              className="plan-btn edit-btn d-flex justify-content-center align-items-center gap-2"
                              onClick={() => handleEdit(plan)}
                            >
                              <FaEdit size={18} /> Edit Plan
                            </button>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}
                </TabPanel>
              )}

              {adminPermission?.includes("ChartingPlatform") && (
                <TabPanel value="AddOn">
                  {plansData.loading ? (
                    <p>Loading...</p>
                  ) : addOnPlans.length === 0 ? (
                    <NoDataFound />
                  ) : (
                    <div className="allplans-container">
                      {addOnPlans.map((plan, index) => (
                        <div key={index} className="allplan-card">
                          <div className="price">
                            <h2 className="plan-title">{plan.Planname}</h2>
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              <FaRupeeSign className="text-success" />
                              <span className="card-text-Color">
                                {plan.Price}
                              </span>
                            </div>
                            <hr className="card-text-Color"></hr>
                          </div>

                          <ul className="features">
                            <li className="d-flex justify-content-between align-items-center">
                              <span className="d-flex align-items-center gap-2">
                                <ListOrdered size={18} />
                                <strong className="card-text-Color">
                                  No. of Scripts:
                                </strong>
                              </span>
                              <span>{plan.NumberofScript}</span>
                            </li>
                          </ul>

                          {editablePlans?.includes(plan.Planname) && (
                            <button
                              className="plan-btn edit-btn d-flex justify-content-center align-items-center gap-2"
                              onClick={() => handleEdit(plan)}
                            >
                              <FaEdit size={18} /> Edit Plan
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </TabPanel>
              )}
            </TabContext>
          </Box>
        </div>
      </div>

      {/* ========================= Modal for Editing Plan ========================= */}

      <Modal show={showEditModal} onHide={handleModalCancel} centered size="lg">
        <Modal.Header className="card-bg-color" closeButton>
          <Modal.Title>Edit Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editPlanData && (
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="Planname" className="form-label">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Planname"
                    name="Planname"
                    value={editPlanData.Planname || ""}
                    onChange={handleModalChange}
                    disabled
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="SOPPrice" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="SOPPrice"
                    name="SOPPrice"
                    value={
                      editPlanData.SOPPrice || editPlanData.ChartPerMonth || ""
                    }
                    onChange={handleModalChange}
                  />
                </div>

                {activeTab === "Scalping" && (
                  <div className="col-md-6 mb-3">
                    <label htmlFor="NumberofScript" className="form-label">
                      No. of Scripts
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="NumberofScript"
                      name="NumberofScript"
                      value={editPlanData.NumberofScript || ""}
                      onChange={handleModalChange}
                    />
                  </div>
                )}

                {activeTab === "Scalping" && (
                  <>
                    {adminProfile?.SOPLiveTrade ? (
                      <div className="col-md-6 mb-3">
                        <label htmlFor="SOPLiveTrade" className="form-label">
                          Live Trade Amount
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="SOPLiveTrade"
                          name="SOPLiveTrade"
                          value={editPlanData.SOPLiveTrade || ""}
                          onChange={handleModalChange}
                        />
                      </div>
                    ) : (
                      ""
                    )}

                    {adminProfile?.SOPPaperTrade ? (
                      <div className="col-md-6 mb-3">
                        <label htmlFor="SOPPaperTrade" className="form-label">
                          Paper Trade Amount
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="SOPPaperTrade"
                          name="SOPPaperTrade"
                          value={
                            editPlanData.SOPPaperTrade ||
                            editPlanData.ChartPaperTrade ||
                            ""
                          }
                          onChange={handleModalChange}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                )}

                {activeTab === "Scalping" && (
                  <div className="col-md-6 mb-3">
                    <label htmlFor="scalping" className="form-label">
                      Scalping Strategy
                    </label>
                    <Select
                      id="scalping"
                      name="Scalping"
                      isMulti
                      options={Object.values(planData.Scalping || {}).map(
                        (scalping) => ({
                          value: scalping,
                          label: scalping,
                        })
                      )}
                      value={(editPlanData.Scalping || []).map((scalping) => ({
                        value: scalping,
                        label: scalping,
                      }))}
                      onChange={(selectedOptions) =>
                        setEditPlanData((prev) => ({
                          ...prev,
                          Scalping: selectedOptions.map((opt) => opt.value),
                        }))
                      }
                      className="custom-select"
                    />
                  </div>
                )}

                {activeTab === "Charting" && (
                  <div className="row">
                    {/* <div className="col-md-6 mb-3">
                      <label htmlFor="ChartPerTrade" className="form-label">
                        Live Trade Amount
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="ChartPerTrade"
                        name="ChartPerTrade"
                        value={editPlanData.ChartPerTrade || ""}
                        onChange={handleModalChange}
                      />
                    </div> */}

                    {/* Segment Multi-Select */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="segment" className="form-label">
                        Segment
                      </label>
                      <Select
                        id="segment"
                        name="Segment"
                        isMulti
                        options={[
                          { value: "Cash", label: "Cash" },
                          { value: "Future", label: "Future" },
                          { value: "Option", label: "Option" },
                        ]}
                        value={(editPlanData.ChartingSignal || []).map(
                          (segment) => ({
                            value: segment,
                            label: segment,
                          })
                        )}
                        onChange={(selectedOptions) =>
                          setEditPlanData((prev) => ({
                            ...prev,
                            ChartingSignal: selectedOptions.map(
                              (opt) => opt.value
                            ),
                          }))
                        }
                        className="custom-select"
                      />
                    </div>
                    {adminProfile?.ChartPaperTrade ? (
                      <div className="col-md-6 mb-3">
                        <label htmlFor="ChartPaperTrade" className="form-label">
                          Chart Paper Trade
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="ChartPaperTrade"
                          name="ChartPaperTrade"
                          value={editPlanData.ChartPaperTrade || ""}
                          onChange={handleModalChange}
                        />
                      </div>
                    ) : (
                      ""
                    )}

                    {adminProfile?.ChartLiveTrade ? (
                      <div className="col-md-6 mb-3">
                        <label htmlFor="ChartLiveTrade" className="form-label">
                          Chart Live Trade
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="ChartLiveTrade"
                          name="ChartLiveTrade"
                          value={editPlanData.ChartLiveTrade || ""}
                          onChange={handleModalChange}
                        />
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="col-md-6 mb-3">
                      <label htmlFor="strategytag" className="form-label">
                        Strategy Tag
                      </label>
                      <Select
                        id="strategytag"
                        name="Strategytag"
                        isMulti
                        options={strategyTags.filter(
                          (tag) =>
                            !(editPlanData.Strategytag || [])?.includes(
                              tag.value
                            ) // Exclude already selected tags
                        )}
                        value={(editPlanData.Strategytag || []).map((tag) => ({
                          value: tag,
                          label: tag,
                        }))}
                        onChange={(selectedOptions) =>
                          setEditPlanData((prev) => ({
                            ...prev,
                            Strategytag: selectedOptions.map(
                              (opt) => opt.value
                            ),
                          }))
                        }
                        className="custom-select"
                      />
                    </div>
                  </div>
                )}

                {activeTab === "Scalping" && (
                  <div className="col-md-6 mb-3">
                    <label htmlFor="option" className="form-label">
                      Option Strategy
                    </label>
                    <Select
                      id="option"
                      name="Option Strategy"
                      isMulti
                      options={Object.values(planData.Option || {}).map(
                        (option) => ({
                          value: option,
                          label: option,
                        })
                      )}
                      value={(editPlanData["Option Strategy"] || []).map(
                        (option) => ({
                          value: option,
                          label: option,
                        })
                      )}
                      onChange={(selectedOptions) =>
                        setEditPlanData((prev) => ({
                          ...prev,
                          ["Option Strategy"]: selectedOptions.map(
                            (opt) => opt.value
                          ),
                        }))
                      }
                      className="custom-select"
                    />
                  </div>
                )}
                {activeTab === "Scalping" && (
                  <div className="col-md-6 mb-3">
                    <label htmlFor="pattern" className="form-label">
                      Pattern
                    </label>
                    <Select
                      id="pattern"
                      name="Pattern"
                      isMulti
                      options={Object.values(planData.Pattern || {}).map(
                        (pattern) => ({
                          value: pattern,
                          label: pattern,
                        })
                      )}
                      value={(editPlanData.Pattern || []).map((pattern) => ({
                        value: pattern,
                        label: pattern,
                      }))}
                      onChange={(selectedOptions) =>
                        setEditPlanData((prev) => ({
                          ...prev,
                          Pattern: selectedOptions.map((opt) => opt.value),
                        }))
                      }
                      className="custom-select"
                    />
                  </div>
                )}
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleModalCancel}>Cancel</Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ========================= End of Modal ========================= */}
    </Content>
  );
};

export default AdminServicesList;
