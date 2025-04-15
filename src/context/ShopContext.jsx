import { createContext, useState } from "react";
import products from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const [searchText, setSearchText] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");

  const fee = 10;
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subTotal + fee;

  const placeOrder = () => {
    let paymentMode =
      paymentMethod === "cashOnDelivery" ? "COD" : paymentMethod;
    const newOrder = cartItems.map((item) => ({
      ...item,
      date: new Date().toDateString(),
      payment: paymentMode,
    }));
    setOrderedItems((prevOrder) => [...prevOrder, ...newOrder]);
    setCartItems([]);
  };
  return (
    <ShopContext.Provider
      value={{
        products,
        currency,
        fee,
        searchText,
        setSearchText,
        cartItems,
        setCartItems,
        subTotal,
        total,
        paymentMethod,
        setPaymentMethod,
        placeOrder,
        orderedItems,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
