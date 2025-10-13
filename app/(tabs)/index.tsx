import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { TableLine } from "@/components/ui/table-line";
import { ThemedButton } from "@/components/ui/themed-button";
import { LayoutStyling } from "@/constants/theme";
import { useUser } from "@/hooks/user-user";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const { userInfo, userScore } = useUser();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <ThemedView style={LayoutStyling.top}>
      <ThemedText type="title">Angličtina App</ThemedText>
      <View
        style={{ height: 40, width: 320, borderColor: "white", borderWidth: 1 }}
      >
        <Text>Test</Text>
      </View>
      {userInfo ? (
        <>
          <ThemedText>Welcome, {userInfo.username}!</ThemedText>
          <TableLine label="id" value={userInfo.id} />
          <TableLine
            label="learned today"
            value={String(userScore?.learnedCountToday)}
          />
          <TableLine
            label="learned not today"
            value={String(userScore?.learnedCountNotToday)}
          />
          <TableLine
            label="practiced today"
            value={String(userScore?.practiceCountToday)}
          />
        </>
      ) : (
        <>
          <ThemedButton text="Login" onPress={handleLogin} />
          <ThemedText type="link" onPress={handleRegister}>
            Don&apos;t have an account? Register
          </ThemedText>
        </>
      )}
    </ThemedView>
  );
}
