import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  createAdmin,
  GetAllThemes,
  superToAdminGetNewPermission,
} from "../../CommonAPI/SuperAdmin";
import AddForm from "../../../ExtraComponent/FormData2";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Content from "../../../ExtraComponent/Content";

const Adduser = () => {
  const navigate = useNavigate();

  const [permissionArray, setPermissionArray] = useState([
    // { "value": "MT4Trade", "label": "MT4 Trade" },
    // { "value": "SignalGenerating", "label": "Signal Generating" },
    // { "value": "MakeStrategy", "label": "Make Strategy" },
  ]);

  const [optionsArray, setOptionsArray] = useState([
    { value: "ICICI", label: "ICICI" },
    { value: "UPSTOX", label: "UPSTOX" },
    { value: "5PAISA", label: "5 PAISA" },
    { value: "ANGEL", label: "ANGEL" },
    { value: "MASTERTRUST", label: "MASTERTRUST" },
    { value: "FYERS", label: "FYERS" },
    { value: "ALICEBLUE", label: "ALICEBLUE" },
    { value: "ZEBULL", label: "ZEBULL" },
    { value: "MANDOT", label: "MANDOT" },
    { value: "INDIRA", label: "INDIRA" },
    { value: "DHAN", label: "DHAN" },
    { value: "MARKETHUB", label: "MARKETHUB" },
    { value: "FINVASIA", label: "FINVASIA" },
    { value: "KOTAK", label: "KOTAK" },
  ]);
  const [themesArray, setThemesArray] = useState([]);

  const fetchPermissions = async () => {
    try {
      const response = await superToAdminGetNewPermission();
      if (response?.Status) {
        const formattedPermissions = Array.from(
          new Set(response.Data.map((item) => item.NewUpdate)) // Get unique NewUpdate values
        ).map((uniqueValue) => ({
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
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error fetching new permissions", error);
    }
  };

  const fetchThemes = async () => {
    try {
      const response = await GetAllThemes();
      if (response?.Status) {
        const formattedThemes = response.Theme.map((theme) => ({
          value: theme,
          label: theme,
        }));
        setThemesArray(formattedThemes);
      }
    } catch (error) {
      console.error("Error fetching themes", error);
    }
  };

  useEffect(() => {
    fetchPermissions();
    fetchThemes();
  }, []);

  const formik = useFormik({
    initialValues: {
      SignuserName: "",
      mobile_no: "",
      Signpassword: "",
      ConfirmPassword: "",
      SignEmail: "",
      AmmountDetails: 0,
      SOPLiveTrade: 0,
      SOPPaperTrade: 0,
      SOPScriptwise: 0,
      ChartLiveTrade: 0,

      Companyname: "",
      Url: "",

      Permission: [],

      ChartPerMonth: 0,
      ChartPaperTrade: 0,
      BrokerPermission: [],
      Theme: [],
      Brokername:"ALICEBLUE"
    },
    validate: (values) => {
      let errors = {};
      if (!values.SignuserName) {
        errors.SignuserName = "Please Enter Username";
      }
      if (!values.mobile_no) {
        errors.mobile_no = "Please Enter Mobile Number";
      }
      if (!values.SignEmail) {
        errors.SignEmail = "Please Enter Email";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.SignEmail)
      ) {
        errors.SignEmail = "Invalid Email Address";
      }
      if (!values.Signpassword) {
        errors.Signpassword = "Please Enter Password";
      }
      if (!values.ConfirmPassword) {
        errors.ConfirmPassword = "Please Enter Confirm Password";
      }
      if (values.Signpassword !== values.ConfirmPassword) {
        errors.ConfirmPassword = "Password And Confirm Password Should Be Same";
      }
      if (values.AmmountDetails === "") {
        errors.AmmountDetails = "Please Enter Amount";
      }
      if (values.SOPLiveTrade === "") {
        errors.SOPLiveTrade = "Please Enter Live Trade Amount";
      }
      if (values.SOPPaperTrade === "") {
        errors.SOPPaperTrade = "Please Enter Paper Trade Amount";
      }
      if (values.SOPScriptwise === "") {
        errors.SOPScriptwise = "Please Enter Paper Trade Amount";
      }
      if (!values.Companyname) {
        errors.Companyname = "Please Enter Company Name";
      }
      if (!values.Url) {
        errors.Url = "Please Enter URL";
      }
      if (values.ChartPerMonth === "") {
        errors.ChartPerMonth = "Please Enter Charting Amount";
      }
      if (values.ChartPaperTrade === "") {
        errors.ChartPaperTrade = "Please Enter Chart Per Trade";
      }
      if (values.ChartLiveTrade === "") {
        errors.ChartLiveTrade = "Please Enter Chart Live Trade";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const req = {
        SignuserName: values.SignuserName,
        mobile_no: values.mobile_no,
        Signpassword: values.Signpassword,
        ConfirmPassword: values.ConfirmPassword,
        SignEmail: values.SignEmail,
        AmmountDetails: values.AmmountDetails,
        SOPLiveTrade: values.SOPLiveTrade,
        SOPPaperTrade: values.SOPPaperTrade,
        SOPScriptwise: values.SOPScriptwise,
        Companyname: values.Companyname,
        Url: values.Url,
        permission: values.Permission,
        ChartPerMonth: values.ChartPerMonth,

        BrokerPermission: values.BrokerPermission,
        ChartPaperTrade: values.ChartPaperTrade,
        ChartLiveTrade: values.ChartLiveTrade,
        Theme: values.Theme,
        Brokername: values.Brokername
      };

      await createAdmin(req)
        .then((response) => {
          if (response.Status) {
            Swal.fire({
              // background: "#1a1e23 ",
              backdrop: "#121010ba",
              confirmButtonColor: "#1ccc8a",
              title: "Admin Created!",
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

  const fields = [
    {
      name: "SignuserName",
      label: "Username",
      type: "text",
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
      name: "SignEmail",
      label: "Email ID",
      type: "text",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
    },
    {
      name: "Signpassword",
      label: "Password",
      type: "password",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
    },
    {
      name: "ConfirmPassword",
      label: "Confirm Password",
      type: "password",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
    },
    {
      name: "AmmountDetails",
      label: "Amount",
      type: "text3",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
    },
    {
      name: "SOPLiveTrade",
      label: "Live Trade Amount(SOP)",
      type: "text3",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
    },
    {
      name: "SOPPaperTrade",
      label: "Paper Trade Amount(SOP)",
      type: "text3",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
    },
    {
      name: "SOPScriptwise",
      label: "Per Script Amount(SOP)",
      type: "text3",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
    },

    {
      name: "ChartPerMonth",
      label: "Charting Amount",
      type: "text3",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
    },

    {
      name: "ChartLiveTrade",
      label: "Chart Live Trade Amount",
      type: "text3",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
    },
    {
      name: "ChartPaperTrade",
      label: "Chart Paper Trade Amount",
      type: "text3",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: false,
    },

    {
      name: "Companyname",
      label: "Company Name",
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
      disable: false,
    },
    {
      name: "Brokername",
      label: "Admin Broker",
      type: "select",
      label_size: 12,
      col_size: 6,
      disable: false,
      options: [
        { value: "ALICEBLUE", label: "ALICEBLUE" },
        { value: "MARKETHUB", label: "MARKETHUB" },
      ],
    },
    {
      name: "Permission",
      label: "Permission",
      type: "select2",
      label_size: 12,
      col_size: 6,
      disable: false,
      options: permissionArray,
    },

    {
      name: "BrokerPermission",
      label: "Broker Permission",
      type: "select2",
      label_size: 12,
      col_size: 6,
      disable: false,
      options: optionsArray,
    },

    {
      name: "Theme",
      label: "Theme Permission",
      type: "select2",
      label_size: 12,
      col_size: 6,
      disable: false,
      options: themesArray,
    },
  ];

  return (
    <>
      <Content
        Page_title={"Create Admin"}
        button_status={false}
        backbutton_status={true}
      >
        <AddForm
          fields={fields}
          btn_name="Add"
          btn_name1="Cancel"
          formik={formik}
          btn_name1_route={"/admin/clientservice"}
        />
      </Content>
    </>
  );
};

export default Adduser;
