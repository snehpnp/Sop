import { useLocation, useNavigate } from "react-router-dom";
import AddForm from "../../../ExtraComponent/FormData2";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Get_Symbol,
  Get_StrikePrice,
  GET_EXPIRY_DATE,
  GetExchange,
} from "../../CommonAPI/Admin";
import { AddScript, CheckPnLScalping, CPrice, getToken } from "../../CommonAPI/User";
import { text } from "../../../ExtraComponent/IconTexts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Content from "../../../ExtraComponent/Content";
import $ from 'jquery'
import { connectWebSocketForSingleChannel } from "../UserDashboard/LivePriceForSingleChannel";
import { GetLivePricefromSymbol } from "../../../Utils/helper";
import { GetInstrument } from "../../CommonAPI/Common";


const AddClient = () => {
  const userName = localStorage.getItem("name");
  const navigate = useNavigate();
  const location = useLocation();
  const [getAllExchange, setAllExchange] = useState([]);
  const [getSymbolData, setSymbolData] = useState({ loading: true, data: [] });
  const [getStricke, setStricke] = useState({ loading: true, data: [] });
  const [getExpiryDate, setExpiryDate] = useState({ loading: true, data: [] });
  const [openModel, setOpenModel] = useState(false);
  const [openModel1, setOpenModel1] = useState(false);
  const [priceValue, setPriceValue] = useState("");
  const [marginValue, setMarginValue] = useState("");
  const [error, setError] = useState("");
  const [showPnl, setShowPnl] = useState(false);
  const theme = localStorage.getItem("theme");
  const [getCPrice, setCPrice] = useState(null);
  const [channel, setChannel] = useState(null);
  const [allInstrument, setAllInstrument] = useState([]);
  const [livePrice, setLivePrice] = useState(null);

  const [PnlData, setPnlData] = useState({
    InstrumentName: "",
    LotSize: "",
    MainSymbol: "",
    Message: "",
    Status: "",
    Token: "",
    TotalMargin: "",
    TotalPnL: "",
    TradingSymbol: "",
  });

  const SweentAlertFun = (text) => {
    Swal.fire({
      title: "Warning !",
      text: text,
      icon: "warning",
      timer: 1500,
      timerProgressBar: true,
    });
  };

  const dataWithoutLastItem = location?.state?.data?.scriptType?.data?.slice(0, -1);

  const getEndData = (stg) => {
    const foundItem = dataWithoutLastItem.find((item) => {
      return item.Scalping.includes(stg);
    });
    return foundItem?.EndDate;
  };

  const ScrollToViewFirstError = (newErrors) => {
    if (Object.keys(newErrors).length !== 0) {
      const errorField = Object.keys(newErrors)[0];
      const errorElement = document.getElementById(errorField);
      if (errorElement) {
        const elementPosition =
          errorElement.getBoundingClientRect().top + window.pageYOffset;

        const offset = 400;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }
    }
  };

  

  const formik = useFormik({
    initialValues: {
      MainStrategy: "",
      Username: "",
      Strategy: "Multi_Conditional",
      ETPattern: "",
      Timeframe: "",
      Exchange: "",
      Symbol: "",
      Instrument: "",
      Strike: "",
      Optiontype: "",
      Targetvalue: 1,
      Slvalue: 1,
      TStype: "",
      Quantity: 1,
      LowerRange: 0,
      HigherRange: 0,
      HoldExit: "",
      EntryPrice: 0,
      EntryRange: 0,
      tgp2: 0,
      tgp3: 0,
      quantity2: 0,
      quantity3: 0,
      stepup: 1,
      quantityvalue: "0",
      EntryTime: "09:15:00",
      ExitTime: "15:25:00",
      ExitDay: "",
      FixedSM: "Single",
      TType: "",
      serendate: "",
      Planname: "",
      expirydata1: "",
      Expirytype: "",
      Striketype: "",
      DepthofStrike: 0,
      DeepStrike: 0,
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
      Trade_Execution: "Paper Trade",
      quantityselection: "Addition",
      Targetselection: "Fixed Target",
      RepeatationCount: 1,
      Profit: 0,
      Loss: 0,
      RollOver: false,
      NumberOfDays: "0",
      RolloverTime: "00:00:00",
      TargetExit: false,
      WorkingDay: [],
      OrderType: "Pending",
      FinalTarget: 0.0,
    },
    validate: (values) => {
      let errors = {};
      const maxTime = "15:29:59";
      const minTime = "09:15:00";
      const mcxMaxTime = "23:29:59";
      const mcxMinTime = "08:59:59";

      if (!values.Strategy) {
        errors.Strategy = "Please Select Strategy Type.";
      }
      if (!values.Trade_Execution || values.Trade_Execution == 0) {
        errors.Trade_Execution = "Please Select Trade Execution.";
      }

      if (values.TargetExit === "" || values.TargetExit === undefined || values.TargetExit === null) {
        errors.TargetExit = "Please Enter Continue after cycle exit"
      }
      if (!values.Trade_Count || values.Trade_Count == 0) {
        errors.Trade_Count = "Please Enter Trade Count.";
      }
      if (!values.Exchange) {
        errors.Exchange = "Please Select Exchange Type.";
      }
      if (!values.Instrument && values.Exchange !== "NSE") {
        errors.Instrument = "Please Select Instrument Type.";
      }
      if (!values.Symbol) {
        errors.Symbol = "Please Select Symbol Type.";
      }
      if (
        !values.Optiontype &&
        (values.Instrument === "OPTSTK" ||
          values.Instrument === "OPTIDX" ||
          (values.Instrument == "OPTFUT" && values.Exchange === "MCX"))
      ) {

        errors.Optiontype = "Please Select Option Type.";
      }
      if (
        !values.Strike &&
        (values.Instrument === "OPTSTK" ||
          values.Instrument === "OPTIDX" ||
          (values.Instrument == "OPTFUT" && values.Exchange === "MCX"))
      ) {
        errors.Strike = "Please Select Strike Price.";
      }
      if (!values.expirydata1 && values.Exchange !== "NSE") {
        errors.expirydata1 = "Select Expiry Date.";
      }
      if (!values.TType) {
        errors.TType = "Please Select Transaction Type.";
      }

      if (!values.Quantity) {
        errors.Quantity =
          formik.values.Exchange == "NFO" &&
            formik.values.FixedSM == "Single" &&
            formik.values.Strategy == "Multi_Conditional"
            ? "Please Enter Quantity 1"
            : formik.values.Exchange == "NFO"
              ? "Please Enter Lot Value."
              : "Please Enter Quantity Value.";
      }
      if (!values.ExitTime) {
        errors.ExitTime = "Please Select Exit Time.";
      } else if (
        values.ExitTime > (values.Exchange === "MCX" ? mcxMaxTime : maxTime)
      ) {
        errors.ExitTime = `Exit Time Must be Before ${values.Exchange === "MCX" ? "23:29:59" : "15:29:59"
          }.`;
      }

      if (!values.EntryTime) {
        errors.EntryTime = "Please Select Entry Time.";
      } else if (
        values.EntryTime < (values.Exchange === "MCX" ? mcxMinTime : minTime)
      ) {
        errors.EntryTime = `Entry Time Must be After ${values.Exchange === "MCX" ? "09:00:00" : "09:15:00"
          }.`;
      }

      if (!values.TStype && values.Strategy != "Fixed Price") {
        errors.TStype = "Please Select Measurement Type.";
      }

      if (!values.ExitDay) {
        errors.ExitDay = "Please Select Exit Day.";
      }

      if (
        values.EntryPrice === undefined ||
        values.EntryPrice === null ||
        values.EntryPrice === ""
      ) {
        if (
          values.Strategy == "Fixed Price" ||
          (values.Strategy == "Multi_Conditional" && values.FixedSM == "Single")
        ) {
          errors.EntryPrice = "Please Enter The Lowest Price.";
        } else if (values.Strategy != "Fixed Price") {
          errors.EntryPrice = "Please Enter The First Trade Lower Range";
        }
      }
      if (
        values.EntryRange === undefined ||
        values.EntryRange === null ||
        values.EntryRange === ""
      ) {
        if (
          values.Strategy == "Fixed Price" ||
          (values.Strategy == "Multi_Conditional" && values.FixedSM == "Single")
        ) {
          errors.EntryRange = "Please Enter The Highest Price.";
        } else if (values.Strategy != "Fixed Price") {
          errors.EntryRange = "Please Enter The First Trade Higher Range";
        }
      }

      if (!values.Targetvalue) {
        errors.Targetvalue =
          values.FixedSM == "Single" && values.Strategy == "Multi_Conditional"
            ? "Please Enter  Target 1"
            : values.Strategy == "Fixed Price"
              ? "Please Enter A Target."
              : "Please Enter Target Value.";
      }

      if (
        !values.LowerRange &&
        (values.Strategy == "Multi Directional" ||
          values.Strategy == "One Directional") &&
        values.LowerRange == "" &&
        values.LowerRange !== 0
      ) {
        errors.LowerRange = "Please Enter The Lower Range.";
      }
      if (
        !values.HigherRange &&
        (values.Strategy == "Multi Directional" ||
          values.Strategy == "One Directional") &&
        values.HigherRange == "" &&
        values.HigherRange !== 0
      ) {
        errors.HigherRange = "Please Enter The Higher Range.";
      }

      if (!values.Group) {
        errors.Group = "Please Enter Unique Name.";
      }
      if (!values.HoldExit && values.Strategy != "Fixed Price") {
        errors.HoldExit = "Please Select Whether To Hold Or Exit.";
      }
      if (!values.Slvalue) {
        errors.Slvalue =
          values.Strategy == "Fixed Price"
            ? "Please Enter Stop Loss Price."
            : "Please Select Stop Loss Value.";
      }

      if (
        values.Strategy == "Multi_Conditional" &&
        values.FixedSM == "Multiple"
      ) {
        if (!values.stepup) {
          errors.stepup = "Please Enter Step Up";
        }

        if (!values.quantityselection) {
          errors.quantityselection = "Please Select Increment Type";
        }

        if (values.quantityselection === "Multiplication" && values.quantityvalue == 0) {
          errors.quantityvalue = "Please Enter Increment Value";
        }

        if (values.quantityselection === "Addition" && values.quantityvalue == 0 && (values.quantityvalue === null || values.quantityvalue == undefined || values.quantityvalue == "")) {
          errors.quantityvalue = "Please Enter Increment Value";
        }
        if (!values.Targetvalue) {
          errors.Targetvalue = "Please Enter Target";
        }
        if (!values.Targetselection) {
          errors.Targetselection = "Please Select Target Type";
        }
      }
      if (
        values.FixedSM == "Multiple" &&
        values.Strategy == "Multi_Conditional" &&
        !values.quantityselection
      ) {
        errors.quantityselection = "Please Select Target Selection";
      }

      if (values.Strategy == "Multi_Conditional" && !values.FixedSM) {
        errors.FixedSM = "Please Select Position Type";
      }
      if (values.Strategy === "Multi_Conditional" && values.FixedSM === "Multiple") {

        if (values.RepeatationCount === "" || values.RepeatationCount === undefined) {
          errors.RepeatationCount = "Please enter a value for Repetition Count";
        } else if (values.RepeatationCount < 1) {
          errors.RepeatationCount = "Repetition Count must be at least 1";
        }
      }
      if (
        (values.Loss === undefined ||
          values.Loss === null ||
          values.Loss === "") &&
        values.Strategy == "Multi_Conditional" &&
        values.FixedSM == "Multiple"
      ) {
        errors.Loss = "Please Enter Maximum Loss";
      }

      if (
        (values.Profit === undefined ||
          values.Profit === null ||
          values.Profit === "") &&
        values.Strategy == "Multi_Conditional" &&
        values.FixedSM == "Multiple"
      ) {
        errors.Profit = "Please Enter Maximum Loss";
      }

      if (
        !values.NumberOfDays &&
        values.Strategy == "Multi_Conditional" &&
        values.FixedSM == "Multiple" &&
        values.RollOver == true
      ) {
        errors.NumberOfDays = "Please Enter No. of Days";
      }

      if (
        !values.RolloverTime &&
        values.Strategy == "Multi_Conditional" &&
        values.FixedSM == "Multiple" &&
        values.RollOver == true
      ) {
        errors.RolloverTime = "Please Enter RollOver Exit Time";
      }

      if (!values.WorkingDay?.length > 0) {
        errors.WorkingDay = "Please select Working day";
      }

      if (
        !values.OrderType &&
        values.Strategy == "Multi_Conditional" &&
        values.Trade_Execution == "Live Trade"
      ) {
        errors.OrderType = "Please select Order Type";
      }
      if (
        values.FinalTarget == undefined ||
        (values.FinalTarget == "" &&
          formik.values.FixedSM == "Multiple" &&
          formik.values.Strategy == "Multi_Conditional" &&
          formik.values.Targetselection == "Entry Wise SL")
      ) {
        errors.FinalTarget = "Please Enter Final Target Price";
      }


      // ScrollToViewFirstError(errors);
      return errors;
    },

    onSubmit: async (values) => {


      try {
        const req = {
          MainStrategy:
            formik.values.Strategy == "Multi_Conditional"
              ? "NewScalping"
              : location?.state?.data?.selectStrategyType,
          Username: userName,
          Strategy: values.Strategy,
          Exchange: values.Exchange,
          Instrument: values.Exchange == "NSE" ? "" : values.Instrument,
          Symbol: values.Symbol,
          Optiontype:
            values.Instrument == "OPTIDX" ||
              values.Instrument == "OPTSTK" ||
              (values.Exchange === "MCX" && values.Instrument == "OPTFUT") ||
              values.Exchange === "BFO"
              ? values.Optiontype
              : "",
          Strike:
            values.Instrument == "OPTIDX" ||
              values.Instrument == "OPTSTK" ||
              (values.Exchange === "MCX" && values.Instrument == "OPTFUT") ||
              (values.Exchange === "BFO" && (values.Instrument == "SO" || values.Instrument == "IO"))
              ? values.Strike
              : "",
          expirydata1:
            values.expirydata1 == "Monthly"
              ? getExpiryDate?.data?.[0]
              : values.expirydata1 == "Next_Month"
                ? getExpiryDate?.data?.[1]
                : values.Exchange == "NSE"
                  ? getExpiryDate?.data?.[0]
                  : values.expirydata1,
          TType: values.TType,
          TStype:
            values.Strategy == "One Directional" ||
              values.Strategy == "Multi Directional" ||
              values.Strategy == "Multi_Conditional"
              ? values.TStype
              : "",
          Targetvalue: values.Targetvalue,
          Slvalue: values.Slvalue,
          HoldExit:
            values.Strategy === "Multi Directional" ||
              values.Strategy === "One Directional" ||
              values.Strategy == "Multi_Conditional"
              ? values.HoldExit
              : "",
          ExitDay: values.ExitDay,
          EntryTime: values.EntryTime,
          ExitTime: values.ExitTime,
          EntryPrice: Number(values.EntryPrice),
          EntryRange: Number(values.EntryRange),
          LowerRange:
            values.Strategy === "Fixed Price" ||
              values.Strategy == "Multi_Conditional"
              ? 0
              : Number(values.LowerRange),
          HigherRange:
            values.Strategy === "Fixed Price" ||
              values.Strategy == "Multi_Conditional"
              ? 0
              : Number(values.HigherRange),
          ETPattern: "",
          Timeframe: "",
          Quantity: values.Quantity,
          serendate: getEndData(values.Strategy),
          Planname: location?.state?.data?.scriptType?.data?.find(
            (item) => item.EndDate == getEndData(formik?.values?.Strategy)
          )?.Planname,
          Expirytype: "",
          FixedSM:
            formik.values.Strategy == "Multi_Conditional"
              ? formik.values.FixedSM
              : "Multiple",
          Striketype: "",
          DepthofStrike: 0,
          DeepStrike: 0,
          Group: values.Group,
          CEDepthLower: 0.0,
          CEDepthHigher: 0.0,
          PEDepthLower: 0.0,
          PEDepthHigher: 0.0,
          CEDeepLower: 0.0,
          CEDeepHigher: 0.0,
          PEDeepLower: 0.0,
          PEDeepHigher: 0.0,
          TradeCount: values.Trade_Count || 1,
          TradeExecution: values.Trade_Execution,
          quantity2:
            values.FixedSM == "Single" && values.Strategy == "Multi_Conditional"
              ? Number(values.quantity2)
              : 0,
          quantity3:
            values.FixedSM == "Single" && values.Strategy == "Multi_Conditional"
              ? Number(values.quantity3)
              : 0,
          tgp2:
            values.FixedSM == "Single" && values.Strategy == "Multi_Conditional"
              ? Number(values.tgp2)
              : 0,
          tgp3:
            values.FixedSM == "Single" && values.Strategy == "Multi_Conditional"
              ? Number(values.tgp3)
              : 0,
          stepup:
            values.FixedSM == "Multiple" &&
              values.Strategy == "Multi_Conditional"
              ? Number(values.stepup)
              : 0,
          quantityselection:
            values.FixedSM == "Multiple" &&
              values.Strategy == "Multi_Conditional"
              ? values.quantityselection
              : "",
          quantityvalue:
            values.FixedSM == "Multiple" &&
              values.Strategy == "Multi_Conditional"
              ? Number(values.quantityvalue)
              : 1,
          targetselection:
            values.FixedSM == "Multiple" &&
              values.Strategy == "Multi_Conditional"
              ? values.Targetselection
              : "Single",
          RepeatationCount:
            values.FixedSM == "Multiple" &&
              values.Strategy == "Multi_Conditional"
              ? Number(values.RepeatationCount)
              : 1,
          Loss:
            values.FixedSM == "Multiple" &&
              values.Strategy == "Multi_Conditional"
              ? Number(values.Loss)
              : 0,

          Profit:
            values.FixedSM == "Multiple" &&
              values.Strategy == "Multi_Conditional"
              ? Number(values.Profit)
              : 0,
          RolloverTF:
            values.FixedSM == "Multiple" &&
              values.Strategy == "Multi_Conditional"
              ? values.RollOver
              : false,
          RolloverDay:
            values.FixedSM == "Multiple" &&
              values.Strategy == "Multi_Conditional" &&
              values.RollOver == "true"
              ? values.NumberOfDays
              : "0",
          RolloverTime:
            values.FixedSM == "Multiple" &&
              values.Strategy == "Multi_Conditional" &&
              values.RollOver == "true"
              ? values.RolloverTime
              : "00:00:00",
          // TargetExit:
          //   values.Strategy == "Multi Directional" ||
          //     values.Strategy == "One Directional" ||
          //     (values.Strategy == "Multi_Conditional" &&
          //       values.FixedSM == "Multiple")
          //     ? values.TargetExit
          //     : false,
          TargetExit: values.TargetExit,
          WorkingDay: values?.WorkingDay?.map((item) => item?.value || item),
          OrderType: values.OrderType,
          FinalTarget:
            formik.values.FixedSM == "Multiple" &&
              formik.values.Strategy == "Multi_Conditional" &&
              formik.values.Targetselection == "Entry Wise SL"
              ? parseFloat(values.FinalTarget)
              : 0.0,
        };



        if (
          (Number(values.EntryPrice) > 0 || Number(values.EntryRange) > 0) &&
          Number(values.EntryPrice) >= Number(values.EntryRange)
        ) {
          return SweentAlertFun(
            values.Strategy === "Fixed Price"
              ? "Higher Price should be greater than Lower Price"
              : "First Trade Higher Range should be greater than First Trade Lower Range"
          );
        }
        if (
          (values.Strategy !== "Fixed Price" ||
            values.Strategy !== "Multi_Conditional") &&
          Number(values.LowerRange) >= Number(values.HigherRange) &&
          (Number(values.LowerRange) > 0 || Number(values.HigherRange) > 0)
        ) {
          return SweentAlertFun(
            "Higher Price should be greater than Lower Range"
          );
        }
        if (
          values.Strategy === "Fixed Price" &&
          values.TType === "BUY" &&
          (Number(values.EntryPrice) >= Number(values.EntryRange) ||
            Number(values.Targetvalue) <= Number(values.EntryRange) ||
            Number(values.Slvalue) >= Number(values.EntryPrice))
        ) {
          const alertMessage =
            Number(values.Targetvalue) <= Number(values.EntryRange)
              ? "Target should be greater than Higher Price"
              : Number(values.EntryRange) <= Number(values.EntryPrice)
                ? "Higher Price should be greater than Lower Price"
                : "Stoploss should be smaller than Lower Price";

          return SweentAlertFun(alertMessage);
        }
        if (
          values.Strategy === "Fixed Price" &&
          values.TType === "SELL" &&
          (Number(values.Targetvalue) >= Number(values.EntryPrice) ||
            Number(values.Slvalue) <= Number(values.EntryRange))
        ) {
          const alertMessage =
            Number(values.Targetvalue) >= Number(values.EntryPrice)
              ? "Target should be smaller than Lower Price"
              : "Stoploss should be greater than Higher Price";

          return SweentAlertFun(alertMessage);
        }

        if (values.EntryTime >= values.ExitTime) {
          return SweentAlertFun("Exit Time should be greater than Entry Time");
        }

        if (
          values.Strategy == "Multi_Conditional" &&
          values.FixedSM == "Single"
        ) {
          if (Number(values.quantity2) == 0 && Number(values.quantity3) > 0) {
            return SweentAlertFun(
              formik.values.Exchange == "NFO"
                ? "Please Enter Lot 2"
                : "Please Enter Quantity 2"
            );
          } else if (
            (Number(values.quantity2) > 0 && Number(values.tgp2) == 0) ||
            (Number(values.quantity2) == 0 && Number(values.tgp2) > 0)
          ) {
            if (Number(values.quantity2) > 0) {
              return SweentAlertFun("Please Enter Target 2 ");
            } else if (Number(formik.values.tgp2) > 0) {
              return SweentAlertFun(
                formik.values.Exchange == "NFO"
                  ? "Please Enter Lot 2"
                  : "Please Enter Quantity 2"
              );
            }
          } else if (
            (Number(values.quantity3) > 0 && Number(values.tgp3) == 0) ||
            (Number(values.quantity3) == 0 && Number(values.tgp3) > 0)
          )
            if (Number(values.quantity3) > 0 && Number(values.tgp3) == 0) {
              return SweentAlertFun("Please Enter Target 3");
            } else {
              return SweentAlertFun(
                formik.values.Exchange == "NFO"
                  ? "Please Enter Lot 3"
                  : "Please Enter Quantity 3"
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

              sessionStorage.setItem("redirectStrategyType", "Scalping");
              setTimeout(() => {
                navigate("/user/dashboard");
              }, 1500);
            } else {
              Swal.fire({
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
      } catch (err) {
        console.log("Error in Add Script", err);
      }
    },
  });


  useEffect(() => {
    formik.setFieldValue("Exchange", "NFO");
    formik.setFieldValue("TType", "BUY");
    formik.setFieldValue("ExitDay", "Intraday");
    formik.setFieldValue("EntryPrice", 0);
    formik.setFieldValue("EntryRange", 0);
    formik.setFieldValue("Instrument", "FUTIDX");
    formik.setFieldValue("HoldExit", "Hold");
    formik.setFieldValue("TStype", "Point");
    formik.setFieldValue("TargetExit", false);
  }, []);

  useEffect(() => {
    if (formik.values.Exchange === "MCX") {
      formik.setFieldValue("Instrument", "FUTCOM");
    }else if(formik.values.Exchange === "BFO") {
      formik.setFieldValue("Instrument", "IF");
    }else if(formik.values.Exchange === "NFO") {
      formik.setFieldValue("Instrument", "FUTIDX");
    } 
  }, [formik.values.Exchange]);





  const SymbolSelectionArr = [
    {
      name: "Exchange",
      label: "Exchange",
      type: "select",
      options:
        getAllExchange &&
        getAllExchange.map((item) => ({ label: item, value: item })),
      hiding: false,
      label_size: 12,
      headingtype: 1,
      col_size:
        formik.values.Exchange == "BFO" && formik.values.Instrument == "SO" || formik.values.Instrument == "IO"
          ? 4 :
          formik.values.Exchange == "MCX" && formik.values.Instrument == "OPTFUT"
            ? 4
            : (formik.values.Exchange == "NFO" &&
              (formik.values.Instrument === "FUTSTK" ||
                formik.values.Instrument === "FUTIDX")) ||
              formik.values.Exchange == "MCX"
              ? 3
              : formik.values.Exchange == "NFO" &&
                (formik.values.Instrument === "OPTIDX" ||
                  formik.values.Instrument === "OPTSTK")
                ? 4
                : formik.values.Exchange == "NSE" &&
                  formik.values.Instrument == "FUTIDX"
                  ? 6
                  : formik.values.Exchange == "MCX"
                    ? 4
                    : formik.values.Exchange == "BFO" ? 3 : 6,
      disable: false,
    },

    {
      name: "Instrument",
      label: "Instrument",
      type: "select",
      options: allInstrument && allInstrument.map((item) => ({
        label: item,
        value: item,
      })),
      // options:
      // formik.values.Exchange === "BFO"
      //   ? [
      //     { label: "SO", value: "SO" },
      //     { label: "SF", value: "SF" },
      //     { label: "IO", value: "IO" },
      //     { label: "IF", value: "IF" },
      //   ] :
      //   formik.values.Exchange === "NFO"
      //     ? [
      //       { label: "FUTIDX", value: "FUTIDX" },
      //       { label: "FUTSTK", value: "FUTSTK" },
      //       { label: "OPTIDX", value: "OPTIDX" },
      //       { label: "OPTSTK", value: "OPTSTK" },
      //     ]
      //     : formik.values.Exchange === "MCX"
      //       ? [
      //         { label: "OPTFUT", value: "OPTFUT" },
      //         { label: "FUTCOM", value: "FUTCOM" },
      //         // { label: "FUTIDX", value: "FUTIDX" },
      //       ]
      //       : formik.values.Exchange == "CDS"
      //         ? [
      //           { label: "OPTCUR", value: "OPTCUR" },
      //           { label: "FUTCUR", value: "FUTCUR" },
      //         ]
      //         : [],
      showWhen: (values) =>
        values.Exchange == "NFO" ||
        values.Exchange == "BFO" ||
        values.Exchange == "CDS" ||
        values.Exchange == "MCX",
      hiding: false,
      label_size: 12,
      headingtype: 1,
      col_size:
        formik.values.Exchange == "BFO" && formik.values.Instrument == "SO" || formik.values.Instrument == "IO"
          ? 4 :
          formik.values.Instrument === "FUTCOM" &&
            formik.values.Exchange === "MCX"
            ? 3
            : formik.values.Instrument === "FUTSTK" ||
              formik.values.Instrument === "FUTIDX"
              ? 3
              : formik.values.Instrument === "OPTIDX" ||
                formik.values.Instrument === "OPTSTK"
                ? 4
                : formik.values.Exchange == "MCX"
                  ? 4
                  : 3,
      disable: false,
    },
    {
      name: "Symbol",
      label: "Symbol",
      type: "select",
      options:
        getSymbolData.data &&
        getSymbolData.data.map((item) => ({
          label: item,
          value: item,
        })),
      showWhen: (values) =>
        values.Exchange === "NFO" ||
        values.Exchange === "BFO" ||
        values.Exchange === "NSE" ||
        values.Exchange === "CDS" ||
        values.Exchange === "MCX",
      label_size: 12,
      headingtype: 1,
      hiding: false,
      col_size:
        formik.values.Exchange == "BFO" && formik.values.Instrument == "SO" || formik.values.Instrument == "IO"
          ? 4 :
          formik.values.Exchange == "MCX" && formik.values.Instrument == "OPTFUT"
            ? 4
            : formik.values.Exchange == "MCX"
              ? 3
              : formik.values.Exchange == "NSE"
                ? 6
                : formik.values.Instrument === "OPTIDX" ||
                  formik.values.Instrument === "OPTSTK"
                  ? 4
                  : 3,
      disable: false,
    },
    {
      name: "Optiontype",
      label: "Option Type",
      type: "select",
      options: [
        { label: "CE", value: "CE" },
        { label: "PE", value: "PE" },
      ],
      showWhen: (values) => (values.Exchange === "BFO" && values.Instrument == "SO" || values.Instrument == "IO") ||
        (values.Instrument == "OPTFUT" && values.Exchange === "MCX") || (
          values.Instrument == "OPTIDX" ||
          values.Instrument == "OPTSTK")
      ,
      label_size: 12,
      hiding: false,
      col_size: 4,
      headingtype: 1,
      disable: false,
    },

    {
      name: "expirydata1",
      label: "Expiry Date",
      type: "select",
      options:
        formik.values.Exchange == "NFO" &&
          (formik.values.Instrument == "FUTIDX" ||
            formik.values.Instrument == "FUTSTK")
          ? [
            { label: "Monthly", value: "Monthly" },
            { label: "Next Month", value: "Next_Month" },
          ]
          : getExpiryDate &&
          getExpiryDate.data.map((item) => ({
            label: item,
            value: item,
          })),
      showWhen: (values) =>
        values.Exchange === "NFO" ||
        values.Exchange === "BFO" ||
        values.Exchange === "CDS" ||
        values.Exchange === "MCX",
      label_size: 12,
      headingtype: 1,
      hiding: false,
      col_size:
        formik.values.Instrument === "FUTCOM" &&
          formik.values.Exchange === "MCX"
          ? 3
          : formik.values.Instrument === "FUTSTK" ||
            formik.values.Instrument === "FUTIDX"
            ? 3 : formik.values.Exchange === "BFO" && (formik.values.Instrument == "SO" || formik.values.Instrument == "IO")
              ? 4
              : 3,
      disable: false,
    },
    {
      name: "Strike",
      label: "Strike Price",
      type: "select",
      options:
        getStricke.data &&
        getStricke.data.map((item) => ({
          label: item,
          value: item,
        })),
      showWhen: (values) =>
        (values.Exchange === "BFO" && values.Instrument == "SO" || values.Instrument == "IO") ||
        (values.Instrument == "OPTFUT" && values.Exchange === "MCX") ||
        (values.Instrument == "OPTIDX" ||
          values.Instrument == "OPTSTK"),
      label_size: 12,
      headingtype: 1,
      col_size: 4,
      hiding: false,
      disable: false,

    },


  ];

  const EntryRuleArr = [
    {
      name: "FixedSM",
      label: "Position Type",
      type: "select1",
      options: [
        { label: "Single", value: "Single" },
        { label: "Multiple", value: "Multiple" },
      ],
      label_size: 12,
      headingtype: 2,
      hiding: false,
      col_size: 6,
      iconText: text.positionType,
      showWhen: (values) => values.Strategy == "Multi_Conditional",
      disable: false,
    },
    {
      name: "TType",
      label: "Transaction Type",
      type: "select1",
      options: [
        { label: "BUY", value: "BUY" },
        { label: "SELL", value: "SELL" },
      ],
      label_size: 12,
      headingtype: 2,
      hiding: false,
      // col_size:
      //   formik.values.Strategy == "Fixed Price" ||
      //     formik.values.Strategy == "Multi_Conditional"
      //     ? 3
      //     : 4,
      col_size: 6,
      disable: false,
    },

    {
      name: "EntryPrice",
      label: "First Trade Lower Range",
      type: "text3",
      col_size: 4,
      disable: false,
      headingtype: 2,
      iconText:
        formik.values.Strategy == "Fixed Price" ||
          (formik.values.FixedSM == "Single" &&
            formik.values.Strategy == "Multi_Conditional")
          ? text.firstTradeHigherRange
          : text.firstTradeHigherRange,
      hiding: false,
    },
    {
      name: "EntryRange",
      label: "First Trade Higher Range",
      type: "text3",
      label_size: 12,
      headingtype: 2,
      col_size: 4,
      disable: false,
      iconText:
        formik.values.Strategy == "Fixed Price" ||
          (formik.values.FixedSM == "Single" &&
            formik.values.Strategy == "Multi_Conditional")
          ? text.firstTradeHigherRange
          : text.firstTradeHigherRange,
      hiding: false,
    },
    {
      name: "Group",
      label: "Unique Name",
      type: "OnlyCharacter",
      label_size: 12,
      col_size: 4,
      headingtype: 2,
      iconText: text.Unique_Name,
      disable: false,
      hiding: false,
    },
  ];

  const ExitRuleArr = [
    {
      name: "TStype",
      label: "Measurement Type",
      type: "select",
      options: [
        { label: "Percentage", value: "Percentage" },
        { label: "Point", value: "Point" },
      ],
      showWhen: (values) =>
        values.Strategy == "One Directional" ||
        values.Strategy == "Multi Directional" ||
        values.Strategy == "Multi_Conditional",
      label_size: 12,
      headingtype: 4,
      icon: text.measurementType,
      col_size: formik.values.FixedSM == "Multiple" ? 3 : 6,
      hiding: false,
      disable: false,
    },

    {
      name: "Slvalue",
      label:
        formik.values.Strategy == "Fixed Price" ||
          (formik.values.FixedSM == "Single" &&
            formik.values.Strategy == "Multi_Conditional")
          ? "Stoploss"
          : "Re-Entry",
      type: "text3",
      label_size: 12,
      col_size: formik.values.FixedSM == "Multiple" ? 3 : 6,
      headingtype: 3,
      disable: false,
      hiding: false,
    },

    {
      name: "Targetselection",
      label: "Target Type",
      type: "select",
      options: [
        { label: "Fixed Target", value: "Fixed Target" },
        { label: "Entry Wise Target", value: "Entry Wise Target" },
        { label: "Average Target", value: "Average Target" },
        { label: "Entry Wise SL", value: "Entry Wise SL" },
      ],
      showWhen: (values) =>
        values.FixedSM == "Multiple" && values.Strategy == "Multi_Conditional",
      label_size: 12,
      col_size:
        formik.values.FixedSM == "Single" || formik.values.FixedSM == "Multiple"
          ? 3
          : 4,
      headingtype: 4,
      disable: false,
      hiding: false,
      iconText: text.targetType,

    },

    {
      name: "FinalTarget",
      label: "Final Target Price",
      type: "text3",
      label_size: 12,
      showWhen: (values) =>
        formik.values.FixedSM == "Multiple" &&
        formik.values.Strategy == "Multi_Conditional" &&
        formik.values.Targetselection == "Entry Wise SL",
      col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
      headingtype: 3,
      disable: false,
      hiding: false,
    },

    {
      name: "Targetvalue",
      label:
        formik.values.FixedSM == "Single" &&
          formik.values.Strategy == "Multi_Conditional"
          ? "Target 1"
          : formik.values.Strategy == "Fixed Price"
            ? "Target Price"
            : formik.values.Strategy == "One Directional"
              ? "Fixed Target"
              : formik.values.Strategy == "Multi_Conditional" &&
                formik.values.FixedSM == "Multiple" &&
                formik.values.Targetselection == "Fixed Target"
                ? "Fixed Target"
                : "Booking Point",
      type: "text3",
      label_size: 12,
      col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
      headingtype: 3,
      disable: false,
      hiding: false,
      iconText: text.fixedTarget
    },
    {
      name: "tgp2",
      label: "Target 2",
      type: "text3",
      label_size: 12,
      col_size: 4,
      showWhen: (values) =>
        values.FixedSM == "Single" && values.Strategy == "Multi_Conditional",
      headingtype: 3,
      disable: false,
      hiding: false,
    },
    {
      name: "tgp3",
      label: "Target 3",
      type: "text3",
      label_size: 12,
      col_size: 4,
      showWhen: (values) =>
        values.FixedSM == "Single" && values.Strategy == "Multi_Conditional",
      headingtype: 3,
      disable: false,
      hiding: false,
    },


  ];
  const RiskManagementArr = [
    {
      name: "Quantity",
      label:
        formik.values.Exchange == "NFO" &&
          formik.values.FixedSM == "Single" &&
          formik.values.Strategy == "Multi_Conditional"
          ? "Lot 1"
          : formik.values.Exchange == "NSE" &&
            formik.values.FixedSM == "Single" &&
            formik.values.Strategy == "Multi_Conditional"
            ? "Quantity 1"
            : (formik.values.Exchange == "NFO" || formik.values.Exchange == "BFO")
              ? "Lot"
              : "Quantity",
      type: "text3",
      label_size: 12,
      // col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
      col_size: formik.values.FixedSM == "Multiple" ? 4 : 4,
      headingtype: 4,
      hiding: false,
      disable: false,
    },
    {
      name: "quantity2",
      label:
        (formik.values.Exchange == "NFO" &&
          formik.values.FixedSM == "Single" &&
          formik.values.Strategy == "Multi_Conditional" ) ||  formik.values.Exchange == "BFO"
          ? "Lot 2"
          : "Quantity 2",
      type: "text3",
      label_size: 12,
      showWhen: (values) =>
        values.FixedSM == "Single" && values.Strategy == "Multi_Conditional",
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
    },
    {
      name: "quantity3",
      label:
        (formik.values.Exchange == "NFO" &&
          formik.values.FixedSM == "Single" &&
          formik.values.Strategy == "Multi_Conditional") || formik.values.Exchange == "BFO"
          ? "Lot 3"
          : "Quantity 3",
      type: "text3",
      label_size: 12,
      showWhen: (values) =>
        values.FixedSM == "Single" && values.Strategy == "Multi_Conditional",
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
    },
    {
      name: "LowerRange",
      label: "Lower Range ",
      type: "text3",
      label_size: 12,
      col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
      headingtype: 4,
      showWhen: (values) =>
        values.Strategy == "Multi Directional" ||
        values.Strategy == "One Directional",
      disable: false,
      iconText: text.lowerRange,
      hiding: false,
    },
    {
      name: "HigherRange",
      label: "Higher Range ",
      type: "text3",
      label_size: 12,
      col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
      headingtype: 4,
      showWhen: (values) =>
        values.Strategy == "Multi Directional" ||
        values.Strategy == "One Directional",
      disable: false,
      iconText: text.higherRange,
      hiding: false,
    },
    {
      name: "RepeatationCount",
      label: "Repetition Count",
      type: "text3",
      label_size: 12,
      // col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
      col_size: 4,
      headingtype: 4,
      showWhen: (values) =>
        values.Strategy == "Multi_Conditional" && values.FixedSM == "Multiple",
      disable: false,
      hiding: false,
      iconText: text.repeatationCount,
    },
    {
      name: "HoldExit",
      label: "Hold/Exit",
      type: "select",
      options: [
        { label: "Hold", value: "Hold" },
        { label: "Exit", value: "Exit" },
      ],
      showWhen: (values) =>
        values.Strategy == "Multi Directional" ||
        values.Strategy == "One Directional" ||
        (values.Strategy == "Multi_Conditional" &&
          values.FixedSM == "Multiple"),
      label_size: 12,
      // col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
      iconText: text.holdOrExit,
    },
    {
      name: "TargetExit",
      label: "Continue after cycle exit",
      type: "select",
      options: [
        { label: "True", value: true },
        { label: "False", value: false },
      ],
      showWhen: (values) =>
        (values.FixedSM == "Multiple" || values.FixedSM == "Single") && values.Strategy == "Multi_Conditional" && values.Targetselection !== "Entry Wise SL",
      label_size: 12,
      // col_size: formik.values.FixedSM == "Single" ? 3 : 3,
      col_size: formik.values.TargetExit == "true" ? 4 : 6,
      headingtype: 4,
      disable: false,
      iconText: text.continueAfterCycleExit,
      hiding: false,
    },

    {
      name: "Trade_Count",
      label: "No of Cycle",
      type: "text3",
      label_size: 12,
      headingtype: 4,
      showWhen: (values) =>
        (values.FixedSM === "Single" && values.TargetExit == "true") ||
        (values.FixedSM == "Multiple" &&
          values.TargetExit == "true"),
      // col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
      col_size: 4,

      iconText: text.tradeCount,
      disable: false,
      hiding: false,
    },



    {
      name: "WorkingDay",
      label: "Working Day",
      type: "multiselect",
      options: [

        // { label: "Select All", value: "all" },
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
      col_size: formik.values.TargetExit == "true" || formik.values.FixedSM != "Multiple" ? 4 : 6,
      iconText: text.Increment_Type,
      hiding: false,
    },
    {
      name: "Profit",
      label: "Max Profit",
      type: "text3",
      label_size: 12,
      // col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
      col_size: 6,
      headingtype: 4,
      showWhen: (values) =>
        values.Strategy == "Multi_Conditional" && values.FixedSM == "Multiple",
      disable: false,
      hiding: false,
    },

    {
      name: "Loss",
      label: "Max Loss",
      type: "text3",
      label_size: 12,
      col_size: 6,
      headingtype: 4,
      showWhen: (values) =>
        values.Strategy == "Multi_Conditional" && values.FixedSM == "Multiple",
      disable: false,
      hiding: false,
    },


    {
      name: "stepup",
      label: "Step Up",
      type: "text3",
      label_size: 12,
      showWhen: (values) =>
        values.FixedSM == "Multiple" && values.Strategy == "Multi_Conditional",
      col_size: 4,
      headingtype: 4,
      disable: false,
      iconText: text.stepUp,
      hiding: false,
    },

    {
      name: "quantityselection",
      label: "Increment Type",
      type: "select",
      options: [
        { label: "Addition", value: "Addition" },
        { label: "Multiplication", value: "Multiplication" },
      ],
      showWhen: (values) =>
        values.FixedSM == "Multiple" && values.Strategy == "Multi_Conditional",
      label_size: 12,
      col_size: 4,
      headingtype: 4,
      disable: false,
      iconText: text.incrementType,
      hiding: false,
    },

    {
      name: "quantityvalue",
      label: "Increment Value",
      type: "text3",
      label_size: 12,
      showWhen: (values) =>
        values.FixedSM == "Multiple" && values.Strategy == "Multi_Conditional",
      col_size: 4,
      headingtype: 4,
      disable: false,
      iconText: text.incrementValue,
      hiding: false,
    },
  ];

  const TimeDurationArr = [
    {
      name: "EntryTime",
      label: "Entry Time",
      type: "timepiker",
      label_size: 12,
      col_size: 4,
      headingtype: 5,
      disable: false,
      hiding: false,
    },

    {
      name: "ExitTime",
      label: "Exit Time",
      type: "timepiker",
      label_size: 12,
      col_size: 4,
      headingtype: 5,
      disable: false,
      hiding: false,
    },

    {
      name: "ExitDay",
      label: "Exit Day",
      type: "select",
      options: [
        { label: "Intraday", value: "Intraday" },
        { label: "Delivery", value: "Delivery" },
      ],
      label_size: 12,
      col_size: 4,
      headingtype: 5,
      disable: false,
      hiding: false,
    },

    {
      name: "RollOver",
      label: "RollOver",
      type: "select",
      options: [
        { label: "True", value: true },
        { label: "False", value: false },
      ],
      label_size: 12,
      col_size: 4,
      headingtype: 4,
      showWhen: (values) =>
        ((values.Exchange == "MCX" && values.Instrument !== "OPTFUT") || (values.Exchange == "NFO" && values.Instrument !== "OPTIDX" && values.Instrument !== "OPTSTK")) &&

        values.ExitDay == "Delivery" &&
        values.Strategy == "Multi_Conditional" &&
        values.FixedSM == "Multiple",
      disable: false,
      hiding: false,
    },

    {
      name: "NumberOfDays",
      label: "No. of Days",
      type: "select",
      label_size: 12,
      options: [
        { label: "0", value: "0" },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" }
      ],
      showWhen: (values) => {
        const rollOverBoolean = values.RollOver === "true";
        return (
          rollOverBoolean &&
          values.Strategy == "Multi_Conditional" &&
          values.ExitDay == "Delivery" &&
          values.FixedSM == "Multiple"
        );
      },
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
    },

    {
      name: "RolloverTime",
      label: "RollOver Exit Time",
      type: "timepiker",
      label_size: 12,
      showWhen: (values) => {
        const rollOverBoolean = values.RollOver === "true" &&
          (values.Exchange == "NFO" && ((values.Instrument == "FUTIDX" || values.Instrument == "FUTSTK")) || (values.Exchange == "MCX" && values.Instrument == "FUTCOM"));
        return (
          rollOverBoolean &&
          values.Strategy == "Multi_Conditional" &&
          values.ExitDay == "Delivery" &&
          values.FixedSM == "Multiple"
        );
      },
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
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
      disable: false,
      hiding: false,
    },


    {
      name: "OrderType",
      label: "Order Type",
      type: "select",
      options: [
        { label: "Pending", value: "Pending" },
        { label: "Market", value: "Market" },
      ],
      showWhen: (values) =>
        values.FixedSM == "Multiple" &&
        values.Trade_Execution == "Live Trade" &&
        values.Strategy == "Multi_Conditional",

      label_size: 12,
      col_size: 4,
      headingtype: 4,
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
      col_size: 12,
      data: SymbolSelectionArr.filter(
        (item) => !item.showWhen || item.showWhen(formik.values)
      ),
      disable: false,
    },
    {
      name: "Heading",
      label: "Entry_Rule",
      type: "heading",
      hiding: false,
      label_size: 12,
      headingtype: 2,
      col_size: 12,
      data: EntryRuleArr.filter(
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
      label: "Risk_Management",
      type: "heading",
      hiding: false,
      label_size: 12,
      headingtype: 4,
      col_size: 12,
      data: RiskManagementArr.filter(
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

  const getSymbol = async () => {
    if (formik.values.Exchange) {
      const data = {
        Exchange: formik.values.Exchange,
        Instrument: formik.values.Instrument,
      };
      await Get_Symbol(data)
        .then((response) => {
          if (response.Status) {
            setSymbolData({
              loading: false,
              data: response.Symbol,
            });
          } else {
            setSymbolData({
              loading: false,
              data: [],
            });
          }
        })
        .catch((err) => {
          console.log("Error in fatching the Symbol", err);
        });
    }
  };

  useEffect(() => {
    getSymbol();
  }, [formik.values.Instrument, formik.values.Exchange]);

  const getStrikePrice = async () => {
    if (
      formik.values.Instrument &&
      formik.values.Exchange &&
      formik.values.Symbol
    ) {
      const data = {
        Exchange: formik.values.Exchange,
        Instrument: formik.values.Instrument,
        Symbol: formik.values.Symbol,
        Expiry: formik.values.expirydata1,
      };
      await Get_StrikePrice(data).then((response) => {
        if (response.Status) {
          setStricke({
            loading: false,
            data: response.Strike,
          });
        }
      });
    }
  };

  useEffect(() => {
    getStrikePrice();
  }, [formik.values.Instrument, formik.values.Exchange, formik.values.Symbol, formik.values.expirydata1]);

  const get_Exchange = async () => {
    await GetExchange()
      .then((response) => {
        if (response.Status) {
          setAllExchange(response.Exchange);
        } else {
          setAllExchange([]);
        }
      })
      .catch((err) => {
        console.log("Error to finding the Exchange value", err);
      });
  };

  useEffect(() => {
    get_Exchange();
  }, []);

  const getExpiry = async () => {
    if (formik.values.Symbol) {
      const data = {
        Exchange: formik.values.Exchange,
        Instrument:
          formik.values.Exchange == "NSE" ? "" : formik.values.Instrument,
        Symbol: formik.values.Exchange == "NSE" ? "" : formik.values.Symbol,
        Strike: formik.values.Exchange == "NSE" ? "" : formik.values.Strike,
      };

      await GET_EXPIRY_DATE(data)
        .then((response) => {
          if (response.Status) {
            setExpiryDate({
              loading: false,
              data: response["Expiry Date"],
            });
          } else {
            setExpiryDate({
              loading: false,
              data: [],
            });
          }
        })
        .catch((err) => {
          console.log("Error in finding the Expiry date", err);
        });
    }
  };

  let currentWebSocket = null;
  const showLivePrice = async (singleChannel, channel1) => {


    if (currentWebSocket && typeof currentWebSocket.close === "function") {
      currentWebSocket.close();
    }

    currentWebSocket = connectWebSocketForSingleChannel(singleChannel, (data) => {
  

      if (data.lp && data.tk && channel1 && channel1 === data.tk) {
      

        $(".LivePrice").html(data.lp);
      }
    });
  }

  const token = async () => {
    try {
      if (formik.values.Exchange && formik.values.Instrument && formik.values.Symbol && formik.values.expirydata1) {
        const res = await getToken({
          Exchange: formik.values.Exchange,
          Instrument: formik.values.Instrument,
          Symbol: formik.values.Symbol,
          OptionType: formik.values.Optiontype,
          Strike: formik.values.Strike || "",
          Expiry: formik.values.expirydata1 == "Monthly"
            ? getExpiryDate?.data?.[0]
            : formik.values.expirydata1 == "Next_Month"
              ? getExpiryDate?.data?.[1] : formik.values.expirydata1
        });
        const singleChannel = `${formik.values.Exchange}|${res.Token[0]}`
       
        setChannel(res.Token[0])
        showLivePrice(singleChannel, res.Token[0])

      }


    } catch (error) {
      console.error("Error fetching token:", error);

    }
  }
  useEffect(() => {
    getExpiry();
    token()
  }, [
    formik.values.Instrument,
    formik.values.Exchange,
    formik.values.Symbol,
    formik.values.Strike,
    formik.values.expirydata1
  ]);


  // const token = async () => {
  //   if (formik.values.Instrument) {
  //     const data = { 

  // useEffect(() => {
  //   token();
  // }, [
  //   formik.values.Instrument,
  //   formik.values.Exchange,
  //   formik.values.Symbol,
  //   formik.values.Strike,
  // ]);

  useEffect(() => {
    if (
      formik.values.Instrument == "FUTIDX" ||
      formik.values.Instrument == "FUTSTK"
    ) {
      formik.setFieldValue("Optiontype", "");
      formik.setFieldValue("Strike", "");
    }

    if (formik.values.Exchange == "NSE") {
      formik.setFieldValue("Instrument", "FUTIDX");
      formik.setFieldValue("expirydata1", "");
      formik.setFieldValue("Strike", "");
      formik.setFieldValue("Optiontype", "");
    }
  }, [formik.values.Instrument, formik.values.Exchange]);


  useEffect(() => {
    if (
      formik.values.ExitDay == "Intraday"
    ) {
      formik.setFieldValue("RollOver", false);
      formik.setFieldValue("NumberOfDays", "0");
      // formik.setFieldValue("Strike", "");
    }
  }, [formik.values.ExitDay]);

  useEffect(() => {
    if (formik.values.Exchange !== "MCX") {
      formik.setFieldValue("ExitTime", "15:14:00");
      formik.setFieldValue("EntryTime", "09:15:00");
      formik.setFieldValue("RolloverTime", "14:00:00");
    } else if (formik.values.Exchange === "MCX") {
      formik.setFieldValue("ExitTime", "23:25:00");
      formik.setFieldValue("EntryTime", "09:00:00");
      formik.setFieldValue("RolloverTime", "23:00:00");

    }
  }, [formik.values.Exchange]);




  function findNearestOption(options, livePrice) {
    if (!options || options.length === 0 || !livePrice) {
      return "";
    }
    return options.reduce((prev, curr) => {
      return (Math.abs(curr - livePrice) < Math.abs(prev - livePrice) ? curr : prev);
    });
  }


  const fetchInstrument = async () => {

    if (!formik.values.Exchange) {
      return;
    }

    const req = {
      Exchange: formik.values.Exchange,
    }
    const res = await GetInstrument(req);
    if (res.Status) {
      setAllInstrument(res["Instrument Type"]);
    } else {
      setAllInstrument([]);
    }
  };
  useEffect(() => {
    fetchInstrument();
  }, [formik.values.Exchange]);

  const fetchPrice = async () => {
    if (formik.values.Exchange && formik.values.Symbol) {
      const price = await GetLivePricefromSymbol(formik.values.Exchange, formik.values.Symbol);
      setLivePrice(price);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, [formik.values.Exchange, formik.values.Symbol]);


  useEffect(() => {
    if (getStricke.data && getStricke.data.length > 0 && livePrice) {
      formik.setFieldValue("Strike", findNearestOption(getStricke.data, livePrice));
    }
  }, [getStricke.data, livePrice]);


  useEffect(() => {
    formik.setFieldValue("Group", "");
    formik.setFieldValue("HigherRange", 0);
    formik.setFieldValue("LowerRange", 0);
    formik.setFieldValue("EntryRange", 0);
    formik.setFieldValue("EntryPrice", 0);
  }, [formik.values.Strategy]);

  useEffect(() => {
    formik.setFieldValue("expirydata1", "");
  }, [formik.values.Symbol]);

  const handleCheckPnl = async () => {




    const req = {
      CPrice: getCPrice,
      MainStrategy: location?.state?.data?.selectStrategyType,
      Username: userName,
      Strategy: formik?.values.Strategy,
      Exchange: formik?.values.Exchange,
      Instrument:
        formik.values.Exchange == "NSE" ? "" : formik.values.Instrument,
      Symbol: formik?.values.Symbol,
      Optiontype:
        formik.values.Instrument == "OPTIDX" ||
          formik.values.Instrument == "OPTSTK" ||
          (formik.values.Exchange === "MCX" &&
            formik.values.Instrument == "OPTFUT") ||
          formik.values.Exchange === "BFO"
          ? formik.values.Optiontype
          : "",
      Strike:
        formik.values.Instrument == "OPTIDX" ||
          formik.values.Instrument == "OPTSTK" ||
          (formik.values.Exchange === "MCX" &&
            formik.values.Instrument == "OPTFUT") ||
          (formik.values.Exchange === "BFO" &&
            formik.values.Instrument == "IO" || formik.values.Instrument == "SO")
          ? formik.values.Strike
          : 0,
      expirydata1:
        formik.values.expirydata1 == "Monthly"
          ? getExpiryDate?.data?.[0]
          : formik.values.expirydata1 == "Next_Month"
            ? getExpiryDate?.data?.[1]
            : formik.values.Exchange == "NSE"
              ? getExpiryDate?.data?.[0]
              : formik.values.expirydata1,
      MarginValue: Number(marginValue),
      TType: formik.values.TType == 0 ? "" : formik.values.TType,
      TStype:
        formik.values.Strategy == "One Directional" ||
          formik.values.Strategy == "Multi Directional" ||
          formik.values.Strategy == "Multi_Conditional"
          ? formik.values.TStype
          : "",
      Targetvalue: formik.values.Targetvalue,
      Slvalue: formik.values.Slvalue,
      HoldExit:
        formik.values.Strategy === "Multi Directional" ||
          formik.values.Strategy === "One Directional" ||
          formik.values.Strategy == "Multi_Conditional"
          ? formik.values.HoldExit
          : "",
      Quantity: formik.values.Quantity,
      Expirytype: "",
      FixedSM:
        formik.values.Strategy == "Multi_Conditional"
          ? formik.values.FixedSM
          : "Multiple",
      quantity2:
        formik.values.FixedSM == "Single" &&
          formik.values.Strategy == "Multi_Conditional"
          ? Number(formik.values.quantity2)
          : 0,
      quantity3:
        formik.values.FixedSM == "Single" &&
          formik.values.Strategy == "Multi_Conditional"
          ? Number(formik.values.quantity3)
          : 0,
      tgp2:
        formik.values.FixedSM == "Single" &&
          formik.values.Strategy == "Multi_Conditional"
          ? Number(formik.values.tgp2)
          : 0,
      tgp3:
        formik.values.FixedSM == "Single" &&
          formik.values.Strategy == "Multi_Conditional"
          ? Number(formik.values.tgp3)
          : 0,
      stepup:
        formik.values.FixedSM == "Multiple" &&
          formik.values.Strategy == "Multi_Conditional"
          ? Number(formik.values.stepup)
          : 0,
      quantityselection:
        formik.values.FixedSM == "Multiple" &&
          formik.values.Strategy == "Multi_Conditional"
          ? formik.values.quantityselection
          : "",
      quantityvalue:
        formik.values.FixedSM == "Multiple" &&
          formik.values.Strategy == "Multi_Conditional"
          ? Number(formik.values.quantityvalue)
          : "0",
      targetselection:
        formik.values.FixedSM == "Multiple" &&
          formik.values.Strategy == "Multi_Conditional"
          ? formik.values.Targetselection
          : "Single",
      RepeatationCount:
        formik.values.FixedSM == "Multiple" &&
          formik.values.Strategy == "Multi_Conditional"
          ? Number(formik.values.RepeatationCount)
          : 1,
    };


    await CheckPnLScalping(req)
      .then((response) => {
        if (response.Status) {
          setShowPnl(true);
          setOpenModel(true);
          setPnlData({
            InstrumentName: response.InstrumentName,
            LotSize: response.LotSize,
            MainSymbol: response.MainSymbol,
            Message: response.Message,
            Status: response.Status,
            Token: response.Token,
            TotalMargin: response.TotalMargin,
            TotalPnL: response.TotalPnL,
            TradingSymbol: response.TradingSymbol,
          });
        } else {
          setPnlData({
            InstrumentName: "",
            LotSize: "",
            MainSymbol: "",
            Message: "",
            Status: "",
            Token: "",
            TotalMargin: "",
            TotalPnL: "",
            TradingSymbol: "",
          });
        }
      })
      .catch((err) => {
        console.log("Error in fatching the Pnl", err);
      });
  };

  useEffect(() => {
    setShowPnl(false);
  }, [formik.values]);

  const checkModalCondition = async () => {

    const weekend = new Date().getDay();
    const currentDate = new Date();
    const currentTime =
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();

    let MarketTime = formik.values.Exchange === "MCX" ? "23:25:00" : "15:30:00"

    //   if (
    //   weekend == 6 ||
    //   weekend == 0 ||
    //   currentTime >= MarketTime ||
    //   currentTime <= "09:15:00"
    // ) {
    //   SweentAlertFun(
    //     "⚠️ Market is closed. Please try again during trading hours. ⏳"
    //   );
    //   return;
    // }

    const req = {
      Exchange: formik.values.Exchange,
      Symbol: formik.values.Symbol,
      Instrument: formik.values.Instrument,
      Strike: formik.values.Strike === "" ? "0" : formik.values.Strike,
      expirydata1:
        formik.values.expirydata1 === "Monthly"
          ? getExpiryDate?.data?.[0]
          : formik.values.expirydata1 === "Next_Month"
            ? getExpiryDate?.data?.[1]
            : formik.values.expirydata1,
    };


    const response = await CPrice(req);
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      return SweentAlertFun(Object.values(errors)[0])
    }

    if (response.Status) {
      setCPrice(response.CPrice)
    }
    else {
      setCPrice(0)
    }

    if (
      formik.values.Exchange === "NSE" ||
      (formik.values.Exchange === "NFO" &&
        formik.values.TType === "BUY" &&
        (formik.values.Instrument === "OPTIDX" ||
          formik.values.Instrument === "OPTSTK"))
    ) {
      handleCheckPnl();
    } else {
      setOpenModel1(true);
    }
  };

  return (

    <Content
      Page_title={"📌 Add Script - Scalping"}
      button_status={false}
      backbutton_status={false}
    >

      {formik.values.Exchange && formik.values.Instrument && formik.values.Symbol && formik.values.expirydata1 && <div className="AddScript_LivePrice card-text-Color"><div className="LivePriceContainer"><span> Live Price: </span> <span className="LivePrice ms-2">{ }</span></div></div>}
      <AddForm
        fields={fields.filter(
          (field) => !field.showWhen || field.showWhen(formik.values)
        )}
        // page_title="Add Script scalping"
        btn_name="Add"
        btn_name1="Cancel"

        formik={formik}
        btn_name1_route={"/user/dashboard"}
        btn_name1_onClick={() => {
          sessionStorage.setItem("redirectStrategyType", "Scalping");
          navigate("/user/dashboard");
        }}
        additional_field={
          <div>
            {![
              "CoveredCall",
              "CoveredPut",
              "LongCollar",
              "ShortCollar",
              "LongFourLegStretegy",
              "ShortFourLegStretegy",
            ].includes(formik.values.Strategy) &&
              formik.values?.FixedSM !== "Single" && (
                <button
                  type="button"
                  className={`addbtn `}
                  onClick={checkModalCondition}
                >
                  Check PnL
                </button>

              )}
          </div>
        }
      />

      <Modal
        show={openModel1}
        onHide={() => setOpenModel1(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Margin Value
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="input-block mb-3">

                  {getCPrice == 0 &&
                    <>
                      <label
                        className="form-label"
                        style={{ fontWeight: "bold", color: "#fff" }}
                      >
                        Enter Price
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={priceValue}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*\.?\d*$/.test(value)) {
                            setPriceValue(value);
                            setError("");
                          } else {
                            setError("Only numbers are allowed");
                          }
                        }}
                      />
                    </>
                  }


                  <label
                    className="form-label"
                    style={{ fontWeight: "bold", color: "#fff" }}
                  >
                    Margin Value
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={marginValue}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        // ✅ Only numbers allowed
                        setMarginValue(value);
                        setError(""); // Reset error if valid
                      } else {
                        setError("Only numbers are allowed");
                      }
                    }}
                  />
                  {error && <p className="text-danger">{error}</p>}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModel1(false)}>Close</Button>
          <Button
            onClick={() => {
              if (!marginValue.trim()) {
                setError("Margin Value required");
                return;
              }

              handleCheckPnl();
              setOpenModel1(false);
              setMarginValue("");
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={openModel}
        onHide={() => setOpenModel(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            PnL Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {PnlData ? (
            [
              { label: "Token", value: PnlData.Token },
              { label: "Margin", value: PnlData.TotalMargin },
              {
                label: "Maximum Loss",
                value: PnlData.TotalPnL == 0 ? "0" : PnlData.TotalPnL,
              },
              { label: "Symbol", value: PnlData.TradingSymbol },
            ].map(({ label, value }, index) => (
              <div key={index} className="d-flex align-items-center py-1">
                <label
                  className="fw-bold mb-0 me-2 card-text-Color"
                  style={{ fontSize: "20px", minWidth: "150px" }}
                >
                  {label}:
                </label>
                <span
                  className="card-text-Color mb-0"
                  style={{ fontSize: "20px", fontWeight: "500" }}
                >
                  {value || "N/A"}
                </span>
              </div>
            ))
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
    </Content>

  );
};
export default AddClient;
