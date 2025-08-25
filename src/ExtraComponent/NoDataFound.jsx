import React from "react";

const NoDataFound = () => {
  return (
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
        width="30%"
        alt="No records found"
      />
    </div>
  );
};

export default NoDataFound;
