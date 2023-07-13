module.exports = {
  expo: {
    name: "Art in the Wild",
    slug: "artinthewild",
    version: "0.0.5",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#f4f0df",
    },
    plugins: [
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow Art in the Wild to access this device's location",
        },
      ],
      [
        "expo-image-picker",
        {
          "photosPermission": "Allow Art in the Wild to access your photos.",
          "cameraPermission": "Allow Art in the Wild to access your camera."
        }
      ],
    ],
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        },
      },
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.gonzatron.artinthewild",
      versionCode: 5,
      permissions: [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.FOREGROUND_SERVICE",
      ],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "28277674-e578-4073-b13c-71111479308e",
      },
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
    updates: {
      url: "https://u.expo.dev/28277674-e578-4073-b13c-71111479308e",
    },
  },
};