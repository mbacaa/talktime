import React, { useEffect } from "react";
import { USER_DATA } from "../../stores/userData";
import { FRIENDS, updateFriends } from "../../stores/friends";
import defaultPicture from "../../constants/defaultPicture";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserDelete } from "react-icons/ai";
import { axiosConfig } from "../../utils/axiosConfig";

const FriendsList = () => {
  const navigate = useNavigate();

  const deleteFriend = (friendId) => {
    try {
      axiosConfig
        .patch(`/users/${USER_DATA.get()._id}/${friendId}`)
        .then((res) => {
          console.log(res);
          updateFriends();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    updateFriends();
    console.log("dupas");
  }, []);

  return (
    <div className="w-full h-full p-6 flex flex-col gap-2">
      <div>
        <div className="font-bold text-3xl justify-start">Your friends.</div>
        <div className="text-sm justify-start">Manage your friends</div>
      </div>
      <div className="flex flex-col w-full mt-6 gap-4">
        {FRIENDS.get().map((friend) => (
          <div className="flex flex-row gap-2">
            <button
              onClick={() => {
                navigate(`/profile/${friend.username}`);
              }}
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  src={
                    `http://localhost:4000/assets/${friend.picture}` ||
                    defaultPicture
                  }
                  alt="User Avatar"
                  className="w-14 h-14 object-fill rounded-lg border-2 border-gray-300 hover:border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-3"
                />
              </div>
            </button>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col justify-center w-full">
                <div className="text-sm">{friend.username}</div>
                <div className="text-xs">{friend.email}</div>
              </div>
              <div>
                <button
                  onClick={() => deleteFriend(friend._id)}
                  className="text-gray-700 hover:text-red-600 text-2xl"
                >
                  <AiOutlineUserDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
