import { VscChromeClose } from "react-icons/vsc";
import DataContext from "../Context/DataContext";
import { useContext, useEffect } from "react";

const Alert = () => {
  const { toggle, showAlert } = useContext(DataContext);
  useEffect(() => {
    const time = setTimeout(() => {
      showAlert(false, "", "");
    }, 3000);
    return () => clearTimeout(time);
  }, [toggle.isTrue]);

  return (
    <div
      className={
        toggle.isTrue &&
        `fixed inset-x-0 top-0 p-3 z-[10000000] transtion-all duration-300 uppercase text-center -translate-y-0 ${
          toggle.type === "success"
            ? "bg-sky-100 text-sky-600"
            : "bg-red-100 text-red-600"
        }`
      }
    >
      {toggle.msg}
    </div>
  );
};

export default Alert;
