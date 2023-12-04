import api from "utils/api";

export const myinfoApis = {
  //내 정보 상세
  detail: async (data) => {
    const response = await api.post("/v1/mypage/api/detail", data);
    return response.data;
  },

  //내 정보 수정
  modify: async (data) => {
    const response = await api.post("/v1/mypage/api/save", data);
    return response.data;
  },

  //회원 탈퇴
  withdraw: async (data) => {
    const response = await api.post("/v1/mypage/api/del", data);
    return response.data;
  },
};
