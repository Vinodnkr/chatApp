import { useState } from "react"
import toast from "react-hot-toast"
import { useConversationContext } from "../context/ConversationContext";

function useStartConversation() {
  const [loading, setLoading] = useState(false);
  const { setNewMessage, conversations, setConversations, setSelectedConversation } = useConversationContext();

  
  const createConversation = async (user, select) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/conversations/create/${user._id}`, {
        method: "POST"
      });
      const data = await res.json();
      if (data.errors) {
        throw new Error(data.errors[0]);
      }
      const newConversation = {...data, otherParticipant: user}
      if (select) {
        setSelectedConversation(newConversation);
      }

      // if (conversations.findIndex(conversation => conversation._id == newConversation._id) == -1) {
      //   setConversations([newConversation, ...conversations]);
      // }
      
      const filteredConversations = await conversations.filter(conversation => conversation._id != newConversation._id);
      setConversations([newConversation, ...filteredConversations]);
      setNewMessage(true);
      setTimeout(() => {
        setNewMessage(false);
      }, 2000);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createConversation }
}

export default useStartConversation