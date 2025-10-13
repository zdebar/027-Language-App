/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform, StyleSheet } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#0a7ea4";
const gapSize = 5;
const borderRadius = 0;
const buttonHeight = 50;

export const Colors = {
  light: {
    text: "#11181C",
    placeholderText: "#687076",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    placeholderText: "#687076",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const LayoutStyling = StyleSheet.create({
  card: {
    flex: 1,
    maxWidth: 330,
    width: "100%", // Ensures it stretches to the parent container's width
  },
  top: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: gapSize,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: gapSize,
  },
  button: {
    flex: 1,
    width: "100%",
    minHeight: buttonHeight,
    maxHeight: buttonHeight,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: borderRadius,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  disabled: {
    opacity: 0.5,
  },
  input: {
    width: "100%",
    height: buttonHeight,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: borderRadius,
  },
});

export const TextStyling = StyleSheet.create({
  button: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
    marginTop: 25,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 24,
    fontSize: 16,
    color: tintColorLight,
  },
  error: {
    lineHeight: 24,
    fontSize: 16,
    color: "red",
  },
});
