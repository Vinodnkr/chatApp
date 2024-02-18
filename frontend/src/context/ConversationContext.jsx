import { createContext, useContext, useState } from "react";

export const ConversationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-component
export const useConversationContext = () => {
  return useContext(ConversationContext);
}

export const ConversationContextProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(false);


  return <ConversationContext.Provider
    value={{ conversations, setConversations, selectedConversation, setSelectedConversation, messages, setMessages, newMessage, setNewMessage}}>
    {children}
  </ConversationContext.Provider>
};