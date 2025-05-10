import { Avatar } from "primereact/avatar";
import { Chatroom } from "../../slices/chatroomSlice";
import { Divider } from "primereact/divider";
import { displayDate } from "../../utils/time";
import { Image } from "primereact/image";

const ChatroomItem: React.FC<{
  chatroom: Chatroom;
  isSelected: boolean;
  onClick: () => void;
}> = ({ chatroom, isSelected, onClick }) => {
  return (
    <div
      className="w-full"
      style={{ backgroundColor: isSelected ? "lightgray" : "white" }}
    >
      <div
        className="w-full flex gap-2 items-center justify-between p-4"
        onClick={onClick}
      >
        <Image
          src={`/avatars/${chatroom.model.avatar}`}
          alt={chatroom.model.name}
          width="60rem"
          height="60rem"
          pt={{
            image: {
              className: "rounded-full",
            },
          }}
        />
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
              {chatroom.model.name}
            </h3>
            <p className="text-sm text-gray-500">
              {displayDate(new Date(chatroom.lastMessage.timestamp))}
            </p>
          </div>
          <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {`${
              chatroom.lastMessage.sender === "model" && chatroom.model.name
            }: ${chatroom.lastMessage.content}`}
          </p>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default ChatroomItem;
