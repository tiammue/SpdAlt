import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  useColorScheme,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useSettings, UnitType, ThemeType } from '../contexts/SettingsContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
}

interface UnitOptionProps {
  unitType: UnitType;
  label: string;
  description: string;
  unit: UnitType;
  themeColors: any;
  onPress: (unitType: UnitType) => void;
  isLoading: boolean;
}

const UnitOption: React.FC<UnitOptionProps> = ({
  unitType,
  label,
  description,
  unit: currentUnit,
  themeColors,
  onPress,
  isLoading
}) => (
  <TouchableOpacity
    style={[
      styles.option,
      {
        backgroundColor: currentUnit === unitType ? themeColors.selectedBackground : themeColors.cardBackground,
        borderColor: themeColors.borderColor,
      },
    ]}
    onPress={() => onPress(unitType)}
    disabled={isLoading}
  >
    <View style={styles.optionContent}>
      <View>
        <Text style={[styles.optionTitle, { color: themeColors.textColor }]}>{label}</Text>
        <Text style={[styles.optionDescription, { color: themeColors.secondaryTextColor }]}>
          {description}
        </Text>
      </View>
      {currentUnit === unitType && (
        <Text style={[styles.checkmark, { color: themeColors.primaryColor }]}>✓</Text>
      )}
    </View>
  </TouchableOpacity>
);

interface ThemeOptionProps {
  themeType: ThemeType;
  label: string;
  description: string;
  theme: ThemeType;
  themeColors: any;
  onPress: (themeType: ThemeType) => void;
  isLoading: boolean;
}

const ThemeOption: React.FC<ThemeOptionProps> = ({
  themeType,
  label,
  description,
  theme: currentTheme,
  themeColors,
  onPress,
  isLoading
}) => (
  <TouchableOpacity
    style={[
      styles.option,
      {
        backgroundColor: currentTheme === themeType ? themeColors.selectedBackground : themeColors.cardBackground,
        borderColor: themeColors.borderColor,
      },
    ]}
    onPress={() => onPress(themeType)}
    disabled={isLoading}
  >
    <View style={styles.optionContent}>
      <View>
        <Text style={[styles.optionTitle, { color: themeColors.textColor }]}>{label}</Text>
        <Text style={[styles.optionDescription, { color: themeColors.secondaryTextColor }]}>
          {description}
        </Text>
      </View>
      {currentTheme === themeType && (
        <Text style={[styles.checkmark, { color: themeColors.primaryColor }]}>✓</Text>
      )}
    </View>
  </TouchableOpacity>
);

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation: _navigation }) => {
  const { unit, theme, setUnit, setTheme, isLoading } = useSettings();
  const systemColorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  // Determine the effective theme
  const effectiveTheme = theme === 'system' ? systemColorScheme : theme;
  const isDarkMode = effectiveTheme === 'dark';

  const themeColors = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    cardBackground: isDarkMode ? '#2a2a2a' : '#ffffff',
    textColor: isDarkMode ? '#ffffff' : '#000000',
    secondaryTextColor: isDarkMode ? '#cccccc' : '#666666',
    primaryColor: '#007AFF',
    borderColor: isDarkMode ? '#404040' : '#e0e0e0',
    selectedBackground: isDarkMode ? '#404040' : '#f0f8ff',
  };

  const handleUnitChange = async (newUnit: UnitType) => {
    try {
      await setUnit(newUnit);
      Alert.alert('Success', `Unit changed to ${newUnit.toUpperCase()}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to save unit preference');
    }
  };

  const handleThemeChange = async (newTheme: ThemeType) => {
    try {
      await setTheme(newTheme);
      Alert.alert('Success', `Theme changed to ${newTheme}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to save theme preference');
    }
  };


  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.backgroundColor, paddingTop: insets.top }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: themeColors.textColor }]}>
          Settings
        </Text>
      </View>

      {/* Unit Selection Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.textColor }]}>
          Speed Unit
        </Text>
        <Text style={[styles.sectionDescription, { color: themeColors.secondaryTextColor }]}>
          Choose your preferred speed measurement unit
        </Text>

        <View style={styles.optionsContainer}>
          <UnitOption
            unitType="kmh"
            label="Kilometers per hour (km/h)"
            description="Standard metric unit"
            unit={unit}
            themeColors={themeColors}
            onPress={handleUnitChange}
            isLoading={isLoading}
          />
          <UnitOption
            unitType="mph"
            label="Miles per hour (mph)"
            description="Imperial unit"
            unit={unit}
            themeColors={themeColors}
            onPress={handleUnitChange}
            isLoading={isLoading}
          />
        </View>
      </View>

      {/* Theme Selection Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.textColor }]}>
          Theme
        </Text>
        <Text style={[styles.sectionDescription, { color: themeColors.secondaryTextColor }]}>
          Choose your preferred app appearance
        </Text>

        <View style={styles.optionsContainer}>
          <ThemeOption
            themeType="light"
            label="Light"
            description="Always use light theme"
            theme={theme}
            themeColors={themeColors}
            onPress={handleThemeChange}
            isLoading={isLoading}
          />
          <ThemeOption
            themeType="dark"
            label="Dark"
            description="Always use dark theme"
            theme={theme}
            themeColors={themeColors}
            onPress={handleThemeChange}
            isLoading={isLoading}
          />
          <ThemeOption
            themeType="system"
            label="System"
            description="Follow system theme setting"
            theme={theme}
            themeColors={themeColors}
            onPress={handleThemeChange}
            isLoading={isLoading}
          />
        </View>
      </View>

      {/* Current Settings Info */}
      <View style={[styles.infoSection, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.borderColor }]}>
        <Text style={[styles.infoTitle, { color: themeColors.textColor }]}>
          Current Settings
        </Text>
        <Text style={[styles.infoText, { color: themeColors.secondaryTextColor }]}>
          Unit: {unit.toUpperCase()}
        </Text>
        <Text style={[styles.infoText, { color: themeColors.secondaryTextColor }]}>
          Theme: {theme} {theme === 'system' && `(Currently: ${effectiveTheme})`}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
  },
  checkmark: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoSection: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default SettingsScreen;