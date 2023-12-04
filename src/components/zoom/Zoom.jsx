import React, { useEffect } from "react";

const Zoom = ({ zoomInfo, userInfo }) => {
  //role 1 : 호스트, 0 : 참가자
  const payload = {
    meetingNumber: zoomInfo.meetingNumber,
    role: 0,
    sdkKey: process.env.REACT_APP_ZOOM_SDK_KEY,
    sdkSecret: process.env.REACT_APP_ZOOM_SDK_SECRET,
    userEmail: "",
    password: zoomInfo.meetingPassword,
    userName: userInfo.name,
    leaveUrl: process.env.REACT_APP_ZOOM_LEAVE_URL,
  };

  console.log("payload", payload);

  useEffect(async () => {
    const { ZoomMtg } = await import("@zoomus/websdk");

    ZoomMtg.setZoomJSLib("https://source.zoom.us/2.17.0/lib", "/av");

    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();
    ZoomMtg.i18n.load("ko-KO");
    ZoomMtg.i18n.reload("ko-KO");

    ZoomMtg.generateSDKSignature({
      meetingNumber: payload.meetingNumber,
      role: payload.role,
      sdkKey: payload.sdkKey,
      sdkSecret: payload.sdkSecret,
      success: function (signature) {
        ZoomMtg.init({
          leaveUrl: payload.leaveUrl,
          success: function (data) {
            ZoomMtg.join({
              meetingNumber: payload.meetingNumber,
              signature: signature.result,
              sdkKey: payload.sdkKey,
              userName: payload.userName,
              userEmail: payload.userEmail,
              passWord: payload.password,
              tk: "",
              success: function () {
                console.log("---joined---");
              },
              error: function (error) {
                console.log(error);
              },
            });
          },
          error: function (error) {
            console.log(error);
          },
        });
      },
      error: function (error) {
        console.log(error);
      },
    });
  }, []);
  return (
    <>
      <link
        type="text/css"
        rel="stylesheet"
        href="https://source.zoom.us/2.9.0/css/bootstrap.css"
      ></link>
      <link
        type="text/css"
        rel="stylesheet"
        href="https://source.zoom.us/2.9.0/css/react-select.css"
      ></link>
      <div style={{ height: "100px" }}></div>
    </>
  );
};

export default Zoom;
