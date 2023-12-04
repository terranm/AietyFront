import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "assets/images/aiety_logo.png";
import styled from "styled-components";
import LoginModal from "components/modal/loginmodal/LoginModal";
import MyPageModal from "components/modal/mypagemodal/MyPageModal";
import LoginBtn from "assets/images/login_btn.png";
import MyPageBtn from "assets/images/mypage_btn.png";
import { useAuthContext } from "context/AuthContext";

const Header = () => {
  const navigate = useNavigate();

  //useState 초기화
  const { isLogin } = useAuthContext();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMyPageModal, setShowMyPageModal] = useState(false);

  //로그인 모달 토글
  const toggleLoginModal = () => {
    setShowLoginModal((prev) => !prev);
  };

  //마이페이지 모달 토글
  const toggleMyPageModal = () => {
    setShowMyPageModal((prev) => !prev);
  };

  return (
    <>
      <Nav>
        <div className="navContents">
          <img onClick={() => navigate("/")} src={Logo} alt="logo"></img>
          <LoginBox isLogin={isLogin}>
            {!isLogin ? (
              <div className="btn" onClick={toggleLoginModal}>
                <img src={LoginBtn} alt="로그인"></img>
                <p>로그인</p>
              </div>
            ) : (
              <div className="btn" onClick={toggleMyPageModal}>
                <img src={MyPageBtn} alt="마이페이지"></img>
                <p>마이페이지</p>
              </div>
            )}
            <MyPageModal
              open={showMyPageModal}
              close={toggleMyPageModal}
            ></MyPageModal>
          </LoginBox>
        </div>
      </Nav>
      <LoginModal open={showLoginModal} close={toggleLoginModal}></LoginModal>
    </>
  );
};

export default Header;

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  height: 68px;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;

  & > .navContents {
    width: 100%;
    max-width: 1080px;
    margin: 0 20px;
    display: flex;
    justify-content: space-between;
  }
  & > .navContents > img {
    cursor: pointer;
  }
  & > .navContents > div {
    cursor: pointer;
  }
`;

const LoginBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  & > .btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & > .btn > img {
    width: 32px;
  }

  & > .btn > p {
    color: ${(props) =>
      props.isLogin ? "var(--main-color)" : "var(--grey_01)"};
    line-height: 32px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
`;
