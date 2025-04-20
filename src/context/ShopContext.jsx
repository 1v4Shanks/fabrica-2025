import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseDataPush/firebaseDataConfig";
import { LoginContext } from "./LoginContext";
import { get, ref, set } from "firebase/database";
import { database } from "../firebaseRealTimedata/firebaserealTimeConfig";
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");

  const { user } = useContext(LoginContext);
  const userId = user ? user.uid : null;

  //--------------update-orders-----------//

  const saveOrdersToDatabase = async (updatedOrder) => {
    if (!userId) return;

    try {
      const userOrdersRef = ref(database, "orders/" + userId);
      await set(userOrdersRef, updatedOrder);
    } catch (error) {
      console.error("Error saving orders to database:", error);
    }
  };

  // ------------fetching orders----------------//

  const fetchOrdersData = async () => {
    if (!userId) return;

    try {
      const ordersRef = ref(database, "orders/" + userId);
      const snapshot = await get(ordersRef);
      if (snapshot.exists()) {
        setOrderedItems(snapshot.val());
      } else {
        setOrderedItems([]);
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  useEffect(() => {
    fetchOrdersData();
  }, [userId]);

  //--------------update carts ------------//

  const saveCartToDatabase = async (updatedCart) => {
    if (!userId) return;
    try {
      const userCartsRef = ref(database, "carts/" + userId);
      await set(userCartsRef, updatedCart);
    } catch (error) {
      console.error("Error saving cart to database:", error);
    }
  };

  //----------------fetching carts data--------------------//

  const fetchCartData = async () => {
    if (!userId) return;

    try {
      const cartsRef = ref(database, "carts/" + userId);
      const snapshot = await get(cartsRef);
      if (snapshot.exists()) {
        setCartItems(snapshot.val());
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [userId]);

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

  // -------------------- place order ----------------------//

  const placeOrder = () => {
    let paymentMode =
      paymentMethod === "cashOnDelivery" ? "COD" : paymentMethod;
    const newOrder = cartItems.map((item) => ({
      ...item,
      date: new Date().toDateString(),
      payment: paymentMode,
    }));
    setOrderedItems((prevOrder) => {
      const updateOrders = [...newOrder, ...prevOrder];
      if (userId) {
        saveOrdersToDatabase(updateOrders);
      }
      return updateOrders;
    });
    setCartItems([]);
    if (userId) {
      saveCartToDatabase([]);
    }
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
        saveCartToDatabase,
        userId,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
