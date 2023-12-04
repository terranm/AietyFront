import React, { createContext, useContext, useEffect, useState } from "react";
import api from "utils/api";
const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const token = window.sessionStorage.getItem("Authorization");
  const [isLogin, setIsLogin] = useState(false);
  const userInfoInit = { name: "" };
  const [userInfo, setUserInfo] = useState(userInfoInit);
  const [myCounselingInfo, setMyCounselingInfo] = useState({
    appointmentId: "",
    agoraChannel: "",
  });
  const [isChatLogin, setIsChatLogin] = useState(false);
  const [zoomInfo, setZoomInfo] = useState({
    meetingNumber: "",
    meetingPassword: "",
    name: userInfo.name,
  });

  useEffect(() => {
    if (token) {
      checkToken();
    }
  }, []);

  //토큰 유효성 검사
  const checkToken = async () => {
    try {
      const res = await api.post(
        `/v1/mypage/api/check-token`,
        {},
        {
          headers: token,
        }
      );

      if (res.data.data.procStatus == true) {
        console.log(res.data.data.name, "로그인 되어 있음");
        setIsLogin(true);
        setUserInfo({
          ...userInfo,
          name: res.data.data.name,
        });
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        userInfo,
        setUserInfo,
        myCounselingInfo,
        setMyCounselingInfo,
        isChatLogin,
        setIsChatLogin,
        zoomInfo,
        setZoomInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
