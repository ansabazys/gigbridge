import React from "react";
import { FaRegBell } from "react-icons/fa";
import { FiInbox } from "react-icons/fi";

const GigDetails = () => {
  return (
    <div className="border-l h-[91svh]">
      <div className="h-20 flex items-center justify-center border-b">
        <div className="flex gap-2 border py-[.3rem] px-[.3rem] rounded-lg">
          <div className="flex gap-2  py-0.5 px-2 items-center rounded-md">
            <FaRegBell size={20} />
            <p>Notification</p>
          </div>
          <div className="flex gap-2 items-center py-0.5 px-2 bg-gray-200 rounded-md">
            <FiInbox size={20} />
            <p>Inbox</p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default GigDetails;
