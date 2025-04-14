import React, { useContext } from "react";
import "./ProductItem.css";
import { ShopContext } from "../../context/ShopContext";
import { Link } from "react-router-dom";
function ProductItem({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="productItem-container">
      <div className="productItem-img">
        <img src={image} alt={name} />
      </div>
      <p className="productItem-name">{name}</p>
      <p className="productItem-price">
        {currency}
        {price}
      </p>
    </Link>
  );
}

export default ProductItem;
