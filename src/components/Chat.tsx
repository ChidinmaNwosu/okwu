"use client";
import { useState } from "react";
import LanguageDetector from "./LanguageDetector";
import Summarizer from "./Summarizer";
import Translator from "./Translator";

interface Message {
  text: string;
  type: "user" | "bot";
}

export default function Chat() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [detectedLang, setDetectedLang] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState("en");
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = { text: inputText, type: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setLastUserMessage(inputText);
    setInputText(""); // Clear input field
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages Display */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs break-words shadow-md ${
              msg.type === "user"
                ? "bg-[#dc7fb6] text-white ml-auto"
                : "bg-[#acb5d7] text-[#323436]"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Floating Output Actions */}
      {lastUserMessage && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[60%] max-w-2xl px-4 md:w-[35%] lg:w-[30%]">
          <div className="bg-white p-4 rounded-xl shadow-xl border border-[#acb5d7] flex flex-col items-center text-center">
            
            {/* Detected Language */}
            <LanguageDetector inputText={lastUserMessage} setDetectedLang={setDetectedLang} />
            <p className="text-sm text-[#323436] mt-2">
              Detected Language: <strong>{detectedLang ?? "Detecting..."}</strong>
            </p>

            {/* Translation Section */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3 w-full">
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="border p-2 rounded-lg bg-[#fdfbf5] shadow-md text-[#323436] hover:bg-[#e9e7de] transition"
              >
                <option value="en">English</option>
                <option value="pt">Portuguese</option>
                <option value="es">Spanish</option>
                <option value="ru">Russian</option>
                <option value="tr">Turkish</option>
                <option value="fr">French</option>
              </select>

              <Translator
                inputText={lastUserMessage}
                detectedLang={detectedLang}
                selectedLang={selectedLang}
                setMessages={setMessages}
              />
            </div>

            {/* Summarization Button */}
            <div className="mt-3 w-full">
              <Summarizer inputText={lastUserMessage} detectedLang={detectedLang ?? ""} setMessages={setMessages} />
            </div>
          </div>
        </div>
      )}

      {/* Input Field (Fixed at Bottom) */}
      <div className="p-3 bg-white border-t flex gap-3 fixed bottom-0 w-full max-w-2xl mx-auto">
        <input
          className="flex-1 p-3 border rounded-lg focus:outline-none bg-[#fdfbf5] text-[#323436] shadow-sm"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-[#dc7fb6] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#c56fa6] transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
