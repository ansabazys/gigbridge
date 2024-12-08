import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import avatar from "../../assets/avatar.png";
import img from "../../assets/image.jpg";
import { LuDot } from "react-icons/lu";

const gigs = [
  {
    id: 1,
    title: "Logo Design for Startup",
    description: "Looking for a minimalist logo designer for my tech startup.",
    // image: "https://via.placeholder.com/600x400",
    user: {
      name: "John Doe",
      avatar: avatar,
    },
    postedAt: "2 h",
    location: "Thrissur",
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
  },
];

const GigFeed = () => {
  const [likes, setLikes] = useState({});
  const [bookmarks, setBookmarks] = useState({});

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (id) => {
    setBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full h-[83.7svh] overflow-y-scroll  scrollbar-hide scroll-smooth p-4  ">
      <div className="flex flex-col justify-center w-full items-center divide-y">
        {gigs.map((gig) => (
          <div
            key={gig.id}
            className="w-full max-w-md bg-white  overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="flex items-center py-4">
              <img
                src={gig.user.avatar}
                alt={gig.user.name}
                className="w-12 h-12 rounded-full mr-1"
              />
              <div>
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
                <p className="text-gray-700 mt-1">{gig.description}</p>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center px-4 py-2">
                <div className="flex items-center gap-4">
                  <button className="py-[.3rem] px-[.6875rem] border rounded-md hover:bg-gray-200">
                    Apply
                  </button>

                  <button className="flex items-center gap-1">
                    <AiOutlineShareAlt size={20} />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GigFeed;
