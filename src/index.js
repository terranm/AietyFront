import React from "react";
import ReactDOM from "react-dom/client";
import "styles/index.css";
import "styles/pagination.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ScrollTop from "utils/ScrollToTop";
import { deleteConsole } from "utils/DeleteConsol";

deleteConsole();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollTop />
    <App />
  </BrowserRouter>
);

//리액트 성능 측정
// reportWebVitals(console.log);
reportWebVitals();
