import React, { useState, useEffect } from 'react';
import { GetAdminDashboard, AdmindashboardGraph, AdmindashboardData } from '../../CommonAPI/Admin'
import { AgChartsReact } from 'ag-charts-react';


const AdminDashboardChart = () => {
    const [dashData, setData] = useState({
        loading: true,
        data: []
    });
    const [Data2, setData2] = useState({
        data: "",
        data1: ""
    });
    const [Data1, setData1] = useState({
        loading: true,
        data: []
    });





    const options = {
        data: Data1 && Data1.data,
        series: [{ type: "bar", xKey: "ServiceStartDate", yKey: "Credit Use" }],
        axes: [
            {
                type: 'category',
                position: 'bottom',
                title: {
                    text: 'Service Start Date',
                },
            },
            {
                type: 'number',
                position: 'left',
                title: {
                    text: 'Credit Use',
                },
            },
        ],
        zoom: {
            enabled: true,
        }
    };



    // const GetAdminDashboardData = async () => {
    //     await GetAdminDashboard()
    //         .then((response) => {
    //             if (response.Status) {
    //                 setData({
    //                     loading: false,
    //                     data: response.Data
    //                 })
    //             }
    //             else {
    //                 setData({
    //                     loading: false,
    //                     data: []
    //                 })

    //             }

    //         })
    //         .catch((err) => {

    //         })

    // };

    // useEffect(() => {
    //     GetAdminDashboardData();
    // }, []);

    const GetDashboardGraphData = async () => {
        await AdmindashboardGraph()
            .then((response) => {
                if (response.Status) {
                    setData2({
                        loading: false,
                        data: response.TotalAccount,
                        data1: response.ammount
                    })
                }
                else {
                    setData2({
                        loading: false,
                        data: "",
                        data1: ""
                    })

                }

            })
            .catch((err) => {
                console.log("Error in fatching the Dashboard Details", err)
            })
    }

    const GetDashboardData = async () => {

        await AdmindashboardData()
            .then((response) => {
                if (response.Status) {
                    setData1({
                        loading: false,
                        data: response.Data
                    })
                }
                else {
                    setData1({
                        loading: false,
                        data: []
                    })

                }

            })
            .catch((err) => {
                console.log("Error in fatching the Dashboard Details", err)
            })
    }

    useEffect(() => {
        GetDashboardGraphData()
        GetDashboardData()
    }, [])



    return (
        <div className="col-lg-8">
            <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                        {/* <h3 className="card-title">Earning Per Day</h3> */}
                    </div>
                </div>
                <AgChartsReact options={options} />

            </div>
        </div>
    )
}

export default AdminDashboardChart
