"use client";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

interface TranslatorProps {
  inputText: string;
  detectedLang: string | null;
  selectedLang: string;
  setMessages: Dispatch<
    SetStateAction<{ text: string; type: "user" | "bot" }[]>
  >;
}

export default function Translator({
  inputText,
  detectedLang,
  selectedLang,
  setMessages,
}: TranslatorProps) {
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    if (!inputText.trim()) return;

    if (!window.ai || !window.ai.translator?.create) {
      console.error("AI translator is not available.");
      return;
    }

    setLoading(true);

    try {
      // Ensure source and target languages are always defined
      const sourceLang = detectedLang || "en";
      const targetLang = selectedLang;

      console.log(`Translating from ${sourceLang} to ${targetLang}`);

      const translator = await window.ai.translator.create({
        sourceLanguage: sourceLang, // Fix: Ensure this is always defined
        targetLanguage: targetLang, // Fix: Ensure this is always defined
        model: "gemini",
      });

      const translation = await translator.translate(inputText);
      
      setMessages((prev) => [...prev, { text: translation, type: "bot" }]);
    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={translateText}
      className="bg-[#9940a2] text-white px-4 py-2 rounded-md hover:bg-[#7c3485] transition"
    >
      {loading ? "Translating..." : "Translate"}
    </button>
  );
}
