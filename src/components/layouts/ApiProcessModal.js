import React, { useState, useEffect } from "react";
import { getBrokerDetails } from "../CommonAPI/Admin";
import Modal from "../../ExtraComponent/Modal1";
import NoDataFound from "../../ExtraComponent/NoDataFound"; // Import the NoDataFound component
import Loader from "../../ExtraComponent/Loader";

const ApiProcessModal = ({ brokerName, show, onClose, debug }) => {
  const [brokerDetails, setBrokerDetails] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   
    if (show && brokerName) {
      fetchBrokerDetails(brokerName);
    }
    // eslint-disable-next-line
  }, [show, brokerName]);

  const fetchBrokerDetails = async (name) => {
    if (!name) return;
    setLoading(true);
    const req = { BrokerName: name };
    try {
      const response = await getBrokerDetails(req);
      if (response.Status) {
        setBrokerDetails(response.Data?.[0] || {});
        countSteps(response.Data?.[0] || {});
      } else {
        setBrokerDetails([]);
        setStepCount(0);
      }
    } catch (error) {
      setBrokerDetails([]);
      setStepCount(0);
    }
    setLoading(false);
  };

  const countSteps = (details) => {
    let count = 0;
    for (let i = 1; i <= 10; i++) {
      if (details[`Step${i}Text`] && details[`Step${i}Text`].trim() !== "") {
        count++;
      }
    }
    setStepCount(count);
  };


  return (
    <Modal
      isOpen={show}
      size="lg"
      title={`${brokerName} API Create Information.`}
      hideBtn={true}
      handleClose={onClose}
    >
      <div>
        {loading ? (
          <Loader />
        ) : stepCount === 0 ? (
          <NoDataFound />
        ) : (
          [...Array(stepCount).keys()].map((i) => {
            const step = i + 1;
            const text = brokerDetails[`Step${step}Text`];
            const img = brokerDetails[`Step${step}Image`];
            if (!text) return null;
            return (
              <div key={step} style={{ marginBottom: "1.5rem" }}>
                {/* <div style={{ fontWeight: 500, marginBottom: 6 }}>{text}</div> */}
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
  );
};

export default ApiProcessModal;
