import React, { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

const transactions = [
  {
    id: 1,
    gigTitle: "Logo Design for Startup",
    date: "2024-12-10",
    amount: "$150",
    status: "Completed",
  },
  {
    id: 2,
    gigTitle: "Build a Responsive Website",
    date: "2024-12-08",
    amount: "$500",
    status: "Pending",
  },
];

const myGigs = [
  {
    id: 1,
    title: "Social Media Marketing",
    postedOn: "2024-12-05",
    applicants: 10,
    status: "Open",
  },
  {
    id: 2,
    title: "Mobile App Development",
    postedOn: "2024-12-01",
    applicants: 5,
    status: "Closed",
  },
];

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    location: "New York, USA",
  });

  const handleEdit = () => setEditing(!editing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => setEditing(false);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <IoPersonCircleOutline size={28} className="text-gray-600" />
      </div>

      {/* Profile Information */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-medium mb-4">Profile Information</h2>
        {editing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Location:</strong> {profile.location}</p>
            <button
              onClick={handleEdit}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Transactions */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-medium mb-4">Transactions</h2>
        <ul className="space-y-4">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between items-center border p-4 rounded-lg">
              <div>
                <p className="font-medium">{transaction.gigTitle}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-500">{transaction.amount}</p>
                <p className={`text-sm ${transaction.status === "Completed" ? "text-green-500" : "text-yellow-500"}`}>{transaction.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* My Gigs */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-medium mb-4">My Gigs</h2>
        <ul className="space-y-4">
          {myGigs.map((gig) => (
            <li key={gig.id} className="flex justify-between items-center border p-4 rounded-lg">
              <div>
                <p className="font-medium">{gig.title}</p>
                <p className="text-sm text-gray-500">Posted on: {gig.postedOn}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Applicants: {gig.applicants}</p>
                <p className={`text-sm ${gig.status === "Open" ? "text-green-500" : "text-red-500"}`}>{gig.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
