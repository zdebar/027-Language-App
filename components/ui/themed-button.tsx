import { Colors, LayoutStyling } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { ThemedText } from "../themed-text";

interface ThemedButtonProps extends TouchableOpacityProps {
  text: string;
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
}

export function ThemedButton({
  text,
  lightBackgroundColor,
  darkBackgroundColor,
  style,
  ...otherProps
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightBackgroundColor, dark: darkBackgroundColor },
    "tint"
  );

  return (
    <TouchableOpacity
      style={[LayoutStyling.button, { backgroundColor }, style]}
      {...otherProps}
    >
      <ThemedText style={{ color: Colors.dark.text }} type="default">
        {text}
      </ThemedText>
    </TouchableOpacity>
  );
}
