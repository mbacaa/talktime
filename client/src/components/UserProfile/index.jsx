import React from "react";
import { useCookies } from "react-cookie";
import { VscArrowLeft } from "react-icons/vsc";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultPicture from "../../constants/defaultPicture";
import { axiosConfig } from "../../utils/axiosConfig";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [cookies, setCookie] = useCookies(["USER_DATA", "JWT_TOKEN"]);
  const [user, setUser] = useState();
  const [isFriend, setIsFriend] = useState();
  const [userPicture, setUserPicture] = useState(defaultPicture);
  const { username } = useParams();
  const USER_DATA = cookies.USER_DATA;
  const TOKEN = cookies.JWT_TOKEN;
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axiosConfig.get(`/users/find/${username}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setUser(response.data);
      setUserPicture(`http://localhost:4000/assets/${response.data.picture}`);
      setIsFriend(USER_DATA.friends.includes(response.data._id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateFriends = async () => {
    try {
      const response = await axiosConfig.get(
        `/users/${USER_DATA._id}/friends`,
        {
          headers: {
            Authorization: `Bearer ${cookies.JWT_TOKEN}`,
          },
        },
      );
      setCookie("USER_DATA", { ...USER_DATA, friends: response.data });
      setIsFriend(!isFriend);
    } catch (error) {
      console.log(error);
    }
  };

  const addRemoveFriend = async (friendId) => {
    try {
      await axiosConfig
        .patch(`/users/${USER_DATA._id}/${friendId}`, {
          headers: {
            Authorization: `Bearer ${cookies.JWT_TOKEN}`,
          },
        })
        .then(() => {
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
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {user && (
        <div>
          <div className="flex flex-row w-full">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="text-2xl justify-end ml-auto"
            >
              <VscArrowLeft className="text-gray-100 hover:text-gray-300 mb-2" />
            </button>
          </div>
          <div className="w-full flex flex-col gap-2 items-center">
            <img
              src={userPicture}
              className="h-32 w-32 object-cover rounded-lg border-2 border-white/70 mx-auto"
              alt="User Avatar"
            />
            <div className="text-center text-xl font-bold">{user.username}</div>
            {!isFriend ? (
              <button
                onClick={() => {
                  addRemoveFriend(user._id);
                }}
                className="flex flex-row gap-1 text-xl items-center justify-center bg-gray-900 my-12 px-4 py-1 rounded-md  text-gray-300 hover:text-green-400"
              >
                <div className="text-center text-sm">Add Friend</div>
                <AiOutlineUserAdd className="text-2xl " />
              </button>
            ) : (
              <button
                onClick={() => {
                  addRemoveFriend(user._id);
                }}
                className="flex flex-row gap-1 text-xl items-center justify-center bg-gray-900 my-12 px-4 py-1 rounded-md  text-gray-300 hover:text-red-500"
              >
                <div className="text-center text-sm">Delete Friend</div>
                <AiOutlineUserDelete className="text-2xl " />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
