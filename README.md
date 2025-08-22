# SpdAlt - GPS Speed and Altitude Tracker

A React Native application for tracking GPS speed and altitude data with real-time updates and location-based features.

## Features

- **Real-time GPS Tracking**: Monitor your current speed and altitude
- **Location Services**: Access device GPS for accurate positioning
- **Cross-platform**: Built with React Native for iOS and Android
- **TypeScript**: Full TypeScript support for better development experience
- **Modern Navigation**: Uses React Navigation for smooth screen transitions

## Prerequisites

- Node.js >= 18
- React Native development environment setup
- iOS Simulator or Android Emulator (or physical device)
- Git

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Installation

1. Clone the repository:
```sh
git clone https://github.com/your-username/spdalt.git
cd spdalt
```

2. Install dependencies:
```sh
npm install
```

3. For iOS, install CocoaPods dependencies:
```sh
cd ios && bundle exec pod install && cd ..
```

## Development

### Running the App

1. Start Metro bundler:
```sh
npm start
```

2. Run on Android:
```sh
npm run android
```

3. Run on iOS:
```sh
npm run ios
```

### Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
SpdAlt/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # App screens
│   ├── hooks/          # Custom React hooks
│   ├── contexts/       # React contexts
│   └── navigation/     # Navigation configuration
├── android/            # Android native code
├── ios/               # iOS native code
├── __tests__/         # Test files
└── .github/           # GitHub Actions workflows
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## CI/CD

This project uses GitHub Actions for continuous integration. The CI pipeline runs on every push and pull request to `main` and `develop` branches, performing:

- Code linting with ESLint
- TypeScript type checking
- Unit tests with Jest
- Coverage reporting

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
