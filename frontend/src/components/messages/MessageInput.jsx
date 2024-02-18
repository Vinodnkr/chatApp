//messageInput
import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import toast from "react-hot-toast"

function MessageInput() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    if (message.length >= 256) {
      setMessage("");
      toast.error("Message cannot be longer than 256 characters");
      return;
    }
    await sendMessage(message);
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="relative py-4 bg-secondary">
      <div className="w-full">
        <input type="text" className="border text-sm block w-full p-2.5 bg-accent border-secondary rounded-lg" placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)} />
      </div>
      <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3" disabled={loading}>
        {
          loading?
          <span className="loading loading-spinner"></span>
          :
          <i className="fa-solid fa-paper-plane"></i>
        }
      </button>
    </form>
  )
}

export default MessageInput