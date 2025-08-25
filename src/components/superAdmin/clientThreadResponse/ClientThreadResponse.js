import React, { useState, useEffect } from 'react';
import { get_User_Data } from '../../CommonAPI/Admin'
import { get_Trade_Response } from '../../CommonAPI/User'
import Loader from '../../../ExtraComponent/Loader'
import GridExample from '../../../ExtraComponent/CommanDataTable'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { columns3, columns2, columns1, columns, columns5, columns4 } from './TradeReponseColumn'
import { getCompanyName, getClientName, getClientScript, ClientTradeResponse, getStrategyType } from '../../CommonAPI/SuperAdmin'
import NoDataFound from '../../../ExtraComponent/NoDataFound';
import Content from '../../../ExtraComponent/Content';
import { map } from 'jquery';
import { index } from 'd3';

// Utility function to set the date
const setDate = (date, daysToAdd) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + daysToAdd);
    return newDate;
};

const TradeResponse = () => {
    const CompanyName = sessionStorage.getItem("CompanyName")
    const ClientName = sessionStorage.getItem("ClientName")
    const StrategyType = sessionStorage.getItem("StrategyType")


    const [selectStrategyType, setStrategyType] = useState(StrategyType || '')
    const [clientAllScript, setClientAllScript] = useState({ loading: true, data: [] })
    const [selectedRowData, setSelectedRowData] = useState('');
    const [ToDate, setToDate] = useState('');
    const [FromDate, setFromDate] = useState('');
    const [showTable, setShowTable] = useState(false)
    const [getAllComapny, setAllComapny] = useState([])
    const [getAllTradeData, setAllTradeData] = useState({ loading: true, data: [] })
    const [comapnyName, setCompanyName] = useState(CompanyName || '')
    const [allClientDetails, setAllClientDetails] = useState([])
    const [clientName, setClientName] = useState(ClientName || '')
    const [isLoading, setIsLoading] = useState(false)
    const [allStrategies, setAllStrategies] = useState([]); // State to hold all strategies


    const Username = localStorage.getItem('name')
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}.${month}.${day}`;


    // Select From Date
    const DefultToDate = new Date();
    DefultToDate.setDate(DefultToDate.getDate() + 1);
    const year1 = DefultToDate.getFullYear();
    const month1 = String(DefultToDate.getMonth() + 1).padStart(2, '0');
    const day1 = String(DefultToDate.getDate()).padStart(2, '0');
    const Defult_To_Date = `${year1}.${month1}.${day1}`;

    // Date Formetor
    const convertDateFormat = (date) => {
        if (date == '') {
            return ''
        }
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    useEffect(() => {
        ComapnyDetails()
    }, [])

    useEffect(() => {
        clientDetails()
    }, [comapnyName])


    const ComapnyDetails = async () => {
        await getCompanyName()
            .then((response) => {
                if (response.Status) {
                    setAllComapny(response.Data)
                }
                else {
                    setAllComapny([])
                }
            })
            .catch((err) => {
                console.log("Error in fainding the service", err)
            })
    }

    const clientDetails = async (data) => {
        if (comapnyName == '') {
            return
        }
        const req = { comapnyName: comapnyName }
        await getClientName(req)
            .then((response) => {
                if (response.Status) {
                    setAllClientDetails(response.Data)
                }
                else {
                    setAllClientDetails([])
                }
            })
            .catch((err) => {
                console.log("Error in fainding the service", err)
            })
    }



    const GetTradeResposne = async () => {
        if (selectStrategyType == '' || comapnyName == '' || clientName == '') {
            return
        }

        const data = { Data: selectStrategyType, Username: clientName, Companyname: comapnyName }
        await getClientScript(data)
            .then((response) => {
                if (response.Status) {
                    // const filterLiveTrade = response.Data.filter((item) => {
                    //     return item.TradeExecution == 'Live Trade'
                    // })
                    setClientAllScript({
                        loading: false,
                        data: response.Data
                    })
                }
                else {
                    setClientAllScript({
                        loading: false,
                        data: []
                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the user data", err)
            })

    }

    useEffect(() => {
        GetTradeResposne()
    }, [selectStrategyType, FromDate, ToDate])

    const handleRowSelect = (rowData) => {
        setSelectedRowData(rowData);
    };



    const handleSubmit = async () => {
        setIsLoading(true)
        if (comapnyName == '') {
            Swal.fire({
                 // background: "#1a1e23 ",
                backdrop: "#121010ba",
                confirmButtonColor: "#1ccc8a",
                title: "Please Select the Company Name",
                icon: "info",
                timer: 1500,
                timerProgressBar: true
            });
            return
        }
        if (selectStrategyType == '') {
            Swal.fire({
                 // background: "#1a1e23 ",
                backdrop: "#121010ba",
                confirmButtonColor: "#1ccc8a",
                title: "Please Select the Strategy Type",
                icon: "info",
                timer: 1500,
                timerProgressBar: true
            });
            return
        }

        const data = {
            Companyname: comapnyName,
            MainStrategy: selectStrategyType,
            Strategy: selectStrategyType == "Scalping" ? selectedRowData && selectedRowData.ScalpType : selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.STG : selectStrategyType == "Pattern" ? selectedRowData && selectedRowData.TradePattern : '',
            Symbol: selectStrategyType == "Scalping" || selectStrategyType == "Pattern" ? selectedRowData && selectedRowData.Symbol : selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.IName : '',
            Username: clientName,
            ETPattern: selectStrategyType == "Scalping" ? '' : selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.Targettype : selectStrategyType == "Pattern" ? selectedRowData && selectedRowData.Pattern : '',
            Timeframe: selectStrategyType == "Pattern" ? selectedRowData && selectedRowData.TimeFrame : '',
            From_date: convertDateFormat(FromDate == '' ? formattedDate : FromDate),
            To_date: convertDateFormat(ToDate == '' ? Defult_To_Date : ToDate),
            Group: selectStrategyType == "Scalping" || selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.GroupN : "",
            TradePattern: "",
            PatternName: ""
        }

        await ClientTradeResponse(data)

            .then((response) => {
                if (response.Status) {
                    setAllTradeData({
                        loading: false,
                        data: response.Data,

                    })
                    setShowTable(true)
                }
                else {
                    Swal.fire({
                         // background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: "No Records found",
                        icon: "info",
                        timer: 1500,
                        timerProgressBar: true
                    });
                    setAllTradeData({
                        loading: false,
                        data: [],
                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding the All TradeData", err)
            })
        setIsLoading(false)

    }

    const getStrategy  = async () => {
        const res = await getStrategyType()
        setAllStrategies(res.Data); // Store all strategies in state
    }
    useEffect(() => { 
        getStrategy ()
    }, []);

    useEffect(() => {
        setShowTable(false)
    }, [selectStrategyType, FromDate, ToDate, selectedRowData])


    return (
        <Content
            Page_title={"Trade Response"}
            button_status={false}
            backbutton_status={true}
        >

            <div className="iq-card-body">
                <div className="was-validated ">
                    <div className='row'>
                        <div className="form-group col-lg-2">
                            <label>Select Company</label>
                            <select className="form-select" required=""
                                onChange={(e) => {
                                    setCompanyName(e.target.value)
                                    sessionStorage.setItem('CompanyName', e.target.value)
                                }}
                                value={comapnyName}
                            >
                                <option value={''}>Select Company</option>
                                {getAllComapny && getAllComapny.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group col-lg-2">
                            <label>Select Client Name</label>
                            <select className="form-select" required=""
                                onChange={(e) => {
                                    setClientName(e.target.value)
                                    sessionStorage.setItem("ClientName", e.target.value)
                                }}
                                value={clientName}
                            >
                                <option value={''}>Select Client Name</option>
                                {allClientDetails && allClientDetails.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group col-lg-2">
                            <label>Strategy Type</label>
                            <select className="form-select" required=""
                                onChange={(e) => {
                                    setStrategyType(e.target.value); // Set selected strategy
                                    sessionStorage.setItem("StrategyType", e.target.value);
                                }}
                                value={selectStrategyType}>
                                {allStrategies.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group col-lg-3">
                            <label>Select From Date</label>
                            <DatePicker className="form-select" selected={FromDate == '' ? formattedDate : FromDate} onChange={(date) => setFromDate(date)} />
                        </div>
                        <div className="form-group col-lg-3">
                            <label>Select To Date</label>
                            <DatePicker className="form-select" selected={ToDate == '' ? Defult_To_Date : ToDate} onChange={(date) => setToDate(date)} />

                        </div>
                    </div>
                </div>
                <div className="modal-body">
                    {
                        isLoading ? (
                            <Loader />
                        ) : clientAllScript.data && clientAllScript.data.length > 0 ? (
                            <GridExample
                                columns={
                                    selectStrategyType === "Scalping"
                                        ? columns
                                        : selectStrategyType === "Option Strategy"
                                            ? columns1
                                            : selectStrategyType === "Pattern"
                                                ? columns2
                                                : columns
                                }
                                data={clientAllScript.data}
                                onRowSelect={handleRowSelect}
                                checkBox={true}
                            />
                        ) : (
                            <NoDataFound />
                        )
                    }
                </div>

                <button className='btn btn-primary mt-2' onClick={handleSubmit}>Submit</button>

                {
                    showTable && <>
                        <div className='mt-3'>
                            <GridExample
                                columns={selectStrategyType === "Scalping" ? columns3 : selectStrategyType === "Option Strategy" ? columns4 : columns5}
                                data={getAllTradeData.data}
                                onRowSelect={handleRowSelect}
                                checkBox={false}
                            />
                        </div>

                    </>
                }
            </div>

        </Content>
    );
};

export default TradeResponse;
