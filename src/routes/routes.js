import React from "react";

const Main = React.lazy(() => import("pages/main/Main"));
const SingUp = React.lazy(() => import("pages/signup/SingUp"));
const FindAccount = React.lazy(() => import("pages/findaccount/FindAccount"));
const MyInfo = React.lazy(() => import("pages/myinfo/MyInfo"));
const Withdrawal = React.lazy(() => import("pages/myinfo/Withdrawal"));
const ReservationList = React.lazy(() =>
  import("pages/reservationlist/ReservationList")
);
const Reservation = React.lazy(() => import("pages/reservation/Reservation"));
const Event = React.lazy(() => import("pages/event/Event"));
const EventDetail = React.lazy(() =>
  import("pages/event/components/EventDetail")
);
const Terms = React.lazy(() => import("pages/terms/Terms"));
const Page404 = React.lazy(() => import("pages/page404/Page404"));

const routes = [
  { path: "/", name: "메인페이지", element: Main },
  { path: "/signup", name: "회원가입", element: SingUp },
  { path: "/find-account", name: "아이디/비번 찾기", element: FindAccount },
  { path: "/myinfo", name: "내 정보 관리", element: MyInfo },
  { path: "/myinfo/withdrawal", name: "회원탈퇴", element: Withdrawal },
  {
    path: "/reservation/list",
    name: "내상담현황",
    element: ReservationList,
  },
  {
    path: "/reservation",
    name: "내상담예약",
    element: Reservation,
  },
  {
    path: "/event",
    name: "이벤트",
    element: Event,
  },
  {
    path: "/event/:id",
    name: "이벤트 상세 페이지",
    element: EventDetail,
  },
  {
    path: "/terms/:type",
    name: "약관 및 정책",
    element: Terms,
  },

  //404
  { path: "/*", name: "404 NOT FOUND", element: Page404 },
];

export default routes;
