import React, { useState, useEffect } from 'react'
import { getCompanyName, clientThreadeReport } from '../../CommonAPI/SuperAdmin'
import FullDataTable from '../../../ExtraComponent/CommanDataTable'
import NoDataFound from '../../../ExtraComponent/NoDataFound'
import Content from '../../../ExtraComponent/Content';
import Loader from '../../../ExtraComponent/Loader';

const ClientThreadReport = () => {

    const SelectPanelName = sessionStorage.getItem("SelectPanelName")

    const [getAllClientThreadeReport, setAllClientThreadeReport] = useState({ loading : false, Charting:[], Scalping: [], Option: [], Pattern: [], ReadData: []})
    const [comapnyName, setCompanyName] = useState(SelectPanelName || '')
    const [getAllComapny, setAllComapny] = useState([])

    useEffect(() => {
        ComapnyDetails()
    }, [])


    useEffect(() => {
        getClientThreadeReport()
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

    const getClientThreadeReport = async () => {
        if (comapnyName == '') {
            return
        }
        const req = { comapnyName: comapnyName }
        await clientThreadeReport(req)
            .then((response) => {
                if (response.Status) {
                    setAllClientThreadeReport({ loading: false, Charting: response.Charting, Scalping: response.Scalping, Option: response.Option, Pattern: response.Pattern, ReadData: response.ReadData })
                }
                else {
                    setAllClientThreadeReport({ loading : false, Charting:[], Scalping: [], Option: [], Pattern: [], ReadData: []})
                }
            })
            .catch((err) => {
                console.log("Error in fainding the service", err)
            })
    }


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
            name: "Thread",
            label: "Thread",
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
            name: "ScalpType",
            label: "Scalping Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Targettype",
            label: "Target Type",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value ? value : "-"
            }
        },
        {
            name: "Symbol",
            label: "Symbol",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Threading Status",
            label: "Threading Status",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value ? "true" : "false"
            }
        },
        {
            name: "ThreadName",
            label: "ThreadName",
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
            name: "ProjectName",
            label: "ProjectName",
            options: {
                filter: true,
                sort: true,
            }
        },

    ];

    return (
        <>
            <Content
                Page_title={"Client Thread Report"}
                button_status={false}
                backbutton_status={true}

            >

                <div className="iq-card-body">
                    <div className="was-validated ">
                        <div className='d-flex'>
                            <div className="form-group col-md-3 ms-2">
                                <label>Select Panel Name</label>
                                <select className="form-select" required=""
                                    onChange={(e) => {
                                        setCompanyName(e.target.value)
                                        sessionStorage.setItem('SelectPanelName', e.target.value)
                                    }}
                                    value={comapnyName}
                                >
                                    {getAllComapny && getAllComapny.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>{item}</option>
                                        )
                                    })}
                                </select>
                            </div>
                             
                        </div>
                    </div>
                    {
                        getAllClientThreadeReport.loading ? (
                            <div className="flex justify-center items-center h-52">
                                <Loader />
                            </div>
                        ) : (
                            <>
                                {
                                    !getAllClientThreadeReport.loading &&
                                    (getAllClientThreadeReport.Scalping?.length ?? 0) === 0 &&
                                    (getAllClientThreadeReport.Option?.length ?? 0) === 0 &&
                                    (getAllClientThreadeReport.Pattern?.length ?? 0) === 0 &&
                                    (getAllClientThreadeReport.ReadData?.length ?? 0) === 0 &&
                                    <NoDataFound />
                                }

                                {
                                    (getAllClientThreadeReport.Scalping?.length ?? 0) > 0 &&
                                    (
                                        <>
                                            <h4>Scalping</h4>
                                            <FullDataTable
                                                columns={columns}
                                                data={getAllClientThreadeReport.Scalping}
                                                checkBox={false}
                                            />
                                        </>
                                    )
                                }

                                {
                                    (getAllClientThreadeReport.Option?.length ?? 0) > 0 &&
                                    (
                                        <>
                                            <h4 className='mt-5'>Option Strategy</h4>
                                            <FullDataTable
                                                columns={columns}
                                                data={getAllClientThreadeReport.Option}
                                                checkBox={false}
                                            />
                                        </>
                                    )
                                }

                                {
                                    (getAllClientThreadeReport.Pattern?.length ?? 0) > 0 &&
                                    (
                                        <>
                                            <h4 className='mt-5'>Pattern Script</h4>
                                            <FullDataTable
                                                columns={columns}
                                                data={getAllClientThreadeReport.Pattern}
                                                checkBox={false}
                                            />
                                        </>
                                    )
                                }

                                {
                                    (getAllClientThreadeReport.ReadData?.length ?? 0) > 0 &&
                                    (
                                        <>
                                            <h4 className='mt-5'>ReadData</h4>
                                            <FullDataTable
                                                columns={columns}
                                                data={getAllClientThreadeReport.ReadData}
                                                checkBox={false}
                                            />
                                        </>
                                    )
                                }
                            </>
                        )
                    }

                </div>

            </Content>
        </>
    )
}

export default ClientThreadReport
