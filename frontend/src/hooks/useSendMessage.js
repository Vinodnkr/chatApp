import { useState } from "react";
import { useConversationContext } from "../context/ConversationContext";
import toast from "react-hot-toast";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversationContext();

  
  const sendMessage = async (message) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/messages/send/${selectedConversation.otherParticipant._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({message})
      })
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, sendMessage };
}

export default useSendMessage