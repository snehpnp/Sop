import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GetAllGroupService } from "../../CommonAPI/Admin";
import { useLocation } from "react-router-dom";
import GridExample from "../../../ExtraComponent/CommanDataTable";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import { Modal, Button } from "react-bootstrap";
import { CopyPlus, Eye } from "lucide-react";
import {
  GetSingleChart,
  GetUserScripts,
  Option_Detail,
  ScalpingPositionDetails,
} from "../../CommonAPI/User";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const ViewGroup = ({ group, isCopyScriptVisible, handleAddScript11, handleAddScript22, handleAddScript33, GroupName, data2 }) => {
  const navigate = useNavigate();
  const [selectGroup, setSelectGroup] = useState('');

  const [allScripts, setAllScripts] = useState({ data: [], len: 0 })

  const [activeTab, setActiveTab] = useState("Scalping");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalActiveTab, setModalActiveTab] = useState("Description");
  const [selectedRowData, setSelectedRowData] = useState(null);

  const [showOptionModal, setShowOptionModal] = useState(false);
  const [optionModalActiveTab, setOptionModalActiveTab] =
    useState("Description");
  const [selectedOptionData, setSelectedOptionData] = useState(null);

  const [showPatternModal, setShowPatternModal] = useState(false);
  const [patternModalActiveTab, setPatternModalActiveTab] =
    useState("Description");
  const [selectedPatternData, setSelectedPatternData] = useState(null);

  const [parameters, setParameters] = useState([]);
  const location = useLocation();
  const groupName = location.state?.name || "";

  const [getAllService, setAllservice] = useState({ loading: true, data: [], data1: [] });

  const userName = localStorage.getItem('name')

  localStorage.setItem("groupTab", activeTab);




  const handleAddScript1 = (data1, type) => {

    const selectedRowIndex = data1?.rowIndex;
    const selectedRow = type == 1 ? getAllService?.data?.[selectedRowIndex] : getAllService?.data1?.[selectedRowIndex];
 
    if (data2?.status == false) {
      Swal.fire({
        title: "Error",
        text: data2.msg,
        icon: "error",
        timer: 1500,
        timerProgressBar: true
      });
    }
    else if (allScripts?.data?.[allScripts?.len]?.CombineScalping?.length == 0) {
      Swal.fire({
        title: "Warning",
        text: "You don't have any valid plan to use this strategy",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true
      });
    }
    else {
      const isExist = allScripts?.data?.[allScripts?.len]?.CombineScalping?.find((item) => item === selectedRow?.ScalpType) ?? ""
      if (!isExist) {
        Swal.fire({
          title: "Warning",
          text: "This script is not available for you",
          icon: "warning",
          timer: 3000,
          timerProgressBar: true
        });
        return;
      }
      const data = { selectGroup: selectGroup, selectStrategyType: "Scalping", type: "group", ...selectedRow };
      navigate('/user/addscript/scalping', { state: { data: data, scriptType: allScripts } });
    }
  }
  const handleAddScript2 = (data1) => { 

    if (data2.status == false) {
      Swal.fire({
        title: "Error",
        text: data2.msg,
        icon: "error",
        timer: 1500,
        timerProgressBar: true
      });
    }
    else if (allScripts.data.length == 0) {
      Swal.fire({
        title: "Warning",
        text: "You don't have any valid plan to use this strategy",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true
      });
    }
    else {

      const selectedRowIndex = data1?.rowIndex;

      let selectedRow = getAllService?.data?.[selectedRowIndex];
      let OptionStgArr = allScripts?.data[allScripts?.len]?.CombineOption


      if (OptionStgArr?.includes('Straddle_Strangle') &&
        ['ShortStrangle', 'LongStrangle', 'LongStraddle', 'ShortStraddle']?.includes(selectedRow?.STG) ||

        OptionStgArr?.includes('Butterfly_Condor') &&
        ['LongIronButterfly', 'ShortIronButterfly', 'LongIronCondor', 'ShortIronCondor']?.includes(selectedRow?.STG) ||

        OptionStgArr?.includes('Spread') &&
        ['BearCallSpread', 'BearPutSpread', 'BullCallSpread', 'BullPutSpread']?.includes(selectedRow?.STG) ||

        OptionStgArr?.includes('Ladder_Coverd') &&
        ['BullCallLadder', 'BullPutLadder', 'CoveredCall', 'CoveredPut']?.includes(selectedRow?.STG) ||

        OptionStgArr?.includes('Collar_Ratio') &&
        ['LongCollar', 'ShortCollar', 'RatioCallSpread', 'RatioPutSpread']?.includes(selectedRow?.STG) ||

        OptionStgArr?.includes('Shifting_FourLeg') &&
        ['LongFourLegStretegy', 'ShortShifting', 'LongShifting', 'ShortFourLegStretegy']?.includes(selectedRow?.STG)
      ) {
        const data = { selectGroup: selectGroup, selectStrategyType: 'Option Strategy', type: "copy", ...selectedRow };
        navigate('/user/addscript/option', { state: { data: data, scriptType: allScripts } });
      }
      else {
        Swal.fire({
          title: "Warning",
          text: "This script is not available for you",
          icon: "warning",
          timer: 3000,
          timerProgressBar: true
        });
        return;
      }

    }
  }
  const handleAddScript3 = (data1) => {
 

    if (data2.status == false) {
      Swal.fire({
        title: "Error",
        text: data2.msg,
        icon: "error",
        timer: 1500,
        timerProgressBar: true
      });
    }
    else if (allScripts.data.length == 0) {
      Swal.fire({
        title: "Warning",
        text: "You don't have any valid plan to use this strategy",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true
      });
    }
    else {
      const selectedRowIndex = data1?.rowIndex;
      const selectedRow = getAllService?.data[selectedRowIndex];

      const isExist = allScripts?.data[allScripts?.len]?.CombinePattern?.find((item) => item === selectedRow?.TradePattern) ?? ""
      if (!isExist) {
        Swal.fire({
          title: "Warning",
          text: "This script is not available for you",
          icon: "warning",
          timer: 3000,
          timerProgressBar: true
        });
        return;
      }
      const data = { selectGroup: selectGroup, selectStrategyType: 'Pattern', type: "group", ...selectedRow };
      navigate('/user/addscript/pattern', { state: { data: data, scriptType: allScripts } });
    }
  }

  // Columns for the three tabs in the main grid
  const getColumnsForScalping = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => (
          <Eye
            onClick={() => handleView(tableMeta.rowIndex)}
            style={{ cursor: "pointer" }}
          />
        ),
      },
    },
    {
      name: "Symbol",
      label: "Symbol",
      options: { filter: true, sort: true },
    },
    {
      name: "Targetselection",
      label: "Target Selection",
      options: { filter: true, sort: true },
    },
  ];

  const getColForOption = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowData = tableMeta.rowIndex;
          return (
            <Eye
              onClick={() => handleViewOption(rowData)}
              style={{ cursor: "pointer" }}
            />
          );
        },
      },
    },
    {
      name: "STG",
      label: "Option Type",
      options: { filter: true, sort: true },
    },
    {
      name: "Symbol",
      label: "Symbol",
      options: { filter: true, sort: true },
    },
  ];

  const getColForPattern = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowData = tableMeta.rowIndex;
          return (
            <Eye
              onClick={() => handleViewPattern(rowData)}
              style={{ cursor: "pointer" }}
            />
          );
        },
      },
    },
    {
      name: "Symbol",
      label: "Symbol",
      options: { filter: true, sort: true },
    },
    {
      name: "Pattern",
      label: "Pattern Type",
      options: { filter: true, sort: true },
    },
  ];

  if (isCopyScriptVisible) {
    getColumnsForScalping.splice(1, 0, {
      name: "coptScript",
      label: "Copy Script",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (_, tableMeta) => {
          return <CopyPlus onClick={() => handleAddScript1(tableMeta, 2)} />
        }
      }
    },)

    getColForOption.splice(1, 0, {
      name: "coptScript",
      label: "Copy Script",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (_, tableMeta) => {
          return <CopyPlus onClick={() => handleAddScript2(tableMeta, 2)} />
        }
      }
    },)

    getColForPattern.splice(1, 0, {
      name: "coptScript",
      label: "Copy Script",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (_, tableMeta) => {
          return <CopyPlus onClick={() => handleAddScript3(tableMeta, 2)} />
        }
      }
    },)


  }



  const handleView = async (rowData) => {
    if (typeof rowData === "number") {
      const filteredData = data.filter((_, index) => index === rowData);
      const newParameters = filteredData[0];
      setParameters(newParameters);
      const reqData = { PositionType: newParameters.FixedSM };
      const res = await ScalpingPositionDetails(reqData);
      setSelectedRowData(res.data);
    } else {
      setSelectedRowData(rowData);
    }
    setModalActiveTab("Description");
    setShowModal(true);
  };

  const handleViewOption = async (rowData) => {
    const filteredData = data.filter((_, index) => index === rowData);
    const newParameters = filteredData[0];
    setParameters(newParameters);
    const reqData = { StrategyName: newParameters?.STG };
    const res = await Option_Detail(reqData);
    setSelectedOptionData(res.data?.[0]);
    setOptionModalActiveTab("Description");
    setShowOptionModal(true);
  };

  const handleViewPattern = async (rowData) => {
    const filteredData = data.filter((_, index) => index === rowData);
    const newParameters = filteredData[0];
    setParameters(newParameters);
    const reqData = {
      Pattern: newParameters.Pattern,
      PatternType: "CandleStick Pattern",
      TType: "",
    };
    const res = await GetSingleChart(reqData);
    setSelectedPatternData(res.data?.[0]);
    setPatternModalActiveTab("Description");
    setShowPatternModal(true);
  };

  const GetUserAllScripts = async () => {
    const data = { Username: userName }
    await GetUserScripts(data)
      .then((response) => {
        if (response.Status) {
          setAllScripts({
            data: response?.data,
            len: response?.data?.length - 1
          })
        }
        else {
          setAllScripts({
            data: [],
            len: 0
          })
        }
      })
      .catch((err) => {
        console.log("Error in finding the User Scripts", err)
      })
  }

  const GetAllUserScriptDetails = async () => {
    const stgType = localStorage.getItem("groupTab"); // moved inside to get fresh value
    const data = { Strategy: stgType, Group: GroupName };

    const response = await GetAllGroupService(data);

    if (!response?.Status) {
      setAllservice({
        loading: false,
        data: response?.Data || [],
        data1: [],
      });
      return;
    }

    if (stgType === 'Scalping') {
      const filterMulticondtion = response?.Data?.filter((item) => item?.ScalpType === 'Multi_Conditional');
      const filterOthers = response?.Data?.filter((item) => item?.ScalpType !== 'Multi_Conditional');

      setAllservice({
        loading: false,
        data: filterOthers,
        data1: filterMulticondtion,
      });
    } else {
      setAllservice({
        loading: false,
        data: response?.Data || [],
        data1: [],
      });
    }
  };
  const formatDescription = (desc) => {
    const paragraphs = desc.split("\n\n");

    return paragraphs.map((para, i) => {
      const lines = para.split("\n");
      return (
        <p key={i} style={{ marginBottom: "1em" }}>
          {lines.map((line, j) => (
            <React.Fragment key={j}>
              {line}
              {j < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      );
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      const reqData = { Strategy: activeTab, Group: groupName || group };
      const response = await GetAllGroupService(reqData);
      setData(response.Data);
    };
    fetchData();
    GetAllUserScriptDetails()
  }, [activeTab, groupName, group]);

  useEffect(() => {
    GetUserAllScripts()

  }, []);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-center">
        <ul
          className="nav nav-pills shadow rounded-pill p-1"
        >
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "Scalping" ? "active" : ""
                } rounded-pill`}
              onClick={() => setActiveTab("Scalping")}
              style={{
                padding: "10px 20px",
                margin: "5px",
                border: "none",
                outline: "none",
              }}>
              Scalping
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "Option Strategy" ? "active" : ""
                } rounded-pill`}
              onClick={() => setActiveTab("Option Strategy")}
              style={{
                padding: "10px 20px",
                margin: "5px",
                border: "none",
                outline: "none",
              }}>
              Option Strategy
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "Pattern" ? "active" : ""
                } rounded-pill`}
              onClick={() => setActiveTab("Pattern")}
              style={{
                padding: "10px 20px",
                margin: "5px",
                border: "none",
                outline: "none",
              }}>
              Pattern
            </button>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        {activeTab === "Scalping" && (
          <div className="tab-content shadow-sm rounded  ">
            {data && data?.length > 0 ? (
              <GridExample
                columns={getColumnsForScalping}
                data={data}
                checkBox={false}
              />
            ) : (
              <div className="text-center">
                <NoDataFound />
              </div>
            )}
          </div>
        )}
        {activeTab === "Option Strategy" && (
          <div className="tab-content shadow-sm rounded ">
            {data && data?.length > 0 ? (
              <GridExample
                columns={getColForOption}
                data={data}
                checkBox={false}
              />
            ) : (
              <div className="text-center">
                <NoDataFound />
              </div>
            )}
          </div>
        )}
        {activeTab === "Pattern" && (
          <div className="tab-content shadow-sm rounded ">
            {data && data?.length > 0 ? (
              <GridExample
                columns={getColForPattern}
                data={data}
                checkBox={false}
              />
            ) : (
              <NoDataFound />
            )}
          </div>
        )}
      </div>

      {/* Scalping Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        dialogClassName="custom-modal-dialog">
        <Modal.Header className="card-bg-color" closeButton>
          <Modal.Title className="card-text-Color">View Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <ul
              className="nav nav-pills shadow rounded-pill p-1"
            >
              <li className="nav-item">
                <button
                  className={`nav-link ${modalActiveTab === "Description" ? "active" : ""
                    } rounded-pill`}
                  onClick={() => setModalActiveTab("Description")}
                  style={{
                    padding: "10px 20px",
                    margin: "5px",
                    border: "none",
                    outline: "none",
                  }}>
                  Description
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${modalActiveTab === "Parameters" ? "active" : ""
                    } rounded-pill`}
                  onClick={() => setModalActiveTab("Parameters")}
                  style={{
                    padding: "10px 20px",
                    margin: "5px",
                    border: "none",
                    outline: "none",
                  }}>
                  Parameters
                </button>
              </li>
            </ul>
          </div>
          <div className="mt-3 modal-content-scroll">
            {modalActiveTab === "Description" && (
              <div className="modal-description text-xs">
                {selectedRowData && selectedRowData[0]?.Description
                  ? formatDescription(selectedRowData[0].Description)
                  : "No description available."}
              </div>
            )}
            {modalActiveTab === "Parameters" && (
              <div className="modal-container">
                {parameters ? (
                  <div className="parameters-card card-bg-color">
                    <h2 className="parameters-title text-white">
                      Trade Parameters
                    </h2>
                    <div className="parameters-grid">
                      {[
                        { label: "Symbol", value: parameters?.Symbol },
                        { label: "Trading Type", value: parameters?.Trading },
                        { label: "Trade Type", value: parameters?.TType },
                        {
                          label: "Measurement Type",
                          value: parameters?.TStype,
                        },
                        {
                          label: "Target",
                          value: parameters?.["Booking Point"],
                        },
                        {
                          label: "Re-entry",
                          value: parameters?.["Re-entry Point"],
                        },
                        { label: "Lot", value: parameters?.Quantity },
                        { label: "Exit Day", value: parameters?.ExitDay },
                        { label: "Entry Time", value: parameters?.EntryTime },
                        { label: "Exit Time", value: parameters?.ExitTime },
                        {
                          label: "Trade Execution",
                          value: parameters?.TradeExecution,
                        },
                        {
                          label: "Target Selection",
                          value: parameters?.Targetselection,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="parameters-item card-bg-color">
                          <span className="parameters-label card-text-Color">
                            {item.label}:
                          </span>
                          <span className="parameters-value card-text-Color">
                            {item.value || "N/A"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="no-parameters card-text-Color">
                    No parameters available.
                  </p>
                )}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="card-text-Color card-bg-color"
            onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Option Strategy Modal */}
      <Modal
        show={showOptionModal}
        onHide={() => setShowOptionModal(false)}
        size="lg"
        centered
        dialogClassName="custom-modal-dialog">
        <Modal.Header className="card-bg-color" closeButton>
          <Modal.Title className="card-text-Color">
            Option Strategy Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <ul
              className="nav nav-pills shadow rounded-pill p-1"
            >
              <li className="nav-item">
                <button
                  className={`nav-link ${optionModalActiveTab === "Description" ? "active" : ""
                    } rounded-pill`}
                  onClick={() => setOptionModalActiveTab("Description")}
                  style={{
                    padding: "10px 20px",
                    margin: "5px",
                    border: "none",
                    outline: "none",
                  }}>
                  Description
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${optionModalActiveTab === "Parameters" ? "active" : ""
                    } rounded-pill`}
                  onClick={() => setOptionModalActiveTab("Parameters")}
                  style={{
                    padding: "10px 20px",
                    margin: "5px",
                    border: "none",
                    outline: "none",
                  }}>
                  Parameters
                </button>
              </li>
            </ul>
          </div>
          <div className="mt-3 modal-content-scroll">
            {optionModalActiveTab === "Description" ? (
              <div className="option-modal-container">
                <div className="option-image-container">
                  {selectedOptionData && selectedOptionData["image_data"] ? (
                    <img
                      src={`data:image/png;base64,${selectedOptionData["image_data"]}`}
                      alt="Option Strategy"
                      className="img-fluid rounded shadow-sm option-image"
                    />
                  ) : (
                    <div className="no-image">No Image Available</div>
                  )}
                </div>
                <div className="option-details-container">
                  <h5>{selectedOptionData?.["Strategy Name"]}</h5>
                  <p>
                    <strong>Market Outlook:</strong>{" "}
                    {selectedOptionData?.["View (Market Outlook)"]}
                  </p>
                  <p>
                    <strong>Strategy:</strong>{" "}
                    {selectedOptionData?.["Strategy"]}
                  </p>
                    <p>
                    <strong>Reward (Max Profit):</strong>{" "}
                    {selectedOptionData?.["Reward (Max Profit)"]}
                  </p>
                  <p>
                    <strong>Risk (Max Loss):</strong>{" "}
                    {selectedOptionData?.["Risk (Max Loss)"]}
                  </p>
                
                  <p>
                    <strong>Breakeven Point:</strong>{" "}
                    {selectedOptionData?.["Breakeven Point"]}
                  </p>
                  <p>
                    <strong>Max Profit When :</strong>{" "}
                    {selectedOptionData?.["Max Profit When?"]?.Downward}
                    {selectedOptionData?.["Max Profit When?"]?.Upward}
                  </p>
                  <p>
                    <strong>Max Loss When:</strong>{" "}
                    {selectedOptionData?.["Max Loss When?"]}
                  </p>
                </div>
              </div>
            ) : (
              <div className="option-parameters-container">
                <div className="modal-container">
                  {parameters ? (
                    <div className="parameters-card card-bg-color">
                      <h2 className="parameters-title text-white">
                        Trade Parameters
                      </h2>
                      <div className="parameters-grid">
                        {[
                          { label: "Option type", value: parameters?.STG },
                          {
                            label: "Risk Handle",
                            value: parameters?.Targettype,
                          },
                          { label: "Symbol", value: parameters?.Symbol },
                          {
                            label: "Expiry Type",
                            value: parameters?.Expirytype,
                          },
                          {
                            label: "Measurement Type",
                            value: parameters?.strategytype,
                          },
                          {
                            label: "Target",
                            value: parameters?.["Target value"],
                          },
                          {
                            label: "Stoploss",
                            value: parameters?.["SL value"],
                          },
                          {
                            label: "Trade execution",
                            value: parameters?.TradeExecution,
                          },
                          { label: "Lot", value: parameters?.["Lot Size"] },
                          {
                            label: "Exit Day",
                            value: parameters?.["Product Type"],
                          },
                          {
                            label: "Entry Time",
                            value: parameters?.["Entry Time"],
                          },
                          {
                            label: "Exit Time",
                            value: parameters?.["Exit Time"],
                          },
                          {
                            label: "Strike Type",
                            value: parameters?.StrikeType,
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="parameters-item card-bg-color">
                            <span className="parameters-label card-text-Color">
                              {item.label}:
                            </span>
                            <span className="parameters-value card-text-Color">
                              {item.value || "N/A"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="no-parameters card-text-Color">
                      No parameters available.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="card-text-Color card-bg-color"
            onClick={() => setShowOptionModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Pattern Modal */}
      <Modal
        show={showPatternModal}
        onHide={() => setShowPatternModal(false)}
        size="lg"
        centered
        dialogClassName="custom-modal-dialog">
        <Modal.Header className="card-bg-color" closeButton>
          <Modal.Title className="card-text-Color">Pattern Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <ul
              className="nav nav-pills shadow rounded-pill p-1"
            >
              <li className="nav-item">
                <button
                  className={`nav-link ${patternModalActiveTab === "Description" ? "active" : ""
                    } rounded-pill`}
                  onClick={() => setPatternModalActiveTab("Description")}
                  style={{
                    padding: "10px 20px",
                    margin: "5px",
                    border: "none",
                    outline: "none",
                  }}>
                  Description
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${patternModalActiveTab === "Parameters" ? "active" : ""
                    } rounded-pill`}
                  onClick={() => setPatternModalActiveTab("Parameters")}
                  style={{
                    padding: "10px 20px",
                    margin: "5px",
                    border: "none",
                    outline: "none",
                  }}>
                  Parameters
                </button>
              </li>
            </ul>
          </div>
          <div className="mt-3 modal-content-scroll">
            {patternModalActiveTab === "Description" ? (
              <div className="pattern-modal-container">
                <div className="pattern-image-container">
                  {selectedPatternData && selectedPatternData["image_data"] ? (
                    <img
                      src={`data:image/png;base64,${selectedPatternData["image_data"]}`}
                      alt="Pattern"
                      className="img-fluid rounded shadow-sm pattern-image"
                    />
                  ) : (
                    <div className="no-image">No Image Available</div>
                  )}
                </div>
                <div className="pattern-details-container">
                  <h5>{selectedPatternData?.["Pattern"]}</h5>
                  <p className="pattern-description">
                    {selectedPatternData?.["Description"]}
                  </p>
                  <p className="pattern-type">
                    <strong>Type:</strong>{" "}
                    {selectedPatternData?.["PatternType"]}
                  </p>
                  <p className="pattern-ttype">
                    <strong>TType:</strong> {selectedPatternData?.["TType"]}
                  </p>
                </div>
              </div>
            ) : (
              <div className="pattern-parameters-container">
                <div className="modal-container">
                  {parameters ? (
                    <div className="parameters-card card-bg-color">
                      <h2 className="parameters-title text-white">
                        Trade Parameters
                      </h2>
                      <div className="parameters-grid">
                        {[
                          {
                            label: "Pattern Name",
                            value: parameters?.TradePattern,
                          },
                          { label: "Pattern Type", value: parameters?.Pattern },
                          { label: "Symbol", value: parameters?.Symbol },
                          { label: "Trade type", value: parameters?.TType },
                          { label: "Quantity", value: parameters?.Quantity },
                          { label: "Time Frame", value: parameters?.TimeFrame },
                          {
                            label: "Measuremnet type",
                            value: parameters?.TStype,
                          },
                          {
                            label: "Target",
                            value: parameters?.["Target value"],
                          },
                          {
                            label: "Stoploss",
                            value: parameters?.["SL value"],
                          },
                          {
                            label: "Trade Execution",
                            value: parameters?.TradeExecution,
                          },
                          { label: "Exit Day", value: parameters?.ExitDay },
                          { label: "Entry Time", value: parameters?.EntryTime },
                          { label: "Exit Time", value: parameters?.ExitTime },
                          {
                            label: "Strike Type",
                            value: parameters?.["Strike Price"],
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="parameters-item card-bg-color">
                            <span className="parameters-label card-text-Color">
                              {item.label}:
                            </span>
                            <span className="parameters-value card-text-Color">
                              {item.value || "N/A"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="no-parameters card-text-Color">
                      No parameters available.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="card-text-Color card-bg-color"
            variant="secondary"
            onClick={() => setShowPatternModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewGroup;
