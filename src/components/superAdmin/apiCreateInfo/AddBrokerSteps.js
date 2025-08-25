import React, { useEffect, useState } from "react";
import Content from "../../../ExtraComponent/Content";
import { apiCreateInfo } from "../../CommonAPI/SuperAdmin";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { getBrokerDetails } from "../../CommonAPI/Admin";


function AddBrokerSteps() {
  const location = useLocation();
  const [brokerName, setBrokerName] = useState(location.state?.brokerName || "");
  const [steps, setSteps] = useState([
    { step1: "", step1Image: "" }
  ]);
  const [brokerDetails, setBrokerDetails] = useState([]);
  const [popupImage, setPopupImage] = useState(null);
  const navigate = useNavigate();

  const handleAdd = () => {
    const newIndex = steps.length + 1;
    const newStep = {
      [`step${newIndex}`]: "",
      [`step${newIndex}Image`]: ""
    };
    setSteps([...steps, newStep]);
  };




  const getBrokerAlldetails = async () => {
    if (brokerName === "") return;
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
  };

  useEffect(() => {
    getBrokerAlldetails();
  }, [brokerName]);

  
  useEffect(() => {
    if (brokerDetails && Object.keys(brokerDetails).length > 0) {
      const newSteps = [];
      let i = 1;
      while (
        brokerDetails[`Step${i}Text`] !== undefined ||
        brokerDetails[`Step${i}Image`] !== undefined
      ) {
        const stepText = brokerDetails[`Step${i}Text`];
        const stepImage = brokerDetails[`Step${i}Image`];

        // Only push if either stepText or stepImage is not null/empty
        if (
          (stepText && stepText.trim() !== "") ||
          (stepImage && stepImage !== "")
        ) {
          newSteps.push({
            [`step${i}`]: stepText || "",
            [`step${i}Image`]: stepImage || ""
          });
        }

        i++;
      }

      // Set the filtered steps
      if (newSteps.length > 0) {
        setSteps(newSteps);
      } else {
        // If no valid steps found, set default one
        setSteps([{ step1: "", step1Image: "" }]);
      }
    }
  }, [brokerDetails]);


  const handleRemove = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const handleChange = (index, key, value, isFile = false) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      [key]: isFile ? value : value
    };
    setSteps(updatedSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare FormData
    const formData = new FormData();
    formData.append('Brokername', brokerName);
    steps.forEach((stepObj, idx) => {
      const stepNum = idx + 1;
      const stepKey = `step${stepNum}`;
      const imageKey = `step${stepNum}Image`;
      formData.append(`step${stepNum}`, stepObj[stepKey] || '');
      if (stepObj[imageKey]) {
        if (stepObj[imageKey] instanceof File) {
          formData.append(`step${stepNum}image`, stepObj[imageKey]);
        } else if (typeof stepObj[imageKey] === 'string' && stepObj[imageKey] !== '') {
          // If it's a base64 string, convert to Blob
          const base64 = stepObj[imageKey].startsWith('data:image') ? stepObj[imageKey].split(',')[1] : stepObj[imageKey];
          const byteCharacters = atob(base64);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'image/jpeg' });
          formData.append(`step${stepNum}image`, blob, `step${stepNum}.jpg`);
        } else {
          formData.append(`step${stepNum}image`, '');
        }
      } else {
        formData.append(`step${stepNum}image`, '');
      }
    });

    const response = await apiCreateInfo(formData);
    if (response.Status) {
      Swal.fire({
        backdrop: "#121010ba",
        confirmButtonColor: "#1ccc8a",
        title: "Broker and Steps Created!",
        text: response.message,
        icon: "success",
        timer: 1500,
        timerProgressBar: true
      });
      setSteps([{ step1: "", step1Image: "" }]); // Reset to initial state
      getBrokerAlldetails(); // Refresh broker details
    }
    else {
      alert("Error creating broker and steps: " + response.message);
    }


  };

  return (
    <Content>
      <form onSubmit={handleSubmit}>
        <div className="p-4 max-w-lg mx-auto">

          <div>
            <button
              className="btn btn-primary mb-3"
              onClick={() => {
                navigate("/superadmin/api-create-info");
              }}
            >
              Back
            </button>
          </div>

          <h2 className="text-xl font-bold mb-4">{brokerName} - Steps Guide</h2>

          {/* Broker Name Input */}
          {/* <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Broker Name:</label>
            <input
              type="text"
              value={brokerName}
              onChange={(e) => setBrokerName(e.target.value)}
              className="form-control"
              placeholder="Enter broker name"
              disabled = {true} // Disable input as per requirement
            />
          </div> */}

          {/* Dynamic Steps */}
          {steps.map((item, index) => {
            const stepKey = `step${index + 1}`;
            const imageKey = `step${index + 1}Image`;

            return (
              <div key={index} className="row mb-3 border p-3 rounded shadow-sm align-items-end" style={{ margin: '0', padding: '16px 8px' }}>
                <div className="col-md-6 mb-2 mb-md-0">
                  <label className="form-label fw-semibold mb-1">
                    Step {index + 1}:
                  </label>
                  <input
                    type="text"
                    value={item[stepKey]}
                    onChange={(e) =>
                      handleChange(index, stepKey, e.target.value)
                    }
                    className="form-control"
                    placeholder={`Enter Step ${index + 1} text`}
                    style={{ marginBottom: '8px' }}
                  />
                </div>
                <div className="col-md-6 mb-2 mb-md-0 d-flex align-items-center">
                  <div style={{ flex: 1 }}>
                    <label className="form-label fw-semibold mb-1">
                      Step {index + 1} Image:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleChange(index, imageKey, file, true);
                        }
                      }}
                      className="form-control"
                      style={{ marginBottom: '8px' }}
                    />
                  </div>
                  {/* Show image preview if available */}
                  {item[imageKey] && (
                    <div style={{ marginLeft: '10px' }}>
                      {typeof item[imageKey] === 'string' && item[imageKey] !== '' && (
                        <img
                          src={item[imageKey].startsWith('data:image') ? item[imageKey] : `data:image/jpeg;base64,${item[imageKey]}`}
                          alt={`Step ${index + 1} Preview`}
                          style={{ maxWidth: '80px', maxHeight: '80px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
                          onClick={() => setPopupImage(item[imageKey].startsWith('data:image') ? item[imageKey] : `data:image/jpeg;base64,${item[imageKey]}`)}
                        />
                      )}
                      {item[imageKey] instanceof File && (
                        <img
                          src={URL.createObjectURL(item[imageKey])}
                          alt={`Step ${index + 1} Preview`}
                          style={{ maxWidth: '80px', maxHeight: '80px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
                          onClick={() => setPopupImage(URL.createObjectURL(item[imageKey]))}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div className="d-flex justify-content-between gap-2 mt-3">
            <div>
              <button
                onClick={handleAdd}
                className="btn bg-success text-white px-4 py-2 me-2"
                type="button"
              >
                +
              </button>
              {steps.length > 1 ? (
                <button
                  onClick={() => handleRemove(steps.length - 1)}
                  className="btn btn-danger px-4 py-2"
                  type="button"
                >
                  -
                </button>
              ) : (
                // Show delete icon for clearing first field's data
                <button
                  type="button"
                  className="btn btn-outline-danger px-4 py-2"
                  style={{ fontSize: '20px', lineHeight: '1', padding: '0 16px' }}
                  onClick={() => setSteps([{ step1: '', step1Image: '' }])}
                  title="Clear First Field"
                >
                  <span style={{ fontWeight: 'bold', fontSize: '22px' }}>&#128465;</span>
                </button>
              )}
            </div>
            <button
              type="submit"
              className="addbtn"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* Image Popup Modal */}
      {popupImage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          marginTop: '50px',
        }}>
          <div style={{ position: 'relative', background: '#fff', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <button
              onClick={() => setPopupImage(null)}
              style={{
                position: 'absolute',
                top: '-16px',
                right: '-16px',
                background: '#ff4d4f',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                fontSize: '20px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={popupImage}
              alt="Popup Preview"
              style={{ maxWidth: '70vw', maxHeight: '70vh', display: 'block', margin: '40px auto 0 auto', borderRadius: '8px' }}
            />
          </div>
        </div>
      )}
    </Content>
  );
}

export default AddBrokerSteps;
