import React, { useEffect, useRef, useState } from "react";
import XButton from "assets/images/x_button.png";
import styled, { keyframes } from "styled-components";
import { counselingApis } from "pages/metaverse/apis/counselingApis";
import moment from "moment";

const BoardModal = ({ open, close }) => {
  const outside = useRef();
  const today = new Date();
  const [room1, setRoom1] = useState();
  const [room2, setRoom2] = useState();
  const [room3, setRoom3] = useState();

  const [seminarList, setSeminarList] = useState();

  useEffect(() => {
    getMyList();
  }, [open]);

  const getMyList = async () => {
    const year = moment(today).format("YYYY");
    const month = moment(today).format("MM");
    const day = moment(today).format("DD");

    try {
      const res = await counselingApis.roomList({
        year: year,
        month: month,
        day: day,
      });

      if (res.resultCode === "0000") {
        setRoom1(res.data.roomInfo.ROOM1);
        setRoom2(res.data.roomInfo.ROOM2);
        setRoom3(res.data.roomInfo.ROOM3);

        setSeminarList(res.data.seminarList);
      } else {
        alert(res.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
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
          <h3>{`${moment(today).format("MM")}월 ${moment(today).format(
            "DD"
          )}일`}</h3>
          <p>오늘의 현황</p>
        </ModalHeader>
        <ModalBody>
          <CounselingBox>
            <div>
              <div className="title">상담 현황</div>
            </div>
            <RoomByBox>
              <div className="top">
                <h4>제 1 상담실</h4>
                <p>상담사 {room1?.counselorName}</p>
              </div>
              <div className="bottom">
                {room1?.timeList?.length > 0 &&
                  room1?.timeList.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
              </div>
              {room1?.timeList?.length == 0 && (
                <div className="schedule">상담 일정이 없습니다.</div>
              )}
            </RoomByBox>
            <RoomByBox>
              <div className="top">
                <h4>제 2 상담실</h4>
                <p>상담사 {room2?.counselorName}</p>
              </div>
              <div className="bottom">
                {room2?.timeList?.length > 0 &&
                  room2?.timeList.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
              </div>
              {room2?.timeList?.length == 0 && (
                <div className="schedule">상담 일정이 없습니다.</div>
              )}
            </RoomByBox>
            <RoomByBox>
              <div className="top">
                <h4>제 3 상담실</h4>
                <p>상담사 {room3?.counselorName}</p>
              </div>
              <div className="bottom">
                {room3?.timeList?.length > 0 &&
                  room3?.timeList.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
              </div>
              {room3?.timeList?.length == 0 && (
                <div className="schedule">상담 일정이 없습니다.</div>
              )}
            </RoomByBox>
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
            <div className="circle4"></div>
          </CounselingBox>
          <SeminarBox>
            <div>
              <div className="title">세미나 현황</div>
            </div>
            {seminarList?.length > 0 ? (
              seminarList.slice(0, 3).map((item, index) => (
                <SeminarByBox key={index}>
                  <div className="top">
                    <h4>{item.title}</h4>
                  </div>
                  <div className="bottom">
                    강사 : {item.seminarName}
                    <span style={{ margin: "0 20px" }}>|</span>시간 :{" "}
                    {moment(item.startTime).format("hh:mm")} ~{" "}
                    {moment(item.endTime).format("hh:mm")}
                  </div>
                </SeminarByBox>
              ))
            ) : (
              <div className="nolist">세미나 일정이 없습니다.</div>
            )}

            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
            <div className="circle4"></div>
          </SeminarBox>
        </ModalBody>
      </Modal>
    </ModalOutSide>
  );
};

export default BoardModal;

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
  max-width: 1400px;
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
  text-align: center;
  & > h3 {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  & > p {
    color: #666;
    font-size: 18px;
    font-weight: 400;
  }
  margin-bottom: 30px;
`;

const ModalBody = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CounselingBox = styled.div`
  width: 645px;
  border-radius: 8px;
  border: 2px solid #2e5ebc;
  position: relative;
  padding-bottom: 40px;
  & > div > .title {
    border-radius: 2px 2px 30px 30px;
    background: #2e5ebc;
    text-align: center;
    color: #fff;
    font-size: 25px;
    font-weight: 700;
    width: 333px;
    padding: 13px;
    margin: auto auto 40px auto;
  }

  & > .circle1 {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 14px;
    height: 14px;
    border: 1px solid #2e5ebc;
    border-radius: 50%;
  }
  & > .circle2 {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 14px;
    height: 14px;
    border: 1px solid #2e5ebc;
    border-radius: 50%;
  }
  & > .circle3 {
    position: absolute;
    bottom: 30px;
    right: 30px;
    width: 14px;
    height: 14px;
    border: 1px solid #2e5ebc;
    border-radius: 50%;
  }
  & > .circle4 {
    position: absolute;
    bottom: 30px;
    left: 30px;
    width: 14px;
    height: 14px;
    border: 1px solid #2e5ebc;
    border-radius: 50%;
  }
`;

const RoomByBox = styled.div`
  width: 458px;
  height: 140px;
  margin: auto;
  & > .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid #0f182a;
    padding-bottom: 3px;
    & > h4 {
      font-size: 22px;
      font-weight: 700;
    }
    & > p {
      color: rgba(15, 24, 42, 0.7);
    }
  }

  & > .bottom {
    margin-top: 15px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    & > span {
      margin-right: 20px;
    }
  }
  & > .schedule {
    color: #666;
  }
`;

const SeminarBox = styled.div`
  width: 645px;
  border-radius: 8px;
  border: 2px solid #2e91bc;
  position: relative;
  & > div > .title {
    border-radius: 2px 2px 30px 30px;
    background: #2e91bc;
    text-align: center;
    color: #fff;
    font-size: 25px;
    font-weight: 700;
    width: 333px;
    padding: 13px;
    margin: auto auto 40px auto;
  }

  & > .circle1 {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 14px;
    height: 14px;
    border: 1px solid #2e91bc;
    border-radius: 50%;
  }
  & > .circle2 {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 14px;
    height: 14px;
    border: 1px solid #2e91bc;
    border-radius: 50%;
  }
  & > .circle3 {
    position: absolute;
    bottom: 30px;
    right: 30px;
    width: 14px;
    height: 14px;
    border: 1px solid #2e91bc;
    border-radius: 50%;
  }
  & > .circle4 {
    position: absolute;
    bottom: 30px;
    left: 30px;
    width: 14px;
    height: 14px;
    border: 1px solid #2e91bc;
    border-radius: 50%;
  }

  & > .nolist {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
    font-size: 24px;
  }
`;

const SeminarByBox = styled.div`
  width: 458px;
  height: 140px;
  margin: auto;
  & > .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid #0f182a;
    padding-bottom: 3px;
    & > h4 {
      font-size: 24px;
      font-weight: 700;
    }
    & > p {
      color: rgba(15, 24, 42, 0.7);
    }
  }

  & > .bottom {
    margin-top: 15px;
    & > span {
      margin-right: 20px;
    }
    & > .schedule {
      color: #666;
    }
  }
`;
