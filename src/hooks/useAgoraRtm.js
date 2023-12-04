/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import { useAuthContext } from "context/AuthContext";

const useAgoraRtm = (userName, client, channelId) => {
  const { setIsChatLogin, isChatLogin } = useAuthContext();
  const USER_ID = Math.floor(Math.random() * 1000000001);
  const [messages, setMessages] = useState([]);
  const channel = useRef(client.createChannel(channelId)).current;

  const initRtm = async () => {
    console.log("RTM init", USER_ID.toString());
    await client.login({
      uid: USER_ID.toString(),
    });
    await channel.join();
    await client.setLocalUserAttributes({
      name: userName,
    });
    setIsChatLogin(true);
  };
  useEffect(() => {
    initRtm();

    return async () => {
      await client.logout();
    };
  }, []);

  useEffect(() => {
    channel.on("ChannelMessage", (data, uid) => {
      console.log("useEffect 실행");
      handleMessageReceived(data, uid);
    });
  }, []);

  const handleMessageReceived = async (data, uid) => {
    const user = await client.getUserAttributes(uid);
    console.log(data);
    if (data.messageType === "TEXT") {
      const newMessageData = {
        user,
        message: data.text,
        time: moment(new Date()).format("A hh : mm"),
      };
      setCurrentMessage(newMessageData);
    }
  };

  const [currentMessage, setCurrentMessage] = useState();
  const sendChannelMessage = async (text) => {
    channel
      .sendMessage({ text })
      .then(() => {
        setCurrentMessage({
          user: { name: userName },
          message: text,
          time: moment(new Date()).format("A hh : mm"),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentMessage) setMessages([...messages, currentMessage]);
  }, [currentMessage]);

  return { sendChannelMessage, messages };
};
export default useAgoraRtm;
