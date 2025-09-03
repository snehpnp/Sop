import React, { useEffect, useState } from 'react';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { GetAllTransection, AddBalance } from '../../CommonAPI/User';
import { DollarSign, IndianRupee } from 'lucide-react';
import Swal from 'sweetalert2';
import { GetUserBalence } from '../../CommonAPI/User'
import Content from '../../../ExtraComponent/Content';

const Clientservice = () => {
    const username = localStorage.getItem('name')
    const [searchInput, setSearchInput] = useState('')
    const [showAddMoneyModal, setShowAddMoneyModal] = useState(false)
    const [showWithdrawalModal, setShowWithdrawalModal] = useState(false)
    const [EnterMoney, setEnterMoney] = useState('')
    const [AllTransectionData, setAllTransectionData] = useState([])
    const [error, setError] = useState('')
    const [walletBalance, setWalletBalance] = useState('');


    useEffect(() => {
        GetBalence()
        UserAllTransection()
    }, [])

    const handleInputChange = (e, type) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setEnterMoney(value);
        }
        validate(e.target.value, type)
    }

    const validate = (value, type) => {
        if (value === '') {
            setError('Please Enter the Money')
            return false
        }
        else if (type === 2 && value > walletBalance) {
            setError('You have Insufficient Balance')
            return false
        }
        else {
            setError('')
            return true
        }
    }

    const GetBalence = async () => {
        const req = { userName: username }
        await GetUserBalence(req)
            .then((response) => {
                if (response.Status) {
                    setWalletBalance(response.Balance)
                }
                else {
                    setWalletBalance('')
                }
            })
            .catch((error) => {
                console.error("Error in GetUserBalence request", error);
            });
    }

    const UserAllTransection = async () => {
        const req = { Name: username }
        await GetAllTransection(req)
            .then((response) => {
                if (response.Status) {
                    setAllTransectionData(response.ClientHistory)
                }
                else {
                    setAllTransectionData([])
                }
            })
            .catch((err) => {
                console.log("Error in getting the Transection", err)
            })
    }

    const handleAddMoney = async () => {
        const req = { Username: username, transactiontype: 'Deposit', money: EnterMoney }
        if (!validate(EnterMoney, 1)) {
            return
        }
        await AddBalance(req)
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
                    setTimeout(() => {
                        setShowAddMoneyModal(false)
                        UserAllTransection()
                        setEnterMoney('')
                        setError('')
                    }, 1500)
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
                console.log('Error in Adding Money', err)
            })
    }

    const handleWithdrawal = async () => {
        const req = { Username: username, transactiontype: 'Withdrawal', money: EnterMoney }
        if (!validate(EnterMoney, 2)) {
            return
        }
        await AddBalance(req)
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
                    setTimeout(() => {
                        setShowWithdrawalModal(false)
                        UserAllTransection()
                        setEnterMoney('')
                        setError('')
                    }, 1500)
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
                console.log('Error in Adding Money', err)
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
            name: "Username",
            label: "Username",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Transactiontype",
            label: "Transaction Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "TotalTrasaction",
            label: "Available Balance",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    return `₹ ${value}`;
                }
            }
        },
        {
            name: "money",
            label: "Amount",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, rowindex) => {
                    const transactionType = rowindex.rowData[2];
                    let color;
                    let sign;
                    if (transactionType === 'Withdrawal') {
                        color = 'red';
                        sign = '-';
                    } else if (transactionType === 'Purchase') {
                        color = 'red';
                        sign = '-';
                    }
                    else if (transactionType === 'TradePrice') {
                        color = 'red';
                        sign = '-';
                    }
                    else {
                        color = 'green';
                        sign = '+';
                    }

                    return (
                        <span style={{ color }}>
                            ₹ {sign}{value}
                        </span>
                    );
                }



            },
            
        },
        {
            name: "TransactionRequest",
            label: "Status",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    const statusStyle = {
                        display: 'inline-block',
                        padding: '5px 10px',
                        borderRadius: '8px',
                        border: '1px solid',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        minWidth: '80px',
                    };

                    if (value === "Process") {
                        return (
                            <span style={{ ...statusStyle, color: "orange", borderColor: "orange" }}>
                                Pending
                            </span>
                        );
                    } else if (value === "Complete") {
                        return (
                            <span style={{ ...statusStyle, color: "green", borderColor: "green" }}>
                                Complete
                            </span>
                        );
                    } else if (value === "Reject") {
                        return (
                            <span style={{ ...statusStyle, color: "red", borderColor: "red" }}>
                                Rejected
                            </span>
                        );
                    } else {
                        return <span style={statusStyle}>{value}</span>;
                    }
                }
            }
        },
        {
            name: "Activity",
            label: "Activity",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "DateTime",
            label: "Date",
            options: {
                filter: true,
                sort: true,
            }
        },
    ];



    return (
        <>
            <Content
                Page_title={"📉 Transaction"}
                button_status={false}
                backbutton_status={false}
            >
 
                <div className='iq-card-body'>
                    <div className='d-flex justify-content-between'>
                        <div className="wallet-balance-container">
                            <span className="balance-label fs-5">Remaining Balance:</span>
                            <span className="balance-amount"> ₹ {walletBalance}</span>
                        </div>

                        <div className=''>
                            <button to='/admin/adduser' className='addbtn mx-2 mb-2'
                                onClick={() => setShowAddMoneyModal(true)}
                            >
                                Add Money
                            </button>
                            {/* <button to='/admin/adduser' className='addbtn'
                                onClick={() => setShowWithdrawalModal(true)}
                            >
                                Withdraw Amount
                            </button> */}
                        </div>
                    </div>
                    <FullDataTable columns={columns} data={AllTransectionData} checkBox={false} />
                </div>


                {
                    showAddMoneyModal && (
                        <div className="modal custom-modal d-flex" id="Balance" role="dialog">
                            <div className="modal-dialog modal-dialog-centered" style={{ width: "30rem" }}>
                                <div className="modal-content">
                                    <div className="modal-header border-0 pb-0">
                                        <div className="form-header modal-header-title text-start mb-0">
                                            <h4 className="mb-0 d-flex align-items-center">
                                                <IndianRupee className="me-2" style={{ color: '#4caf50' }} />
                                                Add Balance
                                            </h4>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={() => { setError(''); setEnterMoney(''); setShowAddMoneyModal(false) }}
                                        ></button>
                                    </div>
                                    <div >
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-lg-12 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label className="form-label" style={{ fontWeight: 'bold', color: '#333' }}>
                                                            Balance
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control number-input"
                                                            placeholder="Enter Balance to Add"
                                                            inputMode="decimal"
                                                            pattern="^\d*\.?\d*$"
                                                            name="EnterMoney"
                                                            value={EnterMoney}
                                                            onChange={(e) => { handleInputChange(e, 1) }}
                                                        />
                                                        {
                                                            error && (
                                                                <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>
                                                            )
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                data-bs-dismiss="modal"
                                                className="btn btn-back cancel-btn me-2"
                                                onClick={() => { setError(''); setEnterMoney(''); setShowAddMoneyModal(false) }}
                                                style={{ backgroundColor: '#f44336', color: 'white', borderRadius: '4px' }}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                data-bs-dismiss="modal"
                                                className="btn btn-primary paid-continue-btn"
                                                style={{ backgroundColor: '#4caf50', color: 'white', borderRadius: '4px' }}
                                                onClick={handleAddMoney}
                                            >
                                                Add Balance
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }

                {
                    showWithdrawalModal && (
                        <div className="modal custom-modal d-flex" id="Balance" role="dialog">
                            <div className="modal-dialog modal-dialog-centered" style={{ width: "30rem" }}>
                                <div className="modal-content">
                                    <div className="modal-header border-0 pb-0">
                                        <div className="form-header modal-header-title text-start mb-0">
                                            <h4 className="mb-0 d-flex align-items-center">
                                                <IndianRupee className="me-2" style={{ color: '#4caf50' }} />
                                                Withdrawal Balance
                                            </h4>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={() => { setError(''); setEnterMoney(''); setShowWithdrawalModal(false) }}

                                        ></button>
                                    </div>
                                    <div>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-lg-12 col-sm-12">
                                                    <div className="input-block mb-3">
                                                        <label className="form-label" style={{ fontWeight: 'bold', color: '#333' }}>
                                                            Balance
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control number-input"
                                                            placeholder="Enter Balance to Withdrawal"
                                                            inputMode="decimal"
                                                            pattern="^\d*\.?\d*$"
                                                            name="EnterMoney"
                                                            value={EnterMoney}
                                                            onChange={(e) => { handleInputChange(e, 2) }}
                                                        />
                                                        {
                                                            error && (
                                                                <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                data-bs-dismiss="modal"
                                                className="btn btn-back cancel-btn me-2"
                                                onClick={() => { setError(''); setEnterMoney(''); setShowWithdrawalModal(false) }}
                                                style={{ backgroundColor: '#f44336', color: 'white', borderRadius: '4px' }}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                data-bs-dismiss="modal"
                                                className="btn btn-primary paid-continue-btn"
                                                style={{ backgroundColor: '#4caf50', color: 'white', borderRadius: '4px' }}
                                                onClick={handleWithdrawal}
                                            >
                                                Withdrawal Balance
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Content>
        </>
    );
};

export default Clientservice;
