import React, { useEffect, useState } from "react";
import avatar from "../../assets/avatar.png";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import { Link } from "react-router-dom";

const NotificationPage = ({ userId, gigs }) => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications for the user
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/notification/${userId}`
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const checkIfApplied = (gigId) => {
    const gig = gigs.find((g) => g._id === gigId);
    return gig?.application.some((app) => app.applicantId === userId);
  };

  const checkApplicationStatus = (gigId, applicationId) => {
    const gig = gigs.find((g) => g._id === gigId);
    const application = gig?.application.find(
      (app) => app._id === applicationId
    );
    return application?.status || null;
  };

  const handleAccept = async (gigId, applicationId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/gigs/${gigId}/applications/${applicationId}/accept`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <ul>
        {notifications.map((item) => {
          const isApplied = checkIfApplied(item.gigId);
          const isAccepted = checkApplicationStatus(
            item.gigId,
            item.applicationId
          );
          console.log(user)
          return (
            <li
              key={item._id}
              className="flex justify-between items-center gap-3 border-b py-6"
            >
              {/* Notification details */}
              <header>
                <img src={avatar} alt="" className="w-12 h-12" />
              </header>
              <div className="flex-1">
                <p className="text-gray-800">{item.message}</p>
              </div>

              {/* Dynamic action buttons */}
              {item.message.includes("A new gig") && !isApplied && (
                <Link
                  className="py-[.3rem] px-[.6875rem] border rounded-md hover:bg-gray-200"
                  to={`/home/apply/${item.gigId}`}
                >
                  Apply
                </Link>
              )}
              {item.message.includes("A new gig") && isApplied && (
                <Link
                  className="py-[.3rem] px-[.6875rem] border rounded-md hover:bg-gray-200"
                  to={`/home/apply/${item.gigId}`}
                >
                  Applied
                </Link>
              )}

              {item.message.includes("applied") ? (
                isAccepted === "accepted" ? (
                  <>
                  <button
                    className="py-[.3rem] px-[.6875rem] border rounded-md bg-green-200 text-green-800"
                  >
                    Accepted
                  </button>
                  <Link
                        className="py-[.3rem] px-[.6875rem] border rounded-md hover:bg-gray-200"
                        to={`/home/messages/${item.userId}`}
                  >
                    Message
                  </Link>
                  </>
                ) : (
                  <button
                    className="py-[.3rem] px-[.6875rem] border rounded-md hover:bg-gray-200"
                    onClick={() => handleAccept(item.gigId, item.applicationId)}
                  >
                    Accept
                  </button>
                )
              ) : null}

              {item.message.includes("accepted") && (
                <Link
                  className="py-[.3rem] px-[.6875rem] border rounded-md hover:bg-gray-200"
                  to={`/home/start/${item.gigId}`}
                >
                  Message
                </Link>
              )}

              {/* Unread notification indicator */}
              {!item.isRead && (
                <div className="mt-1">
                  <GoDotFill color="red" />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotificationPage;
