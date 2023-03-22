import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const Login = () => {
  const { api } = useUser();
  const [userData, setuserData] = useState({
    username: "",
    password: "",
  });
  const [validations, setvalidations] = useState(true);
  const [error, seterror] = useState(null);
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();

  const inputChanges = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const signInUser = async (e) => {
    e.preventDefault();

    if (userData.username && userData.password) {
      setvalidations(true);
    } else {
      setvalidations(false);
    }

    try {
      if (!validations) {
        return;
      }
      const { data } = await api.post("/auth/login", userData);
      setCurrentUser(data);
      navigate("/");
    } catch (error) {
      console.log(error);
      seterror(error.response?.data?.error?.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
      <div className="flex justify-center items-center flex-col max-w-[500px] w-full px-3 mx-10 py-4 bg-gray-300 rounded-md">
        <h1 className="font-bold text-[30px] text-white mb-3">Login</h1>

        <form
          onSubmit={signInUser}
          className="flex flex-col justify-start items-center w-full gap-4"
        >
          <input
            type="text"
            placeholder="username"
            className="outline-none p-3 w-full"
            value={userData.username}
            name="username"
            onChange={(e) => inputChanges(e)}
          />

          <input
            type="password"
            placeholder="password"
            className="outline-none p-3 w-full"
            value={userData.password}
            name="password"
            onChange={(e) => inputChanges(e)}
          />

          <button className="bg-blue-500 hover:bg-blue-800  text-white px-20 py-2 my-2 active:bg-white active:text-black">
            Login
          </button>
        </form>

        {!validations && (
          <p className="text-red-500 p-2">please fill all values</p>
        )}

        {error && <p className="text-red-500 p-2">{error}</p>}

        <div className="flex gap-2">
          <p>Have a accound? </p>

          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
