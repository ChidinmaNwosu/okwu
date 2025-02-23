"use client";
import { useState } from "react";

interface Message {
  text: string;
  type: "user" | "bot";
}

interface SummarizerProps {
  inputText: string;
  detectedLang: string | null;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const Summarizer: React.FC<SummarizerProps> = ({
  inputText,
  detectedLang,
  setMessages,
}) => {
  const [loading, setLoading] = useState(false);

  const limitWords = (text: string, wordLimit: number) => {
    return text.split(" ").slice(0, wordLimit).join(" ") + "...";
  };

  const summarizeText = async () => {
    if (!inputText.trim()) {
      console.warn("No input text provided.");
      return;
    }

    if (detectedLang !== "en") {
      console.warn("Summarization skipped: Language is not English.");
      return;
    }

    if (!window.ai || !window.ai.summarizer?.create) {
      console.error("AI summarizer is not available.");
      return;
    }

    console.log("Creating Summarizer...");
    setLoading(true);

    try {
      const summarizer = await window.ai.summarizer.create({
        type: "key-points",
        format: "markdown",
        length: "short", // Changed to "short" for a smaller summary
      });

      console.log("Summarizing text:", inputText);
      let summary = await summarizer.summarize(inputText);

      console.log("Raw Summary result:", summary);

      // Clean up the summarized text
      summary = summary.replace(/\*\*/g, "").replace(/\*/g, "").replace(/\n/g, " ").replace(/\s+/g, " ").trim();

      // Limit the summary to 50 words
      summary = limitWords(summary, 50);

      console.log("Final Shortened Summary:", summary);

      if (summary) {
        setMessages((prev) => [...prev, { text: summary, type: "bot" }]);
      }
    } catch (error) {
      console.error("Summarization failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return detectedLang === "en" && inputText.length > 150 ? (
    <button
      onClick={summarizeText}
      className="bg-[#f27697] text-white px-4 py-2 rounded-md"
      disabled={loading}
    >
      {loading ? "Summarizing..." : "Summarize"}
    </button>
  ) : null;
};

export default Summarizer;
