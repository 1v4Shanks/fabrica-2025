import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebaseDataPush/firebaseDataConfig";
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");

  // --------------fetching data ------------//

  const fetchProducts = async () => {
    try {
      const result = await getDocs(collection(db, "products"));

      const productsArray = result.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsArray);
      console.log(productsArray);
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
        loading,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
