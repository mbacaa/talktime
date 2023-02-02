import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import defaultPicture from "../../constants/defaultPicture";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserDelete } from "react-icons/ai";
import { axiosConfig } from "../../utils/axiosConfig";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["USER_DATA"]);
  const USER_DATA = cookies.USER_DATA;

  const getFriends = async () => {
    try {
      const response = await axiosConfig.get(`/users/${USER_DATA._id}/friends`);
      setFriends(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteFriend = (friendId) => {
    try {
      axiosConfig
        .patch(`/users/${USER_DATA._id}/${friendId}`)
        .then((res) => {
          console.log(res);
          const newFriends = friends.filter(
            (friend) => friend._id !== friendId,
          );
          setCookie("USER_DATA", { ...USER_DATA, friends: newFriends });
          setFriends(newFriends);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch {
      console.log("error");
    }
  };

  const handleDeleteFriend = (friendId) => {
    deleteFriend(friendId);
  };

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="p-6 pb-0">
        <div className="font-bold text-3xl justify-start">Your friends.</div>
        <div className="text-sm justify-start">Manage your friends</div>
      </div>
      <div className="flex flex-col w-full mt-4">
        {friends.map((friend) => (
          <div
            key={friend._id}
            className="flex flex-row gap-2 justify-between items-center w-full hover:bg-white/10 px-6 py-2"
          >
            <div className="flex flex-row justify-center items-center gap-4">
              <button
                onClick={() => {
                  navigate(`/profile/${friend.username}`);
                }}
              >
                <div>
                  <img
                    src={
                      `http://localhost:4000/assets/${friend.picture}` ||
                      defaultPicture
                    }
                    alt="User Avatar"
                    className="h-16 w-16 object-cover rounded-lg border-2 border-gray-700 mx-auto"
                  />
                </div>
              </button>
              <div className="text-md font-bold">{friend.username}</div>
            </div>

            <button
              onClick={() => handleDeleteFriend(friend._id)}
              className="hover:text-red-600 text-2xl"
            >
              <AiOutlineUserDelete />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
