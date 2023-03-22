import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get(
        "https://api.sandbox.transferwise.tech/v1/me",
        {
          headers: {
            Authorization: "Bearer 38d47fab-37b9-494a-bdfa-9d3182a4d152",
          },
        }
      );

      console.log(data);
    };

    fetch();
  }, []);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // add to localstorage
  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("user", JSON.stringify(user));
  }, [currentUser, setCurrentUser, user, setUser]);

  // Refresh Token  | run before request is processed

  const axiosJWT = axios.create();

  const api = axios.create({
    baseURL: "http://localhost:8800/api/v1",
  });

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(currentUser?.accessToken);

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("first");
        const data = await refresh();
        config.headers["authorization"] = "Bearer " + data?.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refresh = async () => {
    try {
      const { data } = await api.post("/auth/refresh", {
        token: currentUser.refreshToken,
      });

      setCurrentUser({
        ...currentUser,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(currentUser);
  // console.log(user);
  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        user,
        setUser,

        axiosJWT,
        api,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
