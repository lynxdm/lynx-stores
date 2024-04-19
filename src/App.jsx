import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProducts from "./pages/SingleProducts";
import Cart from "./pages/Cart";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import Error from "./pages/Error";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import { useGlobalContext } from "./context";

function App() {
  const { Toaster } = useGlobalContext();

  return (
    <Router>
      <Toaster position='top-right' />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/products/:id' element={<SingleProducts />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
