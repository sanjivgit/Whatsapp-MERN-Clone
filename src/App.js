import { useEffect, useState } from "react";
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

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

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

  console.log(messages);

  return (
    <div className="app">
      <div className="app_body">
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Sidebar />
                  <Chat messages={messages} />
                </>
              }
            />
            <Route exact path="login" element={<SignUp />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
