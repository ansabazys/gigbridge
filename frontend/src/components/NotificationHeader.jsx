import React from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { RiCheckDoubleFill } from "react-icons/ri";

const NotificationHeader = () => {
  return (
    <header className="md:h-20 h-10 md:border-b flex justify-between items-center md:px-5 px-2">
      <div className="flex gap-3  py-1 px-1.5 rounded-md">
        <button className="py-0.5 px-[.6875rem] rounded-md flex items-center gap-1">
          <ImCheckboxUnchecked />
          <p>All</p>
        </button>
        <button className="py-0.5 px-[.6875rem] rounded-md flex items-center gap-1">
          <ImCheckboxUnchecked />
          <p>Transactions</p>
        </button>
        <button className="py-0.5 px-[.6875rem] rounded-md flex items-center gap-1">
          <ImCheckboxUnchecked />
          <p>Gig</p>
        </button>

        
      </div>
      <div className="pr-3">
        <p className="text-sm underline hidden md:block">Mark all as read</p>
        <RiCheckDoubleFill className="md:hidden" size={20} />

      </div>
    </header>
  );
};

export default NotificationHeader;
