import React from "react";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import ErrorMessage from "../components/ErrorMessage";
import { useGlobalContext } from "../context";

function Products() {
  const { loading, data: products, error } = useFetch("");

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage
        title={"error fetching data"}
        link={"products"}
        redirectmsg={"try again"}
      />
    );
  }

  if (products) {
    // console.log(products);
    return (
      <main>
        <section className='our-products-section pad-section'>
          <div className='our-products-section-heading'>
            <h2 className='heading'>Our Products</h2>
            <p className='sub-text'>some really really good stuff.</p>
          </div>
          <ul className='products-container products-products-container'>
            {products
              .filter((product) => {
                if (
                  product.category !== "jewelery" &&
                  product.category !== "electronics"
                ) {
                  return product;
                }
              })
              .map((product, index) => {
                return (
                  <ProductCard key={product.id} index={index} {...product} />
                );
              })}
          </ul>
        </section>
      </main>
    );
  }
}

export default Products;
