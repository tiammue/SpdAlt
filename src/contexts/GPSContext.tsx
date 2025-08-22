import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useGPSTracking } from '../hooks/useGPSTracking';

export interface GPSData {
  latitude: number | null;
  longitude: number | null;
  speed: number | null; // Speed in m/s
  altitude: number | null;
  accuracy: number | null;
  timestamp: number | null;
}

export interface GPSState {
  data: GPSData;
  isLoading: boolean;
  error: string | null;
  isTracking: boolean;
}

type GPSAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_LOCATION'; payload: GPSData }
  | { type: 'SET_TRACKING'; payload: boolean }
  | { type: 'RESET_DATA' };

const initialGPSData: GPSData = {
  latitude: null,
  longitude: null,
  speed: null,
  altitude: null,
  accuracy: null,
  timestamp: null,
};

const initialState: GPSState = {
  data: initialGPSData,
  isLoading: false,
  error: null,
  isTracking: false,
};

function gpsReducer(state: GPSState, action: GPSAction): GPSState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'UPDATE_LOCATION':
      return {
        ...state,
        data: action.payload,
        error: null,
        isLoading: false,
      };
    case 'SET_TRACKING':
      return { ...state, isTracking: action.payload };
    case 'RESET_DATA':
      return { ...state, data: initialGPSData };
    default:
      return state;
  }
}

interface GPSContextType extends GPSState {
  startTracking: () => void;
  stopTracking: () => void;
  requestPermissions: () => Promise<boolean>;
  updateLocationData: (data: GPSData) => void;
}

const GPSContext = createContext<GPSContextType | undefined>(undefined);

interface GPSProviderProps {
  children: ReactNode;
}

export const GPSProvider: React.FC<GPSProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gpsReducer, initialState);

  // Use the GPS tracking hook
  const {
    startLocationTracking,
    stopLocationTracking,
    getCurrentPosition,
    requestLocationPermissions,
  } = useGPSTracking();

  const requestPermissions = async (): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const hasPermission = await requestLocationPermissions();
      dispatch({ type: 'SET_LOADING', payload: false });
      return hasPermission;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to request permissions' });
      return false;
    }
  };

  const startTracking = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await startLocationTracking(
        (locationData) => {
          dispatch({ type: 'UPDATE_LOCATION', payload: locationData });
        },
        (error) => {
          dispatch({ type: 'SET_ERROR', payload: error.message || 'Location tracking error' });
          dispatch({ type: 'SET_TRACKING', payload: false });
        }
      );
      dispatch({ type: 'SET_TRACKING', payload: true });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to start tracking' });
    }
  };

  const stopTracking = () => {
    stopLocationTracking();
    dispatch({ type: 'SET_TRACKING', payload: false });
    dispatch({ type: 'RESET_DATA' });
  };

  // Function to update location data from external sources
  const updateLocationData = (locationData: GPSData) => {
    dispatch({ type: 'UPDATE_LOCATION', payload: locationData });
  };

  const value: GPSContextType = {
    ...state,
    startTracking,
    stopTracking,
    requestPermissions,
    updateLocationData,
  };

  return <GPSContext.Provider value={value}>{children}</GPSContext.Provider>;
};

export const useGPS = (): GPSContextType => {
  const context = useContext(GPSContext);
  if (context === undefined) {
    throw new Error('useGPS must be used within a GPSProvider');
  }
  return context;
};