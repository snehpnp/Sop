import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { AddSubadminbyAdmin } from '../../CommonAPI/Admin'
import AddForm from "../../../ExtraComponent/FormData2";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import Content from '../../../ExtraComponent/Content';

const AddSubadmin = () => {
    const navigate = useNavigate()
    const Name_regex = (name) => {
        const nameRegex = /^[a-zA-Z]+$/;
        return nameRegex.test(name);
    };

    const [optionsArray, setOptionsArray] = useState([
        { "value": "AddClient", "label": "AddClient" },
        { "value": "ViewClient", "label": "ViewClient" },
        { "value": "EditClient", "label": "EditClient" },
        { "value": "TradeHistory", "label": "TradeHistory" },
        { "value": "TradeReport", "label": "TradeReport" },
        // { "value": "UpdateApiKey", "label": "UpdateApiKey" },
    ])



    const formik = useFormik({
        initialValues: {
            Username: "",
            Name: "",
            SignEmail: "",
            mobile_no: "",
            Signpassword: "",
            ConfirmPassword: "",
            permission: [],

        },
        validate: (values) => {
            let errors = {};

            if (!values.Username) {
                errors.Username = "Please Enter Username";
            } else if (!Name_regex(values.Username)) {
                errors.Username = "Please Enter Valid Username";
            }

            const nameRegex = /^[a-zA-Z ]+$/;
            if (!values.Name) {
                errors.Name = "Please Enter Name";
            } else if (!nameRegex.test(values.Name)) {
                errors.Name = "Please Enter Valid Name (Only letters and spaces allowed)";
            }
            if (!values.SignEmail) {
                errors.SignEmail = "Please Enter Email ID";
            } else {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|ymail|rediffmail|hotmail|outlook|aol|icloud|protonmail|example).(com|co.in|in|net|org|edu|gov|uk|us|info|biz|io|...)[a-zA-Z]{0,}$/;
                if (!emailRegex.test(values.SignEmail)) {
                    errors.SignEmail = "Please Enter valid Email ID";
                }
            }

            if (!values.Signpassword) {
                errors.Signpassword = "Please Enter Password";
            } else if (values.Signpassword.length < 8 || values.Signpassword.length > 15) {
                errors.Signpassword = "Password must be between 8 and 15 characters";
            } else if (!/(?=.*[a-z])/.test(values.Signpassword)) {
                errors.Signpassword = "Password must contain at least one lowercase letter";
            } else if (!/(?=.*[A-Z])/.test(values.Signpassword)) {
                errors.Signpassword = "Password must contain at least one uppercase letter";
            } else if (!/(?=.*[0-9])/.test(values.Signpassword)) {
                errors.Signpassword = "Password must contain at least one number";
            } else if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(values.Signpassword)) {
                errors.Signpassword = "Password must contain at least one special character";
            }
            if (!values.ConfirmPassword) {
                errors.ConfirmPassword = "Please Enter Confirm Password";
            } else if (values.ConfirmPassword !== values.Signpassword) {
                errors.ConfirmPassword = "Passwords do not match";
            }
            if (!values.mobile_no) {
                errors.mobile_no = "Please Enter Mobile Number";
            } else if (values.mobile_no.length !== 10) {
                errors.mobile_no = "Mobile number length must be 10 characters";
            }
            return errors;
        },

        onSubmit: async (values) => {
            const req = {
                Username: values.Username,
                Name: values.Name,
                SignEmail: values.SignEmail,
                mobile_no: values.mobile_no,
                Signpassword: values.Signpassword,
                ConfirmPassword: values.ConfirmPassword,
                permission: values.permission,
            }
            await AddSubadminbyAdmin(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                             // background: "#1a1e23 ",
                            backdrop: "#121010ba",
                            confirmButtonColor: "#1ccc8a",
                            title: "Subadmin Created!",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true
                        });
                        setTimeout(() => {
                            navigate('/admin/allSubadmin')
                        }, 1500)
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
                })
                .catch((err) => {
                    console.log("Error in adding the new user", err)
                })
        },
    });

    const fields = [
        {
            name: "Name",
            label: "Name",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "Username",
            label: "UserName",
            type: "text",
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
            name: "mobile_no",
            label: "Mobile Number",
            type: "text3",
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
            name: "permission",
            label: "Permission",
            type: "select2",
            label_size: 12,
            col_size: 6,
            disable: false,
            options: optionsArray
        },



    ];


    return (

        <Content
            Page_title={"📄 Change Password"}
            button_status={false}
            backbutton_status={true}>

            <>
                <AddForm
                    fields={fields}
                    page_title="Create Subadmin Account"
                    btn_name="Add"
                    btn_name1="Cancel"
                    formik={formik}
                    btn_name1_route={"/admin/allSubadmin"}

                />

            </>
        </Content>
    );
};

export default AddSubadmin;
