import React, { useState, useEffect } from "react";
import { BadgeCheck, Activity, Archive } from "lucide-react"; // Import icons
import { Purchasedplan } from "../../CommonAPI/User";
import Swal from "sweetalert2";
import { TabContext, TabList, TabPanel } from "@mui/lab"; // Import TabList and related components
import { Box, Tab } from "@mui/material"; // Import Tab from Material-UI
import "./MyPlan.css"; // Import external CSS

const MyPurchasedPlans = () => {
  const username = localStorage.getItem("name");
  const [plans, setPlans] = useState({ loading: true, active: [], expired: [] });
  const [tabIndex, setTabIndex] = useState("0"); // State for active tab (string for TabList)

  const formatDateForInput = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [fromDate, setFromDate] = useState(
    formatDateForInput(new Date(new Date().setMonth(new Date().getMonth() - 1)))
  );
  const [toDate, setToDate] = useState(formatDateForInput(new Date()));

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const req = { From_date: fromDate, To_date: toDate, Username: username };
        const response = await Purchasedplan(req);
        if (response.Status) {
          setPlans({
            loading: false,
            active: response.ActivePlan,
            expired: response.ExpiredPlan,
          });
        } else {
          setPlans({
            loading: false,
            active: [],
            expired: [],
          });
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch plans.",
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
        });
        setPlans({
          loading: false,
          active: [],
          expired: [],
        });
      }
    };
    fetchPlans();
  }, [username, fromDate, toDate]); // Add fromDate and toDate to dependencies

  const renderPlans = (plansData) => {
    return plansData.length > 0 ? (
      <div className="myplan-grid">
        {plansData.map((plan, index) => {
          const hasChartingSignal = plan?.ChartingSignal?.length > 0;

          return (
            <div key={index} className="myplan-plancard card-bg-color">
              <h2 className="myplan-card-title">
                {plan.Planname}
                <BadgeCheck size={24} color="#4caf50" />
              </h2>

              {plan?.NumberofScript > 0 && (
                <h4 className="myplan-card-subtitle">
                  No of Scripts: {plan?.NumberofScript}
                </h4>
              )}

              {hasChartingSignal ? (
                <>
                  <p className="myplan-card-detail">
                    <strong>Charting Signal:</strong>{" "}
                    {plan?.ChartingSignal?.join(", ")}
                  </p>
                  
                  <p className="myplan-card-detail">
                    <strong>Start Date:</strong> {plan?.StartDate}
                  </p>
                  <p className="myplan-card-detail">
                    <strong>End Date:</strong> {plan?.EndDate}
                  </p>
                </>
              ) : (
                <>
                  <p className="myplan-card-detail">
                    <strong>Scalping Strategy:</strong>{" "}
                    {plan?.Scalping?.join(", ")}
                  </p>
                  <p className="myplan-card-detail">
                    <strong>Option Strategy:</strong>{" "}
                    {plan?.["Option Strategy"]?.join(", ")}
                  </p>
                  <p className="myplan-card-detail">
                    <strong>Pattern Strategy:</strong>{" "}
                    {plan?.Pattern?.join(", ")}
                  </p>
                  <p className="myplan-card-detail">
                    <strong>Start Date:</strong> {plan?.StartDate}
                  </p>
                  <p className="myplan-card-detail">
                    <strong>End Date:</strong> {plan?.EndDate}
                  </p>
                </>
              )}

              <button className="myplan-purchased-button" disabled>
                PURCHASED <BadgeCheck size={24} color="#ffffff" />
              </button>
            </div>
          );
        })}
      </div>
    ) : (
      <p className="myplan-loading">No Plans Found</p>
    );
  };

  return (
    <div className="myplan-container card-bg-color">
      <h5 className="myplan-title">Already Purchased Plans</h5>

      {/* Tab Context for Active and Expired Plans */}
      <TabContext value={tabIndex} className="myplan-tab">
        <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "1rem" }}>
          <TabList
            onChange={(e, newValue) => setTabIndex(newValue)}
            centered
            textColor="inherit"
            indicatorColor="primary"
            sx={{
              "& .MuiTab-root": {
                fontWeight: "bold", // Bold text
                gap: "0.5rem", // Gap between icon and text
              },
            }}
          >
            <Tab
              icon={<Activity />}
              iconPosition="start"
              label="Active Plan"
              value="0"
            />
            <Tab
              icon={<Archive />}
              iconPosition="start"
              label="Expired Plan"
              value="1"
            />
          </TabList>
        </Box>

        <TabPanel value="0">
          <div className="container-fluid mb-5">
            <div className="row">
              <div className="col-md-6 mb-3">
                <h5>Select From Date</h5>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => setFromDate(e.target.value)}
                  value={fromDate}
                />
              </div>

              <div className="col-md-6 mb-3">
                <h5>Select To Date</h5>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => setToDate(e.target.value)}
                  value={toDate}
                />
              </div>
            </div>
          </div>
          {plans.loading ? (
            <p className="myplan-loading">Loading...</p>
          ) : (
            renderPlans(plans.active)
          )}
        </TabPanel>

        <TabPanel value="1">
          <div className="container-fluid mb-5">
            <div className="row">
              <div className="col-md-6 mb-3">
                <h5>Select From Date</h5>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => setFromDate(e.target.value)}
                  value={fromDate}
                />
              </div>

              <div className="col-md-6 mb-3">
                <h5>Select To Date</h5>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => setToDate(e.target.value)}
                  value={toDate}
                />
              </div>
            </div>
          </div>
          {plans.loading ? (
            <p className="myplan-loading">Loading...</p>
          ) : (
            renderPlans(plans.expired)
          )}
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default MyPurchasedPlans;
