import React from "react";

const TermsBox = ({ children }) => {
  return (
    <div
      style={{
        paddingTop: "10px",
        height: "400px",
        border: "1px solid #d9d9d9",
        borderRadius: "10px",
      }}
    >
      {children}
    </div>
  );
};

export default TermsBox;
