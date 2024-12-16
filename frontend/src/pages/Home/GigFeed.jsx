import React, { useEffect, useState } from "react";
import avatar from "../../assets/avatar.png";
import img from "../../assets/image.jpg";
import { LuDot } from "react-icons/lu";
import { GoArrowUpRight, GoClock, GoKebabHorizontal } from "react-icons/go";
import Countdown from "../../components/CountDown";
import { Link } from "react-router-dom";
import axios from "axios";

// const gigs = [
//   {
//     id: 1,
//     title: "Logo Design for Startup",
//     description:
//       "Looking for a minimalist logo designer for my tech startup.",
//     // image: "https://via.placeholder.com/600x400",
//     user: {
//       name: "John Doe",
//       avatar: avatar,
//     },
//     postedAt: "2 h",
//     location: "Thrissur",
//     jobType: "remote"
//   },
//   {
//     id: 2,
//     title: "Build a Responsive Website",
//     description:
//       "Need a full-stack developer to create a responsive e-commerce website.",
//     image: img,
//     user: {
//       name: "Jane Smith",
//       avatar: avatar,
//     },
//     postedAt: "5 h",
//     location: "Pattambi",
//     jobType: "on-site"
//   },
//   {
//     id: 3,
//     title: "Social Media Marketing",
//     description: "Looking for someone to manage my social media platforms.",
//     image: "",
//     user: {
//       name: "Mark Johnson",
//       avatar: avatar,
//     },
//     postedAt: "1 d",
//     location: "Palakkad",
//     jobType: "remote"
//   },
//   {
//     id: 4,
//     title: "Logo Design for Startup",
//     description: "Looking for a minimalist logo designer for my tech startup.",
//     image: img,
//     user: {
//       name: "John Doe",
//       avatar: avatar,
//     },
//     postedAt: "2 h",
//     location: "Thrissur",
//     jobType: "remote"
//   },
//   {
//     id: 5,
//     title: "Social Media Marketing",
//     description: "Looking for someone to manage my social media platforms.",
//     image: "",
//     user: {
//       name: "Mark Johnson",
//       avatar: avatar,
//     },
//     postedAt: "1 d",
//     location: "Palakkad",
//     jobType: "remote"
//   },
// ];

const GigFeed = ({ gig }) => {
  const [likes, setLikes] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const [showMoreState, setShowMoreState] = useState(false);

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState([]);
  const { fname, lname } = user;

  function timeAgo(isoString) {
    const currentTime = new Date();
    const postTime = new Date(isoString);
    const timeDifference = currentTime - postTime; // Difference in milliseconds

    const seconds = Math.floor(timeDifference / 1000); // Convert to seconds
    const minutes = Math.floor(seconds / 60); // Convert to minutes
    const hours = Math.floor(minutes / 60); // Convert to hours
    const days = Math.floor(hours / 24); // Convert to days

    if (days > 0) {
      return `${days}d`; // If it's more than a day
    }
    if (hours > 0) {
      return `${hours}h`; // If it's more than an hour
    }
    if (minutes > 0) {
      return `${minutes}m`; // If it's more than a minute
    }
    return `${seconds}s`; // If it's less than a minute
  }

 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/profile/${gig.user}`
        );
        setUser(response.data); // Set user data
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Error fetching user profile");
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchUserProfile(); // Fetch user profile by ID
  }, [gig.user]);


  return (
    <div className="w-full  scrollbar-hide scroll-smooth px-5 ">
      <div className="flex flex-col justify-center w-full  items-center divide-y">
        <Link
          to={"/home/gig-details"}
          key={Math.random()}
          className="w-full max-w-md pb-4 h-full  bg-white  overflow-hidden "
        >
          {/* Header */}
          <div className="flex items-center py-4 w-full justify-between">
            <div className="flex">
              <img
                src={avatar}
                alt="avatar"
                className="w-14 h-14 rounded-full mr-1"
              />

              <div className="flex flex-col  justify-center">
                <div className="flex items-center justify-center">
                  <h4 className="">
                    {fname} {lname}
                  </h4>
                  <p className="text-xs flex items-center text-gray-500">
                    {" "}
                    <LuDot /> {timeAgo(gig.createdAt)}
                  </p>
                </div>
                <p className="text-sm text-gray-500">{gig.location}</p>
              </div>
            </div>
            <div className="cursor-pointer">
              <GoKebabHorizontal />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {/* Image */}
            {gig.image ? (
              <img
                src={gig.image}
                alt={gig.title}
                className="w-full h-64 object-cover"
              />
            ) : null}

            {/* Content */}
            <div className="">
              <h3 className="font-medium text-lg">{gig.title}</h3>

              <p className="text-gray-700 inline">
                <span className="line-clamp-2">{gig.description}</span>
              </p>

              <div className="mt-1 flex divide-x">
                <p className="border w-max px-2 rounded-md mr-2">
                  {gig.jobType}
                </p>
                <div className="flex items-center gap-2 pl-2">
                  <GoClock />
                  <Countdown targetDate={gig.deadline} />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center gap-4">
                <button className="py-[.3rem] px-[.6875rem] border rounded-md hover:bg-gray-200">
                  Apply
                </button>

                <button className="flex items-center gap-1">
                  <GoArrowUpRight size={20} />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GigFeed;
