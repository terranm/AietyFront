// 정규식
export const emailRegex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
export const nameRegex = /^[가-힣a-zA-Z]+$/;
export const mobileRegex = /^[0-9]+$/;
export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
