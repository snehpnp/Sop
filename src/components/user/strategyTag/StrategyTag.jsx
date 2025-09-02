import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientStrategyTagDetails } from '../../CommonAPI/User';
import Content from '../../../ExtraComponent/Content';
import NoDataFound from '../../../ExtraComponent/NoDataFound';
import Loader from '../../../ExtraComponent/Loader';

const StrategyTag = () => {
    const navigate = useNavigate();
    const [strategyTags, setStrategyTags] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [loading, setLoading] = useState(true);
    const username = localStorage.getItem('name');


    const fetchStarategyTag = async () => {
        setLoading(true);
        const res = await ClientStrategyTagDetails(username);
        if (res && res.data) {
            setStrategyTags(res.data); // Store the data in state
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchStarategyTag();
    }, []);



    return (
        <Content
            Page_title={"📄 All Strategy"}
            button_status={false}
            backbutton_status={true}>

            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
              
                    <li className="breadcrumb-item active" aria-current="page">All Strategy</li>
                </ol>
            </nav>
            {/* <div className='d-flex justify-content-center align-items-center allStrategy-header'>

                <h4 className='ms-4 mb-0 mt-2'>Strategy Tags</h4>

            </div> */}
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

        </Content>
    );
};

export default StrategyTag;