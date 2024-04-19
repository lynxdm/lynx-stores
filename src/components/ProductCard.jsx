import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";

function ProductCard({ category, id, image, price, title, index }) {
  return (
    <Link
      key={id}
      to={`/products/${id}`}
      className={index % 5 === 0 || index % 6 === 0 ? "large" : ""}
    >
      <li>
        <div className='img-container'>
          <img src={image} alt={title} loading='lazy' />
        </div>
        <div className='product-info'>
          <h3 className='title'>{title}</h3>
          <p className='price'>{`$${price}`}</p>
        </div>
      </li>
    </Link>
  );
}

export default ProductCard;
