// components/PillTabs.jsx
import React from "react";


const PillTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="d-flex justify-content-center mt-1 mb-2">
      <ul className="nav nav-pills shadow rounded-pill p-1">
        {tabs.map((tab, index) => (
          <li className="nav-item" key={index}>
            <button
              className={`nav-link ${activeTab === tab ? "active" : ""} rounded-pill`}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 20px",
                margin: "5px",
                border: "none",
                outline: "none",
              }}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PillTabs;
