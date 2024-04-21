import React, { useContext, useEffect, useReducer, useState } from "react";
import { Toaster, toast } from "sonner";
import reducer from "./reducer";

const AppContext = React.createContext();

const initialState = {
  totalPrice: 0,
  totalAmount: 0,
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("dark-theme")
      ? true
      : false
  );
  const [orders, setOrders] = useState(
    localStorage.getItem("orders")
      ? JSON.parse(localStorage.getItem("orders"))
      : []
  );

  // UPDATE STORED ORDERS
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // UPDATE AND STORE CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
    dispatch({ type: "INITIALIZE_CART", payload: state.cart });
  }, [state.cart]);

  // UPDATE THEME SETTINGS AND STORE FOR LATER RELOAD
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("darkmode");
      localStorage.setItem("dark-theme", "true")
    } else {
      document.body.classList.remove("darkmode");
      localStorage.removeItem("dark-theme")
    }
  }, [darkMode]);

  const updateCartList = (cartItem) => {
    let cartList = state.cart;
    // check that cartItem is only added after an update
    if (cartItem.price > 0) {
      let oldItem = cartList.find((item) => item.id === cartItem.id) || null; // replace and update an already existing cartItem

      if (oldItem) {
        cartList = cartList.map((item) => {
          if (item.id === cartItem.id) {
            return cartItem;
          }
          return item;
        });
      } else {
        cartList = [...cartList, cartItem];
      }
    }

    dispatch({ type: "UPDATE_CART", payload: cartList });
  };

  const increaseCartItem = (id) => {
    dispatch({ type: "INCREASE_CART_ITEM", payload: id });
  };

  const decreaseCartItem = (id) => {
    dispatch({ type: "DECREASE_CART_ITEM", payload: id });
  };

  const removeCartItem = (id) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: id });
    toast.success("Item removed from cart");
  };

  const placeOrder = (orderDetails) => {
    setOrders([...orders, { ...orderDetails, state }]);
    toast.success("Your order has been placed");
    dispatch({ type: "CLEAR_CART" });
  };

  const cancelOrder = (id) => {
    let newOrders = orders.filter((item) => item.id !== id);
    setOrders(newOrders);
    toast.success("Your order has been cancelled");
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        Toaster,
        toast,
        state,
        updateCartList,
        increaseCartItem,
        decreaseCartItem,
        removeCartItem,
        placeOrder,
        cancelOrder,
        orders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
