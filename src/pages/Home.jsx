import React, { useEffect, useState } from "react";
import "ldrs/ping";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { FiChevronsRight } from "react-icons/fi";
import useFetch from "../hooks/useFetch";
import heroimg1 from "../assets/heroimg1.webp";
import heroimg2 from "../assets/heroimg2.webp";
import heroimg3 from "../assets/heroimg3.webp";

function Home() {
  const { loading, data: products, error } = useFetch("?limit=4");

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage
        title={"error fetching data"}
        reload={true}
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
              Unleash Your Style: Lynx Clothing - Where Fashion Roars! Discover
              fierce, trend-setting apparel crafted to empower your confidence.
              Join the pride and redefine your look with our premium quality
              garments.
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
