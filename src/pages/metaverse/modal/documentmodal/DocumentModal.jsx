import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import XButton from "assets/images/x_button.png";
import { counselingApis } from "pages/metaverse/apis/counselingApis";

const DocumentModal = ({ open, close, guestList }) => {
  const outside = useRef();
  const [imageUrl1, setImageUrl1] = useState();
  const [imageUrl2, setImageUrl2] = useState();

  useEffect(() => {
    if (guestList) {
      getDownload1();
      getDownload2();
    }
  }, [open]);

  const getDownload1 = async () => {
    try {
      const res = await counselingApis.downloadFile({
        appointmentId: guestList.appointmentId,
        encFileName: guestList.urlFile1EncFileName,
      });
      if (res.status == 200) {
        let disposition = res.headers["content-disposition"];
        let filename;
        if (disposition && disposition.indexOf("attachment") !== -1) {
          let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          let matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1])
            filename = matches[1].replace(/['"]/g, "");
        }
        console.log(res);
        let blob = new Blob([res.data]);

        let downloadImg = window.URL.createObjectURL(blob);

        setImageUrl1(downloadImg);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };
  const getDownload2 = async () => {
    try {
      const res = await counselingApis.downloadFile({
        appointmentId: guestList.appointmentId,
        encFileName: guestList.urlFile2EncFileName,
      });
      if (res.status == 200) {
        let disposition = res.headers["content-disposition"];
        let filename;
        if (disposition && disposition.indexOf("attachment") !== -1) {
          let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          let matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1])
            filename = matches[1].replace(/['"]/g, "");
        }
        console.log(res);
        let blob = new Blob([res.data]);

        let downloadImg = window.URL.createObjectURL(blob);

        setImageUrl2(downloadImg);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  const [slideWidth, setSlideWidth] = useState("0%");

  const moveRight = () => {
    setSlideWidth("-100%");
  };
  const moveLeft = () => {
    setSlideWidth("0%");
  };

  return (
    <>
      <Modal
        open={open}
        ref={outside}
        onClick={(e) => {
          if (e.target == outside.current) {
            close();
          }
        }}
      >
        <button className="close" onClick={close}>
          <img alt="btn" src={XButton}></img>
        </button>
        <ModalHeader>
          <div>
            <button onClick={moveLeft}>&lt;</button>
            상담 서류
            <button onClick={moveRight}>&gt;</button>
          </div>
        </ModalHeader>
        <ModalBody>
          <SlideBox
            slideWidth={slideWidth}
            style={{ display: "flex", width: "200%" }}
          >
            <div className="slide">
              {guestList?.urlFile1EncFileName ? (
                <img src={imageUrl1} alt="url"></img>
              ) : (
                <div style={{ paddingTop: "250px" }}>상담서류가 없습니다</div>
              )}
            </div>
            <div className="slide">
              {guestList?.urlFile2EncFileName ? (
                <img src={imageUrl2} alt="url"></img>
              ) : (
                <div style={{ paddingTop: "250px" }}>상담서류가 없습니다</div>
              )}
            </div>
          </SlideBox>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DocumentModal;

const modalBgShow = keyframes`
 from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Modal = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  box-sizing: border-box;
  width: 80%;
  max-width: 520px;
  height: 749px;
  background-color: rgba(245, 250, 255, 0.9);
  border-radius: 10px;
  padding: 25px;
  position: absolute;
  bottom: 2.6%;
  right: 2.6%;
  animation: ${modalBgShow} 0.3s;
  & > .close {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 30px;
    cursor: pointer;
  }
`;

const ModalHeader = styled.div`
  width: 100%;
  margin-bottom: 30px;
  & > div {
    margin: auto;
    width: 200px;
    display: flex;
    justify-content: space-between;
    color: #434241;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
  }
  & > div > button {
    cursor: pointer;
  }
`;

const ModalBody = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const SlideBox = styled.div`
  position: absolute;
  transition: all.5s;
  left: ${(props) => props.slideWidth};
  & > .slide {
    width: 100%;
    text-align: center;
    color: #666;
    & > img {
      width: 100%;
    }
  }
`;
