import { Avatar } from "primereact/avatar";
import { Chatroom } from "../../slices/chatroomSlice";

const ChatroomItem: React.FC<{
  chatroom: Chatroom;
  isSelected: boolean;
  onClick: () => void;
}> = ({ chatroom, isSelected, onClick }) => {
  return (
    <div
      className="w-full flex gap-2"
      onClick={onClick}
      style={{ backgroundColor: isSelected ? "lightgray" : "white" }}
    >
      <Avatar
        shape="circle"
        size="xlarge"
        image={`@/assets/avatars/${chatroom.model.avatar}`}
        icon="pi pi-user"
      />
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">{chatroom.model.name}</h3>
          <p className="text-sm text-gray-500">
            {chatroom.lastMessage.timestamp}
          </p>
        </div>
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {`${
            chatroom.lastMessage.sender === "model" && chatroom.model.name
          }: ${chatroom.lastMessage.content}`}
        </p>
      </div>
    </div>
  );
};

export default ChatroomItem;
