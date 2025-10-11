import { LayoutStyling } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { ThemedText } from "../themed-text";

interface ThemedButtonProps extends TouchableOpacityProps {
  text: string;
  lightTextColor?: string;
  darkTextColor?: string;
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
}

export function ThemedButton({
  text,
  lightTextColor,
  darkTextColor,
  lightBackgroundColor,
  darkBackgroundColor,
  style,
  ...otherProps
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightBackgroundColor, dark: darkBackgroundColor },
    "tint"
  );
  const textColor = useThemeColor(
    { light: lightTextColor, dark: darkTextColor },
    "text"
  );

  return (
    <TouchableOpacity
      style={[LayoutStyling.button, { backgroundColor }, style]}
      {...otherProps}
    >
      <ThemedText style={{ color: textColor }} type="default">
        {text}
      </ThemedText>
    </TouchableOpacity>
  );
}
