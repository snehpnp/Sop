import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
    maxLoss: chartingData[index]?.MaxLoss || "",
    maxProfit: chartingData[index]?.MaxProfit || "",
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

  const labelStyle = { color: "#ccc" };

  return (
    <div className="col-md-4 mb-4">
      <div
        className="card border-0 shadow-lg "
        style={{ backgroundColor: "#000", color: "white" }}>
        <div
          className="card-header py-3 card-text-Color"
          style={{ backgroundColor: "#111", borderBottom: "1px solid #222" }}>
          <h5 className="mb-0 text-center fw-bold  text-white">
            {item.Segment}
          </h5>

          <button className="signal-btn" onClick={() => handleSignal(item.Segment)}>View Signal</button>
        </div>
        <div className="card-body px-3 py-3">
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
                  <div className="d-flex justify-content-evenly align-items-center mb-4">
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
                    {adminPermission?.includes("Admin Signal") && <div className="toggle-group">
                      <label className="d-flex align-items-center gap-2">
                        <span style={labelStyle} className="card-text-Color">
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
                    </div>}
                  </div>

                  {/* Input Grid */}
                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <label
                        className="form-label card-text-Color"
                        style={labelStyle}>
                        {item.Segment === "Cash" ? "Fund" : "Lot"}
                      </label>
                      <Field
                        name="fundOrLot"
                        type="number"
                        className="form-control form-control-lg card-text-Color"
                        style={inputStyle}
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
                    <div className="col-6">
                      <label
                        className="form-label card-text-Color"
                        style={labelStyle}>
                        Trade/Day
                      </label>
                      <Field
                        name="tradePerDay"
                        type="number"
                        className="form-control form-control-lg card-text-Color"
                        style={inputStyle}
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
                        style={labelStyle}>
                        Max Profit
                      </label>
                      <Field
                        name="maxProfit"
                        type="number"
                        className="form-control form-control-lg card-text-Color"
                        style={inputStyle}
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
                        style={labelStyle}>
                        Max Loss
                      </label>
                      <Field
                        name="maxLoss"
                        type="number"
                        className="form-control form-control-lg card-text-Color"
                        style={inputStyle}
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
                        style={labelStyle}>
                        Running Trade
                      </label>
                      <Field
                        name="runningTrade"
                        type="number"
                        className="form-control form-control-lg card-text-Color"
                        style={inputStyle}
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

                    <div className="col-12">
                      <label
                        className="form-label card-text-Color"
                        style={labelStyle}>
                        Strategy Tag
                      </label>
                      <Select
                        isMulti
                        options={strategyOptions}
                        value={strategyOptions.filter(option =>
                          values.strategyTags.includes(option.value)
                        )}
                        onChange={(selectedOptions) =>
                          setFieldValue(
                            "strategyTags",
                            selectedOptions.map((option) => option.value)
                          )
                        }
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={{
                          control: (base) => ({
                            ...base,
                            backgroundColor: "#121212",
                            border: "1px solid #222",
                            color: "white",
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "#222",
                            color: "white",
                          }),
                          option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected ? "#7367f0" : "#333",
                            color: state.isSelected ? "white" : "#ccc",
                            "&:hover": {
                              backgroundColor: "#444",
                              color: "white",
                            },
                          }),
                        }}
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
                  <div className="mb-4">
                    <label
                      className="d-block mb-2 card-text-Color"
                      style={labelStyle}>
                      Trade Mode
                    </label>
                    <div
                      className="btn-group w-100 rounded-pill overflow-hidden"
                      role="group"
                      style={{ backgroundColor: "#222", height: "45px" }}>
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
                        }}
                        onClick={() => setFieldValue("tradeMode", "Delivery")}>
                        Delivery
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold card-text-Color"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#7367f0",
                      border: "none",
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
