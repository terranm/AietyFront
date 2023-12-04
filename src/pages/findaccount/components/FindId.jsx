import axios from "axios";
import { mobileRegex, nameRegex } from "constants/Regex";
import React, { useState } from "react";
import styled from "styled-components";

const FindId = ({ setIsComplete, setFoundEmail }) => {
  //이름 휴대폰번호 useState
  const [name, setName] = useState("");
  const [isCheckedName, setIsCheckedName] = useState(true);
  const [mobile, setMobile] = useState("");
  const [isCheckedMobile, setIsCheckedMobile] = useState(true);

  //이름 입력
  const inputName = (e) => {
    setName(e.target.value);
  };

  //전화번호 입력
  const inputMobile = (e) => {
    setIsCheckedMobile(false);
    let mobileNumber = e.target.value;
    let newMobileNumber = mobileNumber.replace(/-/g, "");
    setMobile(newMobileNumber);

    if (mobileRegex.test(newMobileNumber) === true) {
      setIsCheckedMobile(true);
      console.log("전화번호 통과");
    }
  };

  //아이디찾기
  const findId = async () => {
    try {
      const res = await axios.post(`/v1/login/api/find-id`, {
        name: name,
        mobile: mobile,
      });

      console.log("REQUEST : /v1/login/api/find-id : ");
      console.log(res);
      if (res.data.resultCode === "0000") {
        console.log("요청 성공");
        setFoundEmail(res.data.data.email);
        setIsComplete(true);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };
  return (
    <>
      <div style={{ height: "31px" }}></div>
      <InputBox>
        <label>이름</label>
        <div className="inputDescription"></div>
        <input
          type="email"
          placeholder="ex) 홍길동"
          value={name}
          onChange={inputName}
        ></input>
      </InputBox>
      <InputBox>
        <label>휴대폰 번호</label>
        <div className="inputDescription"></div>
        <input
          type="email"
          placeholder="ex) 01000000000"
          value={mobile}
          onChange={inputMobile}
        ></input>
      </InputBox>
      <Button
        disabled={
          name.length == 0 ||
          mobile.length == 0 ||
          !isCheckedName ||
          !isCheckedMobile
        }
        onClick={findId}
      >
        확인
      </Button>
      <div style={{ height: "150px" }}></div>
    </>
  );
};

export default FindId;
const Button = styled.button`
  background: ${(props) => (props.disabled ? "#d9d9d9" : "#3546d1")};
  width: 430px;
  height: 54px;
  border-radius: 12px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;

const InputBox = styled.div`
  margin-bottom: 50px;
  position: relative;
  & > label {
    color: #0f182a;
    font-weight: 700;
  }
  & > .inputDescription {
    color: #667085;
    font-size: 6px;
    font-weight: 400;
    margin-bottom: 6px;
  }
  & > input {
    width: ${(props) => (props.width ? props.width : "100%")};
    height: 54px;
    border-radius: 12px;
    border: 1px solid #d9d9d9;
    background: #fff;
    font-weight: 400;
    padding: 10px 15px;
    &::placeholder {
      color: #d9d9d9;
    }
  }
`;
