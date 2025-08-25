import React, { useState, useEffect } from 'react'
import { GetClientService, GetClientLogs, checkbalanceAdmin } from '../../CommonAPI/Admin'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { ClientActivityPage } from './UserAllColumn'
import NoDataFound from '../../../ExtraComponent/NoDataFound';
import Content from '../../../ExtraComponent/Content';

const Clientactivity = () => {
    const Username = sessionStorage.getItem('Username')
    // set Defult Date 
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Set From Date to one month before today
    const fromDateObj = new Date();
    fromDateObj.setMonth(fromDateObj.getMonth() - 1);
    const fromYear = fromDateObj.getFullYear();
    const fromMonth = String(fromDateObj.getMonth() + 1).padStart(2, '0');
    const fromDay = String(fromDateObj.getDate()).padStart(2, '0');
    const formattedFromDate = `${fromYear}-${fromMonth}-${fromDay}`;

    // Select To Date (today)
    const DefultToDate = new Date();
    DefultToDate.setDate(DefultToDate.getDate());
    const year1 = DefultToDate.getFullYear();
    const month1 = String(DefultToDate.getMonth() + 1).padStart(2, '0');
    const day1 = String(DefultToDate.getDate()).padStart(2, '0');
    const Defult_To_Date = `${year1}-${month1}-${day1}`;

    const [ToDate, setToDate] = useState(Defult_To_Date);
    const [FromDate, setFromDate] = useState(formattedFromDate);
    const [getClientActivityDetails, setClientActivityDetails] = useState({ loading: true, data: [] })
    const [getUserName, setUserName] = useState({ loading: true, data: [] })
    const [selectUserName, setSelectUserName] = useState('All')
    const [adminBalance, setAdminBalance] = useState(0);

    const GetAllUserDetails = async () => {
        try {
            await GetClientService()
                .then((response) => {

                    if (response.Status) {
                        setUserName({
                            loading: false,
                            data: response.Data
                        })
                    }
                    else {
                        setUserName({
                            loading: false,
                            data: []
                        })
                    }
                })
                .catch((err) => {
                    console.log("Error in Group data fetch", err)
                })
        }
        catch {
            console.log("Error in Group data fetch")
        }
    }

    const fetchAdminBalance = async () => {
        try {
            const response = await checkbalanceAdmin();
            setAdminBalance(response["Admin Balance"]);
        } catch (error) {
            console.error("Error fetching admin balance:", error);

        }
    }
    useEffect(() => {
        GetAllUserDetails()
        fetchAdminBalance()
    }, [])

    const getClientTetails = async () => {
        const data = { User: selectUserName, From_date: FromDate == "" ? formattedDate : FromDate, To_date: ToDate == "" ? Defult_To_Date : ToDate }
        await GetClientLogs(data)
            .then((response) => {
                if (response.Status) {
                    setClientActivityDetails({
                        loading: false,
                        data: response.Data
                    })
                }
                else {
                    setClientActivityDetails({
                        loading: false,
                        data: []
                    })
                }
            })
            .catch((err) => {
                console.log("Error In finding the client details", err)
            })
    }

    useEffect(() => {
        getClientTetails()
    }, [selectUserName, ToDate, FromDate])



    return (
        <Content
            Page_title={" 📉 Client Activity"}
            button_status={false}
            backbutton_status={true}
        >

            <div className="iq-card-body">

                <div className="d-flex justify-content-end align-items-center">
                    <div className="d-flex justify-content-center align-items-center bg-light border border-success rounded px-3 py-2 shadow-sm text-end">
                        <div className="text-muted" style={{ fontSize: '0.85rem' }}> <strong>Admin Balance : </strong> </div>
                        <div className="text-success fw-bold fs-5">₹ {adminBalance}</div>
                    </div>
                </div>


                <form>
                    <div className="row">


                        <div className="form-group col-md-4">
                            <label htmlFor="validationDefault01">Select Username </label>
                            <select className="form-select" required=""
                                onChange={(e) => {
                                    setSelectUserName(e.target.value)
                                    sessionStorage.setItem("Username", e.target.value)
                                }}
                                value={selectUserName}
                            >
                                <option value="All">All</option>

                                {getUserName.data && getUserName.data.map((item, index) =>

                                    <option value={item.Username} key={index}>{item.Username}</option>




                                )}
                            </select>
                        </div>
                        <div className="form-group col-lg-4 ">
                            <label>Select From Date</label>
                            <DatePicker className="form-select" selected={FromDate} onChange={(date) => setFromDate(date)} />

                        </div>
                        <div className="form-group col-lg-4">
                            <label>Select To Date</label>
                            <DatePicker className="form-select" selected={ToDate} onChange={(date) => setToDate(date)} />
                        </div>
                    </div>

                </form>
                <div className="modal-body">
                    {
                        getClientActivityDetails.data && getClientActivityDetails.data.length > 0 ?
                            (<FullDataTable
                                columns={ClientActivityPage()}
                                data={getClientActivityDetails.data}
                                checkBox={false}
                            />)
                            :
                            (<NoDataFound />)
                    }
                </div>

            </div>

        </Content>
    )
}

export default Clientactivity
