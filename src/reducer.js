const updateTotals = (payload) => {
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
};

const reducer = (state, action) => {
  const { totalPrice, totalAmount, cart } = state;
  const { type, payload } = action;

  if (type === "INITIALIZE_CART") {
    let { totalPrice, totalAmount } = updateTotals(payload);

    return {
      ...state,
      cart: payload,
      totalAmount,
      totalPrice,
      initialRender: false,
    };
  }

  if (type === "UPDATE_CART") {
    let { totalPrice, totalAmount } = updateTotals(payload);

    return { ...state, cart: payload, totalAmount, totalPrice };
  }

  if (type === "REMOVE_CART_ITEM") {
    let newCart = cart.filter((item) => item.id !== payload);
    let { totalPrice, totalAmount } = updateTotals(newCart);
    return { ...state, cart: newCart, totalAmount, totalPrice };
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
    let { totalPrice, totalAmount } = updateTotals(newCart);
    return { ...state, cart: newCart, totalAmount, totalPrice };
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
    let { totalPrice, totalAmount } = updateTotals(newCart);
    return { ...state, cart: newCart, totalAmount, totalPrice };
  }

  if (type === "CLEAR_CART") {
    return { ...state, cart: [], totalAmount: 0, totalPrice: 0 };
  }
};

export default reducer;
