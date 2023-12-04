import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return <></>;
};

export default Page404;
