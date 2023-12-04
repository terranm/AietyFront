import { useAuthContext } from "context/AuthContext";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Video = ({ user, users }) => {
  // const { userInfo } = useAuthContext();

  const customUid = decodeURIComponent(escape(atob(user.uid)));
  const ref = useRef();
  useEffect(() => {
    console.log("videoTrack", user.videoTrack);
    user.videoTrack.play(ref.current);
  }, [users]);

  return (
    <Box>
      <p>{customUid}</p>
      <div ref={ref} className="video"></div>
    </Box>
  );
};

export default Video;

const Box = styled.div`
  margin-right: 10px;
  & > p {
    text-align: center;
    font-weight: 700;
    margin-bottom: 10px;
  }
  & > .video {
    width: 200px;
    height: 141px;
    border-radius: 10px;
    overflow: hidden;
  }
`;
