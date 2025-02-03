import React, { useEffect, useState } from "react";
import avatar from "../../assets/avatar.png";
import img from "../../assets/image.jpg";
import { LuDot } from "react-icons/lu";
import { GoArrowUpRight, GoClock, GoKebabHorizontal } from "react-icons/go";
import Countdown from "../../components/CountDown";
import { Link } from "react-router-dom";
import axios from "axios";
import { GoTrash } from "react-icons/go";

const GigFeed = ({ gig, handleDelete, isGigUser, isApplied }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const { fname, lname, _id } = user;


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

  console.log(gig)

  return (
    <div className="w-full  scrollbar-hide scroll-smooth px-5 py-4 ">
      <div className="flex flex-col justify-center w-full  items-center divide-y ">
        <div
          // to={"/home/gig-details"}
          key={Math.random()}
          className="w-full max-w-md  h-full  bg-white  overflow-hidden border-b border-black/20 pb-4"
        >
          {/* Header */}
          <div className="flex items-center py-0 w-full justify-between">
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
              {isGigUser ? (
                <button
                  className="border px-2 py-1 rounded-md"
                  onClick={() => handleDelete(gig._id)}
                >
                  <GoTrash />
                </button>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {/* Image */}

            <img
              src={gig.image}
              alt={gig.title}
              className="w-full h-64 object-cover rounded-2xl"
            />

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
                {/* <div className="flex items-center gap-2 pl-2">
                  <GoClock />
                  <Countdown targetDate={gig.deadline} />
                </div> */}

                <div className="pl-2">
                  <span>${gig.budget}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center py-0">
              <div className="flex items-center gap-4">
                {/* { isApplied ? (
                  <p className="py-[.3rem] px-[.6875rem] border rounded-md hover:bg-gray-200">
                    Applied
                  </p>
                ) : (
                  <Link
                    className="py-[.3rem] px-[.6875rem] border rounded-md hover:bg-gray-200"
                    to={`/home/apply/${gig._id}`}
                  >
                    Apply
                  </Link>
                )} */}

                {isGigUser ? null : isApplied ? (
                  <p className="py-[.3rem] px-[.6875rem] border rounded-md hover:bg-gray-200">
                    Applied
                  </p>
                ) : (
                  <Link
                    className="py-[.3rem] px-[.6875rem] border rounded-md hover:bg-gray-200"
                    to={`/home/apply/${gig._id}`}
                  >
                    Apply
                  </Link>
                )}
               

                <button className="flex items-center gap-1">
                  <GoArrowUpRight size={20} />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigFeed;
