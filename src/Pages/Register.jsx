import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="mt-10 p-2">
      <h1 className="text-center text-3xl font-semi-bold">
        <Link to="/login">LOGIN</Link> /{" "}
        <Link to="/register" className="text-sky-500">
          REGISTER
        </Link>
      </h1>

      <form className="grid p-4 gap-3 my-6">
        <input type="text" />
        <input type="password" />
        <button className="py-2 px-4 text-lg bg-sky-500">
          CREATE AN ACCOUNT
        </button>
      </form>
    </div>
  );
}

export default Register;
