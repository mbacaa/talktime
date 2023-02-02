import React from "react";
import Message from "../Message";
import { RiMailSendLine } from "react-icons/ri";
import { useRef, useEffect } from "react";

const Messenger = (props) => {
  const { messages, currentUser, newMessage, setNewMessage, handleSubmit } =
    props;

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-chatHeight flex flex-col ">
      <div className="scrollbar-thin scrollbar-thumb-white/20 m-2 overflow-y-auto  ">
        {messages.map((message) => (
          <div ref={scrollRef} key={message._id}>
            <Message
              message={message}
              currentUser={message.sender === currentUser._id ? true : false}
            />
          </div>
        ))}
      </div>

      <div className="p-4 pt-0 flex gap-4 justify-end">
        <textarea
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          value={newMessage}
          placeholder="Send message..."
          className="text-sm w-full border-2 p-2 py-1 rounded-md text-gray-900 focus:outline-none bg-gray-50/50 border-gray-500 focus:border-gray-700"
        />
        <button onClick={handleSubmit} type="submit">
          <RiMailSendLine className="text-3xl text-gray-300 hover:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default Messenger;
