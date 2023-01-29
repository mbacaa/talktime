import React from "react";
import Conversations from "../../components/Conversations";
import Messenger from "../../components/Messenger";
import ActiveFriends from "../../components/ActiveFriends";
import Toolbar from "../../components/Toolbar";

const Chat = () => {
  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12 text-gray-700">
      <div className="w-3/4 h-5/6 m-auto">
        <div className="relative group h-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative h-full p-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-row ">
            <div className="grid grid-cols-12 w-full">
              <div className="col-span-3 flex h-3/4">
                <Conversations />
              </div>
              <div className="col-span-7">
                <Messenger />
              </div>
              <div className="col-span-2">
                <ActiveFriends />
              </div>
            </div>
            <div className="w-6">
              <Toolbar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
