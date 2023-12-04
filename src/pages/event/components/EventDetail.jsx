import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "components/loading/Loading";
import { eventApis } from "../apis/eventApis";

const EventDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEventDetail();
  }, []);

  //이벤트 디테일 가져오기
  const getEventDetail = async () => {
    try {
      const res = await eventApis.detail({
        boardId: params.id,
      });

      if (res.resultCode === "0000") {
        setData(res.data.detail);
        setIsLoading(false);
      } else {
        alert(res.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <Wrapper>
      <div className="titleBox">
        <h3>{data && data.title}</h3>
        <div>
          {`${new Date(data.startTime).toLocaleDateString()} ~ ${new Date(
            data.endTime
          ).toLocaleDateString()}`}
        </div>
      </div>
      <p>{data.contents}</p>
      <img src={data.urlFile2 && data.urlFile2} alt="img"></img>
      <Button onClick={() => navigate(-1)}>목록</Button>
    </Wrapper>
  );
};

export default EventDetail;

const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 70px auto 100px auto;
  & > .titleBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > h3 {
      color: #0f182a;
      font-size: 20px;
      font-weight: 700;
    }
    padding-bottom: 5px;
    border-bottom: 1px solid var(--black-color);
  }
  & > p {
    margin: 30px 0;
  }
  & > img {
    width: 100%;
  }
`;

const Button = styled.button`
  display: block;
  margin: 30px auto;
  width: 180px;
  height: 44px;
  border-radius: 8px;
  border: 1px solid #667085;
  border-radius: 12px;
  color: #667085;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;
