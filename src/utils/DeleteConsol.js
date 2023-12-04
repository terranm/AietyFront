export const deleteConsole = () => {
  if (process.env.REACT_APP_ENV === "prod") {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  }
};
