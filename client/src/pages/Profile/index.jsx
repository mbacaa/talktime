import React from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import CurrentUserProfile from "../../components/CurrentUserProfile";
import UserProfile from "../../components/UserProfile";

const Profile = () => {
  const [cookies] = useCookies(["USER_DATA"]);
  const { username } = useParams();
  const currentUser = cookies.USER_DATA;

  return (
    <div className="h-screen bg-slate-900 flex justify-center text-gray-100">
      <div className="w-1/2 h-1/2 m-auto">
        <div className="relative group h-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/50 to-violet-600/50 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-400"></div>
          <div className="relative p-12 h-full bg-white/30 ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col">
            {username === currentUser.username ? (
              <CurrentUserProfile />
            ) : (
              <UserProfile />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
