import React, { useState, useEffect } from "react";
import { Get_Broker_Name, getBrokerDetails, viewBrokerDetails } from "../../CommonAPI/Admin";
import { Eye, Trash2, BarChart2, Plus } from "lucide-react";
import Modal from "../../../ExtraComponent/Modal1";
import Content from "../../../ExtraComponent/Content";
import { useNavigate } from "react-router-dom";
import { GETSuperAdminBroker } from "../../CommonAPI/SuperAdmin";
import Loader from "../../../ExtraComponent/Loader";
import NoDataFound from "../../../ExtraComponent/NoDataFound";

const ApiCreateInfo = () => {
  const [brokers, setBrokers] = useState([]);
  const [show, setShow] = useState(false);
  const [brokerName, setBrokerName] = useState("");
  const [brokerDetails, setBrokerDetails] = useState([]);
  const [stepCount, setSetpCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [showModal, setshowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBrokerName();
  }, []);

  const fetchBrokerName = async () => {
    try {
      const response = await GETSuperAdminBroker();
      if (response.Status) {
        const brokerList = response?.brokers?.filter(
          (item) => item.BrokerName !== "DEMO"
        );
        setBrokers(brokerList);
      } else {
        setBrokers([]);
      }
    } catch (error) {
      console.log("Error in fetching brokers", error);
    }
  };

  useEffect(() => {
    getBrokerAlldetails();
  }, [brokerName]);


  const getBrokerAlldetails = async () => {
    if (brokerName === "") return;
    setLoading(true);
    const req = { BrokerName: brokerName };
    try {
      await getBrokerDetails(req).then((response) => {
        if (response.Status) {
          setBrokerDetails(response.Data?.[0]);
        } else {
          setBrokerDetails([]);
        }
      });
    } catch (error) {
      setBrokerDetails([]);
    }
    setLoading(false);
  };


  const handleShow = () => {
    setshowModal(true);
  };


  const brokerDetailLength = async () => {
    const nonEmptyCount = Object.values(brokerDetails).filter(value => {
      if (value === null || value === undefined) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      if (typeof value === "object" && Object.keys(value).length === 0) return false;
      return true;
    }).length;

    setSetpCount(nonEmptyCount);
 
  }
  useEffect(() => {
    brokerDetailLength();
  }, [brokerDetails]);


  return (
    <>
      <Content
        Page_title="📈 Api Information"
        button_status={false}
        backbutton_status={false}
      >


        <div className="container-fluid" style={{ marginTop: "2rem" }}>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "40vh" }}>
              <Loader />
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-5 g-4 d-flex justify-content-center align-items-center">
              {/* {brokers.map((item, index) => (
                <div className="col" key={index}>
                  <div className="broker-card text-center" style={{ paddingTop: 24 }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
                      {item.Image ? (
                        <img
                          src={`data:image/jpeg;base64,${item.Image}`}
                          alt={item.BrokerName}
                          style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: 12, background: '#f5f5f5', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
                        />
                      ) : null}
                    </div>
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-12">
                          <h5 className="card-title mb-2">
                            {item.BrokerName}
                          </h5>
                          <div className="card-actions justify-content-center mt-3">
                            <Eye
                              size={24}
                              className="action-icon edit-icon text-warning"
                              onClick={() => {
                                handleShow();
                                setBrokerName(item.BrokerName);
                              }}
                            />
                            <Plus
                              size={24}
                              className="action-icon add-icon text-success ms-2"
                              onClick={() => {
                                navigate("/superadmin/addBrokerSteps", { state: { brokerName: item.BrokerName } });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))} */}


              {brokers.map((item, index) => (
                <div className="broker-card-design wallet" key={index}>
                  <div className="overlay" />

                  {/* ⬇️ Replaced SVG icon with dynamic image */}
                  <div className="circle" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {item.Image && (
                      <img
                        src={`data:image/jpeg;base64,${item.Image}`}
                        alt={item.BrokerName}
                        style={{ width: 56, height: 56, objectFit: 'contain', borderRadius: 12, background: '#f5f5f5', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
                      />
                    )}
                  </div>

                  {/* ⬇️ Replaced text with dynamic Broker Name */}
                  <p style={{ fontWeight: 600 }}>{item.BrokerName}</p>

                  {/* ⬇️ Added Eye and Trash2 icons */}
                  <div className="card-actions justify-content-center align-items-center mt-2" style={{ display: 'flex', gap: '12px', position: 'relative', zIndex: 10 }}>
                    <button
                      type="button"
                      className="btn btn-outline-primary d-flex align-items-center mb-3"
                      style={{ minWidth: 70, fontWeight: 500 }}
                      onClick={() => {
                        setBrokerName(item.BrokerName);
                        handleShow();
                      }}
                    >
                      <BarChart2 size={18} className="me-2" />
                      View
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-success d-flex align-items-center mb-3"
                      style={{ minWidth: 70, fontWeight: 500 }}
                      onClick={() => {
                        navigate("/superadmin/addBrokerSteps", { state: { brokerName: item.BrokerName } });
                      }}
                    >
                      <Plus size={18} className="me-2" />
                      Add
                    </button>

                    {/* <Eye
                      size={22}
                      className="action-icon edit-icon text-warning"
                      onClick={() => {
                        handleShow();
                        setBrokerName(item.BrokerName);
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                    <Trash2
                      size={22}
                      className="action-icon delete-icon text-danger"
                      onClick={() => {
                        // Optional delete logic
                      }}
                      style={{ cursor: 'pointer' }}
                    /> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Modal
          isOpen={showModal}
          size="lg"
          title={`${brokerName}  API Create Information.`}
          hideBtn={true}
          handleClose={() => setshowModal(false)}
        >
          {/* Render broker steps */}
          <div>
            {loading ? (
              <Loader />
            ) : stepCount === 0 ? (
              <NoDataFound />
            ) : (
              [...Array(stepCount).keys()].map(i => {
                const step = i + 1;
                const text = brokerDetails[`Step${step}Text`];
                const img = brokerDetails[`Step${step}Image`];
                if (!text) return null;
                return (
                  <div key={step} style={{ marginBottom: "1.5rem" }}>
                    <div style={{ fontWeight: 500, marginBottom: 6 }}>
                      {`Step ${step} :- ${text}`}
                    </div>
                    {img && (
                      <img
                        src={`data:image/jpeg;base64,${img}`}
                        alt={`Step ${step}`}
                        style={{ maxWidth: "100%", maxHeight: 500, display: "block", margin: "0.5rem auto" }}
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </Modal>
      </Content>
    </>
  );
};

export default ApiCreateInfo;
