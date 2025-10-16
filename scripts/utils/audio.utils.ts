import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

export const getAudioPath = (fileName: string) => {
  if (Platform.OS === "web") {
    // For web, use a hosted URL
    return `https://your-cdn.com/audio/${fileName}`;
  } else if (__DEV__) {
    // For development with Expo Go, use require()
    return require(`../../assets/audio/${fileName}`);
  } else {
    // For production, use FileSystem.BundleAssets
    return `${FileSystem.BundleAssets}audio/${fileName}`;
  }
};
