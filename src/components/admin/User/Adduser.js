import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  CreateAccount,
  Get_Broker_Name,
  GetGroupNames,
} from "../../CommonAPI/Admin";
import AddForm from "../../../ExtraComponent/FormData2";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Loader from "../../../ExtraComponent/Loader";
import { Get_All_Plans } from "../../CommonAPI/User";
import Select from "react-select";
import Content from "../../../ExtraComponent/Content";
import { index } from "d3";

const Adduser = () => {
  const navigate = useNavigate();
  const [getBroker, setBroker] = useState({ loading: true, data: [] });
  const [getGroupData, setGroupData] = useState({ loading: true, data: [] });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [optionsArray, setOptionsArray] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [GetAllPlans, setAllPlans] = useState({
    LivePlanName: [],
    DemoPlanName: [],
    data: [],
    SOPDEMO: [],
    SOPLive: [],
    ChartDEMO: [],
    ChartLive: [],
  });
  const [plans, setPlans] = useState({ SOPPlans: [], ChartPlans: [] });
  const [planType, setPlanType] = useState("SOP"); // Add this state
  const [selectedSOP, setSelectedSOP] = useState(null);
  const [selectedCharting, setSelectedCharting] = useState(null);
  const [planSelectError, setPlanSelectError] = useState("");
  const Name_regex = (name) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };
  const adminPermission = localStorage.getItem("adminPermission");

  useEffect(() => {
    getBrokerName();
    GetAllGroupDetails();
    GetAllPlansData();
  }, []);

  const getBrokerName = async () => {
    await Get_Broker_Name()
      .then((response) => {
        if (response.Status) {
          const filterOutBroker = response.brokers.filter((item) => {
            return item.BrokerName != "DEMO";
          });
          setBroker({
            loading: false,
            data: filterOutBroker,
          });
        } else {
          setBroker({
            loading: false,
            data: [],
          });
        }
      })
      .catch((err) => {
        console.log("Error in finding the broker", err);
      });
  };

  const GetAllGroupDetails = async () => {
    try {
      const response = await GetGroupNames();
      if (response.Status) {
        const options = response.Data.map((item) => ({
          label: item.GroupName,
          value: item.GroupName,
        }));
        setOptionsArray(options);
        setGroupData({
          loading: false,
          data: response.Data,
        });
      } else {
        setOptionsArray([]);
        setGroupData({
          loading: false,
          data: [],
        });
      }
    } catch (err) {
      console.log("Error fetching group names", err);
    }
  };

  const GetAllPlansData = async () => {
    await Get_All_Plans()
      .then((response) => {
        if (response.Status) {
          const LivePlanName = [
            ...response.Admin.filter(
              (item) =>
                item.Planname !== "One Week Demo" &&
                item.Planname !== "Two Days Demo"
            ),
            ...response.Charting, // Charting array ko add kar diya
          ];

          const SOPPlans = LivePlanName.filter(
            (item) =>
              item.Planname !== "One Week Demo" &&
              item.Planname !== "Two Days Demo" &&
              item.ChartingSignal.length === 0
          );
          const ChartPlans = LivePlanName.filter(
            (item) =>
              item.Planname !== "One Week Demo" &&
              item.Planname !== "Two Days Demo" &&
              item.ChartingSignal.length !== 0
          );
          setPlans({ SOPPlans, ChartPlans });

          const DemoPlanName = response.Admin.filter(
            (item) =>
              item.Planname === "One Week Demo" ||
              item.Planname === "Two Days Demo"
          );

          const sopDemo = response.Admin.filter(
            (item) => item.PlanType === "Demo"
          );
          const sopLive = response.Admin.filter(
            (item) => item.PlanType === "Live"
          );

          const chartDemo = response.Charting.filter(
            (item) => item.PlanType === "Demo"
          );
          const chartLive = response.Charting.filter(
            (item) => item.PlanType === "Live"
          );

          setAllPlans({
            DemoPlanName: DemoPlanName,
            LivePlanName: LivePlanName,
            data: response.Admin,
            SOPDEMO: sopDemo,
            SOPLive: sopLive,
            ChartDEMO: chartDemo,
            ChartLive: chartLive,
          });
        } else {
          setAllPlans({ DemoPlanName: [], LivePlanName: [], data: [] });
        }
      })
      .catch((err) => {
        console.log("Error in fetching the plans", err);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
      mobile_no: "",
      Select_License: "",
      ClientAmmount: 0,
      planname: "",
      planname2: "",
      bname: "",
      groupName: [],
      permissions: [],
    },
    validate: (values) => {
      let errors = {};
      if (!values.username) {
        errors.username = "Please Enter Username";
      }

      if (!values.email) {
        errors.email = "Please Enter Email ID";
      } else {
        const emailRegex =
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co\.in|in|net|org|edu|gov|uk|us|info|biz|io|co)$/i;

        const trimmedEmail = values.email.trim();

        if (!emailRegex.test(trimmedEmail)) {
          errors.email = "Please Enter a Valid Email ID";
        } else if (/\.\./.test(trimmedEmail)) {
          errors.email = "Invalid Email Format";
        } else if (/^[._%+-]|[._%+-]$/.test(trimmedEmail)) {
          errors.email = "Email cannot start or end with special characters";
        }
      }
      if (!values.password) {
        errors.password = "Please Enter Password";
      }
      if (!values.cpassword) {
        errors.cpassword = "Please Enter Confirm Password";
      }
      if (!values.mobile_no) {
        errors.mobile_no = "Please Enter Mobile Number";
      }
      if (!values.Select_License) {
        errors.Select_License = "Please Select License";
      }
      if (!values.ClientAmmount && formik.values.Select_License == "2") {
        errors.ClientAmmount = "Please Enter Amount";
      }
      if (!values.planname2 && !values.planname) {
        errors.planname = "Please Select at least one Plan";
      }

      if (!values.bname && formik.values.Select_License == "2") {
        errors.bname = "Please Select Broker";
      }
      // Add this validation in formik.validate
      if (
        (values.Select_License === "1" || values.Select_License === "2") &&
        !values.planname &&
        !values.planname2
      ) {
        errors.planname =
          "❗ Please select at least one plan from SOP or Charting.";
        errors.planname2 =
          "❗ Please select at least one plan from SOP or Charting.";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const req = {
        username: values.username,
        email: values.email,
        password: values.password,
        cpassword: values.cpassword,
        mobile_no: values.mobile_no,
        bname: formik.values.Select_License == 1 ? "DEMO" : values.bname,
        ClientAmmount:
          formik.values.Select_License == 1 ? 0 : Number(values.ClientAmmount),
        planname: values.planname,
        group: selectedOptions && selectedOptions.map((item) => item.value),
        Permission: formik.values.permissions || [], // Ensure permissions is always an array
        SubAdmin: "",
        planname2: values.planname2 || "",
      };

      const FilterPlanAmount = GetAllPlans.LivePlanName.filter(
        (item) => (item.Planname || item.PlanName) === values.planname
      );

      const FilterPlanAmount2 = GetAllPlans.LivePlanName.filter(
        (item) => (item.Planname || item.PlanName) === formik.values.planname2
      );

      // Calculate total plan amount from both plans if selected
      const sopAmount = FilterPlanAmount[0]?.SOPPrice || 0;
      const chartAmount = FilterPlanAmount2[0]?.ChartPerMonth || 0;
      const totalPlanAmount = sopAmount + chartAmount;

      // If either plan is selected, check the amount
      if (
        (FilterPlanAmount.length > 0 || FilterPlanAmount2.length > 0) &&
        totalPlanAmount > values.ClientAmmount
      ) {
        Swal.fire({
          // background: "#1a1e23 ",
          backdrop: "#121010ba",
          confirmButtonColor: "#1ccc8a",
          title: "Invalid Amount",
          text: `The Total plan amount is ${totalPlanAmount}, but you've entered ${values.ClientAmmount}. Please enter an amount greater than or equal to the plan amount.`,
          icon: "error",
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }

      await CreateAccount(req)
        .then((response) => {
          if (response.Status) {
            Swal.fire({
              // background: "#1a1e23 ",
              backdrop: "#121010ba",
              confirmButtonColor: "#1ccc8a",
              title: "User Created!",
              text: response.message,
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
            });
            setTimeout(() => {
              navigate("/admin/clientservice");
            }, 1500);
          } else {
            Swal.fire({
              // background: "#1a1e23 ",
              backdrop: "#121010ba",
              confirmButtonColor: "#1ccc8a",
              title: "Error!",
              text: response.message,
              icon: "error",
              timer: 1500,
              timerProgressBar: true,
            });
          }
        })
        .catch((err) => {
          console.log("Error in adding the new user", err);
        });
    },
  });

  const permissionArray = [];

  if (adminPermission) {
    adminPermission.includes("Option Chain") &&
      permissionArray.push({ label: "Option Chain", value: "Option Chain" });
  }

  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
      autoComplete: "off",
    },
    {
      name: "email",
      label: "Email ID",
      type: "text",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
      autoComplete: "off",
    },
    {
      name: "cpassword",
      label: "Confirm Password",
      type: "password",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
    },
    {
      name: "mobile_no",
      label: "Mobile Number",
      type: "text3",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
    },
    {
      name: "Select_License",
      label: "License Type",
      type: "select1",
      options: [
        { label: "Demo", value: "1" },
        { label: "Live", value: "2" },
      ],
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
    },
    {
      name: "ClientAmmount",
      label: "Amount",
      type: "text3",
      showWhen: (values) => formik.values.Select_License == "2",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
    },

    // {
    //     name: "planType",
    //     label: "Plan Type",
    //     type: "select1",
    //     options:
    //         [{ label: "SOP", value: "SOP" },
    //         { label: "Charting", value: "Charting" },
    //         ],
    //     label_size: 12,
    //     hiding: false,
    //     col_size: 6,
    //     disable: false,
    //     showWhen: (values) => formik.values.Select_License == '2',
    // },

    // {
    //     name: "planname",
    //     label: "Plan Name",
    //     type: "select1",
    //     options:
    //         formik.values.Select_License === '1'
    //             ? GetAllPlans.DemoPlanName.map((item) => ({
    //                 label: item.PlanName || item.Planname,
    //                 value: item.PlanName || item.Planname,
    //             }))
    //             : formik.values.planType === 'SOP'
    //                 ? plans.SOPPlans.map((item) => ({
    //                     label: `${item.PlanName || item.Planname}${item.SOPPrice ? ` ₹ ${item.SOPPrice}` : ""}`,
    //                     value: item.PlanName || item.Planname,
    //                 }))
    //                 : formik.values.planType === 'Charting'
    //                     ? plans.ChartPlans.map((item) => ({
    //                         label: `${item.PlanName || item.Planname}${item.ChartPerMonth ? ` ₹ ${item.ChartPerMonth}` : ""}`,
    //                         value: item.PlanName || item.Planname,
    //                     }))
    //                     : [],
    //     label_size: 12,
    //     hiding: false,
    //     col_size: 6,
    //     disable: false,
    // },

    {
      name: "bname",
      label: "Broker",
      type: "select1",
      options:
        getBroker.data &&
        getBroker.data.map((item) => ({
          label: item.BrokerName,
          value: item.BrokerName,
        })),
      showWhen: (values) => formik.values.Select_License == "2",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
    },
  ];

  useEffect(() => {
    if (formik.values.Select_License === "1") {
      formik.setFieldValue("bname", "DEMO");
      formik.setFieldValue("ClientAmmount", 0);
      formik.setFieldValue("planname", "");
    } else if (formik.values.Select_License === "2") {
      formik.setFieldValue("bname", "");
      formik.setFieldValue("ClientAmmount", "");
      formik.setFieldValue("planname", "");
    }
  }, [formik.values.Select_License]);

  useEffect(() => {
    if (
      formik.values.Select_License === "1" ||
      formik.values.Select_License === "2"
    ) {
      setSelectedSOP(null);
      setSelectedCharting(null);
      setPlanSelectError("");
      formik.setFieldValue("groupName", []);
    }
  }, [formik.values.Select_License]);

  return (
    <Content
      Page_title={"📄 Add User"}
      button_status={false}
      backbutton_status={true}
    >
      <>
        {getGroupData.loading ? (
          <Loader />
        ) : (
          <AddForm
            fields={fields.filter(
              (field) => !field.showWhen || field.showWhen(formik.values)
            )}
            page_title="Create Account"
            btn_name="Add"
            btn_name1="Cancel"
            formik={formik}
            btn_name1_route={"/admin/clientservice"}
            additional_field={
              <>
                {(formik.values.Select_License === "1" ||
                  formik.values.Select_License === "2") && (
                  <div className="d-flex justify-content-between align-items-center gap-3 ">
                    <div className="col-lg-6 dropdownuser">
                      <label className="card-text-Color">
                        {formik.values.Select_License === "1"
                          ? "SOP Demo Plans"
                          : formik.values.Select_License === "2"
                          ? "SOP Live Plans"
                          : "Plans"}
                      </label>

                      <Select
                        value={selectedSOP}
                        isMulti={false}
                        options={
                          formik.values.Select_License === "1"
                            ? GetAllPlans.SOPDEMO.map((item) => ({
                                label: item.PlanName || item.Planname,
                                value: item.PlanName || item.Planname,
                              }))
                            : formik.values.Select_License === "2"
                            ? GetAllPlans.SOPLive.map((item) => ({
                                label: item.Planname + "₹" + item.SOPPrice,
                                value: item.Planname,
                              }))
                            : []
                        }
                        onChange={(selected) => {
                          setSelectedSOP(selected);
                          // Update groupName as the combination of both
                          formik.setFieldValue(
                            "planname",
                            selected?.value || ""
                          );

                          if (!selected && !selectedCharting) {
                            setPlanSelectError(
                              "Please select at least one plan from SOP or Charting."
                            );
                          } else {
                            setPlanSelectError("");
                          }
                        }}
                        className="basic-multi-select card-text-Color"
                        classNamePrefix="select"
                        placeholder="Select SOP Plan"
                      />
                    </div>

                    <div className="col-lg-6 dropdownuser">
                      <label className="card-text-Color">
                        {formik.values.Select_License === "1"
                          ? "Charting Demo Plans"
                          : formik.values.Select_License === "2"
                          ? "Charting Live Plans"
                          : "Plans"}
                      </label>

                      <Select
                        value={selectedCharting}
                        isMulti={false}
                        options={
                          formik.values.Select_License === "1"
                            ? GetAllPlans.ChartDEMO.map((item) => ({
                                label: item.PlanName || item.Planname,
                                value: item.PlanName || item.Planname,
                              }))
                            : formik.values.Select_License === "2"
                            ? GetAllPlans.ChartLive.map((item) => ({
                                label: item.Planname + "₹" + item.ChartPerMonth,
                                value: item.Planname,
                              }))
                            : []
                        }
                        onChange={(selected) => {
                          setSelectedCharting(selected);
                          // Update groupName as the combination of both
                          formik.setFieldValue(
                            "planname2",
                            selected?.value || ""
                          );
                          if (!selected && !selectedSOP) {
                            setPlanSelectError(
                              "Please select at least one plan from SOP or Charting."
                            );
                          } else {
                            setPlanSelectError("");
                          }
                        }}
                        className="basic-multi-select card-text-Color"
                        classNamePrefix="select"
                        placeholder="Select Charting Plan"
                      />
                    </div>
                  </div>
                )}
                {planSelectError && (
                  <div
                    style={{
                      color: "red",
                      marginTop: 8,
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  >
                    {planSelectError}
                  </div>
                )}

                {/* <div className="col-lg-6 dropdownuser">
                                        <label className='card-text-Color'>Select Group</label>
                                        <Select
                                            defaultValue={selectedIndex?.Planname?.map((item) => ({
                                                value: item,
                                                label: item,
                                            }))}
                                            isMulti
                                            options={optionsArray}
                                            onChange={(selected) => {
                                                setSelectedOptions(selected);
                                                formik.setFieldValue('groupName', selected.map((option) => option.value));
                                            }}
                                            className="basic-multi-select card-text-Color"
                                            classNamePrefix="select"
                                        />
                                    </div> */}

                {permissionArray.length > 0 && (
                  <div className="col-lg-12">
                    <label className="card-text-Color">Permission</label>
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
                                    (perm) => perm !== permission.value
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
              </>
            }
          />
        )}
      </>
    </Content>
  );
};

export default Adduser;
