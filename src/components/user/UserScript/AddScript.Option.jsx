import { useLocation, useNavigate } from "react-router-dom";
import AddForm from "../../../ExtraComponent/FormData2";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { GET_EXPIRY_DATE, ExpriyEndDate,OptionSST_API } from "../../CommonAPI/Admin";
import { AddScript, CheckPnL } from "../../CommonAPI/User";
import Content from "../../../ExtraComponent/Content";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { getOptionSymbol } from "../../CommonAPI/Common";
import { toast } from "react-toastify";
import { optionStrategyText, text } from "../../../ExtraComponent/IconTexts";

const AddClient = () => {
  const location = useLocation();

  const userName = localStorage.getItem("name");
  const getPlanname = localStorage.getItem("Planname");
  const navigate = useNavigate();
  const [getExpiry, setExpiry] = useState({ loading: true, data: [] });
  const [openModel, setOpenModel] = useState(false);
  const [symbolOptions, setSymbolOptions] = useState([]);
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
  const [optionSSTData, setOptionSSTData] = useState();


 const formik = useFormik({
    initialValues: {
      MainStrategy: location.state?.data?.selectStrategyType,
      Username: "",
      Strategy: location.state.data.STG,
      ETPattern: "",
      Timeframe: "",
      Exchange: location.state.data.Exchange,
      Symbol: location.state.data.MainSymbol,
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
      EntryTime: "",
      ExitTime: "",
      ExitDay: "",
      Trade_Execution: "Paper Trade",
      FixedSM: "",
      TType: "",
      serendate: "2023-10-25",
      expirydata1: "2024-06-27",
      Expirytype: location.state.data.Expirytype,
      Striketype: "",
      DepthofStrike: "",
      DeepStrike: "",
      Group: "",
      CEDepthLower: location.state.data.CEDepthLower,
      CEDepthHigher: location.state.data.CEDepthHigher,
      PEDepthLower: location.state.data.PEDepthLower,
      PEDepthHigher: location.state.data.PEDepthHigher,
      CEDeepLower: location.state.data.CEDeepLower,
      CEDeepHigher: location.state.data.CEDeepHigher,
      PEDeepLower: location.state.data.PEDeepLower,
      PEDeepHigher: location.state.data.PEDeepHigher,
      Trade_Count: 1,
      Unique_ID: location.state.data.GroupN,
      Measurment_Type: "",
      Shifting_Point: 1,
      Profit: "0",
      Loss: "0",
      ExitRuleO: "",
      WorkingDay: [],
    },
    validate: (values) => {
      let errors = {};

      const maxTime = "15:29:59";
      const minTime = "09:15:00";
      if (!values.Strategy) {
        errors.Strategy = "Please Select a Strategy Type.";
      }
      if (!values.Exchange) {
        errors.Exchange = "Please Select Exchange";
      }
      if (!values.Measurment_Type) {
        errors.Measurment_Type = "Please select Option type.";
      }
      if (!values.Trade_Execution || values.Trade_Execution == 0) {
        errors.Trade_Execution = "Please Select Trade Execution.";
      }
      if (!values.Trade_Count || values.Trade_Count == 0) {
        errors.Trade_Count = "Please Enter Trade Count.";
      }
      if (!values.ETPattern && values.Measurment_Type != "Shifting_FourLeg") {
        errors.ETPattern = "Please Select Risk Handle Type.";
      }
      if (!values.Symbol) {
        errors.Symbol = "Please Select a Symbol Type.";
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
        errors.TStype = "Please Select a Measurement Type.";
      }
      if (
        values.Quantity == 0 ||
        values.Quantity === undefined ||
        values.Quantity == ""
      ) {
        errors.Quantity = "Please enter the Lot.";
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
        errors.ExitDay = "Please Select an Exit Day.";
      }
      if (!values.Expirytype) {
        errors.Expirytype = "Please Select an Expiry Type.";
      }
      if (!values.Lower_Range && values.Striketype === "Premium_Range") {
        errors.Lower_Range = "Please Enter the Lower Range.";
      }
      if (!values.Higher_Range && values.Striketype === "Premium_Range") {
        errors.Higher_Range = "Please Enter the Higher Range.";
      }
      if (
        !values.Striketype &&
        values.Strategy != "ShortStraddle" &&
        values.Strategy != "LongStraddle" &&
        values.Measurment_Type != "Shifting_FourLeg" &&
        values.Strategy != "ShortStraddle" &&
        values.Strategy != "LongStraddle"
      ) {
        errors.Striketype = "Please Select a Strike Type.";
      }
      if (
        !values.Unique_ID &&
        (values.Strategy == "LongFourLegStretegy" ||
          values.Strategy == "ShortFourLegStretegy")
      ) {
        errors.Unique_ID = "Please Select Unique Name.";
      }
      if (
        !values.PEDeepLower &&
        values.PEDeepLower == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.PEDeepLower =
          values.PEDeepLower == 0
            ? "PE Hedge Lower Cannot Be Zero."
            : "Please Enter PE Hedge Lower.";
      }
      if (
        !values.PEDeepHigher &&
        values.PEDeepLower == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.PEDeepHigher =
          values.PEDeepHigher == 0
            ? "PE Hedge Higher Cannot Be Zero."
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
            ? "CE Main Lower Cannot Be Zero."
            : "Please Enter CE Main Lower.";
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
        !values.CEDepthHigher &&
        values.CEDepthHigher == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.CEDepthHigher =
          values.CEDepthHigher == 0
            ? "CE Main Higher Cannot Be Zero."
            : "Please Enter CE Main Higher.";
      }
      if (
        !values.PEDepthLower &&
        values.PEDepthLower == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.PEDepthLower =
          values.PEDepthLower == 0
            ? "PE Main Lower Cannot Be Zero."
            : "Please Enter PE Main Lower.";
      }
      if (
        !values.CEDeepLower &&
        values.CEDeepLower == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.CEDeepLower =
          values.CEDeepLower == 0
            ? "CE Hedge Lower Cannot Be Zero."
            : "Please Enter CE Hedge Lower.";
      }
      if (
        !values.CEDeepHigher &&
        values.CEDeepHigher == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.CEDeepHigher =
          values.CEDeepHigher == 0
            ? "CE Hedge Higher Cannot Be Zero."
            : "Please Enter CE Hedge Higher.";
      }
      if (
        !values.PEDeepHigher &&
        values.PEDeepHigher == 0 &&
        (values.Strategy == "ShortFourLegStretegy" ||
          values.Strategy == "LongFourLegStretegy")
      ) {
        errors.PEDeepHigher =
          values.PEDeepHigher == 0
            ? "PE Hedge Higher Cannot Be Zero."
            : "Please Enter PE Hedge Higher.";
      }

      if (
        values.Striketype == "Depth_of_Strike" &&
        values.Measurment_Type != "Shifting_FourLeg" &&
        values.Strategy != "LongStraddle" &&
        values.Strategy != "ShortStraddle"
      ) {
        if (
          Number(values.DepthofStrike) > 10 ||
          Number(values.DepthofStrike) < -10 || Number(values.DepthofStrike) == 0
        )
          errors.DepthofStrike = "Enter Depth of Strike value between -10 to 10 excluding 0.";
      }
      if (
        values.Striketype == "Straddle_Width" &&
        values.Measurment_Type != "Shifting_FourLeg" &&
        values.Strategy != "LongStraddle" &&
        values.Strategy != "ShortStraddle"
      ) {
        if (
          values.DepthofStrike > 250 ||
          values.DepthofStrike < -250 ||
          values.DepthofStrike == 0
        ) {
          errors.DepthofStrike =
            values.DepthofStrike == 0
              ? "Straddle Width Cannot Be Zero."
              : "Enter Straddle Width Between -250 to 250.";
        }
      }
      if (
        values.Striketype == "Per_ATM" &&
        values.Measurment_Type != "Shifting_FourLeg" &&
        values.Strategy != "LongStraddle" &&
        values.Strategy != "ShortStraddle"
      ) {
        if (
          values.DepthofStrike > 2.5 ||
          values.DepthofStrike < -2.5 ||
          values.DepthofStrike == 0
        ) {
          errors.DepthofStrike =
            values.DepthofStrike == 0
              ? "% of ATM Cannot Be Zero."
              : "Please Enter % of ATM Value Between -2.5 to 2.5.";
        }
      }
      if (
        (values.Measurment_Type == "Ladder_Coverd" &&
          values.Measurment_Type != "Shifting_FourLeg" &&
          (values.Strategy == "BullCallLadder" ||
            values.Strategy == "BullPutLadder")) ||
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
              ? "Deep Strike Cannot Be Zero."
              : values.DeepStrike == 1
                ? "Deep Strike Cannot Be 1."
                : values.DeepStrike == -1
                  ? "Deep Strike Cannot Be -1."
                  : "Enter Deep Strike Between -10 to 10.";
        }
      }
      if (
        values.Measurment_Type == "Shifting_FourLeg" &&
        (values.Strategy == "ShortShifting" ||
          values.Strategy == "LongShifting")
      ) {
        if (values.Shifting_Point > 1000 || values.Shifting_Point < 100) {
          errors.Shifting_Point = "Please Enter in Range 100-1000.";
        }
      }
      if (
        values.Measurment_Type == "Shifting_FourLeg" &&
        values.Strategy != "ShortFourLegStretegy" &&
        values.Strategy != "LongFourLegStretegy"
      ) {
        if (values.Shifting_Value > 5 || values.Shifting_Value < 1) {
          errors.Shifting_Value = "Please Enter Number of Shifts Between 1-5.";
        }
      }

      if (values.Loss === undefined || values.Loss === "" || values.Loss === null) {
        errors.Loss = "Please Enter Maximum Loss";
      }

      if (values.Profit === undefined || values.Profit === "" || values.Profit === null) {
        errors.Profit = "Please Enter Maximum Profit";
      }

      if (!values.WorkingDay?.length > 0) {
        errors.WorkingDay = "Please select Working day";
      }
      if (values.WorkingDay?.length === 0) {
        errors.WorkingDay = "Please select Working day";
      }

      if (
        !values.ExitRuleO &&
        values.Measurment_Type != "Shifting_FourLeg" &&
        values.ETPattern == "Leg vice"
      ) {
        errors.ExitRuleO = "Please Select Exit Type";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const req = {
        MainStrategy: location.state.data.selectStrategyType,
        Username: userName,
        Strategy: values.Strategy,
        ETPattern:
          values.Measurment_Type != "Shifting_FourLeg"
            ? values.ETPattern
            : values.Strategy == "ShortShifting" ||
              values.Strategy == "LongShifting"
              ? "Future"
              : "",
        Timeframe: "",
        Exchange: values.Exchange,
        Symbol: values.Symbol,
        Instrument: "FUTIDX",
        Strike: "",
        Optiontype: "",
        Targetvalue:
          values.Measurment_Type == "Shifting_FourLeg" &&
            (values.Strategy == "ShortShifting" ||
              values.Strategy == "LongShifting")
            ? Number(values.Shifting_Point)
            : Number(values.Targetvalue),
        Slvalue: values.Slvalue,
        TStype: values.TStype,
        Quantity: values.Quantity,
        LowerRange:
          values.Striketype == "Premium_Range" &&
            values.Measurment_Type != "Shifting_FourLeg"
            ? values.Lower_Range
            : 0,
        HigherRange:
          values.Striketype == "Premium_Range" &&
            values.Measurment_Type != "Shifting_FourLeg"
            ? values.Higher_Range
            : 0,
        HoldExit: "",
        quantity2: 0.0,
        quantity3: 0.0,
        quantityselection: "",
        quantityvalue: 0.0,
        stepup: 0.0,
        targetselection: "",
        tgp2: 0.0,
        tgp3: 0.0,
        EntryPrice: 0.0,
        EntryRange: 0.0,
        EntryTime: values.EntryTime,
        ExitTime: values.ExitTime,
        ExitDay: values.ExitDay,
        FixedSM: "",
        TType: "",
        serendate: getEndData(values.Measurment_Type),
        // expirydata1: values.Expirytype == "Weekly" ? getExpiry && getExpiry.data[0] : values.Expirytype == "Next Week" ? getExpiry && getExpiry.data[1] : getExpiry && getExpiry.data[2],
        expirydata1: getExpiry && getExpiry.data[0],
        ExitRuleO: formik.values.ExitRuleO,

        Expirytype: values.Expirytype,
        Striketype:
          formik.values.Strategy != "ShortStraddle" &&
            formik.values.Strategy != "LongStraddle" &&
            formik.values.Measurment_Type != "Shifting_FourLeg" &&
            formik.values.Strategy != "ShortStraddle" &&
            formik.values.Strategy != "LongStraddle"
            ? values.Striketype
            : "",
        DepthofStrike:
          formik.values.Striketype != "Premium_Range" &&
            formik.values.Measurment_Type != "Shifting_FourLeg" &&
            formik.values.Strategy != "LongStraddle" &&
            formik.values.Strategy != "ShortStraddle"
            ? Number(values.DepthofStrike)
            : formik.values.Measurment_Type == "Shifting_FourLeg" &&
              formik.values.Strategy != "ShortFourLegStretegy" &&
              formik.values.Strategy != "LongFourLegStretegy"
              ? values.Shifting_Value
              : 0,
        DeepStrike:
          (formik.values.Measurment_Type == "Ladder_Coverd" &&
            formik.values.Measurment_Type != "Shifting_FourLeg" &&
            (formik.values.Strategy == "BullCallLadder" ||
              formik.values.Strategy == "BullPutLadder")) ||
            formik.values.Strategy == "LongIronCondor" ||
            formik.values.Strategy == "ShortIronCondor"
            ? Number(values.DeepStrike)
            : 0,
        Group:
          values.Strategy == "LongFourLegStretegy" ||
            values.Strategy == "ShortFourLegStretegy"
            ? values.Unique_ID
            : "",
        CEDepthLower:
          values.Strategy == "ShortFourLegStretegy" ||
            values.Strategy == "LongFourLegStretegy"
            ? Number(values.CEDepthLower)
            : 0,
        CEDepthHigher:
          values.Strategy == "ShortFourLegStretegy" ||
            values.Strategy == "LongFourLegStretegy"
            ? Number(values.CEDepthHigher)
            : 0,
        PEDepthLower:
          values.Strategy == "ShortFourLegStretegy" ||
            values.Strategy == "LongFourLegStretegy"
            ? Number(values.PEDepthLower)
            : 0,
        PEDepthHigher:
          values.Strategy == "ShortFourLegStretegy" ||
            values.Strategy == "LongFourLegStretegy"
            ? Number(values.PEDepthHigher)
            : 0,
        CEDeepLower:
          values.Strategy == "ShortFourLegStretegy" ||
            values.Strategy == "LongFourLegStretegy"
            ? Number(values.CEDeepLower)
            : 0,
        CEDeepHigher:
          values.Strategy == "ShortFourLegStretegy" ||
            values.Strategy == "LongFourLegStretegy"
            ? Number(values.CEDeepHigher)
            : 0,
        PEDeepLower:
          values.Strategy == "ShortFourLegStretegy" ||
            values.Strategy == "LongFourLegStretegy"
            ? Number(values.PEDeepLower)
            : 0,
        PEDeepHigher:
          values.Strategy == "ShortFourLegStretegy" ||
            values.Strategy == "LongFourLegStretegy"
            ? Number(values.PEDeepHigher)
            : 0,
        TradeCount: values.Trade_Count,
        TradeExecution: values.Trade_Execution,
        stretegytag: values.Measurment_Type,
        Loss: values.Loss,
        Profit: values.Profit,

        WorkingDay: values.WorkingDay
          ? values?.WorkingDay?.map((item) => item?.value || item)
          : [],

        Planname: getPlanname || "",

      };

      if (
        values.Striketype == "Depth_of_Strike" &&
        (Number(values.DepthofStrike) < 0 || Number(values.DepthofStrike) > 10)
      ) {
        return SweentAlertFun("Enter Depth of Strike's Range between 1 - 10");
      }
      if (values.EntryTime >= values.ExitTime) {
        return SweentAlertFun("Exit Time should be greater than Entry Time");
      }

      if (
        values.Striketype == "Premium_Range" &&
        values.Measurment_Type != "Shifting_FourLeg" &&
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
              navigate("/user/dashboard");
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
    getExpriyData();
  }, [formik.values.Symbol]);

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

  const SweentAlertFun = (text) => {
    Swal.fire({
      // background: "#1a1e23 ",
      backdrop: "#121010ba",
      confirmButtonColor: "#1ccc8a",
      title: "Error",
      text: text,
      icon: "error",
      timer: 30000,
      timerProgressBar: true,
    });
  };

  const getEndData = (stg) => {
    if (!stg) {
      return
    }
    const dataWithoutLastItem = location?.state?.scriptType?.data.slice(0, -1);
    const foundItem = dataWithoutLastItem.find((item) => {
      return item["Option Strategy"]?.includes(stg);
    });
    return foundItem.EndDate;
  };



 

  useEffect(() => {
    if (formik.submitCount > 0) { // Submit ke baad hi chalega
      if (!formik.values.WorkingDay || formik.values.WorkingDay.length === 0) {
        formik.setFieldError('WorkingDay', 'Please select at least one Working Day');
        formik.setFieldTouched('WorkingDay', true, false);
      }
    }
  }, [formik.submitCount]);


  const value = location?.state?.data

  const handleCheckPnl = async () => {
    // const weekend = new Date().getDay();
    // const currentDate = new Date();
    // const currentTime =
    //   currentDate.getHours() +
    //   ":" +
    //   currentDate.getMinutes() +
    //   ":" +
    //   currentDate.getSeconds();

    // if (
    //   weekend == 6 ||
    //   weekend == 0 ||
    //   currentTime >= "15:30:00" ||
    //   currentTime <= "09:15:00"
    // ) {
    //   return SweentAlertFun("Market is off Today");
    // }


    const weekend = new Date().getDay();
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const totalMinutes = hours * 60 + minutes; // e.g., 14 * 60 + 30 = 870


    // Market hours: 9:15 AM to 3:30 PM => 555 to 930 in total minutes
    if (weekend === 6 || weekend === 0 || totalMinutes < 555 || totalMinutes > 930) {
      return SweentAlertFun("Market is off Today");
    }

    const req = {

      MainStrategy: location.state.data.selectStrategyType,
      Strategy: formik.values.Strategy,
      Username: userName,
      ETPattern: formik.values.ETPattern,
      Timeframe: "",
      Exchange: "",
      Symbol: formik.values.Symbol,
      Instrument: "FUTIDX",
      Strike: "",
      Optiontype: "",
      Targetvalue: formik.values.Targetvalue,
      Slvalue: parseFloat(formik.values.Slvalue),
      TStype: formik.values.TStype,
      Quantity: formik.values.Quantity,
      LowerRange:
        formik.values.Striketype == "Premium_Range" &&
          formik.values.Measurment_Type != "Shifting_FourLeg"
          ? formik.values.Lower_Range
          : 0,
      HigherRange:
        formik.values.Striketype == "Premium_Range" &&
          formik.values.Measurment_Type != "Shifting_FourLeg"
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
      serendate: getEndData(formik.values.Measurment_Type),
      expirydata1: getExpiry && getExpiry.data[0],
      Expirytype: formik.values.Expirytype,
      Striketype:
        formik.values.Strategy != "ShortStraddle" &&
          formik.values.Strategy != "LongStraddle" &&
          formik.values.Measurment_Type != "Shifting_FourLeg"
          ? formik.values.Striketype
          : "",
      DepthofStrike:
        formik.values.Striketype != "Premium_Range" &&
          formik.values.Measurment_Type != "Shifting_FourLeg" &&
          formik.values.Strategy != "LongStraddle" &&
          formik.values.Strategy != "ShortStraddle"
          ? Number(formik.values.DepthofStrike)
          : 0,
      DeepStrike:
        (formik.values.Measurment_Type == "Ladder_Coverd" &&
          formik.values.Measurment_Type != "Shifting_FourLeg" &&
          (formik.values.Strategy == "BullCallLadder" ||
            formik.values.Strategy == "BullPutLadder")) ||
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
      ExitRuleO: formik.values.ExitRuleO,
    };

    await CheckPnL(req)
      .then((response) => {
        if (response.Status) {
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
        console.log("Error in fetching the PnL", err);
      });
  };


  const fetchSymbolOptions = async () => {
    try {
      const response = await getOptionSymbol(formik.values.Exchange);
      if (response && response.Symbol) {
        const formattedSymbols = response.Symbol.map((symbol) => ({
          label: symbol,
          value: symbol,
        }));
        setSymbolOptions(formattedSymbols);
        // formik.setFieldValue("Symbol", formattedSymbols[0]?.value || "");
      } else {
        console.error("Unexpected API response:", response.data);
      }
    }
    catch (error) {
      console.error("Error fetching symbol options:", error);
      toast.error("Failed to fetch symbol options.");
    }
  };

  useEffect(() => {
    fetchSymbolOptions();
  }, [formik.values.Exchange]);

  useEffect(() => {
    const workingDay = location?.state?.data?.WorkingDay?.map((item) => ({
      label: item,
      value: item,
    }));

    formik.setFieldValue(
      "Measurment_Type",
      location.state.data.STG == "ShortStrangle" ||
        location.state.data.STG == "LongStrangle" ||
        location.state.data.STG == "LongStraddle" ||
        location.state.data.STG == "ShortStraddle"
        ? "Straddle_Strangle"
        : location.state.data.STG == "LongIronButterfly" ||
          location.state.data.STG == "ShortIronButterfly" ||
          location.state.data.STG == "LongIronCondor" ||
          location.state.data.STG == "ShortIronCondor"
          ? "Butterfly_Condor"
          : location.state.data.STG == "BearCallSpread" ||
            location.state.data.STG == "BearPutSpread" ||
            location.state.data.STG == "BullCallSpread" ||
            location.state.data.STG == "BullPutSpread"
            ? "Spread"
            : location.state.data.STG == "BullCallLadder" ||
              location.state.data.STG == "BullPutLadder" ||
              location.state.data.STG == "CoveredCall" ||
              location.state.data.STG == "CoveredPut"
              ? "Ladder_Coverd"
              : location.state.data.STG == "LongCollar" ||
                location.state.data.STG == "ShortCollar" ||
                location.state.data.STG == "RatioCallSpread" ||
                location.state.data.STG == "RatioPutSpread"
                ? "Collar_Ratio"
                : location.state.data.STG == "LongFourLegStretegy" ||
                  location.state.data.STG == "ShortShifting" ||
                  location.state.data.STG == "LongShifting" ||
                  location.state.data.STG == "ShortFourLegStretegy"
                  ? "Shifting_FourLeg"
                  : ""
    );
    formik.setFieldValue("Strategy", location.state.data.STG);
    formik.setFieldValue("Symbol", location.state.data.MainSymbol);
    formik.setFieldValue("Expirytype", location.state.data.Expirytype);
    formik.setFieldValue("ETPattern", location.state.data.Targettype);
    formik.setFieldValue("TStype", location.state.data.strategytype);
    formik.setFieldValue("Targetvalue", location.state.data["Target value"]);
    formik.setFieldValue("Slvalue", location.state.data["SL value"]);
    formik.setFieldValue("Quantity", location.state.data["Lot Size"]);
    formik.setFieldValue("ExitDay", location.state.data["Product Type"]);
    formik.setFieldValue("EntryTime", location.state.data["Entry Time"]);
    formik.setFieldValue("ExitTime", location.state.data["Exit Time"]);
    formik.setFieldValue("Striketype", location.state.data.StrikeType);
    formik.setFieldValue("DepthofStrike", location.state.data.DepthofStrike);
    formik.setFieldValue("DeepStrike", location.state.data.DeepStrike);
    formik.setFieldValue("Lower_Range", location.state.data.LowerRange);
    formik.setFieldValue("Higher_Range", location.state.data.HigherRange);
    formik.setFieldValue("Trade_Execution", location.state.data.TradeExecution);
    formik.setFieldValue("Trade_Count", location.state.data.TradeCount || 1);
    formik.setFieldValue("Unique_ID", location.state.data.GroupN);
    formik.setFieldValue(
      "Shifting_Value",
      location.state.data.Measurment_Type == "Shifting_FourLeg" &&
        location.state.data.Strategy != "ShortFourLegStretegy" &&
        location.state.data.Strategy != "LongFourLegStretegy"
        ? location.state.data.DepthofStrike
        : ""
    );
    formik.setFieldValue("Exchange", location.state.data.Exchange);
    formik.setFieldValue("CEDepthLower", location.state.data.CEDepthLower);
    formik.setFieldValue("CEDepthHigher", location.state.data.CEDepthHigher);
    formik.setFieldValue("CEDeepLower", location.state.data.CEDeepLower);
    formik.setFieldValue("CEDeepHigher", location.state.data.CEDeepHigher);
    formik.setFieldValue("PEDepthLower", location.state.data.PEDepthLower);
    formik.setFieldValue("PEDepthHigher", location.state.data.PEDepthHigher);
    formik.setFieldValue("PEDeepLower", location.state.data.PEDeepLower);
    formik.setFieldValue("PEDeepHigher", location.state.data.PEDeepHigher);
    formik.setFieldValue("Shifting_Point", location.state.data["Target value"]);
    formik.setFieldValue("Profit", location.state.data.Profit || 0);
    formik.setFieldValue("Loss", location.state.data.Loss || 0);
    formik.setFieldValue("WorkingDay", workingDay);
    formik.setFieldValue(
      "ExitRuleO",
      location.state.data.ExitRuleO || ""
    );
  }, []);

  const SymbolSelectionArr = [
    {
      name: "Exchange", // New field name for Exchange
      label: "Exchange", // Label for the new field
      type: "select",
      options: [
        { label: "NFO", value: "NFO" },
      ],
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
        formik.values.Symbol == "BANKNIFTY"
          ? [{ label: "Monthly", value: "Monthly" }]
          : [
            { label: "Weekly", value: "Weekly" },
            { label: "Monthly", value: "Monthly" },
          ],
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
        value.Strategy != "ShortStraddle" &&
        value.Strategy != "LongStraddle" &&
        value.Measurment_Type != "Shifting_FourLeg" &&
        value.Strategy != "ShortStraddle" &&
        value.Strategy != "LongStraddle",
      headingtype: 1,
      hiding: false,
      label_size: 12,
      col_size: 6,
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
        formik.values.Striketype != "Premium_Range" &&
        value.Measurment_Type != "Shifting_FourLeg" &&
        value.Strategy != "LongStraddle" &&
        value.Strategy != "ShortStraddle",
      label_size: 12,
      col_size: 6,
      headingtype: 2,
      disable: false,
    },
    {
      name: "DeepStrike",
      label: "Deep Strike",
      type: "number",
      showWhen: (value) =>
        (value.Measurment_Type == "Ladder_Coverd" &&
          value.Measurment_Type != "Shifting_FourLeg" &&
          (value.Strategy == "BullCallLadder" ||
            value.Strategy == "BullPutLadder")) ||
        value.Strategy == "LongIronCondor" ||
        value.Strategy == "ShortIronCondor",
      hiding: false,
      label_size: 12,
      col_size: 6,
      headingtype: 2,
      disable: false,
    },
    {
      name: "Lower_Range",
      label: "Lower Range",
      type: "text3",
      hiding: false,
      showWhen: (value) =>
        value.Striketype == "Premium_Range" &&
        value.Measurment_Type != "Shifting_FourLeg",
      label_size: 12,
      col_size: 6,
      headingtype: 2,
      disable: false,
    },
    {
      name: "Higher_Range",
      label: "Higher Range",
      type: "text3",
      hiding: false,
      showWhen: (value) =>
        value.Striketype == "Premium_Range" &&
        value.Measurment_Type != "Shifting_FourLeg",
      label_size: 12,
      col_size: 6,
      headingtype: 2,
      disable: false,
    },

    {
      name: "Shifting_Point",
      label: "Shifting Point",
      type: "text3",
      hiding: false,
      label_size: 12,
      showWhen: (value) =>
        value.Measurment_Type == "Shifting_FourLeg" &&
        (value.Strategy == "ShortShifting" || value.Strategy == "LongShifting"),
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
        value.Strategy == "ShortFourLegStretegy" ||
        value.Strategy == "LongFourLegStretegy",
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
        value.Strategy == "ShortFourLegStretegy" ||
        value.Strategy == "LongFourLegStretegy",
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
        value.Strategy == "ShortFourLegStretegy" ||
        value.Strategy == "LongFourLegStretegy",
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
        value.Strategy == "ShortFourLegStretegy" ||
        value.Strategy == "LongFourLegStretegy",
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
        value.Strategy == "ShortFourLegStretegy" ||
        value.Strategy == "LongFourLegStretegy",
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
        value.Strategy == "ShortFourLegStretegy" ||
        value.Strategy == "LongFourLegStretegy",
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
        value.Strategy == "ShortFourLegStretegy" ||
        value.Strategy == "LongFourLegStretegy",
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
        value.Strategy == "ShortFourLegStretegy" ||
        value.Strategy == "LongFourLegStretegy",
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
        value.Strategy == "LongFourLegStretegy" ||
        value.Strategy == "ShortFourLegStretegy",
      hiding: false,
      label_size: 12,
      col_size: 3,
      headingtype: 2,
      disable: false,
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
            { label: "Future", value: "Future" },
            { label: "Leg vice", value: "Leg vice" },
            { label: "Premium Addition", value: "Premium Addition" },
          ],
      showWhen: (value) => value.Measurment_Type != "Shifting_FourLeg",
      hiding: false,
      label_size: 12,
      col_size: 3,
      headingtype: 3,
      disable: false,
      iconText: text.riskHandle

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
        value.Measurment_Type != "Shifting_FourLeg" ||
        (value.Measurment_Type == "Shifting_FourLeg" &&
          (value.Strategy == "ShortFourLegStretegy" ||
            value.Strategy == "LongFourLegStretegy")),
      col_size: 3,
      headingtype: 4,
      disable: false,
    },
    {
      name: "ExitRuleO",
      label: "Exit Type",
      type: "select1",
      options: [
        { label: "Normal", value: "Normal" },
        { label: "Cost to Cost", value: "Cost to Cost" },
      ],
      showWhen: (value) =>
        value.Measurment_Type != "Shifting_FourLeg" &&
        value.ETPattern == "Leg vice",
      hiding: false,
      label_size: 12,
      col_size: formik.values.Measurment_Type != "Shifting_FourLeg" ? 3 : 3,
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
        value.Measurment_Type != "Shifting_FourLeg" ||
        (value.Measurment_Type == "Shifting_FourLeg" &&
          (value.Strategy == "ShortFourLegStretegy" ||
            value.Strategy == "LongFourLegStretegy")),
      headingtype: 3,
      col_size: 3,
      disable: false,
    },
    {
      name: "Slvalue",
      label: "StopLoss Value",
      type: "text3",
      hiding: false,
      label_size: 12,
      showWhen: (value) =>
        value.Measurment_Type != "Shifting_FourLeg" ||
        (value.Measurment_Type == "Shifting_FourLeg" &&
          (value.Strategy == "ShortFourLegStretegy" ||
            value.Strategy == "LongFourLegStretegy")),
      col_size: 3,
      headingtype: 3,
      disable: false,
    },
    {
      name: "Shifting_Value",
      label: "Number of Shifts",
      type: "text3",
      showWhen: (value) =>
        value.Measurment_Type == "Shifting_FourLeg" &&
        value.Strategy != "ShortFourLegStretegy" &&
        value.Strategy != "LongFourLegStretegy",
      hiding: false,
      label_size: 12,
      col_size: 3,
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
      label: "Trade Count",
      type: "text3",
      label_size: 12,
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
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
      col_size: 3,
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

  const fields = [
    {
      name: "Measurment_Type",
      label: "Option Type",
      type: "select",
      options: (
        location?.state?.scriptType?.data[location?.state?.scriptType?.len]
          ?.CombineOption || []
      ).map((item) => {
        return { label: item, value: item };
      }),
      hiding: false,
      label_size: 12,
      col_size: 4,
      disable: false,
    },
    {
      name: "Strategy",
      label: "Strategy",
      type: "radio1",
      title:
        formik.values.Measurment_Type == "Straddle_Strangle"
          ? [
            { title: "Long Strangle", value: "LongStrangle", iconText: optionStrategyText.LongStrangle, },
            { title: "Short Strangle", value: "ShortStrangle", iconText: optionStrategyText.ShortStrangle, },
            { title: "Long Straddle", value: "LongStraddle", iconText: optionStrategyText.LongStraddle, },
            { title: "Short Straddle", value: "ShortStraddle", iconText: optionStrategyText.ShortStraddle, },
          ]
          : formik.values.Measurment_Type == "Butterfly_Condor"
            ? [
              { title: "Long Iron Butterfly", value: "LongIronButterfly", iconText: optionStrategyText.LongIronButterfly },
              { title: "Short Iron Butterfly", value: "ShortIronButterfly", iconText: optionStrategyText.ShortIronButterfly },
              { title: "Long Iron Condor", value: "LongIronCondor", iconText: optionStrategyText.LongIronCondor },
              { title: "Short Iron Condor", value: "ShortIronCondor", iconText: optionStrategyText.ShortIronCondor },
            ]
            : formik.values.Measurment_Type == "Spread"
              ? [
                { title: "Bear Call Spread", value: "BearCallSpread", iconText: optionStrategyText.BearCallSpread, },
                { title: "Bear Put Spread", value: "BearPutSpread", iconText: optionStrategyText.BearPutSpread, },
                { title: "Bull Call Spread", value: "BullCallSpread", iconText: optionStrategyText.BullCallSpread, },
                { title: "Bull Put Spread", value: "BullPutSpread", iconText: optionStrategyText.BullPutSpread, },
              ]
              : formik.values.Measurment_Type == "Ladder_Coverd"
                ? [
                  { title: "Bull Call Ladder", value: "BullCallLadder", iconText: optionStrategyText.BullCallLadder, },
                  { title: "Bull Put Ladder", value: "BullPutLadder", iconText: optionStrategyText.BullPutLadder, },
                  { title: "Covered Call", value: "CoveredCall", iconText: optionStrategyText.CoveredCall, },
                  { title: "Covered Put", value: "CoveredPut", iconText: optionStrategyText.CoveredPut, },
                ]
                : formik.values.Measurment_Type == "Collar_Ratio"
                  ? [
                    { title: "Long Collar", value: "LongCollar", iconText: optionStrategyText.LongCollar, },
                    { title: "Short Collar", value: "ShortCollar", iconText: optionStrategyText.ShortCollar, },
                    { title: "Ratio Call Spread", value: "RatioCallSpread", iconText: optionStrategyText.RatioCallSpread, },
                    { title: "Ratio Put Spread", value: "RatioPutSpread", iconText: optionStrategyText.RatioPutSpread, },
                  ]
                  : formik.values.Measurment_Type == "Shifting_FourLeg"
                    ? [
                      { title: "Short Shifting", value: "ShortShifting", iconText: optionStrategyText.ShortShifting, },
                      { title: "Long Shifting", value: "LongShifting", iconText: optionStrategyText.LongShifting, },
                      { title: "ShortFourLegStrategy", value: "ShortFourLegStretegy", iconText: optionStrategyText.ShortFourLegStretegy, },
                      { title: "LongFourLegStrategy", value: "LongFourLegStretegy", iconText: optionStrategyText.LongFourLegStretegy, },
                    ]
                    : "",
      label_size: 12,
      col_size: 8,
      disable: false,
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
      headingtype: 11,
      data: EntryRuleArr.filter(
        (item) => !item.showWhen || item.showWhen(formik.values)
      ),
       data1: optionSSTData ,
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
    if (
      formik.values.Strategy == "LongStraddle" ||
      formik.values.Strategy == "ShortStraddle"
    ) {
      formik.setFieldValue("Striketype", "Depth_of_Strike");
    }
    if (formik.values.Striketype != "Premium_Range") {
      formik.setFieldValue("Higher_Range", 1);
      formik.setFieldValue("Lower_Range", 1);
    }
    if (
      (formik.values.Measurment_Type == "Ladder_Coverd" &&
        formik.values.Measurment_Type != "Shifting_FourLeg" &&
        (formik.values.Strategy == "BullCallLadder" ||
          formik.values.Strategy == "BullPutLadder")) ||
      formik.values.Strategy == "LongIronCondor" ||
      formik.values.Strategy == "ShortIronCondor"
    ) {
      formik.setFieldValue("DeepStrike", 2);
    }

    if (
      !(
        formik.values.Measurment_Type == "Shifting_FourLeg" &&
        (formik.values.Strategy == "ShortShifting" ||
          formik.values.Strategy == "LongShifting")
      )
    ) {
      formik.setFieldValue("Shifting_Value", 1);
    }
    if (
      !(
        formik.values.Measurment_Type != "Shifting_FourLeg" ||
        (formik.values.Measurment_Type == "Shifting_FourLeg" &&
          (formik.values.Strategy == "ShortFourLegStretegy" ||
            formik.values.Strategy == "LongFourLegStretegy"))
      )
    ) {
      formik.setFieldValue("TStype", "Point");
      formik.setFieldValue("Targetvalue", 0);
      formik.setFieldValue("Slvalue", 0);
    }
    if (formik.values.Measurment_Type == "Shifting_FourLeg") {
      formik.setFieldValue("ETPattern", "Future");
    }
  }, [
    formik.values.Strategy,
    formik.values.Striketype,
    formik.values.Measurment_Type,
  ]);


  useEffect(() => {
    const temp =
      location.state.data.STG == "ShortStrangle" ||
        location.state.data.STG == "LongStrangle" ||
        location.state.data.STG == "LongStraddle" ||
        location.state.data.STG == "ShortStraddle"
        ? "Straddle_Strangle"
        : location.state.data.STG == "LongIronButterfly" ||
          location.state.data.STG == "ShortIronButterfly" ||
          location.state.data.STG == "LongIronCondor" ||
          location.state.data.STG == "ShortIronCondor"
          ? "Butterfly_Condor"
          : location.state.data.STG == "BearCallSpread" ||
            location.state.data.STG == "BearPutSpread" ||
            location.state.data.STG == "BullCallSpread" ||
            location.state.data.STG == "BullPutSpread"
            ? "Spread"
            : location.state.data.STG == "BullCallLadder" ||
              location.state.data.STG == "BullPutLadder" ||
              location.state.data.STG == "CoveredCall" ||
              location.state.data.STG == "CoveredPut"
              ? "Ladder_Coverd"
              : location.state.data.STG == "LongCollar" ||
                location.state.data.STG == "ShortCollar" ||
                location.state.data.STG == "RatioCallSpread" ||
                location.state.data.STG == "RatioPutSpread"
                ? "Collar_Ratio"
                : location.state.data.STG == "LongFourLegStretegy" ||
                  location.state.data.STG == "ShortShifting" ||
                  location.state.data.STG == "LongShifting" ||
                  location.state.data.STG == "ShortFourLegStretegy"
                  ? "Shifting_FourLeg"
                  : "";

    if (
      formik.values.Measurment_Type &&
      formik.values.Measurment_Type != temp
    ) {
      formik.setFieldValue("Strategy", "");
    }
  }, [formik.values.Measurment_Type]);

  const fetchOptionSST = async () => {
    try {
      if (!formik.values.Exchange || !formik.values.Symbol || !formik.values.Strategy || !formik.values.Expirytype || !formik.values.Striketype || !formik.values.DepthofStrike) {
        return;
      } 

      const req = {
        Strategy: formik.values.Strategy,
        Exchange: formik.values.Exchange,
        Symbol: formik.values.Symbol,
        Instrument: formik.values.Instrument,
        LowerRange: formik.values.Lower_Range,
        HigherRange: formik.values.Higher_Range,
        expirydata1: getExpiry && getExpiry.data[0],
        Expirytype: formik.values.Expirytype,
        Striketype: formik.values.Striketype,
        DepthofStrike: formik.values.DepthofStrike,
        DeepStrike: formik.values.DeepStrike,
        CEDepthLower: 0.0,
        CEDepthHigher: 0.0,
        PEDepthLower: 0.0,
        PEDepthHigher: 0.0,
        CEDeepLower: 0.0,
        CEDeepHigher: 0.0,
        PEDeepLower: 0.0,
        PEDeepHigher: 0.0
      }
      const response = await OptionSST_API(req);
      setOptionSSTData(response);
    } catch (error) {
      console.error("Error fetching Option SST data:", error);
    }

  }

 useEffect(() => {
  if (
    !getExpiry.loading &&
    getExpiry.data &&
    getExpiry.data?.length > 0 &&
    formik.values.DepthofStrike &&
    formik.values.Striketype &&
    formik.values.Expirytype &&
    formik.values.Symbol &&
    formik.values.Strategy &&
    formik.values.Exchange
  ) {
    fetchOptionSST();
  }
}, [
  getExpiry.loading,
  getExpiry.data,
  formik.values.DepthofStrike,
  formik.values.Striketype,
  formik.values.Expirytype,
  formik.values.Symbol,
  formik.values.Strategy,
  formik.values.Exchange,
]);


  return (
    <>
      <Content
        Page_title={`📌 Add Script - Option Strategy , Group : ${location.state.data.Username}`}
        button_status={false}
        backbutton_status={false}>
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
              {formik.values.Strategy !== "CoveredCall" &&
                formik.values.Strategy !== "CoveredPut" &&
                formik.values.Strategy !== "LongCollar" &&
                formik.values.Strategy !== "ShortCollar" &&
                formik.values.Strategy !== "LongFourLegStretegy" &&
                formik.values.Strategy !== "ShortFourLegStretegy" && (
                  <button
                    className="addbtn"
                    type="button"
                    onClick={() => handleCheckPnl()}>
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
          centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              PnL Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {PnlData ? (
              <div className="container">
                <div className="row" id="Pnl-row-data">
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
                      className="col-md-6 d-flex align-items-center py-2">
                      <label
                        className="fw-bold mb-0 me-2 "
                        style={{ fontSize: "18px", minWidth: "150px" }}>
                        {label}:
                      </label>
                      <span
                        className="mb-0"
                        style={{ fontSize: "18px", fontWeight: "500" }}>
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
            <Button className="submit-button-one" onClick={() => setOpenModel(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Content>
    </>
  );
};
export default AddClient;
