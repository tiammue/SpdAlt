import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { useGPS } from '../contexts/GPSContext';
import { useSettings } from '../contexts/SettingsContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface MainScreenProps {
  navigation: MainScreenNavigationProp;
}

// const { width } = Dimensions.get('window');

export const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const {
    data,
    isLoading,
    error,
    isTracking,
    startTracking,
    requestPermissions,
  } = useGPS();

  const { theme, convertSpeed } = useSettings();
  const systemColorScheme = useColorScheme();
  const effectiveTheme = theme === 'system' ? systemColorScheme : theme;
  const isDarkMode = effectiveTheme === 'dark';
  const insets = useSafeAreaInsets();

  // Request permissions and start tracking on component mount
  useEffect(() => {
    const initializeGPS = async () => {
      const hasPermission = await requestPermissions();
      if (hasPermission) {
        await startTracking();
      } else {
        Alert.alert(
          'Location Permission Required',
          'This app needs location permission to track your speed and position.',
          [{ text: 'OK' }]
        );
      }
    };

    initializeGPS();
  }, [requestPermissions, startTracking]);


  const formatSpeed = (speed: number | null): string => {
    if (speed === null) return '--';
    const converted = convertSpeed(speed);
    return `${converted.value.toFixed(1)} ${converted.unit}`;
  };

  const formatCoordinate = (coord: number | null): string => {
    if (coord === null) return '--';
    return `${coord.toFixed(6)}°`;
  };

  const formatAccuracy = (accuracy: number | null): string => {
    if (accuracy === null) return '--';
    return `±${accuracy.toFixed(0)}m`;
  };

  const themeColors = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    cardBackground: isDarkMode ? '#2a2a2a' : '#ffffff',
    textColor: isDarkMode ? '#ffffff' : '#000000',
    secondaryTextColor: isDarkMode ? '#cccccc' : '#666666',
    primaryColor: '#007AFF',
    errorColor: '#FF3B30',
    successColor: '#34C759',
    warningColor: '#FF9500',
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.backgroundColor, paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: themeColors.textColor }]}>
          Speed & Altitude Tracker
        </Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            navigation.navigate('Settings');
          }}
        >
          <Text style={[styles.settingsButtonText, { color: themeColors.primaryColor }]}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Status Indicator */}
      <View style={styles.statusContainer}>
        <View style={[
          styles.statusIndicator,
          {
            backgroundColor: isTracking ? themeColors.successColor : themeColors.warningColor
          }
        ]} />
        <Text style={[styles.statusText, { color: themeColors.textColor }]}>
          {isTracking ? 'Tracking Active' : 'Tracking Inactive'}
        </Text>
      </View>

      {/* Main Data Display */}
      <View style={styles.dataContainer}>
        {/* Speed Card */}
        <View style={[styles.dataCard, { backgroundColor: themeColors.cardBackground }]}>
          <Text style={[styles.dataLabel, { color: themeColors.secondaryTextColor }]}>Current Speed</Text>
          <Text style={[styles.speedValue, { color: themeColors.textColor }]}>
            {formatSpeed(data.speed)}
          </Text>
          {data.accuracy && (
            <Text style={[styles.accuracyText, { color: themeColors.secondaryTextColor }]}>
              Accuracy: {formatAccuracy(data.accuracy)}
            </Text>
          )}
        </View>

        {/* Location Card */}
        <View style={[styles.dataCard, { backgroundColor: themeColors.cardBackground }]}>
          <Text style={[styles.dataLabel, { color: themeColors.secondaryTextColor }]}>Current Location</Text>
          <View style={styles.coordinateContainer}>
            <View style={styles.coordinateRow}>
              <Text style={[styles.coordinateLabel, { color: themeColors.secondaryTextColor }]}>Lat:</Text>
              <Text style={[styles.coordinateValue, { color: themeColors.textColor }]}>
                {formatCoordinate(data.latitude)}
              </Text>
            </View>
            <View style={styles.coordinateRow}>
              <Text style={[styles.coordinateLabel, { color: themeColors.secondaryTextColor }]}>Lng:</Text>
              <Text style={[styles.coordinateValue, { color: themeColors.textColor }]}>
                {formatCoordinate(data.longitude)}
              </Text>
            </View>
          </View>
        </View>

        {/* Altitude Card */}
        <View style={[styles.dataCard, { backgroundColor: themeColors.cardBackground }]}>
          <Text style={[styles.dataLabel, { color: themeColors.secondaryTextColor }]}>Altitude</Text>
          <Text style={[styles.altitudeValue, { color: themeColors.textColor }]}>
            {data.altitude !== null ? `${data.altitude.toFixed(1)}m` : '--'}
          </Text>
        </View>
      </View>

      {/* Loading State */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={themeColors.primaryColor} />
          <Text style={[styles.loadingText, { color: themeColors.textColor }]}>
            Initializing GPS...
          </Text>
        </View>
      )}

      {/* Error State */}
      {error && (
        <View style={[styles.errorContainer, { backgroundColor: themeColors.errorColor }]}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 10,
  },
  settingsButtonText: {
    fontSize: 24,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dataContainer: {
    flex: 1,
    gap: 20,
  },
  dataCard: {
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dataLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  speedValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  altitudeValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  accuracyText: {
    fontSize: 12,
  },
  coordinateContainer: {
    gap: 8,
  },
  coordinateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coordinateLabel: {
    fontSize: 16,
    fontWeight: '600',
    width: 40,
  },
  coordinateValue: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default MainScreen;