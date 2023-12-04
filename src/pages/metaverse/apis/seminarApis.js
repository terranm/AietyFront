import api from "utils/api";

export const seminarApis = {
  //세미나 상세 정보
  detail: async (data) => {
    const response = await api.post("/v1/seminar/api/detail", data);
    return response.data;
  },
};
