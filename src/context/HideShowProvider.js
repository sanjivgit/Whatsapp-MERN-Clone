import { createContext, useState } from "react";

export const HideShowContext = createContext(null);

const HideShowProvider = ({ children }) => {
  const [hideShow, setHideShow] = useState(false);
  return (
    <HideShowContext.Provider
      value={{
        hideShow,
        setHideShow,
      }}
    >
      {children}
    </HideShowContext.Provider>
  );
};

export default HideShowProvider;
