import React, { useRef, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDraggable } from "react-use-draggable-scroll";
import "./terms.css";
import Service from "./components/Service";
import PersonalInfo from "./components/PersonalInfo";
import styled from "styled-components";

const Terms = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const scrollRef = useRef(null);
  const { events } = useDraggable(scrollRef);
  const [isPrevPage, setIsPrevPage] = useState(false);

  return (
    <TermsWrapper>
      <div className="wrap">
        <div className="terms">
          <div className="terms-title">
            <p className="title-text">약관 및 정책</p>
          </div>
          <div className="terms-category" {...events} ref={scrollRef}>
            <NavLink
              to="/terms/service"
              className={
                type === undefined || type === "service"
                  ? "btn-terms active"
                  : "btn-terms"
              }
            >
              서비스 이용약관
            </NavLink>
            <NavLink
              to="/terms/info"
              className={type === "info" ? "btn-terms active" : "btn-terms"}
            >
              개인정보처리 방침
            </NavLink>
          </div>
          {type === undefined || type === "service" ? <Service /> : false}
          {type === "info" ? <PersonalInfo /> : false}

          {!isPrevPage && type == "location" && (
            <div
              onClick={() => {
                setIsPrevPage((prev) => !prev);
              }}
            >
              이전 이용약관 이력 보기
            </div>
          )}
        </div>
      </div>
      <div style={{ height: "70px" }}></div>
    </TermsWrapper>
  );
};

export default Terms;

const TermsWrapper = styled.div`
  padding: 70px 10px;
  margin: auto;
  width: 100%;
  max-width: 1100px;
`;
