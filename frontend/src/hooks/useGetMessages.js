import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useConversationContext } from "../context/ConversationContext";

function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversationContext();

  
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/messages/${selectedConversation.otherParticipant._id}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (selectedConversation?.otherParticipant._id) getMessages();
  }, [selectedConversation?.otherParticipant._id, setMessages])

  return { messages, loading };
}

export default useGetMessages