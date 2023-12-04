import React from "react";
import TermsBox from "./TermsBox";

const Service = () => {
  return (
    <TermsBox>
      <div style={{ height: "100%" }}>
        <iframe
          style={{ width: "100%", height: "100%", border: 0 }}
          src="/service.html"
        ></iframe>
      </div>
    </TermsBox>
  );
};

export default Service;
