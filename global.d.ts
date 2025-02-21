export {};

declare global {
  interface Window {
    ai?: {
      summarizer: {
        create: (options?: {
          [key: string]: string | number | boolean;
        }) => Promise<{ summarize: (text: string) => Promise<string> }>;
      };
      languageDetector: {
        create: () => Promise<{
          detect: (text: string) => Promise<{ language: string }>;
        }>;
      };
      translator: {
        create: (options?: TranslatorOptions) => Promise<TranslatorInstance>;
      };
    };
  }

  interface TranslatorOptions {
    sourceLanguage?: string;
    targetLanguage?: string;
    model?: string;
    [key: string]: string | number | boolean;
  }

  interface TranslatorInstance {
    translate: (text: string) => Promise<string>;
  }
}
