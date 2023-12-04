import React from "react";
import styled from "styled-components";
import { reservationApis } from "../apis/reservationApis";

const CancelReserve = ({ item, getMyReservation }) => {
  const cancelReservation = async () => {
    try {
      const res = await reservationApis.cancel({
        appointmentHistoryId: item.appointmentHistoryId,
        appointmentId: item.appointmentId,
      });

      if (res.resultCode === "0000") {
        alert(res.resultMessage);
        getMyReservation();
      } else {
        alert(res.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  return (
    <WhiteButton disabled={item.cancelable == "N"} onClick={cancelReservation}>
      취소
    </WhiteButton>
  );
};

export default CancelReserve;

const WhiteButton = styled.button`
  border: ${(props) =>
    props.disabled ? "1px solid #d9d9d9" : "1px solid #3546d1"};
  color: ${(props) => (props.disabled ? " #d9d9d9" : " #3546d1")};
  background: #fff;
  width: ${(props) => (props.width ? props.width : "60px")};
  height: 30px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
`;
