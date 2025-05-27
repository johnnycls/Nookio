import React, { useEffect, useRef, useState } from "react";
import { ChatroomDetail } from "../../slices/chatroomSlice";
import { Toast } from "primereact/toast";
import ChatroomAppBar from "./AppBar";
import { Button } from "primereact/button";
import { useSendMessageMutation } from "../../slices/chatSlice";
import { useTranslation } from "react-i18next";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import { CREDITS_FOR_RESPONSE, MESSAGE_LENGTH_LIMIT } from "../../config";
import { profile } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import { MODELS } from "../../assets/models";
import { isParsableJSON } from "../../utils/general";

const Content: React.FC<{
  chatroom: ChatroomDetail;
  profile?: profile;
}> = ({ chatroom, profile }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [
    sendMessage,
    { isLoading: isSending, isError: isSendingError, error },
  ] = useSendMessageMutation();

  const [message, setMessage] = useState<string>("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatroom.messages]);

  useEffect(() => {
    if (isSendingError) {
      toast.current?.show({
        severity: "error",
        summary: t("sendMsgError"),
      });
    }
  }, [isSendingError]);

  const series =
    MODELS.find((model) => model._id === chatroom.model._id)?.series ?? [];
  const lastMessageContent =
    chatroom.messages[chatroom.messages.length - 1].content;

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <Toast ref={toast} />
      <ChatroomAppBar chatroom={chatroom} />

      <div className="w-full flex-1 px-3 pt-3 min-h-0 overflow-y-auto">
        <div className="flex flex-col h-full gap-2">
          {chatroom.messages.map((message, idx) => (
            <Message
              onOptionClick={(message: string) => {
                sendMessage({
                  chatroomId: chatroom._id,
                  message: message,
                });
              }}
              key={idx}
              content={message.content}
              timestamp={message.timestamp}
              sender={message.sender}
              series={series}
              isLast={idx === chatroom.messages.length - 1}
              isLoading={isSending}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {!(
        isParsableJSON(lastMessageContent) &&
        JSON.parse(lastMessageContent).hasOwnProperty("isEnded") &&
        JSON.parse(lastMessageContent).isEnded
      ) && (
        <div className="w-full flex gap-2 p-2 pb-4">
          <InputTextarea
            className="flex-1"
            placeholder={
              isParsableJSON(lastMessageContent)
                ? t("chat.gamePlaceholder")
                : ""
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoResize
            rows={1}
            maxLength={MESSAGE_LENGTH_LIMIT}
          />

          {isSending ? (
            <Button disabled icon="pi pi-spin pi-spinner" />
          ) : (
            <Button
              rounded
              icon="pi pi-send"
              disabled={message.trim().length === 0}
              onClick={() => {
                if (
                  profile &&
                  profile.credit <
                    CREDITS_FOR_RESPONSE(chatroom.messages.length)
                ) {
                  navigate("/account");
                } else {
                  sendMessage({
                    chatroomId: chatroom._id,
                    message: message,
                  });
                  setMessage("");
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Content;
