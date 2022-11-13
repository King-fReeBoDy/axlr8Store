import React from "react";
import logo from "../Assets/123.jpg";
function Banner() {
  return (
    <div className=" md:h-[350px] overflow-hidden">
      <img src={logo} alt="" className="object-cover" />
    </div>
  );
}

export default Banner;
