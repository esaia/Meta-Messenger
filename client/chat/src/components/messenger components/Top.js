import React from "react";
import { BsFillCameraVideoFill, BsTelephoneFill } from "react-icons/bs";
import useUser from "../../hooks/useUser";

const Top = () => {
  const { user } = useUser();
  return (
    <>
      {user && (
        <div className="w-full bg-white border-b-2 border-gray-200 p-3 flex justify-between items-center  shadow-sm">
          <div className="flex justify-start items-center gap-4">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="user"
              className="rounded-full aspect-square w-11"
            />
            <h2 className="font-bold text-xl">{user.username}</h2>
          </div>

          <div className="flex gap-4">
            <BsFillCameraVideoFill className="text-2xl cursor-pointer text-[#0084fc]" />
            <BsTelephoneFill className="text-2xl cursor-pointer text-[#0084fc]" />
          </div>
        </div>
      )}
    </>
  );
};

export default Top;
