import React, { useEffect, useState } from 'react'
import FullDataTable from '../../../ExtraComponent/CommanDataTable'
import { GetAllTaskStatus, GetClientService, Get_All_Client_Logs, getStrategyType } from '../../CommonAPI/Admin'
import { columns3, columns2, columns1, columns } from './UserAllColumn'
import NoDataFound from '../../../ExtraComponent/NoDataFound'
import Content from '../../../ExtraComponent/Content';


const Pannel = () => {

    const Username = sessionStorage.getItem('Username')
    const Strategy = sessionStorage.getItem('Strategy')
    const TaskStatus = sessionStorage.getItem('TaskStatus')


    const [getPanleData, setPanleData] = useState({
        loading: true,
        data: [],
        data1: []
    })
    const [userName, setUserName] = useState(Username || '')
    const [getScript, setScript] = useState(Strategy || '')

    const [getActivity, setActivity] = useState(TaskStatus || '')
    const [gettaskStatus, setAllTaskStatus] = useState([])
    const [clientService, setClientService] = useState({ loading: true, data: [] });


    const [tableType, setTableType] = useState(Strategy || "Scalping");

    const [strategyType, setStrategyType] = useState([]);



    const AllTaskStatus = async () => {
        await GetAllTaskStatus()
            .then((response) => {
                if (response.Status) {
                    setAllTaskStatus(response.Taskstatus)
                }
                else {
                    setAllTaskStatus([])
                }
            })
            .catch((err) => {
                console.log("Error in finding the Task Status", err)
            })
    }

    const fetchStrategyType = async () => {
        try {
            const res = await getStrategyType();
            
            if (res.Data) {
                setStrategyType(res.Data);
            }
        } catch (error) {
            console.log("Error in finding the strategy type", error);
        }
    };

    useState(() => {
        AllTaskStatus()
        fetchStrategyType()
    }, [])

    useEffect(() => {
        const fetchClientService = async () => {
            try {
                const response = await GetClientService();
                if (response.Status) {


                    setClientService({
                        loading: false,
                        data: response.Data
                    });
                } else {
                    setClientService({ loading: false, data: [] });
                }
            } catch (error) {
                console.log('Error in fetching client services', error);
            }
        };

        fetchClientService();
    }, []);

    useEffect(() => {

        if (!clientService.loading && clientService.data.length > 0) {
            setUserName(Username ||(clientService.data[0].Username))
        }


        setScript(Strategy || 'Scalping')

        if (gettaskStatus && gettaskStatus.length > 0) {
            setActivity(TaskStatus || gettaskStatus[0])
        }

    }, [clientService, gettaskStatus])


    const getAllUserLogs = async () => {
        const data = { User: userName, Strategy: getScript && getScript == "Scalping" ? "NewScalping" : getScript, TaskStatus: getActivity }

        await Get_All_Client_Logs(data)

            .then((response) => {
                if (response.Status) {
                    setPanleData({
                        loading: false,
                        data: response.Data,
                        data1: getScript === "Scalping" ? response?.Multicondition : []
                    })
                }
                else {
                    setPanleData({
                        loading: false,
                        data: [],
                        data1: []
                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding the user logs", err)
            })
    }

    useEffect(() => {
        if (getScript == "Scalping") {
            setTableType("MultiCondition");
        } else {
            setTableType("Scalping");
        }
    }, [getScript]);

    useEffect(() => {
        getAllUserLogs()
    }, [userName, getScript, getActivity])


    return (
        <>
        <Content
                Page_title={" 📉 User Panel Logs"}
                button_status={false}
                backbutton_status={true}
               
            >
            
                                <div className="iq-card-body">
                                    <div>
                                        <div className="row">

                                            <div className={`form-group ${getScript !== "Scalping" ? "col-lg-4" : "col-lg-4"}`}>
                                                <label>Username</label>
                                                <select
                                                    className="form-select my-2"
                                                    required
                                                    onChange={(e) => {
                                                        setUserName(e.target.value)
                                                        sessionStorage.setItem('Username',e.target.value)                                                    
                                                    }}
                                                    value={userName}
                                                >
                                                    <option value="">Select Username</option>
                                                    {clientService.data?.map((item, index) => (
                                                        <option key={index} value={item.Username}>
                                                            {item.Username}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>


                                            <div className={`form-group ${getScript !== "Scalping" ? "col-lg-4" : "col-lg-4"}`}>
                                                <label>Strategy</label>
                                                <select
                                                    className="form-select my-2"
                                                    required
                                                    onChange={(e) => {
                                                        setScript(e.target.value)
                                                        sessionStorage.setItem('Strategy',e.target.value)
                                                    }}
                                                    value={getScript}
                                                >
                                                    {strategyType.map((type, index) => (
                                                        <option key={index} value={type}>
                                                            {type}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>


                                            {/* {getScript === "Scalping" && (
                                                <div className={`form-group ${getScript !== "Scalping" ? "col-lg-4" : "col-lg-3"}`}>
                                                    <div className="px-3">
                                                        <label>Table Type</label>
                                                        <select
                                                            className="form-select my-2"
                                                            required
                                                            onChange={(e) => setTableType(e.target.value)}
                                                            value={tableType}
                                                        >
                                                            <option value="Scalping">Scalping</option>
                                                            <option value="MultiCondition">Multi Condition</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            )} */}


                                            <div className={`form-group ${getScript !== "Scalping" ? "col-lg-4" : "col-lg-4"}`}>
                                                <label htmlFor="email">Task Status</label>
                                                <select
                                                    className="form-select my-2"
                                                    required
                                                    onChange={(e) => {
                                                        setActivity(e.target.value)
                                                        sessionStorage.setItem('TaskStatus',e.target.value)
                                                    }}
                                                    value={getActivity}
                                                >
                                                    {gettaskStatus?.map((item, index) => (
                                                        <option value={item} key={index}>{item}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="table-responsive">

                                        {tableType === "Scalping" ? (
                                            getPanleData?.data?.length > 0 ? (
                                                <>
                                                <h4 className="mt-3">{Strategy}</h4>
                                                <FullDataTable
                                                    columns={
                                                        getScript === "Scalping"
                                                            ? columns()
                                                            : getScript === "Option Strategy"
                                                                ? columns1()
                                                                : getScript === "Pattern"
                                                                    ? columns2()
                                                                    : columns()
                                                    }
                                                    data={getPanleData.data}
                                                    checkBox={false}
                                                />
                                                </>

                                            ) : (
                                                <NoDataFound />
                                            )
                                        ) : (

                                            tableType === "MultiCondition" && getPanleData?.data1?.length > 0 ? (
                                                <>
                                                    <h4 className="mt-3">Scalping</h4>
                                                    <FullDataTable columns={columns3()} data={getPanleData.data1} checkBox={false} />
                                                </>
                                            ) : (
                                                <NoDataFound />
                                            )
                                        )}
                                    </div>

                                </div>

                           
            </Content>
        </>
    )
}
export default Pannel

