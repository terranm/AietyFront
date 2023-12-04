import React, { useEffect, useRef, useState } from "react";
import XButton from "assets/images/x_button.png";
import styled, { keyframes } from "styled-components";
import { counselingApis } from "pages/metaverse/apis/counselingApis";
import { useAuthContext } from "context/AuthContext";
import moment from "moment";

const CounselingModal = ({ open, close, setLayoutType, sendMessage }) => {
  const today = new Date();
  const outside = useRef();
  const [list, setList] = useState([]);
  const { setMyCounselingInfo } = useAuthContext();

  useEffect(() => {
    if (open) {
      getMyList();
    }
  }, [open]);

  const getMyList = async () => {
    try {
      const res = await counselingApis.myList({
        page: 1,
        pagePerRow: 10,
      });

      if (res.resultCode === "0000") {
        console.log(res.data.list);
        const data = res.data.list;

        const todayData = data.filter(
          (item) => item.ymd == moment(today).format("YYYY.MM.DD")
        );
        console.log(todayData);
        setList(todayData);
      } else {
        alert(res.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  const enterCounselingRoom = (
    appointmentId,
    agoraChannelId,
    roomName,
    avatarType
  ) => {
    console.log("agoraChannelId :", agoraChannelId);
    setMyCounselingInfo({
      appointmentId: appointmentId,
      agoraChannel: agoraChannelId,
    });

    console.log(
      "상담실 입장 데이터 :",
      JSON.stringify({
        room: roomName,
        mentor: avatarType,
        open: "true",
      })
    );

    sendMessage(
      "ReactCommunicator",
      "counseiling",
      JSON.stringify({
        room: roomName,
        mentor: avatarType,
        open: "true",
      })
    );

    sendMessage("ReactCommunicator", "offKeyFocus");

    close();
    setLayoutType("COUNSELING");
  };

  const isEnterable = (ymd, startTime, endTime, counselingStatus) => {
    if (counselingStatus == "FINISH") {
      return false;
    }

    const startDate = new Date(`${ymd} ${startTime}:00`);
    startDate.setMinutes(startDate.getMinutes() - 10);
    const endDate = new Date(`${ymd} ${endTime}:00`);

    if (today > startDate && today < endDate) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  };

  return (
    <ModalOutSide
      open={open}
      ref={outside}
      onClick={(e) => {
        //모달 바깥영역 클릭시 close
        if (e.target == outside.current) {
          close();
        }
      }}
    >
      <Modal>
        <button className="close" onClick={close}>
          <img alt="btn" src={XButton}></img>
        </button>
        <ModalHeader>
          <h3>{moment(today).format("MM월 DD일")} 오늘의 상담 예약</h3>
          <p>※상담 예약 시간 10분 전부터 입장이 가능합니다.</p>
          <p>
            ※전체 상담 예약 현황은 ‘취업상담예약 상담예약현황’ 에서 확인이
            가능합니다.
          </p>
        </ModalHeader>
        <ModalBody>
          {list.length > 0 &&
            list?.map((item, index) => (
              <ListBox key={index}>
                <div style={{ fontWeight: "700" }}>{item.counselorName}</div>
                <RoomTypeBox roomType={item.roomType}>
                  {item.roomType == "SINGLE" && "개인상담"}
                  {item.roomType == "DOUBLE" && "그룹상담"}
                </RoomTypeBox>
                <div>
                  <div>{item.ymd}</div>
                  <div>
                    {item.startTime} ~ {item.endTime}
                  </div>
                </div>
                {isEnterable(
                  item.ymd,
                  item.startTime,
                  item.endTime,
                  item.counselingStatus
                ) ? (
                  <Button
                    active={true}
                    onClick={() =>
                      enterCounselingRoom(
                        item.appointmentId,
                        item.agoraChannelId,
                        item.roomName,
                        item.counselorAvatarType
                      )
                    }
                  >
                    입장
                  </Button>
                ) : (
                  <Button>입장</Button>
                )}
              </ListBox>
            ))}
          {list.length == 0 && <ListBox>예약된 상담 일정이 없습니다.</ListBox>}
        </ModalBody>
      </Modal>
    </ModalOutSide>
  );
};

export default CounselingModal;

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
  max-width: 830px;
  border-radius: 18px;
  background: white;
  box-sizing: border-box;
  position: absolute;
  padding: 30px;
  & > .close {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 30px;
    cursor: pointer;
  }
`;

const ModalHeader = styled.div`
  & > h3 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  & > p {
    color: #667085;
    font-size: 14px;
    font-weight: 400;
  }
  margin-bottom: 10px;
`;

const ModalBody = styled.div`
  padding: 30px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
`;

const ListBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f3f6fb;
  padding: 15px 30px;
  align-items: center;
  text-align: center;
`;

const Button = styled.button`
  border: ${(props) =>
    props.active ? "1px solid #3546d1" : "1px solid #D9D9D9"};
  color: ${(props) => (props.active ? "#3546d1" : "#D9D9D9")};
  border-radius: 6px;
  width: 60px;
  height: 34px;
  cursor: pointer;
`;

const RoomTypeBox = styled.div`
  font-weight: 700;
  color: ${(props) => props.roomType === "SINGLE" && "#2878D5"};
  color: ${(props) => props.roomType === "DOUBLE" && "#14B77C"};
`;
