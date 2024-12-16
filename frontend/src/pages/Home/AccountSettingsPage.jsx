import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

const AccountSettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "English",
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLanguageChange = (e) => {
    setSettings((prev) => ({ ...prev, language: e.target.value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Account Settings</h1>
        <IoSettingsOutline size={28} className="text-gray-600" />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-medium mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Enable Notifications</span>
            <button
              onClick={() => handleToggle("notifications")}
              className={`py-2 px-4 rounded-lg ${
                settings.notifications ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {settings.notifications ? "On" : "Off"}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span>Dark Mode</span>
            <button
              onClick={() => handleToggle("darkMode")}
              className={`py-2 px-4 rounded-lg ${
                settings.darkMode ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {settings.darkMode ? "On" : "Off"}
            </button>
          </div>
          <div className="flex flex-col">
            <label htmlFor="language" className="mb-2">Preferred Language</label>
            <select
              id="language"
              value={settings.language}
              onChange={handleLanguageChange}
              className="border p-2 rounded-lg"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-medium mb-4">Security</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Change Password</span>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Update
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span>Two-Factor Authentication</span>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
