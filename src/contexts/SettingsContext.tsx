import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UnitType = 'kmh' | 'mph';
export type ThemeType = 'light' | 'dark' | 'system';

export interface SettingsState {
  unit: UnitType;
  theme: ThemeType;
  isLoading: boolean;
}

type SettingsAction =
  | { type: 'SET_UNIT'; payload: UnitType }
  | { type: 'SET_THEME'; payload: ThemeType }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_SETTINGS'; payload: Partial<SettingsState> };

const initialState: SettingsState = {
  unit: 'kmh',
  theme: 'system',
  isLoading: false,
};

function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case 'SET_UNIT':
      return { ...state, unit: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOAD_SETTINGS':
      return { ...state, ...action.payload, isLoading: false };
    default:
      return state;
  }
}

interface SettingsContextType extends SettingsState {
  setUnit: (unit: UnitType) => Promise<void>;
  setTheme: (theme: ThemeType) => Promise<void>;
  convertSpeed: (speedMps: number) => { value: number; unit: string };
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const SETTINGS_STORAGE_KEY = '@SpdAlt_settings';

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  // Load settings from AsyncStorage on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const storedSettings = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
        if (storedSettings) {
          const parsedSettings = JSON.parse(storedSettings);
          dispatch({ type: 'LOAD_SETTINGS', payload: parsedSettings });
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadSettings();
  }, []);

  // Save settings to AsyncStorage whenever they change
  const saveSettings = async (settings: Partial<SettingsState>) => {
    try {
      const currentSettings = { ...state, ...settings };
      await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({
        unit: currentSettings.unit,
        theme: currentSettings.theme,
      }));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const setUnit = async (unit: UnitType) => {
    dispatch({ type: 'SET_UNIT', payload: unit });
    await saveSettings({ unit });
  };

  const setTheme = async (theme: ThemeType) => {
    dispatch({ type: 'SET_THEME', payload: theme });
    await saveSettings({ theme });
  };

  const convertSpeed = (speedMps: number): { value: number; unit: string } => {
    if (state.unit === 'mph') {
      // Convert m/s to mph
      const mph = speedMps * 2.23694;
      return { value: mph, unit: 'mph' };
    } else {
      // Convert m/s to km/h
      const kmh = speedMps * 3.6;
      return { value: kmh, unit: 'km/h' };
    }
  };

  const value: SettingsContextType = {
    ...state,
    setUnit,
    setTheme,
    convertSpeed,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};