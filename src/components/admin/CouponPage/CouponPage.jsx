import React, { useEffect, useState } from 'react';
import Content from '../../../ExtraComponent/Content';
import { getAdminCouponDetails } from '../../CommonAPI/Admin';
import "./CouponPage.css";
import { useNavigate } from 'react-router-dom';
import NoDataFound from '../../../ExtraComponent/NoDataFound'; // Import NoDataFound component

const CouponPage = () => {
    const [couponDetails, setCouponDetails] = useState([]);
    const navigatge = useNavigate();

    const fetchCouponDetails = async () => {
        try {
            const response = await getAdminCouponDetails();
            setCouponDetails(response.Data);
        } catch (error) {
            console.error('Error fetching coupon details:', error);
        }
    };

    const handleAddCouponClick = () => {
        navigatge("/admin/addCoupon")
    };

    useEffect(() => {
        fetchCouponDetails();
    }, []);


    return (
        <>
            <Content
                Page_title={"🏷️ Coupon Page"}
                button_status={true}
                backbutton_status={true}
            >
                <div className="add-coupon-btn-container">
                    <button className="addbtn" onClick={handleAddCouponClick}>
                        Add Coupon
                    </button>
                </div>
                <div className="coupon-container">
                    {couponDetails.length > 0 ? (
                        couponDetails.map((coupon, index) => (
                            <div className="coupon-card pclass" key={index}>
                                <h3 className="coupon-planname">{coupon.Planname}</h3>
                                <p>
                                    <strong>Coupon Code:</strong>
                                    <span className="highlight"> {coupon.CouponCode}</span>
                                </p>
                                <p><strong>Discount:</strong> {coupon.DiscountPer}%</p>
                                <p><strong>Applicable Users:</strong> {coupon.User.join(", ")}</p>
                                <p><strong>Expiry Date:</strong> {coupon.ExpiryDate}</p>
                                <p><strong>Created On:</strong> {coupon.Datetime}</p>
                            </div>
                        ))
                    ) : (
                        <div className="no-data-container"> {/* Add container for proper width */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                    marginBottom: "150px",
                                }}>
                                <img
                                    src="/assets/images/no-record-found.png"
                                    width="50%"
                                    alt="No records found"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Content>
        </>
    );
};

export default CouponPage;
