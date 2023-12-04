import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      //스크롤위치 유지하는 경로 아니면 다 최상단으로 올림
      !["/mypage", "/cs", "/marketplace"].some((path) =>
        pathname.includes(path)
      )
    ) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
