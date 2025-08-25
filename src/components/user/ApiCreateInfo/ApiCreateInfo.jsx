import React, { useEffect, useState } from 'react'
import Content from '../../../ExtraComponent/Content'
import { getBrokerDetails } from '../../CommonAPI/Admin';
import NoDataFound from '../../../ExtraComponent/NoDataFound'; // <-- Add this import
import Loader from '../../../ExtraComponent/Loader';

const ApiCreateInfo = () => {

  const [brokerDetails, setBrokerDetails] = useState([])
  const [loading, setLoading] = useState(true);
  const brokerName = localStorage.getItem("Broker")

  const getBrokerAlldetails = async () => {
    setLoading(true);
    if (brokerName === "") {
      setLoading(false);
      return;
    }
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
    }
    setLoading(false);
  };

  useEffect(() => {
    getBrokerAlldetails();
  }, []);

  // Helper to get all steps dynamically
  const getSteps = (details) => {
    if (!details) return [];
    // Find all keys like StepXText or StepXImage
    const stepNumbers = new Set();
    Object.keys(details).forEach(key => {
      const match = key.match(/^Step(\d+)(Text|Image)$/);
      if (match && (details[key] !== null && details[key] !== '')) {
        stepNumbers.add(match[1]);
      }
    });
    // For each found step number, collect text and image
    return Array.from(stepNumbers).sort((a, b) => a - b).map(num => ({
      step: num,
      text: details[`Step${num}Text`],
      img: details[`Step${num}Image`],
    }));
  };
  
  return (
    <Content>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <Loader />
        </div>
      ) : (
        <div className="container py-3">
          <div className="row justify-content-center">
            <div className="col">
              <div className="card-bg-color">
                <div className="card-header text-white card-bg-color card-text-Color">
                  <h4 className="mb-0 text-center  card-text-Color">
                    {brokerDetails?.Brokername ? `${brokerDetails.Brokername} API Creation Steps` : "Broker API Creation Steps"}
                  </h4>
                </div>
                <div className="card-body card-bg-color card-text-Color">
                  {brokerDetails && getSteps(brokerDetails).length > 0 ? (
                    <ol className="list-group card-bg-color">
                      {getSteps(brokerDetails).map((step, idx) => (
                        <li
                          key={idx}
                          className="list-group-item d-flex flex-column align-items-start mb-3 card-bg-color card-text-Color"
                          style={{ border: "1px solid #e3e3e3", borderRadius: "8px" }}
                        >
                          <div className="w-100 card-text-Color">
                            <span className="fw-bold card-text-Color">Step{step.step}:</span>
                          </div>
                          {step.text && (
                            <div className="mb-2 mt-1 card-text-Color" style={{ fontSize: "1rem" }}>
                              {step.text}
                            </div>
                          )}
                          {step.img && (
                            <div className="mb-2">
                              <img
                                src={`data:image/jpeg;base64,${step.img}`}
                                alt={`Step${step.step}`}
                                className="img-fluid rounded border" 
                              />
                            </div>
                          )}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <div className="text-center text-muted py-5 card-text-Color">
                      {/* Show NoDataFound image if no steps available */}
                      <NoDataFound />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Content>
  )
}

export default ApiCreateInfo