import React, { useState } from "react";
import Footer from "components/layout/components/Footer";
import Header from "components/layout/components/Header";
import Terms from "./components/Terms";
import EnterInfo from "./components/EnterInfo";
import Complete from "./components/Complete";

const SingUp = () => {
  // step : terms(약관동의) => info(정보입력) => complete(완료)
  const [step, setStep] = useState("terms");
  const [promotion, setPromotion] = useState(false);

  return (
    <>
      {step === "terms" && (
        <Terms setStep={setStep} setPromotion={setPromotion}></Terms>
      )}
      {step === "info" && (
        <EnterInfo setStep={setStep} promotion={promotion}></EnterInfo>
      )}
      {step === "complete" && <Complete></Complete>}
    </>
  );
};

export default SingUp;
