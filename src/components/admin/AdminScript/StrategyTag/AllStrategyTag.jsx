import React, { useEffect, useState } from 'react';
import Content from '../../../../ExtraComponent/Content';
import { useNavigate } from 'react-router-dom';
import { editChartingStretegyTag, getChartingStrategyTag } from '../../../CommonAPI/Admin';
import styled from 'styled-components';

import './StrategyTag.css'; // Import the external CSS file
import NoDataFound from '../../../../ExtraComponent/NoDataFound'; // Import NoDataFound component
import DynamicModal from '../../../../ExtraComponent/DynamicModal';
import Swal from 'sweetalert2';
import Loader from '../../../../ExtraComponent/Loader'; // Import Loader component

const AllStrategyTag = () => {
    const navigate = useNavigate();
    const [strategyTags, setStrategyTags] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    const fetchStarategyTag = async () => {
        setLoading(true);
        const res = await getChartingStrategyTag();
        if (res && res.data) {
            setStrategyTags(res.data); // Store the data in state
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchStarategyTag();
    }, []);

    const handleEdit = (tag) => {
        setSelectedTag(tag);
        setOpenModal(true);
    }

    const handleClose = () => {
        setOpenModal(false);
    }
    

    const handleUpdateStrategyTag = async (updatedTag) => {
        try {
            setOpenModal(false);
            const res = await editChartingStretegyTag(updatedTag);
            if (res && res.Status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.message,
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.message || 'Failed to update strategy tag. Please try again.',
                });
            }
            fetchStarategyTag();

        }
        catch (error) {
            console.error('Error updating strategy tag:', error);
        }
    }

    return (
        <Content
            Page_title={"📄 All Strategy"}
            button_status={false}
            backbutton_status={true}>
            <div className='d-flex justify-content-between align-items-center allStrategy-header'>
                <h4 className='ms-4 mb-0'>Strategy Tag</h4>
                <button className='addbtn' onClick={() => navigate('/admin/add-Strategy-tag')}>Add Strategy</button>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className="strategy-container row g-4">
                    {strategyTags.length === 0 ? (
                        <NoDataFound />
                    ) : (
                        strategyTags.map((tag, index) => (
                            <div className="col-12 d-flex" key={index}>
                                <div className="card w-100 h-100 shadow-sm flex-row strategy-card-fullwidth position-relative">
                                    <div className="edit-button-wrapper">
                                        {/* Edit button here -ag */}
                                        <button className="edit-button" onClick={() => handleEdit(tag)}>
                                            <svg className="edit-svgIcon" viewBox="0 0 512 512">
                                                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="strategy-img-container d-flex justify-content-center align-items-center" style={{ width: '40%', minHeight: '180px', background: '#f8f9fa' }}>
                                        <img
                                            src={
                                                tag.Image.startsWith('data:image')
                                                    ? tag.Image
                                                    : `data:image/jpeg;base64,${tag.Image}`
                                            }
                                            alt="Strategy"
                                            className="img-fluid"
                                            style={{ maxHeight: '160px', objectFit: 'contain', maxWidth: '100%' }}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/150';
                                            }}
                                        />
                                    </div>
                                    <div className="card-body d-flex flex-column strategy-content-container" style={{ width: '60%' }}>
                                        <div className="mb-2">
                                            <span className="fw-bold text-secondary">Strategy Tag: </span>
                                            <span className="card-text-Color">{tag.Strategytag}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="fw-bold text-secondary">Indicator: </span>
                                            <span className="card-text-Color">{tag.Indicatorname}</span>
                                        </div>
                                        <div>
                                            <span className="fw-bold text-secondary">Description: </span>
                                            <div className="description-scrollable mt-1">
                                                {tag.Description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {
                openModal && (
                    <DynamicModal
                        open={openModal}
                        handleClose={handleClose}
                        title={`Edit Strategy Tag: ${selectedTag?.Strategytag}`}
                        children={
                            selectedTag && (
                                <form id="edit-strategy-tag-form">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Strategy Tag</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={selectedTag.Strategytag}
                                            onChange={e => setSelectedTag({ ...selectedTag, Strategytag: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Indicator</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={selectedTag.Indicatorname}
                                            onChange={e => setSelectedTag({ ...selectedTag, Indicatorname: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Description</label>
                                        <textarea
                                            className="form-control"
                                            rows={3}
                                            value={selectedTag.Description}
                                            onChange={e => setSelectedTag({ ...selectedTag, Description: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={e => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setSelectedTag({ ...selectedTag, Image: file });
                                                }
                                            }}
                                        />
                                        {selectedTag.Image && (
                                            <div className="mt-2 text-center">
                                                <img
                                                    src={
                                                        typeof selectedTag.Image === 'string'
                                                            ? (selectedTag.Image.startsWith('data:image')
                                                                ? selectedTag.Image
                                                                : `data:image/jpeg;base64,${selectedTag.Image}`)
                                                            : URL.createObjectURL(selectedTag.Image)
                                                    }
                                                    alt="Preview"
                                                    style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain', borderRadius: 8, border: '1px solid #ccc' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {/* Add more fields here if needed */}
                                </form>
                            )
                        }
                        actions={
                            <>

                                <button
                                    type="button"
                                    className="btn btn-dark-red me-2"
                                    onClick={handleClose}
                                    style={{ backgroundColor: '#dc3545', color: '#fff' }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-dark-green"
                                    onClick={() => {
                                        handleUpdateStrategyTag(selectedTag);
                                    }}
                                    style={{ backgroundColor: '#006400', color: '#fff' }}

                                >
                                    Update
                                </button>

                            </>

                        }
                    />
                )
            }

        </Content>
    );
};

export default AllStrategyTag;