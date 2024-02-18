import { useConversationContext } from "../../context/ConversationContext"
import { useSocketContext } from "../../context/SocketContext";


function Conversation({ conversation, first }) {
  const { newMessage, selectedConversation, setSelectedConversation} = useConversationContext();

  const isSelected = selectedConversation?._id == conversation._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation.otherParticipant._id);

  const bgColor = first && newMessage? "noti-custom" : "";

  return (
    <div className={`flex gap-3 items-center ${isSelected? "bg-info" : ""} ${bgColor} active:bg-primary hover:bg-info p-2 py-2 cursor-pointer`}
      onClick={() => setSelectedConversation(conversation)}>

      <div className={`avatar ${isOnline? "online" : " "}`}>
        <div className="w-12 rounded-full">
          <img src={`/users/profilePics/${conversation.otherParticipant.profilePic}`} alt="" />
        </div>
      </div>
      <div className="overflow-hidden">
        {conversation.otherParticipant.username}
      </div>

    </div>
  )
}

export default Conversation