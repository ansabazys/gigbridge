import React, { useContext, useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import avatar from "../../assets/avatar.png";
import { GoDot, GoDotFill } from "react-icons/go";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Accept from "../../components/Accept";

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
  const [gigs, setGigs] = useState([]);
  const [userGigs, setUserGigs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const { _id } = user;

  const getGigs = () => {
    axios
      .get("http://localhost:5000/api/gigs")
      .then((response) => {
        setGigs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGigs();
  }, [loading]);

  const handleAccept = async (gigId, applicationId) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:5000/api/gigs/${gigId}/application/${applicationId}/accept`,
        {}
      );

      console.log("Application successful:", response.data);
    } catch (error) {
      console.error(
        "Error applying to gig:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-between"></div>

      <ul className="">
        {gigs
          .filter((item) => item.user === _id) //Filter gigs owned by the logged-in user
          .map((gig) => {
            console.log(gig);
            return gig.application.map((application) => {
              console.log(application);
              return (
                <div>
                  <Accept
                    gig={gig}
                    application={application}
                    handleAccept={handleAccept}
                  />
                 
                </div> 
              );
            });

            console.log(y);

            // if(notification.application) {
            //   return (
            //
            //   )
            // }

          //   <li
          //   key={application._id}
          //   className={`flex justify-between items-center gap-3 border-b py-6`}
          // >
          //   <header>
          //     <img src={avatar} alt="" className="w-12 h-12" />
          //   </header>
          //   <div className="flex-1">
          //     <p className=" text-gray-800">{`${application.applicantName} Applied for your gig "${gig.title}"`}</p>
          //     {/* <span className="text-xs text-gray-500">{notification.time}</span> */}
          //   </div>
          //   <button className="py-[.3rem] px-[.6875rem] border rounded-md hover:bg-gray-200">
          //     View
          //   </button>

          //   {!gig.isRead && (
          //     <div className="mt-1">
          //       <GoDotFill color="red" />
          //     </div>
          //   )}
          // </li>
          })}

          
      </ul>
    </div>
  );
};

export default NotificationPage;
