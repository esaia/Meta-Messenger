import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaCheck, FaTrash, FaInfoCircle } from "react-icons/fa";
import useUser from "../hooks/useUser";
import { useParams } from "react-router-dom";

const Conversations = () => {
  const { api, axiosJWT, currentUser, user } = useUser();

  const [conversations, setConversations] = useState([]);

  const [showThreeDot, setShowThreeDot] = useState(-1);
  const [showModal, setShowModal] = useState(-1);
  const [yPozition, setyPozition] = useState(0);

  const moduleRef = useRef();
  let { id } = useParams();

  // const threeDotRefs = React.useMemo(
  //   () => conversations?.map(() => React.createRef()),
  //   [conversations?.join(",")]
  // );

  useEffect(() => {
    const fetchConversation = async () => {
      const { data } = await axiosJWT.get(
        "http://localhost:8800/api/v1/users/userconversations",
        {
          headers: {
            authorization: "Bearer " + currentUser?.accessToken,
          },
        }
      );

      setConversations(data.users);
    };

    fetchConversation();
  }, []);

  // Module Click handlers
  const handleClickOutside = (e) => {
    if (moduleRef.current && !moduleRef.current.contains(e.target)) {
      setShowModal(-1);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  // conversation.username === user.username
  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-auto scale-100 ">
      {conversations?.map((conversation, i) => (
        <div
          className={`flex justify-between items-center w-full pl-3 py-5 cursor-pointer rounded-[15px]  relative
             ${showModal === i || (showThreeDot === i && " bg-gray-200")}  
               ${conversation?.username === user?.username && " bg-gray-200"}`}
          key={i}
          onMouseEnter={() => setShowThreeDot(i)}
          onMouseLeave={() => setShowThreeDot(-1)}
        >
          <div className="flex justify-start items-center gap-3">
            <img
              src={`http://localhost:8800/${conversation?.image}`}
              alt="user"
              className="rounded-full aspect-square w-16"
            />
            <div>
              <h3>{conversation?.username}</h3>
              <p className="text-gray-500">last message</p>
            </div>
          </div>

          {(showThreeDot === i || showModal === i) && (
            <div
              className="  mr-5  bg-white hover:bg-gray-100 rounded-full p-2   shadow-md  relative"
              onClick={() => {
                setShowModal(i);
                // const y = threeDotRefs[i].current.getBoundingClientRect().y;
                // setyPozition(Math.round(y));
              }}
              // ref={threeDotRefs[i]}
            >
              <div className="w-full h-full ">
                <BsThreeDots className="text-[25px]" />
                {/* module */}
                {showModal === i && (
                  <div
                    className={` absolute top-12 right-3   z-10 bg-gray-50 shadow-lg rounded-md   w-[300px] py-2 px-1 `}
                    ref={moduleRef}
                  >
                    <div className="flex justify-start items-center gap-2 hover:bg-gray-100 p-3 rounded-md">
                      <div className="rounded-full bg-gray-200 p-2">
                        <FaCheck />
                      </div>
                      <p className="text-[20px]">Mark as unread</p>
                    </div>
                    <div className="flex justify-start items-center gap-2 hover:bg-gray-100 p-3 rounded-md">
                      <div className="rounded-full bg-gray-200 p-2">
                        <FaTrash />
                      </div>
                      <p className="text-[20px]">Delete chat</p>
                    </div>
                    <div className="flex justify-start items-center gap-2 hover:bg-gray-100 p-3 rounded-md">
                      <div className="rounded-full bg-gray-200 p-2">
                        <FaInfoCircle />
                      </div>
                      <p className="text-[20px]">Report</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Conversations;
