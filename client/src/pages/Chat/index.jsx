import React from "react";
import Conversations from "../../components/Conversations";
import Messenger from "../../components/Messenger";
import Friends from "../../components/FriendsPanel";

const Chat = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12 text-gray-700">
      <div className="w-3/4 h-4/5 mx-auto">
        <div className="relative group ">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative  p-12 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none grid grid-cols-12">
            <div className="col-span-3">
              <Conversations />
            </div>
            <div className="col-span-7">
              <Messenger />
            </div>
            <div className="col-span-2">
              <Friends />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
