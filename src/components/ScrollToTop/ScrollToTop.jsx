import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const container = document.getElementsByClassName("Main-container")[0];
    if (container) {
      container.scrollTo(0, 0);;
    }
  }, [pathname]);

  return null;
}
