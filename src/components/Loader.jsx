import React from "react";
// import "ldrs/ping";
import { CircleLoader } from "react-spinners";
import { useGlobalContext } from "../context";

function Loader() {
  const { darkMode } = useGlobalContext();

  return (
    <div className='loader'>
      <CircleLoader
        size='60'
        color={darkMode ? "#f9cdcd" : "#420b56"}
      ></CircleLoader>
    </div>
  );
}

export default Loader;
