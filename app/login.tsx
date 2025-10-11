import { ThemedText } from "@/components/themed-text";
import GlobalStyles from "@/constants/global-styles";
import { View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={GlobalStyles.center}>
      <ThemedText type="default">Login Page</ThemedText>
    </View>
  );
}
