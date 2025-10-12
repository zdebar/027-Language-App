import { LayoutStyling } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { TextInput, TextInputProps, TextStyle } from "react-native";

interface ThemedTextInputProps extends TextInputProps {
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
  lightPlaceholderColor?: string;
  darkPlaceholderColor?: string;
  placeholder?: string;
  style?: TextStyle;
}

export function ThemedTextInput({
  lightBackgroundColor,
  darkBackgroundColor,
  lightTextColor,
  darkTextColor,
  lightPlaceholderColor,
  darkPlaceholderColor,
  placeholder = "Enter text...",
  style,
  ...props
}: ThemedTextInputProps) {
  const backgroundColor = useThemeColor(
    { light: lightBackgroundColor, dark: darkBackgroundColor },
    "background"
  );
  const color = useThemeColor(
    { light: lightTextColor, dark: darkTextColor },
    "text"
  );
  const placeholderColor = useThemeColor(
    {
      light: lightPlaceholderColor || lightTextColor,
      dark: darkPlaceholderColor || darkTextColor,
    },
    "placeholderText"
  );

  return (
    <TextInput
      placeholder={placeholder}
      style={{
        ...LayoutStyling.input,
        backgroundColor,
        color,
        borderColor: color,
        paddingHorizontal: 10,
      }}
      placeholderTextColor={placeholderColor}
      {...props}
    />
  );
}
