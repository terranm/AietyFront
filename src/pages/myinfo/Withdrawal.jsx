import axios from "axios";
import BasicAlertModal from "components/modal/basicalertmodal/BasicAlertModal";
import React, { useState } from "react";
import styled from "styled-components";
import { myinfoApis } from "./apis/myinfoApis";

const Withdrawal = () => {
  //알럿 모달 토글
  const [showBasicAlert, setShowBasicAlert] = useState(false);
  const toggleBasicAlert = () => {
    setShowBasicAlert((prev) => !prev);
  };

  //탈퇴하기
  const withdraw = async () => {
    try {
      const res = await myinfoApis.withdraw({});
      if (res.resultCode === "0000") {
        toggleBasicAlert();
      } else {
        alert(res.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  return (
    <>
      <WithdrawalWrapper>
        <div style={{ height: "200px" }}></div>
        <h4 className="black">에이어티 취업센터를</h4>
        <h4 className="blue">정말 탈퇴 하시겠습니까?</h4>
        <p>
          탈퇴하시면 <b>예약하신 상담 및 이전 상담 내역,</b>
          <br></br>
          업로드하신 <b>이력서 및 기타 서류는 모두 삭제</b>가 되며<br></br>
          탈퇴 후, 데이터는 복구 불가능합니다.
        </p>
        <BasicButton onClick={withdraw}>회원탈퇴</BasicButton>
        <div style={{ height: "200px" }}></div>
      </WithdrawalWrapper>
      <BasicAlertModal
        open={showBasicAlert}
        close={toggleBasicAlert}
        type="home"
      >
        탈퇴 처리가 완료되었습니다.
      </BasicAlertModal>
    </>
  );
};

export default Withdrawal;

const WithdrawalWrapper = styled.div`
  text-align: center;
  & > h4 {
    line-height: 46px;
    font-size: 30px;
    font-weight: 700;
  }
  & > p {
    margin: 30px 0;
    color: #0f182a;
    font-weight: 400;
    line-height: 28px;
  }
  & > .black {
    color: #0f182a;
  }
  & > .blue {
    color: #3546d1;
  }
`;

const BasicButton = styled.button`
  background: ${(props) => (props.disabled ? "#d9d9d9" : "#3546d1")};
  width: 209px;
  color: #fff;
  height: 54px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;
