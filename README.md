# react-native-qrcode-scanner
A react native QR code scanner based on expo-camera library written in TypeScript.

### Install npm dependencies

```
yarn
```

### Run on expo client
```
expo start
```

### Configure for iOS

Add `NSCameraUsageDescription` key to your `Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>Allow $(PRODUCT_NAME) to use the camera</string>
```

Run `npx pod-install` after installing the npm package.

### Configure for Android

This package automatically adds the `CAMERA` permission to your app. If you want to record videos with audio, you have to include the `RECORD_AUDIO`.

```xml
<!-- Added permissions -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- Optional permissions -->
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

Adjust the `android/build.gradle` to add a new `maven` block after all other repositories as described below:

```gradle
allprojects {
    repositories {

        // * Your other repositories here *

        // * Add a new maven block after other repositories / blocks *
        maven {
            // expo-camera bundles a custom com.google.android:cameraview
            url "$rootDir/../node_modules/expo-camera/android/maven"
        }
    }
}
```

The sourcecode for `cameraview` can be found at [`expo/cameraview`](https://github.com/expo/cameraview).
