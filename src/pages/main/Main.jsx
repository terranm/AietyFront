import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TempBg from "assets/images/temp_bg.png";
import ReactPlayer from "react-player";
import MainVideo from "assets/videos/jobcenter.mp4";
import { useAuthContext } from "context/AuthContext";
import { isMobile } from "react-device-detect";

const Main = () => {
  const navigate = useNavigate();
  const { isLogin } = useAuthContext();

  const enterMetaverse = () => {
    if (isLogin) {
      if (!isMobile) {
        navigate("/metaverse");
      } else {
        alert("메타버스 서비스는 PC에서만 지원합니다.");
      }
    } else {
      alert("로그인 후 입장 가능합니다.");
    }
  };

  return (
    <MainBannerBox>
      <ReactPlayer
        width="100%"
        height="100%"
        url={MainVideo}
        muted={true}
        playing={true}
        loop={true}
        playsinline={true}
      />
      <MainBannerInBox>
        <div className="title">
          <h1>
            에이어티<br></br> 취업상담센터
          </h1>
        </div>
        <button onClick={enterMetaverse}>입장</button>
      </MainBannerInBox>
      <div className="overlay"></div>
    </MainBannerBox>
  );
};

export default Main;

const MainBannerBox = styled.div`
  width: 100%;
  position: relative;
  min-height: 500px;
  & video {
    pointer-events: none;
    object-fit: fill;
    width: "100%";
    height: "100%";
    @media screen and (max-width: 500px) {
      height: 500px !important;
    }
  }

  & > .overlay {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
  }
`;

const MainBannerInBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 10;
  width: 100%;
  & > .title {
    color: white;
    font-size: 1.4rem;
    width: 100%;
    text-align: center;
    margin-bottom: 16px;
  }

  & > button {
    width: 209px;
    height: 56px;
    border-radius: 18px;
    background: var(--main-color);
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    margin: 30px auto auto auto;
    cursor: pointer;
  }
`;
