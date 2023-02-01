import React, { useEffect } from "react";
import Messenger from "../../components/Messenger";
import ActiveFriends from "../../components/ActiveFriends";
import Toolbar from "../../components/Toolbar";
import ConversationsBox from "../../components/ConversationsBox";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { axiosConfig } from "../../utils/axiosConfig";
import { io } from "socket.io-client";
import { useRef } from "react";

const Chat = () => {
  const [cookies] = useCookies(["USER_DATA", "JWT_TOKEN"]);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivedMessage, setArrivedMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const user = cookies.USER_DATA;

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setArrivedMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    arrivedMessage &&
      currentConversation?.members.includes(arrivedMessage.sender) &&
      setMessages((prev) => [...prev, arrivedMessage]);
  }, [arrivedMessage, currentConversation]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const getMessages = async () => {
    try {
      const response = await axiosConfig.get(
        `/messages/${currentConversation._id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.JWT_TOKEN}`,
          },
        },
      );
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createMessage = async (text) => {
    try {
      const response = await axiosConfig.post("/messages", {
        sender: user._id,
        text: newMessage,
        conversationId: currentConversation._id,
      });
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: currentConversation.members.find(
        (member) => member !== user._id,
      ),
      text: newMessage,
    });

    createMessage(newMessage);
  };

  const getPrivateConversation = async (receiverId) => {
    try {
      const response = await axiosConfig.get(
        `/conversations/find/${user._id}/${receiverId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.JWT_TOKEN}`,
          },
        },
      );
      setCurrentConversation(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConv = (friendId) => {
    getPrivateConversation(friendId);
  };

  useEffect(() => {
    getConversations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentConversation) {
      getMessages();
    }
  }, [currentConversation]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="h-screen bg-slate-900 flex flex-col justify-center relative text-gray-100">
      <div className="w-5/6 h-5/6 m-auto">
        <div className="h-full w-full relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/50 to-violet-600/50 rounded-lg blur opacity-75"></div>
          <div className="h-full w-full relative bg-white/20 ring-1 p-6 ring-gray-900/5 rounded-lg leading-none flex items-center justify-center">
            <div className="grid grid-cols-12 w-full h-full gap-6">
              <div className="col-span-3 h-full flex gap-3 justify-center items-center bg-white/20 rounded-lg ring-1 ring-gray-700/5  ">
                <ConversationsBox
                  conversations={conversations}
                  setCurrentConversation={setCurrentConversation}
                />
              </div>
              <div className="col-span-8 h-full w-full flex gap-3 justify-center items-center bg-white/20 rounded-lg ring-1 ring-gray-700/5 ">
                {currentConversation ? (
                  <div className="w-full h-full">
                    <Messenger
                      currentConversation={currentConversation}
                      messages={messages}
                      setMessages={setMessages}
                      currentUser={user}
                      createMessage={createMessage}
                      handleSubmit={handleSubmit}
                      newMessage={newMessage}
                      setNewMessage={setNewMessage}
                    />
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-gray-700">
                    Select a conversation to start a chat.
                  </div>
                )}
              </div>
              <div className="col-span-1 h-full flex gap-3 justify-center items-center bg-white/20 rounded-lg ring-1 ring-gray-700/5 ">
                <ActiveFriends
                  onlineUsers={onlineUsers}
                  currentId={user._id}
                  setCurrentConversation={setCurrentConversation}
                  handleConv={handleConv}
                />
              </div>
            </div>
            <div className="w-6 ml-6 h-full p-1">
              <Toolbar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
