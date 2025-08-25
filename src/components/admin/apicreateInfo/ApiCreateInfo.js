import React, { useState, useEffect } from "react";
import { Get_Broker_Name, getBrokerDetails, viewBrokerDetails } from "../../CommonAPI/Admin";
import { Eye, Trash2, BarChart2 } from "lucide-react";
import Modal from "../../../ExtraComponent/Modal1";
import Content from "../../../ExtraComponent/Content";
import styled from 'styled-components';
import NoDataFound from "../../../ExtraComponent/NoDataFound";
import Loader from "../../../ExtraComponent/Loader";

const ApiCreateInfo = () => {
  const [brokers, setBrokers] = useState([]);
  const [show, setShow] = useState(false);
  const [brokerName, setBrokerName] = useState("");
  const [brokerDetails, setBrokerDetails] = useState([]);
  const [stepCount, setSetpCount] = useState(0);
  const [showModal, setshowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBrokerName();
  }, []);

  const fetchBrokerName = async () => {
    try {
      const response = await Get_Broker_Name();
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
    setIsLoading(true);
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
      console.log("Error in fetching brokers", error);
    } finally {
      setIsLoading(false);
    }
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
          <div className="row row-cols-1 row-cols-md-5 g-4 d-flex justify-content-center align-items-center">


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
                <div className="card-actions justify-content-center mt-2" style={{ display: 'flex', gap: '12px', position: 'relative', zIndex: 10 }}>

                  <button
                    type="button"
                    className="btn btn-outline-primary mb-3"
                    style={{ minWidth: 70, fontWeight: 500 }}
                    onClick={() => {
                      setBrokerName(item.BrokerName);
                      handleShow();
                    }}
                  >
                    <BarChart2 size={18} className="me-2" />
                    View
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
            {isLoading ? (
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
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "0.5rem 0" }}>
                        <img
                          src={`data:image/jpeg;base64,${img}`}
                          alt={`Step ${step}`}
                          style={{ maxWidth: "100%", maxHeight: 500, display: "block" }}
                        />
                      </div>
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
