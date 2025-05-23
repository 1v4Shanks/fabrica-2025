import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import LoginProvider from "./context/LoginContext.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ScrollToTop/>
      <LoginProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </LoginProvider>
    </BrowserRouter>
  </StrictMode>
);
