import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Content from '../../../ExtraComponent/Content';
import './MasterAccount.css';
import { GetAccountsApi, GetClientService, MasterAccountApi, UpdateMasterAccount, GetMasterAccountTableData } from '../../CommonAPI/Admin';
import Swal from 'sweetalert2';
import FullDataTable from '../../../ExtraComponent/CommanDataTable.jsx';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'; // Import MUI components
import GridExample from "../../../ExtraComponent/CommanDataTable.jsx"
import NoDataFound from '../../../ExtraComponent/NoDataFound.jsx';

const MasterAccount = () => {
  const token = localStorage.getItem("token")


  const [accountsData, setAccountsData] = useState([]);
  const [selectedMasterAccount, setSelectedMasterAccount] = useState(null);
  const [selectedChildAccounts, setSelectedChildAccounts] = useState([]);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [updatedChildAccounts, setUpdatedChildAccounts] = useState([]); // State for updated child accounts
  const [tabData, setTableData] = useState()

  const fetchAccounts = async () => {
    try {
      const res = await GetClientService();
      const users = res?.Data?.map(user => user.Username) || [];

      setAccountsData(users);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const tableData = async () => {
    try {
      const res = await GetMasterAccountTableData()
      if (res.Status) {
        setTableData(res.Data)
      }

    } catch (error) {
      console.error("Error fetching data", error);
    }
  }
  useEffect(() => {
    tableData()
  }, [])

  const columns = [
    { name: "MainUser", label: "Master Account", selector: row => row.MainUser, sortable: true },

    {
      name: "ChildUser",
      label: "Child Accounts",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          if (!value || (Array.isArray(value) && value.length === 0)) {
            return "-";
          }
          if (Array.isArray(value)) {
            return (
              <span>
                {value.map((day, index) => (
                  <>
                    {index > 0 && index % 5 === 0 ? <br /> : ""}
                    {typeof day === "object" && day.label ? day.label : day}
                    {index % 3 !== 2 && index !== value.length - 1 ? ", " : ""}
                  </>
                ))}
              </span>
            );
          }
          return value;
        },
      },
    },
  ];


  const columns1 = [
    {
      name: "SNo",
      label: "S.No",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "Date",
      label: "Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "MainUser",
      label: "Main User",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "ChildUser",
      label: "Child Users",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return Array.isArray(value) ? value.join(", ") : value;
        },
      },
    },
  ];
  

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleMasterAccountChange = (selected) => {
    setSelectedMasterAccount(selected);
    setSelectedChildAccounts([]);
  };

  const getData = async () => {
    try {
      const res = await GetAccountsApi();
      setData(res?.Data[0])
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };
  useEffect(() => {
    getData();
  }, [isModalOpen]);


  const handleChildAccountChange = (selected) => {
    setSelectedChildAccounts(selected || []);
  };

  const handleSubmit = async () => {
    const req = {
      MainUser: selectedMasterAccount?.value,
      ChildUser: selectedChildAccounts.map(account => account.value)
    };

    if (!selectedMasterAccount?.value || selectedChildAccounts.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select Master Account and Child Account(s)',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'swal-custom-popup'
        }
      });
      return;
    }

    try {
      const res = await MasterAccountApi(req);

      if (res?.Status) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Master account created successfully!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          customClass: {
            popup: 'swal-custom-popup'
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to create master account!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33',
          customClass: {
            popup: 'swal-custom-popup'
          }
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33',
        customClass: {
          popup: 'swal-custom-popup'
        }
      });
    }
  };

  const getChildUserOptions = () => {
    return accountsData
      .filter(account => account !== selectedMasterAccount?.value)
      .map(account => ({ value: account, label: account }));
  };

  const handleEditClick = () => {
    setUpdatedChildAccounts(data?.ChildUser?.map(child => ({ value: child, label: child })) || []);
    setIsModalOpen(true); // Ensure this sets the modal state to open
  };

  const handleModalChildAccountChange = (selected) => {
    setUpdatedChildAccounts(selected || []);
  };

  const handleModalSubmit = async () => {
    const updatedData = {
      MainUser: data?.MainUser,
      ChildUser: updatedChildAccounts.map(account => account.value),
    };

    const res = await UpdateMasterAccount(updatedData);
    if (res?.Status) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Childs updated successfully!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'swal-custom-popup'
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error in updating Childs!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33',
        customClass: {
          popup: 'swal-custom-popup'
        }
      });
    }

    setIsModalOpen(false);
  };

  return (
    <Content
      Page_title={"💼 Master Account"}
      button_status={false}
      backbutton_status={true}
    >
      {!data?.MainUser && ( // Hide fields and button if master account data exists
        <div className="dropdown-row">
          <div className="dropdown-column">
            <label htmlFor="masterAccount">Master Account</label>
            <Select
              id="masterAccount"
              options={accountsData.map((account) => ({
                value: account,
                label: account,
              }))}
              placeholder="Select Master Account"
              isClearable
              value={selectedMasterAccount}
              onChange={handleMasterAccountChange}
            />
          </div>
          <div className="dropdown-column">
            <label htmlFor="childAccount">Child Account</label>
            <Select
              id="childAccount"
              options={getChildUserOptions()}
              placeholder="Select Child Account(s)"
              isMulti
              value={selectedChildAccounts}
              onChange={handleChildAccountChange}
            />
          </div>
        </div>
      )}
      {!data?.MainUser && ( // Hide submit button if master account data exists
        <button className="addbtn submit-button styled-submit-button" onClick={handleSubmit}>
          Submit
        </button>
      )}

      {/* Single card display for Master and Child Accounts */}
      {data?.MainUser && (
        <div className="account-card-single w-100 mw-100 card-bg-color">
          <h4 className="account-title-single">Master Account :  
          <span className="account-value-single card-text-Colors">{data.MainUser}</span></h4>
          <hr className="account-divider" />
          <h4 className="fs-6">Child Accounts     <button className="addbtn btn btn-sm" onClick={handleEditClick}>
           <i className='fa fa-edit me-0'></i> 
          </button></h4>
          <div className="account-grid-single">
            {data.ChildUser?.map((child, index) => (
              <div key={index} className="account-grid-item-single">
                {child}
              </div>
            ))}
          </div>
      
        </div>
      )}

      {/* Modal for editing child accounts */}
      <Dialog
      className='card-bg-color'
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="md" // Set a maximum width for the modal
        PaperProps={{
          className: "card-bg-color", // add bg class to modal paper
          style: {
            width: '600px', // Fixed width
            height: '400px', // Fixed height
          },
        }}
      >
        <DialogTitle className='card-text-Color card-bg-color'>Edit Child Accounts</DialogTitle>
        <DialogContent className="card-bg-color" style={{ overflowY: 'auto' }}> {/* Enable scrolling if content overflows */}
          <div className="modal-dropdown">
            <label htmlFor="modalMasterAccount" className="card-text-Color">Master Account</label>
            <Select
              id="modalMasterAccount"
              value={{ value: data?.MainUser, label: data?.MainUser }}
              isDisabled
              classNamePrefix="card-bg-color"
            />
          </div>
          <div className="modal-dropdown">
            <label htmlFor="modalChildAccount" className="card-text-Color">Child Accounts</label>
            <Select
              id="modalChildAccount"
              options={accountsData
                .filter(account => account !== data?.MainUser)
                .map(account => ({ value: account, label: account }))}
              isMulti
              value={updatedChildAccounts}
              onChange={handleModalChildAccountChange}
              classNamePrefix="card-bg-color"
            />
          </div>
        </DialogContent>
        <DialogActions className="card-bg-color">
          <Button onClick={() => setIsModalOpen(false)} color="secondary" className="card-text-Color">
            Cancel
          </Button>
          <Button onClick={handleModalSubmit} color="primary" className="card-text-Color">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <div className="iq-card-body">
        {tabData && tabData?.length > 0 ? (
          <div className="table-responsive customtable">
            <GridExample
              columns={columns1}
              data={tabData}
              checkBox={false}
            />
          </div>
        ) : (
          <NoDataFound />
        )}
      </div>
    </Content>
  );
};

export default MasterAccount;
