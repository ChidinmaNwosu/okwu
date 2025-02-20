
export {};

declare global {
  interface Window {
    ai?: {
      summarizer: {
        create: (options?: { [key: string]: string | number | boolean }) => Promise<{ summarize: (text: string) => Promise<string> }>;
      };
      languageDetector: {
        create: () => Promise<{ detect: (text: string) => Promise<{ language: string }> }>;
      };
      translator: {
        create: () => Promise<{ translate: (text: string, targetLang: string) => Promise<string> }>;
      };
    };
  }
}
