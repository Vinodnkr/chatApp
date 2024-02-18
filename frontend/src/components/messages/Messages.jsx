//message
import Message from "./Message"
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useGetMessages from "../../hooks/useGetMessages"
import { useEffect, useRef } from "react";

function Messages() {
  const { loading, messages } = useGetMessages();
  const bottomMessages = useRef(null);

  useEffect(() => {
    bottomMessages.current?.scrollIntoView();
  }, [messages])

  return (
    <div className="px-4 py-2 flex-1 overflow-auto h-[26rem] sm:h-[29rem] scrollbar">
      { loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />) }

      { !loading && messages.length === 0 && (
        <p className="text-center text-gray-300">Send a message to start the conversation</p>
      )}

      { !loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id}>
          <Message message={message} />
        </div>
      ))}

      <div ref={bottomMessages}></div>
    </div>
  )
}

export default Messages