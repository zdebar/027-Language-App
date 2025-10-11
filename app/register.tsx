import { ThemedText } from "@/components/themed-text";
import GlobalStyles from "@/constants/global-styles";
import { View } from "react-native";

export default function RegisterScreen() {
  return (
    <View style={GlobalStyles.center}>
      <ThemedText>Register Page</ThemedText>
    </View>
  );
}
