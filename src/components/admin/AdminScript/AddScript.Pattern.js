import { useLocation, useNavigate } from "react-router-dom"
import AddForm from "../../../ExtraComponent/FormData2";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { AddAdminScript, GET_EXPIRY_DATE, Get_StrikePrice, Get_Symbol, Get_Pattern_Time_Frame, Get_Pattern_Charting, Get_Pattern_Name, GetExchange, Add_Group } from '../../CommonAPI/Admin'
import { text } from "../../../ExtraComponent/IconTexts";
import Content from "../../../ExtraComponent/Content";
import { getPattenNameByMarketWise } from "../../CommonAPI/User";
import { GetInstrument } from "../../CommonAPI/Common";

const AddClient = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [getSymbolData, setSymbolData] = useState({ loading: true, data: [] })
    const [getAllExchange, setAllExchange] = useState([])
    const [getStricke, setStricke] = useState({ loading: true, data: [] })
    const [getTimeFrame, setTimeFrame] = useState({ loading: true, data: [] })
    const [getExpiryDate, setExpiryDate] = useState({ loading: true, data: [] })
    const [getChartPattern, setChartPattern] = useState({ loading: true, data: [] })
    const [getPattern, setPattern] = useState({ loading: true, data: [] })
    const [patternOptionMarketWise, setPatternOptionMarketWise] = useState([])
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
            timerProgressBar: true
        });

    }

    const ScrollToViewFirstError = (newErrors) => {
        if (Object.keys(newErrors).length !== 0) {
            const errorField = Object.keys(newErrors)[0];

            const errorElement = document.getElementById(errorField);
            if (errorElement) {
                const elementPosition = errorElement.getBoundingClientRect().top + window.pageYOffset;

                const offset = 100;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });
            }
        }
    }
 
    const formik = useFormik({
        initialValues: {
            MainStrategy: location.state?.gropData?.StrategyType,
            Username: location.state?.groupData?.GroupName,
            Strategy: "",
            ETPattern: "",
            Timeframe: "",
            Exchange: "",
            Symbol: "",
            Instrument: "FUTIDX",
            Strike: "",
            Optiontype: "",
            Targetvalue: 1.0,
            Slvalue: 1.00,
            TStype: "",
            Quantity: 1,
            LowerRange: 0.0,
            HigherRange: 0.0,
            HoldExit: "",
            EntryPrice: 0.0,
            EntryRange: 0.0,
            EntryTime: "",
            ExitTime: "",
            ExitDay: "",
            FixedSM: "",
            TType: "",
            serendate: "2023-10-25",
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
            if (!values.Symbol) {
                errors.Symbol = "Please Enter Symbol Type.";
            }
            if (!values.Optiontype && (values.Instrument == "OPTIDX" || values.Instrument == "OPTSTK") && values.Exchange == "NFO") {
                errors.Optiontype = "Enter Option Type.";
            }
            if (!values.Strike && (values.Instrument == "OPTIDX" || values.Instrument == "OPTSTK") && values.Exchange == "NFO") {
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
            if (!values.Slvalue || values.Slvalue == 0 || Number(values.Slvalue) < 0) {
                errors.Slvalue = values.Slvalue == 0 ? "Stoploss can not be Zero" : Number(values.Slvalue) < 0 ? "Stoploss can not be Negative" : "Please Enter Stoploss Value.";
            }
            if (!values.Targetvalue || values.Targetvalue == 0 || Number(values.Targetvalue) < 0) {
                errors.Targetvalue = values.Targetvalue == 0 ? "Target can not be Zero" : Number(values.Targetvalue) < 0 ? "Target can not be Negative" : "Please Enter Target Value.";
            }
            if (!values.TType) {
                errors.TType = "Please Enter Transaction Type.";
            }
            if (!values.Quantity) {
                errors.Quantity = formik.values.Exchange == "NFO" ? "Please Enter Lot Value" : "Please Enter Quantity Value";
            }
            if (!values.ExitDay) {
                errors.ExitDay = "Please Select Exit Day.";
            }
            if (!values.ExitTime) {
                errors.ExitTime = "Please Select Exit Time.";
            } else if (values.ExitTime > (values.Exchange === "MCX" ? mcxMaxTime : maxTime)) {
                errors.ExitTime = `Exit Time Must be Before ${values.Exchange === "MCX" ? "23:29:59" : "15:29:59"}.`;
            }

            if (!values.EntryTime) {
                errors.EntryTime = "Please Select Entry Time.";
            } else if (values.EntryTime < (values.Exchange === "MCX" ? mcxMinTime : minTime)) {
                errors.EntryTime = `Entry Time Must be After ${values.Exchange === "MCX" ? "09:00:00" : "09:15:00"}.`;
            }

            if (!values.TStype && values.Strategy != 'Fixed Price') {
                errors.TStype = "Please Select Measurement Type.";
            }
            // ScrollToViewFirstError(errors)

            return errors;
        },


        onSubmit: async (values) => {
            const req = {
                MainStrategy: location.state.groupData.StrategyType,
                Username: location.state.groupData.GroupName,
                Strategy: values.Strategy,
                ETPattern: values.ETPattern,
                Timeframe: values.Timeframe,
                Exchange: values.Exchange,
                Symbol: values.Symbol,
                Instrument: values.Instrument,
                Strike: values.Strike,
                Optiontype: values.Instrument == "OPTIDX" || values.Instrument == "OPTSTK" ? values.Optiontype : "",
                Targetvalue: values.Targetvalue,
                Slvalue: values.Slvalue,
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
                FixedSM: "",
                TType: values.TType,
                // expirydata1: values.Exchange == "NSE" ? "-" : values.expirydata1,
                expirydata1:
                    values.expirydata1 === "Monthly"
                        ? getExpiryDate?.data?.[0]
                        : values.expirydata1 === "Next_Month"
                            ? getExpiryDate?.data?.[1]
                            : values.expirydata1 || "-", // Ensure a fallback value is set

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
            }
            if (values.EntryTime >= values.ExitTime) {
                return SweentAlertFun("Exit Time should be greater than Entry Time")
            }

            try { 
                const groupResponse = await Add_Group(location?.state?.groupData);
                if (groupResponse.Status) {
                    try {
                        const scriptResponse = await AddAdminScript(req);
                        if (scriptResponse.Status) {
                            Swal.fire({
                                title: "Script Added!",
                                text: scriptResponse.message,
                                icon: "success",
                                timer: 1500,
                                timerProgressBar: true,
                            });
                            setTimeout(() => {
                                navigate('/admin/strategygroup');
                            }, 1500);
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: scriptResponse.message,
                                icon: "error",
                                timer: 1500,
                                timerProgressBar: true,
                            });
                        }
                    } catch (err) {
                        console.error("Error in adding new Script:", err);
                    }
                } else {
                    Swal.fire({
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: "Error",
                        text: groupResponse.message,
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true,
                    });
                }
            } catch (err) {
                Swal.fire({
                    backdrop: "#121010ba",
                    confirmButtonColor: "#1ccc8a",
                    title: "Error",
                    text: "Group creation error!",
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true,
                });
            }
        },
    });

    useEffect(() => {
        if (formik.values.Exchange !== 'MCX') {
            formik.setFieldValue('ExitTime', '15:14:00');
            formik.setFieldValue('EntryTime', '09:15:00');
        } else if (formik.values.Exchange === 'MCX') {
            formik.setFieldValue('ExitTime', '23:25:00');
            formik.setFieldValue('EntryTime', '09:00:00');
        }


    }, [formik.values.Exchange]);

    const fetchPatternName = async () => {
        if (formik.values.Marketwise !== "All") {
            const res = await getPattenNameByMarketWise(formik.values.Marketwise);

            setPatternOptionMarketWise(res[formik.values.Marketwise] || []);

        }
    }


    useEffect(() => {
        fetchPatternName()
    }, [formik.values.Marketwise])

    useEffect(() => {
        formik.setFieldValue('Strategy', "CandlestickPattern")
        formik.setFieldValue('Exchange', "NFO")
        formik.setFieldValue('Instrument', "OPTFUT")
        formik.setFieldValue('Timeframe', "1M")
        formik.setFieldValue('EntryTime', "09:15:00")
        formik.setFieldValue('ExitTime', "15:25:00")
        formik.setFieldValue('Optiontype', "CE")
        formik.setFieldValue('TStype', "Point")
        formik.setFieldValue('ExitDay', "Intraday")
        formik.setFieldValue('TType', "BUY")
        formik.setFieldValue('Instrument', "FUTIDX")
    }, [])

    const get_Exchange = async () => {
        await GetExchange()
            .then((response) => {
                if (response.Status) {
                    setAllExchange(response.Exchange)
                }
                else {
                    setAllExchange([])
                }
            })
            .catch((err) => {
                console.log("Error to finding the Exchange value", err)

            })
    }

    useEffect(() => {
        get_Exchange()
    }, [])


    const SymbolSelectionArr = [
        {
            name: "Exchange",
            label: "Exchange",
            type: "select",
            options: getAllExchange && getAllExchange.map((item) => ({
                label: item,
                value: item,
            })),
            hiding: false,
            label_size: 12,
            headingtype: 1,

            col_size: formik.values.Exchange == "NFO" && (formik.values.Instrument == 'FUTIDX' || formik.values.Instrument == 'FUTSTK') ? 3 : formik.values.Exchange == "NFO" && (formik.values.Instrument == 'OPTIDX' || formik.values.Instrument == 'OPTSTK') ? 4 : formik.values.Exchange == "BFO" && (formik.values.Instrument == 'IF' || formik.values.Instrument == 'SF') ? 3 : formik.values.Exchange == 'NSE' ? 3 : formik.values.Exchange == "BFO" && (formik.values.Instrument == "IO" || formik.values.Instrument == "SO") ? 4 : 6,
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
            showWhen: (values) => values.Exchange == "BFO" || values.Exchange == "NFO" || values.Exchange == "CDS" || values.Exchange == "MCX",
            hiding: false,
            label_size: 12,
            headingtype: 1,

            col_size: formik.values.Exchange == "NFO" && (formik.values.Instrument == 'FUTIDX' || formik.values.Instrument == 'FUTSTK') ? 3 : formik.values.Exchange == "NFO" && (formik.values.Instrument == 'OPTIDX' || formik.values.Instrument == 'OPTSTK') ? 4 : formik.values.Exchange == "BFO" && (formik.values.Instrument == 'IF' || formik.values.Instrument == "SF") ? 3 : formik.values.Exchange == "BFO" && (formik.values.Instrument == "IO" || formik.values.Instrument == "SO") ? 4 : 6,
            disable: false,
        },
        {
            name: "Symbol",
            label: "Symbol",
            type: "select",
            options: getSymbolData.data && getSymbolData.data.map((item) => ({
                label: item,
                value: item,
            })),
            showWhen: (values) => values.Exchange == "BFO" || values.Exchange === "NFO" || values.Exchange === "NSE" || values.Exchange === "CDS" || values.Exchange === "MCX",
            label_size: 12,
            headingtype: 1,

            hiding: false,
            col_size: formik.values.Exchange == "NFO" && (formik.values.Instrument == 'FUTIDX' || formik.values.Instrument == 'FUTSTK') ? 3 : formik.values.Exchange == "NFO" && (formik.values.Instrument == 'OPTIDX' || formik.values.Instrument == 'OPTSTK') ? 4 : formik.values.Exchange == "BFO" && (formik.values.Instrument == 'IF' || formik.values.Instrument == "SF") ? 3 : formik.values.Exchange == "NSE" ? 3 : formik.values.Exchange == "BFO" && (formik.values.Instrument == "IO" || formik.values.Instrument == "SO") ? 4 : 6,
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
            showWhen: (values) => values.Instrument == "IO" || values.Instrument == "SO" || values.Instrument == "OPTIDX" || values.Instrument == "OPTSTK",
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
            options: getStricke.data && getStricke.data.map((item) => ({
                label: item,
                value: item
            })),
            showWhen: (values) => values.Instrument == "IO" || values.Instrument == "SO" || values.Instrument == "OPTIDX" || values.Instrument == "OPTSTK",
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
            options: formik.values.Exchange == "NFO" &&
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
            // options: getExpiryDate && getExpiryDate.data.map((item) => ({
            //     label: item,
            //     value: item
            // })),
            showWhen: (values) => values.Exchange == "BFO" || values.Exchange === "NFO" || values.Exchange === "CDS" || values.Exchange === "MCX",
            label_size: 12,
            headingtype: 1,

            hiding: false,
            col_size: formik.values.Exchange == "NFO" && (formik.values.Instrument == 'FUTIDX' || formik.values.Instrument == 'FUTSTK') ? 3 : formik.values.Exchange == "NFO" && (formik.values.Instrument == 'OPTIDX' || formik.values.Instrument == 'OPTSTK') ? 4 : formik.values.Exchange == "BFO" && (formik.values.Instrument == 'IF' || formik.values.Instrument == "SF") ? 3 : formik.values.Exchange == "BFO" && (formik.values.Instrument == "IO" || formik.values.Instrument == "SO") ? 4 : 6,
            disable: false,
        },
        {
            name: "Timeframe",
            label: "Time Frame",
            type: "select",
            options: getTimeFrame && getTimeFrame.data.map((item) => ({
                label: item,
                value: item
            })),
            label_size: 12,
            headingtype: 2,
            hiding: false,
            col_size: 3,
            disable: false,
        },

    ]

    const EntryRuleArr = [

        {
            name: "Strategy",
            label: "Pattern Type",
            type: "select",
            options: [
                { label: "Candlestick Pattern", value: "CandlestickPattern" },
                { label: "Charting Pattern", value: "ChartingPattern" },
            ],

            label_size: 12,
            hiding: false,
            headingtype: 2,
            col_size: 3,
            disable: false,
        },

        {
            name: "Marketwise",
            label: "Market-wise",
            type: "select",
            options: formik.values.Strategy === 'ChartingPattern'
                ? [
                    { label: "All", value: "All" },
                    { label: "Bullish", value: "BullishChartingPattern" },
                    { label: "Bearish", value: "BearishChartingPattern" },
                    { label: "Continuation", value: "ContinuationChartingPattern" }
                ]
                : [
                    { label: "All", value: "All" },
                    { label: "Bullish", value: "BullishCandlePattern" },
                    { label: "Bearish", value: "BearishCandlePattern" },
                    { label: "Continuation", value: "ContinuationCandlePattern" }
                ],
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
                formik.values.Strategy === 'ChartingPattern' && formik.values.Marketwise === "All"
                    ? getChartPattern.data?.map((item) => ({
                        label: item,
                        value: item
                    }))
                    : formik.values.Strategy === 'CandlestickPattern' && formik.values.Marketwise === "All"
                        ? getPattern.data?.map((item) => ({
                            label: item,
                            value: item
                        }))
                        : formik.values.Strategy === 'ChartingPattern' ? patternOptionMarketWise?.map((item) => ({
                            label: item,
                            value: item
                        }))
                            : formik.values.Strategy === 'CandlestickPattern' ? patternOptionMarketWise?.map((item) => ({
                                label: item,
                                value: item
                            })) : [],

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

    ]

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
            icontext: text.MeasurementType,
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
            // label: "Re-entry",
            label: "Stoploss",
            type: "text3",
            label_size: 12,
            headingtype: 3,
            hiding: false,
            col_size: 4,
            disable: false,
        },

    ]

    const RiskManagementArr = [


        {
            name: "Quantity",
            label: formik.values.Exchange == "NFO" ? "Lot" : "Quantity",
            type: "text3",

            label_size: 12,
            hiding: false,
            col_size: 4,
            headingtype: 4,
            disable: false,
        },


    ]

    const TimeArr = [
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
    ]

    const fields = [
        {
            name: "Heading",
            label: "Symbol_Selection",
            type: "heading",
            hiding: false,
            label_size: 12,
            headingtype: 1,
            data: SymbolSelectionArr.filter((item) => !item.showWhen || item.showWhen(formik.values)),
            col_size: 12,
            disable: false,
        },
        {
            name: "Heading",
            label: "Entry_Rule",
            type: "heading",
            hiding: false,
            label_size: 12,
            data: EntryRuleArr.filter((item) => !item.showWhen || item.showWhen(formik.values)),
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
            data: RiskManagementArr.filter((item) => !item.showWhen || item.showWhen(formik.values)),
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
            data: ExitRuleArr.filter((item) => !item.showWhen || item.showWhen(formik.values)),
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
            data: TimeArr.filter((item) => !item.showWhen || item.showWhen(formik.values)),
            col_size: 12,
            headingtype: 5,
            disable: false,
        },
    ];


    const getSymbol = async () => {
        if (formik.values.Exchange) {
            const data = { Exchange: formik.values.Exchange, Instrument: formik.values.Instrument }
            await Get_Symbol(data)
                .then((response) => {
                    if (response.Status) {
                        setSymbolData({
                            loading: false,
                            data: response.Symbol
                        })

                    }
                    else {
                        setSymbolData({
                            loading: false,
                            data: []
                        })

                    }
                })
                .catch((err) => {
                    console.log("Error in fatching the Symbol", err)
                })
        }
    }

    useEffect(() => {
        getSymbol()
    }, [formik.values.Instrument, formik.values.Exchange])


    const getStrikePrice = async () => {
        if (formik.values.Instrument && formik.values.Exchange && formik.values.Symbol) {

            const data = {
                Exchange: formik.values.Exchange,
                Instrument: formik.values.Instrument,
                Symbol: formik.values.Symbol
            }
            await Get_StrikePrice(data)
                .then((response) => {
                    if (response.Status) {
                        setStricke({
                            loading: false,
                            data: response.Strike
                        })
                    }
                })
        }


    }

    useEffect(() => {
        getStrikePrice()
    }, [formik.values.Instrument, formik.values.Exchange, formik.values.Symbol])


    const getExpiry = async () => {
        if (formik.values.Instrument && formik.values.Exchange && formik.values.Symbol && formik.values.Exchange != 'NSE') {
            const data = {
                Exchange: formik.values.Exchange,
                Instrument: formik.values.Instrument,
                Symbol: formik.values.Symbol,
                Strike: formik.values.Strike
            }

            await GET_EXPIRY_DATE(data)
                .then((response) => {
                    if (response.Status) {
                        setExpiryDate({
                            loading: false,
                            data: response['Expiry Date']
                        })

                    } else {
                        setExpiryDate({
                            loading: false,
                            data: []
                        })

                    }
                })
                .catch((err) => {
                    console.log("Error in finding the Expiry date", err)
                })
        }

    }

    useEffect(() => {
        getExpiry()
    }, [formik.values.Instrument, formik.values.Exchange, formik.values.Symbol, formik.values.Strike])

    const fetchInstrument = async () => {
        const req = {
            Exchange: formik.values.Exchange,
        }
        const res = await GetInstrument(req);
        if (res.Status) {
            setAllInstrument(res["Instrument Type"]);
            formik.setFieldValue('Instrument', res["Instrument Type"][0])
        } else {
            setAllInstrument([]);
        }
    };
    useEffect(() => {
        fetchInstrument();
    }, [formik.values.Exchange]);


    const GetPatternTimeFrame = async () => {

        await Get_Pattern_Time_Frame()
            .then((response) => {
                setTimeFrame({
                    loading: false,
                    data: response
                })
            })
            .catch((err) => {
                console.log("Error in finding the time frame", err)
            })
    }

    const GetPatternName = async () => {
        await Get_Pattern_Name()
            .then((response) => {
                if (response.Status) {
                    setPattern({
                        loading: false,
                        data: response.PatternName
                    })
                }
                else {
                    setPattern({
                        loading: false,
                        data: []
                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the pattern", err)
            })
    }

    const GetPatternCharting = async () => {
        await Get_Pattern_Charting()
            .then((response) => {
                if (response.Status) {
                    setChartPattern({
                        loading: false,
                        data: response.PatternName
                    })
                }
                else {
                    setChartPattern({
                        loading: false,
                        data: []
                    })

                }
            })
    }

    useEffect(() => {
        GetPatternTimeFrame()
        GetPatternName()
        GetPatternCharting()
    }, [])


    useEffect(() => {
        formik.setFieldValue('expirydata1', "");
        formik.setFieldValue('Optiontype', "");
        formik.setFieldValue('Strike', "");
    }, [formik.values.Symbol])

    useEffect(() => {
        formik.setFieldValue('ETPattern', "");
    }, [formik.values.Strategy])

    useEffect(() => {
        formik.setFieldValue('Symbol', "");
    }, [formik.values.Instrument])


    useEffect(() => {
        if (formik.values.Instrument == "FUTIDX" || formik.values.Instrument == "FUTSTK") {
            formik.setFieldValue('Optiontype', "")
            formik.setFieldValue('Strike', "")
        }
        if (formik.values.Exchange == "NSE") {
            formik.setFieldValue('Instrument', "")
        }
    }, [formik.values.Instrument, formik.values.Exchange])


    return (
        <>
            <Content>

                <AddForm
                    fields={fields.filter((field) => !field.showWhen || field.showWhen(formik.values))}

                    page_title={`Add Script - Pattern Script  , Group Name : ${location.state?.groupData?.GroupName}`}
                    btn_name="Add"
                    btn_name1="Cancel"
                    formik={formik}
                    btn_name1_route={"/admin/allscript"}
                />
            </Content>
        </>
    );
};
export default AddClient;
