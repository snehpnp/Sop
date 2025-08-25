import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Add_Group, deleteGroup, GetAllGroupService, GetGroupNames } from '../../CommonAPI/Admin';
import GridExample from '../../../ExtraComponent/CommanDataTable'
import AddForm from '../../../ExtraComponent/FormData2'
import { useFormik } from 'formik';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import NoDataFound from '../../../ExtraComponent/NoDataFound';
import Contnet from '../../../ExtraComponent/Content';
import { useNavigate } from 'react-router-dom';
import Content from '../../../ExtraComponent/Content';
import PillTabs from '../../../ExtraComponent/PillTabs';
import { Container, Row, Col } from "react-bootstrap";
import SuggestedBotCard from '../../user/UserDashboard/suggestedBotCard/SuggestedBotCard';
import { GetSingleChart, Option_Detail, ScalpingPositionDetails } from '../../CommonAPI/User';


const Strategygroup = () => {
    const [getGroupData, setGroupData] = useState({
        loading: true,
        data: []
    });
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const tabOptions = ["Scalping", "Option Strategy", "Pattern"];
    const [pillActiveTab, setPillActiveTab] = useState("Scalping");
    const [strategyData, setStrategyData] = useState({ parameters: {}, Description: "" });
    const [optionStrategyData, setOptionStrategyData] = useState({ parameters: {}, Description: [] });
    const [patternStrategyData, setPatternStrategyData] = useState({ parameters: {}, Description: [] });
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [filteredSuggestedBotdata, setFilteredSuggestedBotdata] = useState([]);
    const [suggestedBotdata, setSuggestedBotdata] = useState([]);




    const navigate = useNavigate();

    const columns = [
        {
            name: "S.No",
            label: "S.No",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowIndex = tableMeta.rowIndex;
                    return rowIndex + 1;
                }
            },
        },
        {
            name: "GroupName",
            label: "Bot Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "SubAdmin",
            label: "Created by",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value == '' ? "Admin" : value,
            }
        },
        {
            name: "Fund_Requierment",
            label: "Fund Required",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Risk",
            label: "Risk in %",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Time",
            label: "Time",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "PRtype",
            label: "Product Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Message",
            label: "Message",
            options: {
                filter: true,
                sort: true,
                width: '20%'
            }
        },

    ];

    const GetAllGroupDetails = async () => {
        try {
            await GetGroupNames()
                .then((response) => {
                    if (response.Status) {
                        setGroupData({
                            loading: false,
                            data: response.Data
                        });
                    } else {
                        setGroupData({
                            loading: false,
                            data: []
                        });
                    }
                })
                .catch((err) => {
                    console.log("Error Group data fetch error", err);
                });
        } catch {
            console.log("Error Group data fetch error");
        }
    };

    const handleViewDetails = async (title) => {
        try {
            const req = {
                Group: title,
                Strategy: pillActiveTab
            }

            if (pillActiveTab === "Scalping") {
                const res = await GetAllGroupService(req)
                if (res.Status) {
                    setStrategyData(prev => ({
                        ...prev,
                        parameters: res.Data?.[0]
                    }));
                }
                const req2 = {
                    PositionType: res.Data?.[0]?.FixedSM
                }
                const res2 = await ScalpingPositionDetails(req2);
                if (res2.status) {
                    setStrategyData(prev => ({
                        ...prev,
                        Description: res2.data?.[0]?.Description || "No description available"
                    }));
                }
            }

            else if (pillActiveTab === "Option Strategy") {
                const res = await GetAllGroupService(req)

                if (res.Status) {
                    setOptionStrategyData(prev => ({
                        ...prev,
                        parameters: res.Data?.[0]
                    }));

                    const req2 = {
                        StrategyName: res.Data?.[0]?.STG
                    }
                    const res2 = await Option_Detail(req2);
                    if (res2.status) {
                        setOptionStrategyData(prev => ({
                            ...prev,
                            Description: res2?.data[0]
                        }));

                    }
                }

            }

            else if (pillActiveTab === "Pattern") {
                const res = await GetAllGroupService(req)
                if (res.Status) {
                    setPatternStrategyData(prev => ({
                        ...prev,
                        parameters: res.Data?.[0]
                    }));

                    const req2 = {
                        Pattern: res.Data?.[0]?.Pattern,
                        PatternType: "CandleStick Pattern",
                        TType: ""
                    }
                    const res2 = await GetSingleChart(req2);
                    if (res2.status) {
                        setPatternStrategyData(prev => ({
                            ...prev,
                            Description: res2?.data[0]
                        }));

                    }
                }
            }

            setShowDetailsModal(true);
        } catch (error) {
            console.error("Error in handleViewDetails:", error);
        }
    };

    const strategies = []
    const getSuggestedBotData = async () => {
        try {
            const res = await GetGroupNames();
            if (res.Status) {
                setSuggestedBotdata(res.Data);
            } else {
                console.error("Error fetching group names:", res.Message);
            }
            return strategies.filter(strategy => strategy.strategyType === pillActiveTab);

        } catch (error) {
            console.error("Error fetching suggested bot data:", error);
        }
    };

    useEffect(() => {
        getSuggestedBotData();
    }, []);


    useEffect(() => {
        setFilteredSuggestedBotdata(
            suggestedBotdata.filter(
                (item) => item.StrategyType === pillActiveTab
            )
        );
    }, [pillActiveTab, suggestedBotdata]);



    useEffect(() => {
        GetAllGroupDetails();
    }, [refresh]);

    const formik = useFormik({
        initialValues: {
            Message: "",
            ProductType: "Intraday",
            TimeOrigin: "Weekly",
            Risk: "",
            FundReuirement: "",
            GroupName: "",
            StrategyType: "Scalping"
        },
        validate: values => {
            const errors = {};
            // if (!values.Message) {
            //     errors.Message = 'Please Enter Message';
            // }
            // } else if (!/^[A-Za-z\s]+$/.test(values.Message)) {
            //     errors.Message = 'Only letters are allowed in Message';
            // }
            // Check ProductType (if it is selected, don't show error)
            if (!values.ProductType || values.ProductType === "") {
                errors.ProductType = 'Please Select Product Type';
            }

            if (!values.Message || values.Message.trim() === "") {
                errors.Message = 'Please enter a Description.';
            }
            else if (values.Message.trim().split(/\s+/).length < 50) {
                errors.Message = 'Description must be at least 50 words.';
            }
            // Check TimeOrigin (if it is selected, don't show error)
            if (!values.TimeOrigin || values.TimeOrigin === "") {
                errors.TimeOrigin = 'Please Select Time Origin';
            }
            if (!values.Risk) {
                errors.Risk = 'Please Enter Risk %';
            }
            if (!values.FundReuirement) {
                errors.FundReuirement = 'Please enter Fund Required.';
            } else if (values.FundReuirement <= 0) {
                errors.FundReuirement = 'Fund Requirement must be greater than zero.';
            }


            if (!values.GroupName) {
                errors.GroupName = 'Please enter Bot Name.';
            } else if (values.GroupName <= 0) {
                errors.GroupName = 'Group Name cannot be zero.';
            }
            if (!values.StrategyType) {
                errors.StrategyType = 'Please select Strategy Type.';
            }


            return errors;
        },
        onSubmit: async (values) => {
            const data = {
                GroupName: values.GroupName,
                FundReuirement: values.FundReuirement,
                Risk: values.Risk.toString(),
                TimeOrigin: values.TimeOrigin,
                ProductType: values.ProductType,
                Message: values.Message,
                StrategyType: values.StrategyType
            };
            console.log(window.location.pathname);

            const StrategyType = data.StrategyType.split(' ')[0];




            navigate(`/admin/addscript/${StrategyType.toLowerCase()}`, {
                state: {
                    groupData: data
                }
            });


            return;

            await Add_Group(data)
                .then((response) => {
                    if (response.Status) {
                        setRefresh(!refresh)
                        Swal.fire({
                            // background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: 'Created successfully!',
                            text: response.message,
                            icon: 'success',
                            timer: 1500,
                            timerProgressBar: true
                        });
                        setTimeout(() => {
                            setShowModal(false);
                            formik.resetForm();
                        }, 1500);
                    } else {
                        Swal.fire({
                            // background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: 'Error',
                            text: response.message,
                            icon: 'error',
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                })
                .catch((err) => {

                    Swal.fire({
                        // background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: 'Error',
                        text: 'Group creation error!',
                        icon: 'error',
                        timer: 1500,
                        timerProgressBar: true
                    });
                });
        },
    });

    const handleCloseModal = () => {
        setShowModal(false);
        formik.resetForm();
    };

    const handleDeleteBot = async (title) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#1ccc8a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
            })
            if (result.isConfirmed) {
                const req = {
                    GroupName: title
                }
                const res = await deleteGroup(req);
                if (res.Status) {
                    Swal.fire({
                        // background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: 'Deleted successfully!',
                        text: res.message,
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true
                    });

                }
                else {
                    Swal.fire({
                        // background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: 'Error',
                        text: res.message,
                        icon: 'error',
                        timer: 1500,
                        timerProgressBar: true
                    });
                }

                setTimeout(() => {
                    getSuggestedBotData()
                }, 2000);
            }



        } catch (error) {
            console.error("Error deleting bot:", error);

        }
    }

    const fields = [

        {
            name: 'StrategyType',
            label: 'Stretegy Type',
            type: 'select',
            options: [
                { label: 'Scalping', value: 'Scalping' },
                { label: 'Option Strategy', value: 'Option Strategy' },
                { label: 'Pattern', value: 'Pattern' },
            ],
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'GroupName',
            label: 'Bot Name',
            type: 'text',
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'FundReuirement',
            label: 'Fund Required',
            type: 'text3',
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'Risk',
            label: 'Risk in %',
            type: 'text4',
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'TimeOrigin',
            label: 'Time Origin',
            type: 'select',
            options: [
                { label: 'Weekly', value: 'Weekly' },
                { label: 'Monthly', value: 'Monthly' },
                { label: 'Half Yearly', value: 'Half_Yearly' },
                { label: 'Yearly', value: 'Yearly' },
            ],
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'ProductType',
            label: 'Product Type',
            type: 'select',
            options: [
                { label: 'Intraday', value: 'Intraday' },
                { label: 'Delivery', value: 'Delivery' },
            ],
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'Message',
            label: 'Short Description',
            type: 'msgbox',
            label_size: 12,
            col_size: 12,
        },

    ];

    return (
        <Content
            Page_title={"📈 Strategy Group"}
            button_status={false}
            backbutton_status={true}
        >
            {/* <div className='d-flex justify-content-end align-items-center mb-4'>
                <button
                    type="button"
                    className='addbtn mx-3'
                    onClick={() => setShowModal(true)}
                >
                    Add New Bot
                </button>
            </div> */}
            <div>


                {/* <div className="iq-card-body">
                    {
                        getGroupData.data && getGroupData.data.length > 0 ?
                            (<div className="table-responsive customtable">
                                <GridExample
                                    columns={columns}
                                    data={getGroupData.data}
                                    checkBox={false}
                                />
                            </div>)
                            :
                            (<NoDataFound />)
                    }

                </div> */}


                <>
                    <PillTabs tabs={tabOptions} activeTab={pillActiveTab} setActiveTab={setPillActiveTab} />
                    {filteredSuggestedBotdata.length === 0 ? (
                        <NoDataFound />
                    ) : (
                        <Container className="py-4 mt-4">
                            <Row className="g-4">
                                {filteredSuggestedBotdata.map((strategy, index) => (
                                    <Col md={4} lg={4} xl={4} className="d-flex align-items-stretch" key={index}>
                                        <div style={{overflow: 'hidden', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', wordBreak: 'break-word', padding: 0, background: 'none', boxShadow: 'none', borderRadius: 0}}>
                                            <SuggestedBotCard
                                                title={strategy.GroupName}
                                                strategyType={strategy.StrategyType}
                                                description={strategy.Message}
                                                onViewDetails={() => handleViewDetails(strategy.GroupName)}
                                                handleDeleteBot={handleDeleteBot}
                                            />
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    )}
                </>
            </div>



            {showModal && (
                <div className="modal custom-modal d-flex" id="add_vendor" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <div className="form-header modal-header-title text-start mb-0">
                                    <h4 className="mb-0">Add New Bot</h4>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <hr />

                            <AddForm
                                fields={fields.filter(
                                    field => !field.showWhen || field.showWhen(formik.values)
                                )}
                                btn_name='Next'
                                formik={formik}
                                btn_name1_route={formik.values.StrategyType == "Scalping" ? "addscript/scalping" : formik.values.StrategyType == "Option Strategy" ? "addscript/optionstrategy" : "addscript/pattern"}
                            />
                        </div>
                    </div>
                </div>
            )}


            {showDetailsModal && (
                <div className="custom-modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30, 41, 59, 0.7)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className={"custom-modal-content card-bg-color card-text-Color"} style={{ background: '#fff', borderRadius: '18px', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', maxWidth: 600, width: '95%', padding: 0, position: 'relative', display: 'flex', flexDirection: 'column', maxHeight: '75vh' }}>
                        <div style={{ padding: '2.5rem 2rem 0.5rem 2rem', position: 'relative', flex: '0 0 auto' }}>

                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                style={{ position: 'absolute', top: 18, right: 18, zIndex: 2 }}
                                onClick={() => {
                                    setShowDetailsModal(false);
                                    setStrategyData({ parameters: {}, Description: '' });
                                    setOptionStrategyData({ parameters: {}, Description: [] });
                                }}
                            ></button>

                            <h3 className="fw-bold mb-3" style={{ color: '#1e293b', letterSpacing: '0.5px' }}>Strategy Details</h3>
                            <hr style={{ margin: '0 0 1.5rem 0', borderColor: '#e2e8f0' }} />
                        </div>
                        <div style={{ maxHeight: '45vh', overflowY: 'auto', padding: '0 2rem 0 2rem', flex: '1 1 auto' }}>
                            {pillActiveTab === 'Option Strategy' && optionStrategyData.Description && Object.keys(optionStrategyData.Description).length > 0 ? (
                                <div>
                                    {/* Option Strategy Image */}
                                    {optionStrategyData.Description.image_data && (
                                        <div className="text-center mb-3">
                                            <img
                                                src={`data:image/png;base64,${optionStrategyData.Description.image_data}`}
                                                alt="Strategy"
                                                style={{ maxWidth: '100%', maxHeight: 260, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                                            />
                                        </div>
                                    )}
                                    {/* Pattern Details if present */}
                                    {optionStrategyData.Description.Pattern && (
                                        <div className="">
                                            <h5 className="fw-bold" style={{ color: '#0ea5e9' }}>Pattern Details</h5>
                                            <div className="mb-2"><b>Pattern Type:</b> {optionStrategyData.Description.PatternType}</div>
                                            <div className="mb-2"><b>Pattern:</b> {optionStrategyData.Description.Pattern}</div>
                                            <div className="mb-2"><b>Description:</b> {optionStrategyData.Description.Description}</div>
                                            <div className="mb-2"><b>Trade Type:</b> {optionStrategyData.Description.TType}</div>
                                        </div>
                                    )}
                                    <h4 className="fw-bold mb-2" style={{ color: '#0ea5e9' }}>{optionStrategyData.Description["Strategy Name"]}</h4>
                                    <div className="mb-2"><b>Market Outlook:</b> {optionStrategyData.Description["View (Market Outlook)"]}</div>
                                    <div className="mb-2"><b>Strategy:</b> {optionStrategyData.Description["Strategy"]}</div>
                                    <div className="mb-2"><b>Risk (Max Loss):</b> {optionStrategyData.Description["Risk (Max Loss)"]}</div>
                                    <div className="mb-2"><b>Reward (Max Profit):</b> {optionStrategyData.Description["Reward (Max Profit)"]}</div>
                                    <div className="mb-2"><b>Breakeven Points:</b> <br />
                                        <span className="ms-3">Upper BE: {optionStrategyData.Description["Breakeven Points"]?.["Upper BE"]}</span><br />
                                        <span className="ms-3">Lower BE: {optionStrategyData.Description["Breakeven Points"]?.["Lower BE"]}</span>
                                    </div>
                                    <div className="mb-2"><b>Max Profit When?</b><br />
                                        <span className="ms-3">Upward: {optionStrategyData.Description["Max Profit When?"]?.Upward}</span><br />
                                        <span className="ms-3">Downward: {optionStrategyData.Description["Max Profit When?"]?.Downward}</span>
                                    </div>
                                    <div className="mb-2"><b>Max Loss When?</b> {optionStrategyData.Description["Max Loss When?"]}</div>
                                    {/* Parameters Section */}
                                    <div className="mt-4">
                                        <h5 className="fw-bold" style={{ color: '#0ea5e9' }}>Parameters</h5>
                                        <div className="container-fluid">
                                            <div className="row g-3">
                                                {[
                                                    { label: "Option type", value: optionStrategyData.parameters?.STG },
                                                    { label: "Risk Handle", value: optionStrategyData.parameters?.Targettype },
                                                    { label: "Symbol", value: optionStrategyData.parameters?.Symbol },
                                                    { label: "Expiry Type", value: optionStrategyData.parameters?.Expirytype },
                                                    { label: "Measurement Type", value: optionStrategyData.parameters?.strategytype },
                                                    { label: "Target", value: optionStrategyData.parameters?.["Target value"] },
                                                    { label: "Stoploss", value: optionStrategyData.parameters?.["SL value"] },
                                                    { label: "Trade execution", value: optionStrategyData.parameters?.TradeExecution },
                                                    { label: "Lot", value: optionStrategyData.parameters?.["Lot Size"] },
                                                    { label: "Exit Day", value: optionStrategyData.parameters?.["Product Type"] },
                                                    { label: "Entry Time", value: optionStrategyData.parameters?.["Entry Time"] },
                                                    { label: "Exit Time", value: optionStrategyData.parameters?.["Exit Time"] },
                                                    { label: "Strike Type", value: optionStrategyData.parameters?.StrikeType },
                                                ].map((item, idx) => (
                                                    <div className="col-md-6" key={idx}>
                                                        <div className=" ">
                                                            <label className="form-label fw-semibold" style={{ color: '#334155' }}>{item.label}</label>
                                                            <input
                                                                type="text"
                                                                className="form-control bg-light border-0 text-dark fw-semibold"
                                                                value={item.value || "N/A"}
                                                                disabled
                                                                style={{ borderRadius: '8px' }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : pillActiveTab === 'Pattern' && patternStrategyData.Description && Object.keys(patternStrategyData.Description).length > 0 ? (
                                <div>
                                    {/* Pattern Image */}
                                    {patternStrategyData.Description.image_data && (
                                        <div className="text-center mb-3">
                                            <img
                                                src={`data:image/png;base64,${patternStrategyData.Description.image_data}`}
                                                alt="Pattern"
                                                style={{ maxWidth: '100%', maxHeight: 260, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                                            />
                                        </div>
                                    )}
                                    <h4 className="fw-bold mb-2" style={{ color: '#0ea5e9' }}>{patternStrategyData.Description.Pattern}</h4>
                                    <div className="mb-2"><b>Pattern Type:</b> {patternStrategyData.Description.PatternType}</div>
                                    <div className="mb-2"><b>Description:</b> {patternStrategyData.Description.Description}</div>
                                    <div className="mb-2"><b>Trade Type:</b> {patternStrategyData.Description.TType}</div>
                                    {/* Pattern Parameters Section */}
                                    <div className="mt-4">
                                        <h5 className="fw-bold" style={{ color: '#0ea5e9' }}>Parameters</h5>
                                        <div className="container-fluid">
                                            <div className="row g-3">
                                                {[
                                                    { label: "Pattern Name", value: patternStrategyData.parameters?.TradePattern },
                                                    { label: "Pattern Type", value: patternStrategyData.parameters?.Pattern },
                                                    { label: "Symbol", value: patternStrategyData.parameters?.Symbol },
                                                    { label: "Trade type", value: patternStrategyData.parameters?.TType },
                                                    { label: "Quantity", value: patternStrategyData.parameters?.Quantity },
                                                    { label: "Time Frame", value: patternStrategyData.parameters?.TimeFrame },
                                                    { label: "Measurement type", value: patternStrategyData.parameters?.TStype },
                                                    { label: "Target", value: patternStrategyData.parameters?.["Target value"] },
                                                    { label: "Stoploss", value: patternStrategyData.parameters?.["SL value"] },
                                                    { label: "Trade Execution", value: patternStrategyData.parameters?.TradeExecution },
                                                    { label: "Exit Day", value: patternStrategyData.parameters?.ExitDay },
                                                    { label: "Entry Time", value: patternStrategyData.parameters?.EntryTime },
                                                    { label: "Exit Time", value: patternStrategyData.parameters?.ExitTime },
                                                    // { label: "Strike Type", value: patternStrategyData.parameters?.["Strike Price"] },
                                                ].map((item, idx) => (
                                                    <div className="col-md-6" key={idx}>
                                                        <div className=" ">
                                                            <label className="form-label fw-semibold" style={{ color: '#334155' }}>{item.label}</label>
                                                            <input
                                                                type="text"
                                                                className="form-control bg-light border-0 text-dark fw-semibold"
                                                                value={item.value || "N/A"}
                                                                disabled
                                                                style={{ borderRadius: '8px' }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : pillActiveTab === 'Scalping' && strategyData.Description ? (
                                <div>
                                    <h4 className="fw-bold mb-2" style={{ color: '#0ea5e9' }}>Description</h4>
                                    <div className="mb-3 card-text-Color" style={{ whiteSpace: 'pre-line', color: '#334155', fontSize: '1rem' }}>{strategyData.Description}</div>
                                    {/* Parameters Section for Scalping */}
                                    <div className="mt-4">
                                        <h5 className="fw-bold" style={{ color: '#0ea5e9' }}>Parameters</h5>
                                        <div className="container-fluid">
                                            <div className="row g-3">
                                                {[
                                                    { label: "Symbol", value: strategyData.parameters?.Symbol },
                                                    // { label: "Trading Type", value: strategyData.parameters?.Trading },
                                                    { label: "Trade Type", value: strategyData.parameters?.TType },
                                                    { label: "Measurement Type", value: strategyData.parameters?.TStype },
                                                    { label: "Target", value: strategyData.parameters?.["Booking Point"] },
                                                    { label: "Re-entry", value: strategyData.parameters?.["Re-entry Point"] },
                                                    { label: "Lot", value: strategyData.parameters?.Quantity },
                                                    { label: "Exit Day", value: strategyData.parameters?.ExitDay },
                                                    { label: "Entry Time", value: strategyData.parameters?.EntryTime },
                                                    { label: "Exit Time", value: strategyData.parameters?.ExitTime },
                                                    { label: "Trade Execution", value: strategyData.parameters?.TradeExecution },
                                                    { label: "Target Selection", value: strategyData.parameters?.Targetselection },
                                                ].map((item, idx) => (
                                                    <div className="col-md-6" key={idx}>
                                                        <div className=" ">
                                                            <label className="form-label fw-semibold" style={{ color: '#334155' }}>{item.label}</label>
                                                            <input
                                                                type="text"
                                                                className="form-control bg-light border-0 text-dark fw-semibold"
                                                                value={item.value || "N/A"}
                                                                disabled
                                                                style={{ borderRadius: '8px' }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="alert alert-info">No description available.</div>
                            )}
                        </div>
                        <div className="d-flex justify-content-end mt-4" style={{ padding: '0 2rem 2rem 2rem', flex: '0 0 auto' }}>
                            {/* <button
                                type="button"
                                className="addbtn px-3 py-1 rounded-pill me-2"
                                style={{ fontSize: '0.95rem' }}
                                onClick={() => {
                                    // TODO: Add your logic for adding to script here
                                    // handleAdd to script()
                                }}
                            >
                                Add to script
                            </button> */}
                            <button
                                type="button"
                                className="btn btn-outline-primary px-3 py-1 rounded-pill"
                                style={{ fontSize: '0.95rem' }}
                                onClick={() => {
                                    setShowDetailsModal(false);
                                    setStrategyData({ parameters: {}, Description: '' });
                                    setOptionStrategyData({ parameters: {}, Description: [] });
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </Content >
    );
};

export default Strategygroup;