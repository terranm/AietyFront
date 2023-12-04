import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import ReservationCalendar from "./components/ReservationCalendar";

const Reservation = () => {
  return (
    <ReservationWrapper>
      <h1>상담 예약</h1>
      <ReservationCalendar></ReservationCalendar>
      <GuideText>
        <p>※ 당일 상담 예약은 불가합니다.</p>
        <p>※ 토/일요일 및 공휴일은 상담이 불가합니다.</p>
        <p>
          ※ 상담은 50분 단위로 진행되며 추가로 상담을 원하실 경우 추가 예약을
          해주시기 바랍니다.
        </p>
      </GuideText>
      <div style={{ height: "100px" }}></div>
    </ReservationWrapper>
  );
};

export default Reservation;

const ReservationWrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: auto auto 100px auto;
  & > h1 {
    text-align: center;
    font-size: 24px;
    margin-top: 70px;
    margin-bottom: 49px;
  }
`;

const GuideText = styled.div`
  & > p {
    color: #0f182a;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
  }
`;
