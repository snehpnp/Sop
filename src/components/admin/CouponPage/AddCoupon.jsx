import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import Content from '../../../ExtraComponent/Content';
import Select from 'react-select';
import './AddCoupon.css';
import { AddCouponCodeApi, GetClientService } from '../../CommonAPI/Admin';
import { Get_All_Plans } from '../../CommonAPI/User';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AddCoupon = () => {
    const [planOptions, setPlanOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const navigate = useNavigate();

    // Fetch plans & users once
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respUsers = await GetClientService();
                const respPlans = await Get_All_Plans();

                // Flatten plans and map to { label, value }
                const allPlans = [...respPlans.Admin, ...respPlans.Charting].map(p => ({
                    label: p.Planname,
                    value: p.Planname
                }));
                setPlanOptions(allPlans);

                // Map users to { label, value } and prepend All/New
                const users = respUsers.Data.map(u => ({
                    label: u.Username,
                    value: u.Username
                }));
                setUserOptions([
                    { label: 'All', value: 'All' },
                    { label: 'New', value: 'New' },
                    ...users
                ]);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const formik = useFormik({
        initialValues: {
            planName: '',
            couponCode: '',
            discountPer: '',
            user: [],    // array of selected user values
            expiry: ''
        },
        validate: values => {
            const errors = {};
            if (!values.planName) errors.planName = 'Plan Name is required. Please select a plan name.';
            if (!values.couponCode) errors.couponCode = 'Coupon Code is required. Please enter a coupon code.';
            if (values.discountPer === '') {
                errors.discountPer = 'Discount percentage is required. Please enter a value.';
            } else if (values.discountPer < 0 || values.discountPer > 100) {
                errors.discountPer = 'Discount must be between 0 and 100.';
            }
            if (values.user.length === 0) errors.user = 'User selection is required. Please select at least one user.';
            if (!values.expiry) errors.expiry = 'Expiry date is required. Please select an expiry date.';
            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                Planname: values.planName,
                CouponCode: values.couponCode,
                DiscountPer: values.discountPer,
                User: values.user,
                Expiry: values.expiry
            };
            const res = await AddCouponCodeApi(req);

            if (res.Status) {
                Swal.fire({
                    title: 'Coupon Created Successfully!',
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: res.message,
                    icon: 'error',
                    timer: 1500,
                    timerProgressBar: true
                });
            }

            navigate("/admin/Coupon")


        }
    });

    // Build selected options for react-select
    const selectedUserOptions = userOptions.filter(opt =>
        formik.values.user.includes(opt.value)
    );


    // Handler for user-select change
    const handleUserChange = (selectedOpts) => {


        const values = selectedOpts ? selectedOpts.map((o) => o.value) : [];

        if (values[values.length - 1] === 'All') {
            // If "All" is selected, deselect everything else and keep only "All"
            formik.setFieldValue('user', ['All']);
        } else if (values[values.length - 1] === 'New') {
            // If "New" is selected, deselect everything else and keep only "New"
            formik.setFieldValue('user', ['New']);
        } else {
            // Allow multiple user selections, excluding "All" and "New"
            formik.setFieldValue('user', values.filter(v => v !== 'All' && v !== 'New'));
        }
    };

    return (

        <Content Page_title="🏷️ Add Coupon" button_status backbutton_status>
            <div className="add-coupon-wrapper card-bg-color">
                <div className='d-flex justify-content-start align-items-center'>
                    <button className='backbtn d-flex align-items-center gap-1' onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        Back
                    </button>
                </div>
                <h2 className="add-coupon-title">Create Coupon</h2>
                <form onSubmit={formik.handleSubmit} className="add-coupon-form">

                    <div className="add-coupon-row">
                        {/* Plan Name */}
                        <div className="add-coupon-field same-height-field">
                            <label className="add-coupon-label">Plan Name</label>
                            <Select
                                name="planName"
                                options={planOptions}
                                value={planOptions.find(o => o.value === formik.values.planName) || null}
                                onChange={opt => formik.setFieldValue('planName', opt?.value || '')}
                                onBlur={() => formik.setFieldTouched('planName', true)}
                                className="add-coupon-select"
                                styles={{
                                    control: (base) => ({ ...base, minHeight: 40, height: 40 }),
                                    valueContainer: (base) => ({ ...base, height: 40, padding: '0 8px' }),
                                    input: (base) => ({ ...base, margin: 0, padding: 0 }),
                                }}
                            />
                            {formik.touched.planName && formik.errors.planName && (
                                <div className="add-coupon-error">{formik.errors.planName}</div>
                            )}
                        </div>

                        {/* Coupon Code */}
                        <div className="add-coupon-field same-height-field">
                            <label className="add-coupon-label">Coupon Code</label>
                            <input
                                name="couponCode"
                                value={formik.values.couponCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter coupon code"
                                className="add-coupon-input card-text-Color card-bg-color"
                                style={{ height: 40 }}
                            />
                            {formik.touched.couponCode && formik.errors.couponCode && (
                                <div className="add-coupon-error">{formik.errors.couponCode}</div>
                            )}
                        </div>
                    </div>

                    <div className="add-coupon-row">
                        {/* Discount % */}
                        <div className="add-coupon-field same-height-field">
                            <label className="add-coupon-label">Discount (%)</label>
                            <input
                                type="number"
                                name="discountPer"
                                placeholder="Enter discount percentage"
                                value={formik.values.discountPer}
                                onChange={e =>
                                    formik.setFieldValue(
                                        'discountPer',
                                        Math.min(Math.max(e.target.value, 0), 100)
                                    )
                                }
                                onBlur={formik.handleBlur}
                                className="add-coupon-input card-text-Color card-bg-color"
                                style={{ height: 40 }}
                            />
                            {formik.touched.discountPer && formik.errors.discountPer && (
                                <div className="add-coupon-error">{formik.errors.discountPer}</div>
                            )}
                        </div>

                        {/* User Multi-Select */}
                        <div className="add-coupon-field same-height-field">
                            <label className="add-coupon-label">User</label>
                            <Select
                                name="user"
                                isMulti
                                options={userOptions}
                                value={selectedUserOptions}
                                onChange={handleUserChange}
                                onBlur={() => formik.setFieldTouched('user', true)}
                                className="add-coupon-select"
                                styles={{
                                    control: (base) => ({ ...base, minHeight: 40, height: 40 }),
                                    valueContainer: (base) => ({ ...base, height: 40, padding: '0 8px' }),
                                    input: (base) => ({ ...base, margin: 0, padding: 0 }),
                                }}
                            />
                            {formik.touched.user && formik.errors.user && (
                                <div className="add-coupon-error">{formik.errors.user}</div>
                            )}
                        </div>
                    </div>

                    <div className="add-coupon-row">
                        {/* Expiry Date */}
                        <div className="add-coupon-field same-height-field">
                            <label className="add-coupon-label">Expiry Date</label>
                            <input
                                type="date"
                                name="expiry"
                                value={formik.values.expiry}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="add-coupon-input card-text-Color card-bg-color"
                                style={{ height: 40 }}
                            />
                            {formik.touched.expiry && formik.errors.expiry && (
                                <div className="add-coupon-error">{formik.errors.expiry}</div>
                            )}
                        </div>
                        <div className="add-coupon-field same-height-field">
                            {/* Add next parameter here if needed */}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="add-coupon-button-container">
                        <button type="submit" className="add-coupon-button addbtn">
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </Content>
    );
};

export default AddCoupon;

/* Add this CSS to AddCoupon.css */
/* */
