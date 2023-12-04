import api from "utils/api";

export const avatarApis = {
  //아바타 카테고리 조회
  category: async (data) => {
    const response = await api.post("/v1/avatar/api/category", data);
    return response.data;
  },

  //내 아바타 정보 조회
  myAvatar: async (data) => {
    const response = await api.post("/v1/avatar/api/avatar", data);
    return response.data;
  },

  //아바타 저장
  save: async (data) => {
    const response = await api.post("/v1/avatar/api/save", data);
    return response.data;
  },
};
