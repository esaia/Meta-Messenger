import React, { useEffect, useRef, useState } from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import EmojiPicker from "emoji-picker-react";
import TextareaAutosize from "react-textarea-autosize";
import useUser from "../../hooks/useUser";

const SendInput = () => {
  const [showEmoji, setshowEmoji] = useState(false);
  const [message, setmessage] = useState("");
  const { axiosJWT, user, currentUser } = useUser();

  const handleClickOutside = (e) => {
    if (emojidiv.current && !emojidiv.current.contains(e.target)) {
      setshowEmoji(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
  const emojidiv = useRef();

  const sendMessage = async () => {
    const data = await axiosJWT.post(
      "http://localhost:8800/api/v1/users/addmessage",
      {
        user,
        message,
      },
      {
        headers: {
          authorization: "Bearer " + currentUser?.accessToken,
        },
      }
    );
  };

  return (
    <div className="w-full  py-2 px-3 flex items-center justify-between">
      <div className="w-full bg-gray-100 rounded-[30px] gap-10  flex justify-start items-center px-3">
        <TextareaAutosize
          autoFocus
          maxRows={4}
          type="text"
          className="outline-none w-full p-2 bg-transparent rounded-[30px]   h-auto resize-none "
          placeholder="Send a message"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
        />

        <BsFillEmojiSmileFill
          className="text-2xl cursor-pointer text-[#0084fc]"
          onClick={() => setshowEmoji(!showEmoji)}
        />

        {showEmoji && (
          <div
            className="absolute bottom-16 right-16  w-[300px] h-[400px]"
            ref={emojidiv}
          >
            <EmojiPicker
              width="100%"
              height="100%"
              onEmojiClick={(emoji) => {
                setmessage((value) => `${value}${emoji.emoji}`);
              }}
            />
          </div>
        )}
      </div>
      <div
        className="w-16 flex justify-center items-center text-[#0084fc] "
        onClick={sendMessage}
      >
        <AiOutlineSend className="text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default SendInput;
