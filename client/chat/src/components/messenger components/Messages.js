import React, { useEffect, useRef } from "react";

const Messages = () => {
  const myArray = new Array(11).fill();
  const lastElement = useRef();

  useEffect(() => {
    lastElement.current.scrollIntoView();
  }, [lastElement, myArray]);

  return (
    <div className="w-full h-full  overflow-y-auto scale-100">
      {/* Left Message */}
      <>
        {myArray.map((_, i) => (
          <div
            className="w-full flex justify-start items-center pl-3 z-50 "
            key={i}
          >
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="user"
              className="rounded-full aspect-square w-10 "
            />
            <div className="rounded-[28px] bg-[#e4e6eb] max-w-[70%] w-fit px-3 py-2  m-3 text-black relative group">
              <p>
                this is my text message Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Pariatur expedita provident voluptas quo earum
                blanditiis dolor eligendi cumque consequuntur sed.
              </p>
              {/* date */}
              <div
                className="rounded-sm absolute top-[50%] right-[0px] z-20 group-hover:block hidden   "
                id="data"
              >
                <div className=" fixed bg-gray-800 translate-y-[-50%] animate-fade  px-2 rounded-[10px]">
                  <p className="text-white p-[3px]">
                    {i !== 3 ? " january 11, 2023 at 8:43 AM" : " testing"}
                  </p>
                </div>
              </div>
              {/* endDate */}
            </div>
          </div>
        ))}
      </>

      {/* Right Message*/}
      <>
        {myArray.map((_, i) => (
          <div
            className="w-full flex flex-row-reverse justify-start items-center pl-3  scale-100"
            key={i}
            ref={i === myArray.length - 1 ? lastElement : null}
          >
            <div className="rounded-[28px] bg-[#0084fc] max-w-[70%] w-fit px-3 py-2  m-3 text-white relative group">
              <p>
                this is my text message Lorem asdipsum Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Assumenda dolorum
                perspiciatis aperiam nulla dolor doloremque amet quia fugiat at
                aspernatur, molestiae laborum accusantium alias voluptatibus
                sequi aliquid excepturi, voluptas minima consequuntur cum
                voluptatum, accusamus fuga corporis. Doloremque earum error cum,
                sit dolorum reiciendis repellat asperiores quidem odit soluta
                dignissimos. Delectus.
              </p>
              {/* date */}
              <div
                className="rounded-sm absolute top-[50%] left-[-230px] z-20 group-hover:block  hidden "
                id="data"
              >
                <div className=" fixed bg-gray-800 translate-y-[-50%] animate-fade  px-2 rounded-[10px]">
                  <p className="text-white p-[3px]">
                    january 11, 2023 at 8:43 AM
                  </p>
                </div>
              </div>
              {/* endDate */}
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default Messages;
