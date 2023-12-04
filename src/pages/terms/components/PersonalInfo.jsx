import React from "react";
import TermsBox from "./TermsBox";

const PersonalInfo = () => {
  return (
    <TermsBox>
      <div style={{ height: "100%" }}>
        <iframe
          style={{ width: "100%", height: "100%", border: 0 }}
          src="/private.html"
        ></iframe>
      </div>
    </TermsBox>
  );
};

export default PersonalInfo;
