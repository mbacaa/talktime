import React from "react";
import SmallAvatar from "../SmallAvatar";
import { format } from "timeago.js";
import { useState, useEffect } from "react";
import { axiosConfig } from "../../utils/axiosConfig";
import { useCookies } from "react-cookie";

const Message = (props) => {
  const { currentUser, message } = props;
  const [cookies] = useCookies(["USER_DATA", "JWT_TOKEN"]);
  const USER_DATA = cookies.USER_DATA;
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const response = await axiosConfig.get(`/users/${message.sender}`, {
        headers: {
          Authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    message.sender !== USER_DATA._id && getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {currentUser ? (
        <div className="flex flex-col mt-2 p-2 pb-0 mr-4 ">
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
                username={USER_DATA.username}
                picture={USER_DATA.picture}
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
                username={user.username}
                picture={user.picture}
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
