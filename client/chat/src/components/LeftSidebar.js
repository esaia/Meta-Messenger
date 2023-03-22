import React, { useEffect, useState } from "react";
import { BiConversation } from "react-icons/bi";
import { BsSearch, BsArrowLeftCircleFill } from "react-icons/bs";
import useUser from "../hooks/useUser";
import Conversations from "./Conversations";
import SearchResults from "./SearchResults";

const LeftSidebar = () => {
  const { currentUser, setCurrentUser, axiosJWT, api } = useUser();
  const [isSearchInputFocused, setisSearchInputFocused] = useState(false);
  const [searchedvalue, setSearchedvalue] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState([]);

  // Logout
  const logout = async () => {
    try {
      await axiosJWT.post(
        "http://localhost:8800/api/v1/auth/logout",
        { token: currentUser.refreshToken },
        {
          headers: {
            authorization: "Bearer " + currentUser.accessToken,
          },
        }
      );

      setCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch users

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get("/users/all");
      setUsers(data);
    };
    fetchData();
  }, []);

  // filter users
  const inputChanges = (e) => {
    setSearchedvalue(e.target.value);
    console.log("sdaj");
    setfilteredUsers([...users]);

    const filter = users.filter((user) =>
      user.username.includes(searchedvalue)
    );

    setfilteredUsers(filter);
  };

  return (
    <div className=" flex flex-col justify-start items-start gap-4 flex-shrink-0 w-[450px]  border-solid border-gray-200 border-r-2  ">
      <div className="flex justify-between items-center w-full  py-5 px-4">
        <h1 className="font-bold text-3xl">chat</h1>
        <button className="w-40 h-10 bg-red-500 text-white " onClick={logout}>
          Logout
        </button>

        <BiConversation className="text-2xl cursor-pointer " />
      </div>

      <div className="w-full  px-4">
        <div className="px-3 h-10 w-full flex justify-start items-center gap-3 bg-gray-200 rounded-full  overflow-hidden  group">
          {!isSearchInputFocused ? (
            <BsSearch className="h-full " />
          ) : (
            <BsArrowLeftCircleFill
              className="h-full cursor-pointer text-2xl  "
              onClick={() => setisSearchInputFocused(false)}
            />
          )}
          <input
            type="text"
            className="w-full h-full outline-none bg-transparent"
            placeholder="Search Messenger"
            onFocus={() => setisSearchInputFocused(true)}
            value={searchedvalue}
            onChange={(e) => inputChanges(e)}
          />
        </div>
      </div>

      {/* ////////publish/////////// */}
      {/* <button
        className="p-3 m-4 bg-green-800 text-white"
        onClick={async () => {
          const { data } = await axiosJWT.get(
            "http://localhost:8800/api/v1/auth/users",
            {
              headers: {
                authorization: "Bearer " + currentUser?.accessToken,
              },
            }
          );
          console.log(data);
        }}
      >
        publish
      </button> */}

      {isSearchInputFocused ? (
        <SearchResults users={filteredUsers} />
      ) : (
        <Conversations />
      )}
    </div>
  );
};

export default LeftSidebar;

// <div
//   className={` absolute top-0 left-[54px]   z-10 bg-red-500 `}
//   ref={moduleRef}
// >
//   <div className={`  shadow-lg rounded-md   w-[400px] py-2 px-1  `}>
//     <div className="flex justify-start items-center gap-2 hover:bg-gray-100 p-3 rounded-md">
//       <div className="rounded-full bg-gray-200 p-2">
//         <FaCheck />
//       </div>
//       <p className="text-[20px]">Mark as unread</p>
//     </div>
//     <div className="flex justify-start items-center gap-2 hover:bg-gray-100 p-3 rounded-md">
//       <div className="rounded-full bg-gray-200 p-2">
//         <FaTrash />
//       </div>
//       <p className="text-[20px]">Delete chat</p>
//     </div>
//     <div className="flex justify-start items-center gap-2 hover:bg-gray-100 p-3 rounded-md">
//       <div className="rounded-full bg-gray-200 p-2">
//         <FaInfoCircle />
//       </div>
//       <p className="text-[20px]">Report</p>
//     </div>
//   </div>
// </div>;
