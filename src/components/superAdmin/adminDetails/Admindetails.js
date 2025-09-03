import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { adminDetails, addFund, closePanel, updateAdmin, pm2Reload, allClientListDetails, superToAdminPermission, superToAdminBrokerPermission, superToAdminGetNewPermission, seeAllSubAdminList, deleteSubAdminData, superadminCoupon, GetAllThemes } from '../../CommonAPI/SuperAdmin';
import GridExample from '../../../ExtraComponent/CommanDataTable'
import { SquarePen, RotateCcw, Eye, UserPlus, Earth, UserSearch, Trash2, BadgePercent } from 'lucide-react';
import { useFormik } from "formik";
import AddForm from "../../../ExtraComponent/FormData";
import NoDataFound from '../../../ExtraComponent/NoDataFound';
import Content from '../../../ExtraComponent/Content';



const Strategygroup = () => {
    const [getAdminDetails, setAdminDetails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [index, setIndex] = useState('');
    const [amount, setAmount] = useState('');
    const [showUpdate, setShowUpdate] = useState(false);
    const [singleAdminData, setSingleAdminData] = useState([]);

    const [showBroker, setShowAddBroker] = useState([])
    const [showBroker1, setShowAddBroker1] = useState(false)

    const [showPermission, setShowAddPermission] = useState([])
    const [showPermission1, setShowAddPermission1] = useState(false)


    const [allClientList, setAllClientList] = useState([])
    const [companyName, setCompanyName] = useState(""); // State to store company name
    const [showAllClientList, setShowAllClientList] = useState(false)

    const [allSubAdminList, setAllSubAdminList] = useState([])
    const [subAdminCompanyName, setSubAdminCompanyName] = useState("")
    const [showAllSubAdminList, setShowAllSubAdminList] = useState(false)
    const [themesArray, setThemesArray] = useState([]);



    const [optionsArrayBroker, setOptionsArrayBroker] = useState([
        { "value": "ICICI", "label": "ICICI" },
        { "value": "UPSTOX", "label": "UPSTOX" },
        { "value": "5PAISA", "label": "5 PAISA" },
        { "value": "ANGEL", "label": "ANGEL" },
        { "value": "MASTERTRUST", "label": "MASTERTRUST" },
        { "value": "FYERS", "label": "FYERS" },
        { "value": "ALICEBLUE", "label": "ALICEBLUE" },
        { "value": "ZEBULL", "label": "ZEBULL" },
        { "value": "MANDOT", "label": "MANDOT" },
        { "value": "INDIRA", "label": "INDIRA" },
        { "value": "DHAN", "label": "DHAN" },
        { "value": "MARKETHUB", "label": "MARKETHUB" },
        { "value": "FINVASIA", "label": "FINVASIA" },
        { "value": "KOTAK", "label": "KOTAK" },
    ]);

    const [permissionArray, setPermissionArray] = useState([
        {
            "value": "MT4Trade", "label": "MT4Trade"
        },
        { "value": "SignalGenerating", "label": "Signal Generating" },
        { "value": "MakeStrategy", "label": "Make Strategy" },

    ]);

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [offerData, setOfferData] = useState({
        Durtion: "",
        Price: "",
        OfferPrice: "",
        Companyname: "",
    });
    const [showOfferModal, setShowOfferModal] = useState(false);

    const durationOptions = [
        { value: "One_Month", label: "One Month" },
        { value: "Quarterly", label: "Quarterly" },
        { value: "Half_Yearly", label: "Half Yearly" },
        { value: "Yearly", label: "Yearly" },
    ];

    const handleCoupon = (tableMeta) => {
        setOfferData({
            ...offerData,
            Companyname: tableMeta.rowData[1],
        });
        setShowOfferModal(true);
    };

    const handleOfferSubmit = async () => {
        const res = await superadminCoupon(offerData);
        if (res.Status) {
            Swal.fire({
                // background: "#1a1e23 ",
                backdrop: "#121010ba",
                confirmButtonColor: "#1ccc8a",
                title: "Success!",
                text: res.message,
                icon: "success",
                timer: 2000,
            });
        } else {
            Swal.fire({
                // background: "#1a1e23 ",
                backdrop: "#121010ba",
                confirmButtonColor: "#1ccc8a",
                title: "Error!",
                text: res.message,
                icon: "error",
                timer: 2000,
            });
        }

        setShowOfferModal(false); // Close modal
    };

    const fetchThemes = async () => {
        try {
            const response = await GetAllThemes();
            if (response?.Status) {
                const formattedThemes = response.Theme.map(theme => ({
                    value: theme,
                    label: theme,
                }));
                setThemesArray(formattedThemes);
            }
        }
        catch (error) {
            console.error("Error fetching themes", error);
        }
    }
 
    useEffect(() => {
        fetchThemes();
    }, [showUpdate]);

    useEffect(() => {
        adminDetailsData();
        // fetchThemes();
    }, []);

    const adminDetailsData = async () => {
        await adminDetails()
            .then((response) => {
                if (response.Status) {
                    setAdminDetails(response.AdminDetails)
                }
                else {
                    setAdminDetails([])
                }
            })
            .catch((err) => {
                console.log("Error in fatching the Dashboard Details", err)
            })
    };




    const handleChangeStatus = (row, e, status) => {

        const index = row.rowIndex;
        let Companyname = getAdminDetails[index].Companyname;

        Swal.fire({
            // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "Are you sure?",
            text: "You want to change the status?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, change it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const req = { Companyname: Companyname, status: status ? "On" : "Off" }

                await closePanel(req)
                    .then((response) => {
                        if (response.Status) {
                            adminDetailsData();
                            e.target.checked = status;
                            Swal.fire({
                                // background: "#1a1e23 ",
                                backdrop: "#121010ba",
                                confirmButtonColor: "#1ccc8a",
                                title: "Changed!",
                                text: "Your status has been changed.",
                                icon: "success",
                                timer: 2000,
                                timerProgressBar: true,
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error updating charge basis:", error);
                    });
            } else {
                e.target.checked = !status;
                adminDetailsData();
            }
        });
    };

    const handleChangePm2Reload = (row, e, status) => {
        const index = row.rowIndex;
        let Companyname = getAdminDetails[index].Companyname;

        Swal.fire({
            // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "Are you sure?",
            text: "You want to Reload server",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, change it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const req = { Companyname: Companyname }

                await pm2Reload(req)
                    .then((response) => {
                        if (response.Status) {
                            adminDetailsData();

                            Swal.fire({
                                // background: "#1a1e23 ",
                                backdrop: "#121010ba",
                                confirmButtonColor: "#1ccc8a",
                                title: "Changed!",
                                text: "Your Server has been Reloaded.",
                                icon: "success",
                                timer: 2000,
                                timerProgressBar: true,
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error updating charge basis", error);
                    })
            } else {

                adminDetailsData();
            }
        })
    }



    const handleUpdate = (tableMeta) => {
        setShowUpdate(true);
        const index = tableMeta?.rowIndex;
        setSingleAdminData(getAdminDetails[index]);
        setCompanyName(getAdminDetails[index].Companyname)
    }


    //get new permission
    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await superToAdminGetNewPermission();
                if (response?.Status) {
                    const formattedPermissions = Array.from(
                        new Set(response.Data.map(item => item.NewUpdate)) // Get unique NewUpdate values
                    ).map(uniqueValue => ({
                        value: uniqueValue,
                        label: uniqueValue,
                    }));

                    setPermissionArray(formattedPermissions);

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

            } catch (error) {
                console.error("Error fetching new permissions", error)
            }
        }
        fetchPermissions()
    }, [])

    // Update Permission function
    const handleAddPermission = (tableMeta) => {
        setShowAddPermission1(true);
        const index = tableMeta?.rowIndex;
        setSingleAdminData(getAdminDetails[index]);
        formik2.setFieldValue("Permission", getAdminDetails[index].Permission || []);
    }


    // Update broker function
    const handleAddBroker = (tableMeta) => {
        setShowAddBroker1(true);
        const index = tableMeta?.rowIndex;
        setSingleAdminData(getAdminDetails[index]);
        setShowAddBroker(getAdminDetails[index].BrokerPermission)
        formik1.setFieldValue("BrokerPermission", getAdminDetails[index].BrokerPermission || []);
    }


    //See All client list api
    const handleClientList = async (tableMeta) => {
        setShowAllClientList(true)
        const index = tableMeta.rowIndex; // Get the row index
        const Companyname = getAdminDetails[index].Companyname; // Get the Companyname for the selected row
        setCompanyName(Companyname); // Save company name for modal title
        try {
            const response = await allClientListDetails(Companyname); // Fetch client list

            setAllClientList(response.Data); // Update the state with fetched data
        } catch (error) {
            setAllClientList([])
            console.log("Error To Fetch data", error);
        }
    };

    //See All Sub Admin list api
    const handleSubAdminList = async (tableMeta) => {
        setShowAllSubAdminList(true)
        const index = tableMeta.rowIndex; // Get the row index
        const Companyname = getAdminDetails[index].Companyname; // Get the Companyname for the selected row


        setCompanyName(Companyname);
        try {
            const response = await seeAllSubAdminList(Companyname);
            setAllSubAdminList(response.Data || []);
        } catch (error) {
            setAllSubAdminList([])
            console.log("Error To Fetch data", error);
        }
    };

    //delete sub admin api
    const handleSubAdminDelete = async (Username, tableMeta) => {

        let dataRequest = { Companyname: companyName, Username: Username }
        try {
            const response = await deleteSubAdminData(dataRequest);
            if (response.Status) {
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
                setShowAllSubAdminList(false)

            }
            else {
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

        }
        catch (error) {
            console.error("Error deleting sub-admin:", error);
        }
    }


    const columns = [
        {
            name: "S.No",
            label: "S.No",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowIndex = tableMeta.rowIndex;
                    return rowIndex + 1;
                }
            },
        },
        {
            name: "Companyname",
            label: "Company Name",
            options: {
                filter: true,
                sort: false,
                width: '20%'
            },
        },
        {
            name: "AddFund",
            label: "Add Fund",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <button className="btn btn-primary" onClick={() => handleAddFound(tableMeta)}>AddFund</button>;
                }

            }
        },
        {
            name: "Update",
            label: "Update",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <SquarePen size={20} style={{ cursor: "pointer" }} onClick={() => handleUpdate(tableMeta)} />;
                }

            }
        },
        {
            name: "Add_Permission",
            label: "Add Permission",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    ;
                    return <Earth size={20} style={{ cursor: "pointer" }} onClick={() => handleAddPermission(tableMeta)} />;
                }
            }
        },
        {
            name: "Add_Broker",
            label: "Add Broker",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    // return <SquarePen size={20} style={{ cursor: "pointer" }} />;
                    return <UserPlus size={20} style={{ cursor: "pointer" }} onClick={() => handleAddBroker(tableMeta)} />;

                }
            }
        },
        {
            name: "All Clients",
            label: "All Clients",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Eye
                            size={20}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClientList(tableMeta)} // Pass tableMeta
                        />
                    )
                },
            },
        },

        {
            name: "Add Offer",
            label: "Add Offer",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <BadgePercent
                            size={20}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleCoupon(tableMeta)} // Pass tableMeta
                        />
                    );
                },
            },
        },
        {
            name: "All SubAdmin",
            label: "All SubAdmin",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <UserSearch
                            size={20}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSubAdminList(tableMeta)} // Pass tableMeta
                        />
                    );
                },
            },
        },

        // {
        //     name: "username",
        //     label: "Username",
        //     options: {
        //         filter: true,
        //         sort: false,
        //     }
        // },
        // {
        //     name: "password",
        //     label: "Password",
        //     options: {
        //         filter: true,
        //         sort: false,
        //         customBodyRender: (value, tableMeta, updateValue) => {
        //             return "********";
        //         }

        //     }
        // },
        {
            name: "SignEmail",
            label: "Email",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "SignMobileNo",
            label: "Mobile No",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Create Date",
            label: "Created Date",
            options: {
                filter: true,
                sort: false,
            }
        },
        // {
        //     name: "AmountDetails",
        //     label: "Amount Details",
        //     options: {
        //         filter: true,
        //         sort: false,
        //         width: '20%'
        //     }
        // },
        // {
        //     name: "IP Detail",
        //     label: "IP Address",
        //     options: {
        //         filter: true,
        //         sort: false,
        //         width: '20%'
        //     }
        // },
        {
            name: "Status",
            label: "Temporary Close Panel",
            options: {
                filter: true,
                sort: false,
                width: '20%',
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div className="form-switch">
                        <input
                            className="form-check-input"
                            style={{ cursor: "pointer", width: "61px", height: "27px" }}
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            defaultChecked={value == "On" ? true : false}
                            onClick={(e) => handleChangeStatus(tableMeta, e, e.target.checked)}
                        />
                    </div>
                }

            }
        },
        {
            name: "Status",
            label: "Live Data",
            options: {
                filter: true,
                sort: false,
                width: '20%',
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <RotateCcw onClick={(e) => handleChangePm2Reload(tableMeta, e, e.target.checked)} />
                }

            }
        },
        {
            name: "BrokerPermission",
            label: "Broker Permission",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    if (Array.isArray(value)) {
                        let formattedText = value
                            .map((item, index) => ((index + 1) % 7 === 0 ? item + "\n" : item)) // Har 3rd element ke baad new line
                            .join(", "); // Comma separated format

                        return <pre style={{ whiteSpace: "pre-wrap" }}>{formattedText}</pre>;
                    }
                    return value;
                }
            }
        }

    ];

    const handleAddFound = (index) => {
        setIndex(index.rowIndex);
        setShowModal(true);
    }

    const handleSubmitFund = async () => {
        if (amount === '') {
            Swal.fire({
                // background: "#1a1e23 ",
                backdrop: "#121010ba",
                confirmButtonColor: "#1ccc8a",
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter the amount',
            })
        }
        else {
            setAmount('');
            setShowModal(false);
        }
        const req = { Companyname: getAdminDetails?.[index]?.Companyname, AmmountDetails: amount }

        await addFund(req)
            .then((response) => {
                if (response.Status) {
                    Swal.fire({
                        // background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        icon: 'success',
                        title: 'Success',
                        text: response.Message,
                    })
                    adminDetailsData();
                }
                else {
                    Swal.fire({
                        // background: "#1a1e23 ",
                        backdrop: "#121010ba",
                        confirmButtonColor: "#1ccc8a",
                        icon: 'error',
                        title: 'Oops...',
                        text: response.Message,
                    })
                }
            })
            .catch((err) => {
                console.log("Error in fatching the Dashboard Details", err)
            })
    }


    useEffect(() => {
        formik.setValues({
            Companyname: singleAdminData?.Companyname,
            Username: singleAdminData?.username,
            mobile_no: singleAdminData?.SignMobileNo,
            SignEmail: singleAdminData?.SignEmail,
            Url: singleAdminData?.Url,
            SOPPaperTrade: singleAdminData?.SOPPaperTrade,
            SOPLiveTrade: singleAdminData?.SOPLiveTrade,
            SOPScriptwise: singleAdminData?.SOPScriptwise,
            ChartPerTrade: singleAdminData?.ChartPerTrade,
            ChartPerMonth: singleAdminData?.ChartPerMonth,
            Theme: singleAdminData?.Theme || [],
            Brokername: singleAdminData?.Brokername || "ALICEBLUE",
        })
    }, [singleAdminData])



    const formik = useFormik({
        initialValues: {
            Companyname: "",
            Username: "",
            mobile_no: "",
            SignEmail: "",
            Url: "",
            SOPPaperTrade: 0.0,
            SOPLiveTrade: 0.0,
            SOPScriptwise: 0.0,
            ChartPaperTrade: 0.0,
            ChartLiveTrade: 0.0,
            ChartPerMonth: 0.0,
            Theme: [],
            Brokername: "ALICEBLUE"

        },
        validate: (values) => {
            let errors = {};

            if (!values.mobile_no) {
                errors.mobile_no = "Please enter mobile number";
            } else if (!/^\d{10}$/.test(values.mobile_no)) {
                errors.mobile_no = "Mobile number must be 10 digits";
            }

            if (!values.SignEmail) {
                errors.SignEmail = "Please enter email";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.SignEmail)) {
                errors.SignEmail = "Invalid email address";
            }

            if (!values.Companyname) {
                errors.Companyname = "Please enter company name";
            }

            if (!values.Username) {
                errors.Username = "Please enter username";
            }

            if (!values.Url) {
                errors.Url = "Please enter a URL";
            } else if (!values.Url.startsWith("http://") && !values.Url
                .startsWith("https://")) {
                errors.Url = "Invalid URL format";
            }

            if (values.SOPPaperTrade < 0) {
                errors.SOPPaperTrade = "Value cannot be negative";
            }
            if (values.SOPLiveTrade < 0) {
                errors.SOPLiveTrade = "Value cannot be negative";
            }
            if (values.SOPScriptwise < 0) {
                errors.SOPScriptwise = "Value cannot be negative";
            }
            if (values.ChartPerTrade < 0) {
                errors.ChartPerTrade = "Value cannot be negative";
            }
            if (values.ChartLiveTrade < 0) {
                errors.ChartLiveTrade = "Please enter Chart Live Trade";
            }
            if (values.ChartPaperTrade < 0) {
                errors.ChartPaperTrade = "Please enter Chart Paper Trade";
            }
            if (values.ChartPerMonth < 0) {
                errors.ChartPerMonth = "Value cannot be negative";
            }

            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                Companyname: values.Companyname || singleAdminData?.Companyname,
                Username: values.Username || singleAdminData?.username,
                mobile_no: values.mobile_no,
                SignEmail: values.SignEmail,
                Url: values.Url,
                SOPPaperTrade: values.SOPPaperTrade || 0,
                SOPLiveTrade: values.SOPLiveTrade || 0,
                SOPScriptwise: values.SOPScriptwise || 0,
                ChartPaperTrade: values.ChartPaperTrade || 0,
                ChartLiveTrade: values.ChartLiveTrade || 0,
                ChartPerMonth: values.ChartPerMonth || 0,
                Theme: values.Theme,
                Brokername:values.Brokername 
            };

            await updateAdmin(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            background: "#1a1e23",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: "Admin Updated!",
                            text: response.message,
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                        adminDetailsData();
                        setShowUpdate(false);
                        formik.resetForm();
                    } else {
                        Swal.fire({
                            background: "#1a1e23",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: "Error!",
                            text: response.message,
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log("Error in fetching the Dashboard Details", err);
                });
        },
    });


    const fields = [
        {
            name: "mobile_no",
            label: "Mobile Number",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "SignEmail",
            label: "Email",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "Url",
            label: "URL",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: true,
        },
        {
            name: "Companyname",
            label: "Company Name",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: true,
        },
        {
            name: "Username",
            label: "Username",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: true,
        },
        {
            name: "SOPPaperTrade",
            label: "Paper Trade Amount(SOP)",
            type: "number",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
            defaultValue: 0.0,
        },
        {
            name: "SOPLiveTrade",
            label: "Live Trade Amount(SOP)",
            type: "number",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
            defaultValue: 0.0,
        },
        {
            name: "SOPScriptwise",
            label: "Per Script Amount(SOP)",
            type: "number",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
            defaultValue: 0.0,
        },
        {
            name: "ChartLiveTrade",
            label: "Chart Live Trade Amount",
            type: "number",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
            defaultValue: 0.0,
        },

        {
            name: "ChartPaperTrade",
            label: "Chart Paper Trade Amount",
            type: "number",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
            defaultValue: 0.0,
        },

        {
            name: "ChartPerMonth",
            label: "Chart Per Month",
            type: "number",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
            defaultValue: 0.0,
        },
        {
            name:"Brokername",
            label: "Admin Broker",
            type: "select",
            label_size: 12,
            col_size: 6,
            disable: false,
            options:[
                { value: "ALICEBLUE", label: "ALICEBLUE" },
                { value: "MARKETHUB", label: "MARKETHUB" },
            ]
        },

        {
            name: "Theme",
            label: "Theme Permission",
            type: "select2",
            label_size: 12,
            col_size: 6,
            disable: false,
            options: themesArray,  
        }




    ];

    const formik1 = useFormik({
        initialValues: {
            BrokerPermission: [],
        },

        onSubmit: async (values) => {

            const req = {
                // BrokerPermission: showBroker.BrokerPermission,
                Companyname: singleAdminData?.Companyname,
                // Companyname: "Pnp",
                Brokername: values.BrokerPermission,

            }

            await superToAdminBrokerPermission(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            // background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: "Broker Updated!",
                            text: response.message,
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                        adminDetailsData();
                        setShowAddBroker1(false);
                        formik1.resetForm();
                    }
                    else {
                        Swal.fire({
                            // background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: "Error!",
                            text: response.message,
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log("Error in fatching the Broker Details", err);

                })
        }
    });


    const fields1 = [
        {
            name: "BrokerPermission",
            label: "Broker Permission",
            type: "select2", // Custom dropdown for brokers
            label_size: 12,
            col_size: 6,
            disable: false,
            options: optionsArrayBroker,
            value: formik1.values.BrokerPermission, // Bind to formik value
            onChange: (selectedValues) => {
                formik1.setFieldValue("BrokerPermission", selectedValues);
            },
        },
    ]


    //code for update permission
    const formik2 = useFormik({
        initialValues: {
            Permission: [],
        },


        onSubmit: async (values) => {
            const req = {
                Companyname: singleAdminData?.Companyname,
                Permission: values.Permission,
            }
            await superToAdminPermission(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            // background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: "Permission Updated!",
                            text: response.message,
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                        adminDetailsData();
                        setShowAddPermission1(false)
                        formik2.resetForm();
                    }
                    else {
                        Swal.fire({
                            // background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: "Error!",
                            text: response.message,
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    }
                })
        }
    })

    const fields2 = [
        {
            name: "Permission",
            label: "Permission",
            type: "select2",
            label_size: 12,
            col_size: 12,
            disable: false,
            options: permissionArray,
            //added data
            value: formik2.values.Permission,
            onChange: (selectedValues) => {
                formik2.setFieldValue("Permission", selectedValues)
            }
        },
    ]

    return (
        <Content
            Page_title={"Admin Details"}
            button_status={false}
            backbutton_status={true}
        >


            <div className="iq-card-body">
                <div className="table-responsive customtable">
                    {
                        getAdminDetails.length > 0 ?
                            (<GridExample
                                columns={columns}
                                data={getAdminDetails}
                                checkBox={false}
                            />)
                            :
                            (<NoDataFound />)
                    }

                </div>
            </div>


            {
                showModal && <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"></div>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Add Fund
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => { setAmount(''); setShowModal(false) }}
                                />
                            </div>
                            <div>
                                <div className='mx-4'>
                                    <label className='mt-4'>Enter Fund</label>
                                    <input type="number"
                                        className='form-control mb-4'
                                        placeholder='Enter Fund'
                                        onChange={(e) => setAmount(e.target.value)}
                                        value={amount}
                                    />
                                </div>
                                <div className='d-flex justify-content-end mb-4 mx-4'>
                                    <button className='btn btn-primary' onClick={handleSubmitFund}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                showUpdate && (
                    <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"></div>

                        <div className="modal-dialog modal-dialog-centered modal-lg" style={{ maxWidth: "800px", margin: "50px auto", zIndex: "1050" }}>
                            <div className="modal-content" style={{ borderRadius: "10px", overflow: "hidden" }}>
                                <div className="modal-header" style={{ backgroundColor: "#343a40", color: "#fff" }}>
                                    <h5 className="modal-title">
                                        Update Admin: {singleAdminData?.Companyname}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => { setShowUpdate(false); formik.resetForm(); }}
                                        style={{ background: "none", border: "none", color: "#fff", fontSize: "1.2rem" }}
                                    />
                                </div>
                                <div className="modal-body" style={{ padding: "20px", maxHeight: "70vh", overflowY: "auto" }}>
                                    <AddForm fields={fields} btn_name="Update" formik={formik} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }


            {
                showPermission1 && <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"></div>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Update Permission : {singleAdminData?.Companyname}
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    // onClick={() => { setShowAddBroker1(false); formik1.resetForm() }}
                                    onClick={() => { setShowAddPermission1(false); formik2.resetForm() }}

                                />
                            </div>
                            <div>
                                <AddForm
                                    fields={fields2}
                                    btn_name="Update"
                                    formik={formik2}


                                />
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                showBroker1 && <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"></div>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Update Broker : {singleAdminData?.Companyname}

                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => { setShowAddBroker1(false); formik1.resetForm() }}
                                />
                            </div>
                            <div>
                                <AddForm
                                    fields={fields1}
                                    btn_name="Update"
                                    formik={formik1}


                                />
                            </div>
                        </div>
                    </div>
                </div>
            }


            {
                showAllClientList && (
                    <div
                        className="modal show"
                        id="exampleModal"
                        style={{ display: "block" }}
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Client List: {companyName}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => setShowAllClientList(false)} // Close modal on button click
                                    />
                                </div>
                                <div className="modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                                    <table className="table table-striped table-bordered">
                                        <thead className="">
                                            <tr>
                                                <th style={{ width: "33%" }}>Name</th>
                                                <th style={{ width: "33%" }}>Email</th>
                                                <th style={{ width: "33%" }}>Phone</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allClientList?.length > 0 ? (
                                                allClientList.map((client, index) => (
                                                    <tr key={index}>
                                                        <td>{client.Username}</td>
                                                        <td>{client.EmailId}</td>
                                                        <td>{client.Mobile_No}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" style={{ textAlign: "center" }}>
                                                        No clients found for {singleAdminData?.Companyname}.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        // className="submit-button-one"
                                        data-bs-dismiss="modal"
                                        onClick={() => setShowAllClientList(false)} // Close modal on button click
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            {
                showAllSubAdminList && (
                    <div
                        className="modal show"
                        id="exampleModal"
                        style={{ display: "block" }}
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Sub Admin List: {companyName}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => setShowAllSubAdminList(false)} // Close modal on button click
                                    />
                                </div>
                                <div className="modal-body">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allSubAdminList?.length > 0 ? (
                                                allSubAdminList.map((subAdmin, index) => (
                                                    <tr key={index}>
                                                        <td>{subAdmin.Username}</td>
                                                        <td>{subAdmin.EmailId}</td>
                                                        <td>{subAdmin.Mobile_No}</td>
                                                        <button onClick={(e) => handleSubAdminDelete(subAdmin.Username, index)}><Trash2 /></button>

                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" style={{ textAlign: "center" }}>
                                                        No Sub Admin List found for {singleAdminData?.Companyname}.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                        onClick={() => setShowAllSubAdminList(false)} // Close modal on button click
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            {
                showOfferModal && (
                    <>
                        {/* Overlay to dim the background */}
                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
                                zIndex: 1040, // Below modal but above other content
                            }}
                        ></div>

                        {/* Modal */}
                        <div className="modal show" id="exampleModal" style={{ display: "block", zIndex: 1050 }}>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add Offer: {offerData.Companyname}</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setShowOfferModal(false)}
                                        />
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label className="form-label">Duration</label>
                                            <select
                                                className="form-control"
                                                value={offerData.Durtion}
                                                onChange={(e) =>
                                                    setOfferData({ ...offerData, Durtion: e.target.value })
                                                }
                                            >
                                                <option value="" disabled>Select Duration</option>
                                                {durationOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Price</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={offerData.Price}
                                                onChange={(e) =>
                                                    setOfferData({ ...offerData, Price: parseFloat(e.target.value) })
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Offer Price</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={offerData.OfferPrice}
                                                onChange={(e) =>
                                                    setOfferData({
                                                        ...offerData,
                                                        OfferPrice: parseFloat(e.target.value),
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={handleOfferSubmit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

        </Content>
    );
};

export default Strategygroup;
