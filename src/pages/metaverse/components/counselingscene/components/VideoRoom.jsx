import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import Video from "./Video";
import styled from "styled-components";
import { useAuthContext } from "context/AuthContext";
import CameraBtn from "assets/images/metaverse/camera_btn.png";
import SoundBtn from "assets/images/metaverse/sound_btn.png";
import CameraOnBtn from "assets/images/metaverse/camera_white_btn.png";
import SoundOnBtn from "assets/images/metaverse/sound_white_btn.png";

const VideoRoom = ({ channelId, isInRoom }) => {
  const { userInfo } = useAuthContext();

  const customUid = btoa(unescape(encodeURIComponent(userInfo.name)));
  const APP_ID = process.env.REACT_APP_AGORA_APP_ID;
  const TOKEN = null;
  const CHANNEL = channelId;

  const client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
  });

  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    console.log("새로온 유저", user);
    if (mediaType === "video") {
      setUsers((users) => {
        // 이미 존재하는 user.uid를 가진 사용자를 찾습니다.
        const existingUserIndex = users.findIndex(
          (existingUser) => existingUser.uid === user.uid
        );

        if (existingUserIndex !== -1) {
          console.log("existingUserIndex", existingUserIndex);
          const updatedUsers = [...users];
          updatedUsers[existingUserIndex] = user;
          return updatedUsers;
        } else {
          console.log("new user:", user);
          return [...users, user];
        }
      });
    }

    if (mediaType === "audio") {
      user?.audioTrack.play();
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    client
      .join(APP_ID, CHANNEL, TOKEN, customUid)
      .then((uid) =>
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;

        console.log("tracks : ", tracks);

        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          { uid, audioTrack, videoTrack },
        ]);
        client.publish(tracks);
      });

    return async () => {
      await leaveRoom();
    };
  }, []);

  const leaveRoom = async () => {
    console.log("룸나가기3", localTracks);

    await client.leave();
    client.removeAllListeners();
  };

  const mute = async (type) => {
    if (type === "audio") {
      await localTracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      if (trackState.video == true) {
        console.log("로그아웃");
        await client.leave();
        client.removeAllListeners();
      }
      await localTracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <VideaRoomArea>
        {users.map((user) => (
          <Video key={user.uid} user={user} users={users}></Video>
        ))}
      </VideaRoomArea>
      <div style={{ width: "5px" }}></div>
      <ControlBox>
        <ControlBtn
          active={trackState.audio}
          onClick={() => mute("audio")}
          style={{ borderRadius: "10px 10px 0 0" }}
        >
          {trackState.audio ? (
            <>
              <img src={SoundBtn} alt="icon"></img>
              <p>음소거</p>
            </>
          ) : (
            <>
              <img src={SoundOnBtn} alt="icon"></img>
              <p style={{ color: "#fff" }}>사운드</p>
            </>
          )}
        </ControlBtn>
        <ControlBtn
          active={trackState.video}
          onClick={() => mute("video")}
          style={{ borderRadius: "0 0 10px 10px" }}
        >
          {trackState.video ? (
            <>
              <img src={CameraBtn} alt="icon"></img>
              <p>카메라 OFF</p>
            </>
          ) : (
            <>
              <img src={CameraOnBtn} alt="icon"></img>
              <p style={{ color: "#fff" }}>카메라 ON</p>
            </>
          )}
        </ControlBtn>
      </ControlBox>
    </div>
  );
};

export default VideoRoom;

const VideaRoomArea = styled.div`
  display: flex;
  background-color: rgba(245, 250, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
`;
const ControlBox = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > div > img {
    width: 32px;
    height: 32px;
    display: block;
  }

  & > div > p {
    text-align: center;
    color: #434241;
    font-size: 16px;
    font-weight: 600;
  }
`;

const ControlBtn = styled.div`
  height: 50%;
  background-color: ${(props) =>
    props.active ? "rgba(245, 250, 255, 0.9)" : "#2a3592"};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 25px 0;
  cursor: pointer;
  & > p {
    width: 100%;
  }
`;
