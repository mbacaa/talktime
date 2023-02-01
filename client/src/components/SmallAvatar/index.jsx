import React from "react";
import { useState } from "react";
import defaultPicture from "../../constants/defaultPicture";
import { useNavigate } from "react-router-dom";

const SmallAvatar = ({ username, picture, badge, handleConv, friendId }) => {
  const [showUsername, setShowUsername] = useState(false);
  const pictureUrl =
    `http://localhost:4000/assets/${picture}` || defaultPicture;
  const navigate = useNavigate();

  return (
    <div>
      {badge ? (
        <button
          onClick={() => {
            handleConv(friendId);
          }}
        >
          <div className="flex flex-col items-center justify-center mb-2">
            <div
              className="relative"
              onMouseEnter={() => setShowUsername(true)}
              onMouseLeave={() => setShowUsername(false)}
            >
              <img
                src={pictureUrl}
                alt="User Avatar"
                className="h-14 w-14 object-cover rounded-lg border-2 border-gray-700 mx-auto"
              />
              <div className="absolute bottom-0 left-9 transform translate-y-1/4 w-3.5 h-3.5 bg-green-500 border-2 border-white/70 rounded-full"></div>
              {showUsername && (
                <div className="z-50 absolute left-0 inline-block my-1 px-2 py-1 text-sm font-medium text-white opacity-100 :hover-opacity-0 transition-opacity duration-300 bg-gray-800 rounded-lg shadow-sm ">
                  {username}
                </div>
              )}
            </div>
          </div>
        </button>
      ) : (
        <button
          onClick={() => {
            navigate(`/profile/${username}`);
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <div
              className="relative"
              onMouseEnter={() => setShowUsername(true)}
              onMouseLeave={() => setShowUsername(false)}
            >
              <img
                src={pictureUrl}
                alt="User Avatar"
                className="h-12 w-12 object-cover rounded-lg border-2 border-gray-700 mx-auto"
              />
              {showUsername && (
                <div className="z-10 absolute left-0 inline-block my-1 px-2 py-1 text-sm font-medium text-white opacity-100 :hover-opacity-0 transition-opacity duration-300 bg-gray-800 rounded-lg shadow-sm ">
                  {username}
                </div>
              )}
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default SmallAvatar;
