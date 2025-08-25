import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { BadgeCheck } from "lucide-react";
import {
  Get_All_Plans,
  Get_All_Buyed_Plans,
  BuyPlan,
  AddBalance,
  ExpirePlanDetails,
  applyCouponCode,
  GetUserBalence,
} from "../../CommonAPI/User";
import Swal from "sweetalert2";
// import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import NewsTicker from "./Expair";
import "./AllPlan.css";
import Content from "../../../ExtraComponent/Content";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Modal, Button, TextField, Stack, Typography } from '@mui/material';
import { getAddOnPlans } from "../../CommonAPI/Admin";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  padding: 4,
};

const ServicesList = () => {
  const username = localStorage.getItem("name");
  const [plansData, setPlansData] = useState({
    loading: true,
    data: [],
    data1: [],
    addonPlans: [],
  });

  const [purchasedPlans, setPurchasedPlans] = useState([]);
  const expire = localStorage.getItem("expire");
  const [planExpired, setPlanExpired] = useState([]);

  const [expandedOptions, setExpandedOptions] = useState([]);
  const [expandedPatternItems, setExpandedPatternItems] = useState([]);
  const [isContinue, setIsContinue] = useState(false);

  const [open, setOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null); // State to store selected plan details
  const [verificationMessage, setVerificationMessage] = useState(""); // State for verification message
  const [verificationColor, setVerificationColor] = useState(""); // State for message color
  const [isContinueEnabled, setIsContinueEnabled] = useState(false); // State to manage "Continue" button enable/disable
  const [userBalance, setUserBalance] = useState(0);
  const [addOnPlans, setAddOnPlans] = useState([]);

  const adminPermission = localStorage.getItem("adminPermission");


  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setVerificationMessage(""); // Reset verification message
    setVerificationColor(""); // Reset message color
    setIsContinueEnabled(false); // Disable "Continue" button
  };


  const handleVerify = async () => {
    if (selectedPlan) {
      const planDetails = selectedPlan.isCharting
        ? getUpdatedPlansCharting[selectedPlan.index]
        : getUpdatedPlans[selectedPlan.index]; // Use getUpdatedPlans or getUpdatedPlansCharting

      const req = {
        User: username,
        Planname: planDetails.Planname || planDetails.PlanName, // Ensure correct plan name is passed
        CouponCode: couponCode,
      };

      const res = await applyCouponCode(req);

      if (res.Status) {
        const actualPrice = planDetails.SOPPrice || planDetails.ChartPerMonth;
        const discountPercentage = res.Data; // Discount percentage from the response
        const discountedPrice = actualPrice - (actualPrice * discountPercentage) / 100;

        setVerificationMessage("Verified");
        setVerificationColor("green");
        setIsContinueEnabled(true); // Enable the "Continue" button
        setSelectedPlan({
          ...selectedPlan,
          discountedPrice: discountedPrice.toFixed(2), // Store the discounted price
          discountPercentage, // Store the discount percentage
        });
      } else {
        setVerificationMessage("Not Applicable");
        setVerificationColor("red");
        setIsContinueEnabled(false); // Disable the "Continue" button
      }
    } else {
      console.error("No plan selected for verification.");
    }
  };

  const handleContinue = async () => {
    handleClose(); // Close the modal
    if (selectedPlan) {
      const actualPrice = selectedPlan.SOPPrice || selectedPlan.ChartPerMonth;
      const discountedPrice = selectedPlan.discountedPrice || actualPrice;
      const discountPercentage = selectedPlan.discountPercentage || 0;

      if (selectedPlan.isBuyNow) {
        // Show Confirm Purchase modal for Buy Now
        const result = await Swal.fire({
          title: "Confirm Purchase",
          html: `
            <p>Actual Price: <strong>₹${actualPrice}</strong></p>
            <p>Discount: <strong>${discountPercentage}%</strong></p>
            <p>After Discount: <strong>₹${discountedPrice}</strong></p>
          `,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          reverseButtons: false,
          showCloseButton: true, // Add close button to the top-right corner
          allowEnterKey: true, // Enable Enter key for confirmation
          focusConfirm: true,  // Focus on the "Yes" button
        });

        if (result.isConfirmed) {
          HandleBuyPlan(selectedPlan.index, 1, selectedPlan.isCharting, discountedPrice); // Pass discounted price
        }
      } else {
        // Buy Again logic
        if (!selectedPlan.isCharting) {
          // SOP: Show both options
          const result = await Swal.fire({
            title: "Choose an Option",
            text: `Do you want to extend the end date or extend the number of scripts for the plan: ${selectedPlan.Planname || selectedPlan.PlanName}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Extend End Date",
            cancelButtonText: "Extend Number of Scripts",
            reverseButtons: false, // Ensure "Extend End Date" is on the left and "Extend Number of Scripts" is on the right
            allowOutsideClick: false, // Prevent closing the alert by clicking outside
            showCloseButton: true, // Add a close button to the top-right corner
            allowEnterKey: true, // Enable Enter key for confirmation
            focusConfirm: true,  // Focus on the "Extend End Date" button
          });
          if (result.isConfirmed) {
            await HandleBuyPlan(selectedPlan.index, 0, selectedPlan.isCharting, discountedPrice); // Extend End Date
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            await HandleBuyPlan(selectedPlan.index, 1, selectedPlan.isCharting, discountedPrice); // Extend Number of Scripts
          }
        } else {
          // Charting: Only Extend End Date
          const result = await Swal.fire({
            title: "Extend End Date",
            text: `Do you want to extend the end date for the plan: ${selectedPlan.Planname || selectedPlan.PlanName}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Extend End Date",
            cancelButtonText: "Cancel",
            reverseButtons: false,
            allowOutsideClick: false,
            showCloseButton: true,
            allowEnterKey: true,
            focusConfirm: true,
          });
          if (result.isConfirmed) {
            await HandleBuyPlan(selectedPlan.index, 0, selectedPlan.isCharting, discountedPrice); // Only Extend End Date
          }
        }
      }
    }
  };

  const handleContinueWithout = async () => {
    handleClose(); // Close the modal
    if (selectedPlan) {
      if (selectedPlan.isBuyNow) {
        // Show Confirm Purchase modal for Buy Now
        const result = await Swal.fire({
          title: "Confirm Purchase",
          text: `Do you want to continue with this plan: ${selectedPlan.Planname || selectedPlan.PlanName} for ₹${selectedPlan.SOPPrice || selectedPlan.ChartPerMonth}?`,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          confirmButtonColor: "#28a745", // Green
          cancelButtonColor: "#d33",     // Red
          focusConfirm: true,  // Focus on the "Yes" button
          allowEnterKey: true, // Enable Enter key for confirmation
        });
        if (result.isConfirmed) {
          HandleBuyPlan(selectedPlan.index, 1, selectedPlan.isCharting); // Confirm purchase
        }
      } else {
        // Show Extend End Date or Extend Number of Scripts modal for Buy Again
        // Only show 'Extend Number of Scripts' for non-charting plans
        if (!selectedPlan.isCharting) {
          const result = await Swal.fire({
            title: "Choose an Option",
            text: `Do you want to extend the end date or extend the number of scripts for the plan: ${selectedPlan.Planname || selectedPlan.PlanName}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Extend End Date",
            cancelButtonText: "Extend Number of Scripts",
            reverseButtons: false, // Ensure "Extend End Date" is on the left and "Extend Number of Scripts" is on the right
            allowOutsideClick: false, // Prevent closing the alert by clicking outside
            showCloseButton: true, // Add a close button to the top-right corner
            allowEnterKey: true, // Enable Enter key for confirmation
            focusConfirm: true,  // Focus on the "Extend End Date" button
          });
          if (result.isConfirmed) {
            await HandleBuyPlan(selectedPlan.index, 0, selectedPlan.isCharting); // Extend End Date
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            await HandleBuyPlan(selectedPlan.index, 1, selectedPlan.isCharting); // Extend Number of Scripts
          }
        } else {
          // Charting plan: Only allow Extend End Date
          const result = await Swal.fire({
            title: "Extend End Date",
            text: `Do you want to extend the end date for the plan: ${selectedPlan.Planname || selectedPlan.PlanName}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Extend End Date",
            cancelButtonText: "Cancel",
            reverseButtons: false,
            allowOutsideClick: false,
            showCloseButton: true,
            allowEnterKey: true,
            focusConfirm: true,
          });
          if (result.isConfirmed) {
            await HandleBuyPlan(selectedPlan.index, 0, selectedPlan.isCharting); // Only Extend End Date
          }
        }
      }
    }
  };

  const handleBuyNow = (index, isCharting) => {
    const planDetails = isCharting ? plansData?.data1[index] : plansData?.data[index];
    if (!["Charting Three Days Live", "Three Days Live", "Two Days Demo", "One Week Demo"].includes(planDetails.Planname)) {
      setSelectedPlan({ ...planDetails, index, isCharting, isBuyNow: true });
      handleOpen(); // Open the coupon modal
    } else {
      console.warn("Invalid plan selected:", planDetails.Planname);
    }
  };

  const handleBuyNowAddon = (index) => {
    const plan = plansData.addonPlans[index];
  }

  const handleBuyAgain = (index, isCharting) => {
    const planDetails = isCharting ? plansData?.data1[index] : plansData?.data[index];
    if (!["Charting Three Days Live", "Three Days Live", "Two Days Demo", "One Week Demo"].includes(planDetails.Planname)) {
      setSelectedPlan({ ...planDetails, index, isCharting, isBuyNow: false });
      handleOpen(); // Open the coupon modal
    } else {
      console.warn("Invalid plan selected:", planDetails.Planname);
    }
  };

  const toggleOptions = (index) => {
    setExpandedOptions((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const toggleExpand = (index) => {
    setExpandedPatternItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };


  useEffect(() => {
    fetchPlans();
    fetchPurchasedPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await Get_All_Plans();
      if (response.Status) {
        const filterPlan = response?.Admin.filter((plan) => plan.SOPPrice !== 0);
        const filterPlanCharting = response?.Charting.filter((plan) => plan.ChartPerMonth !== 0);
        // const filterPlan = response?.Admin?.filter(
        //   (plan) =>
        //     !["Three Days Live", "Two Days Demo", "One Week Demo"].includes(
        //       plan.Planname
        //     )
        // );
        // const filterPlanCharting = response?.Charting?.filter(
        //   (plan) =>
        //     ![ "Charting Three Days Live", "Three Days Live", "Two Days Demo", "One Week Demo"].includes(
        //       plan.Planname
        //     )
        // );
        setPlansData({
          loading: false,
          data: filterPlan,
          data1: filterPlanCharting,
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
        setPlansData((prevData) => ({
          ...prevData,
          addonPlans: response.Data,
        }));
      } else {
        console.error("Failed to fetch AddOn plans:", response.message);
      }
    } catch (error) {
      console.error("Error fetching AddOn plans:", error);
    }
  };
  useEffect(() => {
    fetchAddOnPlans();
  }, []);


  const fetchPurchasedPlans = async () => {
    try {
      const response = await Get_All_Buyed_Plans({ userName: username });
      if (response.Status) {
        setPurchasedPlans(response.Allotplan || []);
      }
    } catch (error) {
      console.error("Error fetching purchased plans:", error);
    }
  };
  const isPlanExpired = async () => {
    try {
      const response = await ExpirePlanDetails(username);
      if (response.Status) {
        setPlanExpired(response.Admin.Planname || []);
      }
    }
    catch (error) {
      console.error("Error fetching purchased plans:", error);
    }
  }
  useEffect(() => {
    isPlanExpired();
  }, [])

  const isPlanPurchased = (planName) => {
    return purchasedPlans.some((plan) => plan.Planname === planName);
  };

  const HandleBuyPlan = async (index, type, isCharting, price) => {
    try {
      const planDetails = isCharting
        ? plansData?.data1[index]
        : plansData?.data[index];


      if (true) {
        const req = {
          Username: username,
          Scalping: planDetails.Scalping,
          Option: planDetails["Option Strategy"],
          PatternS: planDetails.Pattern,
          NumberofScript: planDetails.NumberofScript,
          Duration: planDetails["Plan Validity"],
          Planname: planDetails.Planname || planDetails.PlanName,
          SOPPrice: price || planDetails.SOPPrice, // Use discounted price if available
          Extendtype: type === 0 ? "ExtendServiceEndDate" : "ExtendServiceCount",
          money: price || planDetails.SOPPrice,
          Charting: planDetails.ChartingSignal,
          Strategytag: planDetails.Strategytag || [],
        };

        if ((planDetails.SOPPrice || planDetails.ChartPerMonth) > userBalance) {
          return Swal.fire({
            title: "Insufficient Balance",
            text: "Please add funds to your account to proceed with the purchase.",
            icon: "warning",
            confirmButtonText: "ok",
            cancelButtonText: "Cancel",
            reverseButtons: true,
            showCloseButton: true,
          });
        }



        const buyPlanResponse = await BuyPlan(req);
        if (buyPlanResponse.Status) {
          const req1 = {
            Username: username,
            transactiontype: "Purchase",
            money: price || planDetails.SOPPrice || planDetails.ChartPerMonth,
            Activity: planDetails?.Planname // Use discounted price if available
          };
          const CheckBalanceResponse = await AddBalance(req1);

          fetchPurchasedPlans();

          if (CheckBalanceResponse.Status) {
            Swal.fire({
              title: "Success!",
              text: buyPlanResponse.message,
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
            })
          }
        } else {
          Swal.fire({
            title: "Error!",
            text: buyPlanResponse.message,
            icon: "error",
            timer: 1500,
            timerProgressBar: true,
          });
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Unabe to purchase plan",
          icon: "warning",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error in transaction:", error);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  const getUpdatedPlans = plansData.data?.filter(
    (plan) =>
      (plan?.SOPPrice !== 0 && plan?.payment !== 0) &&
      plan.Planname !== "Three Days Live" &&
      plan.Planname !== "Two Days Demo" &&
      plan.Planname !== "One Week Demo"
  );
  const getUpdatedPlansCharting = plansData.data1?.filter(
    (plan) =>
      (plan?.ChartPerMonth !== 0) &&
      plan.Planname !== "Charting Three Days Live" &&
      plan.Planname !== "Three Days Live" &&
      plan.Planname !== "Two Days Demo" &&
      plan.Planname !== "One Week Demo"
  );

  const fetchBalance = async () => {
    try {
      const response = await GetUserBalence({ userName: username });
      if (response.Status) {
        const balance = response.Balance || 0;
        setUserBalance(balance);
      }
    } catch (error) {
      console.error("Error fetching user balance:", error);
    }
  };
  useEffect(() => {
    fetchBalance();
  }, [open]);




  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Content
      Page_title={"📌 All Plans"}
      button_status={false}
      backbutton_status={false}
    >
      <div className="">
        {expire?.includes(1) ? (
          <div className="col-lg-9">
            <NewsTicker />
          </div>
        ) : (
          ""
        )}
      </div>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
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
              onChange={handleChange}
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
            >
              <Tab label="📊 SOP" value="1" />
              <Tab label="💰 AddOn" value="3" />

              {adminPermission?.includes("ChartingPlatform") ? (
                <Tab label="⚡ Charting" value="2" />
              ) : ""}


            </TabList>
          </Box>

          {/* Tabs Content */}
          <TabPanel value="1">
            <div className="d-flex flex-wrap gap-2 justify-content-between">
              {plansData.loading ? (
                <p className="allplan-loading">Loading...</p>
              ) : (getUpdatedPlans && getUpdatedPlans.length > 0 ? (
                getUpdatedPlans?.map((plan, index) => (
                  <div key={index} className="allplan-card mb-3">
                    <div className="plan-header">
                      <h2 className="allplan-card-title">{plan.Planname}</h2>
                      {isPlanPurchased(plan.Planname) && (
                        <BadgeCheck className="purchased-badge" />
                      )}
                    </div>
                    <h3 className="allplan-card-subtitle">
                      <strong className="card-text-Color">Price:</strong>
                      <FaRupeeSign /> {(plan.SOPPrice || plan.payment)}
                    </h3>
                    <h3 className="allplan-card-subtitle">
                      Duration: {plan["Plan Validity"]}
                    </h3>
                    <h3 className="allplan-card-subtitle">
                      Scripts: {plan.NumberofScript}
                    </h3>
                    <div className="plan-details">
                      <p>
                        <strong className="card-text-Color">Scalping:</strong> {plan.Scalping?.join(", ")}
                      </p>
                      <p>
                        <strong className="card-text-Color">Options:</strong>{" "}
                        {plan["Option Strategy"]?.length > 1 ? (
                          <>
                            {expandedOptions.includes(index) ? (
                              <>
                                {plan["Option Strategy"].join(", ")}
                                <span
                                  className="show-more"
                                  onClick={() => toggleOptions(index)}
                                >
                                  {" "}🔼
                                </span>
                              </>
                            ) : (
                              <>
                                {plan["Option Strategy"][0]}
                                <span
                                  className="show-more"
                                  onClick={() => toggleOptions(index)}
                                >
                                  {" "}🔽
                                </span>
                              </>
                            )}
                          </>
                        ) : (
                          plan["Option Strategy"]?.join(", ")
                        )}
                      </p>


                      <p>
                        <strong className="card-text-Color">Patterns:</strong>{" "}
                        {plan.Pattern?.length > 1 ? (
                          <>
                            {expandedPatternItems.includes(index) ? (
                              <>
                                {plan.Pattern.join(", ")}
                                <span
                                  className="show-more"
                                  onClick={() => toggleExpand(index)}
                                >
                                  {" "}🔼
                                </span>
                              </>
                            ) : (
                              <>
                                {plan.Pattern[0]}
                                <span
                                  className="show-more"
                                  onClick={() => toggleExpand(index)}
                                >
                                  {" "}🔽
                                </span>
                              </>
                            )}
                          </>
                        ) : (
                          plan.Pattern?.join(", ")
                        )}
                      </p>
                      {plan?.SOPPaperTrade > 0 && (
                        <p className="allplan-card-subtitle">
                          <strong className="card-text-Color">Paper Per Trade Price:</strong>
                          <FaRupeeSign /> {plan?.SOPPaperTrade}
                        </p>
                      )}
                      {plan?.SOPLiveTrade > 0 &&
                        <p className="allplan-card-subtitle">
                          <strong className="card-text-Color">Live Per Trade Price:</strong>
                          <FaRupeeSign /> {plan?.SOPLiveTrade}
                        </p>
                      }

 
                    </div>
                    {(isPlanPurchased(plan?.Planname) && !planExpired?.includes(plan?.Planname)) ? (
                      <button
                        type="button"
                        className="allplan-button buy-again"
                        onClick={() => handleBuyAgain(index, false)}
                      >
                        🔄 Buy Again
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="allplan-button"
                        onClick={() => handleBuyNow(index, false)}
                      >
                        🛒 Buy Now
                      </button>
                    )}
                  </div>
                ))) :
                (<div className="center-nodata">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      marginBottom: "10px",
                    }}>
                    <img
                      src="/assets/images/no-record-found.png"
                      width="50%"
                      alt="No records found"
                    />
                  </div>
                </div>)
              )}
            </div>
          </TabPanel>

          <TabPanel value="2">
            <div className="d-flex flex-wrap gap-2 justify-content-between">
              {plansData.loading ? (
                <p className="allplan-loading">Loading...</p>
              ) : (getUpdatedPlansCharting && getUpdatedPlansCharting.length > 0 ? (
                getUpdatedPlansCharting?.map((plan, index) => (
                  <div key={index} className="allplan-card mb-3">
                    <div className="plan-header">
                      <h2 className="allplan-card-title">{plan.Planname}</h2>
                      {isPlanPurchased(plan.Planname) && (
                        <BadgeCheck className="purchased-badge" />
                      )}
                    </div>
                    <h3 className="allplan-card-subtitle">
                      <FaRupeeSign /> {plan.ChartPerMonth}
                    </h3>
                    <h3 className="allplan-card-subtitle">
                      Duration: {plan["Plan Validity"]}
                    </h3>
                    {/* <h3 className="allplan-card-subtitle">
                      Scripts: {plan.NumberofScript}
                    </h3> */}
                    <div className="plan-details">
                      <p>
                        <strong className="card-text-Color">Charting Signals:</strong>{" "}
                        {plan.ChartingSignal?.join(", ")}
                      </p>
                      {plan.ChartLiveTrade !== 0 &&
                        <p className="allplan-card-subtitle">
                          <strong className="card-text-Color">Price Per Live Trade:</strong>
                          <FaRupeeSign /> {plan.ChartLiveTrade}
                        </p>}
                      {plan.ChartPaperTrade !== 0 &&
                        <p className="allplan-card-subtitle">
                          <strong className="card-text-Color">Price Per Paper Trade:</strong>
                          <FaRupeeSign /> {plan.ChartPaperTrade}
                        </p>}

                      {/* <p className="allplan-card-subtitle">
                        <strong className="card-text-Color">Fixed Per Month:</strong>
                        <FaRupeeSign /> {plan.ChartPerMonth}
                      </p> */}

                      {plan?.Strategytag && (
                        <p className="allplan-card-subtitle">
                          <strong className="card-text-Color">Strategy Tag:</strong>
                          {" "}
                          {Array.isArray(plan.Strategytag)
                            ? plan.Strategytag.join(", ")
                            : plan.Strategytag}
                        </p>
                      )}
                    </div>


                    {isPlanPurchased(plan.Planname) && !planExpired?.includes(plan?.Planname) ? (
                      <button
                        className="allplan-button buy-again"
                        onClick={() => handleBuyAgain(index, true)}
                      >
                        🔄 Buy Again
                      </button>
                    ) : (
                      <button
                        className="allplan-button"
                        onClick={() => handleBuyNow(index, true)}
                      >
                        🛒 Buy Now
                      </button>
                    )}
                  </div>
                ))) :
                (<div className="center-nodata">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      marginBottom: "10px",
                    }}>
                    <img
                      src="/assets/images/no-record-found.png"
                      width="50%"
                      alt="No records found"
                    />
                  </div>
                </div>)
              )}
            </div>
          </TabPanel>

          <TabPanel value="3">
            <div className="d-flex flex-wrap gap-2 justify-content-between">
              {plansData.loading ? (
                <p className="allplan-loading">Loading...</p>
              ) : (plansData.addonPlans && plansData.addonPlans.length > 0 ? (
                plansData.addonPlans.map((plan, index) => (
                  <div key={index} className="allplan-card mb-3">
                    <div className="plan-header">
                      <h2 className="allplan-card-title">{plan.Planname}</h2>
                      {isPlanPurchased(plan.Planname) && (
                        <BadgeCheck className="purchased-badge" />
                      )}
                    </div>
                    <h3 className="allplan-card-subtitle">
                      <strong className="card-text-Color">Price:</strong>
                      <FaRupeeSign /> {plan.Price}
                    </h3>
                    <h3 className="allplan-card-subtitle">
                      Scripts: {plan.NumberofScript}
                    </h3>
                    <div className="plan-details">
                      {/* Add more AddOn plan details here if needed */}
                    </div>
                    <button
                      type="button"
                      className="allplan-button"
                      onClick={() => handleBuyNowAddon(index, false)}
                    >
                      🛒 Buy Now
                    </button>
                  </div>
                ))
              ) : (
                <div className="center-nodata">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      marginBottom: "10px",
                    }}>
                    <img
                      src="/assets/images/no-record-found.png"
                      width="50%"
                      alt="No records found"
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        </TabContext>
      </Box>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="coupon-modal-title"
        aria-describedby="coupon-modal-description"
        className="coupon-modal"
      >

        <Box sx={style}>
          {/* Close Button */}
          <Button
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 5,
              right: 8,
              minWidth: "auto",
              padding: 1,
              color: "#000",
              backgroundColor: "transparent",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
              transition: "background-color 0.3s ease",
            }}
          >
            ✖
          </Button>
          <Typography id="coupon-modal-title" variant="h6" component="h2" gutterBottom>
            Enter Coupon Code
          </Typography>

          {/* Input + Verify Button */}
          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <TextField
              fullWidth
              label="Coupon Code"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
                setVerificationMessage(""); // Clear message on input change
                setIsContinueEnabled(false); // Disable "Continue" button on input change
              }}
            />
            <Button variant="outlined" onClick={handleVerify}>
              Verify
            </Button>
          </Stack>

          {/* Verification Message */}
          {verificationMessage && (
            <Typography
              variant="body2"
              sx={{ color: verificationColor, marginTop: "8px" }}
            >
              {verificationMessage}
            </Typography>
          )}

          {/* Continue Button (Dynamic) */}
          <Stack direction="column" spacing={2} mt={3}>
            {verificationMessage === "Verified" && isContinueEnabled ? (
              <button
                variant="contained"
                className="allplan-button buy-again"
                onClick={handleContinue}
                disabled={!isContinueEnabled}
                disableRipple={!isContinueEnabled}
              >
                Continue
              </button>
            ) : (
              <button
                variant="text"
                className="addbtn border card-text-Color"
                onClick={handleContinueWithout}
              >
                Continue without Coupon
              </button>
            )}
          </Stack>
        </Box>
      </Modal>

    </Content>
  );
};

export default ServicesList;
