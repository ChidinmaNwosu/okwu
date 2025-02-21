"use client";
import { useState, useEffect, useCallback } from "react";

interface LanguageDetectorProps {
  inputText?: string;
  translatedText?: string;
  setDetectedLang: (lang: string | null) => void;
}

const LanguageDetector: React.FC<LanguageDetectorProps> = ({
  inputText = "",
  translatedText = "",
  setDetectedLang,
}) => {
  const [loading, setLoading] = useState(false);

  const detectLanguage = useCallback(
    async (text: string) => {
      if (!window.ai || !window.ai.languageDetector?.create) {
        console.error(" AI language detector is not available.");
        return;
      }

      setLoading(true);
      try {
        console.log("Creating Language Detector...");
        const detector = await window.ai.languageDetector.create();

        console.log(" Detecting language for:", text);
        const results = await detector.detect(text);

        console.log(" Detection Results:", results);
        if (!Array.isArray(results) || results.length === 0) {
          console.warn(" No language detected.");
          setDetectedLang("unknown");
          return;
        }

        const bestMatch = results[0];
        if (bestMatch.confidence >= 0.1) {
          console.log(
            ` Detected language: ${bestMatch.detectedLanguage} (Confidence: ${bestMatch.confidence})`
          );
          setDetectedLang(bestMatch.detectedLanguage);
        } else {
          console.warn(" Low-confidence detection. Defaulting to 'unknown'.");
          setDetectedLang("unknown");
        }
      } catch (error) {
        console.error(" Language detection failed:", error);
      } finally {
        setLoading(false);
      }
    },
    [setDetectedLang]
  );

  useEffect(() => {
    //Ensure both values are not undefined before calling trim()
    if (translatedText?.trim()) {
      detectLanguage(translatedText);
    } else if (inputText?.trim()) {
      detectLanguage(inputText);
    }
  }, [inputText, translatedText, detectLanguage]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => detectLanguage(inputText)}
        className="bg-[#480468] text-white px-4 py-2 rounded-md"
        disabled={loading}
      >
        {loading ? "Detecting..." : "Detect "}
      </button>
    </div>
  );
};

export default LanguageDetector;
