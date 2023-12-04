import BasicAlertModal from "components/modal/basicalertmodal/BasicAlertModal";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { mobileRegex, passwordRegex } from "constants/Regex";
import { myinfoApis } from "./apis/myinfoApis";
import { useAuthContext } from "context/AuthContext";

const MyInfo = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAuthContext();

  //이메일관련 useState
  const [email, setEmail] = useState("");
  const [promotionEmail, setPromotionEmail] = useState(false);
  const [promotionSms, setPromotionSms] = useState(false);

  //이름 휴대폰번호 useState
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [isCheckedMobile, setIsCheckedMobile] = useState(true);

  //알럿모달 메세지 useState
  const [alertMessage, setAlertMessage] = useState("");

  //알럿 모달 토글
  const [showBasicAlert, setShowBasicAlert] = useState(false);
  const toggleBasicAlert = () => {
    setShowBasicAlert((prev) => !prev);
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  //내 정보 가져오기
  const getMyInfo = async () => {
    try {
      const res = await myinfoApis.detail({});
      if (res.resultCode === "0000") {
        setName(res.data.detail.name);
        setEmail(res.data.detail.email);
        setMobile(res.data.detail.mobile);
        setPromotionEmail(res.data.detail.promotionEmail === "ON");
        setPromotionSms(res.data.detail.promotionSms === "ON");
      } else {
        alert(res.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  //내 정보 수정하기
  const modifyMyInfo = async () => {
    console.log({
      name: name,
      mobile: mobile,
    });
    try {
      //axios 요청
      const res = await myinfoApis.modify({
        name: name,
        mobile: mobile,
        promotionEmail: promotionEmail ? "ON" : "OFF",
        promotionSms: promotionSms ? "ON" : "OFF",
      });

      if (res.resultCode === "0000") {
        setAlertMessage("정보가 수정되었습니다.");
        window.sessionStorage.setItem(
          "Authorization",
          `Bearer ${res.data.accessToken}`
        );
        setUserInfo({
          name: name,
        });
        toggleBasicAlert();
      } else {
        alert(res.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  //이름 입력
  const inputName = (e) => {
    setName(e.target.value);
  };

  //전화번호 입력
  const inputMobile = (e) => {
    setIsCheckedMobile(false);
    let mobileNumber = e.target.value;
    let newMobileNumber = mobileNumber.replace(/-/g, "");
    setMobile(newMobileNumber);

    if (mobileRegex.test(newMobileNumber) === true) {
      setIsCheckedMobile(true);
      console.log("전화번호 통과");
    }
  };

  return (
    <>
      <SignUpWrapper>
        <h1>내정보 관리</h1>
        <InputBox>
          <label>이메일 아이디</label>
          <div className="email">{email}</div>
        </InputBox>
        <InputBox>
          <label>이름</label>
          <input
            type="text"
            placeholder="ex) 홍길동"
            value={name}
            onChange={inputName}
          ></input>
        </InputBox>
        <InputBox>
          <label>휴대폰 번호</label>
          <input
            type="text"
            placeholder="ex) 01000000000"
            value={mobile}
            onChange={inputMobile}
          ></input>
        </InputBox>
        <InputBox>
          <label>프로모션 정보 수신 설정</label>
          <PromotionBox>
            <div>E-mail</div>
            <SwitchBox
              isOn={promotionEmail}
              onClick={() => setPromotionEmail((prev) => !prev)}
            >
              <div className="circle"></div>
            </SwitchBox>
          </PromotionBox>
          <PromotionBox>
            <div>문자</div>
            <SwitchBox
              isOn={promotionSms}
              onClick={() => setPromotionSms((prev) => !prev)}
            >
              <div className="circle"></div>
            </SwitchBox>
          </PromotionBox>
        </InputBox>

        <ButtonBox>
          <WhiteButton
            onClick={() => {
              navigate("/myinfo/withdrawal");
            }}
          >
            회원탈퇴
          </WhiteButton>
          <BasicButton
            onClick={modifyMyInfo}
            disabled={name.length == 0 || mobile.length == 0}
          >
            확인
          </BasicButton>
        </ButtonBox>
        <div style={{ height: "150px" }}></div>
      </SignUpWrapper>
      <BasicAlertModal
        open={showBasicAlert}
        close={toggleBasicAlert}
        type="close"
      >
        {alertMessage}
      </BasicAlertModal>
    </>
  );
};

export default MyInfo;

const SignUpWrapper = styled.div`
  width: 430px;
  margin: auto;
  & > h1 {
    margin-top: 70px;
    margin-bottom: 52px;
  }
`;

const InputBox = styled.div`
  margin-bottom: 50px;
  position: relative;
  & > label {
    color: #0f182a;
    font-weight: 700;
  }

  & > .email {
    margin-top: 6px;
    color: #666;
    font-size: 20px;
    font-weight: 400;
  }

  & > input {
    width: ${(props) => (props.width ? props.width : "100%")};
    height: 54px;
    border-radius: 12px;
    border: 1px solid #d9d9d9;
    background: #fff;
    font-weight: 400;
    padding: 10px 15px;
    margin-top: 4px;
    &::placeholder {
      color: #d9d9d9;
    }
  }
  & > .signUpAlert {
    position: absolute;
    color: var(--alert-color);
    font-size: 12px;
    font-weight: 400;
  }
  & > span {
    display: inline-block;
  }
`;

const PromotionBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: 29px;
  align-items: center;
  margin-top: 20px;
  color: #667085;
  font-weight: 700;
`;

const SwitchBox = styled.div`
  position: relative;
  width: 60px;
  height: 29px;
  background-color: ${(props) => (props.isOn ? "#3546d1" : "#d9d9d9")};
  border-radius: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;

  & > .circle {
    position: absolute;
    left: ${(props) => (props.isOn ? "34px" : "3px")};
    width: 23px;
    height: 23px;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.2s;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
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

const WhiteButton = styled.button`
  border: ${(props) =>
    props.disabled ? "1px solid #d9d9d9" : "1px solid #3546d1"};
  color: ${(props) => (props.disabled ? " #d9d9d9" : " #3546d1")};
  background: #fff;
  width: ${(props) => (props.width ? props.width : "209px")};
  height: 54px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;
