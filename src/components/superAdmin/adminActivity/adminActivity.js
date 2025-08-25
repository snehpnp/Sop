import React, { useEffect, useState } from 'react';
import { adminActivity} from '../../CommonAPI/SuperAdmin';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { Link } from 'react-router-dom';
import { SquarePen } from 'lucide-react';
import { useFormik } from 'formik';
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap';
import AddForm from '../../../ExtraComponent/FormData';


const AdminActivity = () => {
    const [clientService, setClientService] = useState({ loading: true, data: [] });
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [optionsArray, setOptionsArray] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [brokers, setBrokers] = useState([]);
    const [searchInput, setSearchInput] = useState('')
  
    useEffect(() => {
        fetchAdminActivity();
    }, [searchInput]);


    const fetchAdminActivity = async () => {
        const req = {}
  
            await adminActivity()
           
       
    };
    const formik = useFormik({
        initialValues: {
            User: "",
            Broker: "",
            GroupName: "",
        },
        validate: values => {
            const errors = {};
          
            return errors;
        },


        onSubmit: async (values) => {
            const req = {
                User: values.User,
                GroupName: selectedOptions,
                Broker: values.Broker,
            }   
            
        },
    });

    const fields = [
        {
            name: 'Broker',
            label: 'Broker',
            type: 'select',
            options: brokers && brokers.map(item => ({ label: item.BrokerName, value: item.BrokerName })),
            label_size: 12,
            col_size: 12,
        },

    ];


    const columns = [
        {
            name: 'S.No',
            label: 'S.No',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
            },
        },
        {
            name: 'Edit',
            label: 'Edit',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => (
                    <SquarePen
                    onClick={() => {
                        setShowModal(true);
                        const rowDataWithKeys = {};
                        columns.forEach((column, index) => {
                            rowDataWithKeys[column.name] = tableMeta.rowData[index];
                        });
                        setSelectedIndex(rowDataWithKeys);
                       
                    }}
                    />
                    
                ),
            },
        },
        {
            name: 'Username',
            label: 'Username',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'Mobile_No',
            label: 'Mobile Number',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'BrokerName',
            label: 'Broker Name',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'Planname',
            label: 'Plan Name',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => (
                    <span>{Array.isArray(value) ? value.join(' , ') : value ? "-" : value || '-'}</span>
                ),
             
                
            }
        },
        {
            name: 'EmailId',
            label: 'Email ID',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'Group',
            label: 'Strategy Group',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => (

                    <span>{Array.isArray(value) ? value.join(' , ') : value ? "-" : value || '-'}</span>
                ),
            }
        },
        {
            name: 'CreateDate',
            label: 'Account Create Date',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'ServiceStartDate',
            label: 'Service Start Date',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'ServiceEndDate',
            label: 'Service End Date',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'Total Service Count',
            label: 'Total Service Count',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
    ];

    return (
        <>
            <div className='row'>
                <div className='col-sm-12'>
                    <div className='iq-card'>
                        <div className='iq-card-header d-flex justify-content-between'>
                            <div className='iq-header-title'>
                                <h4 className='card-title'>Admin Activity</h4>
                            </div>
                        </div>
                        <div className='iq-card-body'>
                            <div className='mb-3 col-lg-3'>
                                <input type="text" className=' form-control rounded p-1 px-2' placeholder="Search..." onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
                            </div>
                            <FullDataTable columns={columns} data={clientService.data} checkBox={false} />
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className='modal custom-modal d-flex' id='add_vendor' role='dialog'>
                    <div className='modal-dialog modal-dialog-centered modal-lg'>
                        <div className='modal-content'>
                            <div className='modal-header clientheader border-0 pb-0'>
                                <div className='form-header modal-header-title text-start mb-0'>
                                    <h4 className='mb-0'>Edit Client : {selectedIndex?.Username}</h4>
                                </div>
                                <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                    onClick={() => {
                                        setShowModal(false);
                                        formik.resetForm();
                                        setSelectedOptions([]);
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
                                additional_field={
                                    <div className='mt-2'>
                                        <div className='row'>
                                            <div className='col-lg-12'>
                                                <h6>Select Group</h6>
                                                <DropdownMultiselect
                                                    options={optionsArray}
                                                    name='groupName'
                                                    handleOnChange={(selected) => setSelectedOptions(selected)}
                                                    selected={showModal ? selectedIndex.Group : ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminActivity;
