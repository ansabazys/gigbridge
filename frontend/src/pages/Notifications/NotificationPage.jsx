import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import avatar from "../../assets/avatar.png";
import { GoDot, GoDotFill } from "react-icons/go";

const notifications = [
  {
    id: 1,
    message:
      "Your application for 'Logo Design for Startup' has been accepted!",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: 2,
    message: "John Doe completed the gig: 'Build a Responsive Website'.",
    time: "1 day ago",
    isRead: true,
  },
  {
    id: 3,
    message: "New gig posted: 'Social Media Marketing'. Check it out now!",
    time: "3 days ago",
    isRead: false,
  },
];

const NotificationPage = () => {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-between"></div>

      <ul className="">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`flex justify-between gap-3 items-start border-b py-6
              
            `}
          >
            <header>
              <img src={avatar} alt="" className="w-12 h-12" />
            </header>
            <div className="flex-1">
              <p className=" text-gray-800">{notification.message}</p>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>

            {!notification.isRead && (
              <div className="mt-1">
                <GoDotFill color="red" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPage;
