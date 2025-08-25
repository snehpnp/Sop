import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { apiCreateInfo } from '../../CommonAPI/SuperAdmin'
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import Content from '../../../ExtraComponent/Content';

const Adduser = () => {

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            Brokername: "",
            step1: "",
            step1image: "",
            step2: "",
            step2image: "",
            step3: "",
            step3image: "",
            step4: "",
            step4image: "",
            step5: "",
            step5image: "",

        },
        validate: (values) => {
            let errors = {};

            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                Brokername: values.Brokername,
                step1: values.step1,
                step1image: values.step1image,
                step2: values.step2,
                step2image: values.step2image,
                step3: values.step3,
                step3image: values.step3image,
                step4: values.step4,
                step4image: values.step4image,
                step5: values.step5,
                step5image: values.step5image,
            }

            await apiCreateInfo(req)
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
                            timerProgressBar: true
                        });
                        setTimeout(() => {
                            navigate('/admin/clientservice')
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
            name: "Brokername",
            label: "Brokername",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 12,
            disable: false,
        },
        {
            name: "step1",
            label: "Step 1",
            type: "text2",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "step1image",
            label: "Step 1 Image",
            type: "file1",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "step2",
            label: "Step 2",
            type: "text2",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "step2image",
            label: "Step 2 Image",
            type: "file1",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "step3",
            label: "Step 3",
            type: "text2",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "step3image",
            label: "Step 3 Image",
            type: "file1",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },

        {
            name: "step4",
            label: "Step 4",
            type: "text2",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "step4image",
            label: "Step 4 Image",
            type: "file1",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "step5",
            label: "Step 5",
            type: "text2",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "step5image",
            label: "Step 5 Image",
            type: "file1",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
    ]

    return (
        <>
            <Content
                Page_title={"Api Create Info"}
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
