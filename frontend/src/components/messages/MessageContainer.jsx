//messageCont
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useConversationContext } from "../../context/ConversationContext"
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import { useSocketContext } from "../../context/SocketContext";

function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversationContext();

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation?.otherParticipant._id);

  useEffect(() => {

    return () => {
      setSelectedConversation(null);
    }
  }, [setSelectedConversation]);

  return (
    <div className="">
      {!selectedConversation ? <NoChatSelected /> : (
        <>
          <div className="bg-accent px-4 py-3 flex gap-4 items-center rounded-t-lg">
            <div className={`avatar ${isOnline? "online" : ""}`}>
              <div className="w-12 rounded-full">
                <img src={`/users/profilePics/${selectedConversation.otherParticipant.profilePic}`} alt="" />
              </div>
            </div>
            <h2 className="text-xl">{selectedConversation.otherParticipant.username}</h2>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  )
}

export default MessageContainer

function NoChatSelected() {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center h-[35rem]">
      <div className="px-4 text-center sm:text-lg md:text-xl font-semibold flex flex-col items-center gap-2">
        <img src={`/users/profilePics/${authUser.profilePic}`} className="w-24 rounded-full" alt="" />
        <p>👋 Welcome <span className="font-normal">{authUser.username}</span></p>
        <div className="flex items-center gap-2">
          <img src="/icon.webp" className="w-8" alt="" />
          <p>Select a chat to start messaging</p>
        </div>
      </div>
    </div>
  )
}