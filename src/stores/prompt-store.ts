import { create } from 'zustand';

interface PromptState {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

/**
 * Zustand store for managing the shared prompt state
 * Used by HeroImageGenerator and Gallery components
 */
export const usePromptStore = create<PromptState>((set) => ({
  prompt: '',
  setPrompt: (prompt) =>
    set(() => ({
      prompt,
    })),
}));
