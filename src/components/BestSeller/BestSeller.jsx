import React, { useContext, useState } from "react";
import "./BestSeller.css";
import { ShopContext } from "../../context/ShopContext";
import Title from "../Title/Title";
import ProductItem from "../ProductItem/ProductItem";
function BestSeller() {
  const { products } = useContext(ShopContext);
  const bestSellers = products
    .filter((product) => product.bestseller === true)
    .slice(0, 5);

  return (
    <div className="best-sellers-container">
      <div className="best-sellers-title">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="best-sellers-text">
          Discover Our Best Sellers – Timeless Fashion, Effortless Style, and
          Unmatched Trends!
        </p>
      </div>
      <div className="best-sellers-box">
        {bestSellers.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            image={product.image[0]}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
