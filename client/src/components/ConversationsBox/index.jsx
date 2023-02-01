import React from "react";
import Conversation from "../Conversation";

const ConversationsBox = (props) => {
  const { setCurrentConversation, conversations } = props;

  return (
    <div className="h-full w-full">
      {conversations.map((conversation) => (
        <div
          key={conversation._id}
          className="flex-flex-col justify-center w-full"
        >
          <button
            onClick={() => setCurrentConversation(conversation)}
            className="w-full"
          >
            <Conversation key={conversation._id} conversation={conversation} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ConversationsBox;
