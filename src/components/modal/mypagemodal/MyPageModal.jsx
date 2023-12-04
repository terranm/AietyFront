import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogOutBtn from "assets/images/logout_btn.png";
import { useAuthContext } from "context/AuthContext";

const MyPageModal = ({ open, close }) => {
  const navigate = useNavigate();
  const { setIsLogin } = useAuthContext();

  //페이지 이동
  const movePage = (page) => {
    navigate(`/${page}`);
  };

  //로그아웃
  const logout = () => {
    //세션스토리지 토큰 삭제
    window.sessionStorage.removeItem("Authorization");
    //로그인 상태 -> false
    setIsLogin(false);
    navigate("/");
    window.location.reload();
    //모달 닫기
    close();
  };

  return (
    <ModalWrapper open={open} onMouseLeave={() => close()}>
      <div className="list" onClick={() => movePage("myinfo")}>
        내 정보 관리
      </div>
      <div className="list" onClick={() => movePage("reservation/list")}>
        취업 상담 예약
      </div>
      <div className="list" onClick={() => movePage("event")}>
        이벤트
      </div>
      <div className="list logout" onClick={logout}>
        <img src={LogOutBtn} alt="logout"></img>
        <div>로그아웃</div>
      </div>
    </ModalWrapper>
  );
};

export default MyPageModal;

const ModalWrapper = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  background-color: #fff;
  width: 189px;
  height: 236px;
  top: 100%;
  right: 0;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  overflow: hidden;
  & > .list {
    height: 59px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & > .logout {
    background-color: #d9d9d9;
    color: #666;
  }
  & > .logout > div {
    line-height: 32px;
  }
`;
