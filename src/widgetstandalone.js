import React from 'react';
import ReactDOM from "react-dom/client";
import ChatBot from "./components/chatbot/chatBot.tsx";

export function initialize (businessId) {
    ReactDOM.createRoot(document.getElementById("enif")).render(
    <ChatBot businessId={businessId} />
    )
}