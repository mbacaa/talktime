import React from "react";
import { useState, useEffect } from "react";
import { axiosConfig } from "../../utils/axiosConfig";
import { useCookies } from "react-cookie";
import defaultPicture from "../../constants/defaultPicture";

const Conversation = (props) => {
  const { conversation } = props;
  const [cookies] = useCookies(["USER_DATA", "JWT_TOKEN"]);
  const [user, setUser] = useState(null);
  const currentUser = cookies.USER_DATA;

  const getUser = async () => {
    const friendId = conversation.members.find(
      (member) => member !== currentUser._id,
    );
    try {
      const response = await axiosConfig.get(`/users/${friendId}`, {
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
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {user && (
        <div className="p-2 flex items-center hover:bg-gray-50/10">
          <img
            src={
              `http://localhost:4000/assets/${user.picture}` || defaultPicture
            }
            alt="Conversation"
            className="h-16 w-16 object-cover rounded-lg border-2 border-gray-700 m-1 mr-4"
          />
          <div className="text-gray-900 font-bold text-md">{user.username}</div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
