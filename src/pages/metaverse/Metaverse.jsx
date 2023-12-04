import React, { useState, useEffect, useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useLocation, useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useAuthContext } from "context/AuthContext";

// 모달
import BasicAlertModal from "components/modal/basicalertmodal/BasicAlertModal";
import TutorialModal from "pages/metaverse/modal/tutorialmodal/TutorialModal";
import LoadingModal from "pages/metaverse/modal/loadingmodal/LoadingModal";

// 레이아웃 컴포넌트
import CounselingScene from "./components/counselingscene/CounselingScene";
import SeminarScene from "./components/SeminarScene";
import LobbyScene from "./components/LobbyScene";
import AvatarSettingScene from "./components/AvatarSettingScene";
import { avatarApis } from "./apis/avatarApis";
import CounselingModal from "./modal/counselingmodal/CounselingModal";
import { eventApis } from "./apis/eventApis";
import EventModal from "./modal/eventmodal/EventModal";
import BoardModal from "./modal/boardmodal/BoardModal";
import { seminarApis } from "./apis/seminarApis";
import Zoom from "components/zoom/Zoom";

const Metaverse = () => {
  const profileBtn = useRef();
  const navigate = useNavigate();
  const history = createBrowserHistory();
  const { userInfo, zoomInfo, setZoomInfo } = useAuthContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const loc = searchParams.get("loc");

  const [avatar, setAvatar] = useState({
    hairCode: "",
    faceCode: "",
    topCode: "",
    bottomCode: "",
    shoesCode: "",
  });

  const seminarDefaultImage =
    "https://aiety-tnmeta.s3.ap-northeast-2.amazonaws.com/test/plain/seminr_default_img.png";

  const [hasAvatar, setHasAvatar] = useState();
  const [isAvatarStand, setIsAvatarStand] = useState(true);
  const [eventList, setEventList] = useState([]);

  const [seminarImage, setSeminarImage] = useState(seminarDefaultImage);
  const [originalAvatarItem, setOriginalAvatarItem] = useState({
    hairCode: "",
    faceCode: "",
    topCode: "",
    bottomCode: "",
    shoesCode: "",
  });

  useEffect(() => {
    //이벤트 목록 리스트(live-list)
    getEventList();
    //아바타 카테고리(live-list)
    getMyAvatar();
    //현재 세미나 정보
    getSeminarDetail();
  }, []);

  const getSeminarDetail = async () => {
    try {
      const res = await seminarApis.detail({});

      if (res.resultCode === "0000") {
        if (Object.keys(res.data).length !== 0) {
          console.log("세미나 있음!");
          setZoomInfo({
            ...zoomInfo,
            meetingNumber: res.data.seminar.meetingId,
            meetingPassword: res.data.seminar.meetingPasswd,
          });

          window.sessionStorage.setItem("seminarIs", "Y");

          setSeminarImage(res.data.seminar.thumbnailImgUrl);
        }
        if (Object.keys(res.data).length == 0) {
          console.log("세미나 없음!");
          window.sessionStorage.setItem("seminarIs", "N");
        }
      } else {
        alert(res.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  const getEventList = async () => {
    try {
      const res = await eventApis.liveList({});

      if (res.resultCode === "0000") {
        console.log("res", res);

        let array = [];
        let liveList = [];
        if (res.data.procStatus === true) {
          array = res.data.liveEventList;

          for (let i = 0; i < array.length; i++) {
            liveList.push(array[i].urlFile1);
          }
        }
        console.log("livelist", liveList);

        setEventList(liveList);
      } else {
        alert(res.resultMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getMyAvatar = async () => {
    try {
      const res = await avatarApis.myAvatar();

      if (res.resultCode === "0000") {
        setAvatar({
          ...avatar,
          hairCode: res.data.avatar.hairCode,
          faceCode: res.data.avatar.faceCode,
          topCode: res.data.avatar.topCode,
          bottomCode: res.data.avatar.bottomCode,
          shoesCode: res.data.avatar.shoesCode,
        });
        setOriginalAvatarItem({
          ...avatar,
          hairCode: res.data.avatar.hairCode,
          faceCode: res.data.avatar.faceCode,
          topCode: res.data.avatar.topCode,
          bottomCode: res.data.avatar.bottomCode,
          shoesCode: res.data.avatar.shoesCode,
        });
        setHasAvatar(res.data.isSetting ? "Y" : "N");
        if (loc == "seminar") {
          setLayoutType(res.data.isSetting ? "SEMINAR" : "AVATAR");
        } else {
          setLayoutType(res.data.isSetting ? "LOBBY" : "AVATAR");
        }
      } else {
        alert(res.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  //useState 초깃값 설정
  //LOBBY,SEMINAR,COUNSELING,NONE
  const [layoutType, setLayoutType] = useState("AVATAR");
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [greeting, setGreeting] = useState(false);
  const [running, setRunning] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(true);

  const toggleLoadingModal = () => {
    console.log("showLoadingModal :", showLoadingModal);
    setShowLoadingModal((prev) => !prev);
  };
  const [showZoomModal, setShowZoomModal] = useState(false);

  const toggleZoomModal = () => {
    console.log("showLoadingModal :", showLoadingModal);
    setShowZoomModal((prev) => !prev);
  };

  const [basicAlertMessage, setBasicAlertMessage] = useState("");
  const [basicAlertType, setBasicAlertType] = useState("nickName");
  const [showBasicAlert, setShowBasicAlert] = useState(false);
  const toggleBasicAlert = () => {
    setShowBasicAlert((prev) => !prev);
  };
  const [showCounselingModal, setShowCounselingModal] = useState(false);
  const toggleCounselingModal = () => {
    setShowCounselingModal((prev) => !prev);
  };
  const [showBoardModal, setShowBoardModal] = useState(false);
  const toggleBoardModal = () => {
    setShowBoardModal((prev) => !prev);
  };
  const [showEventModal, setShowEventModal] = useState(false);
  const toggleEventModal = () => {
    setShowEventModal((prev) => !prev);
  };

  // 유니티 연결
  const { unityProvider, addEventListener, sendMessage } = useUnityContext({
    loaderUrl: "Build/build.loader.js",
    dataUrl: "Build/build.data",
    frameworkUrl: "Build/build.framework.js",
    codeUrl: "Build/build.wasm",
    streamingAssetsUrl: "StreamingAssets",
  });

  useEffect(() => {
    history.listen((location) => {
      //브라우저 뒤로가기 클릭시
      if (history.action === "POP") {
        sendMessage("ReactCommunicator", "leaveCenter");
        window.location.reload();
      }
    });
  }, [history]);

  // 유니티 --> 리액트
  useEffect(() => {
    //나가기 누를때
    addEventListener("okayToLeave", goHome);

    //서버 연결이 끊긴 경우
    addEventListener("onDisconnectServer", () => {
      setBasicAlertType("reload");
      setBasicAlertMessage(`서버와의 연결이 끊겼습니다.`);
      toggleBasicAlert();
    });
    addEventListener("pingAck", intializingUnity);
    addEventListener("isSeminarEnterable", enterSeminar);
    addEventListener("fullScreen", (type) => {
      if (JSON.parse(type).type == "Seminar") {
        const seminarIs = window.sessionStorage.getItem("seminarIs");
        if (seminarIs === "Y") {
          toggleZoomModal();
        } else {
          setBasicAlertType("close");
          setBasicAlertMessage(`진행 중인 세미나가 없습니다.`);
          toggleBasicAlert();
        }
      }
      if (JSON.parse(type).type == "Event") {
        toggleEventModal();
        console.log("이벤트 모달 open");
      }
      if (JSON.parse(type).type == "Board") {
        toggleBoardModal();
        console.log("상담실 현황 모달 open");
      }
    });
    addEventListener("openLoadingModal", () => {
      console.log("유니티 호출 : openLoadingModal");
      toggleLoadingModal();
    });
    addEventListener("closeLoadingModal", () => {
      console.log("유니티 호출 : closeLoadingModal");
      toggleLoadingModal();
    });
    addEventListener("onUnityLoaded", handleUnity);
    addEventListener("requestUIChange", (type) => {
      if (JSON.parse(type).type == "Stand") {
        setIsAvatarStand(true);
      }
      if (JSON.parse(type).type == "Sit") {
        setIsAvatarStand(false);
      }
    });
    console.log("addEventListner", addEventListener);
  }, [addEventListener]);

  const handleUnity = () => {
    profileBtn.current.click();
  };

  function enterSeminar() {
    console.log("SEMINAR");
    setLayoutType("SEMINAR");
  }

  const goHome = () => {
    navigate("/");
    window.location.reload();
  };

  const handleHello = () => {
    console.log("sendMessage : ", "ReactCommunicator", "sendHello");
    sendMessage("ReactCommunicator", "sendHello");
    setGreeting(true);
    setTimeout(() => {
      setGreeting(false);
    }, 2000);
  };

  const handleTutorialModal = () => {
    setShowTutorialModal((prev) => !prev);
  };

  const handleRun = () => {
    setRunning((prev) => !prev);
    if (running === true) {
      console.log("sendMessage : ", "ReactCommunicator", "sendRunOff");
      sendMessage("ReactCommunicator", "sendRunOff");
    }
    if (running === false) {
      console.log("sendMessage : ", "ReactCommunicator", "sendRunOn");
      sendMessage("ReactCommunicator", "sendRunOn");
    }
  };

  const intializingUnity = () => {
    const unityInitData = {
      eventIMGs: JSON.stringify({
        list: eventList,
      }),
      avatar: JSON.stringify({
        hair: avatar.hairCode,
        face: avatar.faceCode,
        top: avatar.topCode,
        bottom: avatar.bottomCode,
        shoes: avatar.shoesCode,
      }),
      nickName: userInfo.name,
      isSetAvatar: hasAvatar,
      seminarImgUrl: seminarImage,
      isSetSeminar: window.sessionStorage.getItem("seminarIs"),
      loc: loc ? loc : "waitingRoom",
    };

    console.log(unityInitData);
    sendMessage(
      "ReactCommunicator",
      "intializingUnity",
      JSON.stringify(unityInitData)
    );
  };

  return (
    <>
      <button
        style={{ display: "none" }}
        ref={profileBtn}
        onClick={intializingUnity}
      >
        init data 전송
      </button>
      <AvatarSettingScene
        showLoadingModal={showLoadingModal}
        userName={userInfo.name}
        sendMessage={sendMessage}
        setLayoutType={setLayoutType}
        layoutType={layoutType}
        avatar={avatar}
        originalAvatarItem={originalAvatarItem}
        setOriginalAvatarItem={setOriginalAvatarItem}
      >
        {/* 유니티 화면 fixed 일때 전체 화면으로 이동 */}
        <Unity
          unityProvider={unityProvider}
          style={layoutType !== "AVATAR" ? fixed : responsive}
        />
      </AvatarSettingScene>

      {layoutType === "LOBBY" && (
        <LobbyScene
          handleHello={handleHello}
          greeting={greeting}
          handleRun={handleRun}
          running={running}
          setLayoutType={setLayoutType}
          handleTutorialModal={handleTutorialModal}
          toggleCounselingModal={toggleCounselingModal}
          sendMessage={sendMessage}
        ></LobbyScene>
      )}

      {layoutType === "COUNSELING" && (
        <CounselingScene
          handleHello={handleHello}
          greeting={greeting}
          handleRun={handleRun}
          running={running}
          handleTutorialModal={handleTutorialModal}
          setLayoutType={setLayoutType}
          sendMessage={sendMessage}
        ></CounselingScene>
      )}

      {layoutType === "SEMINAR" && (
        <SeminarScene
          handleHello={handleHello}
          greeting={greeting}
          handleRun={handleRun}
          running={running}
          handleTutorialModal={handleTutorialModal}
          setLayoutType={setLayoutType}
          sendMessage={sendMessage}
          isAvatarStand={isAvatarStand}
        ></SeminarScene>
      )}

      {/* 모달 준비 */}
      <LoadingModal open={showLoadingModal}></LoadingModal>
      <TutorialModal
        open={showTutorialModal}
        close={handleTutorialModal}
      ></TutorialModal>
      <BasicAlertModal
        open={showBasicAlert}
        close={toggleBasicAlert}
        type={basicAlertType}
      >
        <p style={{ whiteSpace: "pre-wrap" }}>{basicAlertMessage}</p>
      </BasicAlertModal>
      <CounselingModal
        sendMessage={sendMessage}
        open={showCounselingModal}
        close={toggleCounselingModal}
        setLayoutType={setLayoutType}
      ></CounselingModal>
      <EventModal open={showEventModal} close={toggleEventModal}></EventModal>
      <BoardModal open={showBoardModal} close={toggleBoardModal}></BoardModal>
      {showZoomModal && <Zoom zoomInfo={zoomInfo} userInfo={userInfo}></Zoom>}
    </>
  );
};

export default Metaverse;

const responsive = { width: "100%", height: "100%" };
const fixed = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100vh",
  backgroundColor: "#fff",
};
