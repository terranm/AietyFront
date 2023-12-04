import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VideoRoom from "./components/VideoRoom";
import Chat from "./components/Chat";
import { counselingApis } from "../../apis/counselingApis";
import ExitBtn from "assets/images/metaverse/lobby_btn.png";
import DocumentBtn from "assets/images/metaverse/document_btn.png";
import TutorialBtn from "assets/images/metaverse/tutorial_btn.png";
import QuestionBtn from "assets/images/metaverse/question_btn.png";
import ActiveQuestionBtn from "assets/images/metaverse/question_white_btn.png";
import ClapBtn from "assets/images/metaverse/clap_btn.png";
import ActiveClapBtn from "assets/images/metaverse/clap_white_btn.png";
import GoodBtn from "assets/images/metaverse/good_btn.png";
import ActiveGoodBtn from "assets/images/metaverse/good_white_btn.png";
import { useAuthContext } from "context/AuthContext";
import DocumentModal from "pages/metaverse/modal/documentmodal/DocumentModal";

const CounselingScene = ({
  handleTutorialModal,
  setLayoutType,
  sendMessage,
}) => {
  const { myCounselingInfo, setMyCounselingInfo } = useAuthContext();
  const [detail, setDetail] = useState();
  const [guestList, setGuestList] = useState();
  const [isInRoom, setIsInRoom] = useState(true);
  const [chattingNotice, setChattingNotice] = useState("");
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const handleDocumentModal = () => {
    setShowDocumentModal((prev) => !prev);
  };

  useEffect(() => {
    getMyList();
  }, []);

  const getMyList = async () => {
    try {
      const res = await counselingApis.roomDetail({
        appointmentId: myCounselingInfo.appointmentId,
      });

      if (res.resultCode === "0000") {
        console.log(res.data);
        setDetail(res.data.detail);
        setGuestList(res.data.guestList[0]);
      } else {
        alert(res.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  const leaveCounselingRoom = () => {
    sendMessage("ReactCommunicator", "onKeyFocus");
    sendMessage(
      "ReactCommunicator",
      "counseiling",
      JSON.stringify({
        room: "1",
        mentor: "TYPE1",
        open: "false",
      })
    );
    setLayoutType("LOBBY");
    setIsInRoom(false);
    setMyCounselingInfo({
      appointmentId: "",
      agoraChannel: "",
    });
  };

  const [questioning, setQuestioning] = useState(false);
  const [claping, setClaping] = useState(false);
  const [gooding, setGooding] = useState(false);

  const handleQuestion = () => {
    sendMessage("ReactCommunicator", "sendItsme");
    setChattingNotice("[[질문]]");
    setQuestioning(true);
    setTimeout(() => {
      setQuestioning(false);
    }, 2000);
  };
  const handleClap = () => {
    sendMessage("ReactCommunicator", "sendClap");
    setChattingNotice("[[박수]]");
    setClaping(true);
    setTimeout(() => {
      setClaping(false);
    }, 2000);
  };
  const handleGood = () => {
    sendMessage("ReactCommunicator", "sendNod");
    setChattingNotice("[[공감]]");
    setGooding(true);
    setTimeout(() => {
      setGooding(false);
    }, 2000);
  };

  return (
    <>
      <HeaderLayOut>
        <RoomInfo>
          <h3>{detail?.roomName} 상담실</h3>
          <p>상담사: {detail?.counselorName} </p>
          <p>
            상담시간: {detail?.startTime} ~ {detail?.endTime}
          </p>
        </RoomInfo>
        <div>
          {myCounselingInfo.agoraChannel !== "" && (
            <VideoRoom
              channelId={myCounselingInfo.agoraChannel}
              isInRoom={isInRoom}
            ></VideoRoom>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <CircleBtn onClick={handleDocumentModal}>
            <img src={DocumentBtn} alt="btn"></img>
            <span style={{ marginTop: "4px" }}>상담서류</span>
          </CircleBtn>
          <CircleBtn onClick={leaveCounselingRoom}>
            <img style={{ marginLeft: "5px" }} src={ExitBtn} alt="btn"></img>
            <p style={{ marginTop: "4px" }}>대기실</p>
          </CircleBtn>
        </div>
      </HeaderLayOut>
      <SideLayOut>
        {myCounselingInfo.agoraChannel !== "" && (
          <Chat
            channelId={myCounselingInfo.agoraChannel}
            chattingNotice={chattingNotice}
            setChattingNotice={setChattingNotice}
          ></Chat>
        )}
      </SideLayOut>
      <FooterLayOut>
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
        <FooterRight>
          <CircleBtn onClick={handleTutorialModal}>
            <img src={TutorialBtn} alt="btn"></img>
            <span>이용방법</span>
          </CircleBtn>
        </FooterRight>
      </FooterLayOut>
      <DocumentModal
        open={showDocumentModal}
        close={handleDocumentModal}
        guestList={guestList}
      ></DocumentModal>
    </>
  );
};

export default CounselingScene;

const HeaderLayOut = styled.div`
  position: fixed;
  width: 94.8%;
  top: 2.6%;
  left: 2.6%;
  display: flex;
  justify-content: space-between;
  margin: auto;
  color: #434241;
`;

const RoomInfo = styled.div`
  border-radius: 10px;
  background: rgba(245, 250, 255, 0.9);
  color: #434241;
  padding: 20px;
  height: 110px;
  font-weight: 700;
  & > h3 {
    margin-bottom: 10px;
  }
`;

const SideLayOut = styled.div`
  position: fixed;
  bottom: 2.6%;
  left: 2.6%;
  border-radius: 10px;
  background: rgba(245, 250, 255, 0.9);
  width: 480px;
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
