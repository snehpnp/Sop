 


import React, { useEffect, useState } from "react";
import {
  Get_Pattern_Time_Frame,
  Get_Pattern_Name,
  Get_Pattern_Charting
} from "../../CommonAPI/Admin";
import {
  AvailableScript,
  GetSymbolIp,
  ChartPatternAPI,
  Candlestick_Pattern,
  GetSingleChart
} from "../../CommonAPI/User";
import FullDataTable from "../../../ExtraComponent/CommanDataTable";
import { columns, columns1 } from "./PatternsColumns";
import AgChartsReact from "./TechnicalPatternCandle";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import Content from "../../../ExtraComponent/Content";
import ChartingPatternCard from "./ChartingPatternCard";

const TechnicalPattern = () => {
  // User data
  const username = localStorage.getItem("name");
  
  // Main state selections
  const [patternType, setPatternType] = useState("Candlestick Patterns");
  const [timeFrame, setTimeFrame] = useState("1M");
  const [scriptType, setScriptType] = useState("");
  const [chartSymbol, setChartSymbol] = useState("");
  const [selectedRowData, setSelectedRowData] = useState("");
  
  // Pattern-specific states
  const [candlestickPattern, setCandlestickPattern] = useState("Bearish_Engulfing");
  const [chartingPattern, setChartingPattern] = useState("Broadening_Bottom");
  
  // Data loading states
  const [showChart, setShowChart] = useState(false);
  const [availableScripts, setAvailableScripts] = useState([]);
  const [allSymbols, setAllSymbols] = useState([]);
  const [timeFrameOptions, setTimeFrameOptions] = useState({
    loading: true,
    data: []
  });
  const [patternNames, setPatternNames] = useState({
    loading: true,
    data: []
  });
  const [chartingPatternNames, setChartingPatternNames] = useState({
    loading: true,
    data: []
  });
  
  // Chart and table data states
  const [candlestickTableData, setCandlestickTableData] = useState({
    loading: true,
    data1: [], // Candle data
    data2: []  // Pattern data
  });
  const [chartPatternTableData, setChartPatternTableData] = useState({
    loading: true,
    PatternData: [],
    CandleData: []
  });
  
  // Separate state for different pattern images
  const [candlePatternImage, setCandlePatternImage] = useState({
    loading: true,
    data: []
  });
  
  const [chartPatternImage, setChartPatternImage] = useState({
    loading: true,
    data: []
  });

  // Initial data loading
  useEffect(() => {
    // Load time frames and pattern names on initial render
    fetchTimeFrames();
    fetchPatternNames();
    fetchChartingPatternNames();
    
    // Set initial data based on default selections
    fetchCandlePatternImage("Bearish_Engulfing");
    fetchChartPatternImage("Broadening_Bottom");
  }, []);
  
  // Load scripts data when pattern type or script type changes
  useEffect(() => {
    fetchAllSymbols();
    fetchAvailableScripts();
  }, [patternType, scriptType]);
  
  // Reset selections when pattern type changes
  useEffect(() => {
    if (patternType === "Charting Patterns") {
      setChartingPattern("Broadening_Bottom");
      setScriptType("");
      setTimeFrame("1M");
      setChartSymbol("");
      setSelectedRowData("");
      // Make sure we have charting pattern image
      fetchChartPatternImage("Broadening_Bottom");
    } else if (patternType === "Candlestick Patterns") {
      setCandlestickPattern("Bearish_Engulfing");
      setTimeFrame("1M");
      setChartSymbol("");
      setSelectedRowData("");
      // Make sure we have candlestick pattern image
      fetchCandlePatternImage("Bearish_Engulfing");
    }
    
    // Reset chart display when changing types
    setShowChart(false);
  }, [patternType]);
  
  // Get pattern image when candlestick pattern changes
  useEffect(() => {
    if (candlestickPattern) {
      fetchCandlePatternImage(candlestickPattern);
    }
  }, [candlestickPattern]);
  
  // Get pattern image when charting pattern changes
  useEffect(() => {
    if (chartingPattern) {
      fetchChartPatternImage(chartingPattern);
    }
  }, [chartingPattern]);
  
  // Fetch chart data when relevant selections change
  useEffect(() => {
    if (patternType === "Candlestick Patterns" && candlestickPattern && timeFrame && chartSymbol) {
      fetchCandlestickData();
    } else if (patternType === "Charting Patterns" && chartingPattern && scriptType && timeFrame && chartSymbol) {
      fetchChartingData();
    }
    
    // Reset chart display when any selection changes
    setShowChart(false);
  }, [
    patternType,
    candlestickPattern,
    chartingPattern,
    scriptType,
    timeFrame,
    chartSymbol
  ]);

  // API functions
  const fetchTimeFrames = async () => {
    try {
      const response = await Get_Pattern_Time_Frame();
      setTimeFrameOptions({ loading: false, data: response });
    } catch (error) {
      console.error("Error fetching time frames:", error);
      setTimeFrameOptions({ loading: false, data: [] });
    }
  };

  const fetchPatternNames = async () => {
    try {
      const response = await Get_Pattern_Name();
      setPatternNames({
        loading: false,
        data: response.Status ? response.PatternName : []
      });
    } catch (error) {
      console.error("Error fetching pattern names:", error);
      setPatternNames({ loading: false, data: [] });
    }
  };

  const fetchChartingPatternNames = async () => {
    try {
      const response = await Get_Pattern_Charting();
      setChartingPatternNames({
        loading: false,
        data: response.Status ? response.PatternName : []
      });
    } catch (error) {
      console.error("Error fetching charting pattern names:", error);
      setChartingPatternNames({ loading: false, data: [] });
    }
  };

  const fetchAvailableScripts = async () => {
    try {
      const response = await AvailableScript();
      setAvailableScripts(response.Status ? response.Symbol : []);
    } catch (error) {
      console.error("Error fetching available scripts:", error);
      setAvailableScripts([]);
    }
  };

  const fetchAllSymbols = async () => {
    try {
      const data = {
        Username: username,
        Strategy: patternType === "Candlestick Patterns" 
          ? "CandlestickPattern" 
          : "ChartingPattern"
      };
      const response = await GetSymbolIp(data);
      setAllSymbols(response.Status ? response.Data : []);
    } catch (error) {
      console.error("Error fetching symbols:", error);
      setAllSymbols([]);
    }
  };

  const fetchCandlePatternImage = async (pattern) => {
    try {
      const data = {
        Pattern: pattern || "",
        TType: "",
        PatternType: "CandleStick Pattern"
      };
      const response = await GetSingleChart(data);
      setCandlePatternImage({ 
        loading: false, 
        data: response.status ? response.data : [] 
      });
    } catch (error) {
      console.error("Error fetching candlestick pattern image:", error);
      setCandlePatternImage({ loading: false, data: [] });
    }
  };

  const fetchChartPatternImage = async (pattern) => {
    try {
      const data = {
        Pattern: pattern || "",
        TType: "",
        PatternType: "Charting Pattern"
      };
      const response = await GetSingleChart(data);
      setChartPatternImage({ 
        loading: false, 
        data: response.status ? response.data : [] 
      });
    } catch (error) {
      console.error("Error fetching charting pattern image:", error);
      setChartPatternImage({ loading: false, data: [] });
    }
  };

  const fetchCandlestickData = async () => {
    try {
      const data = {
        PatternName: candlestickPattern,
        TimeFrame: timeFrame,
        Username: username,
        Symbol: chartSymbol
      };
      const response = await Candlestick_Pattern(data);
      setCandlestickTableData({
        loading: false,
        data1: response.Status ? response.Data.CandleData : [],
        data2: response.Status ? response.Data.PatternData : []
      });
      setShowChart(response.Status);
    } catch (error) {
      console.error("Error fetching candlestick data:", error);
      setCandlestickTableData({ loading: false, data1: [], data2: [] });
      setShowChart(false);
    }
  };

  const fetchChartingData = async () => {
    try {
      const data = {
        Script: scriptType,
        TimeFrame: timeFrame,
        Username: username,
        Symbol: chartSymbol,
        Patternname: chartingPattern
      };
      const response = await ChartPatternAPI(data);
      setChartPatternTableData({
        loading: false,
        CandleData: response.Status ? response.Data.CandleData : [],
        PatternData: response.Status ? response.Data.PatternData : []
      });
      setShowChart(response.Status);
    } catch (error) {
      console.error("Error fetching charting data:", error);
      setChartPatternTableData({ loading: false, CandleData: [], PatternData: [] });
      setShowChart(false);
    }
  };

  const handleRowSelect = (rowData) => {
    setSelectedRowData(rowData);
  };

  return (
    <Content
      Page_title="📉 Technical Pattern"
      button_status={false}
      backbutton_status={true}
    >
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">Technical Pattern</li>
        </ol>
      </nav>
      <div className="iq-card-body">
        {/* Filter Controls */}
        <div className="col-xl-12 card-bg-color">
          <div className="row">
            {/* Pattern Type Selector */}
            <div className="col-md-3">
              <div className="">
                <label className="card-text-Color">Select Technical pattern</label>
                <select
                  className="form-control mt-2"
                  onChange={(e) => setPatternType(e.target.value)}
                  value={patternType}
                >
                  <option value="Candlestick Patterns">Candlestick Patterns</option>
                  <option value="Charting Patterns">Charting Patterns</option>
                </select>
              </div>
            </div>
            
            {/* Pattern Selector */}
            <div className="col-md-3">
              <div className="">
                <label className="card-text-Color">Pattern</label>
                <select
                  className="form-control mt-2"
                  onChange={(e) => 
                    patternType === "Candlestick Patterns"
                      ? setCandlestickPattern(e.target.value)
                      : setChartingPattern(e.target.value)
                  }
                  value={
                    patternType === "Candlestick Patterns"
                      ? candlestickPattern
                      : chartingPattern
                  }
                >
                  {patternType === "Candlestick Patterns"
                    ? patternNames.data && patternNames.data.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))
                    : chartingPatternNames.data && chartingPatternNames.data.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))
                  }
                </select>
              </div>
            </div>
            
            {/* Script Type Selector (Only for Charting Patterns) */}
            {patternType === "Charting Patterns" && (
              <div className="col-md-2">
                <div className="">
                  <label className="card-text-Color">Script</label>
                  <select
                    className="form-control mt-2"
                    onChange={(e) => setScriptType(e.target.value)}
                    value={scriptType}
                  >
                    <option value="">Please Select Script</option>
                    <option value="AvailableScript">Available Script</option>
                    <option value="MyScript">My Script</option>
                  </select>
                </div>
              </div>
            )}
            
            {/* Time Frame Selector */}
            <div className={patternType === "Charting Patterns" ? "col-md-2" : "col-md-3"}>
              <div className="">
                <label className="card-text-Color">Time Frame</label>
                <select
                  className="form-control mt-2"
                  onChange={(e) => setTimeFrame(e.target.value)}
                  value={timeFrame}
                >
                  {timeFrameOptions.data && timeFrameOptions.data.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Symbol Selector */}
            <div className={patternType === "Charting Patterns" ? "col-md-2" : "col-md-3"}>
              <div className="">
                <label className="card-text-Color">Select Specific Pattern</label>
                <select
                  className="form-control mt-2"
                  onChange={(e) => setChartSymbol(e.target.value)}
                  value={chartSymbol}
                >
                  {allSymbols.length === 0 ? (
                    <option value="">No Pattern Script Subscribed</option>
                  ) : (
                    <option value="">Please Select Specific Script</option>
                  )}
                  {allSymbols.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pattern Image & Description for Candlestick Patterns */}
        {patternType === "Candlestick Patterns" && candlePatternImage?.data?.length > 0 && (
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12">
                <div
                  className="card p-3"
                  style={{
                    maxHeight: "auto",
                    // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <div className="row g-0 align-items-center">
                    {/* Left Side - Text Content */}
                    <div className="col-12 col-md-6 p-3">
                      <h5 className="mt-3">Description</h5>
                      <p style={{fontSize: "14px", color: "#555"}}>{candlePatternImage?.data[0]?.Description || "N/A"}</p>
                    </div>

                    {/* Right Side - Image */}
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-2">
                      <img
                        src={`data:image/png;base64,${candlePatternImage?.data[0]?.image_data}`}
                        className="img-fluid rounded"
                        alt="Pattern Image"
                        style={{
                          width: "100%",
                          maxHeight: "300px",
                          objectFit: "contain"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="col-xl-12 mt-3">
          {patternType === "Candlestick Patterns" ? (
            candlestickTableData?.data2 && candlestickTableData.data2.length > 0 && (
              <FullDataTable
                columns={columns1()}
                data={candlestickTableData.data2}
                checkBox={false}
              />
            )
          ) : (
            chartPatternTableData?.PatternData && chartPatternTableData.PatternData.length > 0 && (
              <FullDataTable
                columns={columns()}
                data={chartPatternTableData.PatternData}
                onRowSelect={handleRowSelect}
                checkBox={true}
              />
            )
          )}
        </div>

        {/* Chart */}
        {showChart && (
          <div className="col-xl-12 mt-3">
            {patternType === "Candlestick Patterns" ? (
              <AgChartsReact
                ChartData={candlestickTableData.data1}
                timeFrame={timeFrame}
                type="pattern"
              />
            ) : (
              <AgChartsReact
                ChartData={chartPatternTableData.CandleData}
                timeFrame={timeFrame}
                type="charting"
              />
            )}
          </div>
        )}
      </div>

      {/* Charting Pattern Card for Charting Patterns */}
      {patternType === "Charting Patterns" && chartPatternImage?.data?.length > 0 && (
        <div>
          <ChartingPatternCard data={chartPatternImage.data} />
        </div>
      )}
    </Content>
  );
};

export default TechnicalPattern;