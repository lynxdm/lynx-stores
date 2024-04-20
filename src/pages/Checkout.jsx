import React, { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
  });

  const { state, placeOrder } = useGlobalContext();
  const tax = parseFloat((state.totalPrice * 0.1).toFixed(2));
  const cartTotal = parseFloat((state.totalPrice + tax).toFixed(2));

  const handleChange = (e) => {
    let { name, value } = e.target;

    setShippingInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  if (state.cart.length < 1) {
    return (
      <ErrorMessage
        title={"your cart is empty"}
        link={"products"}
        redirectmsg={"see all products"}
      />
    );
  }

  return (
    <main className='checkout-main'>
      <section className='checkout-section'>
        <article className='shipping-information-container'>
          <h2 className='shipping-information-heading'>Shipping Information</h2>
          <form
            className='shipping-information-form'
            onSubmit={(e) => {
              e.preventDefault();
              let currentDate = new Date();

              placeOrder({
                ...shippingInfo,
                date: {
                  minutes: currentDate.getMinutes(),
                  hours: currentDate.getHours(),
                  day: currentDate.getDate(),
                  month: currentDate.getMonth(),
                  year: currentDate.getFullYear(),
                },
                id: currentDate.getTime(),
              });
              navigate("/orders");
            }}
          >
            <input
              type='text'
              className='your-name-input'
              placeholder='Your Name'
              name='name'
              value={shippingInfo.name}
              required
              onChange={(e) => handleChange(e)}
            />
            <input
              type='email'
              className='email-input'
              placeholder='E-mail'
              name='email'
              value={shippingInfo.email}
              required
              onChange={(e) => handleChange(e)}
            />
            <input
              type='text'
              className='address-input'
              placeholder='Address'
              name='address'
              value={shippingInfo.address}
              required
              onChange={(e) => handleChange(e)}
            />
            <button type='submit' className='place-your-order-btn active-btn'>
              Place Your Order
            </button>
          </form>
        </article>
        <article className='cart-totals'>
          <h3 className='cart-totals-heading'>Cart Totals</h3>
          <table>
            <tbody>
              <tr>
                <td>Cart Subtotal</td>
                <td>${state.totalPrice}</td>
              </tr>
              <tr>
                <td>Shipping</td>
                <td>Free</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>${tax}</td>
              </tr>
              <tr>
                <td className='table-bold'>Total</td>
                <td className='table-bold'>${cartTotal}</td>
              </tr>
            </tbody>
          </table>
        </article>
      </section>
    </main>
  );
}

export default Checkout;
