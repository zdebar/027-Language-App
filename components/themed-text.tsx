import { useThemeColor } from "@/hooks/use-theme-color";
import { Text, type TextProps } from "react-native";
import { TextStyling } from "../constants/theme";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? TextStyling.default : undefined,
        type === "title" ? TextStyling.title : undefined,
        type === "defaultSemiBold" ? TextStyling.defaultSemiBold : undefined,
        type === "subtitle" ? TextStyling.subtitle : undefined,
        type === "link" ? TextStyling.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
