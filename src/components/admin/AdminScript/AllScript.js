import React, { useState, useEffect } from 'react'
import { GetAllGroupService, GetGroupNames, DeleteScript, getStrategyType } from '../../CommonAPI/Admin';
import { useNavigate } from 'react-router-dom';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import Swal from 'sweetalert2';
import { columns2, columns1, columns } from './ScriptColumns'
import NoDataFound from '../../../ExtraComponent/NoDataFound';
import Content from '../../../ExtraComponent/Content';
import { toast } from 'react-toastify';



const Addscript = () => {
    const navigate = useNavigate()
    const GroupName = sessionStorage.getItem('GroupName')
    const StrategyType = sessionStorage.getItem('StrategyType')

    const [refresh, setRefresh] = useState(false)
    const [selectGroup, setSelectGroup] = useState(GroupName)
    const [selectStrategyType, setStrategyType] = useState(StrategyType || 'Scalping')
    const [strategyNames, setStrategyNames] = useState([]);

    const [GroupError, setGroupError] = useState('')
    const [stgError, setStgError] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [getAllService, setAllservice] = useState({ loading: true, data: [], data1: [] })


    const [getGroupData, setGroupData] = useState({ loading: true, data: [] })




    const handleDelete = async (rowData) => {
        const index = rowData.rowIndex;

        // 🟡 Select correct data source based on conditions
        const isScalpingMulti = selectStrategyType === 'Scalping' && getAllService.data1?.length > 0;
        const rowItem = isScalpingMulti ? getAllService.data1[index] : getAllService.data[index];

        if (!rowItem) {
            console.error("Invalid row index or data not found");
            return;
        }

        const data = {
            Groupname: rowItem.Username,
            Sop: selectStrategyType,
            Strategy: selectStrategyType === 'Option Strategy' ? rowItem.STG :
                selectStrategyType === 'Pattern' ? rowItem.TradePattern :
                    rowItem.ScalpType,
            Symbol: selectStrategyType === 'Option Strategy' ? rowItem.MainSymbol :
                rowItem.Symbol,
            ETPattern: selectStrategyType === 'Option Strategy' ? rowItem.Targettype :
                selectStrategyType === 'Pattern' ? rowItem.Pattern : "",
            Timeframe: selectStrategyType === 'Pattern' ? rowItem.TimeFrame : '',
            TType: selectStrategyType === 'Pattern' ? rowItem.TType : "",
            Group: selectStrategyType === 'Pattern' ? '' : rowItem.GroupN,
            Tradepattern: selectStrategyType === 'Pattern' ? rowItem.TradePattern : ''
        };

        Swal.fire({
             // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await DeleteScript(data);
                    if (response.Status) {
                        setRefresh(!refresh);
                        Swal.fire({
                             // background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: "Deleted!",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    } else {
                        Swal.fire({
                             // background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: "Error!",
                            text: response.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                } catch (err) {
                    console.error("Error in delete script", err);
                    Swal.fire({
                         // background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: "Error!",
                        text: "Something went wrong while deleting.",
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true
                    });
                }
            }
        });
    }

    // 1
    const GetAllGroupDetails = async () => {
        try {
            await GetGroupNames()
                .then((response) => {

                    if (response.Status) {
                        setGroupData({
                            loading: false,
                            data: response.Data
                        })
                    }
                    else {
                        setGroupData({
                            loading: false,
                            data: []
                        })
                    }
                })
                .catch((err) => {
                    console.log("Error Group data fetch", err)
                })
        }
        catch {
            console.log("Error Group data fetch")
        }
    }


    const strategyType = async () => {
        try {
            const res = await getStrategyType();
            if (res.Data) {
                setStrategyNames(res.Data);
            } else {
                console.log("Error in getting the StrategyType");
            }
        } catch (error) {
            console.log("Error in getting the StrategyType", error);
        }
    };

    useEffect(() => {
        GetAllGroupDetails()
        strategyType()
    }, [])

    // 2
    const getAllgroupService = async () => {
        const data = { Strategy: selectStrategyType, Group: selectGroup }
        await GetAllGroupService(data)
            .then((response) => {
                if (response.Status) {
                    if (selectStrategyType == 'Scalping') {
                        const filterMulticondtion = response?.Data.filter((item) => item?.ScalpType == 'Multi_Conditional')
                        const filterOthers = response?.Data.filter((item) => item?.ScalpType != 'Multi_Conditional')

                        setAllservice({
                            loading: false,
                            data: filterOthers,
                            data1: filterMulticondtion
                        })
                    }
                    else {

                        setAllservice({
                            loading: false,
                            data: response.Data,
                            data1: []
                        })
                    }
                }
                else {
                    setAllservice({
                        loading: false,
                        data: [],
                        data1: []

                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding group service")
            })
    }

    const handleAddScript = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        if (!selectGroup || !selectStrategyType) {
           
            toast.error('Please select strategy type and group name', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        const data = { selectGroup: selectGroup, selectStrategyType: selectStrategyType };
        navigate(selectStrategyType == "Scalping" ? '/admin/addscript/scalping' :
            selectStrategyType == "Option Strategy" ? '/admin/addscript/option' : '/admin/addscript/pattern', { state: { data } });
    }

    useEffect(() => {
        setStrategyType(StrategyType || 'Scalping')
    }, []);

    useEffect(() => {
        if (formSubmitted) {
            if (selectGroup == '') {
                setGroupError("Select Group Name")
            } else {
                setGroupError("")
            }
            if (selectStrategyType == '') {
                setStgError("Select Strategy Type")
            } else {
                setStgError("")
            }
        }
    }, [selectGroup, selectStrategyType, formSubmitted])


    useEffect(() => {
        if (!getGroupData.loading && getGroupData.data.length > 0) {
            setSelectGroup(getGroupData && getGroupData.data[0].GroupName)
        }
    }, [getGroupData]);


    useEffect(() => {
        getAllgroupService()
    }, [selectStrategyType, selectGroup, refresh])


    return (
        <Content
            Page_title={" 📉 Add Scripts"}
            button_status={false}
            backbutton_status={true}
        // route={"/admin/addSubadmin"}
        // button_title={"Add SubAdmin"}

        >

            <div className="iq-card-body">
                <form className="was-validated ">
                    <div className='d-md-flex'>
                        <div className={`form-group ${"col-md-5"} ms-3`}>
                            <label>Group Name</label>
                            <select className="form-select "
                                required=""
                                onChange={(e) => {
                                    setSelectGroup(e.target.value)
                                    sessionStorage.setItem('GroupName', e.target.value)
                                }}
                                value={selectGroup}
                            >
                                {getGroupData.data && getGroupData.data.map((item) => {
                                    return <>
                                        <option value={item.GroupName}>{item.GroupName}</option>
                                    </>
                                })}

                            </select>
                            {GroupError && <div style={{ "color": "red" }}>
                                {GroupError}
                            </div>}
                        </div>
                        <div className={`form-group ${"col-md-5"} ms-3`}>
                            <label>Strategy Type</label>
                            <select className="form-select" required=""
                                onChange={(e) => {
                                    setAllservice({ loading: true, data: [] });
                                    setStrategyType(e.target.value);
                                    sessionStorage.setItem('StrategyType', e.target.value)
                                }}
                                value={selectStrategyType}>
                                {strategyNames.filter((item) => { return item != "ChartingPlatform" }).map((item, index) => {
                                    return (
                                        <option key={index} value={item}>
                                            {item}
                                        </option>
                                    );
                                })}

                            </select>
                            {stgError && <div style={{ "color": "red" }}>
                                {stgError}
                            </div>}
                        </div>

                        <div className='col-md-2 ms-3 mt-3 strategy'>
                            <button style={{ fontSize: '18px', padding: '6px 14px', height: "47px" }} className='addbtn mt-2' onClick={handleAddScript}>Add Script</button>
                        </div>

                    </div>
                </form>

                {
                    selectStrategyType == "Scalping" && getAllService?.data1?.length > 0 ? (
                        <>
                            <h4 className="mt-3">{StrategyType || "Scalping"}</h4>
                            <FullDataTable
                                columns={columns(handleDelete)}
                                data={getAllService.data1}
                                checkBox={false}
                            />
                        </>

                    ) : selectStrategyType != "Scalping" && getAllService?.data?.length > 0 ? (
                        <>
                            <h4 className="mt-3">{StrategyType || "Scalping"}</h4>
                            <FullDataTable
                                columns={selectStrategyType == "Option Strategy" ? columns1(handleDelete) : columns2(handleDelete)}
                                data={getAllService.data}
                                checkBox={false}
                            />
                        </>
                    ) : <NoDataFound />
                }

            </div>

        </Content>

    )
}

export default Addscript
