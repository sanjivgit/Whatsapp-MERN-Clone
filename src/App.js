import { useEffect, useState, useContext } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Fragment,
} from "react-router-dom";
import SignUp from "./SignUp";
import { AccountContext } from "./context/AccountProvider";
import UserProvider from "./context/UserProvider";
import { ConversationContext } from "./context/ConversationProvider";
import HideShowProvider from "./context/HideShowProvider";

function App() {
  const [messages, setMessages] = useState([]);
  const { account } = useContext(AccountContext);
  const { conversation } = useContext(ConversationContext);

  useEffect(() => {
    axios.get(`/messages/sync/${conversation._id}`).then((response) => {
      setMessages(response.data);
    });
  }, [conversation?._id]);

  console.log("llkfls", conversation);

  useEffect(() => {
    const pusher = new Pusher("77dac813d70497340af6", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  // console.log(messages);

  return (
    <UserProvider>
      <HideShowProvider>
        <div className="app">
          <div className="app_body">
            {account ? (
              <>
                <Sidebar />
                <Chat messages={messages} />
              </>
            ) : (
              <SignUp />
            )}

            {/* <Router>
          <Routes>
            <Route
              exact
              path="/home"
              element={
                <>
                  <Sidebar />
                  <Chat messages={messages} />
                </>
              }
            />

            <Route exact path="login" element={<SignUp />} />
          </Routes>
        </Router> */}
          </div>
        </div>
      </HideShowProvider>
    </UserProvider>
  );
}

export default App;
