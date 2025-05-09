import { useNavigate } from "react-router-dom";
import AppBar from "../../components/AppBar";
import { ChatroomDetail } from "../../slices/chatroomSlice";
import { Avatar } from "primereact/avatar";

const ChatroomAppBar: React.FC<{ chatroom: ChatroomDetail }> = ({
  chatroom,
}) => {
  const navigate = useNavigate();

  return (
    <AppBar onBack={() => navigate("/")}>
      <div className="flex items-center gap-2 items-center">
        <Avatar
          image={`../src/assets/avatars/${chatroom.model.avatar}`}
          icon="pi pi-user"
          shape="circle"
        />
        <h1 className="text-2xl">{chatroom.model.name}</h1>
      </div>
    </AppBar>
  );
};

export default ChatroomAppBar;
