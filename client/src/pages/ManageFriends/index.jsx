import React from "react";
import { useNavigate } from "react-router-dom";
import { VscArrowLeft } from "react-icons/vsc";
import SearchFriends from "../../components/SearchFriends";
import FriendsList from "../../components/FriendsList";

const ManageFriends = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12 text-gray-700">
      <div className="w-3/4 h-5/6 m-auto">
        <div className="relative group h-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative p-6 h-full bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col">
            <div className="h-full justify-between items-center">
              <div className="flex flex-row h-full w-full">
                <div className="grid grid-cols-2 gap-6 w-full h-full justify-center items-center">
                  <div className="h-full flex gap-3 justify-center items-center bg-gray-100 rounded text-gray-700 hover:text-gray-900 border-2">
                    <FriendsList />
                  </div>
                  <div className="h-full flex gap-3 justify-center items-center bg-gray-100 rounded text-gray-700 hover:text-gray-900 border-2">
                    <SearchFriends />
                  </div>
                </div>
                <div className="flex items-start justify-end ml-4">
                  <button
                    onClick={() => {
                      navigate(-1);
                    }}
                    className="text-2xl"
                  >
                    <VscArrowLeft className="text-gray-700 hover:text-gray-900" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageFriends;
