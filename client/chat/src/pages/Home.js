import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import RightSection from "../components/RightSection";
import useUser from "../hooks/useUser";

const Home = () => {
  const { currentUser, user } = useUser();

  return (
    <div className="flex justify-start items-start  ">
      <div className="flex  max-w-100  w-full  rounded-md h-[100vh] ">
        <LeftSidebar />
        {user ? <RightSection /> : <h2>Please choose conversation</h2>}

        <img
          src={`http://localhost:8800/${currentUser.image}`}
          alt="profile"
          className="w-20 fixed left-0 bottom-0 rounded-full aspect-square object-cover m-3 cursor-pointer hover:animate-spin"
        />
      </div>
    </div>
  );
};

export default Home;
