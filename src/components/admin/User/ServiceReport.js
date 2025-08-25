import React, { useState, useEffect } from 'react'
import { Get_All_Service, get_User_Data } from '../../CommonAPI/Admin'
import { Eye, Trash2 } from 'lucide-react';
import Loader from '../../../ExtraComponent/Loader'
import FullDataTable from '../../../ExtraComponent/CommanDataTable'
import { ReportColumns5, ReportColumns4, ReportColumns3 } from './UserAllColumn'
import NoDataFound from '../../../ExtraComponent/NoDataFound';
import Content from '../../../ExtraComponent/Content';


const Userlog = () => {

    const StrategyType = sessionStorage.getItem("StrategyType")


    const [showModal, setShowModal] = useState(false)
    const [getServiceDetails, setServiceDetails] = useState({
        loading: true,
        data: []
    })

    const [getUserData, setUserData] = useState({
        loading: true,
        data: []
    })



    const [selectStrategyType, setStrategyType] = useState(StrategyType || '')

    const getAllServiceGiven = async () => {
        if (selectStrategyType == '') {
            return ""
        }
        const data = { Strategy: selectStrategyType && selectStrategyType == "Scalping" ? "NewScalping" : selectStrategyType }
        await Get_All_Service(data)
            .then((response) => {
                if (response.Status) {

                    setServiceDetails({
                        loading: false,
                        data: response.Data
                    })
                }
                else {
                    setServiceDetails({
                        loading: false,
                        data: []
                    })

                }
            })
            .catch((err) => {
                console.log("Error in fainding the service", err)
            })
    }


    useEffect(() => {
        getAllServiceGiven()
    }, [selectStrategyType])

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
            name: "Action",
            label: "View",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {

                    return <Eye onClick={(e) => {

                        setShowModal(!showModal);
                        const rowDataWithKeys = {};
                        columns.forEach((column, index) => {
                            rowDataWithKeys[column.name] = tableMeta.rowData[index];
                        });

                        handleModal(rowDataWithKeys)
                    }} />
                }
            }
        },
        {
            name: "Total Service",
            label: "Total Service",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Username",
            label: "Username",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "UsedService",
            label: "UsedService",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "NFO",
            label: "NFO",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "NSE",
            label: "NSE",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "MCX",
            label: "MCX",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "Multi Conditional",
            label: "Scalping",
            options: {
                filter: true,
                sort: true,
            }
        },






    ];

    const columns1 = [
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
            name: "Action",
            label: "View",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <Eye onClick={(e) => {
                        setShowModal(!showModal);
                        const rowDataWithKeys = {};
                        columns.forEach((column, index) => {
                            rowDataWithKeys[column.name] = tableMeta.rowData[index];
                        });
                        handleModal(rowDataWithKeys)
                    }} />


                }
            }
        },
        {
            name: "Total Service",
            label: "Total Service",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Username",
            label: "Username",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "UsedService",
            label: "UsedService",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "LongStrangle",
            label: "LongStrangle",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ShortStrangle",
            label: "ShortStrangle",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "LongStraddle",
            label: "LongStraddle",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ShortStraddle",
            label: "ShortStraddle",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "LongIronButterfly",
            label: "LongIronButterfly",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ShortIronButterfly",
            label: "ShortIronButterfly",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "LongIronCondor",
            label: "LongIronCondor",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ShortIronCondor",
            label: "ShortIronCondor",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "BearCallSpread",
            label: "BearCallSpread",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "BearPutSpread",
            label: "BearPutSpread",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "BullCallSpread",
            label: "BullCallSpread",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "BullPutSpread",
            label: "BullPutSpread",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "BullCallLadder",
            label: "BullCallLadder",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "BullPutLadder",
            label: "BullPutLadder",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "CoveredCall",
            label: "CoveredCall",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "CoveredPut",
            label: "CoveredPut",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "LongCollar",
            label: "LongCollar",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ShortCollar",
            label: "ShortCollar",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "RatioCallSpread",
            label: "RatioCallSpread",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "RatioPutSpread",
            label: "RatioPutSpread",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "LongShifting",
            label: "LongShifting",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ShortShifting",
            label: "ShortShifting",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "LongFourLegStrategy",
            label: "LongFourLegStrategy",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ShortFourLegStrategy",
            label: "ShortFourLegStrategy",
            options: {
                filter: true,
                sort: true,
            }
        },
    ];

    const columns2 = [
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
            name: "Action",
            label: "View",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <Eye onClick={(e) => {
                        setShowModal(!showModal);
                        const rowDataWithKeys = {};
                        columns.forEach((column, index) => {
                            rowDataWithKeys[column.name] = tableMeta.rowData[index];
                        });
                        handleModal(rowDataWithKeys)
                    }} />
                }
            }
        },
        {
            name: "Total Service",
            label: "Total Service",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Username",
            label: "Username",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "UsedService",
            label: "Used Service",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "NFO",
            label: "NFO",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "NSE",
            label: "NSE",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "MCX",
            label: "MCX",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Candlestickpattern",
            label: "Candlestick Pattern",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ChartPattern",
            label: "Charting Pattern",
            options: {
                filter: true,
                sort: true,
            }
        },




    ];

    useEffect(() => {
        setStrategyType(StrategyType || 'Scalping')
    }, []);


    const handleModal = async (rowIndex) => {
        const data = { Data: selectStrategyType, Username: rowIndex?.Username }


        await get_User_Data(data)
            .then((response) => {
                if (response.Status) {
                    if (selectStrategyType === "Scalping") {
                        setUserData({
                            loading: false,
                            data: response.NewScalping
                        })
                    }
                    else {
                        setUserData({
                            loading: false,
                            data: response.Data
                        })
                    }

                }
                else {
                    setUserData({
                        loading: false,
                        data: []
                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the user data", err)
            })
    }

    return (
        <>
            <Content
                Page_title={" 📉 Service Report"}
                button_status={false}
                backbutton_status={true}

            >

                <div className="iq-card-body">

                    <div className="was-validated ">
                        <div className='d-flex'>

                            <div className="form-group col-md-4 ms-2">
                                <label>Strategy Type</label>
                                <select className="form-select" required=""
                                    onChange={(e) => {
                                        setStrategyType(e.target.value)
                                        sessionStorage.setItem('StrategyType', e.target.value)
                                    }}
                                    value={selectStrategyType}>
                                    <option value={"Scalping"}>Scalping</option>
                                    <option value={"Option Strategy"}>Option Strategy</option>
                                    <option value={"Pattern"}>Pattern Script</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {getServiceDetails.loading ? (
                        <Loader />
                    ) : (
                        <>
                            {selectStrategyType === "Scalping" && (
                                getServiceDetails.data?.length > 0 ? (
                                    <div className="iq-card-body px-2">
                                        <FullDataTable columns={columns} data={getServiceDetails.data} checkBox={false} />
                                    </div>
                                ) : <NoDataFound />
                            )}

                            {selectStrategyType === "Option Strategy" && (
                                getServiceDetails.data?.length > 0 ? (
                                    <div className="iq-card-body px-2">
                                        <FullDataTable columns={columns1} data={getServiceDetails.data} checkBox={false} />
                                    </div>
                                ) : <NoDataFound />
                            )}

                            {selectStrategyType === "Pattern" && (
                                getServiceDetails.data?.length > 0 ? (
                                    <div className="iq-card-body px-2">
                                        <FullDataTable columns={columns2} data={getServiceDetails.data} checkBox={false} />
                                    </div>
                                ) : <NoDataFound />
                            )}
                        </>
                    )}

                </div>

                {
                    <>
                        <div
                            className={`modal fade bd-example-modal-lg ${showModal ? 'show' : ''}`}
                            tabIndex={-1}
                            style={{ display: showModal ? 'block' : 'none' }}
                            aria-hidden={!showModal}
                            role="dialog"
                        >
                            <div className="modal-dialog modal-xl modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header card-bg-color">
                                        <h5 className="modal-title ">All Scripts</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={() => setShowModal(false)}
                                        />
                                    </div>
                                    <div className="modal-body">
                                        {
                                            getUserData.data && getUserData.data.length > 0 ?
                                                (
                                                    <FullDataTable
                                                        columns={selectStrategyType == "Scalping" ? ReportColumns3() : selectStrategyType == "Option Strategy" ? ReportColumns4() : selectStrategyType == "Pattern" ? ReportColumns5() : []}
                                                        data={getUserData.data}
                                                        checkBox={false}
                                                    />
                                                )
                                                :
                                                (<NoDataFound />)
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </Content>
        </>
    )
}

export default Userlog
