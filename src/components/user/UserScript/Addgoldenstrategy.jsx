import { useLocation, useNavigate } from "react-router-dom";
import AddForm from "../../../ExtraComponent/FormData2";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { GET_EXPIRY_DATE, OptionSST_API } from "../../CommonAPI/Admin";
import { AddOptionScript } from "../../CommonAPI/User";
import { Modal } from "react-bootstrap";
import Content from "../../../ExtraComponent/Content";
import { Tabs, Tab } from "react-bootstrap";
import { FaUserAlt, FaChartLine } from "react-icons/fa";
import "./TabStyles.css";
import { toast } from "react-toastify";
import { getOptionSymbol } from "../../CommonAPI/Common";
import axios from "axios";
import * as Config from "../../../Utils/Config";
import { text } from "../../../ExtraComponent/IconTexts";

const AddClient = () => {
  const location = useLocation();
  const userName = localStorage.getItem("name");
  const navigate = useNavigate();

  // Simplified state management
  const [getExpiry, setExpiry] = useState({ loading: true, data: [] });
  const [symbolOptions, setSymbolOptions] = useState([]);
  const [exchangeOptions, setExchangeOptions] = useState([]);
  const [activeTab, setActiveTab] = useState("MomentumPicker");
  const [tabPermission, setTabPermission] = useState([]);
  const [optionSSTData, setOptionSSTData] = useState([]);

  // Helper function for error alerts
  const showErrorAlert = (text) => {
    Swal.fire({
      backdrop: "#121010ba",
      confirmButtonColor: "#1ccc8a",
      title: "Error",
      text: text,
      icon: "error",
      timer: 1500,
      timerProgressBar: true,
    });
  };

  // Get end date helper
  const getEndData = (stg) => {
    const dataWithoutLastItem = location?.state?.data?.scriptType?.data.slice(
      0,
      -1
    );
    const foundItem = dataWithoutLastItem?.find((item) =>
      item["GoldenStrategy"]?.includes(stg)
    );
    return foundItem?.EndDate;
  };

  // Initialize tab permissions
  useEffect(() => {
    const scriptData = location?.state?.data?.scriptType;
    if (scriptData?.data?.[scriptData.len]?.CombineGoldenStrategy) {
      setTabPermission(scriptData.data[scriptData.len].CombineGoldenStrategy);
    }
  }, [location?.state?.data?.scriptType]);

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      MainStrategy: location.state.data.selectStrategyType,
      Strategy: "",
      Username: "",
      Symbol: "",
      Targetvalue: 1.0,
      Slvalue: 1.0,
      FirstOptiontype: "CE",
      TStype: "Point",
      Quantity: 1,
      Exchange: "",
      Striketype: "Depth_of_Strike",
      DepthofStrike: 1,
      Lower_Range: 0.0,
      Higher_Range: 0.0,
      EntryTime: "09:15:00",
      ExitTime: "15:14:00",
      ExitDay: "Intraday",
      Trade_Execution: "Paper Trade",
      TType: "",
      expirydata1: "",
      Expirytype: "",
      Trade_Count: 1,
      Group: "",
      WorkingDay: [

        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
      ],
      Profit: "0",
      Loss: "0",
      CallExitTargettype: "",
      PutExitTargettype: "",
      CallExitSltype: "",
      PutExitSltype: "",
      NoofEntry: 1,
    },

    validate: (values) => {
      const errors = {};
      const maxTime = "15:29:59";
      const minTime = "09:15:00";

      // Required field validations
      const requiredFields = {
        TType: "Please select a TType.",
        Symbol: "Please select a symbol type.",
        TStype: "Please select a TStype.",
        Trade_Execution: "Please Select Trade Execution.",
        ExitDay: "Please select an exit day.",
        Expirytype: "Please select an expiry type.",
        Striketype: "Please select a strike type.",
      };

      Object.entries(requiredFields).forEach(([field, message]) => {
        if (!values[field]) {
          errors[field] = message;
        }
      });
      // Group
      if (!values.Group) {
        errors.Group = "Please Fill Unique Name.";
      }

      // Numeric validations
      if (!values.Targetvalue || values.Targetvalue == 0) {
        errors.Targetvalue =
          values.Targetvalue == 0
            ? "Target Can Not be Zero"
            : "Please Enter a Target Value.";
      }

      if (!values.Slvalue || values.Slvalue == 0) {
        errors.Slvalue =
          values.Slvalue == 0
            ? "Stoploss Can Not be Zero"
            : "Please Enter a Stop Loss Value.";
      }

      if (!values.Quantity || values.Quantity == 0) {
        errors.Quantity = "Please enter the Lot.";
      }

      if (!values.Trade_Count || values.Trade_Count == 0) {
        errors.Trade_Count = "Please Enter Trade Count.";
      }

      // Time validations
      if (
        !values.EntryTime ||
        values.EntryTime < minTime ||
        values.EntryTime > maxTime
      ) {
        errors.EntryTime = !values.EntryTime
          ? "Please Select Entry Time."
          : values.EntryTime < minTime
          ? "Entry Time Must be After 09:15:00."
          : "Entry Time Must be Before 15:29:59.";
      }

      if (
        !values.ExitTime ||
        values.ExitTime < minTime ||
        values.ExitTime > maxTime
      ) {
        errors.ExitTime = !values.ExitTime
          ? "Please Select Exit Time."
          : values.ExitTime < minTime
          ? "Exit Time Must be After 09:15:00."
          : "Exit Time Must be Before 15:29:59.";
      }

      // Premium Range validations
      if (values.Striketype === "Premium_Range") {
        if (!values.Lower_Range)
          errors.Lower_Range = "Please enter the lower range.";
        if (!values.Higher_Range)
          errors.Higher_Range = "Please enter the higher range.";
      }

      // Depth of Strike validations
      if (values.Striketype === "Depth_of_Strike") {
        const depth = Number(values.DepthofStrike);
        if (depth > 10 || depth < -10 || depth === 0) {
          errors.DepthofStrike =
            "Enter Depth of Strike value between -10 to 10 excluding 0";
        }
      }

      // Max Profit/Loss validations
      if (!values.Profit) errors.Profit = "Please Enter Maximum Profit";
      if (!values.Loss) errors.Loss = "Please Enter Maximum Loss";

      // Working day validation
      if (!values.WorkingDay?.length) {
        errors.WorkingDay = "Please select Working day";
      }

      // MomentumPicker specific validations
      if (activeTab === "MomentumPicker") {
        const momentumFields = {
          CallExitTargettype: "Please select Call Target Re-entry Type",
          PutExitTargettype: "Please select Put Target Re-entry Type",
          CallExitSltype: "Please select Call Stoploss Re-entry Type",
          PutExitSltype: "Please select Put Stoploss Re-entry Type",
        };

        Object.entries(momentumFields).forEach(([field, message]) => {
       
          if (!values[field]) {
            errors[field] = message;
          }
        });
      }


      return errors;
    },

    onSubmit: async (values) => {
      // Pre-submission validations
      if (values.EntryTime >= values.ExitTime) {
        return showErrorAlert("Exit Time should be greater than Entry Time");
      }

      if (
        values.Striketype === "Premium_Range" &&
        Number(values.Lower_Range) >= Number(values.Higher_Range)
      ) {
        return showErrorAlert(
          "Higher Range should be Greater than Lower Range"
        );
      }

      const req = {
        MainStrategy: "Golden Strategy",
        Strategy: activeTab,
        Username: userName,
        Symbol: values.Symbol,
        Striketype: values.Striketype,
        DepthofStrike:
          values.Striketype === "Premium_Range"
            ? "0"
            : Number(values.DepthofStrike) || 0,
        LowerRange:
          values.Striketype === "Premium_Range" ? values.Lower_Range || 0 : 0,
        HigherRange:
          values.Striketype === "Premium_Range" ? values.Higher_Range || 0 : 0,
        FirstOptiontype: values.FirstOptiontype,
        Group: values.Group || "",
        TType: values.TType,
        Quantity: parseFloat(values.Quantity),
        TradeCount: values.Trade_Count,
        NoofEntry: values.NoofEntry,
        WorkingDay: values.WorkingDay?.map((item) => item?.value || item) || [],
        Loss: Number(values.Loss),
        Profit: Number(values.Profit),
        TStype: values.TStype,
        Targetvalue: parseFloat(values.Targetvalue),
        Slvalue: parseFloat(values.Slvalue),
        CallExitTargettype: values.CallExitTargettype,
        PutExitTargettype: values.PutExitTargettype,
        CallExitSltype: values.CallExitSltype,
        PutExitSltype: values.PutExitSltype,
        EntryTime: values.EntryTime,
        ExitTime: values.ExitTime,
        ExitDay: values.ExitDay,
        TradeExecution: values.Trade_Execution,
        serendate: getEndData(activeTab),
        Expirytype: values.Expirytype,
        Planname: location?.state?.data?.scriptType?.data?.find((item) =>
          item.GoldenStrategy?.includes(activeTab)
        )?.Planname,
        EntryPrice: 0.0,
        EntryRange: 0.0,
        BufferPointCE: 0,
        BufferPointPE: 0,
      };

      try {
        // Show loader while adding script
        Swal.fire({
          title: "Adding Option Script...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // API Call
        const response = await AddOptionScript(req);

        // Close loader
        Swal.close();

        // Handle Response
        if (response?.Status) {
          Swal.fire({
            title: "✅ Success!",
            text: "Option Script Added Successfully",
            icon: "success",
            confirmButtonText: "OK",
            timer: 1500,
          });

          // Save strategy type in session
          sessionStorage.setItem("redirectStrategyType", "Golden Strategy");

          // Reset form
          formik.resetForm();

          // Navigate after short delay
          setTimeout(() => navigate("/user/dashboard"), 1500);
       

        } else {
          // Handle API error response
          showErrorAlert(response?.message || "❌ Failed to add script");
        }
      } catch (error) {
        // Close loader if error occurs
        Swal.close();

        console.error("Error adding option script:", error);

        // Show error alert
        showErrorAlert("⚠️ An error occurred while adding the script");
      }
    },
  });

  // Fetch exchange options
  useEffect(() => {
    const fetchExchangeOptions = async () => {
      try {
        const response = await axios.get(`${Config.base_url}OptionExchange`);
        if (response.data?.Exchange) {
          const formattedOptions = response.data.Exchange.map((exchange) => ({
            label: exchange,
            value: exchange,
          }));
          setExchangeOptions(formattedOptions);
          if (formattedOptions.length > 0) {
            formik.setFieldValue("Exchange", formattedOptions[0].value);
          }
        }
      } catch (error) {
        console.error("Error fetching exchanges:", error);
        toast.error("Failed to fetch exchange options.");
      }
    };

    fetchExchangeOptions();
  }, []);

  // Fetch symbol options
  const fetchSymbolOptions = async () => {
    if (!formik.values.Exchange) return;

    try {
      const response = await getOptionSymbol(formik.values.Exchange);
      if (response?.Symbol) {
        const formattedSymbols = response.Symbol.map((symbol) => ({
          label: symbol,
          value: symbol,
        }));
        setSymbolOptions(formattedSymbols);
        if (formattedSymbols.length > 0) {
          formik.setFieldValue("Symbol", formattedSymbols[0].value);
        }
      }
    } catch (error) {
      console.error("Error fetching symbol options:", error);
      toast.error("Failed to fetch symbol options.");
    }
  };

  useEffect(() => {
    fetchSymbolOptions();
  }, [formik.values.Exchange]);

  // Set expiry type based on symbol
  useEffect(() => {
    if (formik.values.Symbol === "NIFTY") {
      formik.setFieldValue("Expirytype", "Weekly");
    } else {
      formik.setFieldValue("Expirytype", "Monthly");
    }
  }, [formik.values.Symbol]);

  // Fetch expiry dates
  const getExpriyData = async () => {
    if (!formik.values.Exchange || !formik.values.Symbol) return;

    const data = {
      Exchange: formik.values.Exchange,
      Instrument: formik.values.Exchange === "NFO" ? "FUTIDX" : "IO",
      Symbol: formik.values.Symbol,
      Strike: "",
    };

    try {
      const response = await GET_EXPIRY_DATE(data);
      if (response.Status && response["Expiry Date"]?.length > 0) {
        setExpiry({
          loading: false,
          data: response["Expiry Date"],
        });
        formik.setFieldValue("expirydata1", response["Expiry Date"][0]);
      } else {
        setExpiry({ loading: false, data: [] });
        formik.setFieldValue("expirydata1", "");
      }
    } catch (err) {
      console.error("Error fetching expiry data:", err);
      setExpiry({ loading: false, data: [] });
    }
  };

  useEffect(() => {
    getExpriyData();
  }, [formik.values.Symbol]);

  // Fetch Option SST data
  const fetchOptionSST = async () => {
    const requiredFields = [
      "Exchange",
      "Symbol",
      "Expirytype",
      "Striketype",
      "DepthofStrike",
    ];

    if (
      !requiredFields.every((field) => formik.values[field]) ||
      !getExpiry.data[0]
    ) {
      return;
    }

    const req = {
      Strategy:
        activeTab === "MomentumPicker" ? "LongStrangle" : "LongIronButterfly",
      Exchange: formik.values.Exchange,
      Symbol: formik.values.Symbol,
      Instrument: formik.values.Exchange === "NFO" ? "FUTIDX" : "IO",
      LowerRange: formik.values.Lower_Range,
      HigherRange: formik.values.Higher_Range,
      expirydata1: getExpiry.data[0],
      Expirytype: formik.values.Expirytype,
      Striketype: formik.values.Striketype,
      DepthofStrike: formik.values.DepthofStrike,
      DeepStrike: 2,
      CEDepthLower: 0.0,
      CEDepthHigher: 0.0,
      PEDepthLower: 0.0,
      PEDepthHigher: 0.0,
      CEDeepLower: 0.0,
      CEDeepHigher: 0.0,
      PEDeepLower: 0.0,
      PEDeepHigher: 0.0,
    };

    try {
      const response = await OptionSST_API(req);
      setOptionSSTData(response);
    } catch (error) {
      console.error("Error fetching Option SST data:", error);
    }
  };

  useEffect(() => {
    fetchOptionSST();
  }, [
    formik.values.DepthofStrike,
    formik.values.Striketype,
    formik.values.Expirytype,
    formik.values.Symbol,
    formik.values.Exchange,
    getExpiry.data,
    activeTab,
  ]);

  // Form field configurations
  const SymbolSelectionArr = [
    {
      name: "Exchange",
      label: "Exchange",
      type: "select",
      options: exchangeOptions,
      hiding: false,
      label_size: 12,
      col_size: 3,
      headingtype: 1,
      disable: false,
    },
    {
      name: "Symbol",
      label: "Symbol",
      type: "select",
      options: symbolOptions,
      hiding: false,
      label_size: 12,
      col_size: 3,
      headingtype: 1,
      disable: false,
    },
    {
      name: "Expirytype",
      label: "Expiry Type",
      type: "select",
      options:
        formik.values.Symbol === "NIFTY" || formik.values.Symbol === "SENSEX"
          ? [
              { label: "Weekly", value: "Weekly" },
              { label: "Monthly", value: "Monthly" },
            ]
          : [{ label: "Monthly", value: "Monthly" }],
      hiding: false,
      label_size: 12,
      col_size: 3,
      headingtype: 1,
      disable: false,
    },
  ];

  const EntryRuleArr = [
    {
      name: "Striketype",
      label: "Strike Type",
      type: "select",
      options: [
        { label: "Depth of Strike", value: "Depth_of_Strike" },
        { label: "Premium Range", value: "Premium_Range" },
      ],
      hiding: false,
      label_size: 12,
      col_size: 6,
      headingtype: 2,
      disable: false,
      iconText: text.strikeType,
    },
    {
      name: "DepthofStrike",
      label: "Depth of Strike",
      type: "number",
      showWhen: (value) => value.Striketype === "Depth_of_Strike",
      hiding: false,
      label_size: 12,
      col_size: 6,
      headingtype: 2,
      disable: false,
      iconText: text.depthOfStrike,
    },
    {
      name: "Lower_Range",
      label: "Lower Range",
      type: "text3",
      hiding: false,
      showWhen: (value) => value.Striketype === "Premium_Range",
      label_size: 12,
      col_size: 6,
      headingtype: 2,
      disable: false,
      iconText: text.lowerRange,
    },
    {
      name: "Higher_Range",
      label: "Higher Range",
      type: "text3",
      hiding: false,
      showWhen: (value) => value.Striketype === "Premium_Range",
      label_size: 12,
      col_size: 6,
      headingtype: 2,
      disable: false,
      iconText: text.higherRange,
    },
    {
      name: "FirstOptiontype",
      label: "First Trade Option Type",
      type: "select",
      options: [
        { label: "CALL", value: "CE" },
        { label: "PUT", value: "PE" },
      ],
      hiding: false,
      label_size: 12,
      col_size: 6,
      headingtype: 2,
      disable: false,
      showWhen: (value) => activeTab === "MomentumPicker",
    },
    {
      name: "Group",
      label: "Unique Name",
      type: "text",
      hiding: false,
      label_size: 12,
      col_size: 6,
      headingtype: 2,
      disable: false,
    },
  ];

  const ExitRuleArr = [
    {
      name: "TStype",
      label: "Measurement Type",
      type: "select",
      options: [
        { label: "Point", value: "Point" },
        { label: "Percentage", value: "Percentage" },
      ],
      hiding: false,
      label_size: 12,
      col_size: 4,
      headingtype: 3,
      disable: false,
      iconText: text.measurementType,
    },
    {
      name: "Targetvalue",
      label: "Target",
      type: "text3",
      hiding: false,
      label_size: 12,
      headingtype: 4,
      col_size: 4,
      disable: false,
    },
    {
      name: "Slvalue",
      label: "StopLoss",
      type: "text3",
      hiding: false,
      label_size: 12,
      col_size: 4,
      headingtype: 4,
      disable: false,
      iconText: activeTab !== "MomentumPicker" ? text.ExitRuleStopLoss : "",
    },
    {
      name: "CallExitTargettype",
      label: "Call Target Re-entry",
      type: "select",
      options: [
        { label: "CALL", value: "CE" },
        { label: "PUT", value: "PE" },
      ],
      hiding: false,
      label_size: 12,
      col_size: 3,
      headingtype: 4,
      disable: false,
      showWhen: (value) => activeTab === "MomentumPicker",
    },
    {
      name: "CallExitSltype",
      label: "Call Stoploss Re-entry",
      type: "select",
      options: [
        { label: "CALL", value: "CE" },
        { label: "PUT", value: "PE" },
      ],
      hiding: false,
      label_size: 12,
      col_size: 3,
      headingtype: 4,
      disable: false,
      showWhen: (value) => activeTab === "MomentumPicker",
    },
    {
      name: "PutExitTargettype",
      label: "Put Target Re-entry",
      type: "select",
      options: [
        { label: "CALL", value: "CE" },
        { label: "PUT", value: "PE" },
      ],
      hiding: false,
      label_size: 12,
      col_size: 3,
      headingtype: 4,
      disable: false,
      showWhen: (value) => activeTab === "MomentumPicker",
    },
    {
      name: "PutExitSltype",
      label: "Put Stoploss Re-entry",
      type: "select",
      options: [
        { label: "CALL", value: "CE" },
        { label: "PUT", value: "PE" },
      ],
      hiding: false,
      label_size: 12,
      col_size: 3,
      headingtype: 4,
      disable: false,
      showWhen: (value) => activeTab === "MomentumPicker",
    },
  ];

  const RiskManagementArr = [
    {
      name: "TType",
      label: "Trade Type",
      type: "select",
      options: [
        { label: "BUY", value: "BUY" },
        { label: "SELL", value: "SELL" },
      ],
      hiding: false,
      label_size: 12,
      col_size: 4,
      headingtype: 4,
      disable: false,
    },
    {
      name: "Quantity",
      label: "Lot",
      type: "text3",
      hiding: false,
      label_size: 12,
      col_size: 4,
      headingtype: 4,
      disable: false,
    },
    {
      name: "NoofEntry",
      label: "Number of Entries",
      type: "text3",
      label_size: 12,
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
      showWhen: (value) => activeTab !== "MomentumPicker",
    },
    {
      name: "Trade_Count",
      label: "No. Of Cycle",
      type: "text3",
      label_size: 12,
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
      iconText: text.NoOfCycyle,
    },
    {
      name: "WorkingDay",
      label: "Working Day",
      type: "multiselect",
      options: [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
      ],
      label_size: 12,
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
    },
    {
      name: "Profit",
      label: "Max Profit",
      type: "text3",
      label_size: 12,
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
    },
    {
      name: "Loss",
      label: "Max Loss",
      type: "text3",
      label_size: 12,
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
    },
  ];

  const TimeDurationArr = [
    {
      name: "EntryTime",
      label: "Entry Time",
      type: "timepiker",
      hiding: false,
      label_size: 12,
      col_size: 4,
      headingtype: 5,
      disable: false,
    },
    {
      name: "ExitTime",
      label: "Exit Time",
      type: "timepiker",
      hiding: false,
      label_size: 12,
      col_size: 4,
      headingtype: 5,
      disable: false,
    },
    {
      name: "ExitDay",
      label: "Exit Day",
      type: "select",
      options: [
        { label: "Intraday", value: "Intraday" },
        { label: "Delivery", value: "Delivery" },
      ],
      hiding: false,
      label_size: 12,
      col_size: 4,
      headingtype: 5,
      disable: false,
    },
  ];

  const OtherParameterArr = [
    {
      name: "Trade_Execution",
      label: "Trade Execution",
      type: "select",
      options: [
        { label: "Paper Trade", value: "Paper Trade" },
        { label: "Live Trade", value: "Live Trade" },
      ],
      label_size: 12,
      col_size: 4,
      headingtype: 6,
      disable: false,
      hiding: false,
    },
  ];

  const fields = [
    {
      name: "Heading",
      label: "Symbol_Selection",
      type: "heading",
      hiding: false,
      label_size: 12,
      headingtype: 1,
      data: SymbolSelectionArr,
      col_size: 12,
      disable: false,
    },
    {
      name: "Heading",
      label: "Entry_Rule",
      type: "heading",
      hiding: false,
      label_size: 12,
      col_size: 12,
      headingtype: 11,
      data: EntryRuleArr,
      data1: optionSSTData && optionSSTData || [],
      disable: false,
    },
    {
      name: "Heading",
      label: "Risk_Management",
      type: "heading",
      hiding: false,
      label_size: 12,
      col_size: 12,
      headingtype: 4,
      data: RiskManagementArr.filter(
        (item) => !item.showWhen || item.showWhen(formik.values)
      ),
      disable: false,
    },
    {
      name: "Heading",
      label: "Exit_Rule",
      type: "heading",
      hiding: false,
      label_size: 12,
      col_size: 12,
      headingtype: 3,
      data: ExitRuleArr.filter(
        (item) => !item.showWhen || item.showWhen(formik.values)
      ),
      disable: false,
    },
    {
      name: "Heading",
      label: "Time_Duration",
      type: "heading",
      hiding: false,
      label_size: 12,
      col_size: 12,
      headingtype: 5,
      data: TimeDurationArr,
      disable: false,
    },
    {
      name: "Heading",
      label: "Other_Parameters",
      type: "heading",
      hiding: false,
      label_size: 12,
      col_size: 12,
      headingtype: 6,
      data: OtherParameterArr,
      disable: false,
    },
  ];

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <Content
      Page_title={"📌 Add Script - Golden Strategy"}
      button_status={false}
      backbutton_status={false}
    >
      <div className="d-flex flex-column align-items-center">
        {tabPermission?.length > 0 && (
          <Tabs
            id="custom-tabs-newMarket"
            activeKey={activeTab}
            onSelect={handleTabChange}
            className="custom-tabs mb-3"
            justify
          >
            {tabPermission?.includes("MomentumPicker") && (
              <Tab
                eventKey="MomentumPicker"
                title={
                  <div className="d-flex align-items-center gap-2 tab-title-newmarket">
                    <FaUserAlt className="icon-newmarket" />
                    Momentum Picker
                  </div>
                }
              >
                <AddForm
                  fields={fields.filter(
                    (field) => !field.showWhen || field.showWhen(formik.values)
                  )}
                  btn_name="Add"
                  btn_name1="Cancel"
                  formik={formik}
                  btn_name1_route="/user/dashboard"
                />
              </Tab>
            )}

            {tabPermission?.includes("Jobbing") && (
              <Tab
                eventKey="Jobbing"
                title={
                  <div className="d-flex align-items-center gap-2 tab-title-newmarket">
                    <FaChartLine className="icon-newmarket" />
                    Jobbing
                  </div>
                }
              >
                <AddForm
                  fields={fields.filter(
                    (field) => !field.showWhen || field.showWhen(formik.values)
                  )}
                  btn_name="Add"
                  btn_name1="Cancel"
                  formik={formik}
                  btn_name1_route="/user/dashboard"
                />
              </Tab>
            )}
          </Tabs>
        )}
      </div>
    </Content>
  );
};

export default AddClient;
