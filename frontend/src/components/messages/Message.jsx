//message
import { useAuthContext } from "../../context/AuthContext"
import { useConversationContext } from "../../context/ConversationContext";
import { extractTime } from "../../utils/extractTime.js"

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversationContext();

  const fromMe = message.senderId === authUser._id;

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation.otherParticipant.profilePic;
  const bubbleColor = fromMe ? "bg-info" : "bg-accent";
  const formatedTime = extractTime(message.createdAt);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={`/users/profilePics/${profilePic}`} alt="" />
        </div>
      </div>
      <div className={`chat-bubble overflow-custom ${bubbleColor} text-white`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formatedTime}
      </div>
    </div>
  )
}

export default Message