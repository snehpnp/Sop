import { useLocation, useNavigate } from "react-router-dom";
import AddForm from "../../../ExtraComponent/FormData2";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  GET_EXPIRY_DATE,
  Get_StrikePrice,
  Get_Symbol,
  Get_Pattern_Time_Frame,
  Get_Pattern_Charting,
  Get_Pattern_Name,
  GetExchange,
} from "../../CommonAPI/Admin";
import { AddScript, getToken } from "../../CommonAPI/User";
import { text } from "../../../ExtraComponent/IconTexts";
import Content from "../../../ExtraComponent/Content";
import { connectWebSocketForSingleChannel } from "../UserDashboard/LivePriceForSingleChannel";
import $ from "jquery";
import { GetInstrument } from "../../CommonAPI/Common";

const AddClient = () => {
  const location = useLocation();
  const userName = localStorage.getItem("name");
  const getPlanname = localStorage.getItem("Planname");
  const navigate = useNavigate();
  const [getSymbolData, setSymbolData] = useState({ loading: true, data: [] });
  const [getAllExchange, setAllExchange] = useState([]);
  const [getStricke, setStricke] = useState({ loading: true, data: [] });
  const [getTimeFrame, setTimeFrame] = useState({ loading: true, data: [] });
  const [getExpiryDate, setExpiryDate] = useState({ loading: true, data: [] });
  const [channel, setChannel] = useState([]);
  const [getChartPattern, setChartPattern] = useState({
    loading: true,
    data: [],
  });
  const [getPattern, setPattern] = useState({ loading: true, data: [] });
  const [allInstrument, setAllInstrument] = useState([]);


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
    const dataWithoutLastItem = location?.state?.scriptType?.data.slice(0, -1);
    const foundItem = dataWithoutLastItem.find((item) => {
      return item.Pattern.includes(stg);
    });
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

  const formik = useFormik({
    initialValues: {
      MainStrategy: location.state.data.selectStrategyType,
      Username: location.state.data.selectGroup,
      Strategy: "",
      ETPattern: "",
      Timeframe: "",
      Exchange: "",
      Symbol: "",
      Instrument: "",
      Strike: "",
      Optiontype: "",
      Targetvalue: 1.0,
      Slvalue: 1.0,
      TStype: "",
      Quantity: 1,
      LowerRange: 0.0,
      HigherRange: 0.0,
      HoldExit: "",
      EntryPrice: 0.0,
      EntryRange: 0.0,
      EntryTime: "09:15:00",
      ExitTime: "15:25:00",
      ExitDay: "",
      FixedSM: "",
      TType: "",
      serendate: "",
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
      WorkingDay: [],
    },

    validate: (values) => {
      let errors = {};

      const maxTime = "15:29:59";
      const minTime = "09:15:00";
      const mcxMaxTime = "23:29:59";
      const mcxMinTime = "08:59:59";

      if (!values.Exchange) {
        errors.Exchange = "Please Select Exchange Type.";
      }
      if (!values.Instrument && values.Exchange == "NFO") {
        errors.Instrument = "Please Enter Instrument Type.";
      }
      if (!values.Trade_Execution || values.Trade_Execution == 0) {
        errors.Trade_Execution = "Please Select Trade Execution.";
      }
      if (!values.Trade_Count || values.Trade_Count == 0) {
        errors.Trade_Count = "Please Enter Trade Count.";
      }
      if (!values.Symbol) {
        errors.Symbol = "Please Enter Symbol Type.";
      }
      if (
        !values.Optiontype &&
        (values.Instrument == "OPTIDX" || values.Instrument == "OPTSTK") &&
        values.Exchange == "NFO"
      ) {
        errors.Optiontype = "Enter Option Type.";
      }
      if (
        !values.Strike &&
        (values.Instrument == "OPTIDX" || values.Instrument == "OPTSTK") &&
        values.Exchange == "NFO"
      ) {
        errors.Strike = "Enter Strike Price.";
      }
      if (!values.expirydata1 && values.Exchange == "NFO") {
        errors.expirydata1 = "Enter Expiry Date.";
      }
      if (!values.Strategy) {
        errors.Strategy = "Please Select Pattern Type.";
      }
      if (!values.Timeframe) {
        errors.Timeframe = "Please Enter Timeframe Type.";
      }
      if (!values.ETPattern) {
        errors.ETPattern = "Please Select Pattern Name.";
      }

      if (!values.TStype) {
        errors.TStype = "Please Enter Measurement Type.";
      }
      if (
        !values.Slvalue ||
        values.Slvalue == 0 ||
        Number(values.Slvalue) < 0
      ) {
        errors.Slvalue =
          values.Slvalue == 0
            ? "Stoploss can not be Zero"
            : Number(values.Slvalue) < 0
              ? "Stoploss can not be Negative"
              : "Please Enter Stoploss Value.";
      }
      if (
        !values.Targetvalue ||
        values.Targetvalue == 0 ||
        Number(values.Targetvalue) < 0
      ) {
        errors.Targetvalue =
          values.Targetvalue == 0
            ? "Target can not be Zero"
            : Number(values.Targetvalue) < 0
              ? "Target can not be Negative"
              : "Please Enter Target Value.";
      }
      if (!values.TType) {
        errors.TType = "Please Enter Transaction Type.";
      }
      if (!values.Quantity) {
        errors.Quantity =
          formik.values.Exchange == "NFO"
            ? "Please Enter Lot Value"
            : "Please Enter Quantity Value";
      }
      if (!values.ExitDay) {
        errors.ExitDay = "Please Select Exit Day.";
      }
      if (values.EntryTime == "") {
        errors.EntryTime = "Please Select Entry Time.";
      } else if (
        values.EntryTime < (values.Exchange === "MCX" ? mcxMinTime : minTime)
      ) {
        errors.EntryTime = `Entry Time Must be After ${values.Exchange === "MCX" ? mcxMinTime : minTime
          }.`;
      } else if (
        values.EntryTime > (values.Exchange === "MCX" ? mcxMaxTime : maxTime)
      ) {
        errors.EntryTime = `Entry Time Must be Before ${values.Exchange === "MCX" ? mcxMaxTime : maxTime
          }.`;
      }

      if (values.ExitTime == "") {
        errors.ExitTime = "Please Select Exit Time.";
      } else if (
        values.ExitTime < (values.Exchange === "MCX" ? mcxMinTime : minTime)
      ) {
        errors.ExitTime = `Exit Time Must be After ${values.Exchange === "MCX" ? mcxMinTime : minTime
          }.`;
      } else if (
        values.ExitTime > (values.Exchange === "MCX" ? mcxMaxTime : maxTime)
      ) {
        errors.ExitTime = `Exit Time Must be Before ${values.Exchange === "MCX" ? mcxMaxTime : maxTime
          }.`;
      }

      if (
        values.EntryTime &&
        values.ExitTime &&
        values.EntryTime >= values.ExitTime
      ) {
        errors.ExitTime = "Exit Time should be greater than Entry Time.";
      }

      if (!values.WorkingDay || values.WorkingDay.length === 0) {
        errors.WorkingDay = "Please select at least one Working Day.";
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

      // ScrollToViewFirstError(errors);
      return errors;
    },

    onSubmit: async (values) => {
      const req = {
        MainStrategy: location.state.data.selectStrategyType,
        Username: userName,
        Strategy: values.Strategy,
        ETPattern: values.ETPattern,
        Timeframe: values.Timeframe,
        Exchange: values.Exchange,
        Symbol: values.Symbol,
        Instrument: values.Instrument,
        Strike: values.Strike,
        Optiontype:
          values.Instrument == "OPTIDX" || values.Instrument == "OPTSTK"
            ? values.Optiontype
            : "",
        Targetvalue: parseFloat(values.Targetvalue),
        Slvalue: parseFloat(values.Slvalue),
        TStype: values.TStype,
        Quantity: values.Quantity,
        LowerRange: 0.0,
        HigherRange: 0.0,
        HoldExit: "",
        EntryPrice: 0.0,
        EntryRange: 0.0,
        EntryTime: values.EntryTime,
        ExitTime: values.ExitTime,
        ExitDay: values.ExitDay,
        TradeCount: Number(values.Trade_Count),
        TradeExecution: values.Trade_Execution,
        FixedSM: "",
        TType: values.TType,
        serendate: getEndData(values.Strategy),
        expirydata1:
          values.expirydata1 == "Monthly"
            ? getExpiryDate?.data?.[0]
            : values.expirydata1 == "Next_Month"
              ? getExpiryDate?.data?.[1]
              : values.Exchange == "NSE"
                ? getExpiryDate?.data?.[0]
                : values.expirydata1,
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
        WorkingDay: values?.WorkingDay?.map((item) => item?.value || item),
        Profit: 0.0,
        Loss: 0.0,
        quantity2: 0,
        quantity3: 0,
        quantityselection: "",
        quantityvalue: 0,
        Planname: getPlanname,
        stepup: 0,
        tgp2: 0,
        tgp3: 0,
        stretegytag: values.Strategy,
      };
      if (values.EntryTime >= values.ExitTime) {
        return SweentAlertFun("Exit Time should be greater than Entry Time");
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
            sessionStorage.setItem("redirectStrategyType", "Pattern");

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

  // Symbol Break
  const extractDetails = (inputString) => {
    const regex = /([PC])(?!.*[PC])(\d+)/;
    const match = inputString.match(regex);
    if (match) {
      const number = match[2];
      const optionType = match[1];
      const type = optionType == "C" ? "CE" : "PE";
      return { number, type };
    } else {
      return null;
    }
  };

  const result = extractDetails(location.state.data.Symbol);

  useEffect(() => {
    if (formik.values.Exchange !== "MCX") {
      formik.setFieldValue("ExitTime", "15:14:00");
      formik.setFieldValue("EntryTime", "09:15:00");
    } else if (formik.values.Exchange === "MCX") {
      formik.setFieldValue("ExitTime", "23:25:00");
      formik.setFieldValue("EntryTime", "09:00:00");
    }
  }, [formik.values.Exchange]);


  useEffect(() => {
    formik.setFieldValue("Exchange", location.state.data.Exchange);
    formik.setFieldValue("Instrument", location.state.data["Instrument Type"]);
    formik.setFieldValue("Symbol", location.state.data.MainSymbol);
    formik.setFieldValue("Strategy", location.state.data.TradePattern);
    formik.setFieldValue("Timeframe", location.state.data.TimeFrame);
    formik.setFieldValue("ETPattern", location.state.data.Pattern);
    formik.setFieldValue("TStype", location.state.data.TStype);
    formik.setFieldValue("Slvalue", location.state.data["SL value"]);
    formik.setFieldValue("Targetvalue", location.state.data["Target value"]);
    formik.setFieldValue("TType", location.state.data.TType);
    formik.setFieldValue("Quantity", location.state.data.Quantity);
    formik.setFieldValue("ExitDay", location.state.data.ExitDay);
    formik.setFieldValue("EntryTime", location.state.data.EntryTime);
    formik.setFieldValue("ExitTime", location.state.data.ExitTime);
    formik.setFieldValue("Trade_Execution", location.state.data.TradeExecution);
    formik.setFieldValue("Trade_Count", location.state.data.TradeCount || 1);
    formik.setFieldValue("expirydata1", location.state.data["Expiry Date"]);
    formik.setFieldValue("Optiontype", result ? result.type : "");
    formik.setFieldValue("Strike", result ? result.number : "");
    formik.setFieldValue("WorkingDay", location.state.data.WorkingDay || []);
  }, []);

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

  const SymbolSelectionArr = [
    {
      name: "Exchange",
      label: "Exchange",
      type: "select",
      options:
        getAllExchange &&
        getAllExchange.map((item) => ({
          label: item,
          value: item,
        })),
      hiding: false,
      label_size: 12,
      headingtype: 1,
      disable: true,
      col_size:
        formik.values.Exchange == "NFO" &&
          (formik.values.Instrument == "FUTIDX" ||
            formik.values.Instrument == "FUTSTK")
          ? 3
          : formik.values.Exchange == "NFO" &&
            (formik.values.Instrument == "OPTIDX" ||
              formik.values.Instrument == "OPTSTK")
            ? 4
            : 6,
    },
    {
      name: "Instrument",
      label: "Instrument",
      type: "select",
      options: allInstrument && allInstrument.map((item) => ({
        label: item,
        value: item,
      })),
      showWhen: (values) =>
        values.Exchange == "NFO" ||
        values.Exchange == "CDS" ||
        values.Exchange == "MCX",
      hiding: false,
      label_size: 12,
      headingtype: 1,
      disable: true,
      col_size:
        formik.values.Exchange == "NFO" &&
          (formik.values.Instrument == "FUTIDX" ||
            formik.values.Instrument == "FUTSTK")
          ? 3
          : formik.values.Exchange == "NFO" &&
            (formik.values.Instrument == "OPTIDX" ||
              formik.values.Instrument == "OPTSTK")
            ? 4
            : 6,
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
        values.Exchange === "NSE" ||
        values.Exchange === "CDS" ||
        values.Exchange === "MCX",
      label_size: 12,
      headingtype: 1,

      hiding: false,
      col_size:
        formik.values.Exchange == "NFO" &&
          (formik.values.Instrument == "FUTIDX" ||
            formik.values.Instrument == "FUTSTK")
          ? 3
          : formik.values.Exchange == "NFO" &&
            (formik.values.Instrument == "OPTIDX" ||
              formik.values.Instrument == "OPTSTK")
            ? 4
            : 6,
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
      showWhen: (values) =>
        values.Instrument == "OPTIDX" || values.Instrument == "OPTSTK",
      label_size: 12,
      headingtype: 1,
      hiding: false,
      col_size: 4,
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
        values.Instrument == "OPTIDX" || values.Instrument == "OPTSTK",
      label_size: 12,
      headingtype: 1,
      col_size: 4,
      hiding: false,
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
        values.Exchange === "CDS" ||
        values.Exchange === "MCX",
      label_size: 12,
      headingtype: 1,
      hiding: false,
      col_size:
        formik.values.Exchange == "NFO" &&
          (formik.values.Instrument == "FUTIDX" ||
            formik.values.Instrument == "FUTSTK")
          ? 3
          : formik.values.Exchange == "NFO" &&
            (formik.values.Instrument == "OPTIDX" ||
              formik.values.Instrument == "OPTSTK")
            ? 4
            : 4,
      disable: false,
    },
  ];

  const EntryRuleArr = [
    {
      name: "Timeframe",
      label: "Time Frame",
      type: "select",
      options:
        getTimeFrame &&
        getTimeFrame.data.map((item) => ({
          label: item,
          value: item,
        })),
      label_size: 12,
      headingtype: 2,
      hiding: false,
      col_size: 3,
      disable: false,
    },
    {
      name: "Strategy",
      label: "Pattern Type",
      type: "select",
      options: location.state.scriptType.data[
        location.state.scriptType.len
      ].CombinePattern.map((item) => ({
        label:
          item == "ChartingPattern"
            ? "Charting Pattern"
            : item == "CandlestickPattern"
              ? "Candlestick Pattern"
              : item,
        value: item,
      })),
      label_size: 12,
      hiding: false,
      col_size: 3,
      headingtype: 2,
      disable: false,
    },
    {
      name: "ETPattern",
      label: "Pattern Name",
      type: "select",
      options:
        formik.values.Strategy == "ChartingPattern"
          ? getChartPattern.data &&
          getChartPattern.data.map((item) => ({
            label: item,
            value: item,
          }))
          : getPattern.data &&
          getPattern.data.map((item) => ({
            label: item,
            value: item,
          })),
      label_size: 12,
      hiding: false,
      headingtype: 2,
      col_size: 3,
      disable: false,
    },
    {
      name: "TType",
      label: "Transaction Type",
      type: "select",
      options: [
        { label: "BUY", value: "BUY" },
        { label: "SELL", value: "SELL" },
      ],
      label_size: 12,
      headingtype: 2,
      hiding: false,
      col_size: 3,
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
        { label: "Percantage", value: "Percantage" },
      ],

      label_size: 12,
      hiding: false,
      headingtype: 4,
      col_size: 4,
      disable: false,
      iconText: text.MeasurementType
    },

    {
      name: "Targetvalue",
      label: "Target",
      type: "text3",
      label_size: 12,
      hiding: false,
      headingtype: 3,
      col_size: 4,
      disable: false,
    },
    {
      name: "Slvalue",
      label: "Stoploss",
      type: "text3",
      label_size: 12,
      headingtype: 3,
      hiding: false,
      col_size: 4,
      disable: false,
    },
  ];
  const RiskManagementArr = [
    {
      name: "Quantity",
      label: formik.values.Exchange == "NFO" ? "Lot" : "Quantity",
      type: "text3",

      label_size: 12,
      hiding: false,
      col_size: 6,
      headingtype: 4,
      disable: false,
    },

    {
      name: "Trade_Count",
      label: "Trade Count",
      type: "text3",
      label_size: 12,
      col_size: 6,
      disable: false,
      hiding: false,
      iconText: text.TradeCountPattern

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
      col_size: 4,
      headingtype: 4,
      disable: false,
      hiding: false,
       
    },
    {
      name: "Profit",
      label: " Max Profit",
      type: "text3",
      label_size: 12,
      // col_size: formik.values.FixedSM == "Multiple" ? 3 : 4,
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

  const TimeArr = [
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
      label_size: 12,
      hiding: false,
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
      data: EntryRuleArr.filter(
        (item) => !item.showWhen || item.showWhen(formik.values)
      ),
      headingtype: 2,
      col_size: 12,
      disable: false,
    },
    {
      name: "Heading",
      label: "Risk_Management",
      type: "heading",
      hiding: false,
      label_size: 12,
      data: RiskManagementArr.filter(
        (item) => !item.showWhen || item.showWhen(formik.values)
      ),
      headingtype: 4,
      col_size: 12,
      disable: false,
    },
    {
      name: "Heading",
      label: "Exit_Rule",
      type: "heading",
      hiding: false,
      label_size: 12,
      data: ExitRuleArr.filter(
        (item) => !item.showWhen || item.showWhen(formik.values)
      ),
      headingtype: 3,
      headingtype: 3,
      col_size: 12,
      disable: false,
    },
    {
      name: "Heading",
      label: "Time_Duration",
      type: "heading",
      hiding: false,
      label_size: 12,
      data: TimeArr.filter(
        (item) => !item.showWhen || item.showWhen(formik.values)
      ),
      col_size: 12,
      headingtype: 5,
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
  }, [formik.values.Instrument, formik.values.Exchange, formik.values.Symbol]);


  const fetchInstrument = async () => {
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

  useEffect(() => {
    getExpiry();
  }, [
    formik.values.Instrument,
    formik.values.Exchange,
    formik.values.Symbol,
    formik.values.Strike,
  ]);

  const GetPatternTimeFrame = async () => {
    await Get_Pattern_Time_Frame()
      .then((response) => {
        setTimeFrame({
          loading: false,
          data: response,
        });
      })
      .catch((err) => {
        console.log("Error in finding the time frame", err);
      });
  };

  const GetPatternName = async () => {
    await Get_Pattern_Name()
      .then((response) => {
        if (response.Status) {
          setPattern({
            loading: false,
            data: response.PatternName,
          });
        } else {
          setPattern({
            loading: false,
            data: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the pattern", err);
      });
  };

  const GetPatternCharting = async () => {
    await Get_Pattern_Charting().then((response) => {
      if (response.Status) {
        setChartPattern({
          loading: false,
          data: response.PatternName,
        });
      } else {
        setChartPattern({
          loading: false,
          data: [],
        });
      }
    });
  };

  useEffect(() => {
    GetPatternTimeFrame();
    GetPatternName();
    GetPatternCharting();
  }, []);

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
          Strike: formik.values.Strike,
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


  useEffect(() => {
    if (
      formik.values.Symbol &&
      formik.values.Symbol !== location.state.data.MainSymbol
    ) {
      formik.setFieldValue("expirydata1", "");
      formik.setFieldValue("Optiontype", "");
      formik.setFieldValue("Strike", "");
    }
    if (
      formik.values.Strategy &&
      formik.values.Strategy !== location.state.data.TradePattern
    ) {
      formik.setFieldValue("ETPattern", "");
    }
    if (
      formik.values.Instrument == "FUTIDX" ||
      formik.values.Instrument == "FUTSTK"
    ) {
      formik.setFieldValue("Optiontype", "");
      formik.setFieldValue("Strike", "");
    }
    if (formik.values.Exchange == "NSE") {
      formik.setFieldValue("Instrument", "");
    }
  }, [
    formik.values.Instrument,
    formik.values.Exchange,
    formik.values.Symbol,
    formik.values.Strategy,
  ]);

  return (
    <>
      <Content
        Page_title={"📌 Add Script - Pattern Script"}
        button_status={false}
        backbutton_status={false}
      >


        {formik.values.Exchange && formik.values.Instrument && formik.values.Symbol && formik.values.expirydata1 && <div className="AddScript_LivePrice card-text-Color"><div className="LivePriceContainer"><span> Live Price:  </span> <span className="LivePrice ms-2">{ }</span></div></div>}

        <AddForm
          fields={fields.filter(
            (field) => !field.showWhen || field.showWhen(formik.values)
          )}
          // page_title="Add Script pattern"
          page_title={`Add Script - Pattern , Group Name : ${location.state.data.Username}`}
          btn_name="Add"
          btn_name1="Cancel"
          formik={formik}
          btn_name1_route={"/user/dashboard"}

        />
      </Content>
    </>
  );
};
export default AddClient;
