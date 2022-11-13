import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../Context/DataContext";
import axios from "axios";
function Login() {
  //Global states from the AuthContext
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { url, setLoggedInUser, showAlert } = useContext(DataContext);

  //Function handling the sign in and setting the logged in user to local storage and persistent login
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(`${url}user/login/`, {
        username: name,
        password: password,
      });
      setLoggedInUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      showAlert(true, "error", error.message);
    }
    showAlert(true, "success", "LOGIN SUCCESSFUL");
  };

  return (
    <div className="mt-10 p-2">
      <h1 className="text-center text-3xl font-semi-bold">
        <Link to="/login" className="text-sky-500">
          LOGIN
        </Link>{" "}
        / <Link to="/register">REGISTER</Link>
      </h1>

      <form onSubmit={handleSubmit} className="grid p-4 gap-3 my-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="py-2 px-4 text-lg bg-sky-500">LOGIN</button>
      </form>
    </div>
  );
}

export default Login;
