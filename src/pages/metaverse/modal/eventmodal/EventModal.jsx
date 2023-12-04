import React, { useEffect, useRef, useState } from "react";
import XButton from "assets/images/x_white_btn.png";
import styled, { keyframes } from "styled-components";
import { eventApis } from "pages/metaverse/apis/eventApis";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "./Slide.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const EventModal = ({ open, close }) => {
  const outside = useRef();
  const [list, setList] = useState();

  useEffect(() => {
    if (open) {
      getMyList();
    }
  }, [open]);

  const getMyList = async () => {
    try {
      const res = await eventApis.liveList({});

      if (res.resultCode === "0000") {
        console.log(res.data.liveEventList);
        setList(res.data.liveEventList);
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
      <button className="close" onClick={close}>
        <img alt="btn" src={XButton}></img>
      </button>
      <Modal>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {list?.map((item, index) => (
            <SwiperSlide>
              <EventImg key={index}>
                <img src={item.urlFile1} alt="url"></img>
              </EventImg>
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal>
    </ModalOutSide>
  );
};

export default EventModal;

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
  & > .close {
    position: absolute;
    top: 50px;
    right: 80px;
    cursor: pointer;
  }
`;

const Modal = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 674px;
  /* background: white; */
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
`;

const EventImg = styled.div`
  width: 1100px;
  height: 674px;
  & > img {
    width: 100%;
    object-fit: cover;
  }
`;
