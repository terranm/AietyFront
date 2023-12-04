import React from "react";
import styled, { keyframes } from "styled-components";
import CompleteImg from "assets/images/complete_img.png";
import { useNavigate } from "react-router-dom";

const CompleteModal = ({ open, close }) => {
  const navigate = useNavigate();

  //홈으로
  const goHome = () => {
    navigate("/");
  };

  return (
    <ModalOutSide open={open}>
      <Modal>
        <img src={CompleteImg} alt="이미지"></img>
        <p>회원가입 완료</p>
        <Button onClick={goHome}>홈</Button>
      </Modal>
    </ModalOutSide>
  );
};

export default CompleteModal;

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
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 80%;
  max-width: 480px;
  background-color: white;
  border-radius: 12px;
  padding: 75px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  animation: ${modalBgShow} 0.3s;
  & > img {
    width: 80px;
  }
  & > p {
    width: 100%;
    text-align: center;
    color: var(--main-color);
    font-size: 24px;
    font-weight: 700;
    margin: 14px 0 30px 0;
  }
`;

const Button = styled.button`
  background: var(--main-color);
  width: 209px;
  border: 1px solid #d9d9d9;
  color: #d9d9d9;
  height: 54px;
  border-radius: 16px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;
