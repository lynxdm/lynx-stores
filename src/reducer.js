// UPDATES CART TOTALS AND RETURNS ZERO IF CART IS EMPTY
const updateTotals = (payload) => {
  if (payload.length > 0) {
    let { totalPrice, totalAmount } = payload.reduce(
      (cartTotal, cartItem) => {
        const { amount, subtotal } = cartItem;

        cartTotal.totalPrice += subtotal;
        cartTotal.totalAmount += amount;

        return cartTotal;
      },
      {
        totalPrice: 0,
        totalAmount: 0,
      }
    );

    totalPrice = parseFloat(totalPrice.toFixed(2));
    return { totalAmount, totalPrice };
  } else {
    return {
      totalAmount: 0,
      totalPrice: 0,
    };
  }
};

const reducer = (state, action) => {
  const {cart } = state;
  const { type, payload } = action;

  if (type === "INITIALIZE_CART") {
    let { totalPrice, totalAmount } = updateTotals(payload);

    return {
      ...state,
      totalAmount,
      totalPrice,
    };
  }

  if (type === "UPDATE_CART") {
    return { ...state, cart: payload };
  }

  if (type === "REMOVE_CART_ITEM") {
    let newCart = cart.filter((item) => item.id !== payload);
    return { ...state, cart: newCart };
  }

  if (type === "INCREASE_CART_ITEM") {
    let newCart = cart.map((item) => {
      if (item.id === payload) {
        return {
          ...item,
          amount: item.amount + 1,
          subtotal: parseFloat((item.subtotal + item.price).toFixed(2)),
        };
      }
      return item;
    });
    return { ...state, cart: newCart };
  }

  if (type === "DECREASE_CART_ITEM") {
    let newCart = cart.map((item) => {
      if (item.id === payload) {
        return {
          ...item,
          amount: item.amount - 1,
          subtotal: parseFloat((item.subtotal - item.price).toFixed(2)),
        };
      }
      return item;
    });
    return { ...state, cart: newCart };
  }

  if (type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
};

export default reducer;
