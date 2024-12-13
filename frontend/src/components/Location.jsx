import React from "react";

const Location = ({ location, address, notes }) => {
  return (
    <div className="">
      <h2 className="text-lg font-bold mb-3">Location Details</h2>
      <table className="table-auto w-full">
        <tbody>
          <tr>
            <td className="font-semibold pr-2 text-gray-700">Location:</td>
            <td className="text-gray-700">{location}</td>
          </tr>
          <tr>
            <td className="font-semibold pr-2 text-gray-700">Address:</td>
            <td className="text-gray-700">{address}</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-4 font-semibold text-gray-700">Notes:</p>
      <ul className="list-disc list-inside space-y-2">
        {notes.map((note, index) => (
          <li key={index} className="text-gray-700 pl-2">
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Location;