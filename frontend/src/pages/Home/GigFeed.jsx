import React, { useState } from "react";
import avatar from "../../assets/avatar.png";
import img from "../../assets/image.jpg";
import { LuDot } from "react-icons/lu";
import { GoArrowUpRight, GoClock, GoKebabHorizontal } from "react-icons/go";
import Countdown from "../../components/CountDown";
import { Link } from "react-router-dom";

const gigs = [
  {
    id: 1,
    title: "Logo Design for Startup",
    description:
      "Looking for a minimalist logo designer for my tech startup.",
    // image: "https://via.placeholder.com/600x400",
    user: {
      name: "John Doe",
      avatar: avatar,
    },
    postedAt: "2 h",
    location: "Thrissur",
    jobType: "remote"
  },
  {
    id: 2,
    title: "Build a Responsive Website",
    description:
      "Need a full-stack developer to create a responsive e-commerce website.",
    image: img,
    user: {
      name: "Jane Smith",
      avatar: avatar,
    },
    postedAt: "5 h",
    location: "Pattambi",
    jobType: "on-site"
  },
  {
    id: 3,
    title: "Social Media Marketing",
    description: "Looking for someone to manage my social media platforms.",
    image: "",
    user: {
      name: "Mark Johnson",
      avatar: avatar,
    },
    postedAt: "1 d",
    location: "Palakkad",
    jobType: "remote"
  },
  {
    id: 4,
    title: "Logo Design for Startup",
    description: "Looking for a minimalist logo designer for my tech startup.",
    image: img,
    user: {
      name: "John Doe",
      avatar: avatar,
    },
    postedAt: "2 h",
    location: "Thrissur",
    jobType: "remote"
  },
  {
    id: 5,
    title: "Social Media Marketing",
    description: "Looking for someone to manage my social media platforms.",
    image: "",
    user: {
      name: "Mark Johnson",
      avatar: avatar,
    },
    postedAt: "1 d",
    location: "Palakkad",
    jobType: "remote"
  },
];

const GigFeed = () => {
  const [likes, setLikes] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const [showMoreState, setShowMoreState] = useState(false);

  const toggleShowMore = (id) => {
    setShowMoreState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (id) => {
    setBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full pb-12 md:pb-0  scrollbar-hide scroll-smooth px-4  ">
      <div className="flex flex-col justify-center w-full  items-center divide-y">
        {gigs.map((gig) => (
          <Link to={"/home/gig-details"}
            key={gig.id}
            className="w-full max-w-md bg-white  overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="flex items-center py-4 w-full justify-between">
              <div className="flex">
                <img
                  src={gig.user.avatar}
                  alt={gig.user.name}
                  className="w-14 h-14 rounded-full mr-1"
                />

                <div className="flex flex-col  justify-center">
                  <div className="flex items-center justify-center">
                    <h4 className="">{gig.user.name}</h4>
                    <p className="text-xs flex items-center text-gray-500">
                      {" "}
                      <LuDot /> {gig.postedAt}
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
                  <span
                    className={`${
                      showMoreState[gig.id] ? "line-clamp-none" : "line-clamp-2"
                    } inline-flex`}
                  >
                    {gig.description}
                  </span>
                  
                </p>

                <div className="mt-1 flex divide-x">
                  <p className="border w-max px-2 rounded-md mr-2">{gig.jobType}</p>
                  <div className="flex items-center gap-2 pl-2">
                    <GoClock />
                    <Countdown targetDate={"2024-12-14T01:00:00"} />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <Link className="py-[.3rem] px-[.6875rem] border rounded-md hover:bg-gray-200">
                    Apply
                  </Link >

                  <button className="flex items-center gap-1">
                    <GoArrowUpRight size={20} />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GigFeed;
