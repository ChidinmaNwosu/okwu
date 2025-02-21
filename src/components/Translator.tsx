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
      const translator = await window?.ai?.translator?.create({
        sourceLanguage: detectedLang || "en",
        targetLanguage: selectedLang,
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
      className="bg-[#9940a2] text-white px-4 py-2 rounded-md"
    >
      {loading ? "Translating..." : "Translate"}
    </button>
  );
}
