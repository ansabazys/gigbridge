import React from "react";
import { GoArrowLeft, GoArrowUpRight } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import avatar from "../assets/avatar.png";
import img from "../assets/image.jpg";

const Header = () => {

    const { id } = useParams(); // Get the gig id from the URL parameters

    const gig = {
          id: id,
          title: "Logo Design for Startup",
          description:
            "Looking for a minimalist logo designer for my tech startup. The project requires skills in Adobe Illustrator, Sketch, and Figma. Looking for a minimalist logo designer for my tech startup. The project requires skills in Adobe Illustrator, Sketch, and Figma.",
          image: img,
          user: {
            name: "John Doe",
            avatar: avatar,
          },
          postedAt: "2 h",
          location: "Thrissur",
          jobType: "remote",
          targetDate: "2024-12-14T01:00:00",
        }

  return (
    <header className="h-20 px-4 border-b hidden md:flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to={"/home"}>
          <GoArrowLeft size={20} />
        </Link>

        {/* Header */}
        <div className="flex items-center py-4 w-full justify-between">
          <div className="flex items-center">
            <img
              src={avatar}
              alt={gig.name}
              className="w-12 h-12 rounded-full mr-1"
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
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center py-2">
        <div className="flex items-center gap-4">
          <Link className="py-[.3rem] px-[.6875rem] border rounded-md hover:bg-gray-200">
            Apply
          </Link>

          <button className="flex items-center gap-1">
            <GoArrowUpRight size={20} />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
