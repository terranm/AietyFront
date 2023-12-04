import React, { useState } from "react";
import styled from "styled-components";
import ExitBtn from "assets/images/metaverse/lobby_btn.png";
import TutorialBtn from "assets/images/metaverse/tutorial_btn.png";

import QuestionBtn from "assets/images/metaverse/question_btn.png";
import ActiveQuestionBtn from "assets/images/metaverse/question_white_btn.png";
import ClapBtn from "assets/images/metaverse/clap_btn.png";
import ActiveClapBtn from "assets/images/metaverse/clap_white_btn.png";
import GoodBtn from "assets/images/metaverse/good_btn.png";
import ActiveGoodBtn from "assets/images/metaverse/good_white_btn.png";
import HelloBtn from "assets/images/metaverse/hello_btn.png";
import RunBtn from "assets/images/metaverse/run_btn.png";
import ActiveRunBtn from "assets/images/metaverse/run_white_btn.png";
import ActiveHelloBtn from "assets/images/metaverse/hello_white_btn.png";

const SeminarScene = ({
  handleHello,
  greeting,
  handleRun,
  running,
  handleTutorialModal,
  setLayoutType,
  sendMessage,
  isAvatarStand,
}) => {
  const [questioning, setQuestioning] = useState(false);
  const [claping, setClaping] = useState(false);
  const [gooding, setGooding] = useState(false);

  const handleQuestion = () => {
    sendMessage("ReactCommunicator", "sendItsme");
    setQuestioning(true);
    setTimeout(() => {
      setQuestioning(false);
    }, 2000);
  };
  const handleClap = () => {
    sendMessage("ReactCommunicator", "sendClap");
    setClaping(true);
    setTimeout(() => {
      setClaping(false);
    }, 2000);
  };
  const handleGood = () => {
    sendMessage("ReactCommunicator", "sendNod");
    setGooding(true);
    setTimeout(() => {
      setGooding(false);
    }, 2000);
  };

  return (
    <>
      <HeaderLayOut>
        <CircleBtn
          onClick={() => {
            setLayoutType("LOBBY");
            sendMessage("ReactCommunicator", "seminarLeave");
          }}
        >
          <img style={{ marginLeft: "5px" }} src={ExitBtn} alt="btn"></img>
          <span style={{ marginTop: "4px" }}>대기실</span>
        </CircleBtn>
      </HeaderLayOut>
      <FooterLayOut>
        {!isAvatarStand && (
          <FooterCenter>
            <ActionBtn onClick={handleQuestion} active={questioning}>
              {!questioning ? (
                <>
                  <img src={QuestionBtn} alt="btn"></img>
                  <p>질문하기</p>
                </>
              ) : (
                <>
                  <img src={ActiveQuestionBtn} alt="btn"></img>
                  <p style={{ color: "#F5FAFF" }}>질문하기</p>
                </>
              )}
            </ActionBtn>
            <ActionBtn onClick={handleClap} active={claping}>
              {!claping ? (
                <>
                  <img src={ClapBtn} alt="btn"></img>
                  <p>박수</p>
                </>
              ) : (
                <>
                  <img src={ActiveClapBtn} alt="btn"></img>
                  <p style={{ color: "#F5FAFF" }}>박수</p>
                </>
              )}
            </ActionBtn>
            <ActionBtn onClick={handleGood} active={gooding}>
              {!gooding ? (
                <>
                  <img src={GoodBtn} alt="btn"></img>
                  <p>공감하기</p>
                </>
              ) : (
                <>
                  <img src={ActiveGoodBtn} alt="btn"></img>
                  <p style={{ color: "#F5FAFF" }}>공감하기</p>
                </>
              )}
            </ActionBtn>
          </FooterCenter>
        )}
        {isAvatarStand && (
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
        )}
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

export default SeminarScene;

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
