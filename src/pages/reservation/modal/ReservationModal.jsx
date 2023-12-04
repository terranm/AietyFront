import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import XButton from "assets/images/x_button.png";
import customAxios from "utils/api";
import { reservationApis } from "../apis/reservationApis";
import { useNavigate } from "react-router-dom";

const ReservationModal = ({ open, close, detail }) => {
  const outside = useRef();
  const [reservationDetail, setReservationDetail] = useState();
  const [counselorList, setCounselorList] = useState();
  const [appointmentId, setAppointmentId] = useState();
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileName, setResumeFileName] = useState("");
  const [portpolioFile, setPortpolioFile] = useState(null);
  const [portpolioFileName, setPortpolioFileName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (detail) getCalendarDetailInfo();
    return () => {
      console.log("이력서, 포트폴리오 리셋");
      setResumeFile(null);
      setPortpolioFile(null);
    };
  }, [detail]);

  //달력 디테일 정보 가져오기
  const getCalendarDetailInfo = async () => {
    try {
      //axios 요청
      const res = await customAxios.post(`/v1/appointment/api/detail`, {
        year: detail.year,
        month: detail.month,
        day: detail.day,
        hour: detail.hour,
        roomType: detail.roomType,
      });

      console.log("REQUEST : /v1/appointment/api/detail : ");
      console.log(res);
      if (res.data.resultCode === "0000") {
        setReservationDetail(res.data.data.detail);
        setCounselorList(res.data.data.counselorList);
      } else {
        alert(res.data.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  const selectResumeFile = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    setResumeFile(file);
    let fileName = file.name;
    console.log(fileName);
    if (fileName) setResumeFileName(fileName);
  };
  const selectPortpolioFile = (e) => {
    let file = e.target.files[0];
    setPortpolioFile(file);
    let fileName = file.name;
    console.log(fileName);
    if (fileName) setPortpolioFileName(fileName);
  };

  const reserveCounseling = async () => {
    try {
      //FormData 셋팅
      let formData = new FormData();
      formData.append("appointmentId", appointmentId);
      if (resumeFile !== null) {
        formData.append("file", resumeFile);
      }
      if (portpolioFile !== null) {
        formData.append("file", portpolioFile);
      }
      //axios 요청
      const res = await reservationApis.save(formData);

      if (res.resultCode === "0000") {
        if (res.data.procStatus == true) {
          alert(res.resultMessage);
          close();
          navigate("/reservation/list");
        }
      } else {
        alert(res.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  const handleRadioChange = (e) => {
    setAppointmentId(e.target.value);
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
        <ModalHeader>상담예약</ModalHeader>
        <ModalBody>
          <Box>
            <h4>상담일</h4>
            <p className="info">{`${reservationDetail?.year}년 ${reservationDetail?.month}월 ${reservationDetail?.day}일`}</p>
          </Box>
          <Box>
            <h4>상담시간</h4>
            <p className="info">{`${reservationDetail?.startTime} ~ ${reservationDetail?.endTime}`}</p>
          </Box>
          <Box>
            <h4>상담사</h4>
            {counselorList &&
              counselorList.map((item, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="counselor"
                    value={item.appointmentId}
                    checked={parseInt(appointmentId) === item.appointmentId}
                    onChange={handleRadioChange}
                  ></input>
                  {item.counselorName}
                </label>
              ))}
          </Box>
          <Box>
            <h4>상담 서류 등록(선택)</h4>
            <p className="info">이력서 또는 포트폴리오를 업로드 해주세요.</p>
            <label htmlFor="resume">
              <input
                type="file"
                id="resume"
                accept="image/jpg, image/png, image/jpeg"
                onChange={selectResumeFile}
                style={{ display: "none" }}
              ></input>
              <FileFlexBox>
                <BasicButton>파일 선택</BasicButton>
                <NameBox
                  active={resumeFileName == ""}
                  onClick={() => {
                    console.log(resumeFileName == "");
                  }}
                >
                  {resumeFileName !== "" ? resumeFileName : "선택된 파일 없음"}
                </NameBox>
              </FileFlexBox>
            </label>
            <label htmlFor="portpolio">
              <input
                id="portpolio"
                accept="image/jpg, image/png, image/jpeg"
                type="file"
                onChange={selectPortpolioFile}
                style={{ display: "none" }}
              ></input>
              <FileFlexBox>
                <BasicButton>파일 선택</BasicButton>
                <NameBox active={portpolioFileName == ""}>
                  {portpolioFileName !== ""
                    ? portpolioFileName
                    : "선택된 파일 없음"}
                </NameBox>
              </FileFlexBox>
            </label>
            <p className="guide">
              ※pdf, jpg, gif, png파일 형식을 첨부하실 수 있으며 10MB 이하의
              파일을 업로드할 수 있습니다.
            </p>
          </Box>
          <ReservationButton
            disabled={appointmentId == undefined}
            onClick={reserveCounseling}
          >
            상담예약
          </ReservationButton>
        </ModalBody>
      </Modal>
    </ModalOutSide>
  );
};

export default ReservationModal;

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
  position: absolute;
  width: 100%;
  max-width: 480px;
  height: 696px;
  border-radius: 6px;
  background: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  & > .close {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 30px;
    cursor: pointer;
  }
`;

const ModalHeader = styled.div`
  margin: 60px 0 30px 0;
  text-align: center;
  font-size: 20px;
  color: #000;
  font-weight: 700;
`;

const ModalBody = styled.div`
  padding: 0 50px;
`;

const Box = styled.div`
  margin-bottom: 30px;
  & > h4 {
    font-weight: 600;
    margin-bottom: 6px;
  }

  & > .info {
    color: #666;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  & > .guide {
    color: #d9d9d9;
    font-size: 14px;
    font-weight: 400;
  }
  & > label {
    color: #666;
    font-size: 16px;
    font-weight: 400;
    margin-right: 18px;
    cursor: pointer;
    & > input {
      margin-right: 3px;
    }
  }

  & > input {
    height: 54px;
    margin-bottom: 10px;
  }
`;

const ReservationButton = styled.button`
  background: ${(props) => (props.disabled ? "#d9d9d9" : "#3546d1")};
  width: 100%;
  height: 54px;
  border-radius: 12px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;

const BasicButton = styled.div`
  background: #3546d1;
  width: 100px;
  border: 1px solid #d9d9d9;
  color: white;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  line-height: 44px;
  text-align: center;
  margin-right: 6px;
`;

const FileFlexBox = styled.div`
  display: flex;
`;

const NameBox = styled.div`
  color: ${(props) => (props.active ? "#d9d9d9" : "#0F182A")};
  width: 274px;
  height: 44px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  padding: 12px 11px;
`;
