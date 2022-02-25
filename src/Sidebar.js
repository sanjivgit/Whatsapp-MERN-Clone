import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { IconButton, Avatar } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import SidebarChat from "./SidebarChat";
import { AccountContext } from "./context/AccountProvider";
import axios from "./axios";
import { HideShowContext } from "./context/HideShowProvider";

function Sidebar() {
  const { account } = useContext(AccountContext);
  const { setAccount } = useContext(AccountContext);
  const [moreVertClick, setMoreVertClick] = useState(false);
  const [profileClick, setProfileClick] = useState(false);
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const { hideShow, setHideShow } = useContext(HideShowContext);
  useEffect(() => {
    axios.get("/users/sync").then((response) => {
      const data = response.data;
      const filterData = data.filter((user) =>
        user.fullName.toLowerCase().includes(text.toLowerCase())
      );
      setUsers(filterData);
    });
  }, [text]);
  const style = {
    "@media (max-width: 480px)": {
      display: hideShow ? "inline-flex" : "none",
    },
  };

  return (
    <div
      className="sidebar"
      style={{ display: hideShow ? "inline-flex" : "none" }}
    >
      <div className="sidebar_header">
        <Avatar
          src={account.photoUrl}
          onClick={() => setProfileClick(!profileClick)}
        />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon onClick={() => setMoreVertClick(!moreVertClick)} />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_header2" style={{ display: "none" }}>
        <div className="sidebar_headerLeft">
          <img
            src="/images/arrow-left.png"
            alt="arrow"
            onClick={() => setHideShow(false)}
          />
        </div>
        <Avatar
          src={account.photoUrl}
          onClick={() => setProfileClick(!profileClick)}
        />
      </div>
      {profileClick && (
        <div className="sidebar_Profile">
          <div className="sidebar_Profile_Header">
            <img
              onClick={() => setProfileClick(false)}
              src="/images/arrow-left.png"
              alt="arrow"
            />
            <h3>Profile</h3>
          </div>
          <div className="sidebar_Profile_Item">
            <Avatar src={account.photoUrl} />
            {/* <div className="sidebar_Profile_Item_Content">
              <h3>Name</h3>
              <span>{account.fullName}</span>
            </div>
            <p>fjslkdfjklsj</p>
            <div className="sidebar_Profile_Item_Content">
              <h3>Email</h3>
              <span>{account.email}</span>
            </div> */}
          </div>
        </div>
      )}
      {moreVertClick && (
        <div
          className="sidebar_fullScreen"
          onClick={() => setMoreVertClick(false)}
        >
          <div className="sidebar_menu">
            <button onClick={() => setProfileClick(!profileClick)}>
              Profile
            </button>
            <button onClick={() => setAccount("")}>Logout</button>
          </div>
        </div>
      )}
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchIcon />
          <input
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="search or start new chat"
          />
        </div>
      </div>
      <div className="sidebar_chat">
        {users.map(
          (item) =>
            item.localId !== account.localId && (
              <SidebarChat
                key={item.key}
                item={item}
                localId={item.localId}
                name={item.fullName}
                imageUrl={item.photoUrl}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Sidebar;
