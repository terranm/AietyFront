import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Logo from "assets/images/aiety_logo.png";

const Footer = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 839px)" });
  return (
    <FooterWrapper>
      <FooterContent>
        <div className="logoBox">
          <img alt="logo" src={Logo}></img>
        </div>
        <div>
          <ul className="footerMenu">
            <li onClick={() => navigate("/terms/service")}>서비스 이용약관</li>
            <li onClick={() => navigate("/terms/info")}>개인정보처리방침</li>
          </ul>
          <div className="pBox">
            <p>
              상호: 에이어티｜대표: 김주영｜주소 : 서울특별시 용산구 원효로90길
              11 더프라임타워 11층｜사업자 등록번호: 000-00-00000
            </p>
            <p>고객센터 내용 메일 : help@aiety.co.kr｜개인정보책임자: 이윤서</p>

            <p>Copyrights ⓒ2023 aiety Inc. All rights reserved. Contact Us</p>
          </div>
        </div>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  width: 100%;
  background: #f8f8f8;
  display: flex;
  justify-content: center;
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 27px 0;
  margin: auto 20px;
  display: flex;
  flex-wrap: wrap;

  & > .logoBox {
    display: flex;
    align-items: center;
    margin-right: 50px;
    @media screen and (max-width: 500px) {
      margin-bottom: 20px;
    }
  }

  & .footerMenu {
    display: flex;
    margin-bottom: 6px;
    & > li {
      color: #0f182a;
      font-size: 14px;
      font-weight: 700;
      margin-right: 14px;
      cursor: pointer;
    }
  }

  & .pBox {
    color: #0f182a;
    font-size: 14px;
    line-height: 24px; /* 171.429% */
  }
`;
