import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useConversationContext } from "../context/ConversationContext";

function useGetConversations() {
  const { conversations, setConversations } = useConversationContext();
  
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/conversations");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    getConversations();
  }, [setConversations]);
  
  return { loading, conversations, setConversations };
}

export default useGetConversations