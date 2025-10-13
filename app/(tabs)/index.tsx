import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ThemedButton } from "@/components/ui/themed-button";
import { UserDashboard } from "@/components/user-dashboard";
import { LayoutStyling } from "@/constants/theme";
import { useUser } from "@/hooks/user-user";
import { useRouter } from "expo-router";

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
    <ThemedView style={LayoutStyling.top}>
      <ThemedText type="title">Angličtina App</ThemedText>
      <UserDashboard />
      {userInfo ? (
        <ThemedText>Welcome, {userInfo.username}!</ThemedText>
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
