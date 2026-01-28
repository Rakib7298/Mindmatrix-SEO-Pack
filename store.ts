
import { useState, useEffect } from 'react';
import { AppState, Language } from './types';

const STORAGE_KEY = 'mindmatrix_settings_v2';

const DEFAULT_STATE: AppState = {
  language: 'en',
  selectedToolId: null,
  history: [],
  seoSettings: {
    businessName: '',
    websiteUrl: '',
    industry: 'E-commerce',
    targetRegion: 'BD'
  },
  isAiConnected: true // Assume connected via injected env key
};

// Simple global emitter for state changes
const listeners: Array<(state: AppState) => void> = [];
let currentState: AppState = (() => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return { ...DEFAULT_STATE, ...parsed };
    } catch (e) {
      return DEFAULT_STATE;
    }
  }
  return DEFAULT_STATE;
})();

export const useAppState = () => {
  const [state, setState] = useState<AppState>(currentState);

  useEffect(() => {
    const listener = (newState: AppState) => setState(newState);
    listeners.push(listener);
    return () => {
      const idx = listeners.indexOf(listener);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  const updateState = (updater: Partial<AppState> | ((s: AppState) => AppState)) => {
    const newState = typeof updater === 'function' ? updater(currentState) : { ...currentState, ...updater };
    currentState = newState;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    listeners.forEach(l => l(newState));
  };

  return { state, updateState };
};
