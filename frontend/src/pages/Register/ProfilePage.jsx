import React, { useContext, useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";


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
  const {user} = useContext(AuthContext)
  const [profile, setProfile] = useState({
    id: user._id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,

  });

  console.log(user)

  const handleEdit = () => setEditing(!editing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  
  const updateUser = async (values) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/user/profile",
        profile,{
          withCredentials: true, // Ensure cookies are included in the request
        }
      );

      console.log(response)
  
    } catch (error) {
      console.error("update failed:", error.response?.data?.message);
    }
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
              name="fname"
              value={profile.fname}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
            <input
              type="text"
              name="lname"
              value={profile.lname}
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
              onClick={updateUser}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <p><strong>First Name:</strong> {profile.fname}</p>
            <p><strong>Last Name:</strong> {profile.lname}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <button
              onClick={handleEdit}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        )}
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
