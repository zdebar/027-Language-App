import { useThemeColor } from "@/hooks/use-theme-color";
import { Link, type LinkProps } from "expo-router";
import { StyleSheet, TextStyle } from "react-native";

interface ThemedLinkProps extends LinkProps {
  lightColor?: string;
  darkColor?: string;
  style?: TextStyle;
}

export function ThemedLink({
  lightColor,
  darkColor,
  style,
  ...props
}: ThemedLinkProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "tint");

  return <Link {...props} style={[styles.link, { color }, style]} />;
}

const styles = StyleSheet.create({
  link: {
    fontSize: 16,
    lineHeight: 24,
    textDecorationLine: "underline",
  },
});
