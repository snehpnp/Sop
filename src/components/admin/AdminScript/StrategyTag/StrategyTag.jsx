import React, { useState } from 'react';
import Content from '../../../../ExtraComponent/Content';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addChartingStrategyTag } from '../../../CommonAPI/Admin';
import Swal from 'sweetalert2'; // Import SweetAlert2
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StrategyTag = () => {
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    Strategytag: '',
    Indicatorname: '',
    Description: '',
    Image: '', // File object
  };

  const handleImageUpload = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      // Show image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Store File object (not base64) for backend
      setFieldValue('Image', file);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await addChartingStrategyTag(values);

      if (res.Status) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Strategy added successfully!',
        });
        resetForm();
        setImagePreview('');
        navigate('/admin/Strategy-tag');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: res.message || 'Failed to add strategy. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred. Please try again later.',
      });
    }
  };

  return (
    <Content
      Page_title={"📄 Strategy Tag"}
      button_status={false}
      backbutton_status={true}
    >
      <div className="container">
        <div className="d-flex justify-content-start align-items-center mb-3">
          <IconButton className='d-flex justify-content-center align-items-center' onClick={() => navigate('/admin/Strategy-tag')} aria-label="back" sx={{ color: "#fff" }}>
            <ArrowBackIcon />
            <h6 className='mb-0'>Back</h6>
          </IconButton>


        </div>



        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Strategy Tag</label>
                  <Field
                    type="text"
                    name="Strategytag"
                    className="form-control"
                    placeholder="Enter Strategytag"
                  />
                  <ErrorMessage name="Strategytag" component="div" style={{ color: 'red' }} />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Indicator Name</label>
                  <Field
                    type="text"
                    name="Indicatorname"
                    className="form-control"
                    placeholder="Enter Indicatorname"
                  />
                  <ErrorMessage name="Indicatorname" component="div" style={{ color: 'red' }} />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Description</label>
                  <Field
                    as="textarea"
                    name="Description"
                    className="form-control"
                    placeholder="Enter Description"
                  />
                  <ErrorMessage name="Description" component="div" style={{ color: 'red' }} />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    name="Image"
                    accept="image/*"
                    className="form-control"
                    onChange={(event) => handleImageUpload(event, setFieldValue)}
                  />
                  <div style={{ fontSize: '12px', color: '#888' }}>
                    Please upload only image files in .png, .jpg, .jpeg, or .gif format
                  </div>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ marginTop: '10px', width: '100px', height: 'auto' }}
                    />
                  )}
                  <ErrorMessage name="Image" component="div" style={{ color: 'red' }} />
                </div>
              </div>

              <button type="submit" className="addbtn">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </Content>
  );
};

export default StrategyTag;
