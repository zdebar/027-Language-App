import { ThemedText } from "@/components/themed-text";
import { LayoutStyling } from "@/constants/theme";
import { View } from "react-native";

export default function RegisterScreen() {
  return (
    <View style={LayoutStyling.center}>
      <ThemedText>Register Page</ThemedText>
    </View>
  );
}
