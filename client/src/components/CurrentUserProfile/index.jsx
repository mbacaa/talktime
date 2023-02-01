import React from "react";
import { useCookies } from "react-cookie";
import {
  VscSettings,
  VscPreview,
  VscOrganization,
  VscArrowLeft,
} from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const CurrentUserProfile = () => {
  const [cookies] = useCookies(["USER_DATA"]);
  const currentUser = cookies.USER_DATA;
  const navigate = useNavigate();

  return (
    <div className="h-full justify-between items-center">
      <div className="flex flex-col h-full">
        <div className="flex">
          <div className="font-bold text-3xl justify-start">
            Hello {currentUser.username}!
          </div>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="text-2xl justify-end ml-auto"
          >
            <VscArrowLeft className="text-gray-100 hover:text-gray-300 mb-2" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6 w-full h-full justify-center items-center">
          <button
            type="button"
            onClick={() => {
              navigate(`/profile/${currentUser.username}/update`);
            }}
            className="h-48 flex gap-3 justify-center items-center bg-slate-900/30 rounded hover:text-gray-300 hover:border-2 border-slate-900/30"
          >
            <div className="text-sm rounded-lg underline ">
              Update your profile
            </div>
            <VscPreview className="text-2xl" />
          </button>
          <button
            type="button"
            onClick={() => {
              navigate(`/friends`);
            }}
            className="h-48 flex gap-3 justify-center items-center bg-slate-900/30 rounded hover:text-gray-300 hover:border-2 border-slate-900/30"
          >
            <div className="text-sm rounded-md underline ">
              Manage your friends
            </div>
            <VscOrganization className="text-2xl" />
          </button>
          <button
            type="button"
            onClick={() => {
              navigate(`/admin`);
            }}
            className="h-48 flex gap-3 justify-center items-center bg-slate-900/30 rounded hover:text-gray-300 hover:border-2 border-slate-900/30"
          >
            <div className="text-sm underline">Go to Admin Panel</div>
            <VscSettings className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentUserProfile;
