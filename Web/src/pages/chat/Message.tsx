import React from "react";
import { isParsableJSON } from "../../utils/general";
import MessageCard from "./MessageCard";
import OptionButton from "./OptionButton";

type MessageProps = {
  content: string;
  timestamp: string;
  sender: string;
  onOptionClick: (message: string) => void;
  series: string[];
  isLast: boolean;
  isLoading: boolean;
};

const Message: React.FC<MessageProps> = ({
  content,
  timestamp,
  sender,
  onOptionClick,
  series,
  isLast,
  isLoading,
}) => {
  if (isParsableJSON(content)) {
    const parsedContent = JSON.parse(content);
    if (
      parsedContent.hasOwnProperty("text") &&
      parsedContent.hasOwnProperty("options")
    ) {
      return (
        <div>
          <MessageCard content={parsedContent.text} sender={sender} />
          {isLast && (
            <div className="p-2 flex flex-col gap-2">
              {parsedContent.options.map((option: string, index: number) => (
                <OptionButton
                  disabled={isLoading}
                  key={index}
                  option={option}
                  onClick={() => {
                    onOptionClick(option);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <MessageCard
      content={content}
      timestamp={series.includes("004") ? undefined : timestamp}
      sender={sender}
    />
  );
};

export default Message;
