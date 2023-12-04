import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "components/layout/components/Footer";
import Header from "components/layout/components/Header";
import FindPw from "./components/FindPw";
import FindId from "./components/FindId";
import CompleteImg from "assets/images/complete_img.png";

const FindAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isComplete, setIsComplete] = useState(false);
  const [findType, setFindType] = useState("");
  const [foundEmail, setFoundEmail] = useState("");

  const maskEmail = () => {
    if (foundEmail.length > 5) {
      let visibleCharacters = 5;
      let hiddenCharacters = foundEmail.length - visibleCharacters;

      let maskedEmail =
        foundEmail.substring(0, visibleCharacters) +
        "x".repeat(hiddenCharacters);
      setFoundEmail(maskedEmail);
    }
  };

  useEffect(() => {
    maskEmail();
  }, [foundEmail]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("type");
    setFindType(type);
  }, [location]);

  if (isComplete) {
    return (
      <>
        <div style={{ height: "100px" }}></div>
        <CompleteWrapper>
          <div className="completeBox">
            <img src={CompleteImg} alt="찾기 완료"></img>
            <h4>아이디 찾기 완료</h4>
            <div className="idBox">
              <p>{foundEmail} 입니다.</p>
            </div>
            <p>
              정보 보호를 위해 아이디의 일부만 보여집니다.<br></br> 전체 아이디
              확인이 필요한 경우 help@aiety.co.kr 로 문의 주시기 바랍니다.
            </p>
            <div className="buttonBox">
              <WhiteButton
                onClick={() => {
                  navigate("/find-account?type=pw");
                  setIsComplete(false);
                }}
              >
                비밀번호 찾기
              </WhiteButton>
              <span style={{ width: "6px" }}></span>
              <BasicButton
                onClick={() => {
                  navigate("/");
                }}
              >
                로그인
              </BasicButton>
            </div>
          </div>
        </CompleteWrapper>
        <div style={{ height: "250px" }}></div>
      </>
    );
  }

  return (
    <>
      <FindAccountWrapper>
        <TitleText>
          {findType == "id" && <h4>아이디를 잊으셨나요?</h4>}
          {findType == "pw" && (
            <>
              <h4>비밀번호를 잊으셨나요?</h4>
              <p>비밀번호를 재설정 합니다.</p>
            </>
          )}
        </TitleText>
        <TabNav>
          <TabMenu
            className="menu"
            active={findType == "id"}
            onClick={() => navigate("/find-account?type=id")}
          >
            아이디 찾기
          </TabMenu>
          <TabMenu
            className="menu"
            active={findType == "pw"}
            onClick={() => navigate("/find-account?type=pw")}
          >
            비밀번호 찾기
          </TabMenu>
        </TabNav>
        <TabContent>
          {findType == "id" && (
            <FindId
              setIsComplete={setIsComplete}
              setFoundEmail={setFoundEmail}
            ></FindId>
          )}
          {findType == "pw" && <FindPw></FindPw>}
        </TabContent>
      </FindAccountWrapper>
    </>
  );
};

export default FindAccount;

const FindAccountWrapper = styled.div`
  padding-top: 70px;
  width: 430px;
  margin: auto;
`;

const TitleText = styled.div`
  height: 81px;
  & > h4 {
    color: #0f182a;
    font-size: 24px;
    font-weight: 700;
  }
  & > p {
    color: #0f182a;
    font-size: 12px;
    font-weight: 400;
  }
`;

const TabNav = styled.div`
  display: flex;
`;
const TabMenu = styled.div`
  color: ${(props) =>
    props.active ? "var(--black-color)" : "var(--sub-color)"};
  border-bottom: ${(props) =>
    props.active
      ? "1px solid var(--black-color)"
      : "1px solid var(--sub-color)"};

  width: 50%;
  text-align: center;
  font-weight: 700;
  padding-bottom: 10px;
  cursor: pointer;
`;

const TabContent = styled.div``;

const CompleteWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > .completeBox > img {
    display: block;
    width: 80px;
    margin: auto auto 14px auto;
  }

  & > .completeBox > h4 {
    color: #3546d1;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 30px;
  }
  & > .completeBox > .idBox {
    border-radius: 12px;
    padding: 17px 18px;
    background: #f3f6fb;
    margin-bottom: 30px;
  }
  & > .completeBox > .idBox > p {
    color: #000;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
  }

  & > .completeBox > p {
    color: #667085;
    text-align: center;
    font-weight: 400;
    margin-bottom: 30px;
  }

  & > .completeBox > .buttonBox {
    display: flex;
    justify-content: center;
  }
`;

const BasicButton = styled.button`
  background: ${(props) => (props.disabled ? "#fff" : "#3546d1")};
  width: ${(props) => (props.width ? props.width : "209px")};
  border: 1px solid #d9d9d9;
  color: white;
  height: 54px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;

const WhiteButton = styled.button`
  border: ${(props) =>
    props.disabled ? "1px solid #d9d9d9" : "1px solid #3546d1"};
  color: ${(props) => (props.disabled ? " #d9d9d9" : " #3546d1")};
  background: #fff;
  width: ${(props) => (props.width ? props.width : "209px")};
  height: 54px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;
