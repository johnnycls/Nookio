import { useNavigate } from "react-router-dom";
import AppBar from "../../components/AppBar";
import { ChatroomDetail } from "../../slices/chatroomSlice";
import { Image } from "primereact/image";

const ChatroomAppBar: React.FC<{ chatroom: ChatroomDetail }> = ({
  chatroom,
}) => {
  const navigate = useNavigate();

  return (
    <AppBar onBack={() => navigate("/")}>
      <div className="flex items-center gap-2 items-center">
        <Image
          preview
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
        <h1 className="text-2xl overflow-hidden text-ellipsis whitespace-nowrap">
          {chatroom.model.name}
        </h1>
      </div>
    </AppBar>
  );
};

export default ChatroomAppBar;
