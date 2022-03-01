import React, { useContext } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import { AccountContext } from "./context/AccountProvider";
import axios from "./axios";
import { UserContext } from "./context/UserProvider";
import { HideShowContext } from "./context/HideShowProvider";
import { StartConversationContext } from "./context/StartConversation";

function SidebarChat({ name, imageUrl, localId, item }) {
  const { account } = useContext(AccountContext);
  const { setPerson } = useContext(UserContext);
  const { setHideShow } = useContext(HideShowContext);
  const { setInitial } = useContext(StartConversationContext);

  const setUser = async () => {
    const senderId = account.localId;
    const receiverId = localId;
    setPerson(item);
    await axios.post("/conversation/new", {
      members: [senderId, receiverId],
    });
    setHideShow(false);
    setInitial(false);
  };

  return (
    <div className="sidebarChat" onClick={() => setUser()}>
      <Avatar src={imageUrl} />
      <div className="sidebarChat_info">
        <h2>{name}</h2>
        <p>Thank you for messageing me</p>
      </div>
    </div>
  );
}

export default SidebarChat;
