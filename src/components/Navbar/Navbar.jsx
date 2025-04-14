import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

import { assets } from "../../assets/assets";
import SearchBar from "../SearchBar/SearchBar";
import { ShopContext } from "../../context/ShopContext";
import { LoginContext } from "../../context/LoginContext";
import { signOut } from "firebase/auth";
import { auth } from "../../authConfig/authConfig";

function Navbar() {
  const { cartItems } = useContext(ShopContext);
  const { user } = useContext(LoginContext);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/network-request-failed") {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    }
  };

  const totalCarts =
    cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleCloseMenu = () => {
    setVisible(false);
  };

  const handleCarts = () => {
    navigate("/cart");
  };

  const jumpToOrdersPage = () => {
    navigate("/orders");
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className="app-logo" />
      </Link>

      {/* Navigation Links */}
      <div className={`nav-links ${visible ? "open" : ""}`}>
        <ul>
          {visible && (
            <li onClick={handleCloseMenu}>
              <img
                src={assets.dropdown_icon}
                alt="dropDown icon"
                className="dropdown-icon"
              />
              <p className="close-Menu">Back</p>
            </li>
          )}
          <li onClick={handleCloseMenu}>
            <NavLink to="/" className="nav-link">
              <p>HOME</p>
            </NavLink>
          </li>
          <li onClick={handleCloseMenu}>
            <NavLink to="/collection" className="nav-link">
              <p>COLLECTION</p>
            </NavLink>
          </li>
          <li onClick={handleCloseMenu}>
            <NavLink to="/about" className="nav-link">
              <p>ABOUT</p>
            </NavLink>
          </li>
          <li onClick={handleCloseMenu}>
            <NavLink to="/contact" className="nav-link">
              <p>CONTACT</p>
            </NavLink>
          </li>
        </ul>
        {/* <button className="admin-panel-btn">Admin Panel</button> */}
      </div>

      {/* Action Icons */}
      <ul className="action-icons">
        <li>
          <div className="search-desktop">
            <SearchBar />
          </div>
        </li>

        <li className="profile-container">
          {user ? (
            <img
              src={assets.profile_icon}
              alt="Profile Icon"
              className="profile"
            />
          ) : (
            <Link to="/login">
              <img
                src={assets.profile_icon}
                alt="Profile Icon"
                className="profile"
              />
            </Link>
          )}
          {user && (
            <div className="profile-outerBox">
              <div className="profile-box">
                <p>My Profile</p>
                <p role="button" onClick={jumpToOrdersPage}>
                  Orders
                </p>
                <p role="button" onClick={handleLogout}>
                  Logout
                </p>
              </div>
            </div>
          )}
        </li>

        <li className="cart-logo" onClick={handleCarts} role="button">
          <img src={assets.cart_icon} alt="Cart Icon" />
          <span>{totalCarts}</span>
        </li>

        <li className="menu-icon-box">
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            alt="Menu icon"
            className="menu-icon"
          />
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
