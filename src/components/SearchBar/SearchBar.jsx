import React, { useContext, useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import { ShopContext } from "../../context/ShopContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
function SearchBar() {
  const { setSearchText, products } = useContext(ShopContext);
  const [text, setText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const ref = useRef(null);
  const handleText = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (text.trim().length < 2) {
      setSearchData([]);
      return;
    }

    const search = text.toLowerCase().trim();
    const suggestion = new Set();

    products.forEach((product) => {
      const category = product.category.toLowerCase();
      const keywords = product.keywords.map((key) => key.toLowerCase());
      if (category === search) {
        suggestion.add(`${category} ${keywords[0]}`);
        return;
      } else if (keywords[0].includes(search)) {
        suggestion.add(`${keywords[0]} for ${category}`);
        return;
      } else {
        keywords.forEach((keyword) => {
          if (keyword.includes(search)) {
            suggestion.add(`${keyword} for ${category}`);
          }
        });
      }

      const words = search.split(/\s+/);
      if (words.length >= 2) {
        keywords.forEach((keyword) => {
          if (search.includes(keyword) && words.includes(category)) {
            suggestion.add(`${keyword} for ${category}`);
          }
        });
      }
    });

    setSearchData([...suggestion].slice(0, 10));
  }, [text]);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setClicked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  const handleClickOnSuggestion = (item) => {
    if (text.trim().length < 2) return;
    setSearchText(item);
    setSearchData([]);
    setText("");
    setClicked(false);
    navigate("/collection");
  };

  const handleSearchIconClick = (e) => {
    e.stopPropagation();
    if (text.trim().length < 2) return;
    setSearchText(text);
    setClicked(false);
    setSearchData([]);
    setText("");
    navigate("/collection");
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && text.trim().length >= 2) {
      setSearchText(text);
      setClicked(false);
      setSearchData([]);
      setText("");
      document.activeElement.blur();
      navigate("/collection");
    }
  };

  return (
    <div ref={ref} className="search-bar-container">
      <div
        className={`search-container ${
          clicked ? "search-container-border" : "search-container-background"
        }`}
        onClick={() => setClicked(true)}
      >
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={text}
          onChange={handleText}
          onKeyDown={handleEnterPress}
        />
        <img
          src={assets.search_icon}
          alt="search icon"
          className="search-icon-btn"
          onClick={handleSearchIconClick}
        />
      </div>

      <ul
        className={`search-bar-suggestion ${
          clicked
            ? "search-bar-show-suggestions"
            : "search-bar-hide-suggestions"
        }`}
      >
        {searchData.map((item, i) => (
          <li
            key={i}
            className="search-bar-suggestion-item"
            onClick={() => handleClickOnSuggestion(item)}
          >
            {item
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
