import React, { useState, useContext, useEffect } from "react";
import "./Chat.css";
import { IconButton, Avatar } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import axios from "./axios";
import { AccountContext } from "./context/AccountProvider";
import { UserContext } from "./context/UserProvider";
import { ConversationContext } from "./context/ConversationProvider";
import { HideShowContext } from "./context/HideShowProvider";
import { StartConversationContext } from "./context/StartConversation";

function Chat({ messages }) {
  const [input, setInput] = useState("");
  const { account } = useContext(AccountContext);
  const { person } = useContext(UserContext);
  const { conversation, setConversation } = useContext(ConversationContext);
  const { hideShow, setHideShow } = useContext(HideShowContext);
  const { initial } = useContext(StartConversationContext);

  useEffect(() => {
    const getConversationDetails = async () => {
      axios
        .get(`/conversation/sync/${account.localId}/${person.localId}`)
        .then((response) => {
          setConversation(response.data);
        });
    };
    getConversationDetails();
  }, [person.localId]);

  // console.log("lksdfjlkj", conversation._id);

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      senderId: account.localId,
      conversationId: conversation._id,
      name: account.fullName,
      message: input,
      timestamp: new Date().toUTCString(),
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={person.photoUrl || account.photoUrl} />
        <div className="chat_headerInfo">
          <h3>{person.fullName || "It's You"}</h3>
          <p>{person.fullName ? "offline" : "online"}</p>
        </div>
        <div className="chat_headerRight">
          {/* <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton> */}
          <h4
            onClick={() => setHideShow(true)}
            style={{ fontSize: "10px", color: "gray", display: "none" }}
          >
            Participants
          </h4>
        </div>
      </div>
      {initial ? (
        <div className="chat_body_initial">
          <div className="chat_body_initial_item">
            <h1>Start New Conversation</h1>
            <h3>Have a Nice Day!!!</h3>
          </div>
        </div>
      ) : (
        <div className="chat_body">
          {messages.map((message) => (
            <p
              className={
                account.localId === message.senderId
                  ? "chat_receive"
                  : "chat_message"
              }
            >
              {/* <span className="chat_name">{message.name}</span> */}
              {message.message}
              <span className="chat_timestamp">{message.timestamp}</span>
            </p>
          ))}
        </div>
      )}
      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type new message"
          />
          <button onClick={sendMessage}>submit</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
