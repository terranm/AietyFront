import React, { useEffect, useState } from "react";
import styled from "styled-components";
import customAxios from "utils/api";

const CalendarModal = ({
  strdate,
  open,
  setModalOpen,
  day,
  date,
  toggleReservationModal,
  setCalendarDetail,
  yearMonth,
  counselorId,
}) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    getCalendarInfo();
  }, []);
  const koreanDay = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  //내 달력 정보 가져오기
  const getCalendarInfo = async () => {
    try {
      //axios 요청
      const res = await customAxios.post(`/v1/appointment/api/list`, {
        year: yearMonth.year,
        month: yearMonth.month,
        memberIdCounselor: counselorId,
      });

      console.log("REQUEST : /v1/appointment/api/list : ");
      console.log(res);
      if (res.data.resultCode === "0000") {
        setList(res.data.data.periodList[strdate]);
      } else {
        alert(res.data.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  return (
    <Modal open={open}>
      <div className="close" onClick={() => setModalOpen(false)}></div>
      <div className="dateTitle">
        {date}
        <span>{koreanDay[day]}</span>
      </div>
      <AvailableDateBox>
        <div>
          {list.map(
            (item, index) =>
              item.roomType == "SINGLE" && (
                <div
                  key={index}
                  className="dateBox"
                  onClick={() => {
                    setCalendarDetail(item);
                    toggleReservationModal();
                  }}
                >
                  <div className="blueCircle"></div>
                  {item.time}
                </div>
              )
          )}
        </div>
        <div>
          {list.map(
            (item, index) =>
              item.roomType == "DOUBLE" && (
                <div
                  key={index}
                  className="dateBox"
                  onClick={() => {
                    setCalendarDetail(item);
                    toggleReservationModal();
                  }}
                >
                  <div className="greanCircle"></div>
                  {/* {item.time} */}
                  {`${item.hour}:00`}
                  {`(그룹 ${item.countCurrent}/${item.countMax})`}
                </div>
              )
          )}
        </div>
      </AvailableDateBox>
    </Modal>
  );
};

export default CalendarModal;
const Modal = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  width: 292px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 6px;
  background: #f3f6fb;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 100;
  padding: 10px;

  & > .dateTitle {
    text-align: left;
    & > span {
      margin-left: 2px;
      font-size: 12px;
    }
  }

  //X버튼 커스텀
  & > .close {
    width: 30px;
    height: 20px;
    position: absolute;
    right: 0;
  }
  & > .close:after,
  .close:before {
    right: 15px;
    content: "";
    position: absolute;
    width: 1px;
    height: 13px;
    background-color: var(--black-color);
  }
  & > .close:before {
    transform: rotate(45deg);
  }
  & > .close:after {
    transform: rotate(-45deg);
  }
`;

const AvailableDateBox = styled.div`
  display: flex;
  padding: 22px 0;
  & > div {
    width: 50%;
  }

  & > div > .dateBox {
    color: #0f182a;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    margin-bottom: 3px;
  }
  & > div > .dateBox > .blueCircle {
    width: 8px;
    height: 8px;
    background-color: #2878d5;
    border-radius: 50%;
    margin-right: 4px;
  }
  & > div > .dateBox > .greanCircle {
    width: 8px;
    height: 8px;
    background-color: #14b77c;
    border-radius: 50%;
    margin-right: 4px;
  }
`;
