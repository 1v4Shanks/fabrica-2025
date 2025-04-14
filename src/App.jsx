import React, { useContext } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Collection from "./pages/Collection/Collection";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Orders from "./pages/Orders/Orders";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { ShopContext } from "./context/ShopContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutesProtector from "./RoutesProtector/RoutesProtector";

function App() {
  const { mainRef } = useContext(ShopContext);
  return (
    <div className="Main-container" ref={mainRef}>
      <ToastContainer autoClose={3000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route
          path="/orders"
          element={
            <RoutesProtector>
              <Orders />
            </RoutesProtector>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
