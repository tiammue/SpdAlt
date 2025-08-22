import { useEffect, useRef } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { GPSData } from '../contexts/GPSContext';

interface LocationConfig {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  distanceFilter?: number;
  interval?: number;
}

const defaultConfig: LocationConfig = {
  enableHighAccuracy: true,
  timeout: 8000,
  maximumAge: 3000,
  distanceFilter: 0.5, // Very sensitive movement detection
  interval: 1000, // Update every 1 second for maximum accuracy
};

export const useGPSTracking = (config: LocationConfig = defaultConfig) => {
  const watchIdRef = useRef<number | null>(null);

  const requestLocationPermissions = async (): Promise<boolean> => {
    try {
      // Request permissions using Geolocation API
      return new Promise((resolve) => {
        Geolocation.requestAuthorization(
          () => resolve(true),
          () => resolve(false)
        );
      });
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      return false;
    }
  };

  const startLocationTracking = async (onLocationUpdate: (data: GPSData) => void, onError?: (error: any) => void) => {
    try {
      const hasPermission = await requestLocationPermissions();
      if (!hasPermission) {
        throw new Error('Location permissions not granted');
      }

      // Start watching position
      watchIdRef.current = Geolocation.watchPosition(
        (position) => {
          const locationData: GPSData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed, // Speed in m/s
            altitude: position.coords.altitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          };

          // Call the callback with new location data
          onLocationUpdate(locationData);
          console.log('Location updated:', locationData);
        },
        (error) => {
          console.error('Location tracking error:', error);
          if (onError) onError(error);
        },
        {
          enableHighAccuracy: config.enableHighAccuracy,
          timeout: config.timeout,
          maximumAge: config.maximumAge,
          distanceFilter: config.distanceFilter,
          interval: config.interval,
        }
      );
    } catch (error) {
      console.error('Error starting location tracking:', error);
      if (onError) onError(error);
    }
  };

  const stopLocationTracking = () => {
    if (watchIdRef.current !== null) {
      Geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  // Get current position once
  const getCurrentPosition = (): Promise<GPSData> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const locationData: GPSData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed,
            altitude: position.coords.altitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          };
          resolve(locationData);
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: config.enableHighAccuracy,
          timeout: config.timeout,
          maximumAge: config.maximumAge,
        }
      );
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return {
    startLocationTracking,
    stopLocationTracking,
    getCurrentPosition,
    requestLocationPermissions,
  };
};