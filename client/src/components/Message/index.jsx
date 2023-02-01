import React from "react";
import SmallAvatar from "../SmallAvatar";
import { format } from "timeago.js";

const Message = (props) => {
  const { currentUser, message } = props;
  return (
    <div>
      {currentUser ? (
        <div className="flex flex-col mt-2 p-2 mr-4 ">
          <div className="flex justify-end">
            <div className="flex flex-col">
              <div className="mr-4 p-3 text-left rounded-lg text-sm bg-slate-900/80 h-min max-w-sm break-words">
                {message.text}
              </div>
              <div className="text-xs flex justify-end mr-4">
                {format(message.createdAt)}
              </div>
            </div>
            <div>
              <SmallAvatar
                username={"BartekMinecraftPL"}
                picture={"furas.jpg"}
                badge={false}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mt-2 p-4 w-full">
          <div className="flex">
            <div>
              <SmallAvatar
                username={"BartekMinecraftPL"}
                picture={"bartek.jpg"}
                badge={false}
              />
            </div>
            <div className="flex flex-col">
              <div className="ml-4 p-3 text-left rounded-lg text-sm bg-white/30 text-gray-900 h-min max-w-sm">
                {message.text}
              </div>
              <div className="text-xs ml-4 ">{format(message.createdAt)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
