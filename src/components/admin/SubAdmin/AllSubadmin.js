// import React, { useEffect, useState } from 'react';
// import { GetAllSubadmin } from '../../CommonAPI/Admin';
// import FullDataTable from '../../../ExtraComponent/CommanDataTable';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
// import { SquarePen } from 'lucide-react';
// import { useFormik } from 'formik';
// import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap';
// import AddForm from '../../../ExtraComponent/FormData';
// import Swal from 'sweetalert2';
// import NoDataFound from '../../../ExtraComponent/NoDataFound';
// import Content from '../../../ExtraComponent/Content';



// const AllSubadmin = () => {

//     const navigate = useNavigate();

//     const [clientService, setClientService] = useState({ loading: true, data: [] });




//     const [searchInput, setSearchInput] = useState('')



//     useEffect(() => {
//         fetchAllSubadmin();
//     }, [searchInput]);

//     useEffect(() => {
//     }, [clientService]);






//     const fetchAllSubadmin = async () => {
//         try {
//             const response = await GetAllSubadmin();
//             if (response.Status) {
//                 const filteredData = response.Data.filter(item => {
//                     const searchInputMatch =
//                         searchInput === '' ||
//                         item.Username.toLowerCase().includes(searchInput.toLowerCase()) ||
//                         item.Name.toLowerCase().includes(searchInput.toLowerCase()) ||
//                         item.EmailId.toLowerCase().includes(searchInput.toLowerCase()) ||
//                         item.Mobile_No.toLowerCase().includes(searchInput.toLowerCase())
//                     return searchInputMatch
//                 })

//                 setClientService({
//                     loading: false,
//                     data: searchInput ? filteredData : response.Data,
//                 });
//             } else {
//                 setClientService({ loading: false, data: [] });
//             }
//         } catch (error) {

//         }
//     };



//     const EditSubadmindetail = (value, tableMeta) => {

//         const rowIndex = tableMeta.rowIndex;
//         const rowData = tableMeta.rowData;

//         // return

//         navigate(`/admin/editSubadmin`, {
//             state: { rowIndex, rowData },
//         });
//     };






//     const columns = [
//         {
//             name: 'S.No',
//             label: 'S.No',
//             options: {
//                 filter: true,
//                 sort: true,
//                 customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
//             },
//         },
//         // {
//         //     name: 'Edit',
//         //     label: 'Edit',
//         //     options: {
//         //         filter: true,
//         //         sort: true,
//         //         customBodyRender: (value, tableMeta) => (


//         //             <SquarePen
//         //             onClick={() => EditSubadmindetail(value, tableMeta)}  />

//         //         ),
//         //     },
//         // },
//         {
//             name: 'Edit',
//             label: 'Edit',
//             options: {
//                 filter: true,
//                 sort: true,
//                 customBodyRender: (value, tableMeta) => {

//                     const rowData = clientService.data[tableMeta.rowIndex]; // Row ka pura object


//                     return (
//                         <SquarePen
//                             onClick={() => {
//                                 EditSubadmindetail(value, tableMeta); // Navigate karna ya handle karna
//                             }}
//                         />
//                     );
//                 },
//                 filter: true,
//                 sort: true,
//                 customBodyRender: (value, tableMeta) => {

//                     const rowData = clientService.data[tableMeta.rowIndex]; // Row ka pura object


//                     return (
//                         <SquarePen
//                             onClick={() => {
//                                 EditSubadmindetail(value, tableMeta); // Navigate karna ya handle karna
//                             }}
//                         />
//                     );
//                 },
//             },
//         },
//         {
//             name: 'Username',
//             label: 'Username',
//             options: {
//                 filter: true,
//                 sort: true,
//                 customBodyRender: (value) => value || '-'
//             }
//         },
//         {
//             name: 'Name',
//             label: 'Name',
//             options: {
//                 filter: true,
//                 sort: true,
//                 customBodyRender: (value) => value || '-'
//             }
//         },
//         {
//             name: 'EmailId',
//             label: 'Email ID',
//             options: {
//                 filter: true,
//                 sort: true,
//                 customBodyRender: (value) => value || '-'
//             }
//         },
//         {
//             name: 'Mobile_No',
//             label: 'Mobile Number',
//             options: {
//                 filter: true,
//                 sort: true,
//                 customBodyRender: (value) => value || '-'
//             }
//         },

//         {
//             name: 'CreateDate',
//             label: 'Create Date',
//             options: {
//                 filter: true,
//                 sort: true,
//                 customBodyRender: (value) => value || '-'
//             }
//         },
//         {
//             name: 'Key',
//             label: 'Key',
//             options: {
//                 filter: true,
//                 sort: true,
//                 customBodyRender: (value) => value || '-'
//             }
//         },
//         {
//             name: 'Permission',
//             label: 'Permission',
//             options: {
//                 filter: true,
//                 sort: true,
//                 customBodyRender: (value) => {
//                     if (Array.isArray(value)) {
//                         return (
//                             <>
//                                 {value.map((item, index) => (
//                                     <React.Fragment key={index}>
//                                         {item}
//                                         {(index + 1) % 3 === 0 ? <br /> : ", "}
//                                     </React.Fragment>
//                                 ))}
//                             </>
//                         );
//                     }
//                     return value || '-';
//                 }
//             }
//         }






//     ];



//     return (
//         <>
//             <Content
//                 Page_title={" 📉 SubAdmin"}
//                 button_status={true}
//                 backbutton_status={true}
//                 route={"/admin/addSubadmin"}
//                 button_title={"Add SubAdmin"}

//             >

//                 <div className='iq-card-body'>
//                     <div className='d-flex justify-content-between'>
//                         <div className='mb-3 col-lg-3'>
//                             <input
//                                 type="text"
//                                 className='form-control rounded p-1 px-2'
//                                 placeholder="Search..."
//                                 onChange={(e) => setSearchInput(e.target.value)}
//                                 value={searchInput}
//                             />
//                         </div>

//                         <button
//                             className='addbtn'
//                             color="addbtn"
//                             onClick={() => navigate("/admin/addSubadmin")}
//                         >
//                             ➕ Add SubAdmin
//                         </button>
//                     </div>
//                 </div>

//                     {
//                         clientService.data && clientService.data.length > 0 ?
//                             (<FullDataTable columns={columns} data={clientService.data} checkBox={false} />)
//                             :
//                             (<NoDataFound />)
//                     }
//                 </div>


//             </Content>

//         </>
//     );
// };

// export default AllSubadmin;





import React, { useEffect, useState } from 'react';
import { GetAllSubadmin } from '../../CommonAPI/Admin';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { useNavigate } from 'react-router-dom';
import { SquarePen } from 'lucide-react';
import Swal from 'sweetalert2';
import NoDataFound from '../../../ExtraComponent/NoDataFound';
import Content from '../../../ExtraComponent/Content';

const AllSubadmin = () => {
    const navigate = useNavigate();
    const [clientService, setClientService] = useState({ loading: true, data: [] });
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetchAllSubadmin();
    }, [searchInput]);

    const fetchAllSubadmin = async () => {
        try {
            const response = await GetAllSubadmin();
            if (response.Status) {
                const filteredData = response.Data.filter(item => {
                    const searchInputMatch =
                        searchInput === '' ||
                        item.Username.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.Name.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.EmailId.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.Mobile_No.toLowerCase().includes(searchInput.toLowerCase());
                    return searchInputMatch;
                });

                setClientService({
                    loading: false,
                    data: searchInput ? filteredData : response.Data,
                });
            } else {
                setClientService({ loading: false, data: [] });
            }
        } catch (error) {
            console.log('Error in fetching Subadmin', error);
        }
    };

    const EditSubadmindetail = (value, tableMeta) => {
        const rowIndex = tableMeta.rowIndex;
        const rowData = tableMeta.rowData;

        navigate(`/admin/editSubadmin`, {
            state: { rowIndex, rowData },
        });
    };

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
                customBodyRender: (value, tableMeta) => {
                    return (
                        <SquarePen
                            onClick={() => EditSubadmindetail(value, tableMeta)}
                            style={{ cursor: 'pointer' }}
                        />
                    );
                },
            },
        },
        {
            name: 'Username',
            label: 'Username',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-',
            },
        },
        {
            name: 'Name',
            label: 'Name',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-',
            },
        },
        {
            name: 'EmailId',
            label: 'Email ID',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-',
            },
        },
        {
            name: 'Mobile_No',
            label: 'Mobile Number',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-',
            },
        },
        {
            name: 'CreateDate',
            label: 'Create Date',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-',
            },
        },
        {
            name: 'Key',
            label: 'Key',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-',
            },
        },
        {
            name: 'Permission',
            label: 'Permission',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    if (Array.isArray(value)) {
                        return (
                            <>
                                {value.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {item}
                                        {(index + 1) % 3 === 0 ? <br /> : ', '}
                                    </React.Fragment>
                                ))}
                            </>
                        );
                    }
                    return value || '-';
                },
            },
        },
    ];

    return (
        <>
            <Content
                Page_title={" 📉 SubAdmin"}
                button_status={true}
                backbutton_status={true}
                route={"/admin/addSubadmin"}
                button_title={"Add SubAdmin"}
            >
                <div className='iq-card-body'>
                    <div className='d-flex justify-content-between'>
                        <div className='mb-3 col-lg-3'>
                            <input
                                type="text"
                                className='form-control rounded p-1 px-2'
                                placeholder="Search..."
                                onChange={(e) => setSearchInput(e.target.value)}
                                value={searchInput}
                            />
                        </div>

                        <button
                            className='addbtn'
                            color="addbtn"
                            onClick={() => navigate("/admin/addSubadmin")}
                        >
                            ➕ Add SubAdmin
                        </button>
                    </div>
                </div>

                {
                    clientService.data && clientService.data.length > 0 ?
                        (<FullDataTable columns={columns} data={clientService.data} checkBox={false} />)
                        :
                        (<NoDataFound />)
                }
            </Content>
        </>
    );
};

export default AllSubadmin;
