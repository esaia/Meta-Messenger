import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const useUser = () => {
  const {
    currentUser,
    setCurrentUser,
    user,
    setUser,

    axiosJWT,
    api,
  } = useContext(UserContext);
  return {
    currentUser,
    setCurrentUser,
    user,
    setUser,

    axiosJWT,
    api,
  };
};

export default useUser;
