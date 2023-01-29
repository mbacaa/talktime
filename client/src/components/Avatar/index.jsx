import React from "react";
import { useState } from "react";
import defaultPicture from "../../constants/defaultPicture";
import { useNavigate } from "react-router-dom";

const Avatar = ({ username, picture }) => {
  const [showUsername, setShowUsername] = useState(false);
  const pictureUrl =
    `http://localhost:4000/assets/${picture}` || defaultPicture;
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate(`/profile/${username}`);
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div
          className="relative "
          onMouseEnter={() => setShowUsername(true)}
          onMouseLeave={() => setShowUsername(false)}
        >
          <img
            src={pictureUrl}
            alt="User Avatar"
            className="w-14 h-14 object-fill rounded-lg border-2 border-gray-300 hover:border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-3"
          />
          {showUsername && (
            <div className="z-10 inline-block my-2 px-2 py-1 text-sm font-medium text-white opacity-100 :hover-opacity-0 transition-opacity duration-300 bg-gray-800 rounded-lg shadow-sm ">
              {username}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default Avatar;
