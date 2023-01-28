import React from "react";
import defaultPicture from "../../constants/defaultPicture";
import { USER_DATA } from "../../stores/userData";
import { useNavigate } from "react-router-dom";

const FriendsPanel = () => {
  const { username, picture } = USER_DATA.get();
  const profilePicture =
    `http://localhost:4000/assets/${picture}` || defaultPicture;
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(`/profile/${username}`)}
        className="scale-100 hover:scale-105 ease-in duration-100"
      >
        <div>
          <div
            id="tooltip-jese"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Jese Leos
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <img
            data-tooltip-target="tooltip-jese"
            className="w-14 h-14 rounded"
            src={profilePicture}
            alt="Medium avatar"
          />
        </div>
      </button>
    </div>
  );
};

export default FriendsPanel;
