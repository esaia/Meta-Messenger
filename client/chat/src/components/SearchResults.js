import React, { useEffect } from "react";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const SearchResults = ({ users }) => {
  const { api, axiosJWT, currentUser, user, setUser } = useUser();

  const navigate = useNavigate();

  const createConversation = (userParam) => {
    const { email, password, username, image, _id } = userParam;
    const myUser = { email, password, username, image, id: _id };

    setUser(myUser);

    navigate(`/${user._id}`);
    axiosJWT.post(
      "http://localhost:8800/api/v1/users/userconversations",
      {
        user: myUser,
      },
      {
        headers: {
          authorization: "Bearer " + currentUser?.accessToken,
        },
      }
    );
  };

  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-auto scale-100 px-4 ">
      <p className="px-3 font-bold mb-2">Search Results:</p>
      {users.map((user, i) => (
        <div
          className="flex justify-between items-center w-full px-3 py-5 cursor-pointer rounded-[15px]  relative hover:bg-gray-200"
          key={i}
          onClick={() => createConversation(user)}
        >
          <div className="flex justify-start items-center gap-3">
            <img
              src={`http://localhost:8800/${user.image}`}
              alt="user"
              className="rounded-full aspect-square w-16 object-cover"
            />
            <div>
              <h3>{user.username}</h3>
              <p className="text-gray-500">last message</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
