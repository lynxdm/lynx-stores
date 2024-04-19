import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import useFetch from "../hooks/useFetch";
import { useGlobalContext } from "../context";

function SingleProducts() {
  const { pathname } = useLocation();
  const { loading, data, error } = useFetch(`${pathname.slice(9)}`);
  const { updateCartList, toast } = useGlobalContext();

  const [amount, setAmount] = useState(1);
  const [cartItem, setCartItem] = useState({
    id: "",
    title: "",
    image: "",
    price: 0,
    amount: 0,
    subtotal: 0,
  });

  useEffect(() => {
    updateCartList(cartItem);
  }, [cartItem]);

  const increaseAmount = () => {
    setAmount(amount + 1);
  };

  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const addToCart = (newItem) => {
    toast.success(
      `Added ${newItem.amount} ${newItem.amount > 1 ? "items" : "item"} to cart`
    );
    setCartItem({
      ...cartItem,
      ...newItem,
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage
        title={"error fetching data"}
        reload={true}
        redirectmsg={"try again"}
      />
    );
  }

  if (data) {
    const { category, description, id, image, price, title } = data;

    return (
      <main>
        <section className='single-product-section pad-section'>
          <div className='single-product-img-container'>
            <img src={image} alt={title} loading='lazy' />
          </div>
          <article className='single-product-content'>
            <div className='back-links'>
              <p>
                <Link to={"/"}>Home</Link> /{" "}
                <Link to={"/products"}>Products</Link>
              </p>
            </div>
            <h2 className='title'>{title}</h2>
            <h3 className='single-product-price'>${price}</h3>
            <div className='select-amount'>
              <button className='decrease-btn' onClick={decreaseAmount}>
                <AiOutlineMinus />
              </button>
              <p className='amount'>{amount}</p>
              <button className='increase-btn' onClick={increaseAmount}>
                <AiOutlinePlus />
              </button>
            </div>
            <button
              className='add-to-cart-btn'
              onClick={() => {
                const newItem = {
                  id,
                  image,
                  title,
                  price,
                  amount,
                  subtotal: parseFloat((amount * price).toFixed(2)),
                };
                addToCart(newItem);
              }}
            >
              Add ${(price * amount).toFixed(2)}
            </button>
            <h3 className='product-details-heading'>Product Details</h3>
            <div className='product-details'>{description}</div>
          </article>
        </section>
      </main>
    );
  }
}

export default SingleProducts;
