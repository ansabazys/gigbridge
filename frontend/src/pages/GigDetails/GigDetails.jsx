// src/pages/GigDetails.js
import React from "react";
import { Link, useParams } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import img from "../../assets/image.jpg";
import { GoArrowLeft, GoArrowUpRight, GoClock } from "react-icons/go";
import Countdown from "../../components/CountDown";

const GigDetails = () => {
  const { id } = useParams(); // Get the gig id from the URL parameters

  // Find the gig based on the id (in a real app, this would be fetched from a server)
  const gig = {
    id: id,
    title: "Logo Design for Startup",
    description:
      "Looking for a minimalist logo designer for my tech startup. The project requires skills in Adobe Illustrator, Sketch, and Figma.",
    image: img,
    user: {
      name: "John Doe",
      avatar: avatar,
    },
    postedAt: "2 h",
    location: "Thrissur",
    jobType: "remote",
    targetDate: "2024-12-14T01:00:00",
  };

  return (
    <section className="h-full w-full ite flex flex-col bg-purple-700  justify-center">
      <header className="h-20 border-b flex items-center px-4">
        <Link to={"/home"} >
          <GoArrowLeft size={30} />
        </Link>
      </header>
      <main className="w-full flex h-full justify-center">
        <div className="bg-white h-full p-6 max-w-2xl">
          {/* Header */}
          <div className="flex items-center mb-6 ">
            <img
              src={gig.user.avatar}
              alt={gig.user.name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">{gig.user.name}</h2>
              <p className="text-sm text-gray-500">{gig.location}</p>
              <p className="text-xs text-gray-400">
                <GoClock size={14} className="inline mr-1" />
                {gig.postedAt}
              </p>
            </div>
          </div>

          {/* Gig Title and Description */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold mb-2">{gig.title}</h3>
            <p className="text-gray-700">{gig.description}</p>
          </div>

          {/* Gig Image */}
          {gig.image && (
            <img
              src={gig.image}
              alt={gig.title}
              className="w-full h-64 object-cover mb-6 rounded-md"
            />
          )}

          {/* Countdown */}
          <div className="flex items-center gap-2 mb-4">
            <GoClock />
            <Countdown targetDate={gig.targetDate} />
          </div>

          {/* Job Type */}
          <p className="inline-block py-1 px-3 bg-gray-200 rounded-md text-sm">
            {gig.jobType}
          </p>

          {/* Actions */}
          <div className="flex justify-between items-center mt-6">
            <button className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Apply
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
              <GoArrowUpRight size={20} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default GigDetails;
