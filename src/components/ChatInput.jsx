import dayjs from "dayjs";
import { useState } from "react";
import { Chatbot } from "supersimpledev";
import "./ChatInput.css";
import LoadingSpinnerGif from "../assets/loading-spinner.gif";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === "") {
      return;
    }

    setIsLoading(true);

    setInputText("");

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        time: dayjs().valueOf(),
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={LoadingSpinnerGif} className="loading-spinner" />,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText); //external SSD chatbot API
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        time: dayjs().valueOf(),
        id: crypto.randomUUID(),
      },
    ]);
    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  function clearMessages() {
    setChatMessages([]);

    // Here, you could also run:
    // localStorage.setItem('messages', JSON.stringify([]));

    // However, because chatMessages is being updated, the
    // useEffect in the App component will run, and it will
    // automatically update messages in localStorage to be [].
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText} //controlled Input
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
      <button onClick={clearMessages} className="clear-button">
        Clear
      </button>
    </div>
  );
}
