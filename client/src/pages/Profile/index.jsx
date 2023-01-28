import React from "react";
import { useParams } from "react-router-dom";
import { USER_DATA } from "../../stores/userData";
import CurrentUserProfile from "../../components/CurrentUserProfile";

const Profile = () => {
  const { username } = useParams();
  const currentUser = USER_DATA.get();

  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12 text-gray-700">
      <div className="w-1/2 h-4/6 m-auto">
        <div className="relative group h-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative p-12 h-full bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col">
            {username === currentUser.username ? (
              <CurrentUserProfile />
            ) : (
              <div className="font-bold text-3xl mb-2">Hello {username}!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
