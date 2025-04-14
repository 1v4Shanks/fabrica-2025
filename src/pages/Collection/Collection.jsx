import React, { useContext, useEffect, useState } from "react";
import "./Collection.css";
import { ShopContext } from "../../context/ShopContext";
import Title from "../../components/Title/Title";
import ProductItem from "../../components/ProductItem/ProductItem";

function Collection() {
  const { products, searchText, setSearchText } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategories, setActiveCategories] = useState(new Set());
  const [activeSubCategories, setActiveSubCategories] = useState(new Set());
  const [sortValue, setSortvalue] = useState("Relavent");

  const handleAllProductsBtn = () => {
    setSearchText("");
    setActiveCategories(new Set());
    setActiveSubCategories(new Set());
    setSortvalue("Relavent");
  };

  const handleCategories = (name) => {
    setActiveCategories((prev) => {
      const newSet = new Set(prev);
      newSet.has(name) ? newSet.delete(name) : newSet.add(name);
      return newSet;
    });
  };

  const handleSubCategories = (name) => {
    setActiveSubCategories((prev) => {
      const newSet = new Set(prev);
      newSet.has(name) ? newSet.delete(name) : newSet.add(name);
      return newSet;
    });
  };

  const applyFilter = () => {
    let copyProducts = products.slice();

    // Filter by category
    if (activeCategories.size > 0) {
      copyProducts = copyProducts.filter((product) =>
        activeCategories.has(product.category)
      );
    }

    // Filter by sub-category
    if (activeSubCategories.size > 0) {
      copyProducts = copyProducts.filter((product) =>
        activeSubCategories.has(product.subCategory)
      );
    }

    // Filter by search
    if (searchText) {
      const search = searchText.trim().toLowerCase();
      const searchWords = search.split(/\s+/);
      const allCategories = [
        ...new Set(products.map((product) => product.category.toLowerCase())),
      ];
      const categoriesInsearch = allCategories.some((category) =>
        searchWords.includes(category)
      );

      copyProducts = copyProducts.filter((product) => {
        const category = product.category.toLowerCase();
        const keywords = product.keywords.map((key) => key.toLowerCase());

        const hasCategory = searchWords.includes(category);
        const macthedKeyword = keywords.some((keyword) =>
          searchWords.includes(keyword)
        );

        if (searchWords === category) {
          return true;
        }
        if (hasCategory && macthedKeyword) {
          return true;
        }
        if (!categoriesInsearch && macthedKeyword) {
          return true;
        }

        return false;
      });
    }

    setFilteredProducts(copyProducts);
  };

  useEffect(() => {
    applyFilter();
  }, [products, activeCategories, activeSubCategories, searchText]);

  const handleSorting = (name) => {
    setSortvalue(name);
    let fpCopy = filteredProducts.slice();
    switch (name) {
      case "LowToHigh":
        setFilteredProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "HighToLow":
        setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  return (
    <div className="collection-container">
      <div className="collection-filter-box">
        <div className="collection-filter-box-title">
          <h2>FILTERS</h2>
        </div>
        <button
          className="collection-filter-box-all-products-btn"
          onClick={handleAllProductsBtn}
        >
          All Products
        </button>
        <div className="collection-filters">
          <p>CATEGORIES</p>
          <ul>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={activeCategories.has("Men")}
                  onChange={() => handleCategories("Men")}
                />
                Men
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={activeCategories.has("Women")}
                  onChange={() => handleCategories("Women")}
                />
                Women
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={activeCategories.has("Kids")}
                  onChange={() => handleCategories("Kids")}
                />
                Kids
              </label>
            </li>
          </ul>
        </div>
        <div className="collection-filters">
          <p>TYPE</p>
          <ul>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={activeSubCategories.has("Topwear")}
                  onChange={() => handleSubCategories("Topwear")}
                />
                Topwear
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={activeSubCategories.has("Bottomwear")}
                  onChange={() => handleSubCategories("Bottomwear")}
                />
                Bottomwear
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={activeSubCategories.has("Winterwear")}
                  onChange={() => handleSubCategories("Winterwear")}
                />
                Winterwear
              </label>
            </li>
          </ul>
        </div>
      </div>

      {/* //---------------------------All-collection--------------------------// */}

      <div className="all-collection-box">
        <div className="all-collection-title">
          <div className="all-collection-title-box">
            <Title text1={"ALL"} text2={"COLLECTION"} />
          </div>

          <div className="all-collection-sortby-container">
            <select
              value={sortValue}
              onChange={(e) => handleSorting(e.target.value)}
              className="all-collection-sort"
            >
              <option value="relavent">Sort by: Relavent</option>
              <option value="LowToHigh">Sort by: Low to High</option>
              <option value="HighToLow">Sort by: High to Low</option>
            </select>
          </div>
        </div>

        <div className="all-collection-products">
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>Sorry, no products match.</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductItem
                key={product._id}
                id={product._id}
                image={product.image[0]}
                name={product.name}
                price={product.price}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Collection;
