import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import CancelReserv from "./components/CancelReserve";
import { useNavigate } from "react-router-dom";
import { reservationApis } from "./apis/reservationApis";

const ReservationList = () => {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [page, setPage] = useState(1);
  const pagePerRow = 10;
  useEffect(() => {
    getMyReservation();
  }, [page]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  //내 상담예약 리스트 가져오기
  const getMyReservation = async () => {
    try {
      //axios 요청
      const res = await reservationApis.myList({
        page: page,
        pagePerRow: pagePerRow,
      });

      if (res.resultCode === "0000") {
        setListData(res.data.list);
        setTotalDataCount(res.data.totalRow);
      } else {
        alert(res.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  return (
    <ReservationWrapper>
      <h1>상담 예약 현황</h1>
      <ButtonBox>
        <BasicButton onClick={() => navigate("/reservation")}>
          취업상담예약
        </BasicButton>
      </ButtonBox>
      <ReservationTable>
        <thead>
          <tr>
            <th width="12.5%">번호</th>
            <th width="21.8%">상담 분류</th>
            <th width="21.8%">상담 시간</th>
            <th width="21.8%">등록 일시</th>
            <th width="21.8%">상담 취소</th>
          </tr>
        </thead>
        <tbody>
          {listData.length > 0 ? (
            <>
              {listData.map((item, i) => (
                <tr key={i}>
                  <td>{totalDataCount - i - pagePerRow * (page - 1)}</td>
                  <td>
                    {item.roomType == "DOUBLE" && (
                      <div style={{ color: "#2878D5" }}>그룹 상담</div>
                    )}
                    {item.roomType == "SINGLE" && (
                      <div style={{ color: "#14B77C" }}>개인 상담</div>
                    )}
                  </td>
                  <td>{`${item.ymd} ${item.startTime}~${item.endTime}`}</td>
                  <td>{item.createdTime}</td>
                  <td>
                    <CancelReserv
                      item={item}
                      getMyReservation={getMyReservation}
                    ></CancelReserv>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <NoReservation>
              <td colSpan={5}>예약된 상담 일정이 없습니다.</td>
            </NoReservation>
          )}
        </tbody>
      </ReservationTable>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={totalDataCount}
        pageRangeDisplayed={10}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    </ReservationWrapper>
  );
};

export default ReservationList;

const ReservationWrapper = styled.div`
  width: 800px;
  margin: auto auto 100px auto;
  & > h1 {
    text-align: center;
    font-size: 24px;
    margin-top: 70px;
    margin-bottom: 9px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const BasicButton = styled.button`
  background: ${(props) => (props.disabled ? "#fff" : "#3546d1")};
  width: ${(props) => (props.width ? props.width : "128px")};
  border: 1px solid #d9d9d9;
  color: white;
  height: 44px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const ReservationTable = styled.table`
  width: 100%;
  max-width: 800px;
  border-top: 2px solid #667085;
  border-bottom: 2px solid #667085;
  border-collapse: collapse;
  margin-bottom: 30px;

  & > thead > tr > th {
    height: 50px;
    background: #f3f6fb;
    border-bottom: 1px solid #d9d9d9;
  }

  & > tbody > tr > td:first-child {
    border-right: 1px solid #d9d9d9;
  }
  & > tbody > tr > td {
    text-align: center;
    border-bottom: 1px solid #d9d9d9;
    height: 50px;
    font-size: 14px;
  }
`;

const NoReservation = styled.tr`
  text-align: center;
  & > td {
    padding: 100px 0;
    color: #d9d9d9;
    border-right: 0 !important;
  }
`;
