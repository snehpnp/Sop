import React, { useEffect, useState } from "react";
import { GetAllSubadminClient } from "../../CommonAPI/SubAdmin";
import FullDataTable from "../../../ExtraComponent/CommanDataTable";
import { Link, useNavigate } from "react-router-dom";
import {
  GetGroupNames,
  EditClientPanle,
  Get_Broker_Name,
} from "../../CommonAPI/Admin";
import { SquarePen } from "lucide-react";
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import Select from "react-select";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import Content from "../../../ExtraComponent/Content";

const AllClient = () => {
  const userName = localStorage.getItem("name");
  const navigate = useNavigate();
  const [clientService, setClientService] = useState({
    loading: true,
    data: [],
  });
  const [searchInput, setSearchInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [optionsArray, setOptionsArray] = useState([]);
  const permission = localStorage.getItem("SubAdminPermission");


  useEffect(() => {
    fetchAllSubadmin();
  }, [searchInput]);

  useEffect(() => {
    fetchBrokerName();
    fetchGroupDetails();
  }, []);

  const fetchAllSubadmin = async () => {
    const req = { userName: userName };
    try {
      const response = await GetAllSubadminClient(req);
      if (response.Status) {
        const filteredData = response.Data.filter((item) => {
          const searchInputMatch =
            searchInput === "" ||
            item.Username.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.BrokerName.toLowerCase().includes(searchInput.toLowerCase()) ||
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
      console.log("Error in fetching Subadmin", error);
    }
  };

  const fetchBrokerName = async () => {
    try {
      const response = await Get_Broker_Name();
      if (response.Status) {
        const brokerList = response?.brokers?.filter(
          (item) => item?.BrokerName !== "DEMO"
        );
        setBrokers(brokerList);
      } else {
        setBrokers([]);
      }
    } catch (error) {
      console.log("Error in fetching brokers", error);
    }
  };

  const fetchGroupDetails = async () => {
    try {
      const response = await GetGroupNames();
      if (response.Status) {
        const options = response.Data.map((item) => ({
          label: item.GroupName,
          value: item.GroupName,
        }));
        setOptionsArray(options);
      } else {
        setOptionsArray([]);
      }
    } catch (error) {
      console.log("Error in fetching group data", error);
    }
  };

  const EditSubadmindetail = (value, tableMeta) => {
    setSelectedIndex(clientService.data[tableMeta.rowIndex]);
    setShowModal(true);

  };

  const viewClient = permission.includes("ViewClient");
  const editClient = permission.includes("EditClient");
  const addClient = permission.includes("AddClient");

  const maskValue = (value) => {
    if (!value || value.length < 2) return "*****"; // Handle edge cases
    return `${value.charAt(0)}*****${value.charAt(value.length - 1)}`;
  };

  const columns = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "Edit",
      label: "Edit",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <SquarePen
            onClick={() => {
              if (editClient) {
                EditSubadmindetail(value, tableMeta);
              } else {
                Swal.fire("You don't have permission to edit!");
              }
            }}
          />
        ),
      },
    },

    {
      name: "Username",
      label: "Username",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) =>
          viewClient ? value || "-" : maskValue(value),
      },
    },
    {
      name: "EmailId",
      label: "Email ID",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) =>
          viewClient ? value || "-" : maskValue(value),
      },
    },
    {
      name: "Mobile_No",
      label: "Mobile Number",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) =>
          viewClient ? value || "-" : maskValue(value),
      },
    },
    {
      name: "BrokerName",
      label: "Broker Name",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) =>
          viewClient ? value || "-" : maskValue(value),
      },
    },
    {
      name: "CreateDate",
      label: "Create Date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) =>
          viewClient ? value || "-" : maskValue(value),
      },
    },
    {
      name: "ServiceStartDate",
      label: "Service Start Date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) =>
          viewClient ? value || "-" : maskValue(value),
      },
    },
    {
      name: "ServiceEndDate",
      label: "Service End Date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) =>
          viewClient ? value || "-" : maskValue(value),
      },
    },
    {
      name: "Group",
      label: "Group",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) =>
          viewClient ? value?.join(", ") || "-" : maskValue(value?.join(", ")),
      },
    },
    {
      name: "Planname",
      label: "Plan Name",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) =>
          viewClient ? value?.join(", ") || "-" : maskValue(value?.join(", ")),
      },
    },
    {
      name: "License",
      label: "License",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "LicenseStartDate",
      label: "License Start Date",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "ServiceCount",
      label: "Service Count",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "AutoLogin",
      label: "Auto Login",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => (value ? value : "-"),
      },
    },
    {
      name: "SubAdmin",
      label: "SubAdmin",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Key",
      label: "Key",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const formik = useFormik({
    initialValues: {
      User: "",
      Broker: "",
      GroupName: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.User && showModal) {
        errors.User = "Please enter the User";
      }
      if (!values.Broker && showModal) {
        errors.Broker = "Please Select the Broker";
      }
      return errors;
    },

    onSubmit: async (values) => {
      const req = {
        User: values.User,
        // GroupName: selectedOptions.map(item => item.value),
        Broker: values.Broker,
        SubAdmin: userName,
      };
      try {
        const response = await EditClientPanle(req);
        if (response.Status) {
          Swal.fire({
            // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "Updated",
            text: response.message,
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
          });
          setTimeout(() => {
            setShowModal(false);
            formik.resetForm();
            setSelectedOptions([]);
          }, 1500);
          fetchAllSubadmin();
        } else {
          Swal.fire({
            // background: "#1a1e23 ",
            backdrop: "#121010ba",
            confirmButtonColor: "#1ccc8a",
            title: "Error",
            text: response.message,
            icon: "error",
            timer: 1500,
            timerProgressBar: true,
          });
        }
      } catch (err) {
        console.log("Error in update client", err);
      }
    },
  });

  const fields = [
    {
      name: "Broker",
      label: "Broker",
      type: "select",
      options:
        brokers &&
        brokers?.map((item) => ({
          label: item?.BrokerName,
          value: item?.BrokerName,
        })),
      label_size: 12,
      col_size: 12,
    },
  ];

  useEffect(() => {
    if (showModal) {
      formik.setFieldValue(
        "Broker",
        selectedIndex?.BrokerName == "Demo" ? "" : selectedIndex?.BrokerName
      );
      formik.setFieldValue("User", selectedIndex?.Username);
      setSelectedOptions(
        showModal &&
          selectedIndex?.Group.map((item) => ({ label: item, value: item }))
      );
    }
  }, [showModal]);

  return (
    <>
      <Content
        Page_title={" 📉 All Client"}
        button_status={true}
        backbutton_status={true}
        route={"/subadmin/addclient"}
        button_title={"Add Client"}
      >
        <div className="iq-card-body">
       <div className="d-flex justify-content-between align-items-center mb-3">
  
          <div className="mb-3 col-lg-3">
            <input
              type="text"
              className=" form-control rounded p-1 px-2"
              placeholder="Search..."
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
          </div>

         {addClient && <div className="mb-3 col-lg-3">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (permission.includes("AddClient")) {
                  navigate("/subadmin/addclient");
                } else {
                  Swal.fire("You don't have permission to add a client!");
                }
              }}
            >
              Add Client
            </button>
          </div>}

       </div>





          {clientService.data && clientService.data.length > 0 ? (
            <FullDataTable
              columns={columns}
              data={clientService.data}
              checkBox={false}
            />
          ) : (
            <NoDataFound />
          )}
        </div>

        {showModal && (
          <div
            className="modal custom-modal d-flex"
            id="add_vendor"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header clientheader border-0 pb-0">
                  <div className="form-header modal-header-title text-start mb-0">
                    <h4 className="mb-0">
                      Edit Client : {selectedIndex?.Username}
                    </h4>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
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
                    (field) => !field.showWhen || field.showWhen(formik.values)
                  )}
                  btn_name="Update"
                  formik={formik}
                  btn_name1_route="/admin/clientservice"
                 
                />
              </div>
            </div>
          </div>
        )}
      </Content>
    </>
  );
};

export default AllClient;
