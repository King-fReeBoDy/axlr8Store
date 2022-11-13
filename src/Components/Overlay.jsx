import React from "react";

function Overlay({ showHam, showCart }) {
  return (
    <>
      <div
        className={`  ${
          showCart && "bg-black/75 z-10 fixed inset-0 w-screen h-screen"
        }`}
      ></div>
      <div
        className={`  ${
          showHam && "bg-black/75 z-10 fixed inset-0 w-screen h-screen"
        }`}
      ></div>
    </>
  );
}

export default Overlay;
