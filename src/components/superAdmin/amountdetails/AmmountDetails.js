import React, { useState, useEffect } from 'react'
import { getCompanyName, companyDetails } from '../../CommonAPI/SuperAdmin'
import FullDataTable from '../../../ExtraComponent/CommanDataTable'
import NoDataFound from '../../../ExtraComponent/NoDataFound'
import Content from '../../../ExtraComponent/Content';

const AmountDetails = () => {

    const CompanyName = sessionStorage.getItem("CompanyName")

    const [getAmountDetails, setAmountDetails] = useState([])
    const [comapnyName, setCompanyName] = useState(CompanyName || '');

   

    const [getAllComapny, setAllComapny] = useState([])

    useEffect(() => {
        if (getAllComapny.length > 0 && !CompanyName) {
            setCompanyName(getAllComapny[0]);
            sessionStorage.setItem('CompanyName', getAllComapny[0]);
        }
    }, [getAllComapny]);

    useEffect(() => {
        ComapnyDetails()
    }, [])

    useEffect(() => {
        getCompanyDetails()
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

    const getCompanyDetails = async () => {
        if (comapnyName == '') {
            return
        }
        const req = { comapnyName: comapnyName }
        await companyDetails(req)
            .then((response) => {
                if (response.Status) {
                    setAmountDetails(response.AmmountDetails)
                }
                else {
                    setAmountDetails([])
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
            name: "AmountDetails",
            label: "Amount Details",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "mobilenumber",
            label: "Mobile Number",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Payment Date",
            label: "Payment Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "IP Detail",
            label: "IP Detail",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value ? value : "-"
            }
        },
        {
            name: "Status",
            label: "Status",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Companyname",
            label: "Company Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "AdminName",
            label: "Admin Name",
            options: {
                filter: true,
                sort: true,
            }
        },

    ];

    return (
        <>
        <Content
                Page_title={"Amount Details"}
                button_status={false}
                backbutton_status={true}
                
            >
            
                        <div className="iq-card-body">
                            <div className="was-validated ">
                                <div className='d-flex'>
                                    <div className="form-group col-md-4 ms-2">
                                        <label>Select Company</label>
                                        <select className="form-select" required=""
                                            onChange={(e) => {
                                                setCompanyName(e.target.value)
                                                sessionStorage.setItem('CompanyName',e.target.value)
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
                                getAmountDetails.length > 0 ?
                                    (<FullDataTable
                                        columns={columns}
                                        data={getAmountDetails}
                                        checkBox={false}
                                    />)
                                    :
                                    (<NoDataFound />)
                            }

                        </div>
                    
            </Content>
        </>
    )
}

export default AmountDetails
