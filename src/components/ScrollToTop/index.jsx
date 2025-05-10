// src/components/ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll immediately when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // Use "instant" instead of "smooth" for immediate scrolling
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;