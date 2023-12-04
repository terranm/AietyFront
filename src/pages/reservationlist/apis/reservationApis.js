import api from "utils/api";

export const reservationApis = {
  //나의 상담 예약 리스트
  myList: async (data) => {
    const response = await api.post("/v1/appointment/api/my-list", data);
    return response.data;
  },
  //예약취소
  cancel: async (data) => {
    const response = await api.post("/v1/appointment/api/cancel", data);
    return response.data;
  },
};
