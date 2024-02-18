import { useSocketContext } from "../context/SocketContext";
import { useConversationContext } from "../context/ConversationContext.jsx";
import { useEffect } from "react";
import notificationSound from "../assets/sounds/notification.mp3"
import useStartConversation from "./useStartConversation.js";

function useListenMessages() {
  const { socket } = useSocketContext();
  const { setNewMessage, selectedConversation, messages, setMessages } = useConversationContext();
  const { createConversation } = useStartConversation();

  
  useEffect(() => {
    socket?.on("newMessage", ({newMessage, fromId, senderData}) => {
      const sound = new Audio(notificationSound);
      sound.volume = 0.3;
      sound.play();
      if (selectedConversation?.otherParticipant._id == fromId) {
        setMessages([...messages, newMessage]);
      }
      createConversation(senderData, false);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages, selectedConversation, createConversation, setNewMessage]);
}

export default useListenMessages