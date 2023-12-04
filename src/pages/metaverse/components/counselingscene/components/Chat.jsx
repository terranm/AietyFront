import React, { useEffect, useRef, useState } from "react";
import useAgoraRtm from "hooks/useAgoraRtm";
import AgoraRTM from "agora-rtm-sdk";
import styled from "styled-components";
import { useAuthContext } from "context/AuthContext";

const agoraRtmAppId = process.env.REACT_APP_RTM_APP_ID;

const client = AgoraRTM.createInstance(agoraRtmAppId);

const Chat = ({ channelId, chattingNotice, setChattingNotice }) => {
  const scrollRef = useRef();
  const { userInfo } = useAuthContext();
  const name = userInfo.name;
  const [chatMessage, setChatMessage] = useState("");
  const { messages, sendChannelMessage } = useAgoraRtm(name, client, channelId);

  const onChange = (e) => {
    setChatMessage(e.target.value);
  };

  const submitMessage = () => {
    sendChannelMessage(chatMessage);
    setChatMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      console.log("그냥 엔터");
      if (chatMessage !== "") {
        submitMessage();
      }
    }
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      console.log("쉬프트 엔터");
      setChatMessage((prevMessage) => prevMessage + "\n");
    }
  };

  useEffect(() => {
    if (chattingNotice !== "") {
      console.log(chattingNotice);
      sendChannelMessage(chattingNotice);
      setChattingNotice("");
    }
  }, [chattingNotice]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    console.log(scrollRef.current.scrollTop);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  return (
    <ChatWrapper>
      <ChatArea ref={scrollRef}>
        {messages.map((data, index) => {
          if (data.message.includes("[[박수]]")) {
            return (
              <p className="notice">{`${data.user.name}님이 박수치기를 선택하였습니다.`}</p>
            );
          } else if (data.message.includes("[[공감]]")) {
            return (
              <p className="notice">{`${data.user.name}님이 공감하기를 선택하였습니다.`}</p>
            );
          } else if (data.message.includes("[[질문]]")) {
            return (
              <p className="notice">{`${data.user.name}님이 질문하기를 선택하였습니다.`}</p>
            );
          } else if (data.message.includes("[[상담종료]]")) {
            return <p className="end">상담이 종료되었습니다.</p>;
          } else {
            return (
              <div key={`chat${index + 1}`}>
                <h5>{`${data.user.name}`}</h5>
                <div className="message">
                  <p>{` ${data.message}`}</p>
                  <span>{` ${data.time}`}</span>
                </div>
              </div>
            );
          }
        })}
      </ChatArea>
      <TextArea>
        <textarea
          value={chatMessage}
          placeholder="메시지를 입력해주세요."
          onChange={onChange}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button onClick={submitMessage}>입력</button>
      </TextArea>
    </ChatWrapper>
  );
};

export default Chat;

const ChatWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 684px;
  padding: 20px;
  position: relative;
`;

const ChatArea = styled.div`
  width: 100%;
  height: 550px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  & > div {
    margin-bottom: 20px;
    width: 100%;
  }
  & > div > h5 {
    color: #0f182a;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  & > div > .message {
    display: flex;
    align-items: flex-end;
  }

  & > div > .message > p {
    max-width: 80%;
    display: inline-block;
    background-color: #fff;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
    border-radius: 0px 10px 10px 10px;
    padding: 12px 20px;
    color: #0f182a;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  & > div > .message > span {
    color: #0f182a;
    font-size: 12px;
    margin-left: 5px;
  }

  & > .notice {
    color: #2a3592;
    margin-bottom: 20px;
  }
  & > .end {
    color: #ea1818;
    margin-bottom: 20px;
  }
`;

const TextArea = styled.div`
  background: #fff;
  position: absolute;
  bottom: 30px;
  border: 2px solid #2a3592;
  width: calc(100% - 40px);
  height: 64px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  & > textarea {
    width: 100%;
    border: none;
    outline: none;
  }
  & > button {
    width: 88.393px;
    height: 40px;
    border-radius: 10px;
    background: #2a3592;
    color: #fff;
    cursor: pointer;
  }
`;
