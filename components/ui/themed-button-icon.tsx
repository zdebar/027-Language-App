import { Colors, LayoutStyling } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { ComponentProps } from "react";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { IconSymbol } from "./icon-symbol";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

interface IconButtonProps extends TouchableOpacityProps {
  iconName: MaterialIconName;
  iconSize?: number;
  iconColor?: string;
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
}

export function ThemedButtonIcon({
  iconName,
  iconSize = 24,
  iconColor,
  lightBackgroundColor,
  darkBackgroundColor,
  style,
  ...otherProps
}: IconButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightBackgroundColor, dark: darkBackgroundColor },
    "tint"
  );

  const resolvedIconColor = iconColor || Colors.dark.text;

  return (
    <TouchableOpacity
      style={[
        LayoutStyling.button,
        { backgroundColor },
        otherProps.disabled && LayoutStyling.disabled,
        style,
      ]}
      disabled={otherProps.disabled}
      {...otherProps}
    >
      <IconSymbol name={iconName} size={iconSize} color={resolvedIconColor} />
    </TouchableOpacity>
  );
}
