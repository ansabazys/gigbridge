import React, { useEffect, useState } from "react";
import {
  IoCheckmarkOutline,
  IoChevronDownSharp,
  IoChevronUp,
  IoLocationOutline,
  IoSearch,
} from "react-icons/io5";
import { PiPlusCircleBold } from "react-icons/pi";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Filter from "./Filter";

const SearchBar = () => {
  const [categoryDrop, setCategoryDrop] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [locationDrop, setLocationDrop] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [jobTypeDrop, setJobTypeDrop] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState("Job type");

  const Categories = ["Grapic design", "Programming", "Marketing", "Writing"];
  const JobTypes = ["Freelance", "Part-time", "Full-time", "Contract"];
  const Locations = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "San Francisco",
    "Miami",
    "Dallas",
    "Seattle",
    "Boston",
    "Atlanta",
    "Denver",
    "Austin",
    "San Diego",
    "Washington, D.C.",
    "Las Vegas",
    "Phoenix",
    "Philadelphia",
    "Portland",
    "San Jose",
    "Orlando",
  ];

  const handleCategory = (category) => {
    setSelectedCategory((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item != category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleClickOutside = () => {
    setCategoryDrop(false)
    setJobTypeDrop(false)
    setLocationDrop(false)
  }

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  },[])

  const handleComponentClick = (e) => {
    e.stopPropagation()
  }

  console.log(selectedCategory);
  return (
    <div className="h-20 border-b flex items-center justify-between px-5 w-full">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex justify-center gap-3 items-center"
      >
        <div className="flex gap-1 py-[.3rem] px-[.6875rem] border justify-between rounded-lg items-center w-full">
          <IoSearch />
          <input type="text" placeholder="Search" className="  outline-none" />
        </div>

        <div className="hidden lg:block" onClick={handleComponentClick}>
          <div
            className="border-dashed border-2 py-[.25rem] px-2 w-max flex justify-center items-center gap-1 rounded-lg "
            onClick={() => {
              setCategoryDrop((prev) => !prev),
                jobTypeDrop && setJobTypeDrop((prev) => !prev),
                locationDrop && setLocationDrop((prev) => !prev)
            }}
          >
            <PiPlusCircleBold size={20} />
            <button className="flex divide-x">
              <p className="pr-2">Category</p>
              <div className="divide-x">
                {selectedCategory.length < 2 ? (
                  selectedCategory.map((dt) => (
                    <span className="px-2 ml-2 rounded-md bg-gray-200">
                      {dt}
                    </span>
                  ))
                ) : (
                  <p className="ml-2 bg-gray-200 px-2 rounded-md">{`${selectedCategory.length} Selected`}</p>
                )}
              </div>
            </button>
          </div>

          {categoryDrop && (
            <div className="absolute p-1 mt-1 rounded-lg flex flex-col justify-center items-center gap-2 bg-white border">
              {Categories.map((category) => (
                <button
                  className={` rounded-lg py-[.25rem] flex text-start w-full px-2 gap-2 hover:bg-slate-100 items-center`}
                  onClick={() => handleCategory(category)}
                >
                  {selectedCategory.includes(category) ? (
                    <ImCheckboxChecked />
                  ) : (
                    <ImCheckboxUnchecked />
                  )}
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Location */}

        <div className="hidden lg:block" onClick={handleComponentClick}>
          <div
            className="border-dashed border-2 py-[.25rem] px-2 w-max flex justify-center items-center gap-1 rounded-lg "
            onClick={() => {
              setLocationDrop((prev) => !prev),
                jobTypeDrop && setJobTypeDrop((prev) => !prev),
                categoryDrop && setCategoryDrop((prev) => !prev);
            }}
          >
            <IoLocationOutline size={20} />
            <button>{selectedLocation ? selectedLocation : "Location"}</button>
          </div>

          {locationDrop && (
            <div className="absolute p-1 mt-1 rounded-lg flex flex-col justify-center items-center gap-2 bg-white border ">
              <div className=" border-b flex items-center py-[.25rem] px-[.6875rem]">
                <IoSearch />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search"
                  className="py-[.25rem] px-[.6875rem] outline-none"
                />
              </div>
              <div className="overflow-auto scrollbar-hide  h-60 w-full">
                {Locations.map((location) => (
                  <button
                    className={` rounded-lg py-[.25rem] flex text-start w-full px-2 gap-2 hover:bg-slate-100 items-center`}
                    onClick={() => {
                      setSelectedLocation(
                        location,
                        setLocationDrop((prev) => !prev)
                      ),
                        jobTypeDrop && setJobTypeDrop((prev) => !prev),
                        categoryDrop && setCategoryDrop((prev) => !prev);
                    }}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Job Type */}

        <div className="hidden lg:block" onClick={handleComponentClick}>
          <div
            className="border py-[.3rem] px-[.6875rem] w-max flex justify-center items-center gap-3  rounded-lg "
            onClick={() => {
              setJobTypeDrop((prev) => !prev),
                categoryDrop && setCategoryDrop((prev) => !prev),
                locationDrop && setLocationDrop((prev) => !prev);
            }}
          >
            <button>{selectedJobType}</button>
            {jobTypeDrop ? <IoChevronUp /> : <IoChevronDownSharp />}
          </div>

          {jobTypeDrop && (
            <div className="absolute p-1 mt-1 rounded-lg flex flex-col justify-center items-center gap-2 bg-white border">
              {JobTypes.map((item) => (
                <button
                  className={` rounded-lg py-[.25rem] flex text-start w-full px-4 justify-between items-center`}
                  onClick={() => {
                    setSelectedJobType(
                      item,
                      setJobTypeDrop((prev) => !prev)
                    );
                  }}
                >
                  {item}
                  {selectedCategory === item && <IoCheckmarkOutline />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter */}
        <div className="hidden">
          <Filter />
        </div>
      </form>
      <HiOutlineDotsVertical />
    </div>
  );
};

export default SearchBar;
