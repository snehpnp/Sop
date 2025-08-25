import { useLocation, useNavigate } from "react-router-dom";
import AddForm from "../../../ExtraComponent/FormData2";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { GET_EXPIRY_DATE, ExpriyEndDate } from "../../CommonAPI/Admin";
import { AddScript, CheckPnL, getOptionType } from "../../CommonAPI/User";
import Button from "react-bootstrap/Button";

import axios from "axios";
import * as Config from "../../../Utils/Config";
import { optionStrategyText, text } from "../../../ExtraComponent/IconTexts";
import { Modal } from "react-bootstrap";
import { getOptionSymbol } from "../../CommonAPI/Common";
import { toast } from "react-toastify";

const AddClient = (Planname) => {
  const location = useLocation();
  const userName = localStorage.getItem("name");
  const navigate = useNavigate();
  const [getExpiry, setExpiry] = useState({
    loading: true,
    data: [],
  });
  const [serviceEndDate, setServiceEndDate] = useState("");
  const [showPnl, setShowPnl] = useState(false);
  const [symbolOptions, setSymbolOptions] = useState([]);
  const [exchangeOptions, setExchangeOptions] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [optionRadioType, setOptionRadioType] = useState([]);
  const getPlanname = localStorage.getItem("Planname");

  const [PnlData, setPnlData] = useState({
    MaximumProfit: "",
    MaximumLoss: "",
    SpotPriceMaximumProfit1: "",
    SpotPriceMaximumProfit2: "",
    SpotPriceMaximumLoss1: "",
    SpotPriceMaximumLoss2: "",
    NoprofitLoss1: "",
    NoprofitLoss2: "",
  });

  const SweentAlertFun = (text) => {
    Swal.fire({
      // background: "#1a1e23 ",
      backdrop: "#121010ba",
      confirmButtonColor: "#1ccc8a",
      title: "Error",
      text: text,
      icon: "error",
      timer: 1500,
      timerProgressBar: true,
    });
  };

  const getEndData = (stg) => {
    const dataWithoutLastItem = location?.state?.data?.scriptType?.data.slice(
      0,
      -1
    );
    // const foundItem = dataWithoutLastItem.find((item) => {
    //   return item["Option Strategy"].includes(stg);
    // });
    const foundItem = dataWithoutLastItem[0];

    return foundItem.EndDate;
  };

  const ScrollToViewFirstError = (newErrors) => {
    if (Object.keys(newErrors).length !== 0) {
      const errorField = Object.keys(newErrors)[0];

      const errorElement = document.getElementById(errorField);
      if (errorElement) {
        const elementPosition =
          errorElement.getBoundingClientRect().top + window.pageYOffset;

        const offset = 100;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }
    }
  };

  const OptionType_options = [
    { label: "Bearish 📉", value: "Bearish" },
    { label: "Bullish 📈", value: "Bullish" },
    { label: "Neutral ➖", value: "Neutral" },
    { label: "Volatile⚠️", value: "Volatile" },
  ];

  const formik = useFormik({
    initialValues: {
      MainStrategy: location.state.data.selectStrategyType,
      Username: "",
      Strategy: "",
      ETPattern: "",
      Timeframe: "",
      Exchange: "",
      Symbol: "",
      Instrument: "FUTIDX",
      Strike: "",
      Optiontype: "",
      Targetvalue: 1.0,
      Slvalue: 1.0,
      TStype: "",
      Quantity: 0,
      Higher_Range: 0.0,
      Lower_Range: 0.0,
      HoldExit: "",
      EntryPrice: 0.0,
      EntryRange: 0.0,
      EntryTime: "09:15:00",
      ExitTime: "15:14:00",
      ExitDay: "",
      Trade_Execution: "Paper Trade",
      FixedSM: "",
      TType: "",
      serendate: "",
      expirydata1: "",
      Expirytype: "",
      Striketype: "",
      DepthofStrike: 0,
      DeepStrike: "",
      Group: "",
      CEDepthLower: 0.0,
      CEDepthHigher: 0.0,
      PEDepthLower: 0.0,
      PEDepthHigher: 0.0,
      CEDeepLower: 0.0,
      CEDeepHigher: 0.0,
      PEDeepLower: 0.0,
      PEDeepHigher: 0.0,
      Trade_Count: 1,
      Unique_ID: "",
      Shifting_Point: 1,
      Shifting_Value: 1,
      quantity2: 0.0,
      quantity3: 0.0,
      tgp2: 0.0,
      tgp3: 0.0,
      stepup: 0.0,
      quantityselection: "",
      quantityvalue: 0.0,
      targetselection: "",
      Profit: "0",
      Loss: "0",
      ExitType: "",
      WorkingDay: [],
      Planname: "",
      Measurment_Type: OptionType_options[0].value, // Set the first option's value as default
    },
    validate: (values) => {
      let errors = {};
      const maxTime = "15:29:59";
      const minTime = "09:15:00";
      if (!values.Strategy) {
        errors.Strategy = "Please select a strategy type.";
      }
      if (!values.ETPattern) {
        errors.ETPattern = "Please select an ETPattern type.";
      }
      if (!values.Symbol) {
        errors.Symbol = "Please select a symbol type.";
      }

      if (
        (!values.Targetvalue || values.Targetvalue == 0) &&
        formik.values.Measurment_Type != "Shifting_FourLeg"
      ) {
        errors.Targetvalue =
          values.Targetvalue == 0
            ? "Target Can Not be Zero"
            : "Please Enter a Target Value.";
      }
      if (
        (!values.Slvalue || values.Slvalue == 0) &&
        formik.values.Measurment_Type != "Shifting_FourLeg"
      ) {
        errors.Slvalue =
          values.Slvalue == 0
            ? "Stoploss Can Not be Zero"
            : "Please Enter a Stop Loss Value.";
      }

      if (!values.TStype) {
        errors.TStype = "Please select a TStype.";
      }
      if (
        values.Quantity == 0 ||
        values.Quantity === undefined ||
        values.Quantity == ""
      ) {
        errors.Quantity = "Please enter the Lot.";
      }
      if (!values.Trade_Execution || values.Trade_Execution == 0) {
        errors.Trade_Execution = "Please Select Trade Execution.";
      }
      if (!values.Trade_Count || values.Trade_Count == 0) {
        errors.Trade_Count = "Please Enter Trade Count.";
      }
      if (!values.ExitTime) {
        errors.ExitTime = "Please Select Exit Time.";
      } else if (values.ExitTime > maxTime) {
        errors.ExitTime = "Exit Time Must be Before 15:29:59.";
      } else if (values.ExitTime < minTime) {
        errors.ExitTime = "Exit Time Must be After 09:15:00.";
      }
      if (!values.EntryTime) {
        errors.EntryTime = "Please Select Entry Time.";
      } else if (values.EntryTime < minTime) {
        errors.EntryTime = "Entry Time Must be After 09:15:00.";
      } else if (values.EntryTime > maxTime) {
        errors.EntryTime = "Entry Time Must be Before 15:29:59.";
      }
      if (!values.ExitDay) {
        errors.ExitDay = "Please select an exit day.";
      }
      if (!values.Expirytype) {
        errors.Expirytype = "Please select an expiry type.";
      }

      if (!values.Lower_Range && values.Striketype === "Premium_Range") {
        errors.Lower_Range = "Please enter the lower range.";
      }
      if (!values.Higher_Range && values.Striketype === "Premium_Range") {
        errors.Higher_Range = "Please enter the higher range.";
      }
      if (!values.Striketype) {
        errors.Striketype = "Please select a strike type.";
      }
      if (
        !values.Unique_ID &&
        (values.Strategy == "LongFourLegStretegy" ||
          values.Strategy == "ShortFourLegStretegy")
      ) {
        errors.Unique_ID = "Please select Unique Name.";
      }
      if (
        !values.PEDeepLower &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy") &&
        values.PEDeepLower == 0
      ) {
        errors.PEDeepLower =
          values.PEDeepLower == 0
            ? "PE Hedge Lower can not be Zero"
            : "Please Enter PE Hedge Lower.";
      }

      if (
        !values.PEDepthHigher &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy") &&
        values.PEDepthHigher == 0
      ) {
        errors.PEDepthHigher =
          values.PEDepthHigher == 0
            ? "PE Main Higher can not be Zero"
            : "Please Enter PE Main Higher.";
      }

      if (
        !values.PEDeepHigher &&
        values.PEDeepHigher == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.PEDeepHigher =
          values.PEDeepHigher == 0
            ? "PE Hedge Higher can not be Zero"
            : "Please Enter PE Hedge Higher.";
      }
      if (
        !values.CEDepthLower &&
        values.CEDepthLower == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.CEDepthLower =
          values.CEDepthLower == 0
            ? "CE Main Lower can not be Zero"
            : "Please Enter CE Main Lower";
      }
      if (
        !values.CEDepthHigher &&
        values.CEDepthHigher == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.CEDepthHigher =
          values.CEDepthHigher == 0
            ? "CE Main Higher can not be Zero"
            : "Please Enter CE Main Higher";
      }
      if (
        !values.PEDepthLower &&
        values.PEDepthLower == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.PEDepthLower =
          values.PEDepthLower == 0
            ? "PE Main Lower can not be Zero"
            : "Please Enter PE Main Lower";
      }
      if (
        !values.CEDeepLower &&
        values.CEDeepLower == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.CEDeepLower =
          values.CEDeepLower == 0
            ? "CE Hedge Lower can not be Zero"
            : "Please Enter CE Hedge Lower";
      }
      if (
        !values.CEDeepHigher &&
        values.CEDeepHigher == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.CEDeepHigher =
          values.CEDeepHigher == 0
            ? "CE Hedge Higher can not be Zero"
            : "Please Enter CE Hedge Higher";
      }
      if (
        !values.PEDeepHigher &&
        values.PEDeepHigher == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.PEDeepHigher =
          values.PEDeepHigher == 0
            ? "PE Hedge Higher can not be Zero"
            : "Please Enter PE Hedge Higher";
      }

      if (
        values.Striketype == "Depth_of_Strike" &&
        values.Strategy != "LongStraddle" &&
        values.Strategy != "ShortStraddle"
      ) {
        if (values.DepthofStrike > 10 || values.DepthofStrike < -10)
          errors.DepthofStrike =
            "Enter Depth of Strike value between -10 to 10";
      }
      if (
        values.Striketype == "Straddle_Width" &&
        values.Strategy != "LongStraddle" &&
        values.Strategy != "ShortStraddle"
      ) {
        if (
          values.DepthofStrike > 250 ||
          values.DepthofStrike < -250 ||
          values.DepthofStrike == 0
        )
          errors.DepthofStrike =
            values.DepthofStrike == 0
              ? "Straddle Width cannot be Zero"
              : "Enter Straddle Width between -250 to 250";
      }
      if (
        values.Striketype == "Per_ATM" &&
        values.Strategy != "LongStraddle" &&
        values.Strategy != "ShortStraddle"
      ) {
        if (
          values.DepthofStrike > 2.5 ||
          values.DepthofStrike < -2.5 ||
          values.DepthofStrike == 0
        )
          errors.DepthofStrike =
            values.DepthofStrike == 0
              ? "% of ATM cannot be Zero"
              : "Please Enter % of ATM value between -2.5 to 2.5";
      }
      if (
        values.Strategy == "BullCallLadder" ||
        values.Strategy == "BullPutLadder" ||
        values.Strategy == "LongIronCondor" ||
        values.Strategy == "ShortIronCondor"
      ) {
        if (
          values.DeepStrike > 10 ||
          values.DeepStrike < -10 ||
          values.DeepStrike == 0 ||
          values.DeepStrike == 1 ||
          values.DeepStrike == -1
        ) {
          errors.DeepStrike =
            values.DeepStrike == 0
              ? "Deep Strike cannot be Zero"
              : values.DeepStrike == 1
              ? "Deep Strike cannot be 1"
              : values.DeepStrike == -1
              ? "Deep Strike cannot be -1"
              : "Enter Deep Strike Between -10 to 10";
        }
      }
      if (
        values.Striketype == "Depth_of_Strike" &&
        (values.Strategy == "ShortShifting" ||
          values.Strategy == "LongShifting")
      ) {
        if (values.Shifting_Value > 5 || values.Shifting_Value < 1) {
          errors.Shifting_Value = "Please Enter Number of Shifts Between 1-5";
        }
      }
      if (
        values.Loss == undefined ||
        values.Loss == "" ||
        values.Loss == null
      ) {
        errors.Loss = "Please Enter Maximum Loss";
      }

      if (
        values.Profit == undefined ||
        values.Profit == "" ||
        values.Profit == null
      ) {
        errors.Profit = "Please Enter Maximum Profit";
      }

      if (!values.ExitType && values.ETPattern == "Leg vice") {
        errors.ExitType = "Please Select Exit Type";
      }

      if (!values.WorkingDay?.length > 0) {
        errors.WorkingDay = "Please select Working day";
      }

      return errors;
    },

    onSubmit: async (values) => {
      const req = {
        MainStrategy: location.state.data.selectStrategyType,
        Username: userName,
        Strategy: values.Strategy,
        ETPattern:
          values.Strategy === "ShortShifting" ||
          values.Strategy === "LongShifting"
            ? "Leg vice"
            : values.Strategy === "LongFourLegStrategy" ||
              values.Strategy === "ShortFourLegStrategy"
            ? "Premium Addition"
            : values.ETPattern,

        Timeframe: "",
        Exchange: "NFO",
        Symbol: values.Symbol,
        Instrument: "FUTIDX",
        Strike: "",
        Optiontype: "",
        Targetvalue:
          values.Strategy == "ShortShifting" ||
          values.Strategy == "LongShifting"
            ? Number(values.Shifting_Point)
            : Number(values.Targetvalue),
        Slvalue: parseFloat(values.Slvalue),
        TStype: values.TStype,
        Quantity: Number(values.Quantity),
        LowerRange:
          values.Striketype == "Premium_Range" ? values.Lower_Range : 0,
        HigherRange:
          values.Striketype == "Premium_Range" ? values.Higher_Range : 0,
        HoldExit: "",
        EntryPrice: 0.0,
        EntryRange: 0.0,
        EntryTime: values.EntryTime,
        ExitTime: values.ExitTime,
        ExitDay: values.ExitDay,
        FixedSM: "",
        TType: "",
        serendate: getEndData(formik.values.Strategy),
        expirydata1: getExpiry && getExpiry.data[0],
        Expirytype: values.Expirytype,
        Striketype:
          formik.values.Strategy !== "ShortStraddle" &&
          formik.values.Strategy !== "LongStraddle"
            ? values.Striketype
            : formik.values.Strategy === "LongFourLegStretegy" ||
              formik.values.Strategy === "ShortFourLegStretegy"
            ? "Premium_Range"
            : "",

        DepthofStrike:
          formik.values.Striketype != "Premium_Range" &&
          formik.values.Strategy != "LongStraddle" &&
          formik.values.Strategy != "ShortStraddle"
            ? Number(values.DepthofStrike)
            : formik.values.Strategy != "ShortFourLegStretegy" &&
              formik.values.Strategy != "LongFourLegStretegy"
            ? values.Shifting_Value
            : 0,
        DeepStrike:
          formik.values.Strategy == "BullCallLadder" ||
          formik.values.Strategy == "BullPutLadder" ||
          formik.values.Strategy == "LongIronCondor" ||
          formik.values.Strategy == "ShortIronCondor"
            ? Number(values.DeepStrike)
            : 0,
        Group: values.Unique_ID,
        CEDepthLower: Number(values.CEDepthLower),
        CEDepthHigher: Number(values.CEDepthHigher),
        PEDepthLower: Number(values.PEDepthLower),
        PEDepthHigher: Number(values.PEDepthHigher),
        CEDeepLower: Number(values.CEDeepLower),
        CEDeepHigher: Number(values.CEDeepHigher),
        PEDeepLower: Number(values.PEDeepLower),
        PEDeepHigher: Number(values.PEDeepHigher),
        TradeCount: values.Trade_Count,
        TradeExecution: values.Trade_Execution,
        stretegytag: values.Measurment_Type,
        quantity2: 0.0,
        quantity3: 0.0,
        tgp2: 0.0,
        tgp3: 0.0,
        stepup: 0.0,
        quantityselection: "",
        quantityvalue: 0.0,
        targetselection: "",
        Loss: Number(values.Loss),
        Profit: Number(values.Profit),
        ExitRuleO: values.ETPattern == "Leg vice" ? values.ExitType : "",
        WorkingDay: values?.WorkingDay
          ? values?.WorkingDay?.map((item) => item?.value || item)
          : [],
        Planname: getPlanname,
      };

      if (
        values.Striketype == "Depth_of_Strike" &&
        (Number(values.DepthofStrike) < 0 || Number(values.DepthofStrike) > 10)
      ) {
        return SweentAlertFun("Enter Depth of Strike value between -10 to 10");
      }
      if (values.EntryTime >= values.ExitTime) {
        return SweentAlertFun("Exit Time should be greater than Entry Time");
      }

      if (
        values.Striketype === "Premium_Range" &&
        formik.values.Strategy !== "LongFourLegStretegy" &&
        formik.values.Strategy !== "ShortFourLegStretegy" &&
        Number(values.Lower_Range) >= Number(values.Higher_Range)
      ) {
        return SweentAlertFun(
          "Higher Range should be Greater than Lower Range"
        );
      } else if (
        values.Strategy == "ShortFourLegStretegy" ||
        values.Strategy == "LongFourLegStretegy"
      ) {
        if (req.CEDepthHigher <= req.CEDepthLower) {
          return SweentAlertFun(
            "Enter CE Main Higher Greater Than CE Main Lower"
          );
        } else if (req.PEDepthLower >= req.PEDepthHigher) {
          return SweentAlertFun(
            "Enter PE Main Higher Greater Than PE Main Lower"
          );
        } else if (req.CEDeepLower >= req.CEDeepHigher) {
          return SweentAlertFun(
            "Enter CE Hedge Higher Greater Than CE Hedge Lower"
          );
        } else if (req.PEDeepLower >= req.PEDeepHigher) {
          return SweentAlertFun(
            "Enter PE Hedge Higher Greater Than PE Hedge Lower"
          );
        } else if (
          req.CEDepthLower <= req.CEDeepLower ||
          req.CEDepthLower <= req.CEDeepHigher
        ) {
          return SweentAlertFun(
            "Enter CE Hedge Lower & CE Hedge Higher Smaller than CE Main Lower"
          );
        } else if (
          req.PEDepthLower <= req.PEDeepLower ||
          req.PEDepthLower <= req.PEDeepHigher
        ) {
          return SweentAlertFun(
            "Enter PE Hedge Lower & PE Hedge Higher Smaller than PE Main Lower"
          );
        }
      }
      await AddScript(req)
        .then((response) => {
          if (response.Status) {
            Swal.fire({
              // background: "#1a1e23 ",
              backdrop: "#121010ba",
              confirmButtonColor: "#1ccc8a",
              title: "Script Added !",
              text: response.message,
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
            });
            sessionStorage.setItem("redirectStrategyType", "Option Strategy");

            setTimeout(() => {
              navigate("/user/dashboard", {
                state: { prevSelectedTab: "Option Strategy" },
              });
            }, 1500);
          } else {
            Swal.fire({
              // background: "#1a1e23 ",
              backdrop: "#121010ba",
              confirmButtonColor: "#1ccc8a",
              title: "Error !",
              text: response.message,
              icon: "error",
              timer: 1500,
              timerProgressBar: true,
            });
          }
        })
        .catch((err) => {
          console.log("Error in added new Script", err);
        });
    },
  });

  useEffect(() => {
    axios
      .get(`${Config.base_url}OptionExchange`)
      .then((response) => {
        if (response.data && response.data.Exchange) {
          const formattedExchangeOptions = response.data.Exchange.map(
            (exchange) => ({
              label: exchange,
              value: exchange,
            })
          );
          setExchangeOptions(formattedExchangeOptions);
          formik.setFieldValue(
            "Exchange",
            formattedExchangeOptions[0]?.value || ""
          );
        } else {
          console.error("Unexpected API response:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching symbols:", error);
      });
  }, []);

  const fetchSymbolOptions = async () => {
    try {
      if (!formik.values.Exchange) {
        return; // Exit if Exchange is not selected
      }
      const response = await getOptionSymbol(formik.values.Exchange);
      if (response && response.Symbol) {
        const formattedSymbols = response.Symbol.map((symbol) => ({
          label: symbol,
          value: symbol,
        }));
        setSymbolOptions(formattedSymbols);
        formik.setFieldValue("Symbol", formattedSymbols[0]?.value || "");
      } else {
        console.error("Unexpected API response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching symbol options:", error);
      toast.error("Failed to fetch symbol options.");
    }
  };

  useEffect(() => {
    fetchSymbolOptions();
  }, [formik.values.Exchange]);

  useEffect(() => {
    formik.setFieldValue(
      "Measurment_Type",
      location?.state?.data?.scriptType?.data?.[
        location?.state?.data?.scriptType?.len
      ]?.CombineOption?.[0]
    );

    // formik.setFieldValue('Exchange', "NSE");
    formik.setFieldValue("Symbol", symbolOptions[0]?.value || "");
    formik.setFieldValue("ETPattern", "Leg vice");
    formik.setFieldValue("TStype", "Percentage");
    formik.setFieldValue("Targetvalue", 1.0);
    formik.setFieldValue("Slvalue", 1.0);
    formik.setFieldValue("Quantity", 1);
    formik.setFieldValue("ExitDay", "Intraday");
    formik.setFieldValue("Striketype", "Depth_of_Strike");
    formik.setFieldValue("DepthofStrike", 1);
    formik.setFieldValue("DeepStrike", 2);
    formik.setFieldValue("Lower_Range", 0);
    formik.setFieldValue("Higher_Range", 0);
    formik.setFieldValue("EntryTime", "09:15:00");
    formik.setFieldValue("ExitTime", "15:14:00");
    formik.setFieldValue("TStype", "Point");
    formik.setFieldValue("Shifting_Point", 100);
    formik.setFieldValue("Shifting_Value", 1);
    formik.setFieldValue("Trade_Count", 1);
    formik.setFieldValue("ExitType", "Normal");
  }, []);

  useEffect(() => {
    if (formik.values.Symbol == "NIFTY") {
      formik.setFieldValue("Expirytype", "Weekly");
    } else {
      formik.setFieldValue("Expirytype", "Monthly");
    }
  }, [formik.values.Symbol]);

  const SymbolSelectionArr = [
    {
      name: "Exchange", // New field name for Exchange
      label: "Exchange", // Label for the new field
      type: "select",
      options: exchangeOptions?.map((symbol) => ({
        label: symbol.label,
        value: symbol.value,
      })),
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
      options: symbolOptions.map((symbol) => ({
        label: symbol.label,
        value: symbol.value,
      })),
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
        formik.values.Symbol == "NIFTY"
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
        { label: "Straddle Width", value: "Straddle_Width" },
        { label: "Premium Range", value: "Premium_Range" },
        { label: "% of ATM", value: "Per_ATM" },
      ],

      showWhen: (value) =>
        value.Strategy != "LongFourLegStrategy" &&
        value.Strategy != "ShortFourLegStrategy" &&
        value.Strategy != "LongShifting" &&
        value.Strategy != "ShortShifting" &&
        value.Strategy != "ShortStraddle" &&
        value.Strategy != "LongStraddle",
      headingtype: 1,
      hiding: false,
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
      iconText: text.strikeType,
    },
    {
      name: "DepthofStrike",
      label:
        formik.values.Striketype == "Depth_of_Strike"
          ? "Depth of Strike"
          : formik.values.Striketype == "Straddle_Width"
          ? "Percentage"
          : formik.values.Striketype == "Premium_Range"
          ? "Premium Range"
          : formik.values.Striketype == "Per_ATM"
          ? "% of ATM"
          : "Depth of Strike",
      type:
        formik.values.Striketype == "Per_ATM" ||
        formik.values.Striketype == "Straddle_Width" ||
        formik.values.Striketype == "Depth_of_Strike"
          ? "number"
          : "text4",
      hiding: false,
      showWhen: (value) =>
        value.Strategy != "LongFourLegStrategy" &&
        value.Strategy != "ShortFourLegStrategy" &&
        value.Strategy != "LongShifting" &&
        value.Strategy != "ShortShifting" &&
        formik.values.Striketype != "Premium_Range" &&
        value.Strategy != "LongStraddle" &&
        value.Strategy != "ShortStraddle",
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
      iconText: text.depthOfStrike,
    },
    {
      name: "DeepStrike",
      label: "Deep Strike",
      type: "number",
      showWhen: (value) =>
        value.Strategy == "BullCallLadder" ||
        value.Strategy == "BullPutLadder" ||
        value.Strategy == "LongIronCondor" ||
        value.Strategy == "ShortIronCondor",
      hiding: false,
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
    },
    {
      name: "Lower_Range",
      label: "Lower Range",
      type: "text3",
      hiding: false,
      showWhen: (value) => value.Striketype == "Premium_Range",
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
      iconText: text.lowerRange,
    },
    {
      name: "Higher_Range",
      label: "Higher Range",
      type: "text3",
      hiding: false,
      showWhen: (value) => value.Striketype == "Premium_Range",
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
      iconText: text.higherRange,
    },

    {
      name: "Shifting_Point",
      label: "Shifting Point",
      type: "text3",
      hiding: false,
      label_size: 12,
      showWhen: (value) =>
        value.Strategy == "ShortShifting" || value.Strategy == "LongShifting",
      col_size: 3,
      headingtype: 2,
      disable: false,
    },

    {
      name: "CEDepthLower",
      label: "CE Main Lower",
      type: "text3",
      hiding: false,
      showWhen: (value) =>
        ["ShortFourLegStrategy", "LongFourLegStrategy"].includes(
          value.Strategy
        ),

      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
    },
    {
      name: "CEDepthHigher",
      label: "CE Main Higher",
      type: "text3",
      showWhen: (value) =>
        ["ShortFourLegStrategy", "LongFourLegStrategy"].includes(
          value.Strategy
        ),

      hiding: false,
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
    },

    {
      name: "CEDeepLower",
      label: "CE Hedge Lower",
      type: "text3",
      showWhen: (value) =>
        ["ShortFourLegStrategy", "LongFourLegStrategy"].includes(
          value.Strategy
        ),
      hiding: false,
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
    },
    {
      name: "CEDeepHigher",
      label: "CE Hedge Higher",
      type: "text3",
      hiding: false,
      showWhen: (value) =>
        ["ShortFourLegStrategy", "LongFourLegStrategy"].includes(
          value.Strategy
        ),
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
    },
    {
      name: "PEDepthLower",
      label: "PE Main Lower",
      type: "text3",
      showWhen: (value) =>
        ["ShortFourLegStrategy", "LongFourLegStrategy"].includes(
          value.Strategy
        ),
      hiding: false,
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
    },
    {
      name: "PEDepthHigher",
      label: "PE Main Higher",
      type: "text3",
      showWhen: (value) =>
        ["ShortFourLegStrategy", "LongFourLegStrategy"].includes(
          value.Strategy
        ),
      hiding: false,
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
    },
    {
      name: "PEDeepLower",
      label: "PE Hedge Lower",
      type: "text3",
      hiding: false,
      showWhen: (value) =>
        ["ShortFourLegStrategy", "LongFourLegStrategy"].includes(
          value.Strategy
        ),
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
    },
    {
      name: "PEDeepHigher",
      label: "PE Hedge Higher",
      type: "number",
      hiding: false,
      showWhen: (value) =>
        ["ShortFourLegStrategy", "LongFourLegStrategy"].includes(
          value.Strategy
        ),
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
    },

    {
      name: "Unique_ID",
      label: "Unique Name",
      type: "select1",
      options: [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "C", value: "C" },
        { label: "D", value: "D" },
        { label: "E", value: "E" },
        { label: "F", value: "F" },
        { label: "G", value: "G" },
        { label: "H", value: "H" },
        { label: "I", value: "I" },
        { label: "J", value: "J" },
      ],
      showWhen: (value) =>
        ["ShortFourLegStrategy", "LongFourLegStrategy"].includes(
          value.Strategy
        ),
      hiding: false,
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
      iconText: text.uniqueId,
    },
  ];

  const ExitRuleArr = [
    {
      name: "ETPattern",
      label: "Risk Handle",
      type: "select1",
      options:
        formik.values.Strategy == "CoveredPut" ||
        formik.values.Strategy == "CoveredCall" ||
        formik.values.Strategy == "ShortCollar" ||
        formik.values.Strategy == "LongCollar"
          ? [
              { label: "Future", value: "Future" },
              { label: "Leg vice", value: "Leg vice" },
            ]
          : [
              { label: "Leg vice", value: "Leg vice" },
              { label: "Future", value: "Future" },
              { label: "Premium Addition", value: "Premium Addition" },
            ],
      showWhen: (value) =>
        ![
          "ShortShifting",
          "LongShifting",
          "ShortFourLegStrategy",
          "LongFourLegStrategy",
        ].includes(value.Strategy) &&
        value.Measurment_Type != "Shifting_FourLeg",
      hiding: false,
      label_size: 12,
      col_size: formik.values.Measurment_Type != "Shifting_FourLeg" ? 3 : 4,
      headingtype: 3,
      disable: false,
      iconText: text.riskHandle,
    },
    {
      name: "TStype",
      label: "Measurement Type",
      type: "select",
      options:
        formik.values.ETPattern == "Premium Addition"
          ? [{ label: "Point", value: "Point" }]
          : [
              { label: "Point", value: "Point" },
              { label: "Percentage", value: "Percentage" },
            ],
      hiding: false,
      label_size: 12,
      showWhen: (value) =>
        (!["ShortShifting", "LongShifting"].includes(value.Strategy) &&
          value.Measurment_Type != "Shifting_FourLeg") ||
        (value.Measurment_Type == "Shifting_FourLeg" &&
          (value.Strategy == "ShortFourLegStretegy" ||
            value.Strategy == "LongFourLegStretegy")),
      col_size: 3,
      headingtype: 3,
      disable: false,
      iconText: text.measurementType,
    },

    {
      name: "ExitType",
      label: "Exit Type",
      type: "select1",
      options: [
        { label: "Normal", value: "Normal" },
        { label: "Cost to Cost", value: "Cost to Cost" },
      ],
      showWhen: (value) =>
        !["ShortShifting", "LongShifting"].includes(value.Strategy) &&
        value.Measurment_Type != "Shifting_FourLeg" &&
        value.ETPattern == "Leg vice",
      hiding: false,
      label_size: 12,
      col_size: formik.values.Measurment_Type != "Shifting_FourLeg" ? 3 : 4,
      headingtype: 3,
      disable: false,
    },

    {
      name: "Targetvalue",
      label: "Target Value",
      type: "text3",
      hiding: false,
      label_size: 12,
      showWhen: (value) =>
        (!["ShortShifting", "LongShifting"].includes(value.Strategy) &&
          value.Measurment_Type != "Shifting_FourLeg") ||
        (value.Measurment_Type == "Shifting_FourLeg" &&
          (value.Strategy == "ShortFourLegStretegy" ||
            value.Strategy == "LongFourLegStretegy")),
      headingtype: 3,
      col_size: formik.values.Measurment_Type != "Shifting_FourLeg" ? 3 : 4,
      disable: false,
    },
    {
      name: "Slvalue",
      label: "StopLoss Value",
      type: "text3",
      hiding: false,
      label_size: 12,
      showWhen: (value) =>
        (!["ShortShifting", "LongShifting"].includes(value.Strategy) &&
          value.Measurment_Type != "Shifting_FourLeg") ||
        (value.Measurment_Type == "Shifting_FourLeg" &&
          (value.Strategy == "ShortFourLegStretegy" ||
            value.Strategy == "LongFourLegStretegy")),
      col_size: formik.values.Measurment_Type != "Shifting_FourLeg" ? 3 : 4,
      headingtype: 3,
      disable: false,
    },
    {
      name: "Shifting_Value",
      label: "Number of Shifts",
      type: "text3",
      showWhen: (value) =>
        ["ShortShifting", "LongShifting"].includes(value.Strategy),

      hiding: false,
      label_size: 12,
      col_size: formik.values.Measurment_Type != "Shifting_FourLeg" ? 3 : 4,
      headingtype: 3,
      disable: false,
    },
  ];

  const RiskManagementArr = [
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
      // iconText: text.Increment_Type,
      hiding: false,
    },

    {
      name: "Profit",
      label: " Max Profit",
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

  const fetchRadioOptions = async () => {
    try {
      const res = await getOptionType(formik.values.Measurment_Type);
      if (res) {
        const options = res[formik.values.Measurment_Type];
        setOptionRadioType(options);
        if (options?.length > 0) {
          formik.setFieldValue("Strategy", options[0]); // Auto-select the first option
        }
      } else {
        console.error("Unexpected API response:", res);
      }
    } catch (error) {
      console.error("Error fetching radio options:", error);
    }
  };

  useEffect(() => {
    fetchRadioOptions();
  }, [formik.values.Measurment_Type]);

  useEffect(() => {
    // Set the initial value for Measurment_Type and trigger the API call
    formik.setFieldValue("Measurment_Type", OptionType_options[0].value);
    fetchRadioOptions();
  }, []);

  const fields = [
    {
      name: "Measurment_Type",
      label: "Option Type",
      type: "select",
      options: OptionType_options.map((item) => {
        return { label: item.label, value: item.value };
      }),
      hiding: false,
      label_size: 12,
      col_size: 4,
      disable: false,
    },
    {
      name: "Strategy",
      label: "Strategy",
      type: "radio2",
      title: optionRadioType?.map((item) => {
        return { title: item, value: item, iconText: optionStrategyText[item] };
      }),
      label_size: 12,
      col_size: 8,
      disable: false,
      iconText: text.strikeType,
      hiding: false,
    },
    {
      name: "Heading",
      label: "Symbol_Selection",
      type: "heading",
      hiding: false,
      label_size: 12,
      headingtype: 1,
      data: SymbolSelectionArr.filter(
        (item) => !item.showWhen || item.showWhen(formik.values)
      ),
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
      headingtype: 2,
      data: EntryRuleArr.filter(
        (item) => !item.showWhen || item.showWhen(formik.values)
      ),
      showWhen: () =>
        formik.values.Strategy != "ShortStraddle" &&
        formik.values.Strategy != "LongStraddle",
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
      data: TimeDurationArr.filter(
        (item) => !item.showWhen || item.showWhen(formik.values)
      ),
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
      data: OtherParameterArr.filter(
        (item) => !item.showWhen || item.showWhen(formik.values)
      ),
      disable: false,
    },
  ];

  const getExpriyData = async () => {
    const data = {
      Exchange: "NFO",
      Instrument: "FUTIDX",
      Symbol: formik.values.Symbol,
      Strike: "",
    };
    await GET_EXPIRY_DATE(data)
      .then((response) => {
        if (response.Status) {
          setExpiry({
            loading: false,
            data: response["Expiry Date"],
          });
        } else {
          setExpiry({
            loading: false,
            data: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the Expriy Data", err);
      });
  };

  useEffect(() => {
    getExpriyData();
  }, [formik.values.Symbol]);

  const GetExpriyEndDate = async () => {
    const data = { Username: userName };
    await ExpriyEndDate(data)
      .then((response) => {
        if (response.Status) {
          setServiceEndDate(response.Data[0].ExpiryDate);
        } else {
          setServiceEndDate("");
        }
      })
      .catch((err) => {
        console.log("Error in finding the Service end date", err);
      });
  };

  useEffect(() => {
    GetExpriyEndDate();
  }, []);

  useEffect(() => {
    if (formik.values.Striketype == "Depth_of_Strike") {
      formik.setFieldValue("DepthofStrike", 0);
    }
  }, []);

  useEffect(() => {
    if (
      formik.values.Strategy == "LongFourLegStretegy" ||
      formik.values.Strategy == "ShortFourLegStretegy"
    ) {
      formik.setFieldValue("Striketype", "Premium_Range");
      formik.setFieldValue("ETPattern", "Premium Addition");
    }
    if (formik.values.Striketype != "Premium_Range") {
      formik.setFieldValue("Higher_Range", 1);
      formik.setFieldValue("Lower_Range", 1);
    }
    // Set DepthofStrike to 0 if Striketype is Depth_of_Strike
    if (formik.values.Striketype === "Depth_of_Strike") {
      formik.setFieldValue("DepthofStrike", 1);
    }
    if (
      formik.values.Strategy == "BullCallLadder" ||
      formik.values.Strategy == "BullPutLadder" ||
      formik.values.Strategy == "LongIronCondor" ||
      formik.values.Strategy == "ShortIronCondor"
    ) {
      formik.setFieldValue("DeepStrike", 2);
    }

    if (
      formik.values.Strategy == "ShortShifting" ||
      formik.values.Strategy == "LongShifting"
    ) {
      formik.setFieldValue("Shifting_Value", 1);
    }
    // Always set TStype, Targetvalue, and Slvalue to 1
    formik.setFieldValue("TStype", "Point");
    formik.setFieldValue("Targetvalue", 1);
    formik.setFieldValue("Slvalue", 1);
    if (
      formik.values.Strategy != "ShortFourLegStretegy" ||
      formik.values.Strategy != "LongFourLegStretegy"
    ) {
      formik.setFieldValue("Unique_ID", "");
      formik.setFieldValue("CEDepthLower", 0);
      formik.setFieldValue("CEDepthHigher", 0);
      formik.setFieldValue("PEDepthLower", 0);
      formik.setFieldValue("PEDepthHigher", 0);
      formik.setFieldValue("CEDeepLower", 0);
      formik.setFieldValue("CEDeepHigher", 0);
      formik.setFieldValue("PEDeepLower", 0);
      formik.setFieldValue("PEDeepHigher", 0);
    }
  }, [
    formik.values.Strategy,
    formik.values.Striketype,
    formik.values.Measurment_Type,
  ]);

  const handleCheckPnl = async () => {
    const weekend = new Date().getDay();
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const totalMinutes = hours * 60 + minutes; // e.g., 14 * 60 + 30 = 870

    // Market hours: 9:15 AM to 3:30 PM => 555 to 930 in total minutes
    if (
      weekend === 6 ||
      weekend === 0 ||
      totalMinutes < 555 ||
      totalMinutes > 930
    ) {
      return SweentAlertFun("Market is off Today");
    }

    const req = {
      MainStrategy: location.state.data.selectStrategyType,
      Strategy: formik.values.Strategy,
      Username: userName,
      ETPattern: formik.values.ETPattern,
      Timeframe: "",
      Exchange: "NFO",
      Symbol: formik.values.Symbol,
      Instrument: "FUTIDX",
      Strike: "",
      Optiontype: "",
      Targetvalue: formik.values.Targetvalue || 1,
      Slvalue: parseFloat(formik.values.Slvalue),
      TStype: formik.values.TStype,
      Quantity: formik.values.Quantity,
      LowerRange:
        formik.values.Striketype == "Premium_Range"
          ? formik.values.Lower_Range
          : 0,
      HigherRange:
        formik.values.Striketype == "Premium_Range"
          ? formik.values.Higher_Range
          : 0,
      HoldExit: "",
      EntryPrice: 0.0,
      EntryRange: 0.0,
      EntryTime: formik.values.EntryTime,
      ExitTime: formik.values.ExitTime,
      ExitDay: formik.values.ExitDay,
      TradeExecution: formik.values.Trade_Execution,
      FixedSM: "",
      TType: "",
      serendate: getEndData(formik.values.Strategy),
      expirydata1: getExpiry && getExpiry.data[0],

      Expirytype: formik.values.Expirytype,
      Striketype:
        formik.values.Strategy != "ShortStraddle" &&
        formik.values.Strategy != "LongStraddle" &&
        formik.values.Strategy != "ShortStraddle" &&
        formik.values.Strategy != "LongStraddle"
          ? formik.values.Striketype
          : "",
      DepthofStrike:
        formik.values.Striketype != "Premium_Range" &&
        formik.values.Strategy != "LongStraddle" &&
        formik.values.Strategy != "ShortStraddle"
          ? Number(formik.values.DepthofStrike)
          : 0,
      DeepStrike:
        formik.values.Strategy == "BullCallLadder" ||
        formik.values.Strategy == "BullPutLadder" ||
        formik.values.Strategy == "LongIronCondor" ||
        formik.values.Strategy == "ShortIronCondor"
          ? Number(formik.values.DeepStrike)
          : 0,
      Group: formik.values.Unique_ID,
      CEDepthLower: Number(formik.values.CEDepthLower),
      CEDepthHigher: Number(formik.values.CEDepthHigher),
      PEDepthLower: Number(formik.values.PEDepthLower),
      PEDepthHigher: Number(formik.values.PEDepthHigher),
      CEDeepLower: Number(formik.values.CEDeepLower),
      CEDeepHigher: Number(formik.values.CEDeepHigher),
      PEDeepLower: Number(formik.values.PEDeepLower),
      PEDeepHigher: Number(formik.values.PEDeepHigher),
      TradeCount: Number(formik.values.Trade_Count),
      quantity2: 0.0,
      quantity3: 0.0,
      tgp2: 0.0,
      tgp3: 0.0,
      stepup: 0.0,
      quantityselection: "",
      quantityvalue: 0.0,
      targetselection: "",
    };

    await CheckPnL(req)
      .then((response) => {
        if (response.Status) {
          setShowPnl(true);
          setOpenModel(true);
          setPnlData({
            MaximumProfit: response.MaximumProfit,
            MaximumLoss: response.MaximumLoss,
            SpotPriceMaximumProfit1: response.SpotPriceMaximumProfit1,
            SpotPriceMaximumProfit2: response.SpotPriceMaximumProfit2,
            SpotPriceMaximumLoss1: response.SpotPriceMaximumLoss1,
            SpotPriceMaximumLoss2: response.SpotPriceMaximumLoss2,
            NoprofitLoss1: response.NoprofitLoss1,
            NoprofitLoss2: response.NoprofitLoss2,
          });
        } else {
          setPnlData({
            MaximumProfit: "",
            MaximumLoss: "",
            SpotPriceMaximumProfit1: "",
            SpotPriceMaximumProfit2: "",
            SpotPriceMaximumLoss1: "",
            SpotPriceMaximumLoss2: "",
            NoprofitLoss1: "",
            NoprofitLoss2: "",
          });
        }
      })
      .catch((err) => {
        console("Error in fatching the Pnl", err);
      });
  };

  useEffect(() => {
    setShowPnl(false);
  }, [formik.values]);

  return (
    <>
      {formik.values.Exchange &&
        formik.values.Instrument &&
        formik.values.Symbol &&
        formik.values.expirydata1 && (
          <div className="AddScript_LivePrice card-text-Color">
            <div className="LivePriceContainer">
              <span> Live Price: </span>{" "}
              <span className="LivePrice ms-2">{}</span>
            </div>
          </div>
        )}
      <AddForm
        fields={fields.filter(
          (field) => !field.showWhen || field.showWhen(formik.values)
        )}
        btn_name="Add"
        btn_name1="Cancel"
        formik={formik}
        btn_name1_route={"/user/dashboard"}
        additional_field={
          <div>
            {formik.values.Strategy == "CoveredCall" ||
            formik.values.Strategy == "CoveredPut" ||
            formik.values.Strategy == "LongCollar" ||
            formik.values.Strategy == "ShortCollar" ||
            formik.values.Strategy == "LongFourLegStretegy" ||
            formik.values.Strategy == "ShortFourLegStretegy" ? (
              ""
            ) : (
              <button
                className="addbtn"
                type="button"
                onClick={() => handleCheckPnl()}
              >
                Check PnL
              </button>
            )}
          </div>
        }
      />
      <Modal
        show={openModel}
        onHide={() => setOpenModel(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter ">
            PnL Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {PnlData ? (
            <div className="container">
              <div className="row">
                {[
                  { label: "Maximum Profit", value: PnlData.MaximumProfit },
                  { label: "Maximum Loss", value: PnlData.MaximumLoss },
                  {
                    label: "Spot Price Maximum Profit 1",
                    value: PnlData.SpotPriceMaximumProfit1,
                  },
                  {
                    label: "Spot Price Maximum Profit 2",
                    value: PnlData.SpotPriceMaximumProfit2,
                  },
                  {
                    label: "Spot Price Maximum Loss 1",
                    value: PnlData.SpotPriceMaximumLoss1,
                  },
                  {
                    label: "Spot Price Maximum Loss 2",
                    value: PnlData.SpotPriceMaximumLoss2,
                  },
                  { label: "NoprofitLoss 1", value: PnlData.NoprofitLoss1 },
                  { label: "NoprofitLoss 2", value: PnlData.NoprofitLoss2 },
                ].map(({ label, value }, index) => (
                  <div
                    key={index}
                    className="col-md-6 d-flex align-items-center py-2"
                  >
                    <label
                      className="fw-bold mb-0 me-2 card-text-Color"
                      style={{ fontSize: "18px", minWidth: "150px" }}
                    >
                      {label}:
                    </label>
                    <span
                      className="mb-0"
                      style={{ fontSize: "18px", fontWeight: "500" }}
                    >
                      {value !== null && !isNaN(value)
                        ? parseFloat(value).toFixed(4)
                        : "N/A"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-danger text-center">❌ No data available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpenModel(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddClient;
