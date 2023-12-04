import React from "react";
import styled from "styled-components";
import HelloBtn from "assets/images/metaverse/hello_btn.png";
import RunBtn from "assets/images/metaverse/run_btn.png";
import ActiveRunBtn from "assets/images/metaverse/run_white_btn.png";
import ActiveHelloBtn from "assets/images/metaverse/hello_white_btn.png";

import CounselingEnterBtn from "assets/images/metaverse/enter_btn.png";
import ExitBtn from "assets/images/metaverse/exit_btn.png";
import TutorialBtn from "assets/images/metaverse/tutorial_btn.png";
import AvatarSettingBtn from "assets/images/metaverse/avatar_btn.png";
import VoiceGuideBtn from "assets/images/metaverse/voice_guide_btn.png";

const LobbyScene = ({
  handleHello,
  greeting,
  handleRun,
  running,
  handleTutorialModal,
  setLayoutType,
  toggleCounselingModal,
  sendMessage,
}) => {
  const openAvatarSetting = () => {
    setLayoutType("AVATAR");
    sendMessage(
      "ReactCommunicator",
      "avatarSetting",
      JSON.stringify({
        open: true,
      })
    );
  };

  return (
    <>
      <HeaderLayOut>
        <CircleBtn>
          <img src={VoiceGuideBtn} alt="btn"></img>
          <span style={{ marginTop: "10px" }}>음성안내</span>
        </CircleBtn>
        <CircleBtn onClick={openAvatarSetting}>
          <img src={AvatarSettingBtn} alt="btn"></img>
          <span>
            아바타<br></br>설정
          </span>
        </CircleBtn>
        <CircleBtn onClick={() => toggleCounselingModal()}>
          <img src={CounselingEnterBtn} alt="btn"></img>
          <p>
            상담실<br></br>입장
          </p>
        </CircleBtn>
        <CircleBtn
          onClick={() => sendMessage("ReactCommunicator", "leaveCenter")}
        >
          <img src={ExitBtn} alt="btn"></img>
          <span style={{ marginTop: "10px" }}>나가기</span>
        </CircleBtn>
      </HeaderLayOut>
      <FooterLayOut>
        <FooterCenter>
          <ActionBtn onClick={handleHello} active={greeting}>
            {!greeting ? (
              <>
                <img src={HelloBtn} alt="btn"></img>
                <p>안녕</p>
              </>
            ) : (
              <>
                <img src={ActiveHelloBtn} alt="btn"></img>
                <p style={{ color: "#F5FAFF" }}>안녕</p>
              </>
            )}
          </ActionBtn>
          <ActionBtn onClick={handleRun} active={running}>
            {!running ? (
              <>
                <img src={RunBtn} alt="btn"></img>
                <p>달리기</p>
              </>
            ) : (
              <>
                <img src={ActiveRunBtn} alt="btn"></img>
                <p style={{ color: "#F5FAFF" }}>달리기</p>
              </>
            )}
          </ActionBtn>
        </FooterCenter>
        <FooterRight>
          <CircleBtn onClick={handleTutorialModal}>
            <img src={TutorialBtn} alt="btn"></img>
            <span>이용방법</span>
          </CircleBtn>
        </FooterRight>
      </FooterLayOut>
    </>
  );
};

export default LobbyScene;

const HeaderLayOut = styled.div`
  position: fixed;
  top: 2.6%;
  right: 2.6%;
  display: flex;
`;

const FooterLayOut = styled.div``;
const FooterCenter = styled.div`
  position: fixed;
  bottom: 2.6%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const FooterRight = styled.div`
  position: fixed;
  bottom: 2.6%;
  right: 2.6%;
  display: flex;
`;

const ActionBtn = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.active ? "rgba(42, 53, 146, 0.90)" : "rgba(245, 250, 255, 0.9)"};
  color: #434241;
  font-size: 16px;
  font-weight: 400;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & > p {
    margin-top: 6px;
  }
`;

const CircleBtn = styled.div`
  background-color: rgba(245, 250, 255, 0.9);
  width: 80px;
  height: 80px;
  color: #434241;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 1.875rem;
  cursor: pointer;
  transition: 0.3s;
  z-index: 300;
  & > img {
    display: inline;
  }
  & > span {
    text-align: center;
  }
  & > p {
    display: block;
    text-align: center;
  }

  &:hover {
    background-color: rgba(245, 250, 255, 0.4);
  }
`;
