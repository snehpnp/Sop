import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import AddForm from "../../../ExtraComponent/FormData";
import { superToAdminAddNewPermission } from '../../CommonAPI/SuperAdmin';
import Swal from 'sweetalert2';
import Content from '../../../ExtraComponent/Content';


const NewUpdate = () => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            NewUpdate: "",
        },


        validate: (values) => {
            let errors = {};
            if (!values.NewUpdate) {
                errors.NewUpdate = "Please enter New Feature";
            }

            return errors;
        },


        onSubmit: async (values) => {

            const req = { NewUpdate: values.NewUpdate, }

           
            try {
                const response = await superToAdminAddNewPermission(req);
                if (response.Status) {
                    Swal.fire({
  // background: "#1a1e23 ",
  backdrop: "#121010ba",
confirmButtonColor: "#1ccc8a",
                        title: 'New Permission Added!',
                        text: response.message,
                        icon: 'success',
                        timer: 1500,
                        timerProgressBar: true,
                    });
                    // setTimeout(() => navigate('/superadmin/create-admin'), 1500);
                } else {
                    Swal.fire({
  // background: "#1a1e23 ",
  backdrop: "#121010ba",
confirmButtonColor: "#1ccc8a",
                        title: 'Error!',
                        text: response.message || 'Unknown error occurred',
                        icon: 'error',
                        timer: 1500,
                        timerProgressBar: true,
                    });
                }
            } catch (error) {
                Swal.fire({
  // background: "#1a1e23 ",
  backdrop: "#121010ba",
confirmButtonColor: "#1ccc8a",
                    title: 'Error!',
                    text: error.response?.data?.message || 'Failed to add new permission',
                    icon: 'error',
                    timer: 1500,
                    timerProgressBar: true,
                });
                console.error('Error adding permission:', error);
            }
        },
    });


    const fields = [
        {
            name: "NewUpdate",
            label: "New Feature",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 12,
            disable: false,
        }
    ]

    return (
        <>
        <Content
                Page_title={"New Updates"}
                button_status={false}
                backbutton_status={true}
            >
            <AddForm
                fields={fields}                
                btn_name="Add"
                formik={formik}
            />
            </Content>
        </>
    );
}

export default NewUpdate
