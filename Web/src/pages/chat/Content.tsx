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
        summary: t("sendMsgError", { error: JSON.stringify(error) }),
      });
    }
  }, [isSendingError]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <Toast ref={toast} />
      <ChatroomAppBar chatroom={chatroom} />

      <div className="w-full flex-1 px-3 pt-3 min-h-0 overflow-y-auto">
        <div className="flex flex-col h-full gap-2">
          {chatroom.messages.map((message) => (
            <div
              className={`w-full flex ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
              key={message.timestamp}
            >
              <Card
                className="max-w-[70%]"
                pt={{
                  body: {
                    className: "!p-2 !gap-0",
                  },
                }}
                footer={
                  <div className={`text-xs text-gray-500 text-right`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                }
              >
                {message.content}
              </Card>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="w-full flex gap-2 p-2 pb-4">
        <InputTextarea
          className="flex-1 "
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
                profile.credit < CREDITS_FOR_RESPONSE(chatroom.messages.length)
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
    </div>
  );
};

export default Content;
