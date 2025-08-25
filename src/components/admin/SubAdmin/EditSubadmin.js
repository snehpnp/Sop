// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { AddSubadminbyAdmin, EditSubadminbyAdmin, GetAllSubadmin } from "../../CommonAPI/Admin";
// import AddForm from "../../../ExtraComponent/FormData";
// import { useFormik } from "formik";
// import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
// import { useLocation, useNavigate } from "react-router-dom";
// import Loader from "../../../ExtraComponent/Loader";
// import { Get_All_Plans } from "../../CommonAPI/User";

// const EditSubadmin = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { rowData } = location.state || {};

//   const Name_regex = (name) => {
//     const nameRegex = /^[a-zA-Z]+$/;
//     return nameRegex.test(name);
//   };

//   const [optionsArray, setOptionsArray] = useState([
//     { value: "AddClient", label: "AddClient" },
//     { value: "ViewClient", label: "ViewClient" },
//     { value: "EditClient", label: "EditClient" },
//     { value: "TradeHistory", label: "TradeHistory" },
//     { value: "TradeReport", label: "TradeReport" },
//   ]);

//   const [permissions, setPermissions] = useState([]);

//   useEffect(() => {
//     const GetAllSubadminData = async () => {
//       const response = await GetAllSubadmin();
//       const matchuser = response.Data.find((item) => {
//         return item.Username === rowData.Username; // Match by Username
//       });

//       if (matchuser) {
//         setPermissions(matchuser.Permission); // Set the permissions array if match is found
//       }
//     };

//     GetAllSubadminData();
//   }, [rowData]);


//   const formik = useFormik({
//     initialValues: {
//       Username: rowData.Username || "",
//       Name: rowData.Name || "",
//       SignEmail: rowData.EmailId || "",
//       mobile_no: rowData.Mobile_No || "",
//       permissions: permissions || [],
//     },

//     validate: (values) => {
//       let errors = {};
//       if (!values.Username) {
//         errors.Username = "Please Enter Username";
//       } else if (!Name_regex(values.username)) {
//         errors.username = "Please Enter Valid Username";
//       }
//       if (!values.Name) {
//         errors.Name = "Please Enter Name";
//       } else if (!Name_regex(values.Name)) {
//         errors.Name = "Please Enter Valid Name";
//       }
//       if (!values.SignEmail) {
//         errors.SignEmail = "Please Enter Email ID";
//       } else {
//         const emailRegex =
//           /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|ymail|rediffmail|hotmail|outlook|aol|icloud|protonmail|example).(com|co.in|in|net|org|edu|gov|uk|us|info|biz|io|...)[a-zA-Z]{0,}$/;
//         if (!emailRegex.test(values.SignEmail)) {
//           errors.SignEmail = "Please Enter valid Email ID";
//         }
//       }
//       if (!values.mobile_no) {
//         errors.mobile_no = "Please Enter Mobile Number";
//       }

//       return errors;
//     },
//     onSubmit: async (values) => {

//       const req = {
//         Username: values.Username,
//         // Name: values.Name,
//         // SignEmail: values.SignEmail,
//         // mobile_no: values.mobile_no,
//         Permission: values.permissions, // Add permissions to request body
//       };
//       await EditSubadminbyAdmin(req)
//         .then((response) => {
//           if (response.Status) {
//             Swal.fire({
//   // background: "#1a1e23 ",
//   backdrop: "#121010ba",
// confirmButtonColor: "#1ccc8a",
//               title: "User Created!",
//               text: response.message,
//               icon: "success",
//               timer: 1500,
//               timerProgressBar: true,
//             });
//             setTimeout(() => {
//               navigate("/admin/allSubadmin");
//             }, 1500);
//           } else {
//             Swal.fire({
//   // background: "#1a1e23 ",
//   backdrop: "#121010ba",
// confirmButtonColor: "#1ccc8a",
//               title: "Error!",
//               text: response.message,
//               icon: "error",
//               timer: 1500,
//               timerProgressBar: true,
//             });
//           }
//         })
//         .catch((err) => {
//         });
//     },
//   });

//   useEffect(() => {
//     if (permissions.length) {
//       formik.setFieldValue("permissions", permissions);
//     }
//   }, [permissions]);

//   const fields = [
//     {
//       name: "Name",
//       label: "Name",
//       type: "text",
//       label_size: 12,
//       hiding: false,
//       col_size: 6,
//       disable: true,
//     },
//     {
//       name: "Username",
//       label: "UserName",
//       type: "text",
//       label_size: 12,
//       hiding: false,
//       col_size: 6,
//       disable: true,
//     },
//     {
//       name: "SignEmail",
//       label: "Email ID",
//       type: "text",
//       label_size: 12,
//       hiding: false,
//       col_size: 6,
//       disable: true,
//     },
//     {
//       name: "mobile_no",
//       label: "Mobile Number",
//       type: "text3",
//       label_size: 12,
//       hiding: false,
//       col_size: 6,
//       disable: true,
//     },
//     {
//       name: "permissions",
//       label: "Permissions",
//       type: "select2",
//       label_size: 12,
//       col_size: 6,
//       disable: false,
//       options: optionsArray,
//       component: (
//         <DropdownMultiselect
//           options={optionsArray}
//           selected={formik.values.permissions}
//           handleOnChange={
//             (selectedList) => formik.setFieldValue("permissions", selectedList) // Sync changes to Formik state
//           }
//         />
//       ),
//     },
//   ];

//   return (
//     <>
//       <AddForm
//         fields={fields.filter(
//           (field) => !field.showWhen || field.showWhen(formik.values)
//         )}
//         page_title="Edit SubAdmin"
//         btn_name="Edit"
//         btn_name1="Cancel"
//         formik={formik}
//         btn_name1_route={"/admin/allSubadmin"}
//       />
//     </>
//   );
// };

// export default EditSubadmin;




import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  AddSubadminbyAdmin,
  EditSubadminbyAdmin,
  GetAllSubadmin,
} from "../../CommonAPI/Admin";
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../ExtraComponent/Loader";
import { Get_All_Plans } from "../../CommonAPI/User";

const EditSubadmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { rowData, rowIndex } = location.state || {};





  const Name_regex = (name) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };

  const [optionsArray, setOptionsArray] = useState([
    { value: "AddClient", label: "AddClient" },
    { value: "ViewClient", label: "ViewClient" },
    { value: "EditClient", label: "EditClient" },
    { value: "TradeHistory", label: "TradeHistory" },
    { value: "TradeReport", label: "TradeReport" },
  ]);

  const [permissions, setPermissions] = useState([]);

  const [subAdminDetails, setSubAdminDetails] = useState({})

  const formik = useFormik({

    initialValues: {
      Username: subAdminDetails?.Username || "",
      Name: subAdminDetails?.Name || "",
      SignEmail: subAdminDetails?.EmailId || "",
      mobile_no: subAdminDetails?.Mobile_No || "",
      permissions: permissions || [], // Ensure permissions is set here
    },

    validate: (values) => {
      let errors = {};
      if (!values.Username) {
        errors.Username = "Please Enter Username";
      } else if (!Name_regex(values.Username)) {
        errors.username = "Please Enter Valid Username";
      }
      if (!values.Name) {
        errors.Name = "Please Enter Name";
      } else if (!Name_regex(values.Name)) {
        errors.Name = "Please Enter Valid Name";
      }
      if (!values.SignEmail) {
        errors.SignEmail = "Please Enter Email ID";
      } else {
        const emailRegex =
          /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|ymail|rediffmail|hotmail|outlook|aol|icloud|protonmail|example).(com|co.in|in|net|org|edu|gov|uk|us|info|biz|io|...)[a-zA-Z]{0,}$/;
        if (!emailRegex.test(values.SignEmail)) {
          errors.SignEmail = "Please Enter valid Email ID";
        }
      }
      if (!values.mobile_no) {
        errors.mobile_no = "Please Enter Mobile Number";
      }

      return errors;
    },
    onSubmit: async (values) => {

      const req = {
        Username: values.Username,
        permission: values.permissions, // Send permissions in the request
      };
      await EditSubadminbyAdmin(req)
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
              navigate("/admin/allSubadmin");
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
          console.log("Error in adding the Edit Subadmin", err);
        });
    },
  });



  useEffect(() => {
    const GetAllSubadminData = async () => {
      const response = await GetAllSubadmin();

      const matchuser = response.Data.find((item, index) => {
        // return item.Username === rowIndex?.Username; 
        if (index === rowIndex) {
          return item
        }
      });


      if (matchuser) {

        setPermissions(matchuser.Permission); // Set the permissions array if match is found
        setSubAdminDetails(matchuser)

        if (matchuser && Object.keys(matchuser).length > 0) {
          formik.setValues({
            Username: matchuser.Username || "",
            Name: matchuser.Name || "",
            SignEmail: matchuser.EmailId || "",
            mobile_no: matchuser.Mobile_No || "",
            permissions: matchuser.Permission || [],
          });
        }
      }
    };

    GetAllSubadminData();
  }, [rowIndex]);




  useEffect(() => {
    if (permissions.length) {

      formik.setFieldValue("permissions", permissions); // Sync permissions when state changes
    }
  }, [permissions]);

  const fields = [
    {
      name: "Name",
      label: "Name",
      type: "text",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: true,
    },
    {
      name: "Username",
      label: "UserName",
      type: "text",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: true,
    },
    {
      name: "SignEmail",
      label: "Email ID",
      type: "text",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: true,
    },
    {
      name: "mobile_no",
      label: "Mobile Number",
      type: "text3",
      label_size: 12,
      hiding: false,
      col_size: 6,
      disable: true,
    },
    {
      name: "permissions",
      label: "Permissions",
      type: "select2",
      label_size: 12,
      col_size: 6,
      disable: false,
      options: optionsArray,
      component: (
        <DropdownMultiselect
          options={optionsArray}
          selected={formik.values.permissions}
          handleOnChange={(selectedList) => {
            // Sync changes to Formik state
            formik.setFieldValue("permissions", selectedList);
            // Also update local permissions state
            setPermissions(selectedList);
          }}
        />
      ),
    },
  ];

  return (
    <>
      <AddForm
        fields={fields.filter(
          (field) => !field.showWhen || field.showWhen(formik.values)
        )}
        page_title="Edit SubAdmin"
        btn_name="Edit"
        btn_name1="Cancel"
        formik={formik}
        btn_name1_route={"/admin/allSubadmin"}
      />
    </>
  );
};

export default EditSubadmin;
