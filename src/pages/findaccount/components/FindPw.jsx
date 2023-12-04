import axios from "axios";
import BasicAlertModal from "components/modal/basicalertmodal/BasicAlertModal";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  emailRegex,
  mobileRegex,
  nameRegex,
  passwordRegex,
} from "constants/Regex";

const FindPw = () => {
  const navigate = useNavigate();

  //이메일관련 useState
  const [email, setEmail] = useState("");
  const [isCheckedEmail, setIsCheckedEmail] = useState(true);
  const [sendComplete, setSendComplete] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [isCheckedAuthCode, setIsCheckedAuthCode] = useState(true);
  const [mailToken, setMailToken] = useState("");
  const [emailAlertMessage, setEmailAlertMessage] = useState("");

  //이름 휴대폰번호 useState
  const [name, setName] = useState("");
  const [isCheckedName, setIsCheckedName] = useState(true);
  const [mobile, setMobile] = useState("");
  const [isCheckedMobile, setIsCheckedMobile] = useState(true);

  //비밀번호 관련 useState
  const [password, setPassword] = useState("");
  const [isCheckedPassword, setIsCheckedPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCheckedConfirmPassword, setIsCheckedConfirmPassword] =
    useState(true);

  //알럿 모달 토글
  const [showBasicAlert, setShowBasicAlert] = useState(false);
  const toggleBasicAlert = () => {
    setShowBasicAlert((prev) => !prev);
  };

  //타이머
  const [timeRemaining, setTimeRemaining] = useState(0); // 10분을 초로 변환한 값
  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
      }
    }, 1000);

    return () => {
      clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    };
  }, [timeRemaining]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  //이메일 입력
  const inputEmail = (e) => {
    setEmailAlertMessage("올바른 이메일 형식을 입력해 주세요.");
    setIsCheckedEmail(false);
    setEmail(e.target.value);
    if (emailRegex.test(e.target.value) === true) {
      setIsCheckedEmail(true);
      console.log("이메일 통과");
    }
  };

  //인증번호 입력
  const inputAuthCode = (e) => {
    setAuthCode(e.target.value);
  };

  //이름 입력
  const inputName = (e) => {
    setIsCheckedName(false);
    setName(e.target.value);
    if (nameRegex.test(e.target.value) === true) {
      setIsCheckedName(true);
      console.log("이름 통과");
    }
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

  //비밀번호 입력
  const inputPassword = (e) => {
    setIsCheckedPassword(false);
    setPassword(e.target.value);
    if (passwordRegex.test(e.target.value) === true) {
      setIsCheckedPassword(true);
      console.log("비밀번호 통과");
    }
  };

  //확인 비밀번호 입력
  const inputConfirmPassword = (e) => {
    setIsCheckedConfirmPassword(false);
    setConfirmPassword(e.target.value);
    if (password === e.target.value) {
      // if (passwordRegex.test(e.target.value) === true) {
      setIsCheckedConfirmPassword(true);
      console.log("확인 비밀번호 비밀번호 통과");
    }
  };

  //이메일 인증 요청
  const sendEmail = async () => {
    setIsCheckedEmail(false);
    setEmailAlertMessage("인증코드가 발송되었습니다");
    try {
      const res = await axios.post(`/v1/login/api/send-email`, {
        email: email,
      });

      console.log("REQUEST : /v1/login/api/send-email : ", res);
      if (res.data.resultCode === "0000") {
        console.log("이메일 요청 성공");
        setSendComplete(true);
        setTimeRemaining(600);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  //이메일 인증 완료
  const authEmail = async () => {
    try {
      const res = await axios.post(`/v1/login/api/send-authcode`, {
        email: email,
        authCode: authCode,
      });

      console.log("REQUEST : /v1/login/api/send-authcode : ", res);
      if (res.data.resultCode === "0000") {
        setIsCheckedAuthCode(true);
        setMailToken(res.data.data.mailToken);
        setTimeRemaining(0);
      } else {
        setIsCheckedAuthCode(false);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  //비밀번호 재설정
  const resetPassword = async () => {
    try {
      const res = await axios.post(`/v1/login/api/reset-pw`, {
        passwd: password,
        mailToken: mailToken,
      });

      console.log("REQUEST : /v1/login/api/reset-pw : ");
      console.log(res);
      if (res.data.resultCode === "0000") {
        console.log("요청 성공");
        setShowBasicAlert(true);
      } else {
        alert(res.data.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  return (
    <>
      <div style={{ height: "31px" }}></div>
      <InputBox width="301px">
        <label>이메일</label>
        <div className="inputDescription">
          입력하신 이메일로 인증코드를 전달합니다.
        </div>
        <input
          type="email"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={inputEmail}
          autocomplete="off"
        ></input>
        <span style={{ width: "6px" }}></span>
        <InputButton
          width="123px"
          disabled={!isCheckedEmail || email == ""}
          onClick={sendEmail}
        >
          인증코드 발송
        </InputButton>
        {(!isCheckedEmail || email == "") && (
          <p className="signUpAlert">{emailAlertMessage}</p>
        )}
      </InputBox>
      <InputBox>
        <label>이메일 인증 코드를 입력하세요.</label>
        <div className="inputDescription">
          입력하신 이메일에서 인증코드를 확인하시기 바랍니다.
        </div>
        <label className="authInputBox">
          <input
            type="text"
            placeholder="인증코드를 입력해 주세요"
            value={authCode}
            onChange={inputAuthCode}
            autocomplete="new-password"
          ></input>
          {!isCheckedAuthCode && (
            <p className="signUpAlert">잘못된 인증 번호 입니다.</p>
          )}
          {timeRemaining > 0 && (
            <span className="timer">
              {`${String(minutes).padStart(2, "0")} : ${String(
                seconds
              ).padStart(2, "0")}`}
            </span>
          )}
        </label>
        <div className="mailAuthBox">
          <ResendButton disabled={!sendComplete} onClick={sendEmail}>
            재발송
          </ResendButton>
          <span style={{ width: "6px" }}></span>
          <InputButton disabled={authCode === ""} onClick={authEmail}>
            인증
          </InputButton>
        </div>
      </InputBox>
      <InputBox>
        <label>비밀번호</label>
        <div className="inputDescription"></div>
        <input
          type="password"
          placeholder="영문, 숫자, 특수문자를 포함하여 8자리 이상 입력해 주세요"
          value={password}
          onChange={inputPassword}
          autocomplete="new-password"
        ></input>
        {!isCheckedPassword && (
          <p className="signUpAlert">새 비밀번호를 입력해주세요.</p>
        )}
      </InputBox>
      <InputBox>
        <label>비밀번호 재입력</label>
        <div className="inputDescription"></div>
        <input
          type="password"
          placeholder="동일한 비밀번호를 한번 더 입력해 주세요"
          value={confirmPassword}
          onChange={inputConfirmPassword}
          autocomplete="off"
        ></input>
        {!isCheckedConfirmPassword && (
          <p className="signUpAlert">
            동일한 비밀번호를 한번 더 입력해 주세요.
          </p>
        )}
      </InputBox>

      <BasicButton
        onClick={resetPassword}
        disabled={
          mailToken.length == 0 ||
          password.length == 0 ||
          confirmPassword == 0 ||
          !isCheckedConfirmPassword
        }
      >
        확인
      </BasicButton>
      <div style={{ height: "90px" }}></div>
      <BasicAlertModal
        open={showBasicAlert}
        close={toggleBasicAlert}
        type="home"
      >
        비밀번호가 재설정 되었습니다.
      </BasicAlertModal>
    </>
  );
};

export default FindPw;

const BasicButton = styled.button`
  background: ${(props) => (props.disabled ? "#d9d9d9" : "#3546d1")};
  width: 430px;
  height: 54px;
  border-radius: 12px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;

const InputButton = styled.button`
  background: ${(props) => (props.disabled ? "#fff" : "#3546d1")};
  width: ${(props) => (props.width ? props.width : "100px")};
  border: 1px solid #d9d9d9;
  color: ${(props) => (props.disabled ? "#d9d9d9" : "#fff")};
  height: 54px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

const ResendButton = styled.button`
  border: ${(props) =>
    props.disabled ? "1px solid #d9d9d9" : "1px solid #3546d1"};
  color: ${(props) => (props.disabled ? " #d9d9d9" : " #3546d1")};
  background: #fff;
  width: ${(props) => (props.width ? props.width : "100px")};
  height: 54px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

const InputBox = styled.div`
  margin-bottom: 40px;
  position: relative;
  & > label {
    color: #0f182a;
    font-weight: 700;
  }
  & > .inputDescription {
    color: #667085;
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  & > input {
    width: ${(props) => (props.width ? props.width : "100%")};
    height: 54px;
    border-radius: 12px;
    border: 1px solid #d9d9d9;
    background: #fff;
    font-weight: 400;
    padding: 10px 15px;
    &::placeholder {
      color: #d9d9d9;
    }
  }
  & > .signUpAlert {
    position: absolute;
    color: var(--alert-color);
    font-size: 12px;
    font-weight: 400;
    margin-top: 4px;
  }
  & > span {
    display: inline-block;
  }

  & > .mailAuthBox {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }

  & > .authInputBox {
    position: relative;
    width: 100%;
    & > .signUpAlert {
      position: absolute;
      color: var(--alert-color);
      font-size: 12px;
      font-weight: 400;
    }

    & > .timer {
      position: absolute;
      top: 0;
      right: 20px;
      color: #667085;
      font-size: 16px;
      font-weight: 400;
    }
  }
  //인증번호 박스 style
  & > .authInputBox > input {
    width: ${(props) => (props.width ? props.width : "100%")};
    height: 54px;
    border-radius: 12px;
    border: 1px solid #d9d9d9;
    background: #fff;
    font-weight: 400;
    padding: 10px 15px;
    &::placeholder {
      color: #d9d9d9;
    }
  }
`;
