import React, { useState, useEffect } from 'react'
import { getCompanyName, allClientdetails, updateClientDetails, deleteClient } from '../../CommonAPI/SuperAdmin'
import FullDataTable from '../../../ExtraComponent/CommanDataTable'
import { SquarePen, Trash2 } from 'lucide-react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import AddForm from '../../../ExtraComponent/FormData';
import NoDataFound from '../../../ExtraComponent/NoDataFound';
import Content from '../../../ExtraComponent/Content';

const ClientThreadReport = () => {

    const PanelName = sessionStorage.getItem("PanelName")

    const [getAllClientdetails, setAllClientDetails] = useState([])
    const [getAllComapny, setAllComapny] = useState([])

    const [comapnyName, setCompanyName] = useState(PanelName || (getAllComapny.length > 0 ? getAllComapny[0] : ''))
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        ComapnyDetails()
    }, [comapnyName])

    useEffect(() => {
        getClientThreadeReport()
    }, [comapnyName,getAllComapny])


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
        await allClientdetails(req)
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



    const handleDelete = async (tableMeta) => {
        const req = {
            Companyname: comapnyName,
            Username: tableMeta.Username
        }
        await deleteClient(req)
            .then((response) => {
                if (response.Status) {
                    Swal.fire({
                         // background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: "Success",
                        text: response.message,
                        icon: "success",
                        timer: 1500,
                        timerProgressBar: true
                    });
                    getClientThreadeReport()
                }
                else {

                    Swal.fire({
                         // background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        title: "Error",
                        text: response.message,
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true
                    });
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
            name: 'Action',
            label: 'Action',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => (
                    <>
                        <div className='d-flex gap-2'>

                            <div>
                                <SquarePen
                                    onClick={() => {
                                        setShowModal(true);
                                        const rowDataWithKeys = {};
                                        columns.forEach((column, index) => {
                                            rowDataWithKeys[column.name] = tableMeta.rowData[index];
                                        });
                                        setSelectedIndex(rowDataWithKeys);
                                    }}
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                            <div>
                                <Trash2 onClick={() => {
                                    const rowDataWithKeys = {};
                                    columns.forEach((column, index) => {
                                        rowDataWithKeys[column.name] = tableMeta.rowData[index];
                                    });
                                    handleDelete(rowDataWithKeys)
                                }}
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                        </div>

                    </>

                ),
            },
        },

        {
            name: "Mobile_No",
            label: "Mobile No",
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
            name: "EmailId",
            label: "Email Id",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "BrokerName",
            label: "Broker Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "CreateDate",
            label: "Create Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "License",
            label: "License",
            options: {
                filter: true,
                sort: true,
            }
        },

       
        

        {
            name: "LicenseStartDate",
            label: "License Start Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ServiceStartDate",
            label: "Service Start Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ServiceEndDate",
            label: "Service End Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ServiceCount",
            label: "Service Count",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "AutoLogin",
            label: "Auto Login",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value ? value : "-"
            }
        },
         {
            name: "Group",
            label: "Group",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value ? value : "NA"
            }
        },
        {
            name: "Planname",
            label: "Planname",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    if (Array.isArray(value)) {
                        let formattedText = value
                            .map((item, index) => ((index + 1) % 2 === 0 ? item + "<br/>" : item)) // Har 2nd item ke baad new line
                            .join(", "); // Comma separated format
                
                        return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
                    }
                    return value;
                }
            }
        },
        {
            name: "SubAdmin",
            label: "Sub Admin",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value ? value : "-"
            }
        },
        
        



    ];


    const formik = useFormik({
        initialValues: {
            Username: '',
            Phone: '',
            email: '',
        },
        validate: values => {
            const errors = {};
            if (!values.Username) {
                errors.Username = 'Please enter Username';
            }
            if (!values.Phone) {
                errors.Phone = 'Please enter Mobile No';
            }
            if (!values.email) {
                errors.email = 'Please enter Email Id';
            }
            else {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|ymail|rediffmail|hotmail|outlook|aol|icloud|protonmail|example).(com|co.in|in|net|org|edu|gov|uk|us|info|biz|io|...)[a-zA-Z]{0,}$/;
                if (!emailRegex.test(values.email)) {
                    errors.email = "Please Enter valid Email ID";
                }
            }
            console.log('Errors', errors);

            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                Companyname: comapnyName,
                Username: values.Username,
                mobile_no: values.Phone,
                SignEmail: values.email,
            }
            await updateClientDetails(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                             // background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: "Success",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true
                        });
                        getClientThreadeReport()
                        setShowModal(false)
                        formik.resetForm();
                    }
                    else {
                        Swal.fire('Error', response.Message, 'error')
                    }
                })
                .catch((err) => {
                    console.log("Error in fainding the service", err)
                })
        },
    });

    const fields = [
        {
            name: 'Username',
            label: 'Username',
            type: 'text',
            label_size: 12,
            col_size: 12,
            disable: true,
            hiding: false,
        },
        {
            name: 'email',
            label: 'Email',
            type: 'text',
            label_size: 12,
            col_size: 12,
            disable: false,
            hiding: false,
        },
        {
            name: 'Phone',
            label: 'Phone No',
            type: 'text3',
            label_size: 12,
            col_size: 12,
            disable: false,
            hiding: false,

        },
    ];

    useEffect(() => {
        if (showModal) {
            formik.setFieldValue('Username', selectedIndex.Username);
            formik.setFieldValue('Phone', selectedIndex.Mobile_No);
            formik.setFieldValue('email', selectedIndex.EmailId);
        }
    }, [showModal])

    return (
        <>
            <Content
                Page_title={"Client Details"}
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
                                        sessionStorage.setItem("PanelName", e.target.value)
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
                        getAllClientdetails && getAllClientdetails.length > 0 ?
                            (
                                <FullDataTable
                                    columns={columns}
                                    data={getAllClientdetails}
                                    checkBox={false}
                                />
                            )
                            :
                            (<NoDataFound />)
                    }

                </div>


                {showModal && (
                    <div className='modal custom-modal d-flex' id='add_vendor' role='dialog'>
                        <div className='modal-dialog modal-dialog-centered modal-lg'>
                            <div className='modal-content'>
                                <div className='modal-header clientheader border-0 pb-0'>
                                    <div className='form-header modal-header-title text-start mb-0'>
                                        <h4 className='mb-0'>Edit Client </h4>
                                    </div>
                                    <button
                                        type='button'
                                        className='btn-close'
                                        data-bs-dismiss='modal'
                                        aria-label='Close'
                                        onClick={() => {
                                            setShowModal(false);
                                            formik.resetForm();
                                        }}
                                    ></button>
                                </div>
                                <hr />
                                <AddForm
                                    fields={fields.filter(
                                        field => !field.showWhen || field.showWhen(formik.values)
                                    )}
                                    btn_name='Update'
                                    formik={formik}
                                    btn_name1_route='/admin/clientservice'

                                />
                            </div>
                        </div>
                    </div>
                )}
            </Content>
        </>
    )
}

export default ClientThreadReport
