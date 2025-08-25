import React, { useState, useEffect } from "react";
import {
  Get_All_Plans,
  Get_All_Buyed_Plans,
  BuyPlan,
  AddBalance,
  ExpirePlanDetails,
  applyCouponCode,
  GetUserBalence,
  Get_Profile_Data,
} from "../../CommonAPI/User";
import Swal from "sweetalert2";
// import Tab from "react-bootstrap/Tab";
import Tabs from "@mui/material/Tabs";
import NewsTicker from "./Expair";
import "./AllPlan.css";
import Content from "../../../ExtraComponent/Content";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Modal, Button, TextField, Stack, Typography } from "@mui/material";
import { getAddOnPlans } from "../../CommonAPI/Admin";
import { active } from "d3";
import Loader from "../../../ExtraComponent/Loader";
import {
  CalendarDays,
  ListOrdered,
  Activity,
  FileText,
  LineChart,
  BadgePercent,
  BadgeCheck,
  Repeat2,
  ShoppingCart,
  Tags,
  CalendarClock,
  Signal,
  Layers3,
} from "lucide-react";
import { FaRupeeSign } from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
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
  const [couponCode, setCouponCode] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null); // State to store selected plan details
  const [verificationMessage, setVerificationMessage] = useState(""); // State for verification message
  const [verificationColor, setVerificationColor] = useState(""); // State for message color
  const [isContinueEnabled, setIsContinueEnabled] = useState(false); // State to manage "Continue" button enable/disable
  const [userBalance, setUserBalance] = useState(0);
  const [addOnPlans, setAddOnPlans] = useState([]);
  const [showSOPModal, setShowSOPModal] = useState(false);
  const [selectedSOPIndex, setSelectedSOPIndex] = useState(null);
  const [selectedAddOnPlan, setSelectedAddOnPlan] = useState(null); // State to store selected AddOn plan
  const [value, setValue] = useState("1");
  const adminPermission = localStorage.getItem("adminPermission");
  const [getData, setData] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setVerificationMessage(""); // Reset verification message
    setVerificationColor(""); // Reset message color
    setIsContinueEnabled(false); // Disable "Continue" button
  };


  useEffect(() => {
    const getProfileData = async () => {
      try {
        const requestData = { username };
        const response = await Get_Profile_Data(requestData);

        if (response.Status) {
          setData({ loading: false, profile: response?.Data[0] });
        } else {
          setData({ loading: false, profile: {} });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setData({ loading: false, profile: {} });
      }
    };

    getProfileData();
  }, []);

  useEffect(() => {
    fetchPlans();
    fetchPurchasedPlans();
    isPlanExpired();
  }, []);

  useEffect(() => {
    fetchAddOnPlans();
  }, [value]);

  useEffect(() => {
    fetchBalance();
  }, [open]);

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
        const discountedPrice =
          actualPrice - (actualPrice * discountPercentage) / 100;

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
          focusConfirm: true, // Focus on the "Yes" button
        });

        if (result.isConfirmed) {
          HandleBuyPlan(
            selectedPlan.index,
            1,
            selectedPlan.isCharting,
            discountedPrice
          ); // Pass discounted price
        }
      } else {
        if (!selectedPlan.isCharting) {
          // SOP: Show both options
          const result = await Swal.fire({
            title: "Choose an Option",
            text: `Do you want to extend the end date or extend the number of scripts for the plan: ${
              selectedPlan.Planname || selectedPlan.PlanName
            }?`,
            icon: "question",
            // showCancelButton: true,
            confirmButtonText: "Extend End Date",
            // cancelButtonText: "Extend Number of Scripts",
            reverseButtons: false, // Ensure "Extend End Date" is on the left and "Extend Number of Scripts" is on the right
            allowOutsideClick: false, // Prevent closing the alert by clicking outside
            showCloseButton: true, // Add a close button to the top-right corner
            allowEnterKey: true, // Enable Enter key for confirmation
            focusConfirm: true, // Focus on the "Extend End Date" button
          });
          if (result.isConfirmed) {
            await HandleBuyPlan(
              selectedPlan.index,
              0,
              selectedPlan.isCharting,
              discountedPrice
            ); // Extend End Date
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            await HandleBuyPlan(
              selectedPlan.index,
              1,
              selectedPlan.isCharting,
              discountedPrice
            ); // Extend Number of Scripts
          }
        } else {
          // Charting: Only Extend End Date
          const result = await Swal.fire({
            title: "Extend End Date",
            text: `Do you want to extend the end date for the plan: ${
              selectedPlan.Planname || selectedPlan.PlanName
            }?`,
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
            await HandleBuyPlan(
              selectedPlan.index,
              0,
              selectedPlan.isCharting,
              discountedPrice
            ); // Only Extend End Date
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
          text: `Do you want to continue with this plan: ${
            selectedPlan.Planname || selectedPlan.PlanName
          } for ₹${selectedPlan.SOPPrice || selectedPlan.ChartPerMonth}?`,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          confirmButtonColor: "#28a745", // Green
          cancelButtonColor: "#d33", // Red
          focusConfirm: true, // Focus on the "Yes" button
          allowEnterKey: true, // Enable Enter key for confirmation
        });
        if (result.isConfirmed) {
          HandleBuyPlan(selectedPlan.index, 1, selectedPlan.isCharting); // Confirm purchase
        }
      } else {
        if (!selectedPlan.isCharting) {
          const result = await Swal.fire({
            title: "Choose an Option",
            text: `Do you want to extend the end date or extend the number of scripts for the plan: ${
              selectedPlan.Planname || selectedPlan.PlanName
            }?`,
            icon: "question",
            showCancelButton: false,
            confirmButtonText: "Extend End Date",
            // cancelButtonText: "Extend Number of Scripts",
            reverseButtons: false, // Ensure "Extend End Date" is on the left and "Extend Number of Scripts" is on the right
            allowOutsideClick: false, // Prevent closing the alert by clicking outside
            showCloseButton: true, // Add a close button to the top-right corner
            allowEnterKey: true, // Enable Enter key for confirmation
            focusConfirm: true, // Focus on the "Extend End Date" button
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
            text: `Do you want to extend the end date for the plan: ${
              selectedPlan.Planname || selectedPlan.PlanName
            }?`,
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
    const planDetails = isCharting
      ? plansData?.data1[index]
      : plansData?.data[index];
    if (
      ![
        "Charting Three Days Live",
        "Three Days Live",
        "Two Days Demo",
        "One Week Demo",
      ].includes(planDetails.Planname)
    ) {
      setSelectedPlan({ ...planDetails, index, isCharting, isBuyNow: true });
      handleOpen(); // Open the coupon modal
    } else {
      console.warn("Invalid plan selected:", planDetails.Planname);
    }
  };

  const handleBuyAgain = (index, isCharting) => {
    const planDetails = isCharting
      ? plansData?.data1[index]
      : plansData?.data[index];
    if (
      ![
        "Charting Three Days Live",
        "Three Days Live",
        "Two Days Demo",
        "One Week Demo",
      ].includes(planDetails.Planname)
    ) {
      setSelectedPlan({ ...planDetails, index, isCharting, isBuyNow: false });
      handleOpen(); // Open the coupon modal
    } else {
      console.warn("Invalid plan selected:", planDetails.Planname);
    }
  };

  const handleBuyNowAddon = (index) => {
    setShowSOPModal(true);
    setSelectedAddOnPlan(plansData.addonPlans[index]); // Save selected AddOn plan
  };

  const handleCloseSOPModal = () => {
    setShowSOPModal(false);
    setSelectedSOPIndex(null);
  };

  const onSelectSOPPlan = async (plan, isAddon = false) => {
    setSelectedSOPIndex(
      getUpdatedPlans.findIndex((p) => p.Planname === plan.Planname)
    );
    // Swal confirmation before processing
    await Swal.fire({
      title: `Confirm AddOn Purchase`,
      html: `<div style='text-align:center;  '>
        <b class='card-text-Color'>Plan Name:</b> <span class='card-text-Color'>${
          plan.Planname
        }</span><br/>
        <b class='card-text-Color'>Extension:</b> <span class='card-text-Color'>${
          selectedAddOnPlan?.Planname || ""
        }</span><br/>
        <b class='card-text-Color'>AddOn Price:</b> <span class='card-text-Color'>₹${
          selectedAddOnPlan?.Price || ""
        }</span>
      </div>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      focusConfirm: true,
      showCloseButton: true,
      allowEnterKey: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const req = {
            Username: username,
            Scalping: plan.Scalping,
            Option: plan["Option Strategy"],
            PatternS: plan.Pattern,
            NumberofScript: selectedAddOnPlan?.NumberofScript,
            Duration: plan["Plan Validity"],
            Planname: plan.Planname || plan.PlanName,
            SOPPrice: plan.SOPPrice,
            Extendtype: selectedAddOnPlan?.Planname,
            money: plan.SOPPrice,
            Charting: plan.ChartingSignal,
            Strategytag: [],
          };

          if (!isAddon && (plan.SOPPrice || plan.ChartPerMonth) > userBalance) {
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
              money: selectedAddOnPlan.Price,
              Activity: selectedAddOnPlan.Planname,
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
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Unable to update balance after plan purchase.",
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
              });
            }
          } else {
            Swal.fire({
              title: "Error!",
              text: buyPlanResponse.message || "Unable to purchase plan",
              icon: "error",
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
        handleCloseSOPModal();
      } else {
        // Cancelled
        handleCloseSOPModal();
      }
    });
  };

  const toggleOptions = (index) => {
    setExpandedOptions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleExpand = (index) => {
    setExpandedPatternItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const fetchPlans = async () => {
    try {
      const response = await Get_All_Plans();
      if (response.Status) {
        const filterPlan = response?.Admin.filter(
          (plan) => plan.SOPPrice !== 0
        );
        const filterPlanCharting = response?.Charting.filter(
          (plan) => plan.ChartPerMonth !== 0
        );
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
    } catch (error) {
      console.error("Error fetching purchased plans:", error);
    }
  };

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
          Extendtype:
            type === 0 ? "ExtendServiceEndDate" : "ExtendServiceCount",
          money: price || planDetails.SOPPrice,
          Charting: planDetails.ChartingSignal,
          Strategytag: planDetails.Strategytag || [],
          Extendtype: "",
          GoldenStrategy: planDetails.GoldenStrategy || "",
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
            Activity: planDetails?.Planname, // Use discounted price if available
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
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Unable to update balance after plan purchase.",
              icon: "error",
              timer: 1500,
              timerProgressBar: true,
            });
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
      plan?.SOPPrice !== 0 &&
      plan?.payment !== 0 &&
      plan.Planname !== "Three Days Live" &&
      plan.Planname !== "Two Days Demo" &&
      plan.Planname !== "One Week Demo"
  );
  const getUpdatedPlansCharting = plansData.data1?.filter(
    (plan) =>
      plan?.ChartPerMonth !== 0 &&
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

  // Calculate if any SOP plan is purchased and not expired
  const hasPurchasedSOP =
    getUpdatedPlans &&
    getUpdatedPlans.some(
      (plan) =>
        isPlanPurchased(plan.Planname) && !planExpired?.includes(plan.Planname)
    );

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
        <div className="wrapper-container">
          <Tabs
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            aria-label="main tabs"
            variant="fullWidth"
            centered
            sx={{
              backgroundColor: "#f8f9fa",
              borderRadius: "8px 8px 0 0",
              mb: 2,
              display: "flex",
              justifyContent: "center",
              "& .MuiTabs-flexContainer": {
                justifyContent: "center",
              },
              "& .MuiTab-root": {
                fontSize: "20px",
                fontWeight: "bold",
                textTransform: "none",
                padding: "12px 20px",
              },
              "& .Mui-selected": {
                color: "#1976d2",
              },
            }}
          >
            <Tab label="📊 SOP" value="1" />
            <Tab label="⚡ Charting" value="2" />
            {hasPurchasedSOP && <Tab label="💰 AddOn" value="3" />}
          </Tabs>
        </div>

        {value === "1" && (
          <div className="d-flex flex-wrap gap-2 justify-content-between">
            {plansData.loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  minHeight: "200px",
                }}
              >
                <Loader />
              </div>
            ) : getUpdatedPlans && getUpdatedPlans.length > 0 ? (
              <div className="allplans-container">
                {getUpdatedPlans.map((plan, index) => (
                  <div key={index} className="allplan-card">
                    <div className="price">
                      <h2 className="plan-title">{plan.Planname}</h2>
                      <FaRupeeSign className="text-success" />{" "}
                      <span className="card-text-Color">
                        {plan.SOPPrice || plan.payment}
                      </span>
                      <hr className="card-text-Color"></hr>
                    </div>
                    <ul className="features">
                      <li className="d-flex justify-content-between align-items-center">
                        <span className="d-flex align-items-center gap-2">
                          <CalendarDays size={18} />{" "}
                          <strong className="card-text-Color">Duration:</strong>
                        </span>
                        <span>{plan["Plan Validity"]}</span>
                      </li>

                      <li className="d-flex justify-content-between align-items-center">
                        <span className="d-flex align-items-center gap-2">
                          <ListOrdered size={18} />{" "}
                          <strong className="card-text-Color">Scripts:</strong>
                        </span>
                        <span>{plan.NumberofScript}</span>
                      </li>

                      {plan?.Scalping?.length > 0 && (
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
                       {plan.Pattern?.length > 1 ?   <span className="text-end">
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
                          </span> : <span className="text-end"> {plan.Pattern[0]}</span>}
                        </li>
                      )}
                      {plan.GoldenStrategy &&
                        plan.GoldenStrategy.length > 0 &&  (
                          getData?.profile?.Permission?.includes("Golden Strategy") ? (
                          <li className="d-flex justify-content-between align-items-center">
                          
                            <span className="d-flex align-items-center gap-2">
                              <LineChart size={18} />{" "}
                              <strong className="card-text-Color">
                                Golden Strategy:
                              </strong>
                            </span>


                           {plan.GoldenStrategy.length > 1 ? <span className="text-end">
                              { expandedPatternItems.includes(index) ? (
                                <>
                                  {plan.GoldenStrategy.join(", ")}
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
                                  {plan.GoldenStrategy[0]}
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
                            </span> :<span className="text-end">
                               {plan.GoldenStrategy[0]}
                            </span>}
                          </li>
                        ) : ""
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
                    </ul>

                    {isPlanPurchased(plan?.Planname) &&
                    !planExpired?.includes(plan?.Planname) ? (
                      <button
                        className="plan-btn buy-again"
                        onClick={() => handleBuyAgain(index, false)}
                      >
                        <Repeat2 size={18} className="me-2" /> Buy Again
                      </button>
                    ) : (
                      <button
                        className="plan-btn"
                        onClick={() => handleBuyNow(index, false)}
                      >
                        <ShoppingCart size={18} className="me-2" /> Buy Now
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="center-nodata">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src="/assets/images/no-record-found.png"
                    width="50%"
                    alt="No records found"
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {value === "2" && (
          <div className="allplans-container">
            {plansData.loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  minHeight: "200px",
                }}
              >
                <Loader />
              </div>
            ) : getUpdatedPlansCharting &&
              getUpdatedPlansCharting.length > 0 ? (
              getUpdatedPlansCharting.map((plan, index) => (
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
                        <strong className="card-text-Color">Duration:</strong>
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

                  {isPlanPurchased(plan.Planname) &&
                  !planExpired?.includes(plan?.Planname) ? (
                    <button
                      className="plan-btn buy-again d-flex justify-content-center align-items-center gap-2"
                      onClick={() => handleBuyAgain(index, true)}
                    >
                      <Repeat2 size={18} /> Buy Again
                    </button>
                  ) : (
                    <button
                      className="plan-btn d-flex justify-content-center align-items-center gap-2"
                      onClick={() => handleBuyNow(index, true)}
                    >
                      <ShoppingCart size={18} /> Buy Now
                    </button>
                  )}
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
                  }}
                >
                  <img
                    src="/assets/images/no-record-found.png"
                    width="50%"
                    alt="No records found"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {value === "3" && hasPurchasedSOP && (
          <div className="allplans-container">
            {plansData.loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  minHeight: "200px",
                }}
              >
                <Loader />
              </div>
            ) : plansData.addonPlans && plansData.addonPlans.length > 0 ? (
              plansData.addonPlans.map((plan, index) => (
                <div key={index} className="allplan-card">
                  <div className="m-auto">
                    <h2 className="plan-title d-flex align-items-center gap-2">
                      <FileText size={20} /> {plan.Planname}
                    </h2>
                    <div className="price d-flex align-items-center gap-2">
                      <FaRupeeSign className="text-success" />
                      <strong className="card-text-Color">{plan.Price}</strong>
                      <span className="per-month">/ One-time</span>
                      <hr className="card-text-Color"></hr>
                    </div>
                  </div>

                  <ul className="features">
                    <li className="d-flex align-items-center gap-2">
                      <Layers3 size={18} />
                      <strong className="card-text-Color">
                        Number of Scripts:
                      </strong>{" "}
                      {plan.NumberofScript}
                    </li>
                    {/* Add more plan details here if available */}
                  </ul>

                  <button
                    type="button"
                    className="plan-btn d-flex justify-content-center align-items-center gap-2"
                    onClick={() => handleBuyNowAddon(index, false)}
                  >
                    <ShoppingCart size={18} /> Buy Now
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
                  }}
                >
                  <img
                    src="/assets/images/no-record-found.png"
                    width="50%"
                    alt="No records found"
                  />
                </div>
              </div>
            )}
          </div>
        )}
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
          <Typography
            id="coupon-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
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

      {/* SOP Plan Selection Modal for AddOn */}
      {showSOPModal && (
        <Modal open={showSOPModal} onClose={handleCloseSOPModal}>
          <Box sx={{ ...style, width: 500 }}>
            <Typography variant="h6" gutterBottom className="card-text-Color">
              Select SOP Plan (Already Purchased)
            </Typography>
            <div style={{ maxHeight: 350, overflowY: "auto" }}>
              {getUpdatedPlans && getUpdatedPlans.length > 0 ? (
                getUpdatedPlans
                  .filter(
                    (plan) =>
                      isPlanPurchased(plan.Planname) &&
                      !planExpired?.includes(plan.Planname)
                  )
                  .map((plan, idx) => (
                    <div
                      key={idx}
                      onClick={async () => {
                        setSelectedSOPIndex(idx);
                        handleCloseSOPModal();
                        setTimeout(() => onSelectSOPPlan(plan, true), 200); // Modal close, then show Swal
                      }}
                      className={`card-sop-select card-bg-color${
                        selectedSOPIndex === idx ? " selected-card" : ""
                      }`}
                    >
                      <span className="card-text-Color">
                        <strong className="card-text-Color">
                          {plan.Planname}
                        </strong>
                      </span>{" "}
                      &nbsp;|&nbsp;{" "}
                      <span className="card-text-Color">
                        ₹{plan.SOPPrice || plan.payment}
                      </span>{" "}
                      &nbsp;|&nbsp;{" "}
                      <span className="card-text-Color">
                        Scripts: {plan.NumberofScript}
                      </span>
                    </div>
                  ))
              ) : (
                <Typography className="card-text-Color">
                  No purchased SOP plans found.
                </Typography>
              )}
            </div>
            <button className="addbtn" onClick={handleCloseSOPModal}>
              Close
            </button>
          </Box>
        </Modal>
      )}
    </Content>
  );
};

export default ServicesList;
