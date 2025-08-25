import React, { useEffect, useState } from "react";
import {
  GetClientService,
  EditClientPanle,
  Get_Broker_Name,
  GETBrokerGroupRecord,
} from "../../CommonAPI/Admin";
import FullDataTable from "../../../ExtraComponent/CommanDataTable";
import { useNavigate } from "react-router-dom";
import { SquarePen } from "lucide-react";
import { useFormik } from "formik";
import AddForm from "../../../ExtraComponent/FormData";
import Swal from "sweetalert2";
import { Get_All_Plans } from "../../CommonAPI/User";
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import Content from "../../../ExtraComponent/Content";
import Loader from "../../../ExtraComponent/Loader";

const Clientservice = () => {
  const navigate = useNavigate();
  const adminPermission = localStorage.getItem("adminPermission");
  const [clientService, setClientService] = useState({
    loading: true,
    data: [],
  });
  const [clientServiceFiltered, setClientServiceFiltered] = useState({
    loading: true,
    data: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [brokerRecordData, setBrokerRecordData] = useState([]);
  const [showBrokerModal, setShowBrokerModal] = useState(false);
  const permissionArray = [];

  if (adminPermission) {
    adminPermission?.includes("Option Chain") &&
      permissionArray.push({ label: "Option Chain", value: "Option Chain" });
         adminPermission?.includes("Golden Strategy") &&
      permissionArray.push({ label: "Golden Strategy", value: "Golden Strategy" });
  }

  useEffect(() => {
    fetchBrokerName();
    GetAllPlansData();
  }, []);

  useEffect(() => {
    fetchClientService();
  }, []);

  useEffect(() => {
  if(searchInput && clientService.data){
    const filteredData = clientService.data.filter((item) => {
          const searchInputMatch =
            searchInput === "" ||
            item.Username.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.Mobile_No.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.EmailId.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.BrokerName.toLowerCase().includes(searchInput.toLowerCase());
          return searchInputMatch;
        });
        setClientServiceFiltered({
          loading: false,
          data: filteredData,
        }); 
  }
  }, [searchInput]);

  useEffect(() => {
    if (showModal) {
      formik.setFieldValue(
        "Broker",
        selectedIndex.BrokerName == "DEMO" ? "" : selectedIndex.BrokerName
      );
      formik.setFieldValue("User", selectedIndex.Username);
    }
  }, [showModal]);

  const fetchBrokerName = async () => {
    try {
      const response = await Get_Broker_Name();
      if (response.Status) {
        const brokerList = response.brokers.filter(
          (item) => item.BrokerName !== "DEMO"
        );
        setBrokers(brokerList);
      } else {
        setBrokers([]);
      }
    } catch (error) {
      console.log("Error in fetching brokers", error);
    }
  };

  const fetchClientService = async () => {
    try {
      const response = await GetClientService();
      if (response.Status) {
      

        setClientService({
          loading: false,
          data: response.Data,
        });
        setClientServiceFiltered({
          loading: false,
          data: response.Data
        });
      } else {
        setClientService({ loading: false, data: [] });
        setClientServiceFiltered({ loading: false, data: [] });
      }
    } catch (error) {
      console.log("Error in fetching client services", error);
    }
  };

  const GetAllPlansData = async () => {
    await Get_All_Plans()
      .then((response) => {
        if (response.Status) {
          const LivePlanName = response.Admin.filter(
            (item) =>
              item.Planname !== "One Week Demo" &&
              item.Planname !== "Two Days Demo"
          );
          const DemoPlanName = response.Admin.filter(
            (item) =>
              item.Planname === "One Week Demo" ||
              item.Planname === "Two Days Demo"
          );
        }
      })
      .catch((err) => {
        console.log("Error in fetching the plans", err);
      });
  };

  const handleBrokerRecord = async (rowData) => {
    const username = rowData[3]; // Make sure index 3 is correct for 'Username'

    const response = await GETBrokerGroupRecord(username);

    if (response?.Status) {
      setBrokerRecordData(response.Data);
      setShowBrokerModal(true);
      // Aap yahan modal open kar sakte hain ya state update kar sakte hain
    } else {
      console.error("API Error:", response?.message || "Something went wrong");
    }
  };

  const formik = useFormik({
    initialValues: {
      User: "",
      Broker: "",
      GroupName: "",
      permissions: [],
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
        // GroupName: selectedOptions?.map((item) => item?.value || item),
        SubAdmin: "",
        Broker: values.Broker,
        Permission: formik.values.permissions || [], // Ensure permissions is always an array
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
          }, 1500);
          fetchClientService();
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
        brokers.map((item) => ({
          label: item.BrokerName,
          value: item.BrokerName,
        })),
      showWhen: (values) => selectedIndex.BrokerName !== "DEMO",
      label_size: 12,
      col_size: 12,
    },
  ];

  const columns = [
    {
      name: "S.No",
      label: "S.No",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "Edit",
      label: "Edit",
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
              formik.setFieldValue("permissions", rowDataWithKeys?.Permission || []);
            }}
          />
        ),
      },
    },
    {
      name: "BrokerRecord",
      label: "Broker Record",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => (
          <button
            style={{
              padding: "5px 10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => handleBrokerRecord(tableMeta.rowData)}
          >
            View
          </button>
        ),
      },
    },
    {
      name: "Username",
      label: "Username",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => value || "-",
      },
    },

    {
      name: "BrokerName",
      label: "Broker Name",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => value || "-",
      },
    },
    {
      name: "Planname",
      label: "Plan Name",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          // Dropdown for plans (enabled, fixed width)
          const plans = Array.isArray(value) ? value : value ? [value] : [];
          return (
            <select
              style={{
                width: 160,
                minWidth: 160,
                maxWidth: 160,
                padding: "4px 8px",
                borderRadius: 4,
                background: "#fff",
                color: "#222",
                cursor: "pointer",
              }}
              defaultValue={plans[0] || ""}
              onClick={(e) => e.stopPropagation()} // Prevent row click
            >
              {plans.length > 0 ? (
                plans.map((plan, idx) => (
                  <option key={idx} value={plan}>
                    {plan}
                  </option>
                ))
              ) : (
                <option value="">-</option>
              )}
            </select>
          );
        },
      },
    },
 {
      name: "Permission",
      label: "Permission",
     options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          // Dropdown for plans (enabled, fixed width)
          const plans = Array.isArray(value) ? value : value ? [value] : [];
          return (
            <select
              style={{
                width: 160,
                minWidth: 160,
                maxWidth: 160,
                padding: "4px 8px",
                borderRadius: 4,
                background: "#fff",
                color: "#222",
                cursor: "pointer",
              }}
              defaultValue={plans[0] || ""}
              onClick={(e) => e.stopPropagation()} // Prevent row click
            >
              {plans.length > 0 ? (
                plans.map((plan, idx) => (
                  <option key={idx} value={plan}>
                    {plan}
                  </option>
                ))
              ) : (
                <option value="">-</option>
              )}
            </select>
          );
        },
      },
    },
    {
      name: "SubAdmin",
      label: "Created by",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) =>
          value == "" || value == null ? "Admin" : value,
      },
    },
    {
      name: "EmailId",
      label: "Email ID",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => value || "-",
      },
    },

    {
      name: "Mobile_No",
      label: "Mobile Number",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => value || "-",
      },
    },
    {
      name: "CreateDate",
      label: "Account Create Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => value || "-",
      },
    },
    {
      name: "ServiceStartDate",
      label: "Service Start Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => value || "-",
      },
    },
    {
      name: "ServiceEndDate",
      label: "Service End Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => value || "-",
      },
    },
    {
      name: "Total Service Count",
      label: "Total Service Count",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => value || "-",
      },
    },
    
   
  ];




  return (
    <>
      <Content
        Page_title={" 📉 Client Service"}
        button_status={true}
        backbutton_status={true}
        route={"/admin/adduser"}
        button_title={"Create Account"}
      >
        {clientServiceFiltered.loading ? (
          <Loader />
        ) : (
          <>
            <div className="iq-card-body d-flex justify-content-between">
              <div className="mb-3 col-lg-3">
                <input
                  type="text"
                  className=" form-control rounded p-1 px-2"
                  placeholder="Search..."
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                />
              </div>
              <button
                className="addbtn "
                color="addbtn"
                onClick={() => navigate("/admin/adduser")}
              >
                Create Account
              </button>
            </div>
            {clientServiceFiltered.data && clientServiceFiltered.data.length > 0 ? (
              <FullDataTable
                columns={columns}
                data={clientServiceFiltered.data}
                checkBox={false}
              />
            ) : (
              <NoDataFound />
            )}
          </>
        )}
        {showModal && (
          <>
            {/* Darkened background overlay */}
            <div className="modal-backdrop fade show"></div>

            <div
              className="modal fade show"
              id="add_vendor"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="modalLabel"
              aria-hidden="true"
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-dialog-centered custom-modal-width">
                <div className="modal-content card-bg-color">
                  <div className="modal-header p-3">
                    {" "}
                    {/* Adjusted padding */}
                    <h5 className="modal-title card-text-Color" id="modalLabel">
                      Edit Client: {selectedIndex?.Username}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setShowModal(false);
                        formik.resetForm();
                      }}
                    />
                  </div>
                  <hr style={{ margin: "0" }} /> {/* Remove margin from hr */}
                  <div className="modal-body p-1 card-bg-color">
                    {" "}
                    {/* Adjusted padding */}
                    <AddForm
                      fields={fields.filter(
                        (field) =>
                          !field.showWhen || field.showWhen(formik.values)
                      )}
                      btn_name="Update"
                      formik={formik}
                      btn_name1_route="/admin/clientservice"
                      additional_field={
                        <div className="mt-2">
                          {permissionArray.length > 0 && (
                            <div className="col-lg-12 mt-3">
                              <h6 className="card-text-Color">Permissions</h6>
                              <div className="checkbox-group">
                                {permissionArray.map((permission, index) => (
                                  <div key={index} className="form-check">
                                    <input
                                      type="checkbox"
                                      id={`permission-${index}`}
                                      className="form-check-input"
                                      value={permission.value}
                                      onChange={(e) => {
                                        const selectedPermissions =
                                          formik.values.permissions || [];
                                        if (e.target.checked) {
                                          formik.setFieldValue("permissions", [
                                            ...selectedPermissions,
                                            permission.value,
                                          ]);
                                        } else {
                                          formik.setFieldValue(
                                            "permissions",
                                            selectedPermissions.filter(
                                              (perm) =>
                                                perm !== permission.value
                                            )
                                          );
                                        }
                                      }}
                                      checked={formik.values.permissions.includes(
                                        permission.value
                                      )}
                                    />
                                    <label
                                      htmlFor={`permission-${index}`}
                                      className="form-check-label card-text-Color"
                                    >
                                      {permission.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {showBrokerModal && (
          <>
            {/* Dark overlay */}
            <div className="modal-backdrop fade show"></div>

            <div
              className="modal fade show"
              id="broker_record_modal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="brokerModalLabel"
              aria-hidden="true"
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content card-bg-color">
                  <div className="modal-header p-3">
                    <h5
                      className="modal-title card-text-Color"
                      id="brokerModalLabel"
                    >
                      Broker Group Record
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => {
                        setShowBrokerModal(false);
                        setBrokerRecordData([]);
                      }}
                    />
                  </div>
                  <hr style={{ margin: "0" }} />

                  <div
                    className="modal-body p-3 card-bg-color"
                    style={{ maxHeight: "70vh", overflowY: "auto" }}
                  >
                    {brokerRecordData?.length > 0 ? (
                      brokerRecordData.map((item, index) => (
                        <div
                          key={index}
                          className="mb-4 p-3 border rounded card-bg-color"
                        >
                          <div className="row">
                            <div className="col-md-6 mb-2">
                              <strong className="card-text-Color">
                                Username:
                              </strong>{" "}
                              {item.Username}
                            </div>
                            <div className="col-md-6 mb-2">
                              <strong className="card-text-Color">Date:</strong>{" "}
                              {item.Date}
                            </div>
                            <div className="col-md-6 mb-2">
                              <strong className="card-text-Color">
                                Broker:
                              </strong>{" "}
                              {item.Broker}
                            </div>

                            <div className="col-md-6 mb-2">
                              <strong className="card-text-Color">
                                SubAdmin:
                              </strong>{" "}
                              {item.SubAdmin?.length
                                ? Array.isArray(item.SubAdmin)
                                  ? item.SubAdmin.join(", ")
                                  : item.SubAdmin
                                : "Admin"}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">No records found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Content>
    </>
  );
};

export default Clientservice;
