import { ThemedText } from "@/components/themed-text";
import { ThemedButton } from "@/components/ui/themed-button";
import GlobalStyles from "@/constants/global-styles";
import { useUser } from "@/hooks/user-user";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const { userInfo } = useUser();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <View style={GlobalStyles.center}>
      <ThemedText type="title" style={styles.heading}>
        Angličtina App
      </ThemedText>
      {userInfo ? (
        <ThemedText>Welcome, {userInfo.username}!</ThemedText>
      ) : (
        <>
          <ThemedButton text="Login" onPress={handleLogin} />
          <ThemedText type="link" onPress={handleRegister}>
            register ...
          </ThemedText>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: 20,
  },
});
