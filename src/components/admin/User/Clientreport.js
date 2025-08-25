import React, { useEffect, useState } from 'react'
import { clientThreadeReport1, Get_Client_Report } from '../../CommonAPI/Admin'
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { ClientReportColumn, ClientReportScalpingColumn } from './UserAllColumn'
import NoDataFound from '../../../ExtraComponent/NoDataFound';
import Content from '../../../ExtraComponent/Content';
import Loader from '../../../ExtraComponent/Loader';


const Clientreport = () => {
    const Username = sessionStorage.getItem("Username")
    const [selectUserName, setSelectUserName] = useState(Username || 'AllUser')
    const [getTableData, setTableData] = useState({ loading: true, Scalping: [], Option: [], Pattern: [], ReadData: [] })

    const [isLoading, setIsLoading] = useState(false)


    const GetClientData = async () => {
        setIsLoading(true)
        const data = { User: selectUserName }
        await clientThreadeReport1()
            .then((response) => {
                if (response.Status) {
                    setTableData({ loading: false, Scalping: response.Scalping, Option: response.Option, Pattern: response.Pattern, ReadData: response.ReadData })
                    setSelectUserName(Username || 'AllUser')
                }
                else {
                    setTableData({
                        loading: false,
                        data: []
                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding the client details", err)
            })
        setIsLoading(false)
    }


    useEffect(() => {
        GetClientData()
    }, [selectUserName])

    useEffect(() => {
        setSelectUserName(Username || 'AllUser')
    }, [])

    return (
        <Content
            Page_title={" 📉 Client Thread Report"}
            button_status={false}
            backbutton_status={true}
        >
            <div className="iq-card-body">
                <div>
                    {/* <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="validationDefault01" className='mb-1'>Select Username</label>
                            <select className="form-select" required=""
                                onChange={(e) => {
                                    setSelectUserName(e.target.value)
                                    sessionStorage.setItem("Username", e.target.value)
                                }}
                                value={selectUserName}>
                                <option value={"AllUser"}>AllUser</option>
                                <option value={"ReadData"}>ReadData</option>
                            </select>
                        </div>
                    </div> */}
                </div>

                {/* <div className="modal-body">
                    {
                        !getTableData.loading &&
                        (getTableData.Scalping?.length ?? 0) === 0 &&
                        (getTableData.Option?.length ?? 0) === 0 &&
                        (getTableData.Pattern?.length ?? 0) === 0 &&
                        (getTableData.ReadData?.length ?? 0) === 0 &&
                        <NoDataFound />
                    }

                    {
                        (getTableData.Scalping?.length ?? 0) > 0 &&
                        (
                            <>
                                <h4>Scalping</h4>
                                <FullDataTable
                                    columns={ClientReportColumn()}
                                    data={getTableData.Scalping}
                                    checkBox={false}
                                />
                            </>
                        )
                    }

                    {
                        (getTableData.Option?.length ?? 0) > 0 &&
                        (
                            <>
                                <h4 className='mt-5'>Option Strategy</h4>
                                <FullDataTable
                                    columns={ClientReportColumn()}
                                    data={getTableData.Option}
                                    checkBox={false}
                                />
                            </>
                        )
                    }

                    {
                        (getTableData.Pattern?.length ?? 0) > 0 &&
                        (
                            <>
                                <h4 className='mt-5'>Pattern Script</h4>
                                <FullDataTable
                                    columns={ClientReportColumn()}
                                    data={getTableData.Pattern}
                                    checkBox={false}
                                />
                            </>
                        )
                    }

                    {
                        (getTableData.ReadData?.length ?? 0) > 0 &&
                        (
                            <>
                                <h4 className='mt-5'>ReadData</h4>
                                <FullDataTable
                                    columns={ClientReportColumn()}
                                    data={getTableData.ReadData}
                                    checkBox={false}
                                />
                            </>
                        )
                    }
                </div> */}

                <div className="modal-body">

                    {
                        isLoading ? (
                            <div className="flex justify-center items-center h-52">
                                <Loader />
                            </div>
                        ) : (
                            <>
                                {
                                    !getTableData.loading &&
                                    (getTableData.Scalping?.length ?? 0) === 0 &&
                                    (getTableData.Option?.length ?? 0) === 0 &&
                                    (getTableData.Pattern?.length ?? 0) === 0 &&
                                    (getTableData.ReadData?.length ?? 0) === 0 &&
                                    <NoDataFound />
                                }

                                {
                                    (getTableData.Scalping?.length ?? 0) > 0 &&
                                    (
                                        <>
                                            <h4>Scalping</h4>
                                            <FullDataTable
                                                columns={ClientReportColumn()}
                                                data={getTableData.Scalping}
                                                checkBox={false}
                                            />
                                        </>
                                    )
                                }

                                {
                                    (getTableData.Option?.length ?? 0) > 0 &&
                                    (
                                        <>
                                            <h4 className='mt-5'>Option Strategy</h4>
                                            <FullDataTable
                                                columns={ClientReportColumn()}
                                                data={getTableData.Option}
                                                checkBox={false}
                                            />
                                        </>
                                    )
                                }

                                {
                                    (getTableData.Pattern?.length ?? 0) > 0 &&
                                    (
                                        <>
                                            <h4 className='mt-5'>Pattern Script</h4>
                                            <FullDataTable
                                                columns={ClientReportColumn()}
                                                data={getTableData.Pattern}
                                                checkBox={false}
                                            />
                                        </>
                                    )
                                }

                                {
                                    (getTableData.ReadData?.length ?? 0) > 0 &&
                                    (
                                        <>
                                            <h4 className='mt-5'>ReadData</h4>
                                            <FullDataTable
                                                columns={ClientReportColumn()}
                                                data={getTableData.ReadData}
                                                checkBox={false}
                                            />
                                        </>
                                    )
                                }
                            </>
                        )
                    }

                </div>

            </div>
        </Content>
    )
}

export default Clientreport


