import React from "react";
import { Route, Routes } from "react-router-dom";
import Metaverse from "pages/metaverse/Metaverse";
import Page404 from "pages/page404/Page404";
import DefaultLayout from "components/layout/DefaultLayout";
import { AuthContextProvider } from "context/AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="*" name="Home" element={<DefaultLayout />} />
        <Route path="/metaverse" element={<Metaverse />}></Route>
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
