import React from "react";
import styled from "styled-components";
import styles from "./loading.module.css";
import Logo from "assets/images/aiety_logo.png";

// 유니티용 로딩모달

const LoadingModal = ({ open }) => {
  return (
    <ModalOutSide open={open}>
      <ModalBackground>
        <div className={styles.container}>
          <div className={styles.circle}></div>
          <div className={styles.square}></div>
          <div className={styles.triangle}></div>
          <div className={styles.logo}>
            <img src={Logo} alt="logo"></img>
          </div>
          <div className={styles.shadow}></div>
          <div className={styles.loading}>로딩중입니다.</div>
        </div>
        <div className="overlay"></div>
      </ModalBackground>
    </ModalOutSide>
  );
};

export default LoadingModal;

const ModalOutSide = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  right: 0;
  z-index: 200;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: white;
`;

const ModalBackground = styled.div`
  & > .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & video {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
