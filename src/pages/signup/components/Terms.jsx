import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CheckBoxIcon from "assets/images/terms_checkbox.png";
import CheckedBoxIcon from "assets/images/terms_checkedbox.png";

const Terms = ({ setStep, setPromotion }) => {
  //useState 초기화
  const [isAllChecked, setAllChecked] = useState(false);
  const [checkedState, setCheckedState] = useState(new Array(4).fill(false));

  //전체 선택
  const handleAllCheck = () => {
    setAllChecked((prev) => !prev);
    let array = new Array(4).fill(!isAllChecked);
    setCheckedState(array);
  };

  //한개 선택
  const handleMonoCheck = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const checkedLength = updatedCheckedState.reduce((sum, currentState) => {
      if (currentState === true) {
        return sum + 1;
      }
      return sum;
    }, 0);
    setAllChecked(checkedLength === updatedCheckedState.length);
  };

  useEffect(() => {
    setPromotion(checkedState[3]);
  }, [checkedState]);

  const moveNewPage = (url) => {
    window.open(url, "_blank");
  };

  return (
    <TermsWrapper>
      <h1>회원가입 약관동의</h1>
      <CheckBoxBox type="all">
        <CheckBoxInput
          type="checkbox"
          checked={isAllChecked}
          onChange={() => handleAllCheck()}
        ></CheckBoxInput>
        <div>모두 동의(선택항목 포함)</div>
      </CheckBoxBox>

      <CheckBoxBox>
        <CheckBoxInput
          type="checkbox"
          checked={checkedState[0]}
          onChange={() => handleMonoCheck(0)}
        ></CheckBoxInput>
        <div>(필수) 서비스 이용약관 동의</div>
        <span onClick={() => moveNewPage("/terms/service")}>보기</span>
      </CheckBoxBox>
      <CheckBoxBox>
        <CheckBoxInput
          type="checkbox"
          checked={checkedState[1]}
          onChange={() => handleMonoCheck(1)}
        ></CheckBoxInput>
        <div>(필수) 개인정보 수집 이용 동의</div>
        <span onClick={() => moveNewPage("/terms/info")}>보기</span>
      </CheckBoxBox>
      <CheckBoxBox>
        <CheckBoxInput
          type="checkbox"
          checked={checkedState[2]}
          onChange={() => handleMonoCheck(2)}
        ></CheckBoxInput>
        <div>(필수) 만14세 이상입니다.</div>
      </CheckBoxBox>
      <CheckBoxBox>
        <CheckBoxInput
          type="checkbox"
          checked={checkedState[3]}
          onChange={() => handleMonoCheck(3)}
        ></CheckBoxInput>
        <div>(선택) 프로모션 정보 수신 동의</div>
        <div className="eventText">
          이벤트/혜택 등 다양한 정보를 이메일로 받아보실 수 있습니다.
        </div>
      </CheckBoxBox>
      <div style={{ height: "45px" }}></div>
      <TermsButton
        onClick={() => setStep("info")}
        disabled={!(checkedState[0] && checkedState[1] && checkedState[2])}
      >
        다음
      </TermsButton>
      <div style={{ height: "200px" }}></div>
    </TermsWrapper>
  );
};

export default Terms;

const TermsWrapper = styled.div`
  width: 430px;
  margin: auto;
  & > h1 {
    margin-top: 70px;
    margin-bottom: 52px;
  }
`;

const CheckBoxBox = styled.div`
  position: relative;
  background: ${(props) => props.type == "all" && "#F3F6FB"};
  font-weight: ${(props) => props.type == "all" && "700"};
  display: flex;
  align-items: center;
  height: 54px;
  border-radius: 12px;
  font-size: 18px;
  & > span {
    color: #666;
    font-size: 14px;
    text-decoration: underline;
    margin-left: 14px;
    cursor: pointer;
  }
  & > .eventText {
    position: absolute;
    top: 100%;
    left: 50px;
    color: #667085;
    font-size: 14px;
  }
`;

const CheckBoxInput = styled.input`
  appearance: none;
  width: 44px;
  height: 44px;
  background-image: url(${CheckBoxIcon});
  margin-right: 6px;
  &:checked {
    background-image: url(${CheckedBoxIcon});
    border-color: transparent;
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
  }
  cursor: pointer;
`;

const TermsButton = styled.button`
  background: ${(props) => (props.disabled ? "#d9d9d9" : "#3546d1")};

  width: 430px;
  height: 54px;
  border-radius: 12px;

  color: #fff;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;
