import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const Register = () => {
  const { api } = useUser();

  const [userData, setuserData] = useState({
    username: "",
    email: "",
    password: "",
    photo: null,
  });
  const [validations, setvalidations] = useState(true);
  const [previewPhoto, setpreviewPhoto] = useState(null);
  const [error, seterror] = useState(null);
  const navigate = useNavigate();

  const inputChanges = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (userData.username && userData.password && userData.email) {
      setvalidations(true);
    } else {
      setvalidations(false);
    }

    try {
      const formdata = new FormData();
      formdata.append("username", userData.username);
      formdata.append("email", userData.email);
      formdata.append("password", userData.password);
      if (userData.photo) {
        formdata.append("image", userData.photo, "profile.jpg");
      }

      if (!validations) {
        return;
      }

      const user = await api.post("/auth/register", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("created User", user);

      navigate("/login");
    } catch (error) {
      console.log(error);
      seterror(error.response?.data?.error?.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
      <div className="flex justify-center items-center flex-col max-w-[500px] w-full px-3 mx-10 py-4 bg-gray-300 rounded-md">
        <h1 className="font-bold text-[30px] text-white mb-3">Register</h1>

        <form
          onSubmit={registerUser}
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
            type="email"
            placeholder="email"
            className="outline-none p-3 w-full"
            value={userData.email}
            name="email"
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

          <div className="flex justify-between items-center w-full gap-10">
            <label
              className="py-1 px-3  w-full bg-white cursor-pointer block text-center flex-1"
              htmlFor="file"
            >
              upload Photo
            </label>
            {previewPhoto && (
              <img
                src={previewPhoto}
                alt="preview"
                className="w-16 aspect-square rounded-full object-cover"
              />
            )}
          </div>

          <input
            id="file"
            type="file"
            className="hidden "
            name="photo"
            onChange={(e) => {
              setuserData({ ...userData, [e.target.name]: e.target.files[0] });
              setpreviewPhoto(URL.createObjectURL(e.target.files[0]));
            }}
          />
          <button className="bg-blue-500 hover:bg-blue-800  text-white px-20 py-2 my-2 active:bg-white active:text-black">
            Register
          </button>
        </form>

        {!validations && (
          <p className="text-red-500 p-2">please fill all values</p>
        )}

        {error && <p className="text-red-500 p-2">{error}</p>}

        <div className="flex gap-2">
          <p>Have a accound? </p>

          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
