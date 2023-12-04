import api from "utils/api";

export const counselingApis = {
  //상담실별 리스트
  myList: async (data) => {
    const response = await api.post("/v1/appointment/api/my-list", data);
    return response.data;
  },

  //상담실별 리스트
  roomList: async (data) => {
    const response = await api.post("/v1/appointment/api/room-list", data);
    return response.data;
  },

  //상담실 상세
  roomDetail: async (data) => {
    const response = await api.post("/v1/appointment/api/room-detail", data);
    return response.data;
  },
  //파일 다운로드
  downloadFile: async (data) => {
    const response = await api.post("/v1/download/api/file", data, {
      responseType: "blob",
    });
    return response;
  },
};
