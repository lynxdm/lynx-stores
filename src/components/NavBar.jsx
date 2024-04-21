import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../context";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoMdMoon, IoIosSunny } from "react-icons/io";
import { CgMenuLeft } from "react-icons/cg";

function NavBar() {
  const { darkMode, setDarkMode, state } = useGlobalContext();
  const [pages, setPages] = useState([
    "",
    "about",
    "products",
    "cart",
    "checkout",
    "orders",
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebar = useRef();
  const sidebarBtn = useRef();

  const handleMenu = (e) => {
    if (
      !sidebar.current.contains(e.target) &&
      !sidebarBtn.current.contains(e.target)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.addEventListener("click", handleMenu);
    }

    return () => {
      document.body.removeEventListener("click", handleMenu);
    };
  }, [isSidebarOpen]);

  const location = useLocation();
  const [currentPage, setCurrentpage] = useState(location.pathname.slice(1));

  useEffect(() => {
    setCurrentpage(location.pathname.slice(1));
    if (location.pathname.slice(1) === "") {
      document.body.classList.add("home");
    } else {
      document.body.classList.remove("home");
    }
  }, [location.pathname]);

  return (
    <nav className={currentPage === "" ? "navbar home-navbar" : "navbar"}>
      <div className='navbar-flex'>
        <Link to='/' className='logo'>
          <h1>LYNX</h1>
        </Link>
        <button
          className='mobile-menu-btn'
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          ref={sidebarBtn}
        >
          <CgMenuLeft />
        </button>
        <Link to='/' className='mobile-logo'>
          <h1>LYNX</h1>
        </Link>
        <ul className='nav-links'>
          {pages.map((page, index) => {
            return (
              <Link to={`/${page}`} key={index}>
                <li className={currentPage === page ? "active" : ""}>
                  {page === "" ? "home" : page}
                </li>
              </Link>
            );
          })}
        </ul>
        <ul className='quick-actions'>
          <button
            className='theme-toggle'
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <IoIosSunny /> : <IoMdMoon />}
          </button>
          <Link to='/cart' className='cart-btn'>
            <HiOutlineShoppingCart />
            {state.totalAmount > 0 && (
              <div className='item-num'>{state.totalAmount}</div>
            )}
          </Link>
        </ul>
      </div>
      <aside
        ref={sidebar}
        className={isSidebarOpen ? "sidebar show" : "sidebar"}
      >
        <ul className='mobile-nav-links'>
          {pages.map((page, index) => {
            return (
              <Link to={`/${page}`} key={index} onMouseUp={()=>{
                setIsSidebarOpen(false)
              }}>
                <li className={currentPage === page ? "active" : ""}>
                  {page === "" ? "home" : page}
                </li>
              </Link>
            );
          })}
        </ul>
      </aside>
    </nav>
  );
}

export default NavBar;
