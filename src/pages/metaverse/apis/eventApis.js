import api from "utils/api";

export const eventApis = {
  //전광판 이벤트 리스트
  liveList: async (data) => {
    const response = await api.post("/v1/board/api/live-list", data);
    return response.data;
  },
};
