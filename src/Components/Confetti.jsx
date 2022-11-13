import React, { useContext, useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import DataContext from "../Context/DataContext";

function Confetti() {
  const { ishow, setIsShow } = useContext(DataContext);

  useEffect(() => {
    let time = setTimeout(() => {
      setIsShow(false);
    }, 10000);
    return () => clearTimeout(time);
  }, [ishow]);
  return <div>{ishow && <ReactConfetti className="w-screen h-screen" />}</div>;
}

export default Confetti;
