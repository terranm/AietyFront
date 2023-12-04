import axios from "axios";

const token = window.sessionStorage.getItem("Authorization");

if (token) {
}

const axiosSetting = {
  baseURL: "",
};

if (token) {
  axiosSetting.headers = {
    Authorization: token,
  };
}

const api = axios.create(axiosSetting);

api.interceptors.response.use((response) => {
  if (response.data.resultCode === "LOGIN_REQUIRE") {
    window.location.href = "/login";
  }
  return response;
});
export default api;
