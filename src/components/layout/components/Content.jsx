import Loading from "components/loading/Loading";
import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// routes config
import routes from "routes/routes";
import styled from "styled-components";

const AppContent = () => {
  return (
    <>
      <Wrapper>
        <Suspense fallback={<Loading></Loading>}>
          <Routes>
            {routes.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              );
            })}
            <Route path="/" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Wrapper>
    </>
  );
};

export default React.memo(AppContent);

const Wrapper = styled.div`
  padding-top: 68px;
`;
