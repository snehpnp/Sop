import React, { useEffect, useState, useCallback, useRef } from "react";
import { Formik, Form, Field } from "formik";
import Select from "react-select";
import {
  GET_EXPIRY_DATE,
  Get_Symbol,
  GetExchange,
  getKeyForAdmin,
  TradeExecutionAPI,
} from "../../CommonAPI/Admin";
import "./OptionChainForm.css";
import Content from "../../../ExtraComponent/Content";
import {
  Get_All_Plans,
  GetStrikeToken,
  getSessionId,
} from "../../CommonAPI/User";
import { connectWebSocket } from "../../user/UserDashboard/LivePrice";
import $ from "jquery";
import Table from "react-bootstrap/Table";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import qs from "qs";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let TargetTypeArr = [
  { value: "POINT", label: "POINT" },
  { value: "PERCENT", label: "PERCENT" },
];
const OptionChainForm = () => {
  const [symbol, setSymbol] = useState([]);
  const [expiry, setExpiry] = useState([]);
  let [strikeToken, setStrikeToken] = useState([]);
  const [formValues, setFormValues] = useState({
    exchange: "NFO",
    instrument: "",
    symbol: "",
    expiryDate: "",
    planName: "",
    target: "",
    stoploss: "",
    TargetType: "POINT",

  });

  // Price tracking states
  const [livePrices, setLivePrices] = useState({}); // Current prices
  const [previousPrices, setPreviousPrices] = useState({}); // Previous prices for comparison
  const [priceChanges, setPriceChanges] = useState({}); // Price change indicators
  const priceTimeouts = useRef({}); // To clear price change indicators after delay

  const UserName = localStorage.getItem("name");
  const Role = localStorage.getItem("Role");
  const [planNames, setPlanNames] = useState([]);
  const [keyInput, setKeyInput] = useState("");
  const [AliceTokenCreated, setAliceTokenCreated] = useState({});

  // Optimized price update function with memoization
  const updatePriceDisplay = useCallback((token, newPrice) => {
    const priceFloat = parseFloat(newPrice);

    setLivePrices((prev) => {
      const currentPrice = prev[token];
      const previousPrice = currentPrice || priceFloat;

      // Update previous prices for comparison
      setPreviousPrices((prevPrev) => ({
        ...prevPrev,
        [token]: currentPrice || priceFloat,
      }));

      // Determine price movement
      let movement = "none";
      if (currentPrice !== undefined) {
        if (priceFloat > currentPrice) {
          movement = "up";
        } else if (priceFloat < currentPrice) {
          movement = "down";
        }
      }

      // Update price change indicators
      if (movement !== "none") {
        setPriceChanges((prevChanges) => ({
          ...prevChanges,
          [token]: movement,
        }));

        // Clear the price change indicator after 2 seconds
        if (priceTimeouts.current[token]) {
          clearTimeout(priceTimeouts.current[token]);
        }

        // priceTimeouts.current[token] = setTimeout(() => {
        //   setPriceChanges((prevChanges) => {
        //     const newChanges = { ...prevChanges };
        //     delete newChanges[token];
        //     return newChanges;
        //   });
        // }, 2000);
      }

      return {
        ...prev,
        [token]: priceFloat,
      };
    });
  }, []);

  // Optimized WebSocket connection
  const showLivePrice = useCallback(
    async (channelList) => {
      connectWebSocket(AliceTokenCreated, channelList, (data) => {
        if (data.lp && data.tk) {
          updatePriceDisplay(data.tk, data.lp);

          // Still update jQuery elements for backward compatibility
          $(".LivePrice_" + data.tk).html(data.lp);
          if (data.v) {
            let volInLakh = (data.v / 100000).toFixed(1);
            $(".volume_" + data.tk).html(volInLakh + "L");
          }

          // ✅ Change % Red/Green
          if (data.pc) {
            $(".pc_" + data.tk).html(data.pc + "%");
            $(".pc_" + data.tk).css("color", data.pc >= 0 ? "green" : "red");
          }
        }
      });
    },
    [updatePriceDisplay]
  );

  const getAllPlans = async () => {
    try {
      const response = await Get_All_Plans();
      if (response?.Admin && response?.Charting) {
        const combinedPlans = [
          ...response.Charting.map((plan) => ({ ...plan, type: "Charting" })),
        ];
        setPlanNames(combinedPlans);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const fetchKeyInput = async () => {
    try {
      const response = await getKeyForAdmin();
      if (response && response.Status) {
        setKeyInput(response.Key);
      }
    } catch (error) {
      console.error("Error fetching key input:", error);
    }
  };

  const getSessionIdFromAPI = async () => {
    try {
      const response = await getSessionId();
      setAliceTokenCreated({
        userId: response.Userid,
        sessionId: response.Access_Token,
      });
    } catch (error) {
      console.error("Error fetching credentials:", error);
      return null;
    }
  };

  useEffect(() => {
    getSessionIdFromAPI();
    getAllPlans();
    fetchKeyInput();
  }, []);


  useEffect(() => {
    const initializeDefaults = async () => {
      const firstExchange = "NFO";
      setFormValues({
        exchange: firstExchange,
        instrument: "",
        symbol: "",
        expiryDate: "",
        planname: "",
      });
      setSymbol([]);
      setExpiry([]);
    };
    initializeDefaults();
  }, []);

  const fetchSymbol = async (currentValues) => {
    try {
      const req = {
        Exchange: currentValues.exchange,
        Instrument: currentValues.instrument,
      };
      const response = await Get_Symbol(req);
      setSymbol(response.Symbol);

      if (response.Symbol?.length > 0) {
        const firstSymbol = response.Symbol[0];
        setFormValues((prev) => ({ ...prev, symbol: firstSymbol }));
        FetchExpiry({ ...currentValues, symbol: firstSymbol });
      }
    } catch (error) {
      console.error("Error fetching symbol:", error);
    }
  };

  useEffect(() => {
    fetchSymbol(formValues);
  }, [formValues.instrument]);

  const FetchExpiry = async (currentValues) => {
    try {
      const req = {
        Exchange: currentValues.exchange,
        Instrument: currentValues.instrument,
        Symbol: currentValues.symbol,
        Strike: "",
      };
      const response = await GET_EXPIRY_DATE(req);
      setExpiry(response["Expiry Date"]);

      if (response["Expiry Date"]?.length > 0) {
        const firstExpiry = response["Expiry Date"][0];
        setFormValues((prev) => ({ ...prev, expiryDate: firstExpiry }));
      }
    } catch (error) {
      console.error("Error fetching expiry date:", error);
    }
  };

  const fetchStrikeToken = async (currentValues) => {
    try {
      const requiredFields = ["exchange", "instrument", "symbol", "expiryDate"];
      const isMissing = requiredFields.some((field) => !currentValues[field]);
      if (isMissing) return;

      const req = {
        Exchange: currentValues.exchange,
        Instrument: currentValues.instrument,
        Symbol: currentValues.symbol,
        Expiry: currentValues.expiryDate,
      };

      const response = await GetStrikeToken(req);
      setStrikeToken(response?.StrikeTokens);

      // Clear previous price data when new strike tokens are loaded
      setLivePrices({});
      setPreviousPrices({});
      setPriceChanges({});

      const channelList = response.SubscriptionChain;
      showLivePrice(channelList);
    } catch (error) {
      console.error("Error fetching strike token:", error);
    }
  };

  useEffect(() => {
    fetchStrikeToken(formValues);
  }, [formValues]);

  const [exchangeOptions, setExchangeOptions] = useState([]);

  const get_Exchange = async () => {
    try {
      const response = await GetExchange();
      if (response.Status && Array.isArray(response.Exchange)) {
        const formattedOptions = response.Exchange.filter(
          (item) => item !== "NSE"
        ).map((item) => ({
          value: item,
          label: item,
        }));
        setExchangeOptions(formattedOptions);
      } else {
        setExchangeOptions([]);
      }
    } catch (err) {
      setExchangeOptions([]);
    }
  };

  useEffect(() => {
    get_Exchange();
  }, []);

  const getInstrumentOptions = (exchange) => {
    if (exchange === "NFO") {
      return [
        { value: "OPTIDX", label: "OPTIDX" },
        { value: "OPTSTK", label: "OPTSTK" },
      ];
    } else if (exchange === "MCX") {
      return [{ value: "OPTFUT", label: "OPTFUT" }];
    } else if (exchange === "BFO") {
      return [{ value: "IO", label: "IO" }];
    } else {
      return [];
    }
  };

  const symbolOptions = symbol.map((item) => ({ value: item, label: item }));

  const validateFields = () => {
    const requiredFields = {
      Exchange: formValues.exchange,
      Instrument: formValues.instrument,
      Symbol: formValues.symbol,
      ExpiryDate: formValues.expiryDate,
      PlanName: formValues.planname,
    };

    const emptyFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (emptyFields?.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Please Fill All Fields",
        text: `Please fill the following fields: ${emptyFields.join(", ")}`,
      });
      return false;
    }
    return true;
  };

  const excecuteTrade = async (tradeType, type, strike, token) => {
    if (!validateFields()) return;

    try {
      const exchange = formValues.exchange;
      const symbol = formValues.symbol;
      const planname = formValues.planname;

      // Use state price instead of jQuery for better performance
      let livePrice = livePrices[token] || $(".LivePrice_" + token).text();

      if (!livePrice || livePrice === "-" || livePrice === 0) {
        toast.error("Live Price not available for this token");
        return;
      }

      const req = {
        Planname: planname,
        Username: UserName,
        User: Role,
        Optiontype: type,
        Exchange: exchange,
        StrikePrice: strike,
        Expirydate: formValues.expiryDate,
        StrategyTag: formValues.strategyTag,
        Symbol: symbol,
        TType: tradeType.toUpperCase(),
        Target: formValues.target || 0,
        Sl: formValues.stoploss || 0,
        TargetType: formValues.TargetType || "POINT",
        Exittime: "15:29:00",
        Ordertype: "Market",
        ETime: "14:04:39",
        Price: livePrice,
        Key: keyInput,
        Demo: "Demo",
        DataSource: "Option Chain",
      };

      let data = qs.stringify(req);
      const res = await TradeExecutionAPI(data);
      toast.success(res.message);
    } catch (error) {
      console.error("Error executing trade:", error);
      toast.error(`Trade Execution Failed`);
    }
  };

  // Enhanced price display component with color indicators
  const PriceDisplay = ({ token }) => {
    const currentPrice = livePrices[token];
    const priceChange = priceChanges[token];

    const getPriceStyle = () => {
      const baseStyle = {
        fontSize: "18px",
        fontWeight: "600",
        padding: "2px 8px",
        borderRadius: "4px",
        transition: "all 0.3s ease",
        display: "inline-block",
        minWidth: "60px",
        textAlign: "center",
      };

      if (priceChange === "up") {
        return {
          ...baseStyle,
          backgroundColor: "#d4edda",
          color: "#155724",
          border: "1px solid #c3e6cb",
        };
      } else if (priceChange === "down") {
        return {
          ...baseStyle,
          backgroundColor: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb",
        };
      }

      return {
        ...baseStyle,
        // backgroundColor: "#f8f9fa",
        color: "#495057",
        border: "1px solid #dee2e6",
      };
    };

    return (
      <span style={getPriceStyle()}>
        {currentPrice !== undefined ? currentPrice.toFixed(2) : "-"}
      </span>
    );
  };

  const OptionChainColumn = [
    {
      name: "Trade",
      label: "Call Trade",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <>
            <button
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "6px 12px",
                border: "none",
                borderRadius: "4px",
                marginRight: "6px",
                fontSize: "14px",
                cursor: "pointer",
                fontWeight: "500",
              }}
              onClick={() =>
                excecuteTrade(
                  "Buy",
                  "CE",
                  tableMeta.rowData.Strike,
                  tableMeta.rowData.CE
                )
              }
            >
              Buy
            </button>
            <button
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                padding: "6px 12px",
                border: "none",
                borderRadius: "4px",
                fontSize: "14px",
                cursor: "pointer",
                fontWeight: "500",
              }}
              onClick={() =>
                excecuteTrade(
                  "Sell",
                  "CE",
                  tableMeta.rowData.Strike,
                  tableMeta.rowData.CE
                )
              }
            >
              Sell
            </button>
          </>
        ),
      },
    },

     // ✅ Call Side Volume
    {
      name: "CE",
      label: "Volume",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <span className={"volume_" + value}></span>
        ),
      },
    },

    // ✅ Call Side Change %
    {
      name: "CE",
      label: "Change %",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => <span className={"pc_" + value}></span>,
      },
    },
    {
      name: "CE",
      label: "Call Premium",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => <PriceDisplay token={value} />,
      },
    },
    {
      name: "Strike",
      label: "Strike Price",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <span
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#007bff",
            }}
          >
            {value}
          </span>
        ),
      },
    },
    {
      name: "PE",
      label: "Put Premium",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => <PriceDisplay token={value} />,
      },
    },
     // ✅ Put Change %
    {
      name: "PE",
      label: "Change %",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => <span className={"pc_" + value}></span>,
      },
    },

    // ✅ Put Volume
    {
      name: "PE",
      label: "Volume",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <span className={"volume_" + value}></span>
        ),
      },
    },
    {
      name: "Trade",
      label: "Put Trade",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <>
            <button
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                padding: "6px 12px",
                border: "none",
                borderRadius: "4px",
                fontSize: "14px",
                cursor: "pointer",
                marginRight: "6px",
                fontWeight: "500",
              }}
              onClick={() =>
                excecuteTrade(
                  "Sell",
                  "PE",
                  tableMeta.rowData.Strike,
                  tableMeta.rowData.PE
                )
              }
            >
              Sell
            </button>
            <button
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "6px 12px",
                border: "none",
                borderRadius: "4px",
                fontSize: "14px",
                cursor: "pointer",
                fontWeight: "500",
              }}
              onClick={() =>
                excecuteTrade(
                  "Buy",
                  "PE",
                  tableMeta.rowData.Strike,
                  tableMeta.rowData.PE
                )
              }
            >
              Buy
            </button>
          </>
        ),
      },
    },
  ];

  useEffect(() => {
    if (formValues.symbol) {
      FetchExpiry(formValues);
    }
  }, [formValues.symbol]);

  // Cleanup timeouts on component unmount
  useEffect(() => {
    return () => {
      Object.values(priceTimeouts.current).forEach((timeout) => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  return (
    <Content
      Page_title={" 📉 Option Chain"}
      button_status={false}
      backbutton_status={true}
    >
      <Formik
        initialValues={formValues}
        enableReinitialize={true}
        onSubmit={(values) => {
          // Handle form submission if needed
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="ocf-form">
            <div className="ocf-container-row">
              <div className="ocf-group">
                <label className="card-text-Color">Exchange</label>
                <Select
                  name="exchange"
                  options={exchangeOptions}
                  value={
                    exchangeOptions.find(
                      (option) => option.value === values.exchange
                    ) || null
                  }
                  onChange={(selectedOption) => {
                    setFieldValue("exchange", selectedOption.value);
                    setFieldValue("instrument", "");
                    setFieldValue("symbol", "");
                    setFieldValue("expiryDate", "");
                    setFormValues((prev) => ({
                      ...prev,
                      exchange: selectedOption.value,
                      instrument: "",
                      symbol: "",
                      expiryDate: "",
                    }));
                  }}
                  placeholder="Select Exchange"
                  className="ocf-select card-text-color"
                />
              </div>

              {values.exchange !== "NSE" && (
                <div className="ocf-group">
                  <label className="card-text-Color">Instrument</label>
                  <Select
                    name="instrument"
                    options={getInstrumentOptions(values.exchange)}
                    value={
                      getInstrumentOptions(values.exchange).find(
                        (option) => option.value === values.instrument
                      ) || null
                    }
                    onChange={(selectedOption) => {
                      setFieldValue("instrument", selectedOption.value);
                      setFieldValue("symbol", "");
                      setFieldValue("expiryDate", "");
                      setFormValues((prev) => ({
                        ...prev,
                        instrument: selectedOption.value,
                        symbol: "",
                        expiryDate: "",
                      }));
                    }}
                    placeholder="Select Instrument"
                    className="ocf-select card-text-color"
                  />
                </div>
              )}

              <div className="ocf-group">
                <label className="card-text-Color">Symbol</label>
                <Select
                  name="symbol"
                  options={symbolOptions}
                  value={
                    symbolOptions.find(
                      (option) => option.value === values.symbol
                    ) || null
                  }
                  onChange={(selectedOption) => {
                    setFieldValue("symbol", selectedOption.value);
                    setFieldValue("expiryDate", "");
                    setFormValues((prev) => ({
                      ...prev,
                      symbol: selectedOption.value,
                      expiryDate: "",
                    }));
                  }}
                  placeholder="Select Symbol"
                  className="ocf-select card-text-color"
                  styles={{
                    menuList: (provided) => ({
                      ...provided,
                      maxHeight: "200px",
                    }),
                  }}
                />
              </div>

              <div className="ocf-group">
                <label className="card-text-Color">Expiry Date</label>
                <Select
                  name="expiryDate"
                  options={expiry.map((date) => ({ value: date, label: date }))}
                  value={
                    expiry
                      .map((date) => ({ value: date, label: date }))
                      .find((option) => option.value === values.expiryDate) ||
                    null
                  }
                  onChange={(selectedOption) => {
                    setFieldValue("expiryDate", selectedOption.value);
                    setFormValues((prev) => ({
                      ...prev,
                      expiryDate: selectedOption.value,
                    }));
                  }}
                  placeholder="Select Expiry"
                  className="ocf-select card-text-color"
                  styles={{
                    menuList: (provided) => ({
                      ...provided,
                      maxHeight: "200px",
                    }),
                  }}
                />
              </div>
            </div>

            <div className="ocf-container-row">

 <div className="ocf-group">
                <label className="card-text-Color mb-1">Target Type</label>
               <Select
                  name="targetType"
                  options={TargetTypeArr.map((type) => ({
                    value: type.value,
                    label: type.label,
                  }))}
                  value={TargetTypeArr.map((type) => ({
                    value: type.value,
                    label: type.label,
                  })).find((option) => option.value === values.TargetType)}
                  onChange={(selectedOption) => {
                    setFieldValue("targetType", selectedOption.value);
                    setFormValues((prev) => ({
                      ...prev,
                      targetType: selectedOption.value,
                    }));
                  }}
                  placeholder="Select Strategy"
                  className="ocf-select "
                />
              </div>



 <div className="ocf-group">
                <label className="card-text-Color mb-1">Target</label>
                <Field
                  name="target"
                  type="number"
                  value={values.target || ""}
                  onChange={(e) => {
                    setFieldValue("target", e.target.value);
                    setFormValues((prev) => ({
                      ...prev,
                      target: e.target.value,
                    }));
                  }}
                  placeholder="Enter Target"
                  className="ocf-control text-center"
                />
              </div>


              <div className="ocf-group mt-1">
                <label className="card-text-Color mb-1">Stoploss</label>
                <Field
                  name="stoploss"
                  type="number"
                  value={values.stoploss || ""}
                  onChange={(e) => {
                    setFieldValue("stoploss", e.target.value);
                    setFormValues((prev) => ({
                      ...prev,
                      stoploss: e.target.value,
                    }));
                  }}
                  placeholder="Enter Stoploss"
                  className="ocf-control text-center"
                />
              </div>

             

              <div className="ocf-group">
                <label className="card-text-Color">Plan Name</label>
                <Select
                  name="planname"
                  options={planNames.map((plan) => ({
                    value: plan.Planname,
                    label: plan.Planname,
                  }))}
                  value={
                    values.planname
                      ? { value: values.planname, label: values.planname }
                      : null
                  }
                  onChange={(selectedOption) => {
                    setFieldValue("planname", selectedOption.value);
                    setFormValues((prev) => ({
                      ...prev,
                      planname: selectedOption.value,
                    }));
                    setFieldValue("strategyTag", "");
                  }}
                  placeholder="Select Plan"
                  className="ocf-select card-text-color"
                />
              </div>

              {values.planname && (
                <div className="ocf-group">
                  <label className="card-text-Color">Strategy Tag</label>
                  <Select
                    name="strategyTag"
                    options={
                      planNames
                        .find((plan) => plan.Planname === values.planname)
                        ?.Strategytag?.map((item) => ({
                          value: item,
                          label: item,
                        })) || []
                    }
                    value={
                      values.strategyTag
                        ? {
                            value: values.strategyTag,
                            label: values.strategyTag,
                          }
                        : null
                    }
                    onChange={(selectedOption) => {
                      setFormValues((prev) => ({
                        ...prev,
                        strategyTag: selectedOption.value,
                      }));
                    }}
                    placeholder="Select Strategy"
                    className="ocf-select card-text-color"
                  />
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>

      {/* Price Legend */}
      {Object.keys(livePrices).length > 0 && (
        <div
          style={{
            margin: "15px 0",
            padding: "10px",
            backgroundColor: "#f8f9fa",
            borderRadius: "5px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
            fontSize: "14px",
          }}
        >
          <span>
            <strong>Price Movement:</strong>
          </span>
          <span
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "2px 8px",
              borderRadius: "3px",
              border: "1px solid #c3e6cb",
            }}
          >
            ↑ Price Up
          </span>
          <span
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "2px 8px",
              borderRadius: "3px",
              border: "1px solid #f5c6cb",
            }}
          >
            ↓ Price Down
          </span>
        </div>
      )}

      {formValues.exchange &&
      formValues.instrument &&
      formValues.symbol &&
      formValues.expiryDate ? (
        <Table bordered hover={false} responsive className="mt-4 modern-table">
          <thead className="modern-table-header">
            <tr>
              {OptionChainColumn.map((col, index) => (
                <th key={index} className="text-center">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {strikeToken?.length > 0 ? (
              strikeToken.map((row, rowIndex) => {
                const midIndex = Math.floor(strikeToken.length / 2);

                return (
                  <tr key={rowIndex}>
                    {OptionChainColumn.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className={`text-center ${
                          rowIndex === midIndex
                            ? "selectedRowIndex"
                            : "commonIndexClass"
                        }`}
                      >
                        {col.options?.customBodyRender
                          ? col.options.customBodyRender(row[col.name], {
                              rowData: row,
                            })
                          : row[col.name] || "-"}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={OptionChainColumn?.length} className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      ) : null}
    </Content>
  );
};

export default OptionChainForm;
