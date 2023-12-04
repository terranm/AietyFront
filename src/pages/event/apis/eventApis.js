import api from "utils/api";

export const eventApis = {
  //이벤트 게시판 리스트
  list: async (data) => {
    const response = await api.post("/v1/board/api/list", data);
    return response.data;
  },

  //게시판 상세
  detail: async (data) => {
    const response = await api.post("/v1/board/api/detail", data);
    return response.data;
  },
};
