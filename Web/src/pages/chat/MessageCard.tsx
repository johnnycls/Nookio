import React from "react";
import { Card } from "primereact/card";

type MessageProps = {
  content: string;
  timestamp?: string;
  sender: string;
};

const MessageCard: React.FC<MessageProps> = ({
  content,
  timestamp,
  sender,
}) => {
  return (
    <div
      className={`w-full flex ${
        sender === "user" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Card
        className="max-w-[70%]"
        pt={{
          body: {
            className: "!p-2 !gap-0",
          },
        }}
        footer={
          timestamp !== undefined && (
            <div className={`text-xs text-gray-500 text-right`}>
              {new Date(timestamp).toLocaleTimeString()}
            </div>
          )
        }
      >
        {content}
      </Card>
    </div>
  );
};

export default MessageCard;
