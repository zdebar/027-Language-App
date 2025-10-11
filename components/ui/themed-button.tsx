import GlobalStyles from "@/constants/global-styles";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

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
      style={[GlobalStyles.button, { backgroundColor }, style]}
      {...otherProps}
    >
      <Text style={[GlobalStyles.buttonText, { color: textColor }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
