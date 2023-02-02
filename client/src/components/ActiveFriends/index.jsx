import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Avatar from "../Avatar";
import SmallAvatar from "../SmallAvatar";
import { axiosConfig } from "../../utils/axiosConfig";

const ActiveFriends = (props) => {
  const [cookies] = useCookies(["USER_DATA", "JWT_TOKEN"]);
  const user = cookies.USER_DATA;
  const { username, picture } = user;
  const {
    onlineUsers,
    currentId,
    handleConv,
    setConversations,
    setCurrentConversation,
    conversations,
  } = props;
  const [friends, setFriends] = useState([]);
  const [activeFriends, setActiveFriends] = useState([]);

  const getFriends = async () => {
    try {
      const response = await axiosConfig.get(`/users/${user._id}/friends`, {
        headers: {
          Authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
      });
      setFriends(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getConversations = async () => {
    try {
      const response = await axiosConfig.get(`/conversations/${user._id}`, {
        headers: {
          Authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
      });
      setConversations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createNewConversation = async (friendId) => {
    console.log(user._id, friendId);
    try {
      const response = await axiosConfig.post(`/conversations/`, {
        headers: {
          Authorization: `Bearer ${cookies.JWT_TOKEN}`,
        },
        senderId: user._id,
        receiverId: friendId,
      });
      setCurrentConversation(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoToConversation = (friendId) => async () => {
    await getConversations();
    const conversation = conversations.find((conv) => {
      return (
        conv.members.includes(user._id) &&
        conv.members.includes(friendId) &&
        conv.members.length === 2
      );
    });

    if (conversation) {
      setCurrentConversation(conversation);
    } else {
      createNewConversation(friendId);
    }
  };

  useEffect(() => {
    getFriends();
  }, [currentId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const active = friends.filter((friend) => {
      return onlineUsers.find((user) => user.userId === friend._id);
    });

    setActiveFriends(active);
  }, [onlineUsers, friends]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full h-full flex flex-col items-center p-2">
      <div className="border-b-2 pb-1 mb-2 border-white/40">
        <Avatar username={username} picture={picture} />
      </div>
      <div>
        {activeFriends.map((friend) => (
          <div onClick={handleGoToConversation(friend._id)} key={friend._id}>
            <SmallAvatar
              username={friend.username}
              picture={friend.picture}
              badge={true}
              handleConv={handleConv}
              friendId={friend._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFriends;
