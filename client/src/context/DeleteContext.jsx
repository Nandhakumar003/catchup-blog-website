import { createContext, useContext, useState } from "react";

const DeleteContextStatus = createContext();
const SetDeleteContextStatus = createContext();

export const DeleteCustomHookStatus = () => {
  return useContext(DeleteContextStatus);
};
export const SetCustomHookStatus = () => {
  return useContext(SetDeleteContextStatus);
};

export const DeleteCustomContext = ({ children }) => {
  const [statusmessage, setStatusMessage] = useState(false);

  const handleChange = () => {
    setStatusMessage(!statusmessage);
  };

  return (
    <DeleteContextStatus.Provider value={statusmessage}>
      <SetDeleteContextStatus.Provider value={handleChange}>
        {children}
      </SetDeleteContextStatus.Provider>
    </DeleteContextStatus.Provider>
  );
};
