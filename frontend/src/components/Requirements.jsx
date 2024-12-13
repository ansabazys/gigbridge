import React from "react";

const Requirements = ({ qualifications }) => {
  return (
    <div className="">
      <h2 className="text-lg font-bold mb-3">Requirements</h2>
      <ul className="list-disc list-inside space-y-2">
        {qualifications.map((item, index) => (
          <li key={index} className="text-gray-700 pl-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Requirements;