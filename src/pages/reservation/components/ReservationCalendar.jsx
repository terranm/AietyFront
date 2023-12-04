import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "../styles/custom_calendar.css";
import Calendar from "react-calendar";
import styled from "styled-components";
import moment from "moment";
import Loading from "components/loading/Loading";
import CalendarModal from "../modal/CalendarModal";
import SelectDown from "assets/images/select_down.png";
import ReservationModal from "../modal/ReservationModal";
import { reservationApis } from "../apis/reservationApis";
import PrevIcon from "assets/images/prev.png";
import Prev2Icon from "assets/images/prev2.png";
import NextIcon from "assets/images/next.png";
import Next2Icon from "assets/images/next2.png";

const ReservationCalendar = () => {
  const [value, onChange] = useState(new Date());
  const [data, setData] = useState();
  const [isLoading, setIsLoadng] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [clickDate, setClickDate] = useState("");
  const [counselorId, setCounselorId] = useState("");
  const [counselorName, setCounselorName] = useState("전체 상담사");
  const [selectModalView, setSelectModalView] = useState(false);
  const [counselorList, setCounselorList] = useState([]);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [calendarDetail, setCalendarDetail] = useState();
  const [yearMonth, setYearMonth] = useState({
    year: moment(value).format("YYYY"),
    month: moment(value).format("MM"),
  });

  //예약 모달 토글
  const toggleReservationModal = () => {
    setShowReservationModal((prev) => !prev);
  };

  useEffect(() => {
    getCalendarInfo();
  }, [counselorId, yearMonth]);

  //내 달력 정보 가져오기
  const getCalendarInfo = async () => {
    try {
      const res = await reservationApis.list({
        year: yearMonth.year,
        month: yearMonth.month,
        memberIdCounselor: counselorId,
        appointmentListType: "YEAR",
      });

      if (res.resultCode === "0000") {
        setData(res.data);
        setCounselorList(res.data.counselorList);
        setIsLoadng(false);
      } else {
        alert(res.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  const handleCalendar = (type) => {
    console.log(value);
    const currentDate = new Date(value);

    switch (type) {
      case "prev2":
        currentDate.setFullYear(currentDate.getFullYear() - 1);
        break;
      case "prev":
        currentDate.setMonth(currentDate.getMonth() - 1);
        break;
      case "next":
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case "next2":
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        break;

      default:
        break;
    }

    setYearMonth({
      ...yearMonth,
      year: moment(currentDate).format("YYYY"),
      month: moment(currentDate).format("MM"),
    });
    console.log("currentDate", currentDate);
    console.log("currentDate", moment(currentDate).format("YYYY-MM-DD"));
    // 선택한 날짜 업데이트
    onChange(currentDate);
  };

  return (
    <>
      <CalendarWrapper>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <>
            <CounselorSelectBox
              onClick={() => setSelectModalView((prev) => !prev)}
            >
              <div className="counselor">
                {counselorName}
                <img src={SelectDown} alt="btn"></img>
              </div>
              {selectModalView && (
                <div className="selectBoxModal">
                  <ul>
                    <li
                      onClick={() => {
                        setCounselorId("");
                        setCounselorName("전체 상담사");
                      }}
                    >
                      전체 상담사
                    </li>
                    {counselorList &&
                      counselorList.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setCounselorId(item.memberIdCounselor);
                            setCounselorName(item.name);
                          }}
                        >
                          {item.name}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </CounselorSelectBox>
            <CalendarNavigationBox>
              <div onClick={() => handleCalendar("prev2")}>
                <img src={Prev2Icon} alt="icon"></img>
              </div>
              <div onClick={() => handleCalendar("prev")}>
                <img src={PrevIcon} alt="icon"></img>
              </div>
              <div className="title">{`${moment(value).format(
                "YYYY"
              )}년 ${moment(value).format("MM")}월`}</div>
              <div onClick={() => handleCalendar("next")}>
                <img src={NextIcon} alt="icon"></img>
              </div>
              <div onClick={() => handleCalendar("next2")}>
                <img src={Next2Icon} alt="icon"></img>
              </div>
            </CalendarNavigationBox>
            <DateGuideText>
              <div>
                <div className="blueCircle"></div>
                개인 예약가능
              </div>
              <div>
                <div className="greanCircle"></div>
                그룹 예약가능
              </div>
            </DateGuideText>
            <Calendar
              onChange={onChange}
              value={value}
              calendarType="gregory"
              formatDay={(locale, date) =>
                date.toLocaleString("en", { day: "numeric" })
              }
              locale="ko-KR"
              minDetail="month"
              maxDetail="month"
              navigationLabel={null}
              onActiveStartDateChange={({ activeStartDate }) =>
                console.log("activeStartDate", activeStartDate)
              }
              tileContent={({ date, view }) => {
                let html = [];

                const strDate = moment(date).format("YYYY-MM-DD");

                if (data.periodList) {
                  if (data.periodList[strDate] !== undefined) {
                    const reserveTimeByDate = data.periodList[strDate];
                    const reserveTimeCount = reserveTimeByDate?.length;
                    console.log("reserveTimeCount : ", reserveTimeCount);
                    if (reserveTimeCount <= 3)
                      for (let i = 0; i < reserveTimeCount; i++) {
                        html.push(
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleReservationModal();
                              setCalendarDetail(reserveTimeByDate[i]);
                            }}
                            className={"dot " + date.getDay()}
                          >
                            {reserveTimeByDate[i].roomType == "SINGLE" && (
                              <>
                                <div className="blueCircle"></div>
                                {reserveTimeByDate[i].time}
                              </>
                            )}
                            {reserveTimeByDate[i].roomType == "DOUBLE" && (
                              <>
                                <div className="greanCircle"></div>
                                {`${reserveTimeByDate[i].hour}:00`}
                                {`(그룹 ${reserveTimeByDate[i].countCurrent}/${reserveTimeByDate[i].countMax})`}
                              </>
                            )}
                          </div>
                        );
                      }
                    else {
                      for (let i = 0; i < 3; i++) {
                        html.push(
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleReservationModal();
                              setCalendarDetail(reserveTimeByDate[i]);
                            }}
                            className={"dot " + date.getDay()}
                          >
                            {reserveTimeByDate[i].roomType == "SINGLE" && (
                              <>
                                <div className="blueCircle"></div>
                                {reserveTimeByDate[i].time}
                              </>
                            )}
                            {reserveTimeByDate[i].roomType == "DOUBLE" && (
                              <>
                                <div className="greanCircle"></div>
                                {`${reserveTimeByDate[i].hour}:00`}
                                {`(그룹 ${reserveTimeByDate[i].countCurrent}/${reserveTimeByDate[i].countMax})`}
                              </>
                            )}
                          </div>
                        );
                      }
                      html.push(
                        <div
                          className="dot add"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalOpen(true);
                            setClickDate(strDate);
                          }}
                        >
                          + {reserveTimeCount - 3} 개 더보기
                        </div>
                      );
                    }
                    html.push(
                      <CalendarModal
                        open={modalOpen && strDate == clickDate}
                        strdate={strDate}
                        setModalOpen={setModalOpen}
                        day={date.getDay()}
                        date={date.getDate()}
                        toggleReservationModal={toggleReservationModal}
                        setCalendarDetail={setCalendarDetail}
                        yearMonth={yearMonth}
                        counselorId={counselorId}
                      >
                        {strDate}
                      </CalendarModal>
                    );
                  }
                }

                return (
                  <div
                    className="absoluteDiv"
                    key={date}
                    onClick={() => {
                      console.log(value);
                    }}
                  >
                    {html}
                  </div>
                );
              }}
            ></Calendar>
          </>
        )}
      </CalendarWrapper>
      <ReservationModal
        open={showReservationModal}
        close={toggleReservationModal}
        detail={calendarDetail}
      ></ReservationModal>
    </>
  );
};

export default ReservationCalendar;

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
`;

const CounselorSelectBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  & > .counselor {
    border-radius: 6px;
    border: 1px solid #d9d9d9;
    padding: 7px 0px 5px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  & > .selectBoxModal {
    position: absolute;
    border-radius: 12px;
    border: 1px solid #d9d9d9;
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    width: 100%;
    z-index: 200;
    & > ul > li {
      padding: 15px 0;
      text-align: center;
      cursor: pointer;
    }
  }
`;

const DateGuideText = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  display: flex;
  & > div {
    display: flex;
    align-items: center;
    margin-left: 10px;
    color: #666;
    font-size: 14px;
    font-weight: 400;
  }
  & > div > .blueCircle {
    width: 8px;
    height: 8px;
    background-color: #2878d5;
    border-radius: 50%;
    margin-right: 4px;
  }
  & > div > .greanCircle {
    width: 8px;
    height: 8px;
    background-color: #14b77c;
    border-radius: 50%;
    margin-right: 4px;
  }
`;

const CalendarNavigationBox = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  & > .title {
    padding: 0 32px;
  }
  & > div > img {
    cursor: pointer;
  }
`;
