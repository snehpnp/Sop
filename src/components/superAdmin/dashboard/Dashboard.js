import React, { useState, useEffect } from 'react';
import { superAdminDashboard } from '../../CommonAPI/SuperAdmin'
import Loader from '../../../ExtraComponent/Loader';


const Dashboards = () => {
    const [dashData, setData] = useState([]);

    useEffect(() => {
        SuperAdminDashboardData();
    }, []);

    const SuperAdminDashboardData = async () => {
        await superAdminDashboard()
            .then((response) => {
                if (response.Status) {
                    setData(response.Data)
                }
                else {
                    setData([])
                }
            })
            .catch((err) => {
                console.log("Error in fatching the Dashboard Details", err)
            })
    };



    return (
        <div>
            {
                dashData?.length == 0 ? <Loader /> :
                    <div className="container-fluid" style={{marginTop:"2rem"}}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="iq-card ">
                                            <div className="iq-card-header d-flex justify-content-between">
                                                <div className="iq-header-title">
                                                    <h4 className="card-title">Total account</h4>
                                                </div>
                                            </div>
                                            <div className="iq-card-body">
                                                <div className="progress mt-3">
                                                    <div
                                                        className="progress-bar bg-primary"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-warning"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-danger"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-success"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-secondary"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                </div>
                                                <div className="table-responsive mt-4">
                                                    <table className="table mb-0 table-borderless">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-online mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Total: </h4>
                                                                </td>
                                                                <td>
   
                                                                    <span >{dashData?.[0]?.['Total account']}</span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="iq-card ">
                                            <div className="iq-card-header d-flex justify-content-between">
                                                <div className="iq-header-title">
                                                    <h4 className="card-title">Total On account</h4>
                                                </div>
                                            </div>
                                            <div className="iq-card-body">
                                                <div className="progress mt-3">
                                                    <div
                                                        className="progress-bar bg-primary"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-warning"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-danger"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-success"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-secondary"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                </div>
                                                <div className="table-responsive mt-4">
                                                    <table className="table mb-0 table-borderless">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-blue mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Active: </h4>
                                                                </td>
                                                                <td>
                                                                    <span>{dashData?.[0]?.['Total On account']}</span>
                                                                </td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="iq-card ">
                                            <div className="iq-card-header d-flex justify-content-between">
                                                <div className="iq-header-title">
                                                    <h4 className="card-title">Total Off account</h4>
                                                </div>
                                            </div>
                                            <div className="iq-card-body">
                                                <div className="progress mt-3">
                                                    <div
                                                        className="progress-bar bg-primary"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-warning"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-danger"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-success"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-secondary"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                </div>
                                                <div className="table-responsive mt-4">
                                                    <table className="table mb-0 table-borderless">
                                                        <tbody>

                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-primary mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Expired: </h4>
                                                                </td>
                                                                <td>
                                                                    <span>{dashData?.[0]?.['Total Off account']}</span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}

export default Dashboards
