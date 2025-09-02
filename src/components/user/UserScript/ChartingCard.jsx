import React, { useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import { chartingText } from "../../../ExtraComponent/IconTexts";
//
const ChartingCard = ({
  item,
  index,
  chartingData,
  strategTag,
  setChartingData,
  handleAddCharting,
  selectStrategyType,
  scriptType,
  tableType,
  data,
  selectedType,
  FromDate,
  ToDate,
  chartingSubTab,
  getCharting,
  view,
  fixedRowPerPage,
  allScripts2,

}) => {
  // Memoize strategy options for performance (move above early return)
  const baseOptions = useMemo(() => strategTag.map((tag) => ({ value: tag, label: tag })), [strategTag]);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // If there's no data, display NoDataFound component in the center
  if (!chartingData || chartingData.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}>
        <NoDataFound />
      </div>
    );
  }
  const adminPermission = localStorage.getItem("adminPermission");

  const initialValues = {
    fundOrLot:
      item.Segment === "Cash"
        ? chartingData[index]?.Fund || ""
        : chartingData[index]?.Quantity || "",
    tradePerDay: chartingData[index]?.TradePerDay || "",
    maxLoss: chartingData[index]?.MaxLoss || 0,
    maxProfit: chartingData[index]?.MaxProfit || 0,
    runningTrade: chartingData[index]?.RunningTrade || "",
    // For toggles, true means "On"
    tradeStatus: chartingData[index]?.TradeStatus === "On",
    adminStatus: chartingData[index]?.AdminStatus === "On",
    // For trade mode, default is "Intraday"
    tradeMode: chartingData[index]?.ExitDay || "Intraday",
    strategyTags: chartingData[index]?.Strategytag || [],
  };

  // Dummy options for React Select
  const strategyOptions = strategTag.map((tag) => ({
    value: tag,
    label: tag,
  }));

  // Manual validation function (without Yup)
  const validate = (values) => {
    const errors = {};
    if (!values.fundOrLot) {
      errors.fundOrLot = "This field is required.";
    } else if (values.fundOrLot < 0) {
      errors.fundOrLot = "Value cannot be negative.";
    }
    if (!values.tradePerDay) {
      errors.tradePerDay = "This field is required.";
    } else if (values.tradePerDay < 0) {
      errors.tradePerDay = "Value cannot be negative.";
    }
    if (values.maxLoss === "") {
      errors.maxLoss = "This field is required.";
    } else if (values.maxLoss < 0) {
      errors.maxLoss = "Value cannot be negative.";
    }
    if (values.maxProfit === "") {
      errors.maxProfit = "This field is required.";
    } else if (values.maxProfit < 0) {
      errors.maxProfit = "Value cannot be negative.";
    }
    if (!values.runningTrade) {
      errors.runningTrade = "This field is required.";
    } else if (values.runningTrade < 0) {
      errors.runningTrade = "Value cannot be negative.";
    }
    if (strategyOptions.length > 0 && (!values.strategyTags || values.strategyTags.length === 0)) {
      errors.strategyTags = "At least one strategy tag must be selected.";
    }

    return errors;
  };

  // Style objects for dark theme
  const inputStyle = {
    backgroundColor: "#121212",
    border: "1px solid #222",
    color: "white",
  };

  const handleSignal = (segment) => {
    navigate("/user/newscript/charting2", {
      state: {
        data: {
          selectStrategyType: "ChartingPlatform",
          scriptType: allScripts2, // Pass allScripts2 here
          tableType,
          data,
          selectedType,
          FromDate,
          ToDate,
          chartingSubTab, // Pass the current tab
          getCharting,
          view,
          fixedRowPerPage,
          segment,
        },
      },
    });
  }

  const labelStyle = { color: "#ccc" ,fontSize: "0.9rem"};

  return (
    <div className="col-md-4 mb-3" style={{ maxWidth: "400px", minWidth: "300px" }}>
      <div
        className="card shadow card-bg-color card-border"
        style={{
          color: "",
          fontSize: "0.92rem",
          minHeight: "480px",
          borderRadius: "18px",
          boxShadow: "0 4px 24px rgba(60,60,60,0.10)",
          background: "none",
          border: "1.5px solid #444", // subtle border
          padding: "18px 0", // vertical padding for card content
        }}>
        <div
          className="card-header py-2 card-text-Color"
          style={{
            background: "none",
            borderBottom: "1px solid #eaeaea",
            fontSize: "1.05rem",
            padding: "0.75rem 1.2rem",
            borderTopLeftRadius: "18px",
            borderTopRightRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
          <h5 className="mb-0 text-left fw-bold card-text-Color" style={{ fontSize: "1.5rem", flex: 1 }}>
            {item.Segment}
          </h5>
          {/* <button className="signal-btn card-bg-color card-text-Color" style={{ fontSize: "0.95rem", padding: "3px 12px", borderRadius: "6px", background: "#f5f6fa", border: "1px solid #eaeaea", marginLeft: "10px", color: "inherit" }} onClick={() => handleSignal(item.Segment)}>View Signal</button> */}
          <button className="viewSignal-button" onClick={() => handleSignal(item.Segment)}>
            <span className="viewSignal-button-content" >View Signal </span>
          </button>
        </div>
        <div className="card-body px-4 py-4" style={{ fontSize: "0.92rem" }}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validate={validate}
            onSubmit={(values) => {
              // Create a copy of chartingData and update the current index with form values
              const updatedData = [...chartingData];
              if (item.Segment === "Cash") {
                updatedData[index].Fund = values.fundOrLot;
              } else {
                updatedData[index].Quantity = values.fundOrLot;
              }
              updatedData[index].TradePerDay = values.tradePerDay;
              updatedData[index].MaxLoss = values.maxLoss;
              updatedData[index].MaxProfit = values.maxProfit;
              updatedData[index].RunningTrade = values.runningTrade;
              updatedData[index].TradeStatus = values.tradeStatus
                ? "On"
                : "Off";
              updatedData[index].AdminStatus = values.adminStatus
                ? "On"
                : "Off";
              updatedData[index].ExitDay = values.tradeMode;
              updatedData[index].StrategyTag = values.strategyTags || []; // Save selected strategy tags
              setChartingData(updatedData);

              // Call parent's save handler
              handleAddCharting(index);
            }}>
            {(formik) => {
              const { values, setFieldValue } = formik;
              // currentTradeMode is taken from Formik's values.tradeMode
              const currentTradeMode = values.tradeMode;
              return (
                <Form>
                  {/* Toggle Switches */}
                  <div className="d-flex justify-content-evenly align-items-center mb-3" style={{ fontSize: "0.92rem", gap: "32px" }}>
                    <div className="toggle-group">
                      <label className="d-flex align-items-center gap-2">
                        <span style={labelStyle} className="card-text-Color">
                          Trade Status
                        </span>
                        <div className="form-switch">
                          <Field name="tradeStatus">
                            {({ field }) => (
                              <input
                                type="checkbox"
                                className="form-check-input"
                                style={{ width: "40px", height: "20px" }}
                                {...field}
                                checked={field.value}
                              />
                            )}
                          </Field>
                        </div>
                      </label>
                    </div>
                    {adminPermission?.includes("Admin Signal") && (
                      <div className="toggle-group" style={{ marginLeft: "24px" }}>
                        {/* marginLeft for extra gap if needed */}
                        <label className="d-flex align-items-center gap-2">
                          <span style={labelStyle} className="card-text-Color font-weight-bold">
                            Admin Signal
                          </span>
                          <div className="form-switch">
                            <Field name="adminStatus">
                              {({ field }) => (
                                <input
                                  type="checkbox"
                                  className="form-check-input card-text-Color"
                                  style={{ width: "40px", height: "20px" }}
                                  {...field}
                                  checked={field.value}
                                />
                              )}
                            </Field>
                          </div>
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Input Grid */}
                  <div className="row g-4 mb-4">
                    {/* Fund/Lot and Trade/Day aligned in a single row */}
                    <div className="col-6 d-flex flex-column justify-content-end">
                      <label
                        className="form-label card-text-Color"
                        style={{ ...labelStyle, fontSize: "0.92rem", fontWeight: "500" }}>
                        {item.Segment === "Cash" ? "Fund" : "Lot"}
                      </label>
                      <Field
                        name="fundOrLot"
                        type="number"
                        className="form-control form-control-sm card-text-Color"
                        style={{ ...inputStyle, fontSize: "0.92rem", padding: "6px 8px" }}
                        placeholder={
                          item.Segment === "Cash" ? "Enter Fund" : "Enter Lot"
                        }
                      />
                      <ErrorMessage name="fundOrLot">
                        {(msg) => (
                          <div style={{ color: "red", fontSize: "0.8rem" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-end">
                      <label className="form-label card-text-Color d-flex align-items-center" style={{ ...labelStyle, fontSize: "0.92rem", gap: "6px" }}>
                        Trade/Day
                        <span className="custom-tooltip-wrapper ms-1">
                          <span className="info-icon-container" data-tooltip={chartingText.TradePerDay}>
                            <Info
                              style={{ width: "15px", fill: "#ffffff", verticalAlign: "middle" }}
                              className="mx-1"
                            />
                          </span>
                        </span>
                      </label>
                      <Field
                        name="tradePerDay"
                        type="number"
                        className="form-control form-control-sm card-text-Color"
                        style={{ ...inputStyle, fontSize: "0.92rem", padding: "6px 8px" }}
                        placeholder="Enter trade per day"
                      />
                      <ErrorMessage name="tradePerDay">
                        {(msg) => (
                          <div style={{ color: "red", fontSize: "0.8rem" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="col-6">
                      <label
                        className="form-label card-text-Color"
                        style={{ ...labelStyle, fontSize: "0.92rem" }}>
                        Max Profit
                      </label>
                      <span className="custom-tooltip-wrapper">
                        <span
                          className="info-icon-container"
                          data-tooltip={chartingText.MaxProfit}>
                          <Info
                            style={{
                              width: "15px",
                              fill: "#ffffff",
                            }}
                            className="mx-1"
                          />
                        </span>
                      </span>
                      <Field
                        name="maxProfit"
                        type="number"
                        className="form-control form-control-sm card-text-Color"
                        style={{ ...inputStyle, fontSize: "0.92rem", padding: "6px 8px" }}
                        placeholder="Enter max profit"
                      />
                      <ErrorMessage name="maxProfit">
                        {(msg) => (
                          <div style={{ color: "red", fontSize: "0.8rem" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className="col-6">
                      <label
                        className="form-label card-text-Color"
                        style={{ ...labelStyle, fontSize: "0.92rem" }}>
                        Max Loss
                      </label>
                      <span className="custom-tooltip-wrapper">
                        <span
                          className="info-icon-container"
                          data-tooltip={chartingText.MaxLoss}>
                          <Info
                            style={{
                              width: "15px",
                              fill: "#ffffff",
                            }}
                            className="mx-1"
                          />
                        </span>
                      </span>
                      <Field
                        name="maxLoss"
                        type="number"
                        className="form-control form-control-sm card-text-Color"
                        style={{ ...inputStyle, fontSize: "0.92rem", padding: "6px 8px" }}
                        placeholder="Enter max loss"
                      />
                      <ErrorMessage name="maxLoss">
                        {(msg) => (
                          <div style={{ color: "red", fontSize: "0.8rem" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className="col-12">
                      <label
                        className="form-label card-text-Color"
                        style={{ ...labelStyle, fontSize: "0.92rem" }}>
                        Running Trade
                      </label>
                      <span className="custom-tooltip-wrapper">
                        <span
                          className="info-icon-container"
                          data-tooltip={chartingText.RunningTrade}>
                          <Info
                            style={{
                              width: "15px",
                              fill: "#ffffff",
                            }}
                            className="mx-1"
                          />
                        </span>
                      </span>
                      <Field
                        name="runningTrade"
                        type="number"
                        className="form-control form-control-sm card-text-Color"
                        style={{ ...inputStyle, fontSize: "0.92rem", padding: "6px 8px" }}
                        placeholder="Enter running trade"
                      />
                      <ErrorMessage name="runningTrade">
                        {(msg) => (
                          <div style={{ color: "red", fontSize: "0.8rem" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className="col-12 stg-tag" style={{ marginTop: "10px" }}>
                      <label
                        className="form-label card-text-Color"
                        style={{ ...labelStyle, fontSize: "0.92rem" }}>
                        Strategy Tag
                      </label>
                      <Select
                        isMulti
                        options={(() => {
                          // Show Deselect All only if all selected AND menu is open
                          if (values.strategyTags.length === baseOptions.length && baseOptions.length > 0 && menuOpen) {
                            return [{ value: "__deselect_all__", label: "Deselect All" }, ...baseOptions];
                          } else {
                            // Not all selected, show Select All
                            return [{ value: "__select_all__", label: "Select All" }, ...baseOptions];
                          }
                        })()}
                        value={baseOptions.filter(option => values.strategyTags.includes(option.value))}
                        onMenuOpen={() => setMenuOpen(true)}
                        onMenuClose={() => setMenuOpen(false)}
                        onChange={(selectedOptions, actionMeta) => {
                          if (!selectedOptions) {
                            setFieldValue("strategyTags", []);
                            return;
                          }
                          // Check if Deselect All is present in the selection
                          if (selectedOptions.some(opt => opt.value === "__deselect_all__")) {
                            setFieldValue("strategyTags", []);
                            return;
                          }
                          // Check if Select All is present in the selection
                          if (selectedOptions.some(opt => opt.value === "__select_all__")) {
                            setFieldValue("strategyTags", baseOptions.map(opt => opt.value));
                            return;
                          }
                          setFieldValue(
                            "strategyTags",
                            selectedOptions.filter(opt => opt.value !== "__select_all__" && opt.value !== "__deselect_all__").map(opt => opt.value)
                          );
                        }}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={{
                          control: (base) => ({
                            ...base,
                            backgroundColor: "#121212",
                            border: "1px solid #222",
                            color: "white",
                            fontSize: "0.92rem",
                            minHeight: "32px"
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "#222",
                            color: "white",
                            fontSize: "0.92rem"
                          }),
                          option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected ? "#7367f0" : "#333",
                            color: state.isSelected ? "white" : "#ccc",
                            fontSize: "0.92rem",
                            "&:hover": {
                              backgroundColor: "#444",
                              color: "white",
                            },
                          }),
                        }}
                        closeMenuOnSelect={false}
                      />
                      <ErrorMessage name="strategyTags">
                        {(msg) => (
                          <div style={{ color: "red", fontSize: "0.8rem" }}>
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                  </div>

                  {/* Trade Mode Toggle */}
                  <div className="mb-3">
                    <label
                      className="d-block mb-2 card-text-Color"
                      style={{ ...labelStyle, fontSize: "0.92rem" }}>
                      Trade Mode
                    </label>
                    <div
                      className="btn-group w-100 rounded-pill overflow-hidden"
                      role="group"
                      style={{ backgroundColor: "#222", height: "38px" }}>
                      <button
                        type="button"
                        className="btn border-0 rounded-pill"
                        style={{
                          width: "50%",
                          backgroundColor:
                            values.tradeMode === "Intraday"
                              ? "#7367f0"
                              : "#222",
                          color:
                            values.tradeMode === "Intraday"
                              ? "white"
                              : "#6c7293",
                          fontWeight: "500",
                          fontSize: "0.92rem"
                        }}
                        onClick={() => setFieldValue("tradeMode", "Intraday")}>
                        Intraday
                      </button>
                      <button
                        type="button"
                        className="btn border-0 rounded-pill"
                        style={{
                          width: "50%",
                          backgroundColor:
                            values.tradeMode === "Delivery"
                              ? "#7367f0"
                              : "#222",
                          color:
                            values.tradeMode === "Delivery"
                              ? "white"
                              : "#6c7293",
                          fontWeight: "500",
                          fontSize: "0.92rem"
                        }}
                        onClick={() => setFieldValue("tradeMode", "Delivery")}>
                        Delivery
                      </button>
                    </div>
                  </div>

                  <div className="mb-4" />
                  {/* Extra gap before submit button */}
                  <button
                    type="submit"
                    className="btn w-100 py-2 fw-semibold card-text-Color"
                    style={{
                      borderRadius: "8px",
                      // backgroundColor: "#7367f0",
                      border: "none",
                      fontSize: "0.95rem",
                      border: "1px solid #7367f0",
                      borderRadius:'20px',
                      padding: "10px 0" // slightly more padding
                    }}>
                    Save Changes
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ChartingCard;
