import React from "react";

import Top from "./messenger components/Top";
import Messages from "./messenger components/Messages";
import SendInput from "./messenger components/SendInput";

const RightSection = () => {
  return (
    <div className="w-full flex justify-between flex-col ">
      <Top />
      <Messages />
      <SendInput />
    </div>
  );
};

export default RightSection;
