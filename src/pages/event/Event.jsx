import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { customAxios } from "utils/api";
import { eventApis } from "./apis/eventApis";

const Event = () => {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [page, setPage] = useState(1);
  const pagePerRow = 10;

  useEffect(() => {
    getEventList();
  }, [page]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  //이벤트 리스트 가져오기
  const getEventList = async () => {
    try {
      //axios 요청
      const res = await eventApis.list({
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
      alert(e.message);
    }
  };

  return (
    <ReservationWrapper>
      <h1>이벤트</h1>
      <ReservationTable>
        <thead>
          <tr>
            <th width="10%">번호</th>
            <th width="60%">제목</th>
            <th width="30%">이벤트 기간</th>
          </tr>
        </thead>
        <tbody>
          {listData.length > 0 ? (
            <>
              {listData.map((item, i) => (
                <tr key={i} onClick={() => navigate(`/event/${item.boardId}`)}>
                  <td>{totalDataCount - i - pagePerRow * (page - 1)}</td>
                  <td className="title">{item.title}</td>
                  <td>{`${new Date(
                    item.startTime
                  ).toLocaleDateString()} ~ ${new Date(
                    item.endTime
                  ).toLocaleDateString()}`}</td>
                </tr>
              ))}
            </>
          ) : (
            <NoReservation>
              <td colSpan={3}>이벤트 일정이 없습니다.</td>
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

export default Event;

const ReservationWrapper = styled.div`
  width: 800px;
  margin: auto auto 100px auto;
  & > h1 {
    text-align: center;
    font-size: 24px;
    margin: 70px 0;
  }
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
  & > tbody > tr > .title {
    text-align: left;
    padding-left: 30px;
    cursor: pointer;
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
