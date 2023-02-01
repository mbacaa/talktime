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
            className="h-14 w-14 object-cover rounded-lg border-2 border-gray-700 mx-auto"
          />
          {showUsername && (
            <div className="z-10 absolute left-0 inline-block my-1 px-2 py-1 text-sm font-medium text-white opacity-100 :hover-opacity-0 transition-opacity duration-300 bg-gray-800 rounded-lg shadow-sm ">
              {username}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default Avatar;
