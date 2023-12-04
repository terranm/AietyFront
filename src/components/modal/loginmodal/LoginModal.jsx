import React, { useEffect, useRef, useState } from "react";
import XButton from "assets/images/x_button.png";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { emailRegex, passwordRegex } from "constants/Regex";
import { useAuthContext } from "context/AuthContext";
import PasswordView from "assets/images/password_view.png";
import PasswordHide from "assets/images/password_hide.png";
import api from "utils/api";

//로그인 모달
const LoginModal = ({ open, close }) => {
  const navigate = useNavigate();
  const { setIsLogin, setUserInfo } = useAuthContext();

  //이동후 모달 닫기
  const navigateAndClose = (page) => {
    navigate(page);
    close();
  };

  const outside = useRef();

  //useState 초기화
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });
  const [isCheckedEmail, setIsCheckedEmail] = useState(true);
  const [isCheckedPassword, setIsCheckedPassword] = useState(true);

  //이메일 입력
  const inputEmail = (e) => {
    setIsCheckedEmail(false);
    setEmail(e.target.value);
    if (emailRegex.test(e.target.value) === true) {
      setIsCheckedEmail(true);
      console.log("이메일 통과");
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

  //password type 변경하는 함수
  const handlePasswordType = (e) => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  //로그인
  const login = async () => {
    try {
      const res = await axios.post(`/v1/login/api/signin`, {
        email: email,
        passwd: password,
      });

      console.log("REQUEST : /v1/login/api/signin : ", res);
      if (res.data.resultCode === "0000") {
        console.log("로그인 성공");

        window.sessionStorage.setItem(
          "Authorization",
          `Bearer ${res.data.data.accessToken}`
        );

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.data.accessToken}`;

        setUserInfo({
          name: res.data.data.name,
        });
        //로그인 상태 수정
        setIsLogin(true);

        //모달 닫힘
        close();
      } else if (res.data.resultCode === "IS_NOT_EXSIT_MEMBER") {
        console.log("아이디/비밀번호 오류");
        alert(res.data.resultMessage);
      } else {
        alert(res.data.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  //모달 닫을때 input 초기화하는 함수
  const handleClose = () => {
    setEmail("");
    setIsCheckedEmail(true);
    setPassword("");
    setIsCheckedPassword(true);
    close();
  };

  return (
    <ModalOutSide
      open={open}
      ref={outside}
      onClick={(e) => {
        //모달 바깥영역 클릭시 close
        if (e.target == outside.current) {
          handleClose();
        }
      }}
    >
      <Modal>
        <button className="close" onClick={handleClose}>
          <img alt="btn" src={XButton}></img>
        </button>
        <ModalHeader>로그인</ModalHeader>
        <ModalBody>
          <div className="inBox">
            <div className="loginBox">
              <LoginInput
                type="email"
                placeholder="이메일"
                value={email}
                onChange={inputEmail}
                name="email"
                autocomplete="email"
              ></LoginInput>
              {!isCheckedEmail && (
                <p className="loginAlert">
                  올바른 이메일 형식을 입력해 주세요.
                </p>
              )}
            </div>
            <div className="loginBox">
              <LoginInput
                name="password"
                autocomplete="current-password"
                type={passwordType.type}
                placeholder="비밀번호"
                value={password}
                onChange={inputPassword}
              ></LoginInput>
              <span onClick={handlePasswordType}>
                {passwordType.visible ? (
                  <img src={PasswordHide} alrt="icon"></img>
                ) : (
                  <img src={PasswordView} alrt="icon"></img>
                )}
              </span>
              {!isCheckedPassword && (
                <p className="loginAlert">
                  영문, 숫자, 특수문자를 포함하여 8자리 이상 입력해 주세요.
                </p>
              )}
            </div>
            <LoginButton
              onClick={login}
              disabled={!isCheckedPassword || !isCheckedEmail}
            >
              로그인
            </LoginButton>

            <FindBox>
              <span onClick={() => navigateAndClose("/find-account?type=id")}>
                아이디 찾기
              </span>
              <span className="bar">|</span>
              <span onClick={() => navigateAndClose("/find-account?type=pw")}>
                비밀번호 찾기
              </span>
            </FindBox>
            <SignUpBox>
              아직 취업센터 회원이 아니신가요?
              <span
                onClick={() => {
                  navigateAndClose("/signup");
                }}
              >
                회원가입
              </span>
            </SignUpBox>
          </div>
        </ModalBody>
      </Modal>
    </ModalOutSide>
  );
};

export default LoginModal;

const modalBgShow = keyframes`
 from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalOutSide = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  animation: ${modalBgShow} 0.3s;
  z-index: 100;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 480px;
  height: 612px;
  border-radius: 18px;
  background: white;
  box-sizing: border-box;
  position: absolute;
  & > .close {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 30px;
    cursor: pointer;
  }
`;

const ModalHeader = styled.div`
  margin: 80px 0 34px 0;
  text-align: center;
  font-size: 20px;
  color: #000;
  font-weight: 700;
`;

const ModalBody = styled.div`
  display: flex;
  justify-content: center;
  & > .inBox {
    width: 380px;
    & > .loginBox {
      width: 100%;
      margin-bottom: 20px;
      position: relative;
      & > span {
        position: absolute;
        top: 10px;
        right: 20px;
        cursor: pointer;
      }
    }
  }
  & > .inBox > .loginBox > p {
    font-size: 14px;
  }
  & > .inBox > .loginBox > .loginTitle {
    color: #888;
  }
  & > .inBox > .loginBox > .loginAlert {
    color: var(--alert-color);
    margin-top: 4px;
    font-size: 12px;
  }
`;

const LoginInput = styled.input`
  width: 100%;
  height: 54px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  background: #fff;
  padding: 20px;
  &::placeholder {
    color: #d9d9d9;
  }
`;

const LoginButton = styled.button`
  background: ${(props) =>
    props.disabled ? "var(--sub-color)" : "var(--main-color)"};

  width: 100%;
  height: 54px;
  border-radius: 8px;
  color: #ffffff;
  padding: 10px 0;
  margin-bottom: 30px;
  font-weight: 700;
  cursor: pointer;
`;

const FindBox = styled.div`
  display: flex;
  justify-content: center;
  color: #667085;
  cursor: pointer;
  & > .bar {
    margin: 0 10px;
  }
  margin-bottom: 118px;
`;

const SignUpBox = styled.div`
  color: #667085;
  text-align: center;
  & > span {
    margin-left: 10px;
    cursor: pointer;
    font-weight: 800;
    color: #000000;
  }
`;
