# React Native Camera App

This is a React Native app that allows users to take photos and record videos using the device's camera. The app provides a simple and user-friendly interface for capturing images and videos, as well as managing and viewing the captured media.

## Features

- **Capture Photos:**
  - Take photos using the device's camera.
  
- **Record Videos:**
  - Record videos using the device's camera.
  
- **Preview Media:**
  - View photos and videos captured within the app.
  
- **Camera Controls:**
  - Toggle between front and back cameras.
  - Adjust camera settings (e.g., flash, zoom, etc.).

## Technologies Used

- React Native
- `react-native-camera` (for camera functionality)
- React Navigation (for app navigation)
- Styled-components (for styling)

## Installation

### Prerequisites

Make sure you have the following installed:
- Node.js (version >= 16.x)
- npm or yarn (for package management)
- React Native CLI or Expo CLI (depending on setup)
- Android Studio / Xcode (for running on a physical device or emulator)

### Steps to Set Up the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/khanyajara/react-native-camera.git
   ```

2. Navigate to the project directory:
   ```bash
   cd react-native-camera
   ```

3. Install the dependencies:
   ```bash
   npm install
   # or if you're using yarn
   yarn install
   ```

4. Link the native modules:
   ```bash
   react-native link
   ```

   For Expo projects, follow the appropriate steps for configuring Expo with `react-native-camera`.

5. Start the development server:
   ```bash
   react-native run-android   # For Android devices/emulators
   react-native run-ios       # For iOS simulators or devices
   ```

   Alternatively, use Expo if you're working within the Expo environment.

## Features Walkthrough

1. **Capture Photos:**
   - Tap the capture button to take a photo using the device's camera.
   - View the captured photo within the app.

2. **Record Videos:**
   - Tap the record button to start and stop video recording.
   - View the recorded video within the app.

3. **Camera Controls:**
   - Switch between front and back cameras using the provided toggle button.
   - Adjust settings like flash and zoom while using the camera.

4. **Media Preview:**
   - View previously captured photos and videos from the gallery.

## Contributing

We welcome contributions to this project! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Create a new pull request.



## Acknowledgments

- React Native Camera for providing easy-to-use camera functionality.
- React Native community for building great libraries.
- All contributors who help improve the project.


