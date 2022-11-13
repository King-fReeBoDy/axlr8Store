import React, { useState } from "react";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
function FAQ() {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle(!toggle);
  return (
    <div className="mt-10 p-2">
      <h1 className="text-center text-3xl font-semi-bold">
        FREQUENTLY ASK QUESTIONS
      </h1>
      <div className="mt-10 w-[90%] md:w-[70%] mx-auto hover:shadow-lg transition-all duration-300 shadow-md p-4 ">
        <div className="flex justify-between items-center">
          <h2>HOW TO MAKE PAYMENT</h2>
          <p className="text-sky-500 cursor-pointer" onClick={handleToggle}>
            {toggle ? (
              <VscTriangleUp className="text-xl" />
            ) : (
              <VscTriangleDown className="text-xl" />
            )}
          </p>
        </div>

        <p className={toggle ? "block" : "hidden"}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt ea
          quod odit. Delectus ducimus tempore suscipit itaque mollitia
          reiciendis quae iusto distinctio maxime ullam alias culpa laudantium
          deleniti, adipisci harum.
        </p>
      </div>
    </div>
  );
}

export default FAQ;
