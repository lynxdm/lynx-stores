import React, { useEffect, useState } from "react";
import "ldrs/ping";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import { useGlobalContext } from "../context";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FiChevronsRight } from "react-icons/fi";
import useFetch from "../hooks/useFetch";
import heroimg1 from "../assets/heroimg1.jpg";
import heroimg2 from "../assets/heroimg2.jpg";
import heroimg3 from "../assets/heroimg3.jpg";

function Home() {
  const { loading, data: products, error } = useFetch("?limit=4");

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage
        title={"error fetching data"}
        link={""}
        redirectmsg={"try again"}
        hero={true}
      />
    );
  }

  if (products) {
    return (
      <main>
        <section className='hero-section'>
          <article className='hero-text'>
            <div className='hero-header'>WHY LYNX</div>
            <h2>Your fashion on steriods. Without the barriers.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              nostrum voluptatum ullam quibusdam tempore nihil quaerat debitis
              quia enim pariatur eum nemo, quod magni ipsum dolorum nulla! Nisi,
              quidem reiciendis omnis voluptates nobis consequuntur dolor
              mollitia tempore! Laudantium, deserunt quas?
            </p>
            <Link to={"/products"} className='btn hero-products-link'>
              <p>Our products</p>
              {/* <BsArrowRight></BsArrowRight> */}
            </Link>
          </article>
          <div className='hero-images'>
            <img
              src={heroimg1}
              alt='hero image 1: a model of ours'
              className='hero-img1'
              loading='lazy'
            />
            <img
              src={heroimg3}
              alt='hero image 2: a model of ours'
              className='hero-img2'
              loading='lazy'
            />
          </div>
        </section>
        <section className='featured-products'>
          <div className='featured-products-heading'>
            <h2 className='heading'>Featured Products</h2>
            <p>Summer Collection New Mordern Design</p>
          </div>
          <ul className='products-container home-products-container'>
            {products.map((product) => {
              {
                /* const { category, id, image, price, title } = product; */
              }
              return <ProductCard key={product.id} {...product} />;
            })}
          </ul>
          <Link to={"./products"} className='btn home-see-more-btn'>
            <p>see more</p>
            <FiChevronsRight></FiChevronsRight>
          </Link>
        </section>
      </main>
    );
  }
}

export default Home;
