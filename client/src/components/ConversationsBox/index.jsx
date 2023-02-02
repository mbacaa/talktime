import React from "react";
import Conversation from "../Conversation";

const ConversationsBox = (props) => {
  const { setCurrentConversation, conversations } = props;

  return (
    <div className="h-full w-full">
      <div className="w-full h-convHeight flex flex-col ">
        <div className="scrollbar-thin scrollbar-thumb-white/20 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation._id}
              className="flex-flex-col justify-center w-full"
            >
              <button
                onClick={() => setCurrentConversation(conversation)}
                className="w-full"
              >
                <Conversation
                  key={conversation._id}
                  conversation={conversation}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationsBox;
