import React, { useContext } from "react";
import "./Orders.css";
import { ShopContext } from "../../context/ShopContext";
import Title from "../../components/Title/Title";
function Orders() {
  const { orderedItems, currency } = useContext(ShopContext);
  return (
    <div className="orders-container">
      <div className="orders-title">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="all-orders-container">
        {orderedItems.map((item) => (
          <div key={`${item._id}-${item.size}`} className="order-box">
            <div className="ordered-item-details">
              <img
                src={item.image}
                alt="thumbnail"
                className="ordered-item-image"
              />
              <div className="details">
                <p className="ordered-item-name">{item.name}</p>
                <div className="quantity-and-size-details">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>{`Quantity: ${item.quantity}`}</p>
                  <p>{`Size: ${item.size}`}</p>
                </div>
                <p>
                  Date: <span>{item.date}</span>
                </p>
                <p>
                  {" "}
                  Payment: <span>{item.payment}</span>
                </p>
              </div>
            </div>

            <div className="order-placed">
              <span className="order-placed-indicator"></span>
              <p>Order Placed</p>
            </div>
            <button className="track-order-btn">Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
