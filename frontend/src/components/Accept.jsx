import React from "react";
import avatar from "../assets/avatar.png";
import { IoNotificationsOutline } from "react-icons/io5";

import { GoDot, GoDotFill } from "react-icons/go";
const Accept = ({ gig, application, handleAccept }) => {
  console.log(gig.status);
  return (
    <li
      key={application._id}
      className={`flex justify-between items-center gap-3 border-b py-6`}
    >
      <header>
        <img src={avatar} alt="" className="w-12 h-12" />
      </header>
      <div className="flex-1">
        <p className=" text-gray-800">{`${application.applicantName} Applied for your gig "${gig.title}"`}</p>
        {/* <span className="text-xs text-gray-500">{notification.time}</span> */}
      </div>
      <button className="py-[.3rem] px-[.6875rem] border rounded-md hover:bg-gray-200">
        View
      </button>
      {gig.status === "open" ? (
        <button
          className="py-[.3rem] px-[.6875rem] border rounded-md hover:bg-gray-200"
          onClick={() => handleAccept(gig._id, application._id)}
        >
          Accept
        </button>
      ) : (
        <button className="py-[.3rem] px-[.6875rem] bg-green-200 border rounded-md hover:bg-gray-200">
          in-progress
        </button>
      )}

      {!gig.isRead && (
        <div className="mt-1">
          <GoDotFill color="red" />
        </div>
      )}
    </li>
  );
};

export default Accept;
