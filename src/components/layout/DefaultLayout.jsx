import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
};

export default DefaultLayout;
