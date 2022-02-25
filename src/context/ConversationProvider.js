import { createContext, useState } from "react";

export const ConversationContext = createContext(null);

const ConversationProvider = ({ children }) => {
  const [conversation, setConversation] = useState({});
  return (
    <ConversationContext.Provider
      value={{
        conversation,
        setConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationProvider;
