import React, { useEffect, useRef, useState } from "react";
import { ChatroomDetail } from "../../slices/chatroomSlice";
import { Toast } from "primereact/toast";
import ChatroomAppBar from "./AppBar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useSendMessageMutation } from "../../slices/chatSlice";
import { useTranslation } from "react-i18next";

const Content: React.FC<{ chatroom: ChatroomDetail }> = ({ chatroom }) => {
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);

  const [
    sendMessage,
    { isLoading: isSending, isError: isSendingError, error },
  ] = useSendMessageMutation();

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (isSendingError) {
      toast.current?.show({
        severity: "error",
        summary: t("sendMsgError", { error: error?.toString() }),
      });
    }
  }, [isSendingError]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <Toast ref={toast} />
      <ChatroomAppBar chatroom={chatroom} />

      <div className="w-full h-full">
        <div className="flex flex-col h-full gap-2 overflow-y-auto">
          {chatroom.messages.map((message) => (
            <div
              className={`w-full flex ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
              key={message.timestamp}
            >
              <Button
                severity="secondary"
                className="max-w-[70%]"
                raised
                label={message.content}
                disabled
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex gap-2">
        <InputText
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {isSending ? (
          <Button icon="pi pi-spinner" />
        ) : (
          <Button
            icon="pi pi-send"
            onClick={() => {
              sendMessage({
                chatroomId: chatroom._id,
                message: message,
              });
              setMessage("");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Content;
