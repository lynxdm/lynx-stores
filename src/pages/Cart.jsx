import React from "react";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";
import { BiMinusCircle } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useGlobalContext } from "../context";

function Cart() {
  const { state, increaseCartItem, decreaseCartItem, removeCartItem } =
    useGlobalContext();
  const tax = parseFloat((state.totalPrice * 0.1).toFixed(2));
  const cartTotal = parseFloat((state.totalPrice + tax).toFixed(2));

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
    <main>
      <section className='cart-section pad-section'>
        <div className='cart-section-heading'>
          <h2 className='heading'>Your Cart</h2>
        </div>
        <div className='cart-details-flex'>
          <div className='cart-table-overflow'>
            <table className='cart-table'>
              <thead>
                <tr>
                  <th>remove</th>
                  <th>image</th>
                  <th>product</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>subtotal</th>
                </tr>
              </thead>
              <tbody>
                {state.cart.map((cartitem) => {
                  const { id, image, amount, title, price, subtotal } =
                    cartitem;
                  return (
                    <tr key={id} className='cart-item'>
                      <td>
                        <button
                          className='remove-btn'
                          onClick={() => {
                            removeCartItem(id);
                          }}
                        >
                          <BiMinusCircle />
                        </button>
                      </td>
                      <td>
                        <div className='img-container'>
                          <img src={image} alt={title} loading='lazy' />
                        </div>
                      </td>
                      <td>
                        <Link
                          to={`/products/${id}`}
                          className='cart-item-title'
                        >
                          {title}
                        </Link>
                      </td>
                      <td>
                        <p className='cart-item-price'>${price}</p>
                      </td>
                      <td>
                        <div className='select-amount cart-item-select-amount'>
                          <button
                            className='decrease-btn'
                            onClick={() => {
                              if (amount > 1) {
                                decreaseCartItem(id);
                              }
                            }}
                          >
                            <AiOutlineMinus />
                          </button>
                          <p className='amount'>{amount}</p>
                          <button
                            className='increase-btn'
                            onClick={() => {
                              increaseCartItem(id);
                            }}
                          >
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </td>
                      <td>
                        <p className='cart-item-subtotal'>${subtotal}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
            <Link to={"/checkout"}>Proceed To Checkout</Link>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Cart;
