import { createContext, useState } from "react";

export const StartConversationContext = createContext(null);

const StartConversationProvider = ({ children }) => {
  const [initial, setInitial] = useState(true);
  return (
    <StartConversationContext.Provider
      value={{
        initial,
        setInitial,
      }}
    >
      {children}
    </StartConversationContext.Provider>
  );
};

export default StartConversationProvider;
