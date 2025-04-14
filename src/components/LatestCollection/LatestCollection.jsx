import React, { useContext } from "react";
import "./LatestCollection.css";
import { ShopContext } from "../../context/ShopContext";
import Title from "../Title/Title";
import ProductItem from "../ProductItem/ProductItem";

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const latest = [...products].slice(-10);

  return (
    <div className="latest-collection-container">
      <div className="latest-collection-title">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="latest-collection-text" >
          Step Into the Season with Our Latest Fashion Collection – Chic, Modern
          & Trendy!
        </p>
      </div>
      <div className="latest-collection-box">
        {latest.map((product) => (
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

export default LatestCollection;
