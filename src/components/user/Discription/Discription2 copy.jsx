


import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  GetSingleChart,
  Option_Detail,
  ScalpingPositionDetails,
} from "../../CommonAPI/User";
import { Get_Pattern_Charting, Get_Pattern_Name } from "../../CommonAPI/Admin";
import Content from "../../../ExtraComponent/Content";


// Strategy options organized by category
const STRATEGY_OPTIONS = {
  "Straddle/Strangle": [
    { title: "Long Strangle", value: "LongStrangle" },
    { title: "Short Strangle", value: "ShortStrangle" },
    { title: "Long Straddle", value: "LongStraddle" },
    { title: "Short Straddle", value: "ShortStraddle" },
  ],
  "Butterfly/Condor": [
    { title: "Long Iron Butterfly", value: "LongIronButterfly" },
    { title: "Short Iron Butterfly", value: "ShortIronButterfly" },
    { title: "Long Iron Condor", value: "LongIronCondor" },
    { title: "Short Iron Condor", value: "ShortIronCondor" },
  ],
  Spread: [
    { title: "Bear Call Spread", value: "BearCallSpread" },
    { title: "Bear Put Spread", value: "BearPutSpread" },
    { title: "Bull Call Spread", value: "BullCallSpread" },
    { title: "Bull Put Spread", value: "BullPutSpread" },
  ],
  "Ladder/Covered": [
    { title: "Bull Call Ladder", value: "BullCallLadder" },
    { title: "Bull Put Ladder", value: "BullPutLadder" },
    { title: "Covered Call", value: "CoveredCall" },
    { title: "Covered Put", value: "CoveredPut" },
  ],
  "Collar/Ratio": [
    { title: "Long Collar", value: "LongCollar" },
    { title: "Short Collar", value: "ShortCollar" },
    { title: "Ratio Call Spread", value: "RatioCallSpread" },
    { title: "Ratio Put Spread", value: "RatioPutSpread" },
  ],
};

// Tabs available in the component
const TABS = ["Scalping", "Option", "Pattern"];

const DescriptionPage = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState("Scalping");

  // Scalping tab state
  const [scalpingOption, setScalpingOption] = useState("Single");

  // Option tab state
  const [measurementType, setMeasurementType] = useState("Straddle/Strangle");
  const [selectedOption, setSelectedOption] = useState("");

  // Pattern tab state
  const [selectedPatternType, setSelectedPatternType] = useState("Charting Pattern");
  const [selectedPatternName, setSelectedPatternName] = useState("");
  const [patternTypeOptions, setPatternTypeOptions] = useState([]);

  // Common state
  const [description, setDescription] = useState([]);
  const [patternData, setPatternData] = useState([]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // Initialize default settings for each tab
    if (tab === "Scalping") {
      setScalpingOption("Single");
      fetchScalpingData("Single");
    } else if (tab === "Option") {
      const defaultStrategyCategory = STRATEGY_OPTIONS[measurementType];
      if (defaultStrategyCategory && defaultStrategyCategory.length > 0) {
        setSelectedOption(defaultStrategyCategory[0].value);
        fetchOptionData(defaultStrategyCategory[0]);
      }
    } else if (tab === "Pattern") {
      setSelectedPatternType("Charting Pattern");
      fetchPatternTypeOptions("Charting Pattern");
    }
  };

  // Fetch scalping data
  const fetchScalpingData = async (option) => {
    try {
      const reqData = { PositionType: option };
      const res = await ScalpingPositionDetails(reqData);
      setDescription(res.data);
    } catch (error) {
      console.error("Error fetching scalping data:", error);
    }
  };

  // Fetch option data
  const fetchOptionData = async (option) => {
    try {
      const reqData = { StrategyName: option.value };
      const res = await Option_Detail(reqData);
      setDescription(res.data);
    } catch (error) {
      console.error("Error fetching option data:", error);
    }
  };

  // Fetch pattern data
  const fetchPatternData = async () => {
    if (!selectedPatternName) return;

    try {
      const reqData = {
        Pattern: selectedPatternName,
        PatternType: selectedPatternType,
        TType: "",
      };
      const res = await GetSingleChart(reqData);
      setPatternData(res?.data || []);
    } catch (error) {
      console.error("Error fetching pattern data:", error);
    }
  };

  // Fetch pattern type options
  const fetchPatternTypeOptions = async (patternType) => {
    try {
      const patternTypeToUse = patternType || selectedPatternType;
      let data;

      if (patternTypeToUse === "Charting Pattern") {
        data = await Get_Pattern_Charting();
      } else {
        data = await Get_Pattern_Name();
      }

      setPatternTypeOptions(data.PatternName || []);

      // Select first pattern by default if available
      if (data.PatternName && data.PatternName.length > 0) {
        setSelectedPatternName(data.PatternName[0]);
      }
    } catch (error) {
      console.error("Error fetching pattern type options:", error);
    }
  };

  // Event handlers
  const handleScalpingChange = (option) => {
    setScalpingOption(option);
    fetchScalpingData(option);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option.value);
    fetchOptionData(option);
  };

  const handlePatternTypeChange = (e) => {
    const value = e.target.value;
    setSelectedPatternType(value);
    fetchPatternTypeOptions(value);
  };

  const handlePatternNameChange = (e) => {
    const value = e.target.value;
    setSelectedPatternName(value);
  };

  // Initialize component on mount
  useEffect(() => {
    handleTabChange(activeTab);
  }, []);

  // Update pattern data when pattern selection changes
  useEffect(() => {
    fetchPatternData();
  }, [selectedPatternName, selectedPatternType]);

  // Update option data when measurement type changes
  useEffect(() => {
    if (activeTab === "Option" && measurementType) {
      const defaultStrategy = STRATEGY_OPTIONS[measurementType][0];
      setSelectedOption(defaultStrategy.value);
      fetchOptionData(defaultStrategy);
    }
  }, [measurementType, activeTab]);

  return (
    <Content
      Page_title={"📄 Description"}
      button_status={false}
      backbutton_status={true}>
      <div className="desc-page-wrapper ">
        <div className=" ">
          {/* Tab Navigation */}
          <ul className="nav nav-tabs justify-content-center border-bottom rounded-0 p-1 mb-3">
            {TABS.map((tab) => (
              <li className="nav-item" key={tab}>
                <a 
                  className={`nav-link mx-lg-3 ${activeTab === tab ? "active" : ""}`
                  }
                  onClick={() => handleTabChange(tab)}
                >
                  {tab}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-3">
            {/* Scalping Tab Content */}
            {activeTab === "Scalping" && (
              <div className="scalping-content">
                <h5 className="desc-heading">Scalping Options</h5>
                <div className="desc-btn-group nav nav-pills shadow rounded-pill p-1 d-flex flex-wrap mb-0">
                  {["Single", "Multiple"].map((option) => (
                    <button
                      key={option}
                      className={` nav-link  rounded-pill mx-lg-3 ${scalpingOption === option ? "active" : ""
                        }`}
                      onClick={() => handleScalpingChange(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="desc-details mt-3">
                  <div className="desc-card ">
                    <p className="desc-text">
                      <strong className="card-text-Color">Position Type:</strong>{" "}
                      <span style={{ fontSize: '14px' }}>{description?.[0]?.PositionType}</span>
                    </p>
                    <p className="desc-text" >
                      <strong className="card-text-Color">Description:</strong>{" "}
                      <div style={{ fontSize: '14px' }}>
                        {description?.[0]?.Description?.split('\n').map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </div>

                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Option Tab Content */}
            {activeTab === "Option" && (
              <div>
                <div className="dropdown-container mb-3">
                  <label htmlFor="measurementType" className="form-label">
                    Select Option Type
                  </label>
                  <select
                    id="measurementType"
                    className="form-select"
                    value={measurementType}
                    onChange={(e) => setMeasurementType(e.target.value)}
                  >
                    {Object.keys(STRATEGY_OPTIONS).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {measurementType && (
                  <>
                    <h5 className="desc-heading">Select a Strategy</h5>
                    <div className="desc-btn-group">
                      {STRATEGY_OPTIONS[measurementType].map((opt) => (
                        <button
                          key={opt.value}
                          className={`btn card-text-Color border border-sm ${selectedOption === opt.value ? "active" : ""
                            }`}
                          onClick={() => handleOptionChange(opt)}
                        >
                          {opt.title}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                <div className="desc-details mt-3">
                  {description && description.length > 0 ? (
                    <div className="option-details d-flex flex-wrap card-bg-color">
                      <div className="option-image-container">
                        {description[0].image_data && (
                          <img
                            src={`data:image/png;base64,${description[0].image_data}`}
                            alt="Strategy"
                            className="option-image"
                          />
                        )}
                      </div>
                      <div className="option-info">
                        <p>
                          <strong className="card-text-Color">Strategy Name:</strong>{" "}
                          <span style={{ fontSize: '14px' }}> {description[0]["Strategy Name"]}</span>
                        </p>
                        <p>
                          <strong className="card-text-Color">Market Outlook:</strong>{" "}
                          <span style={{ fontSize: '14px' }}>{description[0]["View (Market Outlook)"]}</span>
                        </p>
                        <p>
                          <strong className="card-text-Color">Strategy:</strong> <span style={{ fontSize: '14px' }}> {description[0]["Strategy"]}</span>
                        </p>
                        <p>
                          <strong className="card-text-Color">Risk (Max Loss):</strong>{" "}
                          <span style={{ fontSize: '14px' }}> {description[0]["Risk (Max Loss)"]}</span>
                        </p>
                        <p>
                          <strong className="card-text-Color">Reward (Max Profit):</strong>{" "}
                          <span style={{ fontSize: '14px' }}> {description[0]["Reward (Max Profit)"]}</span>
                        </p>
                        <div className="nested-info ms-0">
                          <p>
                            <strong className="card-text-Color">Breakeven Points:</strong>
                          </p>
                          <p>
                            <strong className="card-text-Color">Upper BE:</strong>{" "}
                            <span style={{ fontSize: '14px' }}>{description[0]["Breakeven Points"]?.["Upper BE"]}</span>
                          </p>
                          <p>
                            <strong className="card-text-Color">Lower BE:</strong>{" "}
                            <span style={{ fontSize: '14px' }}>{description[0]["Breakeven Points"]?.["Lower BE"]}</span>
                          </p>
                        </div>
                        <div className="nested-info ms-0">
                          <p>
                            <strong className="card-text-Color">Max Profit When :</strong>
                          </p>
                          <p>
                            <strong className="card-text-Color">Upward:</strong>{" "}
                            <span style={{ fontSize: '14px' }}>{description[0]["Max Profit When?"]?.["Upward"]}</span>
                          </p>
                          <p>
                            <strong className="card-text-Color">Downward:</strong>{" "}
                            <span style={{ fontSize: '14px' }}>{description[0]["Max Profit When?"]?.["Downward"]}</span>
                          </p>
                        </div>
                        <p>
                          <strong className="card-text-Color">Max Loss When :</strong>{" "}
                          <span style={{ fontSize: '14px' }}> {description[0]["Max Loss When?"]}</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="card-text-Color">No option details available.</p>
                  )}
                </div>
              </div>
            )}

            {/* Pattern Tab Content */}
            {activeTab === "Pattern" && (
              <div>
                <h5 className="desc-heading">Select a Pattern</h5>
                <div className="desc-btn-group">
                  <div className="dropdown-container me-2">
                    <label htmlFor="patternType" className="form-label">
                      Select Pattern Type
                    </label>
                    <select
                      id="patternType"
                      className="form-select"
                      value={selectedPatternType}
                      onChange={handlePatternTypeChange}
                    >
                      <option value="Charting Pattern">Charting Pattern</option>
                      <option value="CandleStick Pattern">CandleStick Pattern</option>
                    </select>
                  </div>
                  <div className="dropdown-container">
                    <label htmlFor="patternName" className="form-label">
                      Select Pattern Name
                    </label>
                    <select
                      id="patternName"
                      className="form-select"
                      value={selectedPatternName}
                      onChange={handlePatternNameChange}
                    >
                      {patternTypeOptions.map((pattern) => (
                        <option key={pattern} value={pattern}>
                          {pattern}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="desc-details mt-3">
                  <div className="pattern-container-unique option-details d-flex flex-wrap card-bg-color">
                    <div className="image-container-unique">
                      {patternData?.[0]?.image_data && (
                        <img
                          src={`data:image/png;base64,${patternData[0].image_data}`}
                          alt={patternData[0].Pattern}
                          className="pattern-image-unique"
                        />
                      )}
                    </div>
                    <div className="text-content-unique">
                      <h2 className="pattern-title-unique">
                        {patternData?.[0]?.Pattern}
                      </h2>
                      <p className="pattern-type-unique">
                        <strong className="card-text-Color">Type:</strong> {patternData?.[0]?.PatternType}
                      </p>
                      <p className="trading-type-unique">
                        <strong className="card-text-Color">Trading Type:</strong> {patternData?.[0]?.TType}
                      </p>
                      <p className="pattern-description-unique card-bg-color">
                        {patternData?.[0]?.Description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </Content>
  );
};

export default DescriptionPage;