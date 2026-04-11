import { useEffect, useState } from "react";
import { Chatbot } from "supersimpledev";
import { ChatInput } from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || [],
  );

  useEffect(() => {
    Chatbot.addResponses({
      robot: "naah I'm a human of course.",
      goodbye: "Goodbye. Have a great day!",
      "give me a unique id": function () {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
      },
      fuck: "Mind your language bruh",
      joke: "Why don't scientists trust atoms? Because they make up everything!",
      human: "Yes, I am a human",
    });

    // [] tells useEffect to only run once. We only want to run
    // this setup code once because we only want to add these
    // extra responses once.
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p className="welcome-message">
          Welcome to the chatbot project! Send a message using the textbox
          below.
        </p>
      )}

      <ChatMessages chatMessages={chatMessages} />
      {/* <ChatMessagesComponent chatMessagesProp={chatMessagesArray}/> */}

      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
