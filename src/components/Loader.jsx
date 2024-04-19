import React from "react";
import "ldrs/ping";
import { useGlobalContext } from "../context";

function Loader() {
  const { darkMode } = useGlobalContext();

  return (
    <div className='loader'>
      <l-ping size='60' color={darkMode ? "#e0a9f4" : "#420b56"}></l-ping>
    </div>
  );
}

export default Loader;
